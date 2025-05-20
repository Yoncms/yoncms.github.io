// 主要JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // 技能进度条动画
  const skillLevels = document.querySelectorAll('.skill-level');
  
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  function animateSkills() {
    skillLevels.forEach(level => {
      if (isInViewport(level)) {
        const width = level.getAttribute('data-width');
        if (width) {
          level.style.width = width;
        }
      }
    });
  }
  
  // 初始化时隐藏进度条宽度
  skillLevels.forEach(level => {
    const width = level.style.width;
    level.setAttribute('data-width', width);
    level.style.width = '0';
  });
  
  // 初始化时检查
  setTimeout(animateSkills, 300);
  
  // 滚动时检查
  window.addEventListener('scroll', animateSkills);
  
  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 滚动时高亮当前导航项
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    let scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // 添加返回顶部按钮
  const footer = document.querySelector('footer');
  if (footer) {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    document.body.insertBefore(scrollToTopBtn, footer);
    
    // 滚动时显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = 'flex';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });
  }
  
  // 添加返回顶部按钮样式
  const style = document.createElement('style');
  style.textContent = `
    .scroll-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      border: none;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      z-index: 99;
    }
    
    .scroll-to-top:hover {
      background-color: var(--secondary-color);
      transform: translateY(-3px);
    }
  `;
  
  document.head.appendChild(style);
});
