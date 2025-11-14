// إدارة الموسيقى
function initMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;
    let userInteracted = false;

    // تفعيل الصوت عند التفاعل الأول مع الصفحة
    function enableAudio() {
        if (!userInteracted) {
            userInteracted = true;
            // إعادة تعيين الصوت للسماح بالتشغيل
            bgMusic.load();
            
            // تشغيل الموسيقى إذا كان المستخدم يريد ذلك
            if (!isPlaying) {
                playMusic();
            }
        }
    }

    // إضافة مستمعين للأحداث للتفاعل الأول
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    // تبديل تشغيل/إيقاف الموسيقى
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!userInteracted) {
            enableAudio();
            return;
        }

        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    function playMusic() {
        if (!userInteracted) return;
        
        bgMusic.volume = 0.5; // ضبط مستوى الصوت
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            const tooltip = musicToggle.querySelector('.nav-tooltip');
            if (tooltip) {
                tooltip.textContent = 'كتم الصوت';
            }
            
            // إضافة تأثير صوتي عند التشغيل
            if (typeof gsap !== 'undefined') {
                gsap.to(musicToggle, {
                    scale: 1.3,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1
                });
            }
        }).catch(error => {
            console.log('تعذر تشغيل الموسيقى:', error);
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            const tooltip = musicToggle.querySelector('.nav-tooltip');
            if (tooltip) {
                tooltip.textContent = 'تشغيل الموسيقى';
            }
        });
    }

    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        const tooltip = musicToggle.querySelector('.nav-tooltip');
        if (tooltip) {
            tooltip.textContent = 'تشغيل الموسيقى';
        }
        
        // إضافة تأثير عند الإيقاف
        if (typeof gsap !== 'undefined') {
            gsap.to(musicToggle, {
                scale: 0.8,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        }
    }

    // محاولة تشغيل الموسيقى بعد تحميل الصفحة بفترة
    setTimeout(() => {
        if (!isPlaying && userInteracted) {
            playMusic();
        }
    }, 3000);
}