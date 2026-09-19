// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero__slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function initSlider() {
    if(slides.length > 0) {
        showSlide(0);
        startSlider();
    }
}

function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(n) {
    showSlide(currentSlide + n);
    resetSlider();
}

function goToSlide(n) {
    showSlide(n);
    resetSlider();
}

function startSlider() {
    slideInterval = setInterval(() => changeSlide(1), 6000);
}

function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
}


// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}


// Filter logic for New Arrivals
function filterTab(btn, cat) {
    // Buttons active state
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Cards filtering
    document.querySelectorAll('.product-card').forEach(card => {
        // Find if this card is in the 'new arrivals' section so we don't accidentally hide 'deals'
        if(card.parentElement.id === 'newArrivalsGrid') {
            if (cat === 'all' || card.dataset.cat === cat) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}


// Countdown Timer Logic
function startCountdown() {
    const timerElement = document.getElementById('timer');
    if(!timerElement) return;

    // Set countdown for 5 hours from now
    let time = 5 * 60 * 60;

    setInterval(() => {
        if(time <= 0) return;
        time--;

        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;

        timerElement.innerText =
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }, 1000);
}


// Cart Interactivity
function addToCart(btn) {
    const toast = document.getElementById('toast');
    toast.classList.add('show');

    // Animate button slightly
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-check"></i> Added';
    btn.style.background = '#2ed573';

    setTimeout(() => {
        toast.classList.remove('show');
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 3000);
}


// Back to top Logic
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Newsletter Subscription
function subscribeNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if(input.value) {
        alert("Thanks for subscribing! " + input.value + " has been added to our list.");
        input.value = '';
    }
}

// Initialize scripts
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    startCountdown();
});
