// --- 1. BINTANG BACKGROUND ---
function createStars() {
    const bg = document.getElementById('universeBg');
    const starCount = window.innerWidth < 768 ? 60 : 120;
    bg.innerHTML = '';
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        const size = Math.random() * 2.5 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        star.style.setProperty('--opacity', Math.random());
        bg.appendChild(star);
    }
}
createStars();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createStars();
        resizeScratchCard();
    }, 200);
});

// --- 2. SCRATCH CARD ---
const canvas = document.getElementById('scratchCard');
const ctx = canvas.getContext('2d');
const container = document.getElementById('scratchContainer');
let isScratchedStarted = false;

function resizeScratchCard() {
    if (isScratchedStarted) return;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    ctx.fillStyle = '#b5b5c9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#444';
    ctx.textAlign = 'center';
    ctx.fillText('Gosok di sini... 🌸', canvas.width / 2, canvas.height / 2);
}
resizeScratchCard();

let isDrawing = false;
let lastDustTime = 0;

function scratch(e) {
    if (!isDrawing) return;
    isScratchedStarted = true;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    const music = document.getElementById('bgMusic');
    if (music.paused) music.play().catch(() => {});

    // THROTTLING DUST
    const now = performance.now();
    if (now - lastDustTime > 40) {
        createDust(clientX, clientY);
        lastDustTime = now;
    }
}

function createDust(x, y) {
    for(let i=0; i<3; i++) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.width = '6px';
        p.style.height = '6px';
        p.style.backgroundColor = 'rgba(255,107,139,0.7)';
        p.style.borderRadius = '50%';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '10';
        p.style.transform = `translate(${(Math.random()-0.5)*30}px, ${(Math.random()-0.5)*30}px)`;
        p.style.transition = 'all 0.5s ease-out';
        document.body.appendChild(p);
        setTimeout(() => { p.style.opacity = '0'; p.style.transform += ' scale(0)'; }, 10);
        setTimeout(() => p.remove(), 500);
    }
}

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('touchstart', () => isDrawing = true);
window.addEventListener('mouseup', () => isDrawing = false);
window.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('touchmove', scratch);

// --- 3. FINALE (CONFETTI CANVAS) ---
const finaleScreen = document.getElementById('finaleScreen');
const triggerFinale = document.getElementById('triggerFinale');
const fCanvas = document.getElementById('finaleCanvas');
const fCtx = fCanvas.getContext('2d');
let confettiArray = [];
let animationFrameId;

class Confetti {
    constructor() {
        this.x = Math.random() * fCanvas.width;
        this.y = Math.random() * -fCanvas.height;
        this.size = Math.random() * 8 + 6;
        this.type = Math.random() > 0.5 ? 'heart' : 'star';
        this.speedY = Math.random() * 2 + 1.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.color = `hsl(${Math.random() * 40 + 340}, 100%, 75%)`;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y > fCanvas.height) {
            this.y = -10;
            this.x = Math.random() * fCanvas.width;
        }
    }

    draw() {
        fCtx.save();
        fCtx.translate(this.x, this.y);
        fCtx.rotate(this.rotation);
        fCtx.fillStyle = this.color;

        if (this.type === 'heart') {
            fCtx.beginPath();
            fCtx.moveTo(0, 0);
            fCtx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
            fCtx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
            fCtx.fill();
        } else {
            fCtx.beginPath();
            for (let i = 0; i < 4; i++) {
                fCtx.lineTo(0, -this.size);
                fCtx.rotate(Math.PI / 2);
                fCtx.lineTo(0, -this.size / 3);
            }
            fCtx.fill();
        }
        fCtx.restore();
    }
}

function initConfetti() {
    fCanvas.width = window.innerWidth;
    fCanvas.height = window.innerHeight;
    confettiArray = [];
    const count = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < count; i++) {
        confettiArray.push(new Confetti());
    }
}

function animateConfetti() {
    fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
    confettiArray.forEach(p => {
        p.update();
        p.draw();
    });
    animationFrameId = requestAnimationFrame(animateConfetti);
}

triggerFinale.addEventListener('click', () => {
    const flash = document.getElementById('flashOverlay');
    flash.classList.add('flash-active');
    
    setTimeout(() => {
        flash.classList.remove('flash-active');
    }, 800);

    setTimeout(() => {
        finaleScreen.classList.add('active');
        initConfetti();
        animateConfetti();
    }, 300);
});

document.getElementById('btnReplay').addEventListener('click', () => {
    cancelAnimationFrame(animationFrameId);
    finaleScreen.classList.remove('active');
    isScratchedStarted = false;
    resizeScratchCard();
    
    const music = document.getElementById('bgMusic');
    music.currentTime = 0;
});
