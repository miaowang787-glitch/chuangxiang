const copyrightYear = document.getElementById('year');
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

const menuToggle = document.getElementById('menuToggle');
const navDrawer = document.getElementById('navDrawer');
const navLinks = document.querySelectorAll('.nav-links a');

const closeMenu = () => {
  if (!navDrawer || !menuToggle) return;
  navDrawer.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

const toggleMenu = () => {
  if (!navDrawer || !menuToggle) return;
  const open = navDrawer.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
};

menuToggle?.addEventListener('click', toggleMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMenu();
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const visitorName = formData.get('name') || '朋友';
    alert(`${visitorName}，感谢信任！顾问会在 1 个工作日内与您联系。`);
    contactForm.reset();
  });
}

const popover = document.getElementById('contactPopover');
const openButtons = document.querySelectorAll('[data-open-contact]');
const closeButtons = document.querySelectorAll('[data-close-contact]');

const openPopover = () => {
  if (!popover) return;
  popover.hidden = false;
};

const closePopover = () => {
  if (!popover) return;
  popover.hidden = true;
};

openButtons.forEach((btn) => btn.addEventListener('click', openPopover));
closeButtons.forEach((btn) => btn.addEventListener('click', closePopover));

document.addEventListener('click', (event) => {
  if (!popover || popover.hidden) return;
  if (popover.contains(event.target)) return;
  if (event.target.closest('[data-open-contact]')) return;
  closePopover();
});

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const handleScroll = () => {
  if (!backToTop) return;
  const show = window.scrollY > 600;
  backToTop.classList.toggle('show', show);
};

window.addEventListener('scroll', handleScroll);
handleScroll();

const revealTargets = document.querySelectorAll('.section article, .contact-card, .process-flow > div');
if (revealTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach((target) => {
    target.classList.add('reveal');
    observer.observe(target);
  });
}
