// Enhanced Portfolio Interactive Features with Emoji Support - FIXED NAVIGATION
class EnhancedPortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupSkillBars();
    this.setupCounters();
    this.setupContactForm();
    this.setupMobileMenu();
    this.setupParticleEffects();
    this.setupColorTransitions();
    this.addScrollToTop();
  }

  // Fixed Navigation Setup
  setupNavigation() {
    const nav = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav__link');
    const heroButtons = document.querySelectorAll('.hero__btn');
    
    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const target = document.getElementById(targetId);
          
          if (target) {
            const headerHeight = nav.offsetHeight || 80;
            const offsetTop = target.offsetTop - headerHeight;
            
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            this.closeMobileMenu();
            
            // Add ripple effect
            this.createRippleEffect(link, e);
          }
        }
      });
    });

    // Hero button navigation with enhanced effects - FIXED
    heroButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const href = button.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const target = document.getElementById(targetId);
          
          if (target) {
            const headerHeight = nav.offsetHeight || 80;
            const offsetTop = target.offsetTop - headerHeight;
            
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
            
            // Add button press effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
              button.style.transform = '';
            }, 150);
          }
        }
      });
    });

    // Enhanced header scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('header--scrolled');
      } else {
        nav.classList.remove('header--scrolled');
      }
      
      // Update progress indicator
      this.updateScrollProgress();
    });

    // Active link highlighting with smooth transitions
    window.addEventListener('scroll', () => {
      this.updateActiveNavLink();
    });

    // Add scroll progress indicator
    this.createScrollProgress();
  }

  createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #00D4FF, #8B5CF6);
      z-index: 1001;
      transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
  }

  updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min((window.scrollY / scrollHeight) * 100, 100);
      scrollProgress.style.width = scrolled + '%';
    }
  }

  createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(0, 212, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav__link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav__link').forEach(link => {
          link.classList.remove('nav__link--active');
        });
        if (navLink) {
          navLink.classList.add('nav__link--active');
          
          // Add glow effect to active link
          navLink.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.8)';
          setTimeout(() => {
            navLink.style.textShadow = '';
          }, 1000);
        }
      }
    });
  }

  // Enhanced Mobile Menu Setup
  setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navToggle.classList.toggle('nav__toggle--active');
        navMenu.classList.toggle('nav__menu--active');
        
        // Add haptic feedback simulation
        this.simulateHaptic();
      });

      // Close menu when clicking on a link with enhanced animation
      document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
          setTimeout(() => {
            this.closeMobileMenu();
          }, 300);
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
  }

  closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.classList.remove('nav__toggle--active');
      navMenu.classList.remove('nav__menu--active');
    }
  }

  simulateHaptic() {
    // Simulate haptic feedback with a quick vibration-like animation
    document.body.style.transform = 'translateX(1px)';
    setTimeout(() => {
      document.body.style.transform = 'translateX(-1px)';
      setTimeout(() => {
        document.body.style.transform = '';
      }, 50);
    }, 50);
  }

  // Enhanced Scroll Effects Setup
  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Add stagger effect for child elements
          const children = entry.target.querySelectorAll('.project__card, .achievement__card, .about__stat, .skill');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
          
          // Trigger skill bars animation when skills section is visible
          if (entry.target.id === 'skills') {
            setTimeout(() => this.animateSkillBars(), 500);
          }
          
          // Trigger counters animation when about section is visible
          if (entry.target.id === 'about') {
            setTimeout(() => this.animateCounters(), 300);
          }
          
          // Add section-specific effects
          this.addSectionEffects(entry.target);
        }
      });
    }, observerOptions);

    // Add animate-on-scroll class to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('animate-on-scroll');
      observer.observe(section);
    });

    // Add animation to cards and other elements
    const animatedElements = document.querySelectorAll('.project__card, .achievement__card, .about__stat, .skill');
    animatedElements.forEach((element, index) => {
      element.classList.add('animate-on-scroll');
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease-out';
      element.style.animationDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
  }

  addSectionEffects(section) {
    const sectionId = section.getAttribute('id');
    
    switch (sectionId) {
      case 'hero':
        this.animateHeroElements();
        break;
      case 'about':
        this.animateAboutSection();
        break;
      case 'projects':
        this.animateProjectCards();
        break;
      case 'contact':
        this.animateContactForm();
        break;
    }
  }

  animateHeroElements() {
    const heroParticles = document.querySelectorAll('.hero__particle');
    heroParticles.forEach((particle, index) => {
      particle.style.animation = `float ${6 + index}s ease-in-out infinite`;
      particle.style.animationDelay = `${index * 2}s`;
    });
  }

  animateAboutSection() {
    const avatar = document.querySelector('.about__avatar');
    if (avatar) {
      avatar.style.animation = 'float 8s ease-in-out infinite';
    }
  }

  animateProjectCards() {
    const projectCards = document.querySelectorAll('.project__card');
    projectCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateY(5deg)';
        card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  animateContactForm() {
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => {
      field.addEventListener('focus', () => {
        field.parentElement.style.transform = 'scale(1.02)';
        field.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
      });
      
      field.addEventListener('blur', () => {
        field.parentElement.style.transform = '';
        field.style.boxShadow = '';
      });
    });
  }

  // Enhanced Animations Setup
  setupAnimations() {
    // Add CSS for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes colorShift {
        0%, 100% { filter: hue-rotate(0deg); }
        33% { filter: hue-rotate(120deg); }
        66% { filter: hue-rotate(240deg); }
      }
      
      .emoji-bounce {
        animation: bounce 2s infinite;
      }
      
      .gradient-text {
        background: linear-gradient(45deg, #00D4FF, #8B5CF6, #EC4899);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient-shift 3s ease infinite;
      }
      
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `;
    document.head.appendChild(style);

    // Add enhanced hover effects to skill tags
    const skillTags = document.querySelectorAll('.skills__tag');
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px) scale(1.05)';
        tag.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.4)';
        tag.style.animation = 'colorShift 2s infinite';
      });

      tag.addEventListener('mouseleave', () => {
        tag.style.transform = '';
        tag.style.boxShadow = '';
        tag.style.animation = '';
      });
    });

    // Add emoji bounce effects
    const emojiElements = document.querySelectorAll('.achievement__icon, .project__placeholder');
    emojiElements.forEach(emoji => {
      emoji.addEventListener('mouseenter', () => {
        emoji.classList.add('emoji-bounce');
      });
      
      emoji.addEventListener('animationend', () => {
        emoji.classList.remove('emoji-bounce');
      });
    });

    // Add gradient text effects to titles
    const titles = document.querySelectorAll('.hero__name, .section__title');
    titles.forEach(title => {
      title.addEventListener('mouseenter', () => {
        title.classList.add('gradient-text');
      });
      
      title.addEventListener('mouseleave', () => {
        setTimeout(() => {
          title.classList.remove('gradient-text');
        }, 3000);
      });
    });
  }

  // Enhanced Skill Bars Animation
  setupSkillBars() {
    this.skillBarsAnimated = false;
  }

  animateSkillBars() {
    if (this.skillBarsAnimated) return;
    
    const skillBars = document.querySelectorAll('.skill__progress');
    skillBars.forEach((bar, index) => {
      const width = bar.dataset.width;
      const skill = bar.closest('.skill');
      
      // Add glow effect
      skill.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        bar.style.width = width + '%';
        
        // Add completion effect
        setTimeout(() => {
          bar.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.8)';
          setTimeout(() => {
            bar.style.boxShadow = '';
          }, 1000);
        }, 1500);
        
      }, index * 150);
    });
    
    this.skillBarsAnimated = true;
  }

  // Enhanced Counter Animation
  setupCounters() {
    this.countersAnimated = false;
  }

  animateCounters() {
    if (this.countersAnimated) return;
    
    const counters = document.querySelectorAll('.about__stat-number');
    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const increment = target / 60; // Slower animation
      let current = 0;
      
      const stat = counter.closest('.about__stat');

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          if (target === 8.43) {
            counter.textContent = Math.min(current, target).toFixed(2);
          } else {
            counter.textContent = Math.floor(Math.min(current, target));
          }
          
          // Add pulsing effect during animation
          stat.style.transform = `scale(${1 + (Math.sin(current * 0.5) * 0.02)})`;
          
          requestAnimationFrame(updateCounter);
        } else {
          if (target === 8.43) {
            counter.textContent = target.toFixed(2);
          } else {
            counter.textContent = target;
          }
          
          // Final scale reset
          stat.style.transform = 'scale(1)';
          
          // Add completion glow
          stat.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
          setTimeout(() => {
            stat.style.boxShadow = '';
          }, 1500);
        }
      };

      setTimeout(() => updateCounter(), Math.random() * 500);
    });
    
    this.countersAnimated = true;
  }

  // Enhanced Contact Form Setup
  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });

    // Enhanced form validation on input
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldError(input);
        
        // Add typing effect
        input.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        setTimeout(() => {
          input.style.borderColor = '';
        }, 200);
      });

      // Add focus effects
      input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.02)';
        input.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.3)';
      });

      input.addEventListener('blur', () => {
        input.style.transform = '';
        input.style.boxShadow = '';
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styles
    this.clearFieldError(field);

    // Required field validation
    if (!value) {
      isValid = false;
      errorMessage = '⚠️ This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = '📧 Please enter a valid email address';
      }
    }

    // Display error if validation fails
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      // Show success indicator
      field.style.borderColor = '#10B981';
      setTimeout(() => {
        field.style.borderColor = '';
      }, 2000);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.style.borderColor = '#FF5459';
    field.style.animation = 'shake 0.5s';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    // Add error message with emoji
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
      color: #FF5459;
      font-size: 12px;
      margin-top: 4px;
      animation: fadeIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    
    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    if (!document.querySelector('#shake-style')) {
      shakeStyle.id = 'shake-style';
      document.head.appendChild(shakeStyle);
    }
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    field.style.animation = '';
    const errorMessage = field.parentNode.querySelector('.field-error');
    if (errorMessage) {
      errorMessage.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        errorMessage.remove();
      }, 300);
    }
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const formInputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    // Validate all fields
    formInputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showFormMessage('❌ Please correct the errors above.', 'error');
      return;
    }

    // Enhanced form submission animation
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.innerHTML = `
      <span style="animation: spin 1s linear infinite;">⏳</span> 
      Sending...
    `;
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    if (!document.querySelector('#spin-style')) {
      spinStyle.id = 'spin-style';
      document.head.appendChild(spinStyle);
    }

    // Simulate API call delay with progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 20;
      if (progress <= 100) {
        submitButton.innerHTML = `
          <span style="animation: spin 1s linear infinite;">⏳</span> 
          Sending... ${progress}%
        `;
      }
    }, 400);

    setTimeout(() => {
      clearInterval(progressInterval);
      this.showFormMessage('✅ Thank you for your message! I\'ll get back to you soon. 🚀', 'success');
      form.reset();
      
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      submitButton.style.opacity = '';
      
      // Add success animation to form
      form.style.animation = 'pulse 0.5s ease';
      setTimeout(() => {
        form.style.animation = '';
      }, 500);
    }, 2000);
  }

  showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create enhanced message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.cssText = `
      padding: 16px;
      border-radius: 8px;
      margin-top: 16px;
      text-align: center;
      animation: slideIn 0.5s ease;
      font-weight: 500;
    `;
    messageDiv.innerHTML = message;

    if (type === 'success') {
      messageDiv.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      messageDiv.style.color = '#10B981';
      messageDiv.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    } else {
      messageDiv.style.backgroundColor = 'rgba(255, 84, 89, 0.1)';
      messageDiv.style.color = '#FF5459';
      messageDiv.style.border = '1px solid rgba(255, 84, 89, 0.3)';
    }

    // Add slide animation
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
      @keyframes slideIn {
        from { 
          opacity: 0; 
          transform: translateY(-20px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
    `;
    if (!document.querySelector('#slide-style')) {
      slideStyle.id = 'slide-style';
      document.head.appendChild(slideStyle);
    }

    // Add message after form
    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);

    // Remove message after 5 seconds with fade out
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
          messageDiv.remove();
        }, 500);
      }
    }, 5000);
  }

  // Enhanced Particle Effects
  setupParticleEffects() {
    this.createFloatingParticles();
    this.setupMouseTrail();
  }

  createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    // Create floating emoji particles
    const emojis = ['✨', '🌟', '⭐', '💫', '🚀', '💻', '⚡', '🎯'];
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 15}px;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: floatParticle ${Math.random() * 20 + 20}s linear infinite;
        left: ${Math.random() * 100}%;
        top: 100%;
        pointer-events: none;
      `;
      
      particleContainer.appendChild(particle);
    }

    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    if (!document.querySelector('#particle-style')) {
      particleStyle.id = 'particle-style';
      document.head.appendChild(particleStyle);
    }
  }

  setupMouseTrail() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    this.mouseTrail = [];
    const maxTrailLength = 10;

    document.addEventListener('mousemove', (e) => {
      this.mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      });

      if (this.mouseTrail.length > maxTrailLength) {
        this.mouseTrail.shift();
      }

      this.updateMouseTrail();
    });
  }

  updateMouseTrail() {
    // Remove old trail elements
    document.querySelectorAll('.mouse-trail').forEach(el => el.remove());

    // Create new trail elements
    if (this.mouseTrail && this.mouseTrail.length > 0) {
      this.mouseTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
          position: fixed;
          width: ${10 - index}px;
          height: ${10 - index}px;
          background: radial-gradient(circle, rgba(0, 212, 255, ${0.8 - index * 0.08}), transparent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          left: ${point.x}px;
          top: ${point.y}px;
          transform: translate(-50%, -50%);
          animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
      });
    }

    // Add trail animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
      @keyframes trailFade {
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
      }
    `;
    if (!document.querySelector('#trail-style')) {
      trailStyle.id = 'trail-style';
      document.head.appendChild(trailStyle);
    }
  }

  // Enhanced Color Transitions
  setupColorTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      section.addEventListener('mouseenter', () => {
        this.addSectionGlow(section);
      });
      
      section.addEventListener('mouseleave', () => {
        this.removeSectionGlow(section);
      });
    });
  }

  addSectionGlow(section) {
    const sectionId = section.getAttribute('id');
    const glowColors = {
      'hero': 'rgba(0, 212, 255, 0.1)',
      'about': 'rgba(139, 92, 246, 0.1)',
      'skills': 'rgba(236, 72, 153, 0.1)',
      'projects': 'rgba(16, 185, 129, 0.1)',
      'experience': 'rgba(245, 158, 11, 0.1)',
      'contact': 'rgba(239, 68, 68, 0.1)'
    };
    
    section.style.boxShadow = `inset 0 0 100px ${glowColors[sectionId] || 'rgba(0, 212, 255, 0.1)'}`;
    section.style.transition = 'box-shadow 0.5s ease';
  }

  removeSectionGlow(section) {
    section.style.boxShadow = '';
  }

  // Enhanced Scroll to Top
  addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '🚀';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #00D4FF, #8B5CF6);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 24px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
      animation: float 3s ease-in-out infinite;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
        scrollBtn.style.transform = 'scale(1)';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
        scrollBtn.style.transform = 'scale(0.8)';
      }
    });

    scrollBtn.addEventListener('click', () => {
      // Add rocket launch effect
      scrollBtn.innerHTML = '🚀';
      scrollBtn.style.animation = 'rocketLaunch 0.5s ease';
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        scrollBtn.style.animation = 'float 3s ease-in-out infinite';
      }, 500);
    });

    // Add rocket launch animation
    const rocketStyle = document.createElement('style');
    rocketStyle.textContent = `
      @keyframes rocketLaunch {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
      }
    `;
    if (!document.querySelector('#rocket-style')) {
      rocketStyle.id = 'rocket-style';
      document.head.appendChild(rocketStyle);
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize enhanced portfolio app
  const app = new EnhancedPortfolioApp();

  // Add loading animation with emoji
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  // Show loading message
  const loader = document.createElement('div');
  loader.innerHTML = '🚀 Loading...';
  loader.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    font-weight: bold;
    background: linear-gradient(45deg, #00D4FF, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    z-index: 10000;
    animation: pulse 1s infinite;
  `;
  document.body.appendChild(loader);
  
  setTimeout(() => {
    document.body.style.opacity = '1';
    loader.remove();
  }, 1000);

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
    
    // Add fun Easter egg for arrow keys
    if (e.key === 'ArrowUp') {
      document.body.style.animation = 'bounce 0.5s ease';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 500);
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });

  // Add celebration effect for GitHub link clicks
  const githubLinks = document.querySelectorAll('a[href*="github.com/Asha23442"]');
  githubLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Create celebration particles
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '⭐';
        particle.style.cssText = `
          position: fixed;
          left: 50%;
          top: 50%;
          font-size: 20px;
          pointer-events: none;
          z-index: 9999;
          animation: celebrate${i} 2s ease-out forwards;
        `;
        document.body.appendChild(particle);
        
        // Add celebration animation
        const celebrateStyle = document.createElement('style');
        celebrateStyle.textContent = `
          @keyframes celebrate${i} {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 1;
            }
            100% {
              transform: translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) scale(1);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(celebrateStyle);
        
        setTimeout(() => {
          particle.remove();
          celebrateStyle.remove();
        }, 2000);
      }
    });
  });

  // Performance optimization: Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Add fun console messages
  console.log('🚀 Asha H Portfolio - Enhanced with emojis and vibrant colors! ✨');
  console.log('💻 Built with passion and lots of coffee! ☕');
  console.log('🌟 Check out the GitHub: https://github.com/Asha23442');
  console.log('🎯 Navigation fixed and ready to rock! 🎸');
});