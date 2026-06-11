const envelopeScene = document.getElementById('envelope-scene');
const mainContent = document.getElementById('main-content');
const musik = document.getElementById('bgMusic');

// 1. Logika Buka Surat
envelopeScene.addEventListener('click', () => {
    document.querySelector('.flap').style.transform = 'rotateX(180deg)';
    setTimeout(() => {
        document.querySelector('.letter').style.transform = 'translateY(-50px)';
        envelopeScene.style.opacity = '0';
        musik.play(); // Musik mulai jalan
        
        setTimeout(() => {
            envelopeScene.classList.add('hidden');
            mainContent.classList.remove('hidden');
            startMagic();
        }, 1000);
    }, 600);
});

// 2. Logika Efek Setelah Web Terbuka
function startMagic() {
    // Jalankan Love Meter
    setTimeout(() => {
        document.getElementById('bar-fill').style.width = '100%';
        let val = 0;
        let interval = setInterval(() => {
            if(val >= 100) clearInterval(interval);
            document.getElementById('meter-val').innerText = val + '%';
            val++;
        }, 20);
    }, 500);

    // Jalankan Typewriter emosional
    const text = "Di umur yang ke-18 ini, aku cuma mau bilang kalau kamu adalah hal terbaik yang pernah hadir di hidupku. Teruslah bersinar, mycutiee... Aku akan selalu ada di sini mendukungmu. 💗";
    let i = 0;
    const speed = 70;
    function type() {
        if (i < text.length) {
            document.getElementById('typewriter').innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    setTimeout(type, 1500);
}

// 3. Final Surprise (Confetti & Wishes)
document.getElementById('finalSurprise').addEventListener('click', function() {
    this.innerHTML = "Wishes Sent to Universe! ✨";
    
    // Kembang Api Confetti
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});
