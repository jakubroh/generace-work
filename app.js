// app.js — vanilla JS pro generace.work

(function() {
  // Nav scroll
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu (jednoduché — toggle .nav__links display)
  const menuBtn = document.querySelector('.nav__menu');
  const links = document.querySelector('.nav__links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        links.style.display = 'flex';
        links.style.position = 'absolute';
        links.style.top = '100%';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = 'rgba(4,25,60,0.98)';
        links.style.flexDirection = 'column';
        links.style.padding = '20px 32px';
        links.style.gap = '16px';
        links.style.borderTop = '1px solid rgba(255,255,255,0.08)';
      } else {
        links.removeAttribute('style');
      }
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (window.innerWidth < 980) {
        links.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        links.removeAttribute('style');
      }
    }));
  }

  // Reveal on scroll
  const targets = document.querySelectorAll('.section__head, .dataviz, .pillars, .audience, .why, .formats, .contact, .source, .callout');
  targets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(t => io.observe(t));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });

  // Form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Odesílám…';
      btn.disabled = true;
      try {
        const fd = new FormData(form);
        const r = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
        if (r.ok) {
          form.innerHTML = '<div style="padding:32px 12px;text-align:center"><h3 style="font-size:1.5rem;margin-bottom:10px;font-weight:800;letter-spacing:-.01em">Děkujeme!</h3><p style="color:var(--ink-60);line-height:1.6">Zpráva dorazila. Ozveme se do 24 hodin pracovních dní.</p></div>';
        } else throw new Error();
      } catch {
        btn.innerHTML = orig; btn.disabled = false;
        alert('Něco se nepodařilo. Napište nám prosím přímo na info@nezzazvoni.cz.');
      }
    });
  }

  // ============== TWEAKS ==============
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroCopy": "default",
    "statsMode": "bars",
    "accent": "red"
  }/*EDITMODE-END*/;

  let state = { ...TWEAK_DEFAULTS };

  // Build panel
  const panel = document.createElement('aside');
  panel.className = 'tweaks';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Tweaks');
  panel.innerHTML = `
    <header class="tweaks__head">
      <span class="tweaks__title">Tweaks</span>
      <button class="tweaks__close" type="button" aria-label="Zavřít">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </header>
    <div class="tweaks__body">
      <div class="tweaks__group" data-tweak="heroCopy">
        <span class="tweaks__label">Hero copy</span>
        <div class="tweaks__seg">
          <button data-v="default">Výchozí</button>
          <button data-v="punch">Údernější</button>
          <button data-v="problem">Problémově</button>
        </div>
      </div>
      <div class="tweaks__group" data-tweak="statsMode">
        <span class="tweaks__label">Vizualizace stats</span>
        <div class="tweaks__seg">
          <button data-v="bars">Bary</button>
          <button data-v="big">Velká čísla</button>
          <button data-v="minimal">Minimal</button>
        </div>
      </div>
      <div class="tweaks__group" data-tweak="accent">
        <span class="tweaks__label">Akcent</span>
        <div class="tweaks__seg">
          <button data-v="red">Červená</button>
          <button data-v="orange">Oranžová</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  const heroLead = document.querySelector('[data-hero-copy]');
  const HERO_COPIES = {
    default: 'Pomůžeme vám ji <em class="ital">pochopit</em>, <em class="ital">získat</em> i <em class="ital">udržet</em>. Stavíme na 15 letech vlastních dat z českého prostředí — ne na zahraničních trendech.',
    punch: 'Vaši nejmladší lidé odcházejí dřív, než se stačí zaučit. <em class="ital">Známe důvod.</em> A umíme to změnit.',
    problem: 'Průměrný Gen Z odchází z první práce po 11 měsících. <em class="ital">Tomu se dá předejít</em> — pokud rozumíte, co vlastně chtějí.'
  };

  const dataviz = document.querySelector('.dataviz');
  // pre-fill data-big atributy pro režim "Velká čísla"
  if (dataviz) {
    const cards = dataviz.querySelectorAll('.dataviz__card .dataviz__body');
    const bigs = ['73 %', '11 měs.', '30 %'];
    cards.forEach((b, i) => b.setAttribute('data-big', bigs[i] || ''));
  }

  function applyState() {
    if (heroLead && HERO_COPIES[state.heroCopy]) {
      heroLead.innerHTML = HERO_COPIES[state.heroCopy];
    }
    if (dataviz) dataviz.setAttribute('data-stats-mode', state.statsMode);
    if (state.accent === 'orange') {
      document.documentElement.style.setProperty('--red', '#ffa000');
      document.documentElement.style.setProperty('--red-deep', '#e58e00');
    } else {
      document.documentElement.style.setProperty('--red', '#f0324b');
      document.documentElement.style.setProperty('--red-deep', '#d92340');
    }
    // visual state on buttons
    panel.querySelectorAll('.tweaks__group').forEach(g => {
      const key = g.getAttribute('data-tweak');
      g.querySelectorAll('button').forEach(b => {
        b.classList.toggle('is-active', b.getAttribute('data-v') === state[key]);
      });
    });
  }

  panel.addEventListener('click', (e) => {
    const btn = e.target.closest('.tweaks__seg button');
    if (btn) {
      const group = btn.closest('.tweaks__group');
      const key = group.getAttribute('data-tweak');
      const v = btn.getAttribute('data-v');
      state[key] = v;
      applyState();
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: v } }, '*');
      } catch {}
    }
    if (e.target.closest('.tweaks__close')) {
      panel.classList.remove('is-open');
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch {}
    }
  });

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === '__activate_edit_mode') panel.classList.add('is-open');
    if (d.type === '__deactivate_edit_mode') panel.classList.remove('is-open');
  });

  applyState();
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
})();
