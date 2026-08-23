(function(){
  "use strict";

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile menu ----
  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('menu');
  var overlay = document.getElementById('navOverlay');
  var lastFocus;

  function openMenu(){
    if (!menu || !overlay || !hamburger) return;
    lastFocus = document.activeElement;
    menu.classList.add('open');
    overlay.hidden = false;
    requestAnimationFrame(function(){ overlay.classList.add('show'); });
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
    var firstLink = menu.querySelector('a');
    if (firstLink) firstLink.focus();
  }
  function closeMenu(){
    if (!menu || !overlay || !hamburger) return;
    menu.classList.remove('open');
    overlay.classList.remove('show');
    setTimeout(function(){ overlay.hidden = true; }, 350);
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  if (hamburger && menu && overlay) {
    hamburger.addEventListener('click', function(){
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        if (window.innerWidth <= 980) closeMenu();
      });
    });
  }

  // ---- Reveal-on-scroll ----
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  // ---- Contact form — honest, no fake backend ----
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var nameInput = document.getElementById('name');
      var phoneInput = document.getElementById('phone');
      var errName = document.getElementById('err-name');
      var errPhone = document.getElementById('err-phone');
      var note = form.querySelector('.notice-demo');

      var nameOk = nameInput && nameInput.value.trim().length > 0;
      var digits = (phoneInput ? phoneInput.value : '').replace(/\D/g,'');
      var phoneOk = /^[6-9]\d{9}$/.test(digits.slice(-10));

      if (errName) errName.textContent = nameOk ? '' : 'कृपया अपना नाम भरें।';
      if (errPhone) errPhone.textContent = phoneOk ? '' : 'कृपया सही 10 अंकों का मोबाइल नंबर भरें।';
      if (!nameOk || !phoneOk) return;

      if (note) {
        note.innerHTML = '<strong>सूचना:</strong> यह फॉर्म अभी सक्रिय नहीं है। कृपया फोन, WhatsApp या ईमेल से सीधे संपर्क करें — ' +
          '<a href="tel:+918528722524">+91 85287 22524</a> · ' +
          '<a href="mailto:info@gangasevasangat.com">info@gangasevasangat.com</a>';
        note.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ==================================================================
  // ---- SEVA GALLERY: real-photo albums + shared lightbox ----
  // ==================================================================
  var ALBUMS = {
    annadan: {
      title: 'अन्नदान / प्रसाद सेवा',
      photos: [
        { src: './assets/img/annadan.jpg', alt: 'अन्नदान सेवा — मीर घाट वाराणसी, भक्तों में प्रसाद वितरण', cap: 'अन्नदान सेवा — मीर घाट' },
        { src: './assets/img/gallery/annadan-01.jpg', alt: 'भंडारा सेवा — भात एवं दाल वितरण की तैयारी', cap: 'भंडारा सेवा — भात एवं दाल वितरण की तैयारी' },
        { src: './assets/img/gallery/annadan-02.jpg', alt: 'भंडारा सेवा — सब्ज़ी तैयार करना', cap: 'भंडारा सेवा — सब्ज़ी तैयार करना' },
        { src: './assets/img/gallery/annadan-03.jpg', alt: 'भंडारा सेवा — सब्ज़ी काटने की तैयारी', cap: 'भंडारा सेवा — सब्ज़ी काटने की तैयारी' },
        { src: './assets/img/gallery/annadan-04.jpg', alt: 'भंडारा सेवा — बड़ी देग खोलते हुए', cap: 'भंडारा सेवा — बड़ी देग खोलते हुए' },
        { src: './assets/img/gallery/annadan-05.jpg', alt: 'भंडारा सेवा — पूड़ी हेतु आटा गूंधना', cap: 'भंडारा सेवा — पूड़ी हेतु आटा गूंधना' },
        { src: './assets/img/gallery/annadan-06.jpg', alt: 'भंडारा सेवा — ग्रेवी तैयार करना', cap: 'भंडारा सेवा — ग्रेवी तैयार करना' },
        { src: './assets/img/gallery/annadan-07.jpg', alt: 'भंडारा सेवा — पूड़ी-सब्ज़ी प्रसाद वितरण', cap: 'भंडारा सेवा — पूड़ी-सब्ज़ी प्रसाद वितरण' }
      ]
    },
    'ganga-ghat': {
      title: 'पितृ सेवा',
      photos: [
        { src: './assets/img/gallery/ganga-ghat-01.jpg', alt: 'गंगा घाट सेवा — पूजन एवं अनुष्ठान', cap: 'गंगा घाट सेवा — पूजन एवं अनुष्ठान' },
        { src: './assets/img/gallery/ganga-ghat-02.jpg', alt: 'गंगा घाट सेवा — जलाभिषेक', cap: 'गंगा घाट सेवा — जलाभिषेक' }
      ]
    },
    jal: {
      title: 'जल सेवा',
      photos: [
        { src: './assets/img/gallery/jal-01.jpg', alt: 'जल सेवा — घाट पर जल व्यवस्था', cap: 'जल सेवा — घाट पर जल व्यवस्था' },
        { src: './assets/img/gallery/jal-02.jpg', alt: 'जल सेवा — शरबत/जल वितरण की तैयारी', cap: 'जल सेवा — शरबत/जल वितरण की तैयारी (रात्रि सेवा)' },
        { src: './assets/img/gallery/jal-03.jpg', alt: 'जल सेवा — शरबत वितरण हेतु तैयार गिलास', cap: 'जल सेवा — शरबत वितरण हेतु तैयार गिलास' },
        { src: './assets/img/gallery/jal-04.jpg', alt: 'जल सेवा — जल पात्र की व्यवस्था', cap: 'जल सेवा — जल पात्र की व्यवस्था' },
        { src: './assets/img/gallery/jal-05.jpg', alt: 'जल सेवा — शरबत घोल तैयार करना', cap: 'जल सेवा — शरबत घोल तैयार करना' },
        { src: './assets/img/gallery/jal-06.jpg', alt: 'जल सेवा — सामग्री की व्यवस्था', cap: 'जल सेवा — सामग्री की व्यवस्था (शरबत हेतु)' }
      ]
    },
    pitra: {
      title: 'घाट सेवा',
      photos: [
        { src: './assets/img/jal-tarpan.jpg', alt: 'जल एवं तर्पण सेवा — गंगा तट वाराणसी', cap: 'जल एवं तर्पण सेवा — गंगा तट' }
      ]
    },
    community: {
      title: 'सामुदायिक सेवा',
      photos: [
        { src: './assets/img/gallery/community-01.jpg', alt: 'सामुदायिक सेवा — घाट पर स्वयंसेवक एवं सेवा दल', cap: 'सामुदायिक सेवा — घाट पर स्वयंसेवक एवं सेवा दल' }
      ]
    }
  };

  var albumOverlay = document.getElementById('albumOverlay');
  var albumPanelTitle = document.getElementById('albumPanelTitle');
  var albumPanelGrid = document.getElementById('albumPanelGrid');
  var albumClose = document.getElementById('albumClose');
  var albumTrigger = null;

  function openAlbum(key, triggerEl) {
    var album = ALBUMS[key];
    if (!album || !albumOverlay || !albumPanelGrid) return;
    albumTrigger = triggerEl || null;
    albumPanelTitle.textContent = album.title + ' — ' + album.photos.length + ' तस्वीरें';
    albumPanelGrid.innerHTML = '';
    album.photos.forEach(function (photo, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', photo.cap);
      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = 'lazy';
      b.appendChild(img);
      b.addEventListener('click', function () { openLightbox(album.photos, i, b); });
      albumPanelGrid.appendChild(b);
    });
    albumOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    if (albumClose) albumClose.focus();
  }
  function closeAlbum() {
    if (!albumOverlay) return;
    albumOverlay.hidden = true;
    if (!lightbox || lightbox.hidden) document.body.style.overflow = '';
    if (albumTrigger) albumTrigger.focus();
  }
  document.querySelectorAll('.album-card').forEach(function (btn) {
    btn.addEventListener('click', function () { openAlbum(btn.getAttribute('data-album'), btn); });
  });
  if (albumClose) albumClose.addEventListener('click', closeAlbum);
  if (albumOverlay) {
    albumOverlay.addEventListener('click', function (e) { if (e.target === albumOverlay) closeAlbum(); });
  }

  // ---- Lightbox (shared by albums + poster grid) ----
  var lightbox = document.getElementById('lightbox');
  var lbImage = document.getElementById('lbImage');
  var lbCaption = document.getElementById('lbCaption');
  var lbCounter = document.getElementById('lbCounter');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var lbStage = lightbox ? lightbox.querySelector('.lb-stage') : null;
  var currentGallery = [];
  var currentIndex = 0;
  var lightboxTrigger = null;

  function renderLightbox() {
    var photo = currentGallery[currentIndex];
    if (!photo || !lbImage) return;
    lbImage.src = photo.src;
    lbImage.alt = photo.alt || '';
    if (lbCaption) lbCaption.textContent = photo.cap || '';
    if (lbCounter) lbCounter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
    var multi = currentGallery.length > 1;
    if (lbPrev) lbPrev.style.display = multi ? '' : 'none';
    if (lbNext) lbNext.style.display = multi ? '' : 'none';
  }
  function openLightbox(gallery, index, triggerEl) {
    if (!lightbox || !gallery || !gallery.length) return;
    currentGallery = gallery;
    currentIndex = index || 0;
    lightboxTrigger = triggerEl || null;
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    if (!albumOverlay || albumOverlay.hidden) document.body.style.overflow = '';
    if (lightboxTrigger) lightboxTrigger.focus();
  }
  function lbNextImg() { currentIndex = (currentIndex + 1) % currentGallery.length; renderLightbox(); }
  function lbPrevImg() { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; renderLightbox(); }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbNext) lbNext.addEventListener('click', lbNextImg);
  if (lbPrev) lbPrev.addEventListener('click', lbPrevImg);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', function (e) {
    if (lightbox && !lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') lbNextImg();
      else if (e.key === 'ArrowLeft') lbPrevImg();
    } else if (albumOverlay && !albumOverlay.hidden && e.key === 'Escape') {
      closeAlbum();
    }
  });

  // Poster grid — wire each figure to the shared lightbox
  var posterGrid = document.getElementById('posterGrid');
  if (posterGrid) {
    var posterItems = Array.prototype.slice.call(posterGrid.querySelectorAll('.gal-item'));
    var posterPhotos = posterItems.map(function (fig) {
      var img = fig.querySelector('img');
      return {
        src: fig.getAttribute('data-lb-src') || (img ? img.src : ''),
        alt: img ? img.alt : '',
        cap: fig.getAttribute('data-lb-cap') || ''
      };
    });
    posterItems.forEach(function (fig, i) {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      fig.addEventListener('click', function () { openLightbox(posterPhotos, i, fig); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(posterPhotos, i, fig); }
      });
    });
  }

  // Touch swipe (mobile) — next/prev within lightbox
  if (lbStage) {
    var touchStartX = 0, touchEndX = 0;
    lbStage.addEventListener('touchstart', function (e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    lbStage.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 40 && currentGallery.length > 1) {
        if (delta < 0) lbNextImg(); else lbPrevImg();
      }
    }, { passive: true });
  }
})();
