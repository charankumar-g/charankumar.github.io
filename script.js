/* ============================================================
   CHARAN KUMAR G — PORTFOLIO SCRIPTS
   ============================================================ */

(function () {
    'use strict';

    /* ── NAV SCROLL STATE ── */
    const nav = document.getElementById('nav');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScrollY = y;
    }, { passive: true });

    /* ── SCROLL ARROW ── */
    const scrollArrow = document.getElementById('scrollArrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const target = document.getElementById('projects');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    /* ── REVEAL ON SCROLL ── */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => revealObserver.observe(el));

    /* ── STAGGERED CARD REVEAL ── */
    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.reveal-card');
                    cards.forEach((card, i) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, i * 120);
                    });
                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.05 }
    );

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        cardObserver.observe(projectsGrid);
    }

    /* ── HERO ELEMENTS: IMMEDIATE REVEAL ── */
    // Trigger hero reveals immediately since they're above fold
    window.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure CSS transitions are active
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.querySelectorAll('.hero .reveal-up').forEach((el) => {
                    const delay = parseInt(el.dataset.delay || 0);
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, delay + 100);
                });
            });
        });
    });

    /* ── CUSTOM CURSOR (desktop only) ── */
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(cursor);
        document.body.appendChild(follower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 5 + 'px';
            cursor.style.top  = mouseY - 5 + 'px';
        });

        // Smooth follower
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.left = followerX - 18 + 'px';
            follower.style.top  = followerY - 18 + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Scale on hover
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .scroll-indicator');
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2.5)';
                cursor.style.opacity = '0.5';
                follower.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.opacity = '1';
                follower.style.transform = 'scale(1)';
            });
        });
    }

    /* ── SMOOTH NAV LINK SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── CARD TILT EFFECT ── */
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ── PAGE LOAD ANIMATION ── */
    document.documentElement.style.opacity = '0';
    document.documentElement.style.transition = 'opacity 0.6s ease';
    window.addEventListener('load', () => {
        requestAnimationFrame(() => {
            document.documentElement.style.opacity = '1';
        });
    });

})();
