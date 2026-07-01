const slides = [...document.querySelectorAll('.slide')];
const progressBar = document.querySelector('#progressBar');
const pageIndicator = document.querySelector('#pageIndicator');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

function currentIndex() {
  const mid = window.scrollY + window.innerHeight / 2;
  let idx = 0;
  slides.forEach((slide, i) => {
    if (slide.offsetTop <= mid) idx = i;
  });
  return idx;
}

function updateUI() {
  const idx = currentIndex();
  const pct = ((idx + 1) / slides.length) * 100;
  progressBar.style.width = `${pct}%`;
  pageIndicator.textContent = `${String(idx + 1).padStart(2, '0')} / ${slides.length}`;
}

function goTo(index) {
  const target = slides[Math.max(0, Math.min(index, slides.length - 1))];
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

prevBtn.addEventListener('click', () => goTo(currentIndex() - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex() + 1));

window.addEventListener('keydown', (event) => {
  if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    goTo(currentIndex() + 1);
  }
  if (['ArrowUp', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    goTo(currentIndex() - 1);
  }
  if (event.key === 'Home') goTo(0);
  if (event.key === 'End') goTo(slides.length - 1);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.38 });
slides.forEach(slide => observer.observe(slide));

window.addEventListener('scroll', updateUI, { passive: true });
window.addEventListener('resize', updateUI);
updateUI();
slides[0]?.classList.add('is-visible');
