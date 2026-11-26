(function () {
  'use strict';
  var groups = {
    games: ['games', 'apps'],
    music: ['music', 'tiktok-beats'],
    minigames: ['minigames'],
    'latest-drops': ['latest-drops', 'tiktok-beats'],
    bio: ['bio', 'channels'],
    feedback: ['business', 'feedback']
  };
  var navigation = document.querySelector('nav[aria-label="Sections"]');
  var sections = Array.from(document.querySelectorAll('main > section'));
  var hero = document.querySelector('.hero');
  var header = document.querySelector('header');
  function sizeHeader() {
    document.documentElement.style.scrollPaddingTop = (header.getBoundingClientRect().height + 16) + 'px';
  }
  sizeHeader();
  new ResizeObserver(sizeHeader).observe(header);
  function route() {
    sizeHeader();
    var target = location.hash.slice(1) || 'games';
    var group = Object.keys(groups).find(function (name) {
      return groups[name].indexOf(target) !== -1;
    }) || 'games';
    sections.forEach(function (section) {
      section.hidden = groups[group].indexOf(section.id) === -1;
    });
    hero.hidden = target !== 'top';
    navigation.querySelectorAll('a').forEach(function (link) {
      if (link.hash === '#' + group) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    var destination = document.getElementById(target === 'top' ? 'top' : (groups[group].indexOf(target) !== -1 ? target : group));
    destination.scrollIntoView({ behavior: 'instant', block: 'start' });
    var heading = destination.querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
  window.addEventListener('hashchange', route);
  route();
  var toggle = document.getElementById('interface-sound');
  var audio = null;
  var enabled = false;
  try { enabled = localStorage.getItem('zappatronic-interface-sound') === 'on'; } catch (error) {}
  toggle.checked = enabled;
  var AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (AudioEngine) toggle.parentElement.hidden = false;
  function sound(kind) {
    if (!enabled || !AudioEngine || document.hidden) return;
    try {
      if (!audio) audio = new AudioEngine();
      if (audio.state === 'suspended') audio.resume().catch(function () {});
      var start = audio.currentTime;
      var frequencies = kind === 'success' ? [523, 659, 784] : kind === 'ready' ? [880, 1320] : [440, 660];
      frequencies.forEach(function (frequency, index) {
        var oscillator = audio.createOscillator();
        var gain = audio.createGain();
        var onset = start + index * 0.045;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, onset);
        gain.gain.setValueAtTime(0, onset);
        gain.gain.linearRampToValueAtTime(0.035, onset + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, onset + 0.1);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(onset);
        oscillator.stop(onset + 0.11);
        oscillator.onended = function () { oscillator.disconnect(); gain.disconnect(); };
      });
    } catch (error) {}
  }
  toggle.addEventListener('change', function () {
    enabled = toggle.checked;
    try { localStorage.setItem('zappatronic-interface-sound', enabled ? 'on' : 'off'); } catch (error) {}
    if (enabled) sound('success');
    else if (audio) audio.suspend().catch(function () {});
  });
  document.addEventListener('click', function (event) {
    if (event.target.closest('a, button, .rating-stars') && !event.target.closest('.sound-control')) sound('tap');
  });
  var pad = document.getElementById('rz-pad');
  new MutationObserver(function () {
    if (pad.classList.contains('go')) sound('ready');
    else if (/^\d+ ms/.test(pad.textContent)) sound('success');
  }).observe(pad, { attributes: true, attributeFilter: ['class'], childList: true });
  var pairs = document.getElementById('pairs-status');
  new MutationObserver(function () {
    if (pairs.textContent.indexOf('Complete') === 0) sound('success');
  }).observe(pairs, { childList: true });
})();