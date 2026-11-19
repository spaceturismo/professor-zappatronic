(function () {
  'use strict';

  var games = [
    ['Pixel_Omniverse', 'Pixel Omniverse'],
    ['arena-clash', 'Arena Clash'],
    ['orb-runner', 'Orb Runner'],
    ['freddles-after-dark', 'Freddles After Dark'],
    ['heartbox-dodge-3d-expanded', 'Heartbox Dodge 3D Expanded'],
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
    ['claude-in-claude', 'Claude in Claude'],
    ['claude-in-claude-demo-mode', 'Claude in Claude - Demo Mode'],
    ['hollowmere', 'Hollowmere'],
    ['nimbo-s-rainbow-garden', "Nimbo's Rainbow Garden"],
    ['wumble-and-tink', 'Wumble and Tink']
  ];
  var featured = document.getElementById('featured-games');
  var more = document.getElementById('more-games');
  var toggle = document.getElementById('games-toggle');

  games.forEach(function (game, index) {
    var article = document.createElement('article');
    article.className = 'game';
    var screen = document.createElement('div');
    screen.className = 'screen';
    var image = document.createElement('img');
    image.src = 'images/games/' + game[0] + '.jpg';
    image.alt = game[1] + ' game preview';
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
    var actions = document.createElement('div');
    actions.className = 'game-actions';
    var play = document.createElement('a');
    play.className = 'btn hot';
    play.href = 'https://spaceturismo.github.io/' + game[0] + '/';
    play.textContent = 'Play';
    play.setAttribute('aria-label', 'Play ' + game[1]);
    var source = document.createElement('a');
    source.className = 'btn';
    source.href = 'https://github.com/spaceturismo/' + game[0];
    source.textContent = 'GitHub';
    source.setAttribute('aria-label', game[1] + ' on GitHub');
    actions.appendChild(play);
    actions.appendChild(source);
    info.appendChild(actions);
    article.appendChild(screen);
    article.appendChild(info);
    (index < 3 ? featured : more).appendChild(article);
  });

  toggle.hidden = false;
  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') !== 'true';
    more.hidden = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show less' : 'View all';
    if (!expanded) {
      toggle.scrollIntoView({ block: 'nearest' });
    }
  });
})();