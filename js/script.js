const cardsData = [
    {
        id: 1, 
        title: "Card I", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's", 
        image: "img/card.png"
    },
    {
        id: 2, 
        title: "Card II", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has  the industry's   text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's", 
        image: "img/card.png"
    },
    {
        id: 3, 
        title: "Card III", 
        desc: "Lorem Ipsum is simply  text of the printing and typesetting industry. Lorem Ipsum has been the 's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's", 
        image: "img/card.png"},
    {
        id: 4, title: "Card IV", 
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's", 
        image: "img/card.png"
    },
    {
        id: 5, 
        title: "Card V", 
        desc: "Lorem Ipsum is simply dummy text of the printing and  industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's", 
        image: "img/card.png"
    },
    {
        id: 6, 
        title: "Card VI", 
        desc: "Lorem Ipsum is simply dummy text of the  and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's", 
        image: "img/card.png"
    }
];

let currentIndex = 0;
let isFlipped = false;

const cardContainer = document.getElementById('cardContainer');
const card3d = document.getElementById('card3d');
const holoFront = document.getElementById('holoFront');
const holoBack = document.getElementById('holoBack');

function selectCard(index) {
    currentIndex = index;
    resetFlip();
    updateUI();
}

function changeCard(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = cardsData.length - 1;
    if (currentIndex >= cardsData.length) currentIndex = 0;
    resetFlip();
    updateUI();
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
    
    const nameFront = document.getElementById('cardNameFront');
    const nameBack = document.getElementById('cardNameBack');
    
    if (nameFront) nameFront.innerText = card.title;
    if (nameBack) nameBack.innerText = card.title;

    const imgEl = document.getElementById('cardImg');
    if (imgEl) imgEl.src = card.image;
    document.getElementById('cardTitle').innerText = card.title;
    document.getElementById('cardDescription').innerText = card.desc;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => { dot.classList.toggle('active', idx === currentIndex); });
}

function applyTransform(rotateX, rotateY) {
    const baseFlip = isFlipped ? 180 : 0;
    const currentY = isFlipped ? baseFlip - rotateY : rotateY;
    card3d.style.transform = `rotateX(${rotateX}deg) rotateY(${currentY}deg)`;
}

cardContainer.addEventListener('mousemove', (e) => {
    card3d.classList.remove('resetting');

    const rect = cardContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 22;
    const rotateY = (x - centerX) / 22;
    
    applyTransform(rotateX, rotateY);

    const moveX = (x / rect.width) * 100;
    const moveY = (y / rect.height) * 100;
    const posString = `${moveX}% ${moveY}%`;

    if (isFlipped) {
        holoBack.style.backgroundPosition = `${100 - moveX}% ${moveY}%`;
    } else {
        holoFront.style.backgroundPosition = posString;
    }
});

cardContainer.addEventListener('mouseleave', () => {
    card3d.classList.add('resetting');
    applyTransform(0, 0);

    holoFront.style.backgroundPosition = '50% 50%';
    holoBack.style.backgroundPosition = '50% 50%';
});