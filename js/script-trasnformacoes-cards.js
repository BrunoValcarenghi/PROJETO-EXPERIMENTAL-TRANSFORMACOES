let currentTopic = 0;
let isAnimating = false;

const slides = document.querySelectorAll('.topic-slide');
const dotsContainer = document.getElementById('topicDots');
const sliderWrapper = document.querySelector('.topics-slider-wrapper');

slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTopicSlide(idx));
    dotsContainer.appendChild(dot);
});

function changeTopicSlide(nextIndex, direction) {
    if (isAnimating || nextIndex === currentTopic) return;
    isAnimating = true;

    const currentSlide = slides[currentTopic];
    const nextSlide = slides[nextIndex];

    if (sliderWrapper) {
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