// Инициализация библиотеки анимаций AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom',
        mirror: true
    });
});

// Кастомный курсор
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    circle: document.querySelector('.cursor-circle'),
    links: document.querySelectorAll('a, button, .logo'),
    
    init() {
        // Проверяем, что мы на десктопе (ширина экрана больше 1024px)
        if (window.innerWidth > 1024) {
            // Следование за курсором с небольшой задержкой
            document.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                // Анимация точки
                this.dot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
                
                // Анимация круга с задержкой
                this.circle.style.transform = `translate(${posX}px, ${posY}px)`;
            });

            // Добавляем эффект при наведении на кликабельные элементы
            this.links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    this.circle.style.width = '60px';
                    this.circle.style.height = '60px';
                    this.circle.style.borderWidth = '3px';
                });
                
                link.addEventListener('mouseleave', () => {
                    this.circle.style.width = '40px';
                    this.circle.style.height = '40px';
                    this.circle.style.borderWidth = '2px';
                });
            });
        }
    }
};

// Инициализация курсора
cursor.init();

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Управление слайдером
const slider = {
    container: document.querySelector('.slider-container'),
    slider: document.querySelector('.slider'),
    slides: document.querySelectorAll('.slide'),
    
    init() {
        // Пауза при наведении
        this.container.addEventListener('mouseenter', () => {
            this.slider.style.animationPlayState = 'paused';
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.slider.style.animationPlayState = 'running';
        });

        // Обработка клика по слайду
        this.slides.forEach(slide => {
            slide.addEventListener('click', () => {
                const destination = slide.querySelector('p').textContent;
                console.log(`Выбрано направление: ${destination}`);
                // Здесь можно добавить дополнительную логику
            });
        });
    }
};

// Инициализация слайдера
slider.init();

// Управление баннером и фоном
const discover = {
    section: document.querySelector('.discover'),
    slides: document.querySelectorAll('.banner-slide'),
    currentSlide: 0,
    
    init() {
        // Автоматическое переключение слайдов
        setInterval(() => this.nextSlide(), 1500);
        
        // Отслеживание скролла для изменения фона
        window.addEventListener('scroll', () => {
            const rect = this.section.getBoundingClientRect();
            const triggerPoint = window.innerHeight * 0.5;
            
            if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                this.section.classList.add('yellow-bg');
            } else {
                this.section.classList.remove('yellow-bg');
            }
        });
    },
    
    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }
};

// Инициализация баннера
discover.init();

// Управление анимацией чата
const chat = {
    typingMessage: document.querySelector('.chat-message.typing'),
    
    init() {
        // Показываем текст сообщения после индикатора печатания
        setTimeout(() => {
            this.typingMessage.classList.add('show-text');
        }, 2000);

        // Наблюдаем за появлением чата в viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Сбрасываем анимацию при каждом появлении
                    this.typingMessage.classList.remove('show-text');
                    setTimeout(() => {
                        this.typingMessage.classList.add('show-text');
                    }, 2000);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(this.typingMessage);
    }
};

// Инициализация чата
chat.init();

