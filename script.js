// === Typewriter with blinking cursor and smooth fade ===
const message = `Happy Birthday Vaishnavi ❤️
On this special day, I just want you to know how much you mean to me.
Here’s to more memories, more smiles, and more reasons to celebrate you. ✨`;

const cursor = document.getElementById('cursor');
const typewriterSpan = document.getElementById('typewriter');
const typeWriterContainer = document.getElementById('typewriter-container');
const sliderContainer = document.getElementById('slider-container');
const gallery = document.getElementById('gallery');
const caption = document.getElementById('caption');
const bgMusic = document.getElementById('bg-music');

let i = 0;
const speed = 60;

function typeWriter() {
  if (i < message.length) {
    typewriterSpan.innerHTML += (message.charAt(i) === "\n" ? "<br>" : message.charAt(i));
    i++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(() => {
      fadeOutTypewriter();
    }, 1300);
  }
}

function fadeOutTypewriter() {
  typewriterSpan.classList.add('fade-out');
  cursor.classList.add('fade-out');
  typeWriterContainer.classList.add('fade-out');

  setTimeout(() => {
    typeWriterContainer.style.display = 'none';
    startSlider();
  }, 1000);
}

// === Gallery Setup ===
const images = [
  "assets/img1.jpg",
  "assets/img2.jpg",
  "assets/img3.jpg",
  "assets/img4.jpg",
  "assets/img5.jpg",
  "assets/img6.jpg",
  "assets/img7.jpg",
  "assets/img8.jpg",
  "assets/img9.jpg"
];

const captions = [
  "The beginning of many wonderful moments",
  "Never knew you'd become close to my heart.",
  "The resting face of a beautiful soul.",
  "Starting a year of adventures and fun.",
  "The forever favorite picture.",
  "Adventures that will never be forgotten.",
  "Sending you home with a heart full of joy.",
  "Coming back to where it all began.",
  "Up's and downs, stood the same."
];

//const dates
const dates = [
  "21 September 2024",
  "4 October 2024",
  "21 December 2024",
  "31 December 2024",
  "10 January 2025",
  "21 March 2025",
  "27 March 2025",
  "26 April 2025",
  "12 July 2025"
];
let currentIndex = 2; // Start focusing on the third picture by default
let autoSlideInterval;

// Create gallery elements and set events
function createGallery() {
  gallery.innerHTML = "";
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'gallery-img' + (idx === currentIndex ? ' active' : '');
    img.onclick = () => {
      setActiveImage(idx);
      resetAutoSlide();
    }
    gallery.appendChild(img);
  });
  updateCaption(currentIndex);
  scrollToActive();
}

// Set active image by index
function setActiveImage(index) {
  if (index < 0 || index >= images.length) return;
  currentIndex = index;
  const imgs = document.querySelectorAll('.gallery-img');
  imgs.forEach(img => img.classList.remove('active'));
  imgs[currentIndex].classList.add('active');
  updateCaption(currentIndex);
  scrollToActive();
}

// Update caption text
function updateCaption(index) {
  caption.textContent = captions[index] || "";
  caption.innerHTML = `<strong>${dates[index]}</strong><br>${captions[index]}`;

}

// Scroll gallery smoothly to active image
function scrollToActive() {
  const imgs = document.querySelectorAll('.gallery-img');
  const activeImg = imgs[currentIndex];
  const galleryRect = gallery.getBoundingClientRect();
  const activeRect = activeImg.getBoundingClientRect();
  const scrollLeft = gallery.scrollLeft;
  // Calculate offset to center active image
  const targetScrollLeft = scrollLeft + (activeRect.left - galleryRect.left) - (galleryRect.width / 2 - activeRect.width / 2);
  gallery.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
}

// Auto slide images every 4 seconds
function autoSlide() {
  let nextIndex = (currentIndex + 1) % images.length;
  setActiveImage(nextIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoSlide, 4000);
}

// Start the slider view
function startSlider() {
  sliderContainer.style.display = 'flex';
  createGallery();
  // startConfetti();

  bgMusic.volume = 0.12;
  bgMusic.play();
  resetAutoSlide();

  // Pause auto sliding on hover
  gallery.onmouseenter = () => clearInterval(autoSlideInterval);
  gallery.onmouseleave = () => resetAutoSlide();

  // Enable zoom on active image click
  gallery.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-img')) {
      if (e.target.classList.contains('active')) {
        openZoom(e.target.src);
      } else {
        setActiveImage(Array.from(gallery.children).indexOf(e.target));
        resetAutoSlide();
      }
    }
  });
}

// === Confetti Animation ===
// const confettiWrapper = document.getElementById('confetti-wrapper');
// const confettiColors = ['#FFD700', '#FFA500', '#FF4500', '#FFFF00', '#FFFACD'];

// function createConfettiPiece() {
//   const confetti = document.createElement('div');
//   confetti.classList.add('confetti');
//   confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
//   confetti.style.left = Math.random() * window.innerWidth + 'px';
//   confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
//   confetti.style.width = confetti.style.height = Math.random() * 8 + 8 + 'px';
//   confettiWrapper.appendChild(confetti);

//   setTimeout(() => {
//     confetti.remove();
//   }, 6000);
// }

// function startConfetti() {
//   setInterval(createConfettiPiece, 200);
// }

// Zoom overlay
// let zoomOverlay;
// function openZoom(src) {
//   if(zoomOverlay) return; // prevent multiple overlays
//   zoomOverlay = document.createElement('div');
//   zoomOverlay.id = 'zoom-overlay';
//   zoomOverlay.innerHTML = `<img src="${src}" alt="Zoomed Image"><span id="close-zoom">&times;</span>`;
//   document.body.appendChild(zoomOverlay);
//   // Close Zoom
//   zoomOverlay.querySelector('#close-zoom').onclick = closeZoom;
//   zoomOverlay.onclick = (e) => {
//     if (e.target === zoomOverlay) closeZoom();
//   }
// }

function closeZoom() {
  if(zoomOverlay) {
    zoomOverlay.remove();
    zoomOverlay = null;
  }
}

// === Initialize typewriter on window load ===
window.onload = typeWriter;
