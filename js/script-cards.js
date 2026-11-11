//dados das cartas
const cardsData = [
    {
        id: 1, 
        title: "DIGITAL I: Verônica Oliveira", 
        desc: "Conheça a trajetória de Verônica Oliveira, a “Mãe Loira”, e sua importância para a história e o acolhimento da população trans em Santa Maria.", 
        image1: "img/cartas/TEXTO-01.png",
        image2: "img/cartas/TEXTO-02.png",
        mark: "img/cartas/MARCA-01.png",
        frontBackground: "img/cartas/FUNDO-01.png",
        backBackground: "img/cartas/FUNDO-02.png",
        link: "/transformacoes?carta=casa-veronica#topicsContainer"
    },
    {
        id: 2, 
        title: "DIGITAL II: A Casa Verônica", 
        desc: "Conheça a Casa Verônica, sua atuação e os serviços de acolhimento, promoção da igualdade e enfrentamento às violências.", 
        image1: "img/cartas/TEXTO-03.png",
        image2: "img/cartas/TEXTO-04.png",
        mark: "img/cartas/MARCA-03.png",
        frontBackground: "img/cartas/FUNDO-03.png",
        backBackground: "img/cartas/FUNDO-04.png",
        link: "/transformacoes?carta=casa-veronica#topicsContainer"
    },
    {
        id: 3, 
        title: "DIGITAL III: Identidade de gênero", 
        desc: "Entenda o que é identidade de gênero e conheça sua relação com gênero, expressão de gênero e orientação sexual.", 
        image1: "img/cartas/TEXTO-05.png",
        image2: "img/cartas/TEXTO-06.png",
        mark: "img/cartas/MARCA-05.png",
        frontBackground: "img/cartas/FUNDO-05.png",
        backBackground: "img/cartas/FUNDO-06.png",
        link: "/transformacoes?carta=genero-e-identidade#topicsContainer"
    },
    {
        id: 4, 
        title: "DIGITAL IV: Nome social", 
        desc: "Conheça o conceito de nome social e informações sobre seu reconhecimento e utilização por pessoas trans.", 
        image1: "img/cartas/TEXTO-07.png",
        image2: "img/cartas/TEXTO-08.png",
        mark: "img/cartas/MARCA-07.png",
        frontBackground: "img/cartas/FUNDO-07.png",
        backBackground: "img/cartas/FUNDO-08.png",
        link: "/transformacoes?carta=direitos-e-cidadania#topicsContainer"
    },
    {
        id: 5, 
        title: "DIGITAL V: Transfobia e proteção penal", 
        desc: "Aprofunde seus conhecimentos sobre a legislação brasileira e o reconhecimento jurídico da homofobia e da transfobia.", 
        image1: "img/cartas/TEXTO-09.png",
        image2: "img/cartas/TEXTO-10.png",
        mark: "img/cartas/MARCA-09.png",
        frontBackground: "img/cartas/FUNDO-09.png",
        backBackground: "img/cartas/FUNDO-10.png",
        link: "/transformacoes?carta=direitos-e-cidadania#topicsContainer"
    },
    {
        id: 6, 
        title: "DIGITAL VI: Acesso ao processo transexualizador", 
        desc: "Conheça espaços e serviços que oferecem acolhimento, atendimento e apoio à população trans em Santa Maria.", 
        image1: "img/cartas/TEXTO-11.png",
        image2: "img/cartas/TEXTO-12.png",
        mark: "img/cartas/MARCA-11.png",
        frontBackground: "img/cartas/FUNDO-11.png",
        backBackground: "img/cartas/FUNDO-12.png",
        link: "/transformacoes?carta=direitos-e-cidadania#topicsContainer"
    },
    {
        id: 7, 
        title: "DIGITAL VII: Para que existe a Casa Verônica", 
        desc: "Explore os três eixos de atuação da Casa Verônica e conheça as ações desenvolvidas em cada um deles.", 
        image1: "img/cartas/TEXTO-13.png",
        image2: "img/cartas/TEXTO-14.png",
        mark: "img/cartas/MARCA-13.png",
        frontBackground: "img/cartas/FUNDO-13.png",
        backBackground: "img/cartas/FUNDO-14.png",
        link: "/transformacoes?carta=casa-veronica#topicsContainer"
    },
    {
        id: 8, 
        title: "DIGITAL VIII: Interseccionalidade", 
        desc: "Entenda como diferentes marcadores sociais podem se relacionar e produzir experiências distintas de desigualdade e acesso a direitos.", 
        image1: "img/cartas/TEXTO-15.png",
        image2: "img/cartas/TEXTO-16.png",
        mark: "img/cartas/MARCA-15.png",
        frontBackground: "img/cartas/FUNDO-15.png",
        backBackground: "img/cartas/FUNDO-16.png",
        link: "/transformacoes?carta=diversidade-e-linguagem#topicsContainer"
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
    const imgMark = document.getElementById('imgMark');
    if (imgFront && imgBack) {
        imgFront.src = card.image1;
        imgBack.src = card.image2;
        imgMark.src = card.mark;
        const frontBackgroundUrl = new URL(card.frontBackground, document.baseURI).href;
        const backBackgroundUrl = new URL(card.backBackground, document.baseURI).href;
        document.querySelector('.card-front').style.setProperty('--card-background', `url("${frontBackgroundUrl}")`);
        document.querySelector('.card-back').style.setProperty('--card-background', `url("${backBackgroundUrl}")`);
    }

    const titles = document.querySelectorAll('.card-title, .card-title-mobile');
    titles.forEach(el => el.innerText = card.title);

    const desc = document.getElementById('cardDescription');
    if (desc) desc.innerText = card.desc;

    document.getElementById('cardLinkHotspot').href = card.link;
    document.getElementById('cardInfoLink').href = card.link;

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

document.getElementById('cardLinkHotspot').addEventListener('click', (event) => {
    event.stopPropagation();
});
