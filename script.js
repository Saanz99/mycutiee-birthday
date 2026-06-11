document.getElementById("surpriseBtn").addEventListener("click", function() {
    // Mengubah teks tombol secara dramatis
    this.innerText = "I Love You so much! 💗";
    this.style.backgroundColor = "#ff4081";
    
    // Memulai hujan hati
    for (let i = 0; i < 70; i++) {
        setTimeout(createHeart, i * 80); // Muncul bertahap
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    
    // Random emoji romantis
    const emojis = ["💗", "💖", "✨", "💕", "🌸"];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posisi random menyebar dari kiri ke kanan layar
    heart.style.left = Math.random() * 100 + "vw";
    
    // Kecepatan terbang random
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // antara 3 sampai 5 detik
    
    document.body.appendChild(heart);
    
    // Hapus elemen setelah selesai terbang agar browser tidak lag
    setTimeout(() => {
        heart.remove();
    }, 5000);
}
