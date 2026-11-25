(function () {
  'use strict';
  var container = document.getElementById('youtube-posts');
  fetch('youtube-updates.json', { cache: 'no-cache' }).then(function (response) {
    if (!response.ok) throw new Error('Feed unavailable');
    return response.json();
  }).then(function (videos) {
    videos.slice(0, 6).forEach(function (video) {
      if (!/^[A-Za-z0-9_-]{11}$/.test(video.id)) return;
      var article = document.createElement('article');
      var link = document.createElement('a');
      link.href = 'https://www.youtube.com/watch?v=' + video.id;
      var image = document.createElement('img');
      image.src = 'https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg';
      image.alt = video.title; image.width = 480; image.height = 360;
      image.loading = 'lazy'; image.decoding = 'async';
      var title = document.createElement('h3'); title.textContent = video.title;
      var date = document.createElement('time'); date.dateTime = video.published;
      date.textContent = new Date(video.published).toLocaleDateString();
      link.appendChild(image); link.appendChild(title); article.appendChild(link); article.appendChild(date); container.appendChild(article);
    });
    document.getElementById('youtube-latest').hidden = !container.children.length;
  }).catch(function () { document.getElementById('youtube-latest').hidden = true; });
})();