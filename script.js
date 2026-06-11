const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const quizScreen = document.getElementById('quiz-screen');
const mainScreen = document.getElementById('main-screen');
const musik = document.getElementById('bgMusic');

// 1. EFEK TOMBOL "ENGGAK" KABUR JIKA DI-HOVER / DI-SENTUH
function moveButton() {
    // Menghitung batas acak agar tombol tidak keluar layar HP
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40) + 20;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Mencegah klik di HP
    moveButton();
});

// 2. KETIKA KLIK "IYA DONG!" (MASUK KE UTAMA)
yesBtn.addEventListener('click', () => {
    quizScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    
    // Putar musik (Aman dari blokir browser karena ada klik user)
    musik.play().catch(err => console.log("Audio play blocked"));
    
    // Jalankan efek typewriter romantis
    startStory();
});

// 3. KATA-KATA BARU: LEBIH LUWES, LUCU, TAPI SANGAT DALAM
const romanticText = "Happy Sweet 18th, Sayang... 💗 Akhirnya legal juga ya! Hehe. Makasih ya udah lahir ke dunia dan selalu jadi alasan aku buat senyum setiap hari. Kamu itu definisi 'cutie' yang beneran nyata di hidup aku. Jangan pernah bosen sama aku ya? Di umur yang ke-18 ini, aku berdoa semoga kamu makin dewasa, makin bahagia, dan semua hal baik datang ke hidup kamu. I love you today, tomorrow, and forever, mycutiee! ✨🌸";

function startStory() {
    let i = 0;
    const speed = 50; // Kecepatan ngetik teks
    const storyContainer = document.getElementById('story-text');
    
    function type() {
        if (i < romanticText.length) {
            storyContainer.innerHTML += romanticText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    setTimeout(type, 1200); // Jeda sebentar setelah foto jatuh selesai
}

// 4. EFEK KETIKA LAYAR DIKLIK (MUNCUL HATI INTERAKTIF)
mainScreen.addEventListener('click', (e) => {
    // Jangan picu jika yang diklik adalah tombol final
    if(e.target.id === 'celebrateBtn') return;

    const heart = document.createElement('div');
    heart.classList.add('click-heart');
    
    const elements = ["💗", "💖", "🌸", "✨", "🦋"];
    heart.innerText = elements[Math.floor(Math.random() * elements.length)];
    
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
});

// 5. TOMBOL FINAL CELEBRATE (CONFETTI MEGAH)
document.getElementById('celebrateBtn').addEventListener('click', function() {
    this.innerText = "I Love You So Much! 😭❤️";
    
    // Efek kembang api confetti menyebar mewah
    var end = Date.now() + (5 * 1000); // Durasi 5 detik

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
});
