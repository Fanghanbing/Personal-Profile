document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Mask and Tilt
    const heroFront = document.getElementById('hero-mask');
    const heroContainer = document.getElementById('hero-container');

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            // Update mask coordinates
            if (heroFront) {
                heroFront.style.setProperty('--x', `${e.clientX}px`);
                heroFront.style.setProperty('--y', `${e.clientY}px`);
            }

            // Hero pseudo-3D tilt
            if (heroContainer && e.clientY <= window.innerHeight) {
                const xAxis = (window.innerWidth / 2 - e.clientX) / 45;
                const yAxis = (window.innerHeight / 2 - e.clientY) / 45;
                heroContainer.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
            }
        });
    });

    // Touch support for mobile mask
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            requestAnimationFrame(() => {
                if (heroFront) {
                    heroFront.style.setProperty('--x', `${touch.clientX}px`);
                    heroFront.style.setProperty('--y', `${touch.clientY}px`);
                }
            });
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        if (heroContainer) {
            heroContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
        if (heroFront) {
            heroFront.style.setProperty('--x', `50vw`);
            heroFront.style.setProperty('--y', `50vh`);
        }
    });

    // 2. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // 3. Fake 3D Effect for Project Cards
    const cards = document.querySelectorAll('.project-card.pseudo-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // 获取相对于卡片中心的鼠标位置
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // 计算旋转角度 (数值越小角度越大)
            const rotateX = -(y / (rect.height / 2)) * 8;
            const rotateY = (x / (rect.width / 2)) * 8;

            // 移除过渡时间以获得实时跟随体验
            card.style.transition = 'none';
            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            // 鼠标移出时恢复平滑过渡，复位卡片
            card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s';
        });
    });

    // 4. Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const isEn = document.body.classList.contains('en');
            if (isEn) {
                document.body.classList.remove('en');
                document.body.classList.add('zh');
                langToggle.textContent = 'EN';
            } else {
                document.body.classList.remove('zh');
                document.body.classList.add('en');
                langToggle.textContent = 'CN';
            }
        });
    }
});
