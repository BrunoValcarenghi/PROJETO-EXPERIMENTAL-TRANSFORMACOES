let currentTopic = 0;
let isAnimating = false;

const slides = document.querySelectorAll('.topic-slide');
const dotsContainer = document.getElementById('topicDots');
const sliderWrapper = document.querySelector('.topics-slider-wrapper');

const slideSlugs = [
    'casa-veronica',
    'genero-e-identidade',
    'diversidade-e-linguagem',
    'direitos-e-cidadania',
    'convivencia-e-acolhimento',
    'explore-nosso-material'
];

slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTopicSlide(idx));
    dotsContainer.appendChild(dot);
});

function updateURL(index) {
    const url = new URL(window.location);
    const slug = slideSlugs[index] || index;
    url.searchParams.set('carta', slug);
    window.history.replaceState({}, '', url);
}

function changeTopicSlide(nextIndex, direction, updateHistory = true) {
    if (isAnimating || nextIndex === currentTopic) return;
    isAnimating = true;

    const currentSlide = slides[currentTopic];
    const nextSlide = slides[nextIndex];

    if (sliderWrapper && updateHistory) {
        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = sliderWrapper.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    nextSlide.classList.add('behind');

    requestAnimationFrame(() => {
        const discardClass = direction === 1 ? 'discard-left' : 'discard-right';
        currentSlide.classList.add(discardClass);

        setTimeout(() => {
            currentSlide.classList.remove('active', discardClass);
            nextSlide.classList.remove('behind');
            nextSlide.classList.add('active');

            currentTopic = nextIndex;
            
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentTopic);
            });

            if (updateHistory) {
                updateURL(currentTopic);
            }

            isAnimating = false;
        }, 350);
    });
}

function moveTopicSlide(direction) {
    let nextIndex = currentTopic + direction;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    
    changeTopicSlide(nextIndex, direction);
}

function goToTopicSlide(index) {
    const direction = index > currentTopic ? 1 : -1;
    changeTopicSlide(index, direction);
}

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cartaParam = urlParams.get('carta');

    if (cartaParam) {
        const targetIndex = slideSlugs.indexOf(cartaParam);
        if (targetIndex !== -1 && targetIndex !== 0) {
            slides[0].classList.remove('active');
            slides[targetIndex].classList.add('active');
            currentTopic = targetIndex;

            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentTopic);
            });
        }
    }
});