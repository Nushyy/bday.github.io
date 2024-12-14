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
  const numLetters = 15; // Letters in the burst
  const numSparkles = 50; // Sparkles in the burst for more dramatic effect

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
  const distance = anime.random(100, 200); // Increased distance for more dramatic spread
  const duration = anime.random(1200, 2000); // Longer duration for the dramatic effect
  const fallDistance = anime.random(20, 80); // Larger fall effect for realism
  const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;

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
      translateY: `+=${fallDistance}px`, // Larger gravity effect
      opacity: [0.9, 0],
      easing: "easeInCubic",
      duration: duration / 2
    });
}

// Play chime sound
function playChimeSound() {
  const chime = new Audio('chime1.mp3'); // Add your chime sound file here
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
