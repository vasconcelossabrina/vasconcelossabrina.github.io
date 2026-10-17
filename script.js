// ============================================
// SABRINA VASCONCELOS - SITE & PORTFÓLIO SCRIPT
// Interatividade: Navegação, Filtros, Lightbox e Toast
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. NAVEGAÇÃO ENTRE PÁGINAS E ÂNCORAS
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  function showPage(pageId, targetHash = null) {
    pages.forEach(p => {
      p.classList.remove('page-active');
      p.style.display = 'none';
    });
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById(pageId);
    if (target) {
      target.style.display = 'block';
      setTimeout(() => target.classList.add('page-active'), 10);
    }

    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    if (targetHash) {
      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Inicialização: exibe Link in Bio (#home)
  pages.forEach(p => p.style.display = 'none');
  const homePage = document.getElementById('home');
  if (homePage) {
    homePage.style.display = 'block';
    homePage.classList.add('page-active');
  }

  // Cliques no Menu Principal
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href').replace('#', '');
      
      if (['reels', 'galeria', 'marcas', 'contato'].includes(href)) {
        showPage('portfolio', href);
        const subNav = document.getElementById('nav-' + href);
        if (subNav) subNav.classList.add('active');
      } else {
        showPage(href);
      }
    });
  });

  // Logo clica e volta para home
  const brandLogo = document.getElementById('nav-brand-logo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('home');
    });
  }

  // Botões do Link in Bio
  const linkPortfolio = document.getElementById('link-portfolio');
  if (linkPortfolio) {
    linkPortfolio.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('portfolio');
    });
  }

  const linkReelsBtn = document.getElementById('link-reels-btn');
  if (linkReelsBtn) {
    linkReelsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('portfolio', 'reels');
    });
  }

  const linkFotosBtn = document.getElementById('link-fotos-btn');
  if (linkFotosBtn) {
    linkFotosBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('portfolio', 'galeria');
    });
  }

  const portfolioReelsBtn = document.getElementById('portfolio-reels-btn');
  if (portfolioReelsBtn) {
    portfolioReelsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const reelsSec = document.getElementById('reels');
      if (reelsSec) reelsSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const portfolioCtaBtn = document.getElementById('portfolio-cta-btn');
  if (portfolioCtaBtn) {
    portfolioCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const contatoSec = document.getElementById('contato');
      if (contatoSec) contatoSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================
  // 2. FILTRO DE REELS (VÍDEOS UGC)
  // ==========================================
  const reelFilterBtns = document.querySelectorAll('#reels-filter-bar .filter-btn');
  const reelCards = document.querySelectorAll('.reel-card');

  reelFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      reelFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      reelCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  // ==========================================
  // 3. FILTRO DE MARCAS TRABALHADAS (19 MARCAS)
  // ==========================================
  const brandFilterBtns = document.querySelectorAll('#brands-filter-bar .filter-btn');
  const brandCards = document.querySelectorAll('.brand-logo-card, .brand-pill');

  brandFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      brandFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCat = btn.getAttribute('data-brand-cat');

      brandCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        const isMatch = (filterCat === 'all' || cat === filterCat);
        if (isMatch) {
          card.style.display = card.classList.contains('brand-pill') ? 'inline-flex' : 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.85)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });

  // ==========================================
  // 4. LIGHTBOX MODAL PARA FOTOS UGC
  // ==========================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxBrand = document.getElementById('lightbox-brand');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const galleryCards = document.querySelectorAll('.gallery-card:not(.gallery-card-cta)');

  function openLightbox(card) {
    const imgSrc = card.getAttribute('data-img');
    const title = card.getAttribute('data-title');
    const brand = card.getAttribute('data-brand');
    const desc = card.getAttribute('data-desc');

    if (lightboxImg) lightboxImg.src = imgSrc;
    if (lightboxImg) lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxBrand) lightboxBrand.textContent = brand;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    if (lightboxModal) {
      lightboxModal.classList.add('show');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('show');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('show')) {
      closeLightbox();
    }
  });

  // ==========================================
  // 5. COPIAR E-MAIL COM TOAST DE SUCESSO
  // ==========================================
  const copyEmailBtn = document.getElementById('cta-copy-email');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'vasconcelossabrina717@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('E-mail copiado: ' + email + ' ✨');
      }).catch(() => {
        showToast('E-mail: ' + email);
      });
    });
  }

  // ==========================================
  // 6. EFEITO DE SCROLL NO HEADER NAV
  // ==========================================
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      nav.style.boxShadow = '0 6px 30px rgba(92,61,46,0.14)';
      nav.style.background = 'rgba(250, 245, 239, 0.96)';
    } else {
      nav.style.boxShadow = 'none';
      nav.style.background = 'rgba(250, 245, 239, 0.88)';
    }
  });

  // ==========================================
  // 7. ANIMAÇÃO DE CONTADORES NUMÉRICOS
  // ==========================================
  function animateCounter(el, target, suffix = '', prefix = '') {
    const duration = 1800;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = isDecimal ? (eased * target).toFixed(1) : Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        if (text.includes('75')) animateCounter(el, 75, ' mil', '+');
        else if (text.includes('12,6')) animateCounter(el, 12.6, 'K');
        else if (text.includes('19')) animateCounter(el, 19, '+');
        else if (text.includes('100')) animateCounter(el, 100, '%');
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

  // ==========================================
  // 8. OBSERVER PARA ANIMAÇÕES FADE-IN
  // ==========================================
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  const fadeElements = document.querySelectorAll(
    '.stat-card, .service-card, .reel-card, .gallery-card, .brand-logo-card, .brand-pill, .about-content, .diferencial-box'
  );
  fadeElements.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 5) * 70}ms`;
    fadeObserver.observe(el);
  });

});
