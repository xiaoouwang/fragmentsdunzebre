// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content cards for animation
document.querySelectorAll('.content-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Tag filtering system
const tagFilters = document.querySelectorAll('.tag-filter');
const filteredArticlesContainer = document.getElementById('filtered-articles');

// Articles data (you can expand this as you add more articles)
const articlesData = [
    {
        title: "Qu'est-ce que le HPI ?",
        description: "Une introduction complète au haut potentiel intellectuel",
        url: "articles/hpi-introduction.html",
        tags: ["HPI", "Introduction"]
    },
    {
        title: "Les caractéristiques du HPI",
        description: "Découvrez les traits distinctifs des personnes à haut potentiel",
        url: "articles/hpi-caracteristiques.html",
        tags: ["HPI", "Caractéristiques"]
    },
    {
        title: "Vivre avec le HPI au quotidien",
        description: "Stratégies et conseils pour s'épanouir avec son haut potentiel",
        url: "articles/hpi-vie-quotidienne.html",
        tags: ["HPI", "Vie quotidienne", "Stratégies"]
    },
    {
        title: "Comprendre l'hypersensibilité",
        description: "Une définition complète de ce trait de personnalité",
        url: "articles/hypersensibilite-definition.html",
        tags: ["Hypersensibilité", "Définition"]
    },
    {
        title: "Les manifestations de l'hypersensibilité",
        description: "Comment reconnaître et identifier les signes d'hypersensibilité",
        url: "articles/hypersensibilite-manifestations.html",
        tags: ["Hypersensibilité", "Manifestations"]
    },
    {
        title: "Stratégies d'adaptation",
        description: "Techniques pour vivre harmonieusement avec son hypersensibilité",
        url: "articles/hypersensibilite-strategies.html",
        tags: ["Hypersensibilité", "Stratégies", "Adaptation"]
    },
    {
        title: "L'empathie émotionnelle",
        description: "Comprendre cette capacité à ressentir les émotions d'autrui",
        url: "articles/empathie-emotionnelle.html",
        tags: ["Empathie", "Émotions"]
    },
    {
        title: "Les défis de l'empathie",
        description: "Identifier et comprendre les difficultés liées à l'empathie",
        url: "articles/empathie-defis.html",
        tags: ["Empathie", "Défis"]
    },
    {
        title: "Protection et équilibre",
        description: "Techniques pour préserver son énergie émotionnelle",
        url: "articles/empathie-protection.html",
        tags: ["Empathie", "Protection", "Équilibre"]
    },
    {
        title: "Comprendre la timidité",
        description: "Une approche bienveillante de cette caractéristique",
        url: "articles/timidite-comprendre.html",
        tags: ["Timidité", "Compréhension"]
    },
    {
        title: "Les situations difficiles",
        description: "Identifier et gérer les moments qui posent problème",
        url: "articles/timidite-situations.html",
        tags: ["Timidité", "Situations", "Gestion"]
    },
    {
        title: "Apprendre à s'épanouir",
        description: "Développer sa confiance et ses forces cachées",
        url: "articles/timidite-epanouissement.html",
        tags: ["Timidité", "Épanouissement", "Confiance"]
    },
    {
        title: "Qu'est-ce qu'un multipotentiel ?",
        description: "Découvrir cette richesse de talents multiples",
        url: "articles/multipotentiel-definition.html",
        tags: ["Multipotentiel", "Définition"]
    },
    {
        title: "Les défis du multipotentiel",
        description: "Comprendre les difficultés spécifiques aux multipotentiels",
        url: "articles/multipotentiel-defis.html",
        tags: ["Multipotentiel", "Défis"]
    },
    {
        title: "Transformer ses talents",
        description: "Apprendre à valoriser et combiner ses multiples passions",
        url: "articles/multipotentiel-talents.html",
        tags: ["Multipotentiel", "Talents", "Développement"]
    },
    {
        title: "Personnalité évitante",
        description: "Comprendre ce mode de fonctionnement particulier",
        url: "articles/evitant-definition.html",
        tags: ["Évitant", "Définition"]
    },
    {
        title: "Les manifestations",
        description: "Identifier les signes et comportements évitants",
        url: "articles/evitant-manifestations.html",
        tags: ["Évitant", "Manifestations"]
    },
    {
        title: "Accompagnement bienveillant",
        description: "Approches thérapeutiques et soutien adaptés",
        url: "articles/evitant-accompagnement.html",
        tags: ["Évitant", "Accompagnement", "Thérapie"]
    }
];

// Filter articles by tag
function filterArticlesByTag(selectedTag) {
    const filteredArticles = articlesData.filter(article =>
        article.tags.includes(selectedTag)
    );

    displayFilteredArticles(filteredArticles, selectedTag);
}

// Display filtered articles
function displayFilteredArticles(articles, tag) {
    if (articles.length === 0) {
        filteredArticlesContainer.innerHTML = `
            <p class="filter-message">Aucun article trouvé pour le tag "${tag}"</p>
        `;
        return;
    }

    const articlesHTML = articles.map(article => `
        <div class="filtered-article">
            <h4><a href="${article.url}" class="article-link">${article.title}</a></h4>
            <p>${article.description}</p>
            <div class="article-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');

    filteredArticlesContainer.innerHTML = `
        <h3>Articles avec le tag "${tag}" (${articles.length})</h3>
        ${articlesHTML}
    `;
}

// Add click event listeners to tag filters
tagFilters.forEach(filter => {
    filter.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active class from all filters
        tagFilters.forEach(f => f.classList.remove('active'));

        // Add active class to clicked filter
        this.classList.add('active');

        // Get the tag from data attribute
        const selectedTag = this.getAttribute('data-tag');

        // Filter articles
        filterArticlesByTag(selectedTag);

        // Scroll to filtered articles
        filteredArticlesContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #e74c3c !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }

    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add loaded class styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body.loaded .hero-title,
        body.loaded .hero-subtitle,
        body.loaded .hero-description {
            animation: fadeInUp 0.8s ease forwards;
        }

        body.loaded .hero-title {
            animation-delay: 0.2s;
        }

        body.loaded .hero-subtitle {
            animation-delay: 0.4s;
        }

        body.loaded .hero-description {
            animation-delay: 0.6s;
        }

        body.loaded .hero-buttons {
            animation: fadeInUp 0.8s ease forwards;
            animation-delay: 0.8s;
        }

        body.loaded .zebra-illustration {
            animation: fadeInUp 0.8s ease forwards;
            animation-delay: 1s;
        }

        .hero-title,
        .hero-subtitle,
        .hero-description,
        .hero-buttons,
        .zebra-illustration {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#accueil';
    skipLink.textContent = 'Aller au contenu principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #e74c3c;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });

    // Add role attributes to navigation
    const nav = document.querySelector('.nav-menu');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navigation principale');
    }
});

// Performance optimization: Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
