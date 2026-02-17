/* ========================================
   10th NCJ Website - Main JavaScript
   ======================================== */

// ========================================
// Mobile Menu Toggle
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Get all navbar burgers
  const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add click event on each navbar burger
  navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the navbar burger and navbar menu
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
});

// ========================================
// Countdown Timer
// ========================================
function initCountdown() {
  // Set the target date for the festival (Update this date)
  const festivalDate = new Date('2026-02-28T00:00:00').getTime();

  const countdownElements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };

  // Update countdown every second
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = festivalDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown
    if (countdownElements.days) countdownElements.days.textContent = days;
    if (countdownElements.hours) countdownElements.hours.textContent = hours;
    if (countdownElements.minutes) countdownElements.minutes.textContent = minutes;
    if (countdownElements.seconds) countdownElements.seconds.textContent = seconds;

    // If countdown is finished
    if (distance < 0) {
      clearInterval(countdownInterval);
      if (countdownElements.days) countdownElements.days.textContent = '0';
      if (countdownElements.hours) countdownElements.hours.textContent = '0';
      if (countdownElements.minutes) countdownElements.minutes.textContent = '0';
      if (countdownElements.seconds) countdownElements.seconds.textContent = '0';
    }
  }, 1000);
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', initCountdown);

// ========================================
// Scroll Animations using IntersectionObserver
// ========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optional: Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ========================================
// Parallax Effect on Hero Artwork
// ========================================
function initParallax() {
  const heroArtwork = document.querySelector('.parallax-element');

  if (heroArtwork) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const moveX = (mouseX - 0.5) * 30; // Adjust multiplier for intensity
      const moveY = (mouseY - 0.5) * 30;

      heroArtwork.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }
}

// Initialize parallax when DOM is loaded
document.addEventListener('DOMContentLoaded', initParallax);

// ========================================
// FAQ Accordion
// ========================================
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = question.classList.contains('active');

      // Close all other FAQs
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });

      // Toggle current FAQ
      if (!isActive) {
        question.classList.add('active');
        answer.classList.add('active');
      }
    });
  });
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', initFAQ);

// ========================================
// Gallery Lightbox Modal
// ========================================
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.querySelector('.modal-close');
  const modalBackground = document.querySelector('.modal-background');

  if (galleryItems.length > 0 && modal) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const imgAlt = item.querySelector('img').alt;

        modalImage.src = imgSrc;
        modalImage.alt = imgAlt;
        modal.classList.add('is-active');
      });
    });

    // Close modal on close button click
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });
    }

    // Close modal on background click
    if (modalBackground) {
      modalBackground.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        modal.classList.remove('is-active');
      }
    });
  }
}

// Initialize gallery lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

// ========================================
// Contact Form Submission (Basic)
// ========================================
function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('contact-name').value;
      const institution = document.getElementById('contact-institution').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Here you would typically send the data to a backend
      console.log('Form submitted:', { name, institution, email, message });

      // Show success message
      alert('Thank you for your message! We will get back to you soon.');

      // Reset form
      contactForm.reset();
    });
  }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm);

// ========================================
// Duplicate Marquee Content for Seamless Loop
// ========================================
function initMarquee() {
  const marqueeContent = document.querySelector('.marquee-content');

  if (marqueeContent) {
    // Clone the content to create seamless loop
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentNode.appendChild(clone);
  }
}

// Initialize marquee when DOM is loaded
document.addEventListener('DOMContentLoaded', initMarquee);

// ========================================
// Copy to Clipboard Utility
// ========================================
function copyToClipboard(text, buttonElement) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      // Success feedback
      if (buttonElement) {
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';

        setTimeout(function () {
          buttonElement.innerHTML = originalHTML;
        }, 2000);
      }
    }).catch(function (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      fallbackCopyToClipboard(text);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyToClipboard(text);
  }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    alert('Copied: ' + text);
  } catch (err) {
    alert('Failed to copy. Please copy manually: ' + text);
  }

  document.body.removeChild(textArea);
}

// ========================================
// Image File Preview
// ========================================
function previewImage(inputElement, previewElement) {
  if (inputElement.files && inputElement.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      if (previewElement) {
        previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      }
    };

    reader.readAsDataURL(inputElement.files[0]);
  }
}

// ========================================
// Flush Notification System
// ========================================
const NotificationSystem = {
  container: null,

  init() {
    // Create container if it doesn't exist
    if (!document.getElementById('notification-container')) {
      this.container = document.createElement('div');
      this.container.id = 'notification-container';
      this.container.className = 'notification-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('notification-container');
    }
  },

  show(message, type = 'success', duration = 3000) {
    if (!this.container) this.init();

    // Icon mapping (FontAwesome)
    const icons = {
      success: 'fa-check-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-times-circle'
    };

    // Title mapping
    const titles = {
      success: 'Success',
      warning: 'Warning',
      error: 'Error'
    };

    const iconClass = icons[type] || icons.success;
    const titleText = titles[type] || 'Notification';

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `flush-alert is-${type}`;
    
    // Add content
    alert.innerHTML = `
      <div class="flush-alert-icon">
        <i class="fas ${iconClass}"></i>
      </div>
      <div class="flush-alert-content">
        <div class="flush-alert-title">${titleText}</div>
        <div class="flush-alert-message">${message}</div>
      </div>
    `;

    // Click to dismiss
    alert.addEventListener('click', () => {
      this.dismiss(alert);
    });

    // Auto Close
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(alert);
      }, duration);
    }

    // Append to container
    this.container.appendChild(alert);
  },

  dismiss(alert) {
    if (alert.classList.contains('is-hiding')) return;
    
    alert.classList.add('is-hiding');
    alert.addEventListener('transitionend', () => {
      if (alert.parentElement) {
        alert.remove();
      }
    });
  }
};

// Initialize Notification System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  NotificationSystem.init();
  
  // Expose to window for easy testing from HTML
  window.showNotification = (message, type, duration) => {
    NotificationSystem.show(message, type, duration);
  };
});

