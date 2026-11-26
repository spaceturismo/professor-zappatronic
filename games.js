(function () {
  'use strict';

  var games = [
    ['Pixel_Omniverse', 'Pixel Omniverse'],
    ['freddles-after-dark', 'Freddles After Dark'],
    ['heartbox-dodge-3d-expanded', 'Heartbox Dodge 3D Expanded'],
    ['arena-clash', 'Arena Clash'],
    ['orb-runner', 'Orb Runner'],
    ['hyper-twilight-chapter-1', 'Hyper Twilight Chapter 1'],
    ['math-meadow', 'Math Meadow'],
    ['rift-racer-3d', 'Rift Racer 3D'],
    ['silent-vault-3d-heist', 'Silent Vault 3D Heist'],
    ['wizard-academy-3d', 'Wizard Academy 3D'],
    ['the-land-has-no-edge', 'The Land Has No Edge'],
    ['dusk-dojo-pixel-fighter', 'Dusk Dojo - Pixel Fighter'],
    ['steel-and-sinew', 'Steel and Sinew'],
    ['the-marrow-house', 'The Marrow House'],
    ['vacancy-case-file-2', 'Vacancy - Case File 2'],
    ['hollow-pines-the-hall', 'Hollow Pines - The Hall'],
    ['hollow-pines-night-watch', 'Hollow Pines - Night Watch'],
    ['last-frame-night-shift', 'Last Frame - Night Shift'],
    ['photon-arena', 'Photon Arena'],
    ['worldsmith-globe', 'Worldsmith Globe'],
    ['the-beyond-files-4-the-workshop', 'The Beyond Files 4 - The Workshop'],
    ['the-beyond-files-3-blackout-ward', 'The Beyond Files 3 - Blackout Ward'],
    ['the-beyond-files-2-randy', 'The Beyond Files 2 - Randy'],
    ['the-beyond-files-1-the-girl-in-the-4th-dimension', 'The Beyond Files 1 - The Girl in the 4th Dimension'],
    ['ankle-breakers', 'Ankle Breakers'],
    ['wren-folded', 'Wren, Folded'],
    ['walker', 'Walker'],
    ['wick-and-cinder-3', 'Wick and Cinder 3'],
    ['wick-and-cinder-saga', 'Wick and Cinder Saga'],
    ['juke-hour', 'Juke Hour'],
    ['vengeful-pendulum', 'Vengeful Pendulum'],
    ['worldwalker', 'WorldWalker'],
    ['worldsmith', 'Worldsmith'],
    ['trickshot-tapes', 'Trickshot Tapes'],
    ['wick-and-cinder-iii', 'Wick and Cinder III'],
    ['wick-and-cinder-2', 'Wick and Cinder 2'],
    ['wick-and-cinder', 'Wick and Cinder'],
    ['total-mayhem', 'Total Mayhem'],
    ['claude-in-claude-demo-mode', 'Claude in Claude - Demo Mode'],
    ['hollowmere', 'Hollowmere'],
    ['nimbo-s-rainbow-garden', "Nimbo's Rainbow Garden"],
    ['wumble-and-tink', 'Wumble and Tink'],
    ['business-plan-maker', 'Business Plan Maker'],
    ['beat-painter', 'Beat Painter'],
    ['pitch-slots', 'Pitch Slots'],
    ['deck-studio', 'Deck Studio']
  ];
  var featured = document.getElementById('featured-games');
  var more = document.getElementById('more-games');
  var toggle = document.getElementById('games-toggle');
  var search = document.getElementById('game-search');
  var genreSelect = document.getElementById('game-genre');
  var mobileSelect = document.getElementById('game-mobile');
  var results = document.getElementById('game-results');
  var bugGame = document.getElementById('bug-game');
  var cards = [];
  var ratingKey = 'zappatronic-game-ratings-v1';
  var ratings = Object.create(null);
  var ratingsPersist = true;
  try {
    var storedRatings = JSON.parse(localStorage.getItem(ratingKey) || '{}');
    if (storedRatings && typeof storedRatings === 'object') {
      games.forEach(function (game) {
        var value = storedRatings[game[0]];
        if (Number.isInteger(value) && value >= 1 && value <= 5) ratings[game[0]] = value;
      });
    }
  } catch (error) { ratingsPersist = false; }
  var mobileFriendly = ['freddles-after-dark','orb-runner','math-meadow','dusk-dojo-pixel-fighter','rift-racer-3d','nimbo-s-rainbow-garden','wumble-and-tink','wick-and-cinder','wick-and-cinder-2','the-beyond-files-1-the-girl-in-the-4th-dimension'];
  var desktopOnly = ['arena-clash','silent-vault-3d-heist','wizard-academy-3d','the-beyond-files-4-the-workshop','vengeful-pendulum'];
  function mobileOf(slug) {
    return mobileFriendly.indexOf(slug) !== -1 ? 'friendly' : desktopOnly.indexOf(slug) !== -1 ? 'desktop' : 'unknown';
  }
  function mobileLabel(slug) {
    return { friendly: 'Mobile-friendly', desktop: 'Desktop only', unknown: 'Mobile support not verified' }[mobileOf(slug)];
  }
  function saveRating(slug, value) {
    if (value) ratings[slug] = value;
    else delete ratings[slug];
    try { localStorage.setItem(ratingKey, JSON.stringify(ratings)); ratingsPersist = true; }
    catch (error) { ratingsPersist = false; }
    cards.forEach(function (card) { card.updateRating(); });
    filterGames();
  }
  var genres = {
    Horror: ['freddles-after-dark','the-land-has-no-edge','the-marrow-house','vacancy-case-file-2','hollow-pines-the-hall','hollow-pines-night-watch','last-frame-night-shift','the-beyond-files-4-the-workshop','the-beyond-files-3-blackout-ward','the-beyond-files-2-randy','the-beyond-files-1-the-girl-in-the-4th-dimension','hollowmere'],
    Action: ['Pixel_Omniverse','heartbox-dodge-3d-expanded','arena-clash','orb-runner','dusk-dojo-pixel-fighter','steel-and-sinew','photon-arena','ankle-breakers','juke-hour','total-mayhem'],
    Racing: ['rift-racer-3d'],
    Creative: ['worldsmith'],
    Business: ['business-plan-maker'],
    Music: ['beat-painter'],
    Ideas: ['pitch-slots'],
    Cards: ['deck-studio'],
    Education: ['math-meadow'],
    Puzzle: ['trickshot-tapes','wick-and-cinder-iii'],
    Chat: ['claude-in-claude','claude-in-claude-demo-mode']
  };
  var appSlugs = ['math-meadow', 'claude-in-claude-demo-mode', 'business-plan-maker', 'beat-painter', 'pitch-slots', 'deck-studio'];
  var catalogUrls = { 'deck-studio': 'https://zappatronic.com/apps/deck-studio/', 'beat-painter': 'https://zappatronic.com/apps/beat-painter/index.html', 'pitch-slots': 'https://zappatronic.com/apps/pitch-slots/index.html' };
  function urlOf(slug) { return catalogUrls[slug] || 'https://spaceturismo.github.io/' + slug + '/'; }
  function isAppSlug(slug) { return appSlugs.indexOf(slug) !== -1; }
  var controls = {
    'orb-runner': 'Mouse, touch or arrow keys',
    'vengeful-pendulum': 'Shared keyboard',
    'claude-in-claude': 'Keyboard text input',
    'claude-in-claude-demo-mode': 'Keyboard text input'
  };
  var threeDimensional = ['freddles-after-dark','heartbox-dodge-3d-expanded','hyper-twilight-chapter-1','rift-racer-3d','silent-vault-3d-heist','wizard-academy-3d','photon-arena','worldsmith-globe','the-beyond-files-4-the-workshop','the-beyond-files-3-blackout-ward','the-beyond-files-2-randy','the-beyond-files-1-the-girl-in-the-4th-dimension','ankle-breakers','walker','worldwalker','wick-and-cinder','wick-and-cinder-2','wick-and-cinder-3','wick-and-cinder-saga','hollowmere','nimbo-s-rainbow-garden','wumble-and-tink'];
  function genreOf(slug) {
    return Object.keys(genres).find(function (genre) { return genres[genre].indexOf(slug) !== -1; }) || 'Adventure';
  }
  Array.from(new Set(games.filter(function (game) { return !isAppSlug(game[0]); }).map(function (game) { return genreOf(game[0]); }))).sort().forEach(function (genre) {
    var option = document.createElement('option');
    option.value = genre; option.textContent = genre; genreSelect.appendChild(option);
  });

  games.forEach(function (game, index) {
    var isApp = isAppSlug(game[0]);
    var article = document.createElement('article');
    article.className = 'game';
    var screen = document.createElement('div');
    screen.className = 'screen';
    var image = document.createElement('img');
    image.src = 'images/games/' + game[0] + '.jpg';
    image.alt = game[1] + (isApp ? ' app preview' : ' game preview');
    image.width = 960;
    image.height = 600;
    image.loading = index < 3 ? 'eager' : 'lazy';
    image.decoding = 'async';
    screen.appendChild(image);
    var title = document.createElement('h3');
    title.textContent = game[1];
    var info = document.createElement('div');
    info.className = 'info';
    info.appendChild(title);
    var blurb = document.createElement('p');
    blurb.textContent = window.gameBlurbs[game[0]];
    info.appendChild(blurb);
    var metadata = document.createElement('span');
    metadata.className = 'game-meta';
    metadata.textContent = genreOf(game[0]) + (threeDimensional.indexOf(game[0]) !== -1 ? ' | 3D' : '') + (game[0] === 'claude-in-claude-demo-mode' ? ' | Demo' : '') + (controls[game[0]] ? ' | ' + controls[game[0]] : '') + ' | ' + mobileLabel(game[0]);
    info.appendChild(metadata);
    var rating = document.createElement('fieldset'); rating.className = 'game-rating';
    var legend = document.createElement('legend'); legend.textContent = 'Your rating (this browser)'; rating.appendChild(legend);
    var stars = document.createElement('div'); stars.className = 'rating-stars';
    var choices = [];
    [1, 2, 3, 4, 5].forEach(function (value) {
      var label = document.createElement('label'); label.className = 'rating-choice';
      var input = document.createElement('input'); input.type = 'radio'; input.name = 'rating-' + game[0]; input.value = String(value);
      input.setAttribute('aria-label', 'Rate ' + game[1] + ' ' + value + (value === 1 ? ' star' : ' stars'));
      var star = document.createElement('span'); star.textContent = '\u2605'; star.setAttribute('aria-hidden', 'true');
      input.addEventListener('change', function () { saveRating(game[0], value); });
      label.appendChild(input); label.appendChild(star); stars.appendChild(label); choices.push({ input: input, label: label, value: value });
    });
    var clear = document.createElement('button'); clear.type = 'button'; clear.className = 'rating-clear'; clear.textContent = 'Clear';
    clear.setAttribute('aria-label', 'Clear your rating for ' + game[1]);
    clear.addEventListener('click', function () { saveRating(game[0], 0); });
    stars.appendChild(clear); rating.appendChild(stars);
    var ratingValue = document.createElement('output'); ratingValue.className = 'rating-value'; ratingValue.setAttribute('aria-live', 'polite'); rating.appendChild(ratingValue);
    function updateRating() {
      var value = ratings[game[0]] || 0;
      choices.forEach(function (choice) { choice.input.checked = choice.value === value; choice.label.classList.toggle('is-filled', choice.value <= value); });
      clear.disabled = !value;
      ratingValue.textContent = (value ? value + '/5' : 'Not rated') + (ratingsPersist ? '' : ' | Not saved on this device');
    }
    updateRating(); info.appendChild(rating);
    var actions = document.createElement('div');
    actions.className = 'game-actions';
    var play = document.createElement('a');
    play.className = 'btn hot';
    play.href = urlOf(game[0]);
    play.textContent = isApp ? 'Open app' : 'Play';
    play.setAttribute('aria-label', (isApp ? 'Open ' : 'Play ') + game[1]);
    var source = document.createElement('a');
    source.className = 'btn';
    source.href = catalogUrls[game[0]] ? 'https://github.com/spaceturismo/professor-zappatronic/tree/main/apps/' + game[0] : 'https://github.com/spaceturismo/' + game[0];
    source.textContent = 'GitHub';
    source.setAttribute('aria-label', game[1] + ' on GitHub');
    actions.appendChild(play);
    actions.appendChild(source);
    var report = document.createElement('a');
    report.href = '#feedback'; report.textContent = 'Report bug';
    report.setAttribute('aria-label', 'Report a bug in ' + game[1]);
    report.addEventListener('click', function () { bugGame.value = game[0]; });
    actions.appendChild(report);
    info.appendChild(actions);
    article.appendChild(screen);
    article.appendChild(info);
    (isApp ? document.getElementById('html-apps') : index < 3 ? featured : more).appendChild(article);
    cards.push({ element: article, game: game, genre: genreOf(game[0]), mobile: mobileOf(game[0]), index: index, updateRating: updateRating });
    var option = document.createElement('option'); option.value = game[0]; option.textContent = game[1]; bugGame.appendChild(option);
  });

  document.getElementById('catalog-tools').hidden = false;
  var expanded = false;
  var series = [
    { name: 'The Beyond Files', prefix: 'the-beyond-files-' },
    { name: 'Hollow Pines', prefix: 'hollow-pines-' },
    { name: 'Wick and Cinder', prefix: 'wick-and-cinder' }
  ];
  series.forEach(function (group) {
    group.element = document.createElement('details');
    group.element.className = 'series';
    var summary = document.createElement('summary');
    var preview = document.createElement('img');
    var member = cards.find(function (card) { return card.game[0].indexOf(group.prefix) === 0; });
    preview.src = 'images/games/' + member.game[0] + '.jpg';
    preview.alt = group.name + ' preview';
    preview.width = 960; preview.height = 600; preview.loading = 'lazy';
    summary.appendChild(preview);
    group.label = document.createElement('span');
    summary.appendChild(group.label);
    group.element.appendChild(summary);
    group.chapters = document.createElement('div');
    group.chapters.className = 'games';
    group.element.appendChild(group.chapters);
  });
  function filterGames() {
    var query = search.value.trim().toLowerCase();
    var filtering = !!(query || genreSelect.value || mobileSelect.value);
    var count = 0;
    var focused = document.activeElement;
    cards.filter(function (card) { return !isAppSlug(card.game[0]); }).sort(function (first, second) {
      if (first.index < 3 || second.index < 3) return first.index < 3 && second.index < 3 ? first.index - second.index : first.index < 3 ? -1 : 1;
      return (ratings[second.game[0]] || 0) - (ratings[first.game[0]] || 0) || first.index - second.index;
    }).forEach(function (card, rank) {
      (rank < 3 ? featured : more).appendChild(card.element);
      var match = (!query || card.game[1].toLowerCase().indexOf(query) !== -1) && (!genreSelect.value || card.genre === genreSelect.value) && (!mobileSelect.value || card.mobile === mobileSelect.value);
      card.element.hidden = !match;
      if (match) count++;
    });
    series.forEach(function (group) {
      var members = cards.filter(function (card) { return card.game[0].indexOf(group.prefix) === 0; });
      members.sort(function (first, second) { return first.game[0].localeCompare(second.game[0], undefined, { numeric: true }); });
      members.forEach(function (card) { group.chapters.appendChild(card.element); });
      var matches = members.filter(function (card) { return !card.element.hidden; }).length;
      group.element.hidden = !matches;
      group.label.textContent = group.name + ' | ' + members.length + ' chapters';
      if (filtering) group.element.open = true;
      more.appendChild(group.element);
    });
    document.getElementById('start-here').hidden = filtering;
    more.hidden = !filtering && !expanded;
    toggle.hidden = filtering;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show less' : 'View all';
    results.hidden = !filtering;
    results.textContent = count ? count + (count === 1 ? ' game found' : ' games found') : 'No games found';
    if (focused && focused !== document.body && document.contains(focused)) focused.focus({ preventScroll: true });
  }
  search.addEventListener('input', filterGames);
  genreSelect.addEventListener('change', filterGames);
  mobileSelect.addEventListener('change', filterGames);
  document.getElementById('random-game').addEventListener('click', function () {
    var candidates = cards.filter(function (card) { return !card.element.hidden && !isAppSlug(card.game[0]); });
    if (!candidates.length) { results.hidden = false; results.textContent = 'No playable games match these filters'; return; }
    var chosen = candidates[Math.floor(Math.random() * candidates.length)];
    window.location.assign('https://spaceturismo.github.io/' + chosen.game[0] + '/');
  });
  document.getElementById('bug-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var title = games.find(function (game) { return game[0] === bugGame.value; });
    if (!title) return;
    var body = 'Game or app: ' + title[1] + '\nURL: ' + urlOf(title[0]) + '\n\nWhat happened:\n' + document.getElementById('bug-description').value.trim() + '\n\nDevice and browser: ' + document.getElementById('bug-device').value.trim();
    window.location.href = 'mailto:professorzappatronic@gmail.com?subject=' + encodeURIComponent('Bug report: ' + title[1]) + '&body=' + encodeURIComponent(body);
    document.getElementById('bug-status').textContent = 'Report prepared for your email app. Send it there, or email professorzappatronic@gmail.com directly.';
  });
  fetch('game-updates.json', { cache: 'no-cache' }).then(function (response) { if (!response.ok) throw new Error('Updates unavailable'); return response.json(); }).then(function (updates) {
    updates.slice(0, 5).forEach(function (update) {
      var game = games.find(function (entry) { return entry[0] === update.slug; });
      if (!game) return;
      var item = document.createElement('li');
      var date = document.createElement('time'); date.dateTime = update.date; date.textContent = new Date(update.date + 'T12:00:00Z').toLocaleDateString();
      var link = document.createElement('a'); link.href = 'https://spaceturismo.github.io/' + game[0] + '/'; link.textContent = game[1];
      var text = document.createElement('span'); text.textContent = update.summary;
      item.appendChild(date); item.appendChild(link); item.appendChild(text); document.getElementById('recent-games').appendChild(item);
    });
  }).catch(function () { document.getElementById('recent-games').hidden = true; });
  toggle.hidden = false;
  filterGames();
  toggle.addEventListener('click', function () {
    expanded = !expanded;
    filterGames();
    if (!expanded) {
      toggle.scrollIntoView({ block: 'nearest' });
    }
  });
})();