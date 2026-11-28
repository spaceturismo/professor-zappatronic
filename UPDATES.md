# Homepage Updates

## New Mobile Games

Added Fractured Depths and Skybound Drift from the two newest November 27 HTML downloads. Both are hosted under games/ and included in the Mobile-friendly filter, with actual screenshots. Verified loading at 360px and 390px without page overflow or runtime errors, plus touch hero creation and exploration launch. Skybound Drift recommends landscape orientation. Catalog totals: 42 games, six apps and four minigames.

The mobile audit also corrected catalog links to the existing same-site game mirrors, repaired Wizard Academy's duplicate JavaScript declaration, enlarged homepage touch controls, and made Beat Painter's note grid internally scrollable with 44px cells. This is layout and launch coverage, not full-game completion or physical-device performance certification.

## Browser Profiles And Tab Icon

Added browser-local website profiles with creation, switching, Guest mode and confirmed deletion. Each named profile has separate site ratings; existing ratings remain under Guest. Profiles persist on this browser only, have no passwords or cloud sync, and do not replace independent accounts or saves inside externally hosted games and apps. Blocked storage and invalid profile data leave Guest available without overwriting saved profiles. Replaced the game-screenshot favicon with a lightning-bolt SVG.

## Creative Apps

Maker Studio was removed from the catalog at the owner's request; its separate repository was not deleted. Beat Painter and Pitch Slots replace it, imported unchanged from Downloads/Beat Painter.html and Downloads/Pitch Slots (2).html into their own folders under apps/. Both have actual app screenshots and are excluded from game search and random selection. Totals: 40 games and 6 apps. Deck Studio remains one paired app.

## App Additions

Business Plan Maker and Maker Studio link to their existing public app repositories. Deck Studio is one Apps entry with a shared launcher, card builder and duel engine. Sources are Downloads/eckbuiler (10).html and Downloads/duel (24).html, both downloaded November 26, 2026. Imported unchanged as apps/deck-studio/eckbuiler.html and duel.html so their existing relative links and profile-scoped storage keep working on the same origin. Downloads are not modified. Existing saves on other origins do not automatically migrate to zappatronic.com.

Actual app screenshots accompany all three additions. Catalog totals: 40 games, 5 apps, 4 minigames. Beat Painter and Pitch Slots were also found among recent downloads but are not included in this change.

## Combined Catalog

Games & Apps is one scrollable view, with Apps directly below Games; `#apps` remains a direct link. Math Meadow is classified as an educational app alongside Claude Demo Mode. The catalog has 40 games and 2 apps. Worldsmith, Worldsmith Globe, WorldWalker and Trickshot Tapes retain game classification because they include conquest, survival or scoring mechanics. Browser rendering and generated HTML/JSON/schema share the explicit `appSlugs` list. Apps are excluded from game search and random selection.

TikTok beats are shared by Music and Latest drops without duplicating players.

## Visitor Improvements

Start here pins Pixel Omniverse, Freddles After Dark and Heartbox Dodge 3D Expanded ahead of personal rating sorting. The cache warning was removed. Existing screenshots and genre filters remain. Beyond Files, Hollow Pines and Wick and Cinder have expandable chapter groups; filters open matching chapters. Similar titles remain because their mechanics differ, with distinctions in their descriptions.

Music has its own view with three existing YouTube releases. Favicon and Open Graph share-image metadata reuse an existing game preview. Business inquiries use the existing feedback form, not a newly provisioned form service. Bug reports still use mailto and are not private server-side submissions.

Only Claude in Claude Demo Mode is listed. No embedded key was found in the integration-dependent original; it is omitted because it is not a standalone public chat app. Minigame challenge targets are editorial goals, not fabricated Professor records or prefilled personal bests. TikTok account renaming requires account access; the current working handle is preserved.

## Navigation and Sound

The Apps view contains Claude in Claude and its local demo, separated from the 41 games. Apps use Open app links and never appear in game search or genre filters. The readable HTML catalog has a dedicated HTML Apps heading. JSON catalog version 2 separates `games` and `apps` arrays.

With JavaScript enabled, the top navigation opens six views: Games, Apps, Minigames, Latest drops, About (bio and channels), and Contact (business and feedback). Games is the default. Hash links and browser history still work; the logo returns to the intro/home section. The empty Donate section was removed. Without JavaScript, the sections remain readable on one page.

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

TikTok is linked as `@professorzappatronic`, using the profile URL supplied by the owner. Curated video IDs are preserved. Automatic individual TikTok posts require TikTok Display API approval and an OAuth connection with `video.list` permission, or a trusted third-party feed service. Keep access and refresh tokens in server-side secrets, never in published JavaScript or JSON. A profile link is not an automatic video feed.

Genres are editorial categories. Control labels appear only where confirmed; no broad mobile, multiplayer, or completion claims are made.

Mobile support has three categories: Mobile-friendly (explicit touch movement/actions or tap-based activities), Desktop only (keyboard-dependent gameplay without a touch alternative), and Not yet verified. These are source-based control checks, not guarantees of performance on every phone. Uncertain games must not be labeled desktop-only just because touch support has not been checked.

Five-star ratings are personal browser-local ratings, not community averages. They are stored under `zappatronic-game-ratings-v1` in localStorage; only integer values 1 through 5 for known games are accepted. Higher ratings sort first, ties preserve the original catalog order, and unrated games follow. Clear removes a rating. If browser storage is blocked, ratings work for the current page and show a not-saved state. Shared ratings require a backend with abuse protection and are not implemented.