document.addEventListener('DOMContentLoaded', function () {
    // 🎵 الموسيقى الخلفية
    const bgMusic = document.getElementById('bgMusic');
    const muteBtn = document.getElementById('muteBtn');
    let isMuted = false;

    // تشغيل الموسيقى عند أول تفاعل
    if (bgMusic) {
        document.body.addEventListener('click', function () {
            bgMusic.play().catch(e => console.log("لم يتمكن من تشغيل الصوت تلقائياً:", e));
        }, { once: true });

        if (muteBtn) {
            muteBtn.addEventListener('click', function () {
                isMuted = !isMuted;
                bgMusic.muted = isMuted;
                muteBtn.innerHTML = isMuted
                    ? '<i class="fas fa-volume-mute"></i>'
                    : '<i class="fas fa-volume-up"></i>';
            });
        }
    }

    // 🖼️ تكبير الصور عند الضغط
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeModalBtn = document.querySelector('.close-modal');

    if (zoomableImages.length > 0 && modal && modalImg && closeModalBtn) {
        zoomableImages.forEach(img => {
            img.addEventListener('click', function () {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });

        closeModalBtn.onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (e) {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    // 🔐 كلمة السر (لو الصفحة فيها نافذة دخول)
    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        const passwordModal = document.getElementById('passwordModal');
        const closeBtn = document.querySelector('.close');
        const passwordInput = document.getElementById('passwordInput');
        const submitBtn = document.getElementById('submitPassword');
        const errorMsg = document.getElementById('errorMsg');
        const togglePassword = document.querySelector('.toggle-password');

        enterBtn.addEventListener('click', function () {
            passwordModal.style.display = 'block';
            if (bgMusic) bgMusic.play();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                passwordModal.style.display = 'none';
            });
        }

        window.addEventListener('click', function (event) {
            if (event.target === passwordModal) {
                passwordModal.style.display = 'none';
            }
        });

        if (togglePassword) {
            togglePassword.addEventListener('click', function () {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }

        if (submitBtn && passwordInput) {
            submitBtn.addEventListener('click', checkPassword);
            passwordInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') checkPassword();
            });
        }

        function checkPassword() {
            const password = passwordInput.value.trim();

            if (password === '4-7-2005' || password === '4046' || password === '4/7/2005') {
                window.location.href = 'secret.html';
            } else {
                errorMsg.textContent = 'كلمة السر غير صحيحة! حاول مرة أخرى...';
                errorMsg.style.display = 'block';
                passwordModal.classList.add('shake');

                setTimeout(() => {
                    errorMsg.style.display = 'none';
                    passwordModal.classList.remove('shake');
                }, 3000);
            }
        }
    }

    // 🎈 بالونات إضافية (لو فيه container موجود)
    function addMoreBalloons() {
        const balloonsContainer = document.querySelector('.balloons');
        if (!balloonsContainer) return;

        const colors = ['#ff0066', '#9c27b0', '#ff4081', '#e91e63'];

        for (let i = 0; i < 5; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.top = '100%';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = `${10 + Math.random() * 10}s`;
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloon.style.width = `${20 + Math.random() * 20}px`;
            balloon.style.height = `${30 + Math.random() * 30}px`;
            balloonsContainer.appendChild(balloon);
        }
    }

    addMoreBalloons();
    setInterval(addMoreBalloons, 10000);
});
