const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'C:/Users/zavie/AppData/Local/Temp/zap-image-tools/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const output = process.env.MOBILE_AUDIT_OUTPUT || path.join(process.env.TEMP, 'zappatronic-mobile-audit');
const localOnly = process.argv.includes('--local');
const widths = (process.env.MOBILE_AUDIT_WIDTHS || '360,390').split(',').map(Number);
const selected = process.env.MOBILE_AUDIT_SLUGS?.split(',');
fs.mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== root) { response.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { response.writeHead(404).end(); return; }
  response.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(response);
});

async function inspect(page) {
  return page.evaluate(() => {
    const visible = element => { const rect = element.getBoundingClientRect(); const style = getComputedStyle(element); return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden'; };
    const describe = element => ({ tag: element.tagName, id: element.id, class: String(element.className).slice(0, 90), text: (element.innerText || element.getAttribute('aria-label') || '').trim().slice(0, 90) });
    const offenders = Array.from(document.querySelectorAll('body *')).filter(element => {
      if (!visible(element) || element.closest('svg')) return false;
      const rect = element.getBoundingClientRect();
      if (rect.right <= innerWidth + 2 && rect.left >= -2) return false;
      let ancestor = element.parentElement;
      while (ancestor && ancestor !== document.body) {
        if (['auto', 'scroll', 'hidden', 'clip'].includes(getComputedStyle(ancestor).overflowX)) return false;
        ancestor = ancestor.parentElement;
      }
      return true;
    }).slice(0, 12).map(element => ({ ...describe(element), width: Math.round(element.getBoundingClientRect().width) }));
    const controls = Array.from(document.querySelectorAll('button,input,select,a')).filter(visible);
    return {
      title: document.title,
      viewport: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      overflow: document.documentElement.scrollWidth > innerWidth + 2,
      offenders,
      smallControls: controls.filter(element => { const rect = element.getBoundingClientRect(); return rect.width < 32 || rect.height < 32; }).slice(0, 12).map(describe),
      buttons: Array.from(document.querySelectorAll('button')).filter(visible).slice(0, 18).map(element => element.innerText.trim()),
      canvases: Array.from(document.querySelectorAll('canvas')).filter(visible).map(element => ({ width: element.width, height: element.height, cssWidth: Math.round(element.getBoundingClientRect().width), cssHeight: Math.round(element.getBoundingClientRect().height) })),
      text: document.body.innerText.slice(0, 1600)
    };
  });
}

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8'));
  const targets = ['games', 'apps', 'music', 'minigames', 'latest-drops', 'bio', 'feedback'].map(route => ({ slug: 'site-' + route, url: base + '/#' + route, local: true }));
  targets.push({ slug: 'readable-catalog', url: base + '/catalog.html', local: true });
  for (const app of catalog.apps) {
    const url = new URL(app.url);
    const local = url.hostname === 'zappatronic.com';
    if (local || !localOnly) targets.push({ slug: app.slug, url: local ? base + url.pathname : app.url, local });
  }
  targets.push({ slug: 'deck-builder', url: base + '/apps/deck-studio/eckbuiler.html', local: true });
  targets.push({ slug: 'deck-duel', url: base + '/apps/deck-studio/duel.html', local: true });
  targets.push({ slug: 'keypad', url: base + '/minigames/keypad.html', local: true });
  if (!localOnly) for (const game of catalog.games) {
    const url = new URL(game.url);
    const local = url.hostname === 'zappatronic.com';
    targets.push({ slug: game.slug, url: local ? base + url.pathname : game.url, local });
  }
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  let cursor = 0;
  const resolvedTargets = targets.map(target => {
    if (!target.local) return target;
    const url = new URL(target.url);
    const file = path.join(root, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '');
    if (!fs.existsSync(file)) return target;
    const content = fs.readFileSync(file, 'utf8');
    const redirect = content.match(/<meta[^>]+http-equiv="refresh"[^>]+content="0;\s*url=([^"]+)"/i);
    return redirect ? { ...target, url: new URL(redirect[1], target.url).href } : target;
  });
  const jobs = resolvedTargets.filter(target => !selected || selected.includes(target.slug)).flatMap(target => widths.map(width => ({ target, width })));
  try {
    await Promise.all(Array.from({ length: Number(process.env.MOBILE_AUDIT_WORKERS || 1) }, async () => {
      while (cursor < jobs.length) {
        const { target, width } = jobs[cursor++];
        const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
        const page = await context.newPage();
        const errors = [];
        const failed = [];
        const sources = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('requestfailed', request => { if (request.resourceType() === 'script') failed.push(request.url()); });
        page.on('response', response => {
          if (response.request().resourceType() === 'script' && response.url().startsWith(new URL(target.url).origin)) sources.push(response.text().catch(() => ''));
        });
        await page.route('**/www.tiktok.com/**', route => route.abort());
        if (target.slug.startsWith('site-')) await page.route('**/intro.js', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
        const record = { slug: target.slug, url: target.url, width, local: target.local, errors, failed };
        try {
          const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
          record.status = response?.status();
          await page.waitForFunction(() => !Array.from(document.querySelectorAll('button')).some(button => button.disabled && /loading|building|preparing/i.test(button.innerText)), { timeout: 30000 }).catch(() => {});
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          record.initial = await inspect(page);
          const content = await page.content();
          const scripts = (await Promise.all(sources)).join('\n');
          record.inputEvidence = { touch: /touchstart|touchmove|pointerdown|ontouchstart|joystick/i.test(content + scripts), keyboard: /keydown|requestPointerLock/i.test(content + scripts) };
          await page.screenshot({ path: path.join(output, target.slug + '-' + width + '.png'), timeout: 12000 });
          const specificLaunch = {
            'deck-builder': /DECK BUILDER/,
            'deck-duel': /Skip This/,
            'Pixel_Omniverse': /^(PLAY|START|ENTER).*$/i,
            'heartbox-dodge-3d-expanded': /^(start|play|begin).*$/i,
            'arena-clash': /^(start|play|fight).*$/i,
            'rift-racer-3d': /^QUICK RACE$/,
            'silent-vault-3d-heist': /^Continue:/,
            'wizard-academy-3d': /^Enter the valley$/,
            'the-land-has-no-edge': /PLAY/,
            'dusk-dojo-pixel-fighter': /^1 PLAYER$/,
            'steel-and-sinew': /^(begin duel|start duel|duel|fight)$/i,
            'the-marrow-house': /enter|begin|play|watch/i,
            'hollow-pines-night-watch': /^Begin the night$/,
            'hollow-pines-the-hall': /enter|begin|play/i,
            'the-beyond-files-1-the-girl-in-the-4th-dimension': /^SAVE 1:/,
            'the-beyond-files-2-randy': /^SAVE 1:/,
            'the-beyond-files-3-blackout-ward': /^SAVE 1:/,
            'the-beyond-files-4-the-workshop': /^SAVE 1:/,
            'ankle-breakers': /^Ankle Breakers/,
            'juke-hour': /^START THE ROUND$/,
            'walker': /^Start walking$/,
            'worldwalker': /^Start walking$/,
            'worldsmith': /^Found a realm$/,
            'worldsmith-globe': /^Choose a landing site$/,
            'total-mayhem': /^Start solo campaign$/,
            'nimbo-s-rainbow-garden': /^Let's go!$/,
            'wumble-and-tink': /^Start the hunt$/,
            'pitch-slots': /^No thanks$/,
            'beat-painter': /^Play$/
          };
          const launch = page.getByRole('button', { name: specificLaunch[target.slug] || /^(start|play|begin|enter|start game|play game|new game|enter the lab|begin adventure|start adventure)$/i }).first();
          if (await launch.isVisible().catch(() => false)) {
            record.launchButton = await launch.innerText();
            await launch.tap({ timeout: 4000 });
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            record.started = await inspect(page);
            await page.screenshot({ path: path.join(output, target.slug + '-' + width + '-started.png'), timeout: 12000 });
          }
          if (target.slug === 'deck-duel') {
            const deck = page.getByRole('button', { name: 'USE THIS DECK', exact: true }).first();
            if (await deck.isVisible().catch(() => false)) {
              await deck.tap({ timeout: 4000 });
              await page.locator('#duelScreen').waitFor({ state: 'visible', timeout: 10000 });
              await page.waitForFunction(() => document.querySelector('#coinFlipScreen')?.classList.contains('hidden'), { timeout: 10000 });
              record.duel = await inspect(page);
              await page.screenshot({ path: path.join(output, target.slug + '-' + width + '-duel.png'), timeout: 12000 });
            }
          }
          if (target.slug === 'deck-builder') {
            const create = page.getByRole('button', { name: /Create Custom Card/ });
            if (await create.isVisible().catch(() => false)) {
              await create.tap({ timeout: 4000 });
              record.editor = await inspect(page);
              await page.screenshot({ path: path.join(output, target.slug + '-' + width + '-editor.png'), timeout: 12000 });
            }
          }
          if (!record.started && ['trickshot-tapes', 'vengeful-pendulum', 'vacancy-case-file-2', 'last-frame-night-shift'].includes(target.slug)) {
            const canvas = page.locator('canvas').first();
            if (await canvas.isVisible()) {
              await canvas.tap({ timeout: 4000 });
              record.started = await inspect(page);
              await page.screenshot({ path: path.join(output, target.slug + '-' + width + '-started.png'), timeout: 12000 });
            }
          }
        } catch (error) { record.checkError = error.message.split('\n')[0]; }
        results.push(record);
        fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
        console.log(JSON.stringify({ slug: record.slug, width, status: record.status, overflow: record.initial?.overflow, startedOverflow: record.started?.overflow, duelOverflow: record.duel?.overflow, editorOverflow: record.editor?.overflow, errors: record.errors, failed: record.failed, checkError: record.checkError }));
        await context.close();
      }
    }));
    console.log('Audit saved to ' + output + ': ' + results.length + ' checks.');
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });