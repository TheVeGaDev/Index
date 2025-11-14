// تأثيرات GSAP متقدمة
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // تأثير الكتابة في المحاكاة الطرفية
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
    
    // تأثيرات التنقل المغناطيسي
    const magneticItems = document.querySelectorAll('.magnetic-item');
    
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(item, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
        
        // النقر للتنقل
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            if (target === 'music') return;
            
            document.getElementById(target).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // تأثيرات التمرير المتقدمة
    gsap.utils.toArray('.holographic-card').forEach(card => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 100,
            rotationY: -10
        }, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // تأثير البارالاكس للخلفية
    gsap.to('#three-container', {
        scrollTrigger: {
            scrub: true
        },
        y: -100,
        duration: 1
    });
}

// تأثيرات إضافية مذهلة
function initExtraEffects() {
    // تأثيرات العائمة العشوائية
    setInterval(() => {
        const cards = document.querySelectorAll('.holographic-card');
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        
        gsap.to(randomCard, {
            y: -15,
            duration: 2,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut"
        });
    }, 4000);
    
    // تأثيرات الضوء التفاعلية
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to('body', {
            background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
                rgba(0, 255, 157, 0.1) 0%, 
                rgba(0, 162, 255, 0.05) 30%, 
                rgba(5, 5, 16, 1) 70%)`,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    // تأثيرات النقر على البطاقات
    document.querySelectorAll('.holographic-card').forEach(card => {
        card.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });
}