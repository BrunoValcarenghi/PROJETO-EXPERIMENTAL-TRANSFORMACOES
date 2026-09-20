//dados das cartas
const cardsData = [
    {
        id: 1, 
        title: "Card I", 
        desc: "Lorem Ipsum is simply dummy text of the " + 
        "printing and typesetting industry. Lorem Ipsum " + 
        "has been the industry's standard dummy text " + 
        "ever since 1966.", 
        image1: "img/1f.png",
        image2: "img/1v.png"
    },
    {
        id: 2, 
        title: "Card II", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's text ever since 1966.", 
        image1: "img/2f.png",
        image2: "img/2v.png"
    },
    {
        id: 3, 
        title: "Card III", 
        desc: "Lorem Ipsum is simply text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 4, 
        title: "Card IV", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 5, 
        title: "Card V", 
        desc: "Lorem Ipsum is simply dummy text of the printing and industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 6, 
        title: "Card VI", 
        desc: "Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 7, 
        title: "Card VII", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 8, 
        title: "Card VIII", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 9, 
        title: "Card IX", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 10, 
        title: "Card X", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 11, 
        title: "Card XI", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    },
    {
        id: 12, 
        title: "Card XII", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.", 
        image1: "img/card.png",
        image2: "img/card.png"
    }

];

//renderizando carta

let currentIndex = 0;
let isFlipped = false;

const cardContainer = document.getElementById('cardContainer');
const card3d = document.getElementById('card3d');
const holoFront = document.getElementById('holoFront');
const holoBack = document.getElementById('holoBack');

let isAnimating = false;

function triggerSlideAnimation(direction, callback) {
    if (isAnimating) return;
    isAnimating = true;

    const outClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
    const inClass = direction > 0 ? 'slide-in-right' : 'slide-in-left';

    card3d.classList.add(outClass);

    setTimeout(() => {
        callback();

        card3d.classList.remove(outClass);
        card3d.classList.add(inClass);

        setTimeout(() => {
            card3d.classList.remove(inClass);
            isAnimating = false;
        }, 250);

    }, 250);
}

function changeCard(direction) {
    triggerSlideAnimation(direction, () => {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = cardsData.length - 1;
        if (currentIndex >= cardsData.length) currentIndex = 0;
        resetFlip();
        updateUI();
    });
}

function selectCard(index) {
    if (currentIndex === index || isAnimating) return;
    const direction = index > currentIndex ? 1 : -1;
    
    triggerSlideAnimation(direction, () => {
        currentIndex = index;
        resetFlip();
        updateUI();
    });
}

function toggleFlip() {
    isFlipped = !isFlipped;
    card3d.classList.add('resetting');
    applyTransform(0, 0);
}

function resetFlip() {
    isFlipped = false;
    card3d.classList.add('resetting');
    applyTransform(0, 0);
}

function updateUI() {
    const card = cardsData[currentIndex];
    
    const imgFront = document.getElementById('imgFront');
    const imgBack = document.getElementById('imgBack');
    if (imgFront && imgBack) {
        imgFront.src = card.image1;
        imgBack.src = card.image2;
    }

    const titles = document.querySelectorAll('.card-title, .card-title-mobile');
    titles.forEach(el => el.innerText = card.title);

    document.getElementById('cardDescription').innerText = card.desc;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => { dot.classList.toggle('active', idx === currentIndex); });
}

//virar carta

function applyTransform(rotateX, rotateY) {
    const baseFlip = isFlipped ? 180 : 0;
    const currentY = isFlipped ? baseFlip - rotateY : rotateY;
    card3d.style.transform = `rotateX(${rotateX}deg) rotateY(${currentY}deg)`;
}

//efeito 3d e holografico

function handleMove(clientX, clientY) {
    card3d.classList.remove('resetting');

    const rect = cardContainer.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 18;
    const rotateY = (x - centerX) / 18;
    
    applyTransform(rotateX, rotateY);

    const moveX = (x / rect.width) * 100;
    const moveY = (y / rect.height) * 100;
    const posString = `${moveX}% ${moveY}%`;

    if (isFlipped) {
        holoBack.style.backgroundPosition = `${100 - moveX}% ${moveY}%`;
    } else {
        holoFront.style.backgroundPosition = posString;
    }
}

function handleReset() {
    card3d.classList.add('resetting');
    applyTransform(0, 0);

    holoFront.style.backgroundPosition = '50% 50%';
    holoBack.style.backgroundPosition = '50% 50%';
}

//mouse

cardContainer.addEventListener('mousemove', (e) => {
    handleMove(e.clientX, e.clientY);
});

cardContainer.addEventListener('mouseleave', () => {
    handleReset();
});

//touch

cardContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

cardContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: false });

cardContainer.addEventListener('touchend', () => {
    handleReset();
});