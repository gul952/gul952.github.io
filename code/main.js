document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE
  const navToggle = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
    });
  }

  // FOOTER YEAR
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // DARK MODE TOGGLE
  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    const root = document.documentElement;
    const setMode = (mode) => {
      if (mode === 'dark') {
        root.classList.add('dark');
        darkToggle.textContent = '☀️';
      } else {
        root.classList.remove('dark');
        darkToggle.textContent = '🌙';
      }
    };
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setMode('dark');
    } else {
      setMode('light');
    }
    darkToggle.addEventListener('click', () => {
      const isDark = root.classList.contains('dark');
      if (isDark) {
        setMode('light');
        localStorage.setItem('theme', 'light');
      } else {
        setMode('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ACTIVE SECTION HIGHLIGHT
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('#nav-menu a');
  if (sections.length && links.length) {
    const observerOptions = { threshold: 0.6 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`#nav-menu a[href="#${id}"]`);
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('text-accent', 'font-semibold'));
          if (link) link.classList.add('text-accent', 'font-semibold');
        }
      });
    }, observerOptions);
    sections.forEach(sec => observer.observe(sec));
  }

  // MULTI-IMAGE THUMBNAIL HANDLER
  document.querySelectorAll('.project-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const id = thumb.dataset.project;
      const main = document.getElementById(`project-${id}-main`);
      if (main) main.src = thumb.src;
      document.querySelectorAll(`.project-thumbnail[data-project="${id}"]`).forEach(el => {
        el.classList.remove('border-accent');
      });
      thumb.classList.add('border-accent');
    });
  });

  // CAROUSEL LOGIC (e.g., project 4)
  const carouselData = {
    '4': ['assets/a.jpg', 'assets/b.jpg']
    // add other project entries as needed: 'N': ['assets/N-1.png', 'assets/N-2.png', ...]
  };
  const carouselIndex = {};
  Object.keys(carouselData).forEach(id => { carouselIndex[id] = 0; });

  document.querySelectorAll('button[data-project][data-dir]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.project;
      const dir = btn.dataset.dir;
      const imgs = carouselData[id];
      if (!imgs) return;
      let idx = carouselIndex[id] || 0;
      idx = dir === 'next'
        ? (idx + 1) % imgs.length
        : (idx - 1 + imgs.length) % imgs.length;
      carouselIndex[id] = idx;
      const imgEl = document.getElementById(`project-${id}-img`);
      if (imgEl) imgEl.src = imgs[idx];
    });
  });
});


