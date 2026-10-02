/**
 * NIRMAL PREM — 3-Second Cinematic Hero Slideshow Engine
 * Supports auto-play, smooth transitions, manual arrows, dots, swipe, keyboard
 */

class HeroSlider {
  constructor(sliderElement) {
    this.slider = sliderElement;
    if (!this.slider) return;

    this.slides = this.slider.querySelectorAll('.hero-slide');
    this.indicators = this.slider.querySelectorAll('.indicator-dot');
    this.prevBtn = this.slider.querySelector('.hero-prev');
    this.nextBtn = this.slider.querySelector('.hero-next');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.intervalTime = 3000; // Exact 3-second automatic transition
    this.timer = null;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    if (this.totalSlides <= 1) return;

    this.goToSlide(0);
    this.startAutoPlay();

    // Event Listeners: Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    // Indicator dots
    this.indicators.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    // Pause on hover
    this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.slider.addEventListener('mouseleave', () => this.startAutoPlay());

    // Touch / Swipe support for mobile
    this.slider.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.slider.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoPlay();
      }
    });
  }

  goToSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    this.indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      const progress = dot.querySelector('.indicator-progress');
      if (progress) {
        progress.style.width = i === index ? '100%' : '0%';
      }
    });

    this.currentIndex = index;
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.intervalTime);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderElem = document.querySelector('.hero-slider-section');
  if (sliderElem) {
    new HeroSlider(sliderElem);
  }
});
