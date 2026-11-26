const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'games.js'), 'utf8');
function variable(name) {
  const match = source.match(new RegExp('var ' + name + ' = ([\\s\\S]*?);'));
  assert(match, 'Missing catalog variable: ' + name);
  return vm.runInNewContext('(' + match[1] + ')');
}
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'game-blurbs.js'), 'utf8'), context);
const genres = variable('genres');
const friendly = variable('mobileFriendly');
const desktop = variable('desktopOnly');
const controls = variable('controls');
const dimensions = variable('threeDimensional');
const catalogUrls = variable('catalogUrls');
const games = variable('games').map(([slug, name]) => ({
  slug, name, description: context.window.gameBlurbs[slug],
  genre: Object.keys(genres).find(genre => genres[genre].includes(slug)) || 'Adventure',
  mobileSupport: friendly.includes(slug) ? 'friendly' : desktop.includes(slug) ? 'desktop' : 'unknown',
  controls: controls[slug] || null,
  threeDimensional: dimensions.includes(slug),
  url: catalogUrls[slug] || 'https://spaceturismo.github.io/' + slug + '/',
  image: 'https://zappatronic.com/images/games/' + slug + '.jpg'
}));
assert.equal(games.length, 46);
const minigames = [
  { name: 'Reflex Zap', mechanic: 'Reaction timing', url: 'https://zappatronic.com/#minigames', requiresJavaScript: true },
  { name: 'Spark Catcher', mechanic: 'Timed target tapping', url: 'https://zappatronic.com/#minigames', requiresJavaScript: true },
  { name: 'Circuit Pairs', mechanic: 'Memory matching', url: 'https://zappatronic.com/#minigames', requiresJavaScript: true },
  { name: 'Keypad', mechanic: 'Secret-code discovery and story puzzles', url: 'https://zappatronic.com/minigames/keypad.html', requiresJavaScript: true }
];
const youtube = JSON.parse(fs.readFileSync(path.join(root, 'youtube-updates.json'), 'utf8'));
const updates = JSON.parse(fs.readFileSync(path.join(root, 'game-updates.json'), 'utf8'));
const appSlugs = variable('appSlugs');
const apps = games.filter(game => appSlugs.includes(game.slug));
const playable = games.filter(game => !appSlugs.includes(game.slug));
const data = { version: 2, name: 'Professor Zappatronic', url: 'https://zappatronic.com/', contactForm: 'https://forms.gle/7H8YxdxEwokMFHxQA', ratings: 'Personal browser-local ratings; not community averages', games: playable, apps, minigames, gameUpdates: updates, youtube };
fs.writeFileSync(path.join(root, 'catalog.json'), JSON.stringify(data, null, 2) + '\n');
function escape(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}
function renderListing(entries) {
  return entries.map(game => '<article><h3><a href="' + escape(game.url) + '">' + escape(game.name) + '</a></h3><p>' + escape(game.description) + '</p><p>' + escape(game.genre) + ' | ' + escape({friendly:'Mobile-friendly',desktop:'Desktop only',unknown:'Mobile support not verified'}[game.mobileSupport]) + '</p></article>').join('\n');
}
const listing = renderListing(playable);
const appListing = renderListing(apps);
const fallback = '<!-- readable-catalog:start -->\n<noscript><section aria-label="Full game catalog">' + listing + '</section></noscript>\n<!-- readable-catalog:end -->';
const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: data.name, url: data.url, mainEntity: { '@type': 'ItemList', itemListElement: games.map((game, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': appSlugs.includes(game.slug) ? 'SoftwareApplication' : 'VideoGame', name: game.name, description: game.description, url: game.url, image: game.image, genre: game.genre } })) } };
const metadata = '<!-- catalog-schema:start -->\n<link rel="alternate" type="application/json" href="catalog.json" title="Professor Zappatronic catalog">\n<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script>\n<!-- catalog-schema:end -->';
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(html.includes('<!-- readable-catalog:start -->'));
assert(html.includes('<!-- catalog-schema:start -->'));
html = html.replace(/<!-- readable-catalog:start -->[\s\S]*?<!-- readable-catalog:end -->/, () => fallback);
html = html.replace(/<!-- catalog-schema:start -->[\s\S]*?<!-- catalog-schema:end -->/, () => metadata);
fs.writeFileSync(path.join(root, 'index.html'), html);
const document = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Professor Zappatronic Catalog</title><link rel="alternate" type="application/json" href="catalog.json"><style>body{font:18px Georgia,serif;max-width:900px;margin:auto;padding:24px;color:#21151a;background:#fafafa}article{border-bottom:1px solid #ccc;padding:12px 0}a{color:#a0152c}h3{font-size:22px}</style></head><body><header><h1>Professor Zappatronic</h1><a href="index.html">Homepage</a> | <a href="catalog.json">JSON catalog</a></header><main><h2>Games</h2>' + listing + '<h2>Minigames</h2>' + minigames.map(game => '<article><h3><a href="' + escape(game.url) + '">' + escape(game.name) + '</a></h3><p>' + escape(game.mechanic) + '</p></article>').join('') + '<h2>Latest YouTube drops</h2>' + youtube.map(video => '<article><h3><a href="https://www.youtube.com/watch?v=' + escape(video.id) + '">' + escape(video.title) + '</a></h3><time datetime="' + escape(video.published) + '">' + escape(video.published.slice(0, 10)) + '</time></article>').join('') + '</main><footer><a href="mailto:' + data.email + '">' + data.email + '</a></footer></body></html>';
const contactDocument = document.replace(/<footer>[\s\S]*?<\/footer>/, () => '<footer><a href="' + data.contactForm + '">Contact form</a></footer>');
fs.writeFileSync(path.join(root, 'catalog.html'), contactDocument.replace('<h2>Minigames</h2>', () => '<h2 id="apps">HTML Apps</h2>' + appListing + '<h2>Minigames</h2>'));
console.log('Built readable catalogs for ' + playable.length + ' games, ' + apps.length + ' apps and ' + minigames.length + ' minigames.');