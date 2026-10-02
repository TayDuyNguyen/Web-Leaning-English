// Which bundled module holds which topic's content. One list, used by the seeder in
// node and by src/lib/contentSource.js in the browser, so the fallback tree and the
// database can never disagree about which topics are authored.
//
// Loaders are dynamic imports: the browser splits each module into its own chunk
// instead of carrying 380 kB of lessons in the entry bundle. The `.js` extension is
// required for Node to resolve these files under `node --test`.
export const contentModules = [
  {
    topicId: 'chuyen-de-thi-dong-tu',
    load: () => import('./chuyen-de-thi-dong-tu.js').then((m) => m.tensesData),
  },
  {
    topicId: 'su-phoi-thi',
    load: () => import('./su-phoi-thi.js').then((m) => m.sequenceOfTensesData),
  },
];
