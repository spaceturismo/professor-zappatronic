(function () {
  'use strict';
  var pairsBoard = document.getElementById('pairs-board');
  var pairsStatus = document.getElementById('pairs-status');
  var first = null, locked = false, moves = 0, matched = 0, pairTimer = null;
  function newPairs() {
    clearTimeout(pairTimer); first = null; locked = false; moves = 0; matched = 0;
    pairsStatus.textContent = 'Moves 0'; pairsBoard.replaceChildren();
    var values = ['A','A','B','B','C','C','D','D'];
    for (var position = values.length - 1; position > 0; position--) {
      var swap = Math.floor(Math.random() * (position + 1));
      var saved = values[position]; values[position] = values[swap]; values[swap] = saved;
    }
    values.forEach(function (value, index) {
      var tile = document.createElement('button'); tile.type = 'button'; tile.textContent = '?';
      tile.dataset.pair = value; tile.setAttribute('aria-label', 'Reveal tile ' + (index + 1));
      tile.addEventListener('click', function () {
        if (locked || tile.disabled || first === tile) return;
        tile.textContent = value; tile.setAttribute('aria-label', 'Tile ' + (index + 1) + ': ' + value);
        if (!first) { first = tile; return; }
        var previous = first; first = null; moves++;
        if (previous.dataset.pair === value) {
          previous.disabled = true; tile.disabled = true; matched++;
          pairsStatus.textContent = matched === 4 ? 'Complete in ' + moves + ' moves' : 'Moves ' + moves + ' | Pairs ' + matched + '/4';
        } else {
          locked = true; pairsStatus.textContent = 'Moves ' + moves + ' | Pairs ' + matched + '/4';
          pairTimer = setTimeout(function () {
            [previous, tile].forEach(function (item) { item.textContent = '?'; item.setAttribute('aria-label', 'Reveal tile ' + (Array.from(pairsBoard.children).indexOf(item) + 1)); });
            locked = false;
          }, 700);
        }
      });
      pairsBoard.appendChild(tile);
    });
  }
  document.getElementById('pairs-start').addEventListener('click', newPairs); newPairs();
})();