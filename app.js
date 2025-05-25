// app.js

document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const app = document.getElementById("app");
    const progressFill = document.querySelector(".progress-fill");
    const typedSpan = document.querySelector(".typed");
    const themeToggle = document.getElementById("theme-toggle");
    const routerView = document.getElementById("router-view");

    const routes = {
        home: document.getElementById("home-page").content.cloneNode(true),
        subjects: document.getElementById("subjects-page").content.cloneNode(true),
        // Додай інші сторінки тут
    };

    const typingText = "Завантаження системи ProTrainer...";

    // Симулюємо друковану анімацію
    let charIndex = 0;
    const typeInterval = setInterval(() => {
        if (charIndex < typingText.length) {
            typedSpan.textContent += typingText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);

    // Завантаження splash-екрану
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 8;
        progressFill.style.width = `${Math.min(loadProgress, 100)}%`;
        if (loadProgress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                splash.classList.add("fade-out");
                setTimeout(() => {
                    splash.style.display = "none";
                    app.classList.remove("hidden");
                    loadRoute("home");
                }, 500);
            }, 300);
        }
    }, 100);

    // Темна / світла тема
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        themeToggle.innerHTML = newTheme === "dark" 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    });

    // Простенький SPA роутинг
    function loadRoute(route) {
        routerView.innerHTML = "";
        if (routes[route]) {
            routerView.appendChild(routes[route].cloneNode(true));
            if (route === "subjects") generateSubjects();
        } else {
            routerView.innerHTML = "<h2>404 - Сторінку не знайдено</h2>";
        }
    }

    // Обробка кнопок-навігаторів
    document.body.addEventListener("click", e => {
        if (e.target.closest("[data-route]")) {
            const targetRoute = e.target.closest("[data-route]").getAttribute("data-route");
            loadRoute(targetRoute);
        }
    });

    // Генерація предметів
    function generateSubjects() {
        const container = document.querySelector(".subject-grid");
        const subjects = ["Електромонтаж", "Технологія", "Охорона праці", "Основи програмування"];
        subjects.forEach(subj => {
            const card = document.createElement("div");
            card.className = "cyber-card glow-effect";
            card.innerHTML = `<h3>${subj}</h3><p>Розпочати тренування</p>`;
            container.appendChild(card);
        });
    }

    // Зберігаємо тему між сесіями (опціонально)
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        themeToggle.innerHTML = savedTheme === "dark" 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    }

    // Зберігати тему при зміні
    themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme");
        localStorage.setItem("theme", newTheme);
    });
});
