// 主要JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // 添加滚动监听
    window.addEventListener('scroll', function() {
        // 获取当前滚动位置
        const scrollPosition = window.scrollY;
        
        // 根据滚动位置更新导航栏样式
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 高亮当前滚动位置对应的导航项
        highlightNavOnScroll();
    });
    
    // 导航链接点击平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 只处理锚点链接
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') {
                    // 如果是首页链接，滚动到顶部
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // 滚动到目标元素
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // 根据滚动位置高亮导航项
    function highlightNavOnScroll() {
        // 获取所有章节
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;
        
        // 检查每个章节的位置
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // 添加一些偏移量
            const sectionBottom = sectionTop + section.offsetHeight;
            
            // 如果当前滚动位置在章节范围内
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // 移除所有导航项的active类
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 为当前章节对应的导航项添加active类
                const correspondingLink = document.querySelector(`nav ul li a[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
        
        // 如果滚动到顶部，高亮首页链接
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const homeLink = document.querySelector('nav ul li a[href="#"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // 初始化时高亮当前导航项
    highlightNavOnScroll();
    
    // 技能进度条动画
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 当元素进入视口时显示动画
    function handleSkillAnimation() {
        skillLevels.forEach(skill => {
            if (isInViewport(skill) && !skill.classList.contains('animated')) {
                skill.classList.add('animated');
                const width = skill.getAttribute('style').match(/width: (\d+)%/)[1];
                skill.style.width = '0%';
                
                setTimeout(() => {
                    skill.style.width = width + '%';
                }, 100);
            }
        });
    }
    
    // 添加滚动监听以触发技能动画
    window.addEventListener('scroll', handleSkillAnimation);
    
    // 初始加载时检查
    handleSkillAnimation();
});
