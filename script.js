/* ================================================================
   CHARAN KUMAR G — PORTFOLIO SCRIPTS
   Premium White Edition
   ================================================================ */

(function () {
    'use strict';

    /* ── PAGE REVEAL ── */
    // Guarantee page is always visible — no blank screen
    document.documentElement.style.opacity = '0';
    document.documentElement.style.transition = 'opacity 0.5s ease';

    const showPage = () => {
        document.documentElement.style.opacity = '1';
    };
    window.addEventListener('load', showPage);
    setTimeout(showPage, 1200); // Failsafe

    /* ── NAV SCROLL ── */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* ── SCROLL ARROW ── */
    const scrollArrow = document.getElementById('scrollArrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            document.getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    /* ── SMOOTH ANCHOR SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    /* ── HERO REVEAL (above fold) ── */
    // Fire immediately after DOM is ready
    const fireHeroReveal = () => {
        document.querySelectorAll('.hero .reveal').forEach(el => {
            const delay = parseInt(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('visible'), delay + 200);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fireHeroReveal);
    } else {
        fireHeroReveal();
    }

    /* ── INTERSECTION OBSERVER: REVEAL ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('visible'), delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Observe all non-hero reveal elements
    document.querySelectorAll('.work .reveal, .footer .reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ── STAGGERED CARD REVEAL ── */
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.reveal-card');
                cards.forEach((card, i) => {
                    setTimeout(() => card.classList.add('visible'), i * 110);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06 });

    document.querySelectorAll('.work-inner').forEach(el => cardObserver.observe(el));

    // Also observe individual featured cards outside grids
    document.querySelectorAll('.pcard-featured.reveal-card').forEach(card => {
        const cardSingle = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    cardSingle.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        cardSingle.observe(card);
    });

    /* ── CARD 3D TILT ── */
    document.querySelectorAll('.pcard').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width  - 0.5;
            const y = (e.clientY - rect.top)  / rect.height - 0.5;
            const rotX = y * -3;
            const rotY = x *  4;
            card.style.transform = `translateY(-8px) perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ── CUSTOM CURSOR ── */
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.getElementById('cursor');
        const ring   = document.getElementById('cursorRing');

        if (cursor && ring) {
            let mx = 0, my = 0, rx = 0, ry = 0;

            document.addEventListener('mousemove', e => {
                mx = e.clientX;
                my = e.clientY;
                cursor.style.left = mx + 'px';
                cursor.style.top  = my + 'px';
            });

            const animRing = () => {
                rx += (mx - rx) * 0.1;
                ry += (my - ry) * 0.1;
                ring.style.left = rx + 'px';
                ring.style.top  = ry + 'px';
                requestAnimationFrame(animRing);
            };
            animRing();

            document.querySelectorAll('a, button, .pcard, .scroll-cue').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('expand');
                    ring.classList.add('expand');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('expand');
                    ring.classList.remove('expand');
                });
            });
        }
    }

    /* ── WORK HEADER REVEAL ── */
    const workHeader = document.querySelector('.work-header');
    if (workHeader) {
        revealObserver.observe(workHeader);
    }

})();
