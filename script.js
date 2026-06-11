// Kata-kata akan diketik otomatis baris demi baris
const messages = [
    "Selamat ulang tahun yang ke-18 untuk perempuan paling spesial! 💗",
    "Di umur yang baru ini, semoga kamu semakin bahagia, sehat selalu...",
    "dan semua mimpimu perlahan terwujud ✨",
    "Terima kasih sudah lahir ke dunia ini dan menjadi bagian terindah dalam hidupku.",
    "You mean the world to me. I love you! 🥰"
];

let messageIndex = 0;
let charIndex = 0;
const typingSpeed = 50; // Kecepatan ngetik
const textElement = document.getElementById("typewriter-text");

function typeWriter() {
    if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
            textElement.innerHTML += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            textElement.innerHTML += "<br><br>";
            messageIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 800); // Jeda sebelum mengetik kalimat baru
        }
    }
}

// Menjalankan animasi efek kelap-kelip & ngetik saat web dibuka
window.onload = () => {
    typeWriter();
    createFireflies();
};

function createFireflies() {
    const particles = document.getElementById("particles");
    for (let i = 0; i < 40; i++) {
        let firefly = document.createElement("div");
        firefly.classList.add("firefly");
        firefly.style.width = Math.random() * 5 + 2 + "px";
        firefly.style.height = firefly.style.width;
        firefly.style.left = Math.random() * 100 + "vw";
        firefly.style.top = Math.random() * 100 + "vh";
        firefly.style.animationDelay = Math.random() * 5 + "s";
        particles.appendChild(firefly);
    }
}

// Animasi ledakan hati saat tombol diklik
document.getElementById("surpriseBtn").addEventListener("click", function() {
    this.innerText = "I Love You More! 💖";
    this.style.background = "linear-gradient(45deg, #ff1744, #d50000)";
    
    // Titik pusat ledakan (di tengah layar)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Membuat 80 partikel meledak
    for (let i = 0; i < 80; i++) {
        setTimeout(() => createExplosiveHeart(centerX, centerY), i * 15);
    }
});

function createExplosiveHeart(x, y) {
    const heart = document.createElement("div");
    heart.classList.add("explosive-heart");
    
    const emojis = ["💗", "💖", "✨", "💕", "🌸", "🦋"];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    document.body.appendChild(heart);
    
    // Posisi awal di tengah
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    
    // Arah ledakan acak (360 derajat)
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 300; // Jarak tembakan hati
    
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    const rot = Math.random() * 360; // Rotasi acak
    
    heart.style.setProperty('--tx', tx + "px");
    heart.style.setProperty('--ty', ty + "px");
    heart.style.setProperty('--rot', rot + "deg");
    
    // Hapus elemen agar tidak bikin berat HP
    setTimeout(() => {
        heart.remove();
    }, 1500);
}
