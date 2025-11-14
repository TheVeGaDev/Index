// مؤشر مخصص متقدم
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // تأثيرات التفاعل
    const interactiveElements = document.querySelectorAll('.magnetic-item, .holographic-card, .service-icon, .contact-btn, .contact-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = '#ff00c8';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = '#00a2ff';
        });
    });
}