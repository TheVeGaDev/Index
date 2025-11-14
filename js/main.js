// VEGA Main System - Multi-language Integration
class VEGASystem {
    constructor() {
        this.modules = {};
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Initialize all system modules
            await this.loadModules();
            await this.initThreeJS();
            await this.loadContent();
            this.initAnimations();
            this.initEventListeners();
            this.isInitialized = true;
            
            console.log('VEGA System Initialized Successfully');
        } catch (error) {
            console.error('System initialization failed:', error);
        }
    }

    async loadModules() {
        // Simulate loading different language modules
        this.modules = {
            python: await this.loadPythonModule(),
            java: await this.loadJavaModule(),
            php: await this.loadPHPService(),
            csharp: await this.loadCSharpService(),
            nodejs: await this.loadNodeJSModule()
        };
    }

    async loadPythonModule() {
        // Simulate Python AI module
        return {
            name: 'Python AI Engine',
            version: '3.11',
            capabilities: ['Machine Learning', 'Data Analysis', 'AI Processing'],
            status: 'active'
        };
    }

    async loadJavaModule() {
        // Simulate Java Enterprise module
        return {
            name: 'Java Enterprise System',
            version: '21',
            capabilities: ['Backend Services', 'Database Management', 'API Development'],
            status: 'active'
        };
    }

    async loadPHPService() {
        // Simulate PHP CMS module
        return {
            name: 'PHP Content Management',
            version: '8.2',
            capabilities: ['Content Management', 'User Authentication', 'Form Processing'],
            status: 'active'
        };
    }

    async loadCSharpService() {
        // Simulate C# .NET module
        return {
            name: 'C# .NET Framework',
            version: '7.0',
            capabilities: ['Desktop Applications', 'Web Services', 'Game Development'],
            status: 'active'
        };
    }

    async loadNodeJSModule() {
        // Simulate Node.js module
        return {
            name: 'Node.js Runtime',
            version: '18',
            capabilities: ['Real-time Applications', 'API Development', 'Server Management'],
            status: 'active'
        };
    }

    async initThreeJS() {
        // Three.js background initialization
        if (typeof initThreeJSBackground === 'function') {
            initThreeJSBackground();
        }
    }

    async loadContent() {
        // Load dynamic content from APIs
        await this.loadServices();
        await this.loadProjects();
        this.updateStats();
    }

    async loadServices() {
        try {
            const response = await fetch('php/get-services.php');
            const services = await response.json();
            this.renderServices(services);
        } catch (error) {
            // Fallback to default services
            const defaultServices = [
                {
                    id: 1,
                    title: 'تطوير أنظمة Python AI',
                    description: 'أنظمة ذكاء اصطناعي متقدمة باستخدام Python وتقنيات Machine Learning',
                    icon: 'fas fa-brain',
                    tech: 'python'
                },
                {
                    id: 2,
                    title: 'أنظمة Java Enterprise',
                    description: 'تطوير أنظمة مؤسسية متكاملة باستخدام Java و Spring Framework',
                    icon: 'fas fa-server',
                    tech: 'java'
                },
                {
                    id: 3,
                    title: 'أنظمة إدارة المحتوى PHP',
                    description: 'أنظمة إدارة محتوى متطورة باستخدام PHP و Laravel',
                    icon: 'fas fa-cogs',
                    tech: 'php'
                },
                {
                    id: 4,
                    title: 'تطبيقات C# .NET',
                    description: 'تطوير تطبيقات سطح المكتب والويب باستخدام C# و .NET',
                    icon: 'fas fa-desktop',
                    tech: 'csharp'
                }
            ];
            this.renderServices(defaultServices);
        }
    }

    renderServices(services) {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;

        grid.innerHTML = services.map(service => `
            <div class="service-card" data-tech="${service.tech}">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-tech">
                    <span class="tech-tag">${service.tech.toUpperCase()}</span>
                </div>
            </div>
        `).join('');
    }

    async loadProjects() {
        try {
            const response = await fetch('php/get-projects.php');
            const projects = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            // Fallback to default projects
            const defaultProjects = [
                {
                    id: 1,
                    name: 'نظام الذكاء الاصطناعي VEGA AI',
                    description: 'نظام ذكي متكامل للتحليل والتنبؤ',
                    technology: 'python',
                    image: 'ai',
                    status: 'مكتمل'
                },
                {
                    id: 2,
                    name: 'منصة إدارة المؤسسات',
                    description: 'منصة متكاملة لإدارة العمليات المؤسسية',
                    technology: 'java',
                    image: 'enterprise',
                    status: 'قيد التطوير'
                },
                {
                    id: 3,
                    name: 'نظام إدارة المحتوى',
                    description: 'نظام إدارة محتوى متطور وسهل الاستخدام',
                    technology: 'php',
                    image: 'cms',
                    status: 'مكتمل'
                }
            ];
            this.renderProjects(defaultProjects);
        }
    }

    renderProjects(projects) {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        grid.innerHTML = projects.map(project => `
            <div class="project-card" data-tech="${project.technology}">
                <div class="project-image" style="background: linear-gradient(45deg, var(--neon-${project.technology}), var(--neon-blue))">
                    <i class="fas fa-${project.image}"></i>
                </div>
                <div class="project-content">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        <span class="tech-tag">${project.technology.toUpperCase()}</span>
                        <span class="status-tag ${project.status === 'مكتمل' ? 'completed' : 'in-progress'}">
                            ${project.status}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');

        this.initProjectFilters();
    }

    initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.tech === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    updateStats() {
        // Animate statistics counters
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    initAnimations() {
        // GSAP animations
        gsap.registerPlugin(ScrollTrigger);

        // Animate service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 100,
                rotationY: -10
            }, {
                opacity: 1,
                y: 0,
                rotationY: 0,
                duration: 1,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.fromTo(card, {
                opacity: 0,
                x: i % 2 === 0 ? -100 : 100
            }, {
                opacity: 1,
                x: 0,
                duration: 1,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    initEventListeners() {
        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Navigation smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Nav link active state
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    async handleContactForm(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('php/contact.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('تم إرسال رسالتك بنجاح!', 'success');
                form.reset();
            } else {
                this.showNotification('حدث خطأ في إرسال الرسالة', 'error');
            }
        } catch (error) {
            this.showNotification('حدث خطأ في الاتصال بالخادم', 'error');
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animate in
        gsap.fromTo(notification, 
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
        );

        // Remove after 3 seconds
        setTimeout(() => {
            gsap.to(notification, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                onComplete: () => notification.remove()
            });
        }, 3000);
    }

    // System status check
    async checkSystemStatus() {
        const status = {
            python: await this.checkPythonService(),
            java: await this.checkJavaService(),
            php: await this.checkPHPService(),
            csharp: await this.checkCSharpService(),
            nodejs: await this.checkNodeJSService()
        };
        
        return status;
    }

    async checkPythonService() {
        // Simulate Python service check
        return { status: 'online', responseTime: '120ms' };
    }

    async checkJavaService() {
        // Simulate Java service check
        return { status: 'online', responseTime: '80ms' };
    }

    async checkPHPService() {
        // Simulate PHP service check
        return { status: 'online', responseTime: '60ms' };
    }

    async checkCSharpService() {
        // Simulate C# service check
        return { status: 'online', responseTime: '100ms' };
    }

    async checkNodeJSService() {
        // Simulate Node.js service check
        return { status: 'online', responseTime: '40ms' };
    }
}

// Global functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function openDemo() {
    alert('نظام التجربة سيفتح قريباً...');
}

// Initialize system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize main system
    window.vegaSystem = new VEGASystem();
});

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadStatus = document.getElementById('loadStatus');

    const steps = [
        'تهيئة النظام...',
        'تحميل وحدات Python...',
        'تفعيل خدمات Java...',
        'تشغيل نظام PHP...',
        'تهيئة C# .NET...',
        'تشغيل Node.js...',
        'جاري الإقلاع...'
    ];

    let progress = 0;
    let currentStep = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (currentStep < steps.length - 1 && progress > (currentStep + 1) * (100 / steps.length)) {
            currentStep++;
            loadStatus.textContent = steps[currentStep];
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
        
        loadingProgress.style.width = `${progress}%`;
    }, 200);
}