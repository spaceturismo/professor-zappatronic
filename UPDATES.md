# Homepage Updates

## Navigation and Sound

With JavaScript enabled, the top navigation opens five views: Games, Minigames, Latest drops, About (bio and channels), and Contact (business and feedback). Games is the default. Hash links and browser history still work; the logo returns to the intro/home section. The empty Donate section was removed. Without JavaScript, the sections remain readable on one page.

Interface sound is opt-in, low-volume Web Audio synthesis for actions, the Reflex Zap ready cue, and minigame success cues. The checkbox remembers the preference locally and can mute the interface. Audio is initialized after interaction. Keypad and external media retain their independent audio controls.

## Readable HTML and Data

The homepage includes a complete no-JavaScript game listing. `catalog.html` is a standalone readable catalog; `catalog.json` provides games, minigames, metadata and update data for programs. Schema.org JSON-LD describes the catalog without inventing community ratings. Generate these files with `node scripts/build-readable.cjs`; the feed workflow also runs the generator. Gameplay, filters and ratings still require JavaScript. HTML and structured data make content accessible to parsers but do not guarantee inclusion in any AI service.

The catalog search, genre filter, random-game button, and email bug reports run in the browser. Reports are prepared in the visitor's email app; the site does not send or store them.

`scripts/refresh-feeds.ps1` writes recent game commits and the public YouTube upload feed to JSON. The scheduled GitHub Actions workflow refreshes them every four hours. Scheduled jobs can be delayed; this is not instant upload notification. It also supports Run workflow under Actions.

GitHub does not trigger a Pages build for commits made with the default Actions token. After a feed-only commit, trigger a Pages build explicitly with the Pages API (see the workflow).

YouTube channel: `UCGVwY61UH60w1vvO_ACSqdg` (`@Professor_Zappatronic`). If a feed request fails, retain the previously fetched videos.

The YouTube feed includes only videos published at or after `2026-11-02T02:45:16+00:00`, the publication time of Nevermore - Halloween Special. Older posts are removed from the homepage, not deleted from YouTube.

Latest drops combines game updates, site announcements, YouTube uploads, and TikTok beats. The curated TikTok entries are Microlarp (the user-supplied post `7711196441372347662`), Nuclear Biohazard, and Highway 3000 (a preview). Other posts are excluded. These entries are not automatically synchronized; use the linked TikTok post if a browser blocks the embedded player.

Four distinct minigames are available: Reflex Zap (reaction timing), Spark Catcher (timed target tapping), Circuit Pairs (memory matching), and Keypad (secret-code discovery and story puzzles). Keypad is imported from Downloads/Keypad.html with only mobile container-width corrections and embedded from minigames/keypad.html, with a full-game link. Circuit Pairs resets pending mismatch timers on restart. Target Rush was removed because its mechanics overlapped with Spark Catcher.

TikTok remains linked as `@dahgoat0001`. Automatic individual TikTok posts require TikTok Display API approval and an OAuth connection with `video.list` permission, or a trusted third-party feed service. Keep access and refresh tokens in server-side secrets, never in published JavaScript or JSON. A profile link is not an automatic video feed.

Genres are editorial categories. Control labels appear only where confirmed; no broad mobile, multiplayer, or completion claims are made.

Mobile support has three categories: Mobile-friendly (explicit touch movement/actions or tap-based activities), Desktop only (keyboard-dependent gameplay without a touch alternative), and Not yet verified. These are source-based control checks, not guarantees of performance on every phone. Uncertain games must not be labeled desktop-only just because touch support has not been checked.

Five-star ratings are personal browser-local ratings, not community averages. They are stored under `zappatronic-game-ratings-v1` in localStorage; only integer values 1 through 5 for known games are accepted. Higher ratings sort first, ties preserve the original catalog order, and unrated games follow. Clear removes a rating. If browser storage is blocked, ratings work for the current page and show a not-saved state. Shared ratings require a backend with abuse protection and are not implemented.