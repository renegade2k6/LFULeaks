(function () {
  function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    if (!tabs.length) return;
    const panels = {
      update: document.getElementById('tab-update'),
      diff: document.getElementById('tab-diff'),
    };
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabs.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        Object.keys(panels).forEach((key) => {
          if (panels[key]) {
            panels[key].style.display = key === target ? '' : 'none';
          }
        });
      });
    });
  }

  function initDiffSearch() {
    const input = document.getElementById('diffSearch');
    const body = document.querySelector('.diff-body');
    if (!input || !body) return;
    const lines = Array.from(body.querySelectorAll('.diff-line'));
    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      lines.forEach((line) => {
        const match = !query || line.textContent.toLowerCase().includes(query);
        line.style.display = match ? '' : 'none';
      });
    });
  }

  function initLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = lb ? lb.querySelector('img') : null;
    const lbCap = lb ? lb.querySelector('.cap') : null;
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    const lbCounter = document.getElementById('lightboxCounter');
    if (!lb || !lbImg || !lbCap) return;

    let images = [];
    let index = 0;
    let lastFocused = null;

    function collectImages() {
      images = Array.from(document.querySelectorAll('.image-card img'));
    }

    function getFocusable() {
      return Array.from(lb.querySelectorAll('button')).filter((el) => !el.disabled);
    }

    function show(i) {
      if (!images.length) return;
      if (i < 0) i = images.length - 1;
      if (i >= images.length) i = 0;
      index = i;
      const img = images[index];
      lbImg.src = img.src;
      lbCap.textContent = img.alt || '';
      if (lbCounter) {
        lbCounter.textContent = `${index + 1} / ${images.length}`;
      }
    }

    function open(i) {
      collectImages();
      show(i);
      lastFocused = document.activeElement;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      const focusable = getFocusable();
      if (focusable.length) focusable[0].focus();
    }

    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
      lastFocused = null;
    }

    document.querySelectorAll('.image-grid').forEach((grid) => {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.image-card');
        if (!card) return;
        const img = card.querySelector('img');
        if (!img) return;
        collectImages();
        open(images.indexOf(img));
      });
    });

    if (lbClose) {
      lbClose.addEventListener('click', (e) => {
        e.stopPropagation();
        close();
      });
    }
    if (lbPrev) {
      lbPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        show(index - 1);
      });
    }
    if (lbNext) {
      lbNext.addEventListener('click', (e) => {
        e.stopPropagation();
        show(index + 1);
      });
    }
    lb.addEventListener('click', (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'ArrowRight') show(index + 1);
      else if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  initTabs();
  initDiffSearch();
  initLightbox();
})();
