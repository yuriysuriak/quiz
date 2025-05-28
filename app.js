class ProfessionalTrainer {
    constructor() {
        this.subjects = [
            { 
                id: 1, 
                name: "Електротехніка", 
                icon: "fa-bolt",
                description: "Основи електричних ланцюгів та систем"
            },
            { 
                id: 2, 
                name: "Механіка", 
                icon: "fa-cogs",
                description: "Принципи механічних систем"
            },
            { 
                id: 3, 
                name: "Програмування", 
                icon: "fa-code",
                description: "Алгоритми та структури даних"
            },
            { 
                id: 4, 
                name: "Матеріалознавство", 
                icon: "fa-atom",
                description: "Властивості сучасних матеріалів"
            },
            { 
                id: 5, 
                name: "Електроніка", 
                icon: "fa-microchip",
                description: "Електронні компоненти та схеми"
            },
            { 
                id: 6, 
                name: "Креслення", 
                icon: "fa-ruler-combined",
                description: "Технічне креслення та проектування"
            }
        ];
        
        this.init();
    }

    init() {
        this.loadTemplates();
        this.setupRouter();
        this.setupTheme();
        this.animateSplash();
    }
    
    loadTemplates() {
        this.pages = {
            home: document.getElementById('home-page').content,
            subjects: document.getElementById('subjects-page').content
        };
    }
    
    animateSplash() {
        setTimeout(() => {
            document.getElementById('splash').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splash').remove();
                document.getElementById('app').classList.remove('hidden');
                this.navigate('home');
            }, 800);
        }, 3000);
    }
    
    setupRouter() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-route]')) {
                e.preventDefault();
                const route = e.target.closest('[data-route]').dataset.route;
                this.navigate(route);
            }
        });
    }
    
    navigate(page) {
        const routerView = document.getElementById('router-view');
        routerView.innerHTML = '';
        
        const content = document.importNode(this.pages[page], true);
        
        if (page === 'subjects') {
            const grid = content.querySelector('.subjects-grid');
            this.subjects.forEach(subject => {
                const card = document.createElement('div');
                card.className = 'subject-card';
                card.innerHTML = `
                    <div class="subject-icon">
                        <i class="fas ${subject.icon}"></i>
                    </div>
                    <h3>${subject.name}</h3>
                    <p>${subject.description}</p>
                    <button class="start-btn">Почати тренування</button>
                `;
                grid.appendChild(card);
            });
        }
        
        routerView.appendChild(content);
    }
    
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new ProfessionalTrainer());

document.addEventListener("click", e => {
    const btn = e.target.closest("[data-route]");
    if (btn) {
        const route = btn.getAttribute("data-route");
        navigateTo(route);
    }
});
