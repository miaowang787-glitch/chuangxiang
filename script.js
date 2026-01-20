// 设置版权年份
const copyrightYear = document.getElementById('year');
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

// 数字滚动动画
const animateNumber = (element, target, duration = 2000, suffix = '') => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
};

// 观察统计数据，进入视口时触发动画
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const strong = entry.target.querySelector('strong');
      if (strong) {
        const text = strong.textContent;
        if (text.includes('+')) {
          const num = parseInt(text);
          animateNumber(strong, num, 2000, '+');
        } else if (text.includes('%')) {
          const num = parseInt(text);
          animateNumber(strong, num, 2000, '%');
        } else if (text.includes('年')) {
          const num = parseInt(text);
          animateNumber(strong, num, 1500, '年');
        }
      }
    }
  });
}, { threshold: 0.5 });

const statsItems = document.querySelectorAll('.stats > div');
statsItems.forEach(item => statsObserver.observe(item));

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

// 表单提交交互
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const visitorName = formData.get('name') || '同学';
    const education = formData.get('education') || '未填写';
    const major = formData.get('major') || '未填写';
    const phone = formData.get('phone') || '未填写';
    const message = formData.get('message') || '未填写';
    
    // 按钮加载状态
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '提交中...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // 模拟提交延迟
    setTimeout(() => {
      // 创建成功提示
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <div class="success-icon">✓</div>
        <h3>提交成功！</h3>
        <p>${visitorName}同学，您的咨询已收到！</p>
        <p>我们的论文辅导顾问将在<strong>30分钟内</strong>通过QQ联系您。</p>
        <p class="info-summary">学历：${education} | 专业：${major}</p>
        <button class="primary" onclick="this.parentElement.remove()">知道了</button>
      `;
      
      // 添加到页面
      document.body.appendChild(successMsg);
      
      // 重置表单
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }, 1000);
  });
}

// 输入框焦点动画
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});

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
