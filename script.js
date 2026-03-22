document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 3. Scarcity Timer For VIP spots
    // Start a timer logic specifically intended to push urgency
    let minutes = 14;
    let seconds = 59;
    const timerSpan = document.querySelector('#timer-text span');

    if (timerSpan) {
        let isFlashing = false;
        
        const countdownInterval = setInterval(() => {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }
            
            if (minutes < 0) {
                // Reset to keep urgency high
                minutes = 14; 
                seconds = 59;
            }

            const formatMin = minutes < 10 ? '0' + minutes : minutes;
            const formatSec = seconds < 10 ? '0' + seconds : seconds;
            timerSpan.textContent = `${formatMin}:${formatSec}`;
            
            // Pulse effect when below 5 minutes
            if (minutes < 5 && !isFlashing) {
                timerSpan.parentElement.style.animation = 'pulse 1s infinite';
                timerSpan.parentElement.style.color = '#ff0000';
                isFlashing = true;
            } else if (minutes >= 5 && isFlashing) {
                timerSpan.parentElement.style.animation = 'none';
                timerSpan.parentElement.style.color = 'var(--action-orange)';
                isFlashing = false;
            }
        }, 1000);
    }

    // 4. Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
