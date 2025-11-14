// admin.js
class AdminPanel {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.initLogin();
        this.initEventListeners();
        this.loadDashboardData();
    }

    initLogin() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    async handleLogin() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        try {
            const response = await fetch('php/admin-login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (result.success) {
                this.currentUser = result.user;
                this.showDashboard();
                this.showNotification('تم تسجيل الدخول بنجاح', 'success');
            } else {
                this.showNotification(result.message, 'error');
            }
        } catch (error) {
            this.showNotification('خطأ في الاتصال بالخادم', 'error');
        }
    }

    showDashboard() {
        document.getElementById('adminLogin').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
    }

    logout() {
        this.currentUser = null;
        document.getElementById('adminLogin').classList.remove('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('loginForm').reset();
    }

    async loadDashboardData() {
        await this.loadStats();
        await this.loadProjects();
        await this.loadServices();
        await this.loadTeam();
        await this.loadMessages();
    }

    async loadStats() {
        try {
            const response = await fetch('php/get-stats.php');
            const stats = await response.json();
            
            document.getElementById('totalProjects').textContent = stats.projects;
            document.getElementById('totalServices').textContent = stats.services;
            document.getElementById('totalMessages').textContent = stats.messages;
            document.getElementById('teamMembers').textContent = stats.team;
            document.getElementById('messageCount').textContent = stats.messages;
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async loadProjects() {
        try {
            const response = await fetch('php/get-projects.php');
            const projects = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    renderProjects(projects) {
        const table = document.getElementById('projectsTable');
        if (!table) return;

        table.innerHTML = projects.map(project => `
            <tr>
                <td>${project.name}</td>
                <td>${project.technology}</td>
                <td>
                    <span class="status-badge ${project.status === 'active' ? 'active' : 'inactive'}">
                        ${project.status === 'active' ? 'نشط' : 'غير نشط'}
                    </span>
                </td>
                <td>${project.created_at}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-edit" onclick="editProject(${project.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-delete" onclick="deleteProject(${project.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    async loadServices() {
        try {
            const response = await fetch('php/get-services.php');
            const services = await response.json();
            this.renderServices(services);
        } catch (error) {
            console.error('Error loading services:', error);
        }
    }

    renderServices(services) {
        const grid = document.querySelector('.services-grid');
        if (!grid) return;

        grid.innerHTML = services.map(service => `
            <div class="service-admin-card">
                <div class="service-admin-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h4>${service.title}</h4>
                <p>${service.description}</p>
                <div class="service-admin-actions">
                    <button class="btn btn-sm btn-edit">تعديل</button>
                    <button class="btn btn-sm btn-delete">حذف</button>
                </div>
            </div>
        `).join('');
    }

    async loadTeam() {
        try {
            const response = await fetch('php/get-team.php');
            const team = await response.json();
            this.renderTeam(team);
        } catch (error) {
            console.error('Error loading team:', error);
        }
    }

    renderTeam(team) {
        const grid = document.querySelector('.team-grid');
        if (!grid) return;

        grid.innerHTML = team.map(member => `
            <div class="team-admin-card">
                <div class="member-admin-avatar">
                    <i class="${member.avatar || 'fas fa-user'}"></i>
                </div>
                <h4>${member.name}</h4>
                <p class="member-admin-role">${member.role}</p>
                <div class="member-admin-skills">
                    ${member.skills ? member.skills.split(',').map(skill => 
                        `<span class="skill-admin-tag">${skill.trim()}</span>`
                    ).join('') : ''}
                </div>
                <div class="member-admin-contact">
                    <a href="https://t.me/${member.telegram}" class="contact-admin-link">
                        <i class="fab fa-telegram"></i>
                        ${member.telegram}
                    </a>
                </div>
                <div class="member-admin-actions">
                    <button class="btn btn-sm btn-edit">تعديل</button>
                    <button class="btn btn-sm btn-delete">حذف</button>
                </div>
            </div>
        `).join('');
    }

    async loadMessages() {
        try {
            const response = await fetch('php/get-messages.php');
            const messages = await response.json();
            this.renderMessages(messages);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    renderMessages(messages) {
        const list = document.querySelector('.messages-list');
        if (!list) return;

        list.innerHTML = messages.map(message => `
            <div class="message-item ${message.status === 'unread' ? 'unread' : ''}">
                <div class="message-header">
                    <h4>${message.name}</h4>
                    <span class="message-date">${message.created_at}</span>
                </div>
                <div class="message-meta">
                    <span class="message-email">${message.email}</span>
                    <span class="message-service">${message.service_type}</span>
                </div>
                <div class="message-content">
                    <p>${message.message}</p>
                </div>
                <div class="message-actions">
                    <button class="btn btn-sm btn-primary" onclick="markAsRead(${message.id})">
                        ${message.status === 'unread' ? 'تحديد كمقروء' : 'مقروء'}
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="deleteMessage(${message.id})">
                        حذف
                    </button>
                </div>
            </div>
        `).join('');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initEventListeners() {
        // Project form handling
        const projectForm = document.getElementById('projectForm');
        if (projectForm) {
            projectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleProjectSubmit();
            });
        }

        // Site settings form
        const siteSettings = document.getElementById('siteSettings');
        if (siteSettings) {
            siteSettings.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSiteSettings();
            });
        }

        // Email settings form
        const emailSettings = document.getElementById('emailSettings');
        if (emailSettings) {
            emailSettings.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveEmailSettings();
            });
        }
    }

    async handleProjectSubmit() {
        const formData = new FormData(document.getElementById('projectForm'));
        
        try {
            const response = await fetch('php/save-project.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('تم حفظ المشروع بنجاح', 'success');
                this.closeModal('projectModal');
                this.loadProjects();
            } else {
                this.showNotification('حدث خطأ في حفظ المشروع', 'error');
            }
        } catch (error) {
            this.showNotification('خطأ في الاتصال بالخادم', 'error');
        }
    }

    async saveSiteSettings() {
        const formData = new FormData(document.getElementById('siteSettings'));
        
        try {
            const response = await fetch('php/save-settings.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('تم حفظ الإعدادات بنجاح', 'success');
            } else {
                this.showNotification('حدث خطأ في حفظ الإعدادات', 'error');
            }
        } catch (error) {
            this.showNotification('خطأ في الاتصال بالخادم', 'error');
        }
    }

    async saveEmailSettings() {
        const formData = new FormData(document.getElementById('emailSettings'));
        
        try {
            const response = await fetch('php/save-email-settings.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification('تم حفظ إعدادات البريد بنجاح', 'success');
            } else {
                this.showNotification('حدث خطأ في حفظ الإعدادات', 'error');
            }
        } catch (error) {
            this.showNotification('خطأ في الاتصال بالخادم', 'error');
        }
    }
}

// Global functions for modals and navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(`${sectionId}-section`).classList.add('active');

    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    const titles = {
        dashboard: 'لوحة التحكم',
        projects: 'إدارة المشاريع',
        services: 'إدارة الخدمات',
        team: 'إدارة الفريق',
        messages: 'الرسائل',
        analytics: 'الإحصائيات',
        system: 'إعدادات النظام'
    };
    pageTitle.textContent = titles[sectionId] || 'لوحة التحكم';

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

function showProjectModal() {
    document.getElementById('projectModal').classList.remove('hidden');
}

function showServiceModal() {
    // Similar to project modal
}

function showTeamModal() {
    // Similar to project modal
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function toggleSidebar() {
    document.querySelector('.admin-sidebar').classList.toggle('active');
}

function logout() {
    if (window.adminPanel) {
        window.adminPanel.logout();
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.adminPanel = new AdminPanel();
});