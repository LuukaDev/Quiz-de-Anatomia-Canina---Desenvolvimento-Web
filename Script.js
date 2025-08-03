const bones = [
    { name: "Crânio", image: "IMAGENS/CR.jpg" },
    { name: "Mandíbula", image: "IMAGENS/MD.jpg" },
    { name: "Úmero", image: "IMAGENS/UM.png" },
    { name: "Fêmur", image: "IMAGENS/FEM.png" },
    { name: "Escápula", image: "IMAGENS/EA.jpg" },
    { name: "Osso parietal", image: "IMAGENS/PR.jpg" },
    { name: "Zigomático", image: "IMAGENS/ZM.jpg" },
    { name: "Fíbula", image: "IMAGENS/FB.jpg" },
    { name: "Rádio", image: "IMAGENS/RD.png" },
    { name: "Metatarso", image: "IMAGENS/MT.png" },
    { name: "Ulna", image: "IMAGENS/UL.png" },
    { name: "Osso frontal", image: "IMAGENS/FT.png" },
    { name: "Osso occipital", image: "IMAGENS/OC.png" },
    { name: "Púbis", image: "IMAGENS/PB.png" },
    { name: "Metacarpo Face Palmar", image: "IMAGENS/MTF.png" },
    { name: "Metacarpo Face Media", image: "IMAGENS/MTM.png" },
    { name: "Acetábulo", image: "IMAGENS/AC.png" },
    { name: "Patela", image: "IMAGENS/PT.png" },
    { name: "Tíbia", image: "IMAGENS/TB.png" },
    { name: "Tálus", image: "IMAGENS/TL.png" },
    { name: "Osso temporal", image: "IMAGENS/TEM.png" },
    { name: "Nasal", image: "IMAGENS/NS.jpg" },
    { name: "Axis (C2)", image: "IMAGENS/AT1.png" },
    { name: "Vértebra cervical (C3-C7)", image: "IMAGENS/CV.png" },
    { name: "Vértebra torácica", image: "IMAGENS/VT.png" },
    { name: "Vértebra lombar", image: "IMAGENS/VL.png" },
    { name: "Sacro", image: "IMAGENS/SA.png" },
    { name: "Vértebra coccígea", image: "IMAGENS/CC.png" },
    { name: "Costela falsa", image: "IMAGENS/CF.png" },
    { name: "Costela verdadeira", image: "IMAGENS/CT.png" },
    { name: "Esterno", image: "IMAGENS/ET.png" },
    { name: "Falange distal", image: "IMAGENS/FL.png" },
    { name: "Falange média", image: "IMAGENS/FM.png" },
    { name: "Ílio", image: "IMAGENS/IL.png" },
    { name: "Ísquio", image: "IMAGENS/IS.png" },
    { name: "Acetábulo", image: "IMAGENS/ACT.png" },
    { name: "Patela", image: "IMAGENS/PA.png" },
    { name: "Calcâneo", image: "IMAGENS/CA.png" },
    { name: "Ossos tarsais", image: "IMAGENS/OT.png" },
    { name: "Incisivo", image: "IMAGENS/IN.png" },
];

let score = 0;
let lives = 3;
let correctBone = null;
let timeLeft = 15;
let timerId = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer() {
    timeLeft = 15;
    document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Tempo: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            lives--;
            document.getElementById('lives').textContent = `Vidas: ${'❤️'.repeat(lives)}`;
            document.getElementById('feedback').textContent = `Tempo esgotado! O osso era ${correctBone.name}.`;
            setTimeout(startRound, 1000);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

function startRound() {
    if (lives <= 0) {
        stopTimer();
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('final-score').textContent = score;
        document.getElementById('restart').style.display = 'block';
        document.getElementById('images').innerHTML = '';
        document.getElementById('bone-name').textContent = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('timer').textContent = 'Tempo: 15s';
        return;
    }

    const shuffledBones = shuffle([...bones]).slice(0, 3);
    correctBone = shuffledBones[Math.floor(Math.random() * 3)];

    document.getElementById('bone-name').textContent = correctBone.name;
    document.getElementById('feedback').textContent = '';

    const imagesDiv = document.getElementById('images');
    imagesDiv.innerHTML = '';
    shuffledBones.forEach(bone => {
        const img = document.createElement('img');
        img.src = bone.image;
        img.classList.add('bone-image');
        img.dataset.name = bone.name;
        img.addEventListener('click', () => handleClick(bone.name));
        imagesDiv.appendChild(img);
    });

    startTimer();
}

function handleClick(selectedBoneName) {
    stopTimer();
    const images = document.querySelectorAll('.bone-image');
    images.forEach(img => {
        if (img.dataset.name === correctBone.name) {
            img.classList.add('correct');
        } else if (img.dataset.name === selectedBoneName) {
            img.classList.add('incorrect');
        }
    });

    if (selectedBoneName === correctBone.name) {
        score++;
        document.getElementById('score').textContent = `Pontuação: ${score}`;
        document.getElementById('feedback').textContent = `Correto! Este é o ${correctBone.name}!`;
    } else {
        lives--;
        document.getElementById('lives').textContent = `Vidas: ${'❤️'.repeat(lives)}`;
        document.getElementById('feedback').textContent = `Errado! Este não é o ${correctBone.name}.`;
    }

    setTimeout(startRound, 1000);
}

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    startRound();
});

document.getElementById('restart').addEventListener('click', () => {
    score = 0;
    lives = 3;
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    document.getElementById('lives').textContent = `Vidas: ${'❤️'.repeat(lives)}`;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('restart').style.display = 'none';
    startRound();
});