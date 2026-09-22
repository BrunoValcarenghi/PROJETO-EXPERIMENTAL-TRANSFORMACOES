//dados das cartas
const cardsData = [
    {
        id: 1, 
        title: "DIGITAL I: Quem foi Verônica?", 
        desc: "Conheça a trajetória de Verônica Oliveira, a “Mãe Loira”, e sua importância para a história e o acolhimento da população trans em Santa Maria.", 
        image1: "../img/cartas/f1.png",
        image2: "../img/cartas/v1.png",
        link: "#"
    },
    {
        id: 2, 
        title: "DIGITAL II: A Casa Verônica", 
        desc: "Conheça a Casa Verônica, sua atuação e os serviços de acolhimento, promoção da igualdade e enfrentamento às violências.", 
        image1: "../img/cartas/f2.png",
        image2: "../img/cartas/v2.png",
        link: "#"
    },
    {
        id: 3, 
        title: "DIGITAL III: Identidade de gênero", 
        desc: "Entenda o que é identidade de gênero e conheça sua relação com gênero, expressão de gênero e orientação sexual.", 
        image1: "../img/cartas/f3.png",
        image2: "../img/cartas/v3.png",
        link: "#"
    },
    {
        id: 4, 
        title: "DIGITAL IV: Nome social e cidadania", 
        desc: "Conheça o conceito de nome social e informações sobre seu reconhecimento e utilização por pessoas trans.", 
        image1: "../img/cartas/f4.png",
        image2: "../img/cartas/v4.png",
        link: "#"
    },
    {
        id: 5, 
        title: "DIGITAL V: Transfobia e legislação", 
        desc: "Aprofunde seus conhecimentos sobre a legislação brasileira e o reconhecimento jurídico da homofobia e da transfobia.", 
        image1: "../img/cartas/f5.png",
        image2: "../img/cartas/v5.png",
        link: "#"
    },
    {
        id: 6, 
        title: "DIGITAL VI: Onde buscar apoio?", 
        desc: "Conheça espaços e serviços que oferecem acolhimento, atendimento e apoio à população trans em Santa Maria.", 
        image1: "../img/cartas/f6.png",
        image2: "../img/cartas/v6.png",
        link: "#"
    },
    {
        id: 7, 
        title: "DIGITAL VII: Os três eixos da Casa Verônica", 
        desc: "Explore os três eixos de atuação da Casa Verônica e conheça as ações desenvolvidas em cada um deles.", 
        image1: "../img/cartas/f7.png",
        image2: "../img/cartas/v7.png",
        link: "#"
    },
    {
        id: 8, 
        title: "DIGITAL VIII: Interseccionalidade na prática", 
        desc: "Entenda como diferentes marcadores sociais podem se relacionar e produzir experiências distintas de desigualdade e acesso a direitos.", 
        image1: "../img/cartas/f8.png",
        image2: "../img/cartas/v8.png",
        link: "#"
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

    const desc = document.getElementById('cardDescription');
    if (desc) desc.innerText = card.desc;

    const cardLink = document.getElementById('cardLink');
    if (cardLink) {
        cardLink.href = card.link; // CORRIGIDO: de currentCard.link para card.link
    }

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

// Inicialização da interface na primeira carga
updateUI();