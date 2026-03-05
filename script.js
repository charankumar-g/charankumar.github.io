/* ================================================================
   CHARAN KUMAR G — PORTFOLIO SCRIPTS
   ================================================================ */
(function () {
    'use strict';

    /* Page is always visible — opacity controlled via CSS only */

    /* ── NAV ── */
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* ── SCROLL ARROW ── */
    document.getElementById('scrollArrow')?.addEventListener('click', () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    });

    /* ── SMOOTH ANCHORS ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t && a.getAttribute('href') !== '#') {
                e.preventDefault();
                t.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ── HERO REVEAL ── */
    const heroReveal = () => {
        document.querySelectorAll('.hero .reveal').forEach(el => {
            setTimeout(() => el.classList.add('visible'),
                parseInt(el.dataset.delay || 0) + 200);
        });
    };
    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', heroReveal)
        : heroReveal();

    /* ── INTERSECTION REVEAL ── */
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'),
                    parseInt(e.target.dataset.delay || 0));
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.sec-head .reveal, .footer .reveal').forEach(el => io.observe(el));

    // Section header
    const secHead = document.querySelector('.sec-head');
    if (secHead) {
        const secIO = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); secIO.unobserve(e.target); }
            });
        }, { threshold: 0.1 });
        secHead.classList.add('reveal');
        secIO.observe(secHead);
    }

    /* ── CARD STAGGER ── */
    const cardIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.reveal-card').forEach((c, i) => {
                    setTimeout(() => c.classList.add('visible'), i * 100);
                });
                cardIO.unobserve(e.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.card-row, .card-wide').forEach(el => cardIO.observe(el));

    // Also observe solo featured cards
    document.querySelectorAll('.card.card-wide.reveal-card').forEach(card => {
        const solo = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); solo.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        solo.observe(card);
    });

    /* ── CARD TILT ── */
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `translateY(-7px) perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    /* ── CURSOR ── */
    if (window.matchMedia('(pointer: fine)').matches) {
        const cur  = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        if (cur && ring) {
            let mx = 0, my = 0, rx = 0, ry = 0;
            document.addEventListener('mousemove', e => {
                mx = e.clientX; my = e.clientY;
                cur.style.left = mx + 'px';
                cur.style.top  = my + 'px';
            });
            (function loop() {
                rx += (mx - rx) * 0.1;
                ry += (my - ry) * 0.1;
                ring.style.left = rx + 'px';
                ring.style.top  = ry + 'px';
                requestAnimationFrame(loop);
            })();
            document.querySelectorAll('a, button, .card, .scroll-hint').forEach(el => {
                el.addEventListener('mouseenter', () => { cur.classList.add('big'); ring.classList.add('big'); });
                el.addEventListener('mouseleave', () => { cur.classList.remove('big'); ring.classList.remove('big'); });
            });
        }
    }

})();
