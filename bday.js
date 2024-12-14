// Define more vibrant colors
const colors = [
  "#44624a",
  "#89CFF0",
  "#6495ED",
  "#F4C2C2",
  "#E6E6FA",
  "#98FB98"
];
const letters = "SHERAP"; // Define the message you want
let letterIndex = 0; // Keep track of the current index

// Get the next letter from the message
function getRandomLetter() {
  const letter = letters.charAt(letterIndex); // Get the current letter
  letterIndex = (letterIndex + 1) % letters.length; // Move to the next letter, loop back at the end
  return letter;
}

// Create a firework at the click location
function createFirework(x, y) {
  const launchHeight =
    Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
  const projectile = document.createElement("div");
  projectile.classList.add("projectile");
  document.body.appendChild(projectile);
  projectile.style.left = `${x}px`;
  projectile.style.top = `${y}px`;

  anime({
    targets: projectile,
    translateY: -launchHeight,
    duration: 1200,
    easing: "easeOutQuad",
    complete: () => {
      projectile.remove();
      createBurst(x, y - launchHeight);
    }
  });

  // Play chime sound on click
  playChimeSound();
}

// Create a burst of particles
function createBurst(x, y) {
  const numLetters = 10; // Letters in the burst
  const numSparkles = 30; // Sparkles in the burst

  // Letters
  for (let i = 0; i < numLetters; i++) {
    createParticle(x, y, false);
  }

  // Sparkles
  for (let i = 0; i < numSparkles; i++) {
    createParticle(x, y, true);
  }
}

// Create a single particle (letter or sparkle)
function createParticle(x, y, isSparkle) {
  const el = document.createElement("div");
  el.classList.add(isSparkle ? "sparkle" : "particule");
  const instruction = document.querySelector('.instructions').style.display = 'none';

  if (!isSparkle) {
    el.textContent = getRandomLetter();
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
  } else {
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  animateParticle(el, isSparkle);
}

// Animate a particle
function animateParticle(el, isSparkle) {
  const angle = Math.random() * Math.PI * 2; // Random direction
  const distance = anime.random(25, 50); // Reduced distance for smaller spread
  const duration = anime.random(600, 1100); // Shorter duration
  const fallDistance = anime.random(5, 20); // Smaller fall effect
  const scale = isSparkle ? Math.random() * 0.3 + 0.2 : Math.random() * 0.8 + 0.3; // Reduced sizes

  anime
    .timeline({
      targets: el,
      easing: "easeOutCubic",
      duration: duration,
      complete: () => el.remove() // Remove element after animation
    })
    .add({
      translateX: Math.cos(angle) * distance,
      translateY: Math.sin(angle) * distance,
      scale: [0, scale],
      opacity: [1, 0.9]
    })
    .add({
      translateY: `+=${fallDistance}px`, // Smaller gravity effect
      opacity: [0.9, 0],
      easing: "easeInCubic",
      duration: duration / 2
    });
}

// Play chime sound
function playChimeSound() {
  const chime = document.getElementById('chime-sound');
  chime.currentTime = 0; // Reset to the start for consecutive clicks
  chime.play();
}

// Add click listener for firework creation
document.addEventListener("click", (e) => {
  createFirework(e.clientX, e.clientY);
});

// Automatically trigger a firework when the page loads
window.onload = function () {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  // Show instructions element before triggering the firework
  document.querySelector('.instructions').style.display = 'block';
  
  // Play chime sound and create the firework
  playChimeSound();
  
  createFirework(centerX, centerY);
};
