/* ============================================================
   Gabokeke: motion layer
   Everything here is progressive enhancement. If GSAP or Lenis
   fail to load, the page still renders, scrolls and works.
   ============================================================ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------
     Nestuge checkout links.
     Paste the hosted product ("nest") URL for each key and every
     button carrying the matching data-buy picks it up. A key left
     empty leaves its buttons inert rather than jumping to the top
     of the page, and says so in the console.
     --------------------------------------------------------- */
  var CHECKOUT = {
    mylora:  'https://nestuge.com/mylorabycj',
    corvane: 'https://nestuge.com/corvanebycj'
  };

  /* ---------------------------------------------------------
     Support form delivery.
     FormSubmit relays the form to emmanuel@gabokeke.com. The string
     below is FormSubmit's alias for that inbox — it keeps the address
     out of the page source, where scrapers would find it. Activation
     is tied to the inbox, not to a domain. Moving to Formspree or
     Web3Forms later is a change to this one URL.
     --------------------------------------------------------- */
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/d28fcdc5ce1aa9043eb2060081a60e6f';

  var REDUCED  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var HAS_GSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var COARSE   = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var MOTION   = HAS_GSAP && !REDUCED;
  var html     = document.documentElement;

  if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);
  else html.classList.add('no-gsap');

  /* ---------------------------------------------------------
     0. shared scroll loop
     Every scroll-driven piece of chrome subscribes here instead of
     registering its own listener, so a scroll costs one rAF and one set
     of cached measurements per frame rather than a layout read per
     handler per event. scrollEpoch lets pointer handlers know when their
     cached rects went stale without reading the DOM to find out.
     --------------------------------------------------------- */
  var scrollSubs = [], scrollQueued = false;
  var maxScroll = 0, viewH = window.innerHeight, scrollEpoch = 0;

  function measureViewport() {
    viewH = window.innerHeight;
    maxScroll = Math.max(0, document.documentElement.scrollHeight - viewH);
    scrollEpoch++;
  }

  function flushScroll() {
    scrollQueued = false;
    scrollEpoch++;
    var y = window.pageYOffset;
    var p = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;
    for (var i = 0; i < scrollSubs.length; i++) scrollSubs[i](y, p);
  }

  function onScroll(fn) { scrollSubs.push(fn); }

  function initScrollLoop() {
    measureViewport();
    window.addEventListener('scroll', function () {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(flushScroll);
    }, { passive: true });
    window.addEventListener('resize', measureViewport, { passive: true });
    if (HAS_GSAP) ScrollTrigger.addEventListener('refresh', measureViewport);
  }

  /* Rect cache for pointer effects: read once on enter, re-read only if
     the page scrolled since. Avoids a layout read on every mousemove. */
  function rectReader(el) {
    var r = null, epoch = -1;
    return function () {
      if (!r || epoch !== scrollEpoch) { r = el.getBoundingClientRect(); epoch = scrollEpoch; }
      return r;
    };
  }

  /* ---------------------------------------------------------
     1. smooth scroll (Lenis) + ScrollTrigger sync
     --------------------------------------------------------- */
  var lenis = null;

  function initScroll() {
    if (REDUCED || typeof window.Lenis === 'undefined') return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.6 });

    if (HAS_GSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function scrollTo(target) {
    if (lenis) { lenis.scrollTo(target, { offset: -90, duration: 1.2 }); return; }
    var el = typeof target === 'string' ? $(target) : target;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' });
  }

  /* ---------------------------------------------------------
     2. text splitting: words, then lines grouped by offsetTop
     --------------------------------------------------------- */
  var splitTargets = [];

  function wrapWords(el) {
    var out = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          var s = document.createElement('span');
          s.className = 'word';
          s.style.display = 'inline-block';
          s.textContent = p;
          frag.appendChild(s);
          out.push(s);
        });
        el.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        if (node.tagName === 'BR') { out.push(node); return; }
        node.classList.add('word');
        node.style.display = node.classList.contains('chip') ? 'inline-grid' : 'inline-block';
        out.push(node);
      }
    });
    return out;
  }

  function splitToLines(el) {
    var words = wrapWords(el);
    var lines = [], current = [], refTop = null;

    // Tolerance scales with the type size, so a taller inline element
    // (the hero's icon chip) never reads as the start of a new line.
    var probe = words.filter(function (w) { return w.tagName !== 'BR'; })[0];
    var tol = probe ? Math.max(8, probe.offsetHeight * 0.55) : 12;

    words.forEach(function (w) {
      if (w.tagName === 'BR') { if (current.length) lines.push(current); current = []; refTop = null; return; }
      var top = w.offsetTop;
      if (refTop === null) refTop = top;
      if (top - refTop > tol) { lines.push(current); current = []; refTop = top; }
      current.push(w);
    });
    if (current.length) lines.push(current);

    var frag = document.createDocumentFragment();
    lines.forEach(function (lineWords) {
      var line = document.createElement('span');
      line.className = 'line';
      var inner = document.createElement('span');
      inner.className = 'line__in';
      lineWords.forEach(function (w, i) {
        if (i) inner.appendChild(document.createTextNode(' '));
        inner.appendChild(w);
      });
      line.appendChild(inner);
      frag.appendChild(line);
    });

    el.innerHTML = '';
    el.appendChild(frag);
    return $$('.line__in', el);
  }

  function prepareSplits() {
    $$('[data-split]').forEach(function (el) {
      if (!el.dataset.origHtml) el.dataset.origHtml = el.innerHTML;
      else el.innerHTML = el.dataset.origHtml;

      if (el.dataset.split === 'words') wrapWords(el);
      else splitToLines(el);

      if (splitTargets.indexOf(el) === -1) splitTargets.push(el);
    });
  }

  function whenFontsReady(cb) {
    var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    var done = false;
    var go = function () { if (done) return; done = true; cb(); };
    ready.then(go).catch(go);
    // With no loader covering the wait, a masked hero reads as a blank page,
    // so cap it short and accept fallback-font line breaks in the rare slow case.
    setTimeout(go, 900);
  }

  /* ---------------------------------------------------------
     3. custom cursor
     --------------------------------------------------------- */
  function initCursor() {
    if (COARSE || !MOTION) return;
    var cur = $('[data-cursor]');
    if (!cur) return;
    var dot = $('.cursor__dot', cur), ring = $('.cursor__ring', cur);

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    var dx = gsap.quickTo(dot, 'x', { duration: .14, ease: 'power3' });
    var dy = gsap.quickTo(dot, 'y', { duration: .14, ease: 'power3' });
    var rx = gsap.quickTo(ring, 'x', { duration: .5, ease: 'power3' });
    var ry = gsap.quickTo(ring, 'y', { duration: .5, ease: 'power3' });

    window.addEventListener('mousemove', function (e) {
      gsap.to(cur, { opacity: 1, duration: .3, overwrite: 'auto' });
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', function () { gsap.to(cur, { opacity: 0, duration: .3 }); });

    $$('a, button, [data-tilt], summary').forEach(function (el) {
      el.addEventListener('mouseenter', function () { gsap.to(ring, { scale: 1.75, duration: .4, ease: 'power3' }); });
      el.addEventListener('mouseleave', function () { gsap.to(ring, { scale: 1, duration: .4, ease: 'power3' }); });
    });
  }

  /* ---------------------------------------------------------
     5. nav: solid state, hide on scroll down, hover pill, menu
     --------------------------------------------------------- */
  function initNav() {
    var nav = $('[data-nav]');
    if (!nav) return;
    var last = 0, hidden = false;

    function setHidden(v) {
      if (v === hidden) return;
      hidden = v;
      if (HAS_GSAP) gsap.to(nav, { y: v ? -(nav.offsetHeight + 34) : 0, duration: .5, ease: 'power3.out', overwrite: 'auto' });
      else nav.classList.toggle('is-hidden', v);
    }

    onScroll(function (y) {
      nav.classList.toggle('is-solid', y > 40);
      if (y > 320 && y > last + 4) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
    });

    var links = $$('.nav__links a'), pill = $('[data-nav-pill]'), linkWrap = $('.nav__links');
    if (pill && linkWrap && HAS_GSAP) {
      links.forEach(function (a) {
        a.addEventListener('mouseenter', function () {
          gsap.to(pill, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1, duration: .4, ease: 'power3.out' });
        });
      });
      linkWrap.addEventListener('mouseleave', function () { gsap.to(pill, { opacity: 0, duration: .3 }); });
    }

    if (HAS_GSAP) {
      ['#top', '#catalog', '#support'].forEach(function (id) {
        var sec = $(id);
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec, start: 'top 55%', end: 'bottom 55%',
          onToggle: function (self) {
            if (!self.isActive) return;
            links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === id); });
          }
        });
      });
    }

    var burger = $('[data-burger]'), menu = $('[data-menu]');
    if (burger && menu) {
      var setMenu = function (open) {
        menu.classList.toggle('is-open', open);
        burger.classList.toggle('is-on', open);
        nav.classList.toggle('is-menu', open);
        burger.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('is-locked', open);
        if (lenis) { open ? lenis.stop() : lenis.start(); }
      };
      burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
      $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    }

    var search = $('[data-search]');
    if (search) search.addEventListener('click', function () { scrollTo('#catalog'); });
  }

  /* ---------------------------------------------------------
     6. anchors, scroll progress, back-to-top
     --------------------------------------------------------- */
  function initChrome() {
    $$('[data-scrollto]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) !== '#') return;
        e.preventDefault();
        scrollTo(href);
      });
    });

    var bar = $('[data-progress]'), top = $('[data-totop]');
    onScroll(function (y, p) {
      if (bar) bar.style.transform = 'scaleX(' + p + ')';
      if (top) top.classList.toggle('is-on', y > viewH * 0.9);
    });

    if (top) top.addEventListener('click', function () { scrollTo('#top'); });
  }

  /* ---------------------------------------------------------
     7. magnetic buttons
     --------------------------------------------------------- */
  function initMagnetic() {
    if (COARSE || !MOTION) return;
    $$('[data-magnetic]').forEach(function (el) {
      var inner = el.querySelector('span') || el;
      var xTo  = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' });
      var yTo  = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
      var ixTo = gsap.quickTo(inner, 'x', { duration: .6, ease: 'power3' });
      var iyTo = gsap.quickTo(inner, 'y', { duration: .6, ease: 'power3' });

      var rect = rectReader(el);
      el.addEventListener('mousemove', function (e) {
        var r = rect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        xTo(mx * .32); yTo(my * .42); ixTo(mx * .14); iyTo(my * .18);
      });
      el.addEventListener('mouseleave', function () { xTo(0); yTo(0); ixTo(0); iyTo(0); });
    });
  }

  /* ---------------------------------------------------------
     8. 3D tilt on cards
     --------------------------------------------------------- */
  function initTilt() {
    if (COARSE || !MOTION) return;
    $$('[data-tilt]').forEach(function (el) {
      gsap.set(el, { transformPerspective: 900 });
      var rxTo = gsap.quickTo(el, 'rotateX', { duration: .6, ease: 'power3' });
      var ryTo = gsap.quickTo(el, 'rotateY', { duration: .6, ease: 'power3' });

      var rect = rectReader(el);
      el.addEventListener('mousemove', function (e) {
        var r = rect();
        rxTo(-((e.clientY - r.top) / r.height - .5) * 7);
        ryTo(((e.clientX - r.left) / r.width - .5) * 9);
      });
      el.addEventListener('mouseleave', function () { rxTo(0); ryTo(0); });
    });
  }

  /* ---------------------------------------------------------
     9. generic scroll reveals + split-heading masks
     --------------------------------------------------------- */
  function initReveals() {
    if (!HAS_GSAP) return;

    $$('[data-reveal]').forEach(function (el) {
      var mode = el.dataset.reveal || 'up';
      var from = { opacity: 0 };
      if (mode === 'up') from.y = 34;
      if (mode === 'scale') from.scale = .94;

      gsap.fromTo(el, from, {
        opacity: 1, y: 0, scale: 1,
        duration: .9, delay: parseFloat(el.dataset.delay || 0), ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    var heroTitle = $('.hero__title');
    splitTargets.forEach(function (el) {
      if (el === heroTitle) return; // the hero intro timeline owns this one

      if (el.dataset.split === 'words') {
        gsap.to($$('.word', el), {
          opacity: 1, duration: .7, stagger: .022, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      } else {
        gsap.to($$('.line__in', el), {
          y: '0%', duration: 1.05, stagger: .09, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      }
    });
  }

  /* ---------------------------------------------------------
     10. hero intro, floating chip, blob + rail parallax
     --------------------------------------------------------- */
  function initHero() {
    if (!HAS_GSAP) return;

    var heroTitle = $('.hero__title');
    var tl = gsap.timeline({ delay: .05 });

    tl.fromTo('.nav', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'expo.out' }, 0);
    if (heroTitle) tl.to($$('.line__in', heroTitle), { y: '0%', duration: 1.15, stagger: .1, ease: 'expo.out' }, 0);

    tl.fromTo('.hero__aside', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out' }, .35)
      .fromTo('[data-avatars] > *', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, stagger: .07, ease: 'back.out(2)' }, .5)
      .fromTo('[data-rail-card]', { y: 70, opacity: 0, rotateX: 14 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: .08, ease: 'expo.out' }, .45);

    var chip = $('[data-float]');
    if (chip && !REDUCED) gsap.to(chip, { y: -6, rotate: -5, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    var heroST = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.blob--1', { y: 120, ease: 'none', scrollTrigger: heroST });
    gsap.to('.blob--2', { y: 180, x: -60, ease: 'none', scrollTrigger: heroST });
    gsap.to('.blob--3', { y: 90, ease: 'none', scrollTrigger: heroST });

    // Desktop only: below 1081px the rail is a native scroll container,
    // so a transform on it would fight the user's own swipe.
    var rail = $('[data-rail]');
    if (rail) {
      gsap.matchMedia().add('(min-width: 1081px)', function () {
        gsap.to(rail, {
          x: function () {
            var overflow = Math.max(0, rail.scrollWidth - window.innerWidth);
            return -Math.min(overflow, window.innerWidth * .35);
          },
          ease: 'none', invalidateOnRefresh: true,
          scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: 1 }
        });
        return function () { gsap.set(rail, { x: 0 }); };
      });
    }

    gsap.to('.hero__inner', {
      y: -40, opacity: .5, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: true }
    });
  }

  /* ---------------------------------------------------------
     11. marquee: seamless loop, speeds up with scroll velocity
     --------------------------------------------------------- */
  function initMarquee() {
    var wrap = $('[data-marquee]'), track = $('[data-marquee-track]');
    if (!wrap || !track || !HAS_GSAP) return;

    var original = track.innerHTML;
    track.innerHTML = original + original + original;

    var half = track.scrollWidth / 3;
    if (!half) return;

    var tween = gsap.to(track, {
      x: -half, duration: 22, ease: 'none', repeat: -1,
      modifiers: { x: function (x) { return (parseFloat(x) % half) + 'px'; } }
    });

    var base = 1, resetT;
    if (!REDUCED) {
      ScrollTrigger.create({
        onUpdate: function (self) {
          var v = self.getVelocity();
          base = v < 0 ? -1 : 1;
          var boost = base * Math.min(6, 1 + Math.abs(v) / 700);
          gsap.killTweensOf(tween);
          tween.timeScale(boost);
          clearTimeout(resetT);
          resetT = setTimeout(function () {
            gsap.to(tween, { timeScale: base, duration: .8, ease: 'power2.out' });
          }, 120);
        }
      });
    }

    wrap.addEventListener('mouseenter', function () { gsap.to(tween, { timeScale: 0, duration: .4, overwrite: true }); });
    wrap.addEventListener('mouseleave', function () { gsap.to(tween, { timeScale: base, duration: .4, overwrite: true }); });
  }

  /* ---------------------------------------------------------
     12. features: pinned horizontal strip (desktop only)
     --------------------------------------------------------- */
  function initFeatures() {
    var grid = $('[data-features-grid]');
    if (!grid || !HAS_GSAP) return;

    gsap.fromTo($$('.fcard', grid), { opacity: 0, y: 46, scale: .97 }, {
      opacity: 1, y: 0, scale: 1, duration: 1, stagger: .08, ease: 'expo.out',
      scrollTrigger: { trigger: grid, start: 'top 80%', once: true }
    });
  }

  /* ---------------------------------------------------------
     13. catalog: reveal + FLIP filter
     --------------------------------------------------------- */
  function initCatalog() {
    var grid = $('[data-grid]'), toggle = $('[data-filter]');
    if (!grid) return;
    var items = $$('[data-item]', grid);

    if (HAS_GSAP) {
      gsap.fromTo(items, { opacity: 0, y: 48 }, {
        opacity: 1, y: 0, duration: 1, stagger: .08, ease: 'expo.out',
        scrollTrigger: { trigger: grid, start: 'top 82%', once: true }
      });
    }

    if (!toggle) return;
    var btns = $$('button', toggle), thumb = $('[data-filter-thumb]');

    function moveThumb(btn, instant) {
      if (!thumb) return;
      if (HAS_GSAP && !instant) gsap.to(thumb, { x: btn.offsetLeft - 4, width: btn.offsetWidth, duration: .45, ease: 'power3.out' });
      else { thumb.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)'; thumb.style.width = btn.offsetWidth + 'px'; }
    }

    function applyFilter(kind) {
      // FLIP: measure first, mutate, then invert-and-play the survivors
      var first = items.map(function (el) { return el.getBoundingClientRect(); });

      items.forEach(function (el) {
        el.classList.toggle('is-out', !(kind === 'all' || el.dataset.kind === kind));
      });

      if (!MOTION) return;

      items.forEach(function (el, i) {
        if (el.classList.contains('is-out')) return;
        var last = el.getBoundingClientRect();
        if (first[i].width === 0) {
          gsap.fromTo(el, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .5, ease: 'power3.out' });
        } else {
          gsap.fromTo(el,
            { x: first[i].left - last.left, y: first[i].top - last.top },
            { x: 0, y: 0, duration: .6, ease: 'power3.inOut' });
        }
      });
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (o) { o.classList.remove('is-on'); });
        b.classList.add('is-on');
        moveThumb(b);
        applyFilter(b.dataset.f);
        if (HAS_GSAP) ScrollTrigger.refresh();
      });
    });

    requestAnimationFrame(function () {
      var on = toggle.querySelector('.is-on');
      if (on) moveThumb(on, true);
    });
  }

  /* ---------------------------------------------------------
     13b. checkout: point every buy button at its Nestuge product
     --------------------------------------------------------- */
  function initCheckout() {
    $$('[data-buy]').forEach(function (el) {
      var key = el.getAttribute('data-buy');
      var url = CHECKOUT[key];

      if (url) {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
        return;
      }

      // Nothing pasted yet: an href="#" would fling the page to the top,
      // which reads as a broken button rather than an unfinished one.
      el.setAttribute('aria-disabled', 'true');
      el.addEventListener('click', function (e) { e.preventDefault(); });
      if (window.console) console.warn('[gabokeke] no CHECKOUT url for "' + key + '"');
    });
  }

  /* ---------------------------------------------------------
     14. detail sheet: every screen plus the pitch, per dashboard
     --------------------------------------------------------- */
  function initSheet() {
    var sheet = $('[data-sheet]');
    if (!sheet) return;

    var panel   = $('[data-sheet-panel]', sheet);
    var scrim   = $('.sheet__scrim', sheet);
    var scroll  = $('[data-sheet-scroll]', sheet);
    var details = $$('[data-detail]', sheet);
    var opener = null, anim = null;

    function show(key) {
      var active = null;
      details.forEach(function (d) {
        var on = d.dataset.detail === key;
        d.hidden = !on;
        if (on) active = d;
      });
      if (!active) return;

      var heading = $('h2', active);
      if (heading) panel.setAttribute('aria-label', heading.textContent + ', full details');

      opener = document.activeElement;
      sheet.hidden = false;
      document.body.classList.add('is-locked');
      if (lenis) lenis.stop();
      scroll.scrollTop = 0;

      if (MOTION) {
        if (anim) anim.kill();
        anim = gsap.timeline()
          .fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: .45, ease: 'power2.out' }, 0)
          .fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: .75, ease: 'expo.out' }, 0)
          .fromTo($$('[data-sheet-in]', active),
                  { y: 28, opacity: 0 },
                  { y: 0, opacity: 1, duration: .7, stagger: .055, ease: 'expo.out' }, .2);
      } else if (HAS_GSAP) {
        gsap.set([scrim, panel], { clearProps: 'all' });
      }

      // Focus the scroll region, not the close button: keyboard scrolling acts on
      // the nearest scrollable ancestor of whatever holds focus.
      scroll.focus();
    }

    function hide(after) {
      if (sheet.hidden) return;

      var done = function () {
        sheet.hidden = true;
        details.forEach(function (d) { d.hidden = true; });
        document.body.classList.remove('is-locked');
        if (lenis) lenis.start();
        if (opener && opener.focus) opener.focus();
        opener = null;
        if (after) after();
      };

      if (MOTION) {
        if (anim) anim.kill();
        anim = gsap.timeline({ onComplete: done })
          .to(panel, { xPercent: 100, duration: .5, ease: 'power3.in' }, 0)
          .to(scrim, { opacity: 0, duration: .45, ease: 'power2.in' }, 0);
      } else done();
    }

    $$('[data-open]').forEach(function (el) {
      el.addEventListener('click', function () { show(el.dataset.open); });
      el.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        show(el.dataset.open);
      });
    });

    $$('[data-sheet-close]', sheet).forEach(function (el) {
      el.addEventListener('click', function () { hide(); });
    });

    // Anchors inside the panel: close first, then scroll, or Lenis is still
    // stopped when the scroll is asked for and nothing moves.
    $$('[data-sheet-goto]', sheet).forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var target = el.getAttribute('data-sheet-goto');
        hide(function () { scrollTo(target); });
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hide();
    });

    // Tab stays inside the panel while it is open.
    sheet.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button, [tabindex]:not([tabindex="-1"])', panel)
                .filter(function (el) { return el.offsetWidth || el.offsetHeight; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------------------------------------------------------
     15. number counters
     --------------------------------------------------------- */
  function initCounters() {
    if (!HAS_GSAP) return;
    $$('[data-count]').forEach(function (el) {
      var raw = el.dataset.count;
      var target = parseFloat(raw);
      var suffix = el.dataset.suffix || '';
      // keep the source's decimal places, so "89.99" does not round to 90
      var dp = (raw.split('.')[1] || '').length;
      var fmt = function (n) { return dp ? n.toFixed(dp) : Math.round(n).toLocaleString(); };

      var obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: function () { el.textContent = fmt(obj.v) + suffix; },
        onComplete: function () { el.textContent = fmt(target) + suffix; }
      });
    });
  }

  /* ---------------------------------------------------------
     16. bundle card + collage fan-out
     --------------------------------------------------------- */
  function initBundle() {
    if (!HAS_GSAP) return;

    var card = $('[data-bundle]');
    if (card) {
      gsap.fromTo(card, { scale: .93, opacity: 0, borderRadius: 60 }, {
        scale: 1, opacity: 1, borderRadius: 34, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true }
      });
    }

    var tiles = $$('[data-collage] .phone');
    if (!tiles.length) return;

    gsap.fromTo(tiles, { opacity: 0, y: 40, rotateY: -22, scale: .88 }, {
      opacity: 1, y: 0, rotateY: 0, scale: 1, duration: 1, stagger: .06, ease: 'expo.out',
      scrollTrigger: { trigger: '[data-collage]', start: 'top 88%', once: true },
      onComplete: function () {
        if (REDUCED) return;
        tiles.forEach(function (t, i) {
          gsap.to(t, { y: (i % 2 ? 1 : -1) * 10, duration: 2.6 + i * .18, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * .12 });
        });
      }
    });
  }

  /* ---------------------------------------------------------
     17. story: testimonial carousel (vanilla, no GSAP needed)
     --------------------------------------------------------- */
  function initStory() {
    $$('[data-carousel]').forEach(function (car) {
      var track = $('[data-carousel-track]', car);
      var slides = $$('[data-slide]', car);
      var dotWrap = $('[data-carousel-dots]', car);
      var viewport = $('[data-carousel-viewport]', car);
      if (!track || slides.length < 2) return;

      var index = 0;
      var timer = null;
      var DELAY = 7000;

      var dots = slides.map(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Story ' + (i + 1) + ' of ' + slides.length);
        b.addEventListener('click', function () { go(i); restart(); });
        dotWrap.appendChild(b);
        return b;
      });

      function go(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = 'translate3d(' + (-index * 100) + '%,0,0)';
        slides.forEach(function (s, n) { s.setAttribute('aria-hidden', String(n !== index)); });
        dots.forEach(function (d, n) { d.setAttribute('aria-current', String(n === index)); });
      }

      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      function start() { if (!REDUCED && !timer) timer = setInterval(function () { go(index + 1); }, DELAY); }
      function restart() { stop(); start(); }

      $('[data-carousel-prev]', car).addEventListener('click', function () { go(index - 1); restart(); });
      $('[data-carousel-next]', car).addEventListener('click', function () { go(index + 1); restart(); });

      car.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { go(index - 1); restart(); }
        else if (e.key === 'ArrowRight') { go(index + 1); restart(); }
      });

      car.addEventListener('mouseenter', stop);
      car.addEventListener('mouseleave', start);
      car.addEventListener('focusin', stop);
      car.addEventListener('focusout', start);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });

      // drag / swipe: horizontal only, so a vertical flick still scrolls the page
      var downX = 0, downY = 0, dx = 0, dragging = false, decided = false;
      viewport.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        downX = e.clientX; downY = e.clientY; dx = 0; dragging = true; decided = false;
        stop();
      });
      viewport.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        dx = e.clientX - downX;
        if (!decided) {
          if (Math.abs(dx) < 6 && Math.abs(e.clientY - downY) < 6) return;
          decided = true;
          if (Math.abs(e.clientY - downY) > Math.abs(dx)) { dragging = false; return; }
          car.classList.add('is-dragging');
          viewport.setPointerCapture(e.pointerId);
        }
        var w = viewport.clientWidth || 1;
        // resist at the ends so the first and last slide feel like edges
        var edge = (index === 0 && dx > 0) || (index === slides.length - 1 && dx < 0);
        track.style.transform =
          'translate3d(' + (-index * 100 + (dx / w) * 100 * (edge ? .35 : 1)) + '%,0,0)';
      });

      function endDrag() {
        if (!dragging) return;
        dragging = false;
        car.classList.remove('is-dragging');
        var w = viewport.clientWidth || 1;
        if (Math.abs(dx) > Math.min(90, w * .18)) go(index + (dx < 0 ? 1 : -1));
        else go(index);
        start();
      }
      viewport.addEventListener('pointerup', endDrag);
      viewport.addEventListener('pointercancel', endDrag);
      viewport.addEventListener('dragstart', function (e) { e.preventDefault(); });

      go(0);
      start();
    });
  }

  /* ---------------------------------------------------------
     18. pricing
     --------------------------------------------------------- */
  function initPricing() {
    if (!HAS_GSAP) return;
    $$('[data-plan]').forEach(function (plan) {
      gsap.fromTo(plan, { opacity: 0, y: 52 }, {
        opacity: 1, y: 0, duration: 1.1, delay: parseFloat(plan.dataset.delay || 0), ease: 'expo.out',
        scrollTrigger: { trigger: plan, start: 'top 85%', once: true }
      });
      gsap.fromTo($$('.plan__list li', plan), { opacity: 0, x: -14 }, {
        opacity: 1, x: 0, duration: .6, stagger: .06, ease: 'power3.out',
        scrollTrigger: { trigger: plan, start: 'top 72%', once: true }
      });
    });
  }

  /* ---------------------------------------------------------
     19. support: star fill + form
     --------------------------------------------------------- */
  function initSupport() {
    var stars = $('[data-stars]');
    if (stars && HAS_GSAP) {
      gsap.to($$('i', stars), {
        backgroundColor: '#ffb400', duration: .4, stagger: .09, ease: 'power2.out',
        scrollTrigger: { trigger: stars, start: 'top 90%', once: true }
      });
    }

    var form = $('[data-form]');
    if (!form) return;
    var done = $('[data-form-done]'), fail = $('[data-form-error]'), btn = $('[data-submit]', form);

    if (HAS_GSAP) {
      gsap.fromTo($$('.field, .btn', form), { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: .8, stagger: .08, ease: 'power3.out',
        scrollTrigger: { trigger: form, start: 'top 82%', once: true }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = false;

      $$('[data-field]', form).forEach(function (f) {
        var input = f.querySelector('input, textarea');
        var invalid = input.hasAttribute('required') &&
          (!input.value.trim() || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)));
        f.classList.toggle('is-bad', invalid);
        if (invalid) {
          bad = true;
          if (MOTION) gsap.fromTo(f, { x: -7 }, { x: 0, duration: .5, ease: 'elastic.out(1,0.35)' });
        }
      });
      if (bad) return;

      var label = btn.querySelector('span');
      var data = {};
      $$('input, textarea', form).forEach(function (i) { data[i.name] = i.value.trim(); });
      data._subject = 'Gabokeke enquiry — ' + (data.name || 'no name');
      data._template = 'table';
      data._captcha = 'false';

      label.textContent = 'Sending…';
      btn.disabled = true;
      if (done) done.classList.remove('is-on');
      if (fail) fail.classList.remove('is-on');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          label.textContent = 'Sent ✓';
          if (done) done.classList.add('is-on');
          form.reset();
        })
        .catch(function (err) {
          // Never claim it sent when it did not — the message is gone otherwise.
          label.textContent = 'Did not send';
          if (fail) fail.classList.add('is-on');
          if (window.console) console.error('[gabokeke] form send failed:', err);
        })
        .then(function () {
          btn.disabled = false;
          setTimeout(function () { label.textContent = 'Submit Now'; }, 2600);
        });
    });
  }

  /* ---------------------------------------------------------
     20. steps: line draw + dot activation
     --------------------------------------------------------- */
  function initSteps() {
    if (!HAS_GSAP) return;
    var wrapEl = $('[data-steps]');
    if (!wrapEl) return;

    var line = $('[data-steps-line]');
    if (line) {
      gsap.fromTo(line, { width: '0%' }, {
        width: '100%', ease: 'none',
        scrollTrigger: { trigger: wrapEl, start: 'top 78%', end: 'bottom 60%', scrub: .6 }
      });
    }

    $$('[data-step]', wrapEl).forEach(function (step, i) {
      gsap.fromTo(step, { opacity: 0, y: 34 }, {
        opacity: 1, y: 0, duration: .9, delay: i * .1, ease: 'power3.out',
        scrollTrigger: { trigger: wrapEl, start: 'top 80%', once: true }
      });
      ScrollTrigger.create({ trigger: step, start: 'top 72%', onEnter: function () { step.classList.add('is-on'); } });
    });
  }

  /* ---------------------------------------------------------
     21. accordion: animated height on <details>
     --------------------------------------------------------- */
  function initAccordion() {
    var acc = $('[data-acc]');
    if (!acc) return;
    var items = $$('.acc__item', acc);

    function close(item) {
      var body = $('.acc__body', item);
      if (!MOTION) { item.open = false; return; }
      gsap.to(body, {
        height: 0, duration: .45, ease: 'power2.inOut',
        onComplete: function () { item.open = false; gsap.set(body, { height: 'auto' }); }
      });
    }

    function open(item) {
      var body = $('.acc__body', item);
      item.open = true;
      if (!MOTION) return;
      gsap.fromTo(body, { height: 0 }, {
        height: body.scrollHeight, duration: .55, ease: 'power3.out',
        onComplete: function () { gsap.set(body, { height: 'auto' }); ScrollTrigger.refresh(); }
      });
    }

    items.forEach(function (item) {
      $('summary', item).addEventListener('click', function (e) {
        e.preventDefault();
        var wasOpen = item.open;
        items.forEach(function (o) { if (o !== item && o.open) close(o); });
        wasOpen ? close(item) : open(item);
      });
    });
  }

  /* ---------------------------------------------------------
     22. footer email scramble
     --------------------------------------------------------- */
  function initFooter() {
    var swap = $('[data-swap]');
    if (swap && MOTION && !COARSE) {
      var chars = '@#$%&*<>/_abcdefghijklmnopqrstuvwxyz';
      var real = swap.dataset.text, timer = null;

      swap.addEventListener('mouseenter', function () {
        clearInterval(timer);
        var frame = 0;
        timer = setInterval(function () {
          frame++;
          var settled = frame * 1.6;
          swap.textContent = real.split('').map(function (c, i) {
            if (i < settled) return real[i];
            return c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
          }).join('');
          if (settled > real.length) { clearInterval(timer); swap.textContent = real; }
        }, 28);
      });
      swap.addEventListener('mouseleave', function () { clearInterval(timer); swap.textContent = real; });
    }
  }

  /* ---------------------------------------------------------
     23. resize: re-split lines so the masks stay accurate
     --------------------------------------------------------- */
  function initResize() {
    var w = window.innerWidth, t;
    window.addEventListener('resize', function () {
      if (Math.abs(window.innerWidth - w) < 60) return;
      w = window.innerWidth;
      clearTimeout(t);
      t = setTimeout(function () {
        splitTargets.forEach(function (el) {
          if (el.dataset.split === 'words') return;
          el.innerHTML = el.dataset.origHtml;
          var lines = splitToLines(el);
          if (HAS_GSAP) gsap.set(lines, { y: '0%' });
        });
        if (HAS_GSAP) ScrollTrigger.refresh();
      }, 220);
    });
  }

  /* ---------------------------------------------------------
     boot
     --------------------------------------------------------- */
  function boot() {
    try {
      if (HAS_GSAP) html.classList.add('anim-ready');

      initScroll();
      initScrollLoop();   // must run before anything calls onScroll()
      initNav();
      initChrome();
      initCursor();
      initMagnetic();
      initTilt();
      initCheckout();
      initAccordion();
      initSheet();
      initFooter();
      initResize();

      // Lines must be measured in the real webfont, not the fallback.
      whenFontsReady(function () {
        prepareSplits();
        initHero();
        initReveals();
        initMarquee();
        initFeatures();
        initCatalog();
        initCounters();
        initBundle();
        initStory();
        initPricing();
        initSupport();
        initSteps();
        if (HAS_GSAP) ScrollTrigger.refresh();
      });
    } catch (err) {
      // A motion bug must never leave the page blank.
      html.classList.remove('anim-ready');
      if (window.console) console.error('[gabokeke] motion init failed:', err);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
