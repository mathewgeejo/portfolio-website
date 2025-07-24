// Enhanced Particle System
function createParticles() {
  const particlesContainer = document.getElementById("particles")

  function createParticle() {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDuration = Math.random() * 3 + 2 + "s"
    particle.style.animationDelay = Math.random() * 2 + "s"

    const colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff00"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    particle.style.background = color
    particle.style.boxShadow = `0 0 6px ${color}`

    particlesContainer.appendChild(particle)

    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove()
      }
    }, 5000)
  }

  setInterval(createParticle, 300)
}

// Enhanced Loading Screen
function hideLoadingScreen() {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen")
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 1000)
  }, 3000)
}

// Smooth Scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-btn")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Enhanced Glitch Effect
function addGlitchEffect() {
  const titles = document.querySelectorAll(".section-title, .hero-title")

  titles.forEach((title) => {
    title.addEventListener("mouseenter", () => {
      title.style.animation = "none"
      title.offsetHeight // Trigger reflow
      title.style.animation = "glitch 0.3s ease-in-out"
    })
  })
}

// Game Over Effect
function triggerGameOver() {
  const gameOver = document.createElement("div")
  gameOver.className = "game-over"
  gameOver.textContent = "LEVEL COMPLETE!"
  document.body.appendChild(gameOver)

  setTimeout(() => {
    gameOver.remove()
  }, 3000)
}

// Enhanced Konami Code Easter Egg
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    triggerGameOver()
    createSpecialEffects()
    konamiCode = []
  }
})

// Enhanced Interactive Project Screens
function initProjectScreens() {
  const projectScreens = document.querySelectorAll(".project-screen")

  projectScreens.forEach((screen, index) => {
    // Add animated content to project screens
    const canvas = document.createElement("canvas")
    canvas.width = screen.offsetWidth - 6
    canvas.height = screen.offsetHeight - 6
    canvas.style.position = "absolute"
    canvas.style.top = "3px"
    canvas.style.left = "3px"
    canvas.style.borderRadius = "7px"
    screen.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    let time = 0

    function animateScreen() {
      ctx.fillStyle = "#001122"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time) * 0.2})`
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw project-specific animations
      switch (index) {
        case 0: // FYUGP GenAI
          drawAINetwork(ctx, time)
          break
        case 1: // FYUGP GenAI V2
          drawAIBrain(ctx, time)
          break
        case 2: // EduSync
          drawNetworkNodes(ctx, time)
          break
      }

      time += 0.1
      requestAnimationFrame(animateScreen)
    }

    animateScreen()
  })
}

function drawAINetwork(ctx, time) {
  ctx.strokeStyle = "#ff00ff"
  ctx.lineWidth = 2
  ctx.fillStyle = "#ff00ff"

  // Draw neural network nodes
  const nodes = [
    { x: 30, y: 40 },
    { x: 60, y: 30 },
    { x: 60, y: 50 },
    { x: 90, y: 25 },
    { x: 90, y: 40 },
    { x: 90, y: 55 },
    { x: 120, y: 35 },
    { x: 120, y: 45 },
  ]

  // Draw connections with animated pulses
  for (let i = 0; i < 3; i++) {
    for (let j = 3; j < 6; j++) {
      ctx.beginPath()
      ctx.moveTo(nodes[i].x, nodes[i].y)
      ctx.lineTo(nodes[j].x, nodes[j].y)

      const pulse = Math.sin(time + i + j) * 0.5 + 0.5
      ctx.strokeStyle = `rgba(255, 0, 255, ${pulse})`
      ctx.stroke()
    }
  }

  // Draw nodes
  nodes.forEach((node, i) => {
    const glow = Math.sin(time + i * 0.5) * 0.3 + 0.7
    ctx.fillStyle = `rgba(255, 0, 255, ${glow})`
    ctx.beginPath()
    ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
    ctx.fill()
  })
}

function drawAIBrain(ctx, time) {
  ctx.strokeStyle = "#00ffff"
  ctx.lineWidth = 2

  // Draw brain outline
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2

  ctx.beginPath()
  ctx.ellipse(centerX, centerY, 40, 30, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Draw synapses
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const radius = 25 + Math.sin(time + i) * 5
    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    ctx.fillStyle = `rgba(0, 255, 255, ${Math.sin(time + i) * 0.5 + 0.5})`
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fill()

    // Draw connections to center
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(x, y)
    ctx.strokeStyle = `rgba(0, 255, 255, ${Math.sin(time + i) * 0.3 + 0.3})`
    ctx.stroke()
  }
}

function drawNetworkNodes(ctx, time) {
  ctx.strokeStyle = "#ffff00"
  ctx.lineWidth = 1
  ctx.fillStyle = "#ffff00"

  // Draw interconnected nodes representing professional network
  const networkNodes = []
  for (let i = 0; i < 6; i++) {
    networkNodes.push({
      x: 30 + (i % 3) * 40,
      y: 40 + Math.floor(i / 3) * 30,
      connections: [],
    })
  }

  // Create connections
  networkNodes.forEach((node, i) => {
    networkNodes.forEach((otherNode, j) => {
      if (i !== j && Math.random() > 0.6) {
        node.connections.push(j)
      }
    })
  })

  // Draw connections
  networkNodes.forEach((node, i) => {
    node.connections.forEach((connectionIndex) => {
      const targetNode = networkNodes[connectionIndex]
      const pulse = Math.sin(time + i + connectionIndex) * 0.4 + 0.6

      ctx.beginPath()
      ctx.moveTo(node.x, node.y)
      ctx.lineTo(targetNode.x, targetNode.y)
      ctx.strokeStyle = `rgba(255, 255, 0, ${pulse})`
      ctx.stroke()
    })
  })

  // Draw nodes
  networkNodes.forEach((node, i) => {
    const size = 3 + Math.sin(time + i) * 1
    const glow = Math.sin(time + i * 0.7) * 0.3 + 0.7

    ctx.fillStyle = `rgba(255, 255, 0, ${glow})`
    ctx.beginPath()
    ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
    ctx.fill()
  })
}

// Enhanced Sound Effects (Web Audio API)
let audioContext

function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  } catch (e) {
    console.log("Web Audio API not supported")
  }
}

function playBeep(frequency = 440, duration = 200, type = "square") {
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
  oscillator.type = type

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration / 1000)
}

// Add enhanced sound effects to buttons
function addSoundEffects() {
  const buttons = document.querySelectorAll(".nav-btn, .arcade-btn, .social-btn")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      playBeep(800, 100, "sine")
    })

    button.addEventListener("click", () => {
      playBeep(1200, 150, "square")
    })
  })
}

// Enhanced Matrix Rain Effect
function createMatrixRain() {
  const canvas = document.createElement("canvas")
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "-1"
  canvas.style.opacity = "0.1"
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  const chars = "01♥★✦◆"
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = []

  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ffff"
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  setInterval(drawMatrix, 35)
}

// Enhanced Power-up Effect
function createPowerUpEffect(element) {
  const powerUp = document.createElement("div")
  powerUp.style.position = "absolute"
  powerUp.style.top = "50%"
  powerUp.style.left = "50%"
  powerUp.style.transform = "translate(-50%, -50%)"
  powerUp.style.width = "100px"
  powerUp.style.height = "100px"
  powerUp.style.border = "3px solid #ffff00"
  powerUp.style.borderRadius = "50%"
  powerUp.style.boxShadow = "0 0 30px #ffff00"
  powerUp.style.pointerEvents = "none"
  powerUp.style.zIndex = "1000"
  powerUp.style.animation = "powerUpSpin 1s ease-out forwards"

  element.style.position = "relative"
  element.appendChild(powerUp)

  // Add sparkle effects
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createSparkle(element)
    }, i * 100)
  }

  setTimeout(() => {
    powerUp.remove()
  }, 1000)
}

// Create sparkle effect
function createSparkle(element) {
  const sparkle = document.createElement("div")
  sparkle.className = "sparkle"
  sparkle.textContent = "✨"
  sparkle.style.left = Math.random() * element.offsetWidth + "px"
  sparkle.style.top = Math.random() * element.offsetHeight + "px"

  element.appendChild(sparkle)

  setTimeout(() => {
    sparkle.remove()
  }, 1000)
}

// Enhanced typing effect for hero subtitle
function typeWriter() {
  const subtitle = document.querySelector(".hero-subtitle")
  const text = "FULL STACK DEVELOPER"
  let i = 0

  subtitle.style.animation = "none"
  subtitle.textContent = ""

  function type() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i)
      playBeep(600 + i * 20, 50, "sine") // Add typing sound
      i++
      setTimeout(type, 150)
    } else {
      subtitle.style.borderRight = "3px solid transparent"
    }
  }

  setTimeout(type, 4000)
}

// Special effects for Konami code
function createSpecialEffects() {
  // Create rainbow particles
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const particle = document.createElement("div")
      particle.style.position = "fixed"
      particle.style.left = Math.random() * window.innerWidth + "px"
      particle.style.top = Math.random() * window.innerHeight + "px"
      particle.style.width = "10px"
      particle.style.height = "10px"
      particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"
      particle.style.zIndex = "1001"
      particle.style.animation = "float 3s ease-out forwards"

      document.body.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 3000)
    }, i * 50)
  }
}

// Enhanced Easter Egg Functionality
let draggedButtons = []
let isDragging = false
const currentPhotoSlot = 0

function initEasterEgg() {
  const draggableButtons = document.querySelectorAll(".draggable-btn")
  const easterEggZone = document.getElementById("easterEggZone")

  draggableButtons.forEach((button) => {
    let startX, startY, currentX, currentY
    const originalParent = button.parentNode
    const originalNext = button.nextSibling

    button.addEventListener("mousedown", startDrag)
    button.addEventListener("touchstart", startDrag, { passive: false })

    function startDrag(e) {
      e.preventDefault()
      isDragging = true

      const rect = button.getBoundingClientRect()
      if (e.type === "mousedown") {
        startX = e.clientX - rect.left
        startY = e.clientY - rect.top
      } else {
        startX = e.touches[0].clientX - rect.left
        startY = e.touches[0].clientY - rect.top
      }

      button.classList.add("dragging")
      document.body.appendChild(button)

      document.addEventListener("mousemove", drag)
      document.addEventListener("touchmove", drag, { passive: false })
      document.addEventListener("mouseup", stopDrag)
      document.addEventListener("touchend", stopDrag)

      updateEasterEggZone()
      playBeep(800, 100)
    }

    function drag(e) {
      if (!isDragging) return
      e.preventDefault()

      if (e.type === "mousemove") {
        currentX = e.clientX - startX
        currentY = e.clientY - startY
      } else {
        currentX = e.touches[0].clientX - startX
        currentY = e.touches[0].clientY - startY
      }

      button.style.left = currentX + "px"
      button.style.top = currentY + "px"

      checkEasterEggCollision(button, e)
    }

    function stopDrag(e) {
      if (!isDragging) return
      isDragging = false

      document.removeEventListener("mousemove", drag)
      document.removeEventListener("touchmove", drag)
      document.removeEventListener("mouseup", stopDrag)
      document.removeEventListener("touchend", stopDrag)

      const rect = easterEggZone.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()

      if (isOverlapping(buttonRect, rect) && easterEggZone.classList.contains("ready")) {
        addToEasterEgg(button)
        playBeep(1200, 200)
      } else {
        button.classList.remove("dragging")
        button.style.position = ""
        button.style.left = ""
        button.style.top = ""
        originalParent.insertBefore(button, originalNext)
        playBeep(400, 100)
      }

      updateEasterEggZone()
    }
  })
}

function updateEasterEggZone() {
  const easterEggZone = document.getElementById("easterEggZone")
  const draggingButtons = document.querySelectorAll(".dragging")

  if (draggingButtons.length > 0) {
    easterEggZone.classList.add("ready")
  } else {
    easterEggZone.classList.remove("ready")
  }
}

function checkEasterEggCollision(button, e) {
  const easterEggZone = document.getElementById("easterEggZone")
  const rect = easterEggZone.getBoundingClientRect()
  const buttonRect = button.getBoundingClientRect()

  if (isOverlapping(buttonRect, rect)) {
    easterEggZone.style.borderColor = "#00ff00"
    easterEggZone.style.boxShadow = "0 0 20px #00ff00"
  } else {
    easterEggZone.style.borderColor = "var(--neon-pink)"
    easterEggZone.style.boxShadow = ""
  }
}

function addToEasterEgg(button) {
  const buttonType = button.getAttribute("data-btn")

  if (!draggedButtons.includes(buttonType)) {
    draggedButtons.push(buttonType)
    button.style.display = "none"
  }

  if (draggedButtons.includes("L") && draggedButtons.includes("M")) {
    activateEasterEgg()
  }
}

function activateEasterEgg() {
  const easterEggZone = document.getElementById("easterEggZone")
  easterEggZone.classList.add("activated")

  // Play activation sound
  playBeep(1500, 300, "sine")

  setTimeout(() => {
    showLovePage()
    startEnhancedHeartRain()
    createFloatingLoveElements()
  }, 500)
}

function showLovePage() {
  const lovePage = document.getElementById("lovePage")
  lovePage.classList.add("show")

  // Initialize love page functionality
  initMusicPlayer()
  initCustomMessage()
  initPowerUps()
}

// Enhanced Heart Rain with pixelated hearts
function startEnhancedHeartRain() {
  const heartRain = document.getElementById("heartRain")
  heartRain.style.display = "block"

  function createPixelHeart() {
    const heart = document.createElement("div")
    heart.className = "pixel-heart"
    heart.innerHTML = "♥"
    heart.style.left = Math.random() * 100 + "%"
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"
    heart.style.animationDelay = Math.random() + "s"

    // Random heart variations
    const heartTypes = ["♥", "💖", "💕", "💗", "❤️"]
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)]

    heartRain.appendChild(heart)

    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove()
      }
    }, 5000)
  }

  const heartInterval = setInterval(createPixelHeart, 150)
  heartRain.heartInterval = heartInterval
}

function createFloatingLoveElements() {
  const floatingLove = document.querySelector(".floating-love")
  const loveElements = ["💕", "✨", "🌟", "💖", "🦋", "🌸", "💫", "🌺", "⭐", "💝"]

  function createLoveElement() {
    const element = document.createElement("div")
    element.className = "love-element"
    element.innerHTML = loveElements[Math.floor(Math.random() * loveElements.length)]
    element.style.left = Math.random() * window.innerWidth + "px"
    element.style.top = Math.random() * window.innerHeight + "px"
    element.style.animationDelay = Math.random() * 5 + "s"

    floatingLove.appendChild(element)

    setTimeout(() => {
      if (element.parentNode) {
        element.remove()
      }
    }, 10000)
  }

  for (let i = 0; i < 20; i++) {
    setTimeout(createLoveElement, i * 300)
  }
}

// Music Player Functionality
function initMusicPlayer() {
  const songButtons = document.querySelectorAll(".song-btn")
  const playPauseBtn = document.getElementById("playPauseBtn")
  const muteBtn = document.getElementById("muteBtn")
  const volumeSlider = document.getElementById("volumeSlider")
  const audioPlayer = document.getElementById("audioPlayer")
  const currentSongDisplay = document.getElementById("currentSong")

  let isPlaying = false
  let isMuted = false

  // Song selection
  songButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const songName = button.getAttribute("data-song")

      // Remove active class from all buttons
      songButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Update display
      currentSongDisplay.textContent = button.textContent

      // For demo purposes, we'll use a placeholder audio
      audioPlayer.src = "/placeholder-audio.mp3"

      playBeep(800, 100)
    })
  })

  // Play/Pause functionality
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      audioPlayer.pause()
      playPauseBtn.textContent = "▶️"
      isPlaying = false
    } else {
      audioPlayer.play().catch((e) => console.log("Audio play failed:", e))
      playPauseBtn.textContent = "⏸️"
      isPlaying = true
    }
    playBeep(1000, 100)
  })

  // Mute functionality
  muteBtn.addEventListener("click", () => {
    if (isMuted) {
      audioPlayer.muted = false
      muteBtn.textContent = "🔊"
      isMuted = false
    } else {
      audioPlayer.muted = true
      muteBtn.textContent = "🔇"
      isMuted = true
    }
    playBeep(600, 100)
  })

  // Volume control
  volumeSlider.addEventListener("input", (e) => {
    audioPlayer.volume = e.target.value / 100
  })
}

// Custom Message Functionality
function initCustomMessage() {
  const customMessage = document.getElementById("customMessage")
  const saveButton = document.getElementById("saveMessage")
  const savedMessage = document.getElementById("savedMessage")

  saveButton.addEventListener("click", () => {
    const message = customMessage.value.trim()
    if (message) {
      savedMessage.textContent = message
      savedMessage.style.display = "block"

      // Add sparkle effect
      createSparkle(savedMessage)
      playBeep(1200, 200)

      // Save to localStorage
      localStorage.setItem("loveMessage", message)
    }
  })

  // Load saved message
  const saved = localStorage.getItem("loveMessage")
  if (saved) {
    customMessage.value = saved
    savedMessage.textContent = saved
    savedMessage.style.display = "block"
  }
}

// Photo Upload Functionality
function uploadPhoto(slotIndex) {
  const fileInput = document.getElementById("hiddenFileInput")

  fileInput.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photoSlots = document.querySelectorAll(".photo-slot")
        const slot = photoSlots[slotIndex]

        slot.style.backgroundImage = `url(${e.target.result})`
        slot.style.backgroundSize = "cover"
        slot.style.backgroundPosition = "center"
        slot.classList.add("filled")
        slot.style.border = "3px solid #00ff00"

        // Add sparkle effect
        createSparkle(slot)
        playBeep(1500, 200)

        // Save to localStorage
        localStorage.setItem(`photo_${slotIndex}`, e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  fileInput.click()
}

// Power-ups Functionality
function initPowerUps() {
  const powerUpButtons = document.querySelectorAll(".power-up-btn")

  powerUpButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const powerType = button.getAttribute("data-power")

      switch (powerType) {
        case "love":
          createLoveExplosion()
          break
        case "sparkle":
          createSparkleShower()
          break
        case "energy":
          createEnergyWave()
          break
        case "magic":
          createMagicEffect()
          break
      }

      playBeep(1800, 300, "sine")
    })
  })
}

function createLoveExplosion() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement("div")
      heart.style.position = "fixed"
      heart.style.left = "50%"
      heart.style.top = "50%"
      heart.style.transform = "translate(-50%, -50%)"
      heart.style.fontSize = "2rem"
      heart.style.color = "#ff0066"
      heart.style.pointerEvents = "none"
      heart.style.zIndex = "2002"
      heart.textContent = "💖"

      const angle = (i / 20) * Math.PI * 2
      const distance = 200
      const endX = Math.cos(angle) * distance
      const endY = Math.sin(angle) * distance

      heart.style.animation = `loveExplosion 2s ease-out forwards`
      heart.style.setProperty("--endX", endX + "px")
      heart.style.setProperty("--endY", endY + "px")

      document.body.appendChild(heart)

      setTimeout(() => heart.remove(), 2000)
    }, i * 50)
  }
}

function createSparkleShower() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createSparkle(document.body)
    }, i * 100)
  }
}

function createEnergyWave() {
  const wave = document.createElement("div")
  wave.style.position = "fixed"
  wave.style.top = "50%"
  wave.style.left = "50%"
  wave.style.transform = "translate(-50%, -50%)"
  wave.style.width = "50px"
  wave.style.height = "50px"
  wave.style.border = "3px solid #00ffff"
  wave.style.borderRadius = "50%"
  wave.style.pointerEvents = "none"
  wave.style.zIndex = "2002"
  wave.style.animation = "energyWave 2s ease-out forwards"

  document.body.appendChild(wave)

  setTimeout(() => wave.remove(), 2000)
}

function createMagicEffect() {
  const colors = ["#ff00ff", "#00ffff", "#ffff00", "#00ff00", "#ff0066"]

  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const magic = document.createElement("div")
      magic.style.position = "fixed"
      magic.style.left = Math.random() * window.innerWidth + "px"
      magic.style.top = Math.random() * window.innerHeight + "px"
      magic.style.fontSize = "2rem"
      magic.style.color = colors[Math.floor(Math.random() * colors.length)]
      magic.style.pointerEvents = "none"
      magic.style.zIndex = "2002"
      magic.textContent = "✨"
      magic.style.animation = "magicTwinkle 3s ease-out forwards"

      document.body.appendChild(magic)

      setTimeout(() => magic.remove(), 3000)
    }, i * 200)
  }
}

function closeLovePage() {
  const lovePage = document.getElementById("lovePage")
  const heartRain = document.getElementById("heartRain")

  if (lovePage) {
    lovePage.classList.remove("show")
  }

  if (heartRain) {
    clearInterval(heartRain.heartInterval)
    heartRain.style.display = "none"
  }

  // Clear floating elements
  const floatingElements = document.querySelectorAll(".love-element")
  floatingElements.forEach((element) => element.remove())

  // Reset Easter egg
  draggedButtons = []
  const hiddenButtons = document.querySelectorAll('.draggable-btn[style*="display: none"]')
  hiddenButtons.forEach((button) => {
    button.style.display = ""
    button.classList.remove("dragging")
    button.style.position = ""
    button.style.left = ""
    button.style.top = ""
  })

  const easterEggZone = document.getElementById("easterEggZone")
  easterEggZone.classList.remove("ready", "activated")

  playBeep(800, 200)
}

function isOverlapping(rect1, rect2) {
  return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)
}

// Load saved photos on page load
function loadSavedPhotos() {
  for (let i = 0; i < 6; i++) {
    const saved = localStorage.getItem(`photo_${i}`)
    if (saved) {
      const photoSlots = document.querySelectorAll(".photo-slot")
      const slot = photoSlots[i]

      slot.style.backgroundImage = `url(${saved})`
      slot.style.backgroundSize = "cover"
      slot.style.backgroundPosition = "center"
      slot.classList.add("filled")
      slot.style.border = "3px solid #00ff00"
    }
  }
}

// Add CSS animations for new effects
const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
    @keyframes loveExplosion {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0); opacity: 0; }
    }
    
    @keyframes energyWave {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
    }
    
    @keyframes magicTwinkle {
        0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
        50% { transform: scale(2) rotate(180deg); opacity: 1; }
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`
document.head.appendChild(additionalStyles)

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  hideLoadingScreen()
  createParticles()
  initSmoothScrolling()
  addGlitchEffect()
  loadSavedPhotos()

  // Initialize audio on first user interaction
  document.addEventListener(
    "click",
    () => {
      if (!audioContext) {
        initAudio()
        addSoundEffects()
      }
    },
    { once: true },
  )

  // Initialize project screens after a short delay
  setTimeout(() => {
    initProjectScreens()
  }, 1000)

  // Create matrix rain effect
  createMatrixRain()

  // Add power-up effects to skills
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((skill) => {
    skill.addEventListener("click", () => {
      createPowerUpEffect(skill)
      playBeep(1500, 200)
    })
  })

  // Add hover effects to project cabinets
  const projectCabinets = document.querySelectorAll(".project-cabinet")
  projectCabinets.forEach((cabinet) => {
    cabinet.addEventListener("mouseenter", () => {
      playBeep(600, 100)
    })
  })

  // Initialize Easter egg
  initEasterEgg()

  // Add close functionality to love page
  document.querySelector(".close-love").addEventListener("click", closeLovePage)
})

// Initialize typing effect and Easter egg
window.addEventListener("load", () => {
  typeWriter()
})
