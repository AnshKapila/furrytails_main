// Ping IndexNow (Bing, Yandex, Seznam, Naver...) with every URL in the live
// sitemap, so new and changed pages are recrawled within hours instead of
// waiting for discovery. Bing's index also feeds ChatGPT search and Copilot.
//
// Run after each deploy, once the new build is live:
//   node scripts/indexnow.mjs
//
// The key file public/<KEY>.txt proves ownership; it must be live at
// https://furrytailjoy.com/<KEY>.txt before the ping is accepted.

const HOST = 'furrytailjoy.com';
const KEY = '9eac5253fc25b8929efc8a8eaf1ff3a8';

const keyUrl = `https://${HOST}/${KEY}.txt`;
const keyRes = await fetch(keyUrl);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file not live at ${keyUrl} - deploy first.`);
  process.exit(1);
}

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => new URL(u).host === HOST);

if (!urls.length) {
  console.error('No URLs found in the sitemap.');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList: urls }),
});

// 200 = accepted, 202 = accepted and the key is still being validated.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
