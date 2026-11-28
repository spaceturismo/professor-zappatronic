(function () {
  'use strict';

  var storageKey = 'zappatronic-profiles-v1';
  var guestRatingKey = 'zappatronic-game-ratings-v1';
  var control = document.getElementById('profile-control');
  var select = document.getElementById('profile-select');
  var dialog = document.getElementById('profile-dialog');
  var status = document.getElementById('profile-status');
  var nameInput = document.getElementById('profile-name');
  var state = { active: null, profiles: [] };
  var available = true;

  try {
    var stored = localStorage.getItem(storageKey);
    if (stored) {
      state = JSON.parse(stored);
      if (!state || !Array.isArray(state.profiles) || state.profiles.length > 20 ||
          state.profiles.some(function (profile) {
            return !profile || typeof profile.id !== 'string' || !/^[a-z0-9-]+$/i.test(profile.id) ||
              typeof profile.name !== 'string' || !profile.name.trim() || profile.name.length > 32;
          }) || new Set(state.profiles.map(function (profile) { return profile.id; })).size !== state.profiles.length ||
          (state.active !== null && !state.profiles.some(function (profile) { return profile.id === state.active; }))) {
        throw new Error('Invalid profile data');
      }
    }
    var probe = storageKey + '-probe';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
  } catch (error) {
    available = false;
    state = { active: null, profiles: [] };
  }

  function ratingKey(id) { return id ? guestRatingKey + ':' + id : guestRatingKey; }
  window.zappatronicProfiles = { ratingKey: ratingKey(state.active) };

  function save(next) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      window.location.reload();
    } catch (error) {
      status.textContent = 'Profile could not be saved. Browser storage is unavailable or full.';
      select.value = state.active || '';
    }
  }

  var guest = document.createElement('option');
  guest.value = '';
  guest.textContent = 'Guest';
  select.appendChild(guest);
  state.profiles.forEach(function (profile) {
    var option = document.createElement('option');
    option.value = profile.id;
    option.textContent = profile.name;
    select.appendChild(option);
  });
  select.value = state.active || '';
  select.disabled = !available;
  control.hidden = false;
  var active = state.profiles.find(function (profile) { return profile.id === state.active; });
  document.getElementById('profile-current').textContent = (active ? active.name : 'Guest') + ' | This browser only';
  if (!available) status.textContent = 'Profiles unavailable: browser storage is blocked or saved profile data is invalid.';
  document.getElementById('profile-create').querySelector('button').disabled = !available;
  document.getElementById('profile-delete').disabled = !active || !available;
  document.getElementById('profile-guest').disabled = !active || !available;

  document.getElementById('profile-manage').addEventListener('click', function () { dialog.showModal(); });
  document.getElementById('profile-close').addEventListener('click', function () { dialog.close(); });
  select.addEventListener('change', function () {
    save({ active: select.value || null, profiles: state.profiles });
  });
  document.getElementById('profile-guest').addEventListener('click', function () {
    save({ active: null, profiles: state.profiles });
  });
  document.getElementById('profile-create').addEventListener('submit', function (event) {
    event.preventDefault();
    if (!available) return;
    var name = nameInput.value.trim();
    if (!name || name.length > 32) { status.textContent = 'Enter a name between 1 and 32 characters.'; return; }
    if (state.profiles.length >= 20) { status.textContent = 'This browser already has 20 profiles.'; return; }
    if (state.profiles.some(function (profile) { return profile.name.toLowerCase() === name.toLowerCase(); })) {
      status.textContent = 'A profile with that name already exists.';
      return;
    }
    var id = crypto.randomUUID();
    save({ active: id, profiles: state.profiles.concat([{ id: id, name: name }]) });
  });
  document.getElementById('profile-delete').addEventListener('click', function () {
    if (!active || !available || !window.confirm('Delete ' + active.name + ' and their site ratings from this browser?')) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ active: null, profiles: state.profiles.filter(function (profile) { return profile.id !== active.id; }) }));
      localStorage.removeItem(ratingKey(active.id));
      window.location.reload();
    } catch (error) { status.textContent = 'Profile deletion could not be completed.'; }
  });
  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null) window.location.reload();
  });
}());