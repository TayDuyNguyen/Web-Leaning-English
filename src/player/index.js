import { createCloudStore } from './cloudStore.js';
import { createLocalStore } from './localStore.js';
import { supabaseClientFor } from './supabaseClient.js';

// Cloud only when Supabase is configured *and* someone is signed in: the RLS
// policies key off auth.uid(), so an anonymous write would be rejected by the
// database anyway. Falling back to local keeps a signed-out player working instead
// of showing an error for something that is just "not signed in yet".
export function createPlayerStore({ env, storage, session }) {
  const client = supabaseClientFor(env);
  if (client && session?.user) {
    return { store: createCloudStore(client, session.user.id), source: 'cloud', user: session.user };
  }
  return { store: createLocalStore(storage), source: client ? 'local-signed-out' : 'local-unsupported', user: null };
}

export async function loadSession(env) {
  const client = supabaseClientFor(env);
  if (!client) return null;
  const { data, error } = await client.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function authFor(env) {
  const client = supabaseClientFor(env);
  if (!client) return null;
  return {
    async signUp(email, password) {
      const { data, error } = await client.auth.signUp({ email, password });
      if (error) throw error;
      return data.session;
    },
    async signIn(email, password) {
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.session;
    },
    async signOut() {
      const { error } = await client.auth.signOut();
      if (error) throw error;
    },
    onChange(callback) {
      const { data } = client.auth.onAuthStateChange((_event, session) => callback(session));
      return () => data.subscription.unsubscribe();
    },
  };
}
