const unlockBtn = document.getElementById('unlockBtn');
const introOverlay = document.getElementById('intro-overlay');
const appContent = document.getElementById('app-content');
const musik = document.getElementById('bgMusic');
const photoCard = document.getElementById('photoCard');
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// 1. UNLOCK CINEMATIC INTRO
unlockBtn.addEventListener('click', () => {
    introOverlay.style.opacity = '0';
    introOverlay.style.pointerEvents = 'none';
    appContent.classList.remove('blur-hidden');
    
    // Pemicu Audio yang Lebih Kuat (Force Reload & Play)
    musik.load(); // Paksa browser download ulang file mp3-nya
    musik.play().then(() => {
        console.log("Musik sukses berputar!");
    }).catch(err => {
        // Jika gagal, sistem akan memberi tahu error-nya lewat pop-up
        alert("Waduh, browser kamu memblokir musik. Coba cek volume HP atau gunakan Chrome/Brave!");
        console.log("Audio play blocked", err);
    });
    
    initScratchCard();
});

// 2. INTERACTIVE 3D PARALLAX MOUSE TRACKING
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    photoCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Untuk HP (Menggunakan Gerakan Sentuhan)
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const xAxis = (window.innerWidth / 2 - touch.pageX) / 30;
    const yAxis = (window.innerHeight / 2 - touch.pageY) / 30;
    photoCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// 3. FAIRY DUST EFFECT (JEJAK SERBUK PERI)
function createDust(x, y) {
    const dust = document.createElement('div');
    dust.classList.add('magic-dust');
    dust.style.left = `${x}px`;
    dust.style.top = `${y}px`;
    
    // Warna acak antara pink dan ungu neon
    const colors = ['#ff007f', '#7928ca', '#ff65a3', '#fff'];
    dust.style.background = colors[Math.floor(Math.random() * colors.length)];
    dust.style.width = `${Math.random() * 6 + 3}px`;
    dust.style.height = dust.style.width;

    document.body.appendChild(dust);
    setTimeout(() => dust.remove(), 1000);
}

window.addEventListener('mousemove', (e) => createDust(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => {
    createDust(e.touches[0].clientX, e.touches[0].clientY);
});

// 4. INTERACTIVE SCRATCH CARD LOGIKA (KANVAS INPUT)
function initScratchCard() {
    // Menyesuaikan ukuran kanvas secara presisi sesuai container-nya
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    // Membuat lapisan atas penutup (Gradient Mewah Pink Emas)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff758c');
    gradient.addColorStop(0.5, '#ff7eb3');
    gradient.addColorStop(1, '#7928ca');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Menambahkan pola titik-titik estetik di atas lapisan gosok
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    for (let i = 0; i < 200; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }

    let isDrawing = false;

    function scratch(e) {
        if (!isDrawing) return;
        
        // Deteksi posisi kursor/jari secara akurat terhadap koordinat kanvas
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Efek menghapus lapisan kanvas (Destination-out)
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2); // Diameter lingkaran gosokan
        ctx.fill();
    }

    // Event Listeners untuk Mouse dan Layar Sentuh HP
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratch);
}

// 5. TOMBOL FINAL (EFEK FLASH SCREEN)
document.getElementById('sparkBtn').addEventListener('click', function() {
    this.innerText = "Segenap Semestaku Milikmu ✨❤️";
    document.body.style.animation = 'flashEffect 0.5s ease-out';
    setTimeout(() => document.body.style.animation = '', 500);
});
