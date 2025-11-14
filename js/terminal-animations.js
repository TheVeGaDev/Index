// تأثيرات محاكي الطرفية المتقدمة
function initTerminalAnimations() {
    // تأثير الكتابة للمحاكي الطرفي
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        const text = line.innerHTML;
        line.innerHTML = '';
        
        gsap.to(line, {
            delay: index * 0.5,
            duration: 1,
            text: text,
            ease: "power2.inOut",
            opacity: 1
        });
    });
    
    // تأثيرات المعلومات الجديدة
    const infoLines = document.querySelectorAll('.info-line');
    
    infoLines.forEach((line, index) => {
        // إضافة تأثير عند المرور
        line.addEventListener('mouseenter', () => {
            gsap.to(line, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        line.addEventListener('mouseleave', () => {
            gsap.to(line, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // تأثير النقر للمطورين
        if (line.classList.contains('developer')) {
            line.addEventListener('click', function() {
                gsap.to(this, {
                    scale: 0.9,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
                
                // تأثير اهتزاز إضافي
                this.classList.add('vibrate');
                setTimeout(() => {
                    this.classList.remove('vibrate');
                }, 500);
            });
        }
    });
    
    // تأثير توهج للمحاكي الطرفي
    setInterval(() => {
        gsap.to('.holographic-terminal', {
            duration: 2,
            boxShadow: '0 0 70px rgba(0, 255, 157, 0.4), inset 0 0 60px rgba(0, 255, 157, 0.2)',
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut"
        });
    }, 5000);
    
    // تأثير عشوائي للعناصر
    setInterval(() => {
        const randomLine = infoLines[Math.floor(Math.random() * infoLines.length)];
        gsap.to(randomLine, {
            y: -10,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }, 3000);
    
    // تأثيرات خاصة لحقوق النشر
    const copyrightLine = document.querySelector('.info-line.copyright');
    if (copyrightLine) {
        setInterval(() => {
            gsap.to(copyrightLine, {
                color: getRandomNeonColor(),
                duration: 1,
                ease: "power2.inOut"
            });
        }, 2000);
    }
}

// دالة مساعدة للحصول على لون نيون عشوائي
function getRandomNeonColor() {
    const colors = [
        '#00ff9d', // أخضر
        '#00a2ff', // أزرق
        '#b300ff', // بنفسجي
        '#ff00c8'  // وردي
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}