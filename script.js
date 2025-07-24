// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    setInterval(createParticle, 300);
}

// Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 3000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Glitch Effect
function addGlitchEffect() {
    const titles = document.querySelectorAll('.section-title, .hero-title');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'none';
            title.offsetHeight; // Trigger reflow
            title.style.animation = 'glitch 0.3s ease-in-out';
        });
    });
}

// Game Over Effect
function triggerGameOver() {
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.textContent = 'LEVEL COMPLETE!';
    document.body.appendChild(gameOver);
    
    setTimeout(() => {
        gameOver.remove();
    }, 3000);
}

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerGameOver();
        konamiCode = [];
    }
});

// Interactive Project Screens
function initProjectScreens() {
    const projectScreens = document.querySelectorAll('.project-screen');
    
    projectScreens.forEach((screen, index) => {
        // Add animated content to project screens
        const canvas = document.createElement('canvas');
        canvas.width = screen.offsetWidth - 6;
        canvas.height = screen.offsetHeight - 6;
        canvas.style.position = 'absolute';
        canvas.style.top = '3px';
        canvas.style.left = '3px';
        canvas.style.borderRadius = '7px';
        screen.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        function animateScreen() {
            ctx.fillStyle = '#001122';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw animated grid
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time) * 0.2})`;
            ctx.lineWidth = 1;
            
            for (let x = 0; x < canvas.width; x += 20) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            for (let y = 0; y < canvas.height; y += 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw project-specific animations
            switch(index) {
                case 0: // FYUGP GenAI
                    drawAINetwork(ctx, time);
                    break;
                case 1: // FYUGP GenAI V2
                    drawAIBrain(ctx, time);
                    break;
                case 2: // EduSync
                    drawNetworkNodes(ctx, time);
                    break;
            }
            
            time += 0.1;
            requestAnimationFrame(animateScreen);
        }
        
        animateScreen();
    });
}

function drawAINetwork(ctx, time) {
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#ff00ff';
    
    // Draw neural network nodes
    const nodes = [
        {x: 30, y: 40}, {x: 60, y: 30}, {x: 60, y: 50},
        {x: 90, y: 25}, {x: 90, y: 40}, {x: 90, y: 55},
        {x: 120, y: 35}, {x: 120, y: 45}
    ];
    
    // Draw connections with animated pulses
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            const pulse = Math.sin(time + i + j) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(255, 0, 255, ${pulse})`;
            ctx.stroke();
        }
    }
    
    // Draw nodes
    nodes.forEach((node, i) => {
        const glow = Math.sin(time + i * 0.5) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 0, 255, ${glow})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawAIBrain(ctx, time) {
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    
    // Draw brain outline
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 40, 30, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw synapses
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 25 + Math.sin(time + i) * 5;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.sin(time + i) * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(0, 255, 255, ${Math.sin(time + i) * 0.3 + 0.3})`;
        ctx.stroke();
    }
}

function drawNetworkNodes(ctx, time) {
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ffff00';
    
    // Draw interconnected nodes representing professional network
    const networkNodes = [];
    for (let i = 0; i < 6; i++) {
        networkNodes.push({
            x: 30 + (i % 3) * 40,
            y: 40 + Math.floor(i / 3) * 30,
            connections: []
        });
    }
    
    // Create connections
    networkNodes.forEach((node, i) => {
        networkNodes.forEach((otherNode, j) => {
            if (i !== j && Math.random() > 0.6) {
                node.connections.push(j);
            }
        });
    });
    
    // Draw connections
    networkNodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
            const targetNode = networkNodes[connectionIndex];
            const pulse = Math.sin(time + i + connectionIndex) * 0.4 + 0.6;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.strokeStyle = `rgba(255, 255, 0, ${pulse})`;
            ctx.stroke();
        });
    });
    
    // Draw nodes
    networkNodes.forEach((node, i) => {
        const size = 3 + Math.sin(time + i) * 1;
        const glow = Math.sin(time + i * 0.7) * 0.3 + 0.7;
        
        ctx.fillStyle = `rgba(255, 255, 0, ${glow})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Sound Effects (Web Audio API)
let audioContext;

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playBeep(frequency = 440, duration = 200) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Add sound effects to buttons
function addSoundEffects() {
    const buttons = document.querySelectorAll('.nav-btn, .arcade-btn, .social-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playBeep(800, 100);
        });
        
        button.addEventListener('click', () => {
            playBeep(1200, 150);
        });
    });
}

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Power-up Effect
function createPowerUpEffect(element) {
    const powerUp = document.createElement('div');
    powerUp.style.position = 'absolute';
    powerUp.style.top = '50%';
    powerUp.style.left = '50%';
    powerUp.style.transform = 'translate(-50%, -50%)';
    powerUp.style.width = '100px';
    powerUp.style.height = '100px';
    powerUp.style.border = '3px solid #ffff00';
    powerUp.style.borderRadius = '50%';
    powerUp.style.boxShadow = '0 0 30px #ffff00';
    powerUp.style.pointerEvents = 'none';
    powerUp.style.zIndex = '1000';
    powerUp.style.animation = 'powerUpSpin 1s ease-out forwards';
    
    element.style.position = 'relative';
    element.appendChild(powerUp);
    
    setTimeout(() => {
        powerUp.remove();
    }, 1000);
}

// Typing effect for hero subtitle
function typeWriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = 'FULL STACK DEVELOPER';
    let i = 0;
    
    subtitle.style.animation = 'none';
    subtitle.textContent = '';
    
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 150);
        } else {
            subtitle.style.borderRight = '3px solid transparent';
        }
    }
    
    setTimeout(type, 4000);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    hideLoadingScreen();
    createParticles();
    initSmoothScrolling();
    addGlitchEffect();
    
    // Initialize audio on first user interaction
    document.addEventListener('click', () => {
        if (!audioContext) {
            initAudio();
            addSoundEffects();
        }
    }, { once: true });
    
    // Initialize project screens after a short delay
    setTimeout(() => {
        initProjectScreens();
    }, 1000);
    
    // Create matrix rain effect
    createMatrixRain();
    
    // Add power-up effects to skills
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        skill.addEventListener('click', () => {
            createPowerUpEffect(skill);
            playBeep(1500, 200);
        });
    });
    
    // Add hover effects to project cabinets
    const projectCabinets = document.querySelectorAll('.project-cabinet');
    projectCabinets.forEach(cabinet => {
        cabinet.addEventListener('mouseenter', () => {
            playBeep(600, 100);
        });
    });
});

// Initialize typing effect and Easter egg
window.addEventListener('load', () => {
    typeWriter();
    initEasterEgg();
});

// Easter Egg Functionality
let draggedButtons = [];
let isDragging = false;

function initEasterEgg() {
    const draggableButtons = document.querySelectorAll('.draggable-btn');
    const easterEggZone = document.getElementById('easterEggZone');
    
    draggableButtons.forEach(button => {
        let startX, startY, currentX, currentY;
        let originalParent = button.parentNode;
        let originalNext = button.nextSibling;
        
        button.addEventListener('mousedown', startDrag);
        button.addEventListener('touchstart', startDrag, { passive: false });
        
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            
            const rect = button.getBoundingClientRect();
            if (e.type === 'mousedown') {
                startX = e.clientX - rect.left;
                startY = e.clientY - rect.top;
            } else {
                startX = e.touches[0].clientX - rect.left;
                startY = e.touches[0].clientY - rect.top;
            }
            
            button.classList.add('dragging');
            document.body.appendChild(button);
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
            
            updateEasterEggZone();
        }
        
        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            if (e.type === 'mousemove') {
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;
            } else {
                currentX = e.touches[0].clientX - startX;
                currentY = e.touches[0].clientY - startY;
            }
            
            button.style.left = currentX + 'px';
            button.style.top = currentY + 'px';
            
            checkEasterEggCollision(button, e);
        }
        
        function stopDrag(e) {
            if (!isDragging) return;
            isDragging = false;
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
            
            const rect = easterEggZone.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            
            if (isOverlapping(buttonRect, rect) && easterEggZone.classList.contains('ready')) {
                addToEasterEgg(button);
            } else {
                button.classList.remove('dragging');
                button.style.position = '';
                button.style.left = '';
                button.style.top = '';
                originalParent.insertBefore(button, originalNext);
            }
            
            updateEasterEggZone();
        }
    });
}

function updateEasterEggZone() {
    const easterEggZone = document.getElementById('easterEggZone');
    const draggingButtons = document.querySelectorAll('.dragging');
    
    if (draggingButtons.length > 0) {
        easterEggZone.classList.add('ready');
    } else {
        easterEggZone.classList.remove('ready');
    }
}

function checkEasterEggCollision(button, e) {
    const easterEggZone = document.getElementById('easterEggZone');
    const rect = easterEggZone.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    if (isOverlapping(buttonRect, rect)) {
        easterEggZone.style.borderColor = '#00ff00';
        easterEggZone.style.boxShadow = '0 0 20px #00ff00';
    } else {
        easterEggZone.style.borderColor = 'var(--neon-pink)';
        easterEggZone.style.boxShadow = '';
    }
}

function addToEasterEgg(button) {
    const buttonType = button.getAttribute('data-btn');
    
    if (!draggedButtons.includes(buttonType)) {
        draggedButtons.push(buttonType);
        button.style.display = 'none';
    }
    
    if (draggedButtons.includes('L') && draggedButtons.includes('M')) {
        activateEasterEgg();
    }
}

function activateEasterEgg() {
    const easterEggZone = document.getElementById('easterEggZone');
    easterEggZone.classList.add('activated');
    
    setTimeout(() => {
        createLovePage();
        startHeartRain();
        createFloatingLoveElements();
    }, 500);
}

function createLovePage() {
    const lovePage = document.createElement('div');
    lovePage.className = 'love-page';
    lovePage.innerHTML = `
        <div class="close-love">×</div>
        <h1 class="love-title">💖 FOR MY DARLING LEA 💖</h1>
        <div class="love-message">
            To the most wonderful girlfriend in the world! 🌟<br><br>
            You bring magic to every day and make my world brighter.<br>
            This little arcade tribute is just a tiny reflection<br>
            of how amazing you are, my beautiful princess! 👑<br><br>
            I love you more than all the pixels in this retro universe! 💕
        </div>
        <div class="love-nicknames">
            <div class="nickname">💝 KITTY 💝</div>
            <div class="nickname">🌻 BUTTERCUP 🌻</div>
            <div class="nickname">💎 DARLING 💎</div>
            <div class="nickname">👑 PRINCESS 👑</div>
        </div>
        <div class="photo-gallery">
            <div class="photo-slot">Click to add your favorite photo of Lea! 📸</div>
            <div class="photo-slot">Add another beautiful memory! 💕</div>
            <div class="photo-slot">More precious moments! ✨</div>
            <div class="photo-slot">Sweet memories together! 🥰</div>
            <div class="photo-slot">Your smile lights up my world! 😊</div>
            <div class="photo-slot">Forever and always! 💖</div>
        </div>
        <div class="floating-love"></div>
    `;
    
    document.body.appendChild(lovePage);
    
    setTimeout(() => {
        lovePage.classList.add('show');
    }, 100);
    
    lovePage.querySelector('.close-love').addEventListener('click', closeLovePage);
    
    const photoSlots = lovePage.querySelectorAll('.photo-slot');
    photoSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        slot.style.backgroundImage = `url(${e.target.result})`;
                        slot.style.backgroundSize = 'cover';
                        slot.style.backgroundPosition = 'center';
                        slot.textContent = '';
                        slot.style.border = '3px solid #00ff00';
                        
                        const sparkles = document.createElement('div');
                        sparkles.style.position = 'absolute';
                        sparkles.style.top = '0';
                        sparkles.style.left = '0';
                        sparkles.style.width = '100%';
                        sparkles.style.height = '100%';
                        sparkles.style.pointerEvents = 'none';
                        sparkles.innerHTML = '✨✨✨';
                        sparkles.style.animation = 'sparkle 2s ease-in-out';
                        slot.appendChild(sparkles);
                        
                        setTimeout(() => sparkles.remove(), 2000);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    });
}

function startHeartRain() {
    const heartRain = document.createElement('div');
    heartRain.className = 'heart-rain';
    document.body.appendChild(heartRain);
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['💖', '💕', '💝', '❤️', '💗'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        heart.style.animationDelay = Math.random() + 's';
        
        heartRain.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
    
    const heartInterval = setInterval(createHeart, 200);
    heartRain.heartInterval = heartInterval;
}

function createFloatingLoveElements() {
    const floatingLove = document.querySelector('.floating-love');
    const loveElements = ['💕', '✨', '🌟', '💖', '🦋', '🌸', '💫', '🌺'];
    
    function createLoveElement() {
        const element = document.createElement('div');
        element.className = 'love-element';
        element.innerHTML = loveElements[Math.floor(Math.random() * loveElements.length)];
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = Math.random() * window.innerHeight + 'px';
        element.style.animationDelay = Math.random() * 5 + 's';
        
        floatingLove.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 10000);
    }
    
    for (let i = 0; i < 15; i++) {
        setTimeout(createLoveElement, i * 500);
    }
}

function closeLovePage() {
    const lovePage = document.querySelector('.love-page');
    const heartRain = document.querySelector('.heart-rain');
    
    if (lovePage) {
        lovePage.classList.remove('show');
        setTimeout(() => {
            lovePage.remove();
        }, 500);
    }
    
    if (heartRain) {
        clearInterval(heartRain.heartInterval);
        heartRain.remove();
    }
    
    draggedButtons = [];
    const hiddenButtons = document.querySelectorAll('.draggable-btn[style*="display: none"]');
    hiddenButtons.forEach(button => {
        button.style.display = '';
        button.classList.remove('dragging');
        button.style.position = '';
        button.style.left = '';
        button.style.top = '';
    });
    
    const easterEggZone = document.getElementById('easterEggZone');
    easterEggZone.classList.remove('ready', 'activated');
}

function isOverlapping(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
    }
`;
