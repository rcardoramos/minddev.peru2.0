// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVEGACIÓN Y HEADER =====
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header con efecto de scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navegación móvil
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ===== ANIMACIONES DE SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // ===== EFECTOS DE PARALLAX =====
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });

    // ===== ANIMACIONES DE TEXTO =====
    function animateText(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        typeWriter();
    }

    // Animación del título principal al cargar
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line, .title-accent');
        titleLines.forEach((line, index) => {
            const originalText = line.textContent;
            line.textContent = '';

            setTimeout(() => {
                animateText(line, originalText, 50);
            }, 500 + (index * 200));
        });
    }

    // ===== EFECTOS DE HOVER AVANZADOS =====

    // Efecto de partículas en las tarjetas de servicios
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            createParticles(e, card);
        });
    });

    function createParticles(e, element) {
        const particles = 12;
        const rect = element.getBoundingClientRect();

        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.background = '#3b82f6';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = e.clientX - rect.left + 'px';
            particle.style.top = e.clientY - rect.top + 'px';

            element.appendChild(particle);

            const animation = particle.animate([
                {
                    transform: 'translate(0, 0)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => particle.remove();
        }
    }

    // ===== EFECTOS DE SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simular envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            const originalIcon = submitBtn.querySelector('i').className;

            submitBtn.querySelector('span').textContent = 'Enviando...';
            submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.querySelector('span').textContent = '¡Mensaje Enviado!';
                submitBtn.querySelector('i').className = 'fas fa-check';
                submitBtn.style.background = '#10b981';

                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.querySelector('i').className = originalIcon;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // ===== EFECTOS DE CURSOR PERSONALIZADO =====
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #3b82f6, #1e40af);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function (e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Efecto de cursor en elementos interactivos
    document.querySelectorAll('a, button, .service-card, .team-member, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    // ===== EFECTOS DE PARTÍCULAS EN EL HERO =====
    function createHeroParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(59, 130, 246, 0.4);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 15 + 10}s infinite linear;
                pointer-events: none;
            `;

            heroParticles.appendChild(particle);
        }
    }

    // ===== ANIMACIONES CSS DINÁMICAS =====

    // Agregar estilos CSS dinámicos
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        .hero-particle {
            animation: float-particle 15s infinite linear;
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(30px);
            padding: 2rem;
            border: 1px solid rgba(59, 130, 246, 0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .floating-element {
            position: relative;
        }
        
        .floating-element::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #3b82f6, #1e40af);
            border-radius: 22px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        .floating-element:hover::before {
            opacity: 0.3;
        }
    `;
    document.head.appendChild(dynamicStyles);

    // ===== EFECTOS DE HOVER EN TARJETAS =====

    // Efecto de elevación 3D en hover
    document.querySelectorAll('.service-card, .team-member, .portfolio-item').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // ===== EFECTOS DE TEXTO =====

    // Efecto de escritura para títulos de sección
    function typeWriterEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Aplicar efecto de escritura a títulos cuando sean visibles
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                const text = title.textContent;
                typeWriterEffect(title, text, 50);
                titleObserver.unobserve(title);
            }
        });
    });

    document.querySelectorAll('.section-title').forEach(title => {
        titleObserver.observe(title);
    });

    // ===== PERFORMANCE Y OPTIMIZACIÓN =====

    // Throttle para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Aplicar throttle a eventos de scroll
    const throttledScrollHandler = throttle(function () {
        // Aquí van las funciones que se ejecutan en scroll
    }, 16); // 60fps

    window.addEventListener('scroll', throttledScrollHandler);

    // ===== INICIALIZACIÓN =====

    // Crear partículas del hero
    createHeroParticles();

    // Inicializar funcionalidad del equipo
    initializeTeamDetails();

    // Inicializar rotación de mensajes del banner
    initializeBannerRotation();

    // Inicializar funcionalidad del botón cotizar
    initializeCotizarButton();

    // Marcar que la página está completamente cargada
    window.addEventListener('load', function () {
        document.body.classList.add('page-loaded');

        // Animación de entrada para toda la página
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 1s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('🚀 Nexus Digital - Página web cargada con éxito!');
    console.log('✨ Diseño Apple con colores oscuros y azul noche activo');
});

// Team member details toggle functionality
function initializeTeamDetails() {
    const plusButtons = document.querySelectorAll('.btn-plus');

    plusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const memberId = this.getAttribute('data-member');
            const detailsElement = document.getElementById(`details-${memberId}`);
            const isActive = this.classList.contains('active');

            // Close all other open details
            document.querySelectorAll('.member-details.active').forEach(detail => {
                if (detail !== detailsElement) {
                    detail.classList.remove('active');
                }
            });

            document.querySelectorAll('.btn-plus.active').forEach(btn => {
                if (btn !== this) {
                    btn.classList.remove('active');
                }
            });

            // Toggle current details
            if (isActive) {
                this.classList.remove('active');
                detailsElement.classList.remove('active');
            } else {
                this.classList.add('active');
                detailsElement.classList.add('active');
            }
        });
    });
}

// Banner messages rotation functionality
function initializeBannerRotation() {
    const messages = document.querySelectorAll('.banner-message');
    let currentIndex = 0;

    function showNextMessage() {
        // Remove active class from current message
        messages[currentIndex].classList.remove('active');

        // Move to next message
        currentIndex = (currentIndex + 1) % messages.length;

        // Add active class to new message
        messages[currentIndex].classList.add('active');
    }

    // Rotate messages every 4 seconds
    setInterval(showNextMessage, 4000);
}

// Cotizar button functionality
function initializeCotizarButton() {
    const cotizarBtn = document.querySelector('.btn-cotizar');

    if (cotizarBtn) {
        cotizarBtn.addEventListener('click', function () {
            // Scroll suave a la sección de contacto
            const contactSection = document.querySelector('#contacto');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Efecto visual en el botón
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    }
}
