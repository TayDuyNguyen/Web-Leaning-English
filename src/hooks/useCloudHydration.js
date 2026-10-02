import { useEffect, useEffectEvent, useRef, useState } from 'react';
import {
  getCloudMigrationKey,
  hasMeaningfulLocalData,
  loadProfile,
  loadTopicScores,
  migrateLocalDataToCloud,
} from '../lib/userStorage';

// Pulls profile and scores from Supabase once auth has settled, and on the first
// sign-in of an account offers to push this device's local data up.
export function useCloudHydration({ authReady, session, onHydrated }) {
  const [isHydratingCloud, setIsHydratingCloud] = useState(false);
  const previousUserIdRef = useRef(null);
  const applyHydrated = useEffectEvent(onHydrated);

  useEffect(() => {
    if (!authReady) return undefined;

    let isCancelled = false;

    const hydrate = async () => {
      setIsHydratingCloud(true);
      try {
        if (session?.user?.id && previousUserIdRef.current !== session.user.id) {
          const migrationKey = getCloudMigrationKey(session.user.id);
          if (!localStorage.getItem(migrationKey) && hasMeaningfulLocalData()) {
            const shouldMigrate = window.confirm(
              'Phát hiện dữ liệu cục bộ trên thiết bị này. Bạn có muốn đẩy dữ liệu hiện tại lên đám mây không?'
            );
            if (shouldMigrate) {
              await migrateLocalDataToCloud(session);
            }
            localStorage.setItem(migrationKey, 'done');
          }
        }

        const [profile, nextScores] = await Promise.all([
          loadProfile(session),
          loadTopicScores(session),
        ]);

        if (isCancelled) return;

        applyHydrated(profile, nextScores);
        previousUserIdRef.current = session?.user?.id || null;
      } catch (error) {
        console.error('Failed to hydrate app storage:', error);
      } finally {
        if (!isCancelled) {
          setIsHydratingCloud(false);
        }
      }
    };

    hydrate();

    return () => {
      isCancelled = true;
    };
  }, [authReady, session]);

  return isHydratingCloud;
}
