// Old Skool Theme Toggle for Approvideo Learning Hub

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    createThemeToggle();
    
    // Create retro elements that will show in oldskool mode
    createRetroElements();
    
    // Check if theme preference is stored
    checkThemePreference();
    
    // Listen for theme toggle clicks
    document.querySelector('.oldskool-theme-toggle').addEventListener('click', toggleTheme);
});

// Function to create the theme toggle button
function createThemeToggle() {
    const button = document.createElement('button');
    button.className = 'oldskool-theme-toggle';
    button.innerHTML = '<span class="modern-label">🕹️ Old Skool Mode</span><span class="oldskool-label" style="display: none;">🌐 Modern Mode</span>';
    
    // Add to header
    const headerRight = document.querySelector('.flex.items-center.space-x-6');
    headerRight.prepend(button);
}

// Function to create retro elements that will be shown in oldskool mode
function createRetroElements() {
    // Create screen overlay effect
    const screenOverlay = document.createElement('div');
    screenOverlay.className = 'screen-overlay';
    document.body.appendChild(screenOverlay);
    
    // Create UNDER CONSTRUCTION banner
    const constructionBanner = document.createElement('div');
    constructionBanner.className = 'construction-banner';
    constructionBanner.textContent = 'UNDER CONSTRUCTION';
    document.body.appendChild(constructionBanner);
    
    // Create visitor counter
    const visitorCounter = document.createElement('div');
    visitorCounter.className = 'visitor-counter';
    visitorCounter.innerHTML = 'YOU ARE VISITOR #<span class="count">000' + Math.floor(Math.random() * 1000) + '</span> SINCE 1996';
    
    // Create marquee text
    const marqueeContainer = document.createElement('div');
    marqueeContainer.className = 'marquee-container';
    marqueeContainer.innerHTML = '<div class="marquee-text">*** WELCOME TO APPROVIDEO LEARNING HUB *** SUSTAINABLE SOLUTIONS FOR A BETTER FUTURE *** NO FLASH REQUIRED *** BEST VIEWED WITH NETSCAPE NAVIGATOR ***</div>';
    
    // Create ASCII art logo
    const asciiArt = document.createElement('div');
    asciiArt.className = 'ascii-art';
    asciiArt.innerHTML = `
    /\\\\\\\\\\\\      /\\\\\\\\\\\\      /\\\\\\\\\\\\
   /\\\\///////     /\\\\\\\\\\\\\\\\\\\   /\\\\///////
  /\\\\/            /\\\\\\/////\\\\\\  /\\\\/
  /\\\\\\\\\\\\\\\\\\\     \\/\\\\\\ \\/\\\\\\ \\/\\\\\\\\\\\\\\\\\\\
  \\///////////\\\\   \\/\\\\\\ \\/\\\\\\ \\/\\\\////////
             /\\\\   \\/\\\\\\ \\/\\\\\\ \\/\\\\
    /\\\\\\\\\\\\\\\\/    \\/\\\\\\ \\/\\\\\\ \\/\\\\
    \\///////////      \\///  \\///  \\///
    `;
    
    // Add these elements after the header
    const contentContainer = document.querySelector('.max-w-7xl');
    contentContainer.insertBefore(visitorCounter, document.querySelector('nav'));
    contentContainer.insertBefore(marqueeContainer, document.querySelector('nav'));
    contentContainer.insertBefore(asciiArt, document.querySelector('nav'));
}

// Function to check if theme preference is stored in localStorage
function checkThemePreference() {
    const storedTheme = localStorage.getItem('approvideo-theme');
    if (storedTheme === 'oldskool') {
        applyOldSkoolTheme();
    }
}

// Function to toggle between themes
function toggleTheme() {
    if (document.documentElement.classList.contains('oldskool-theme')) {
        // Switch to modern theme
        document.documentElement.classList.remove('oldskool-theme');
        document.querySelector('.modern-label').style.display = 'inline';
        document.querySelector('.oldskool-label').style.display = 'none';
        localStorage.setItem('approvideo-theme', 'modern');
        
        // Play transition sound (modern to classic)
        playSound('modern');
    } else {
        // Switch to oldskool theme
        applyOldSkoolTheme();
        
        // Play transition sound (classic to retro)
        playSound('retro');
    }
}

// Function to apply the oldskool theme
function applyOldSkoolTheme() {
    document.documentElement.classList.add('oldskool-theme');
    document.querySelector('.modern-label').style.display = 'none';
    document.querySelector('.oldskool-label').style.display = 'inline';
    localStorage.setItem('approvideo-theme', 'oldskool');
}

// Function to create and play theme transition sounds
function playSound(type) {
    // Only create audio if Web Audio API is supported
    if (window.AudioContext || window.webkitAudioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        if (type === 'retro') {
            // Create "powering down" sound for modern to retro transition
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.5);
        } else {
            // Create "powering up" sound for retro to modern transition
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.4);
        }
    }
}

// Function to initialize old-school video modal overlay (use separately)
function initVideoModal() {
    // Create old-school video modal for embedded videos
    const videoModal = document.createElement('div');
    videoModal.className = 'oldskool-video-modal';
    videoModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">VIDEO PLAYER</div>
                <button class="modal-close">X</button>
            </div>
            <div class="video-container"></div>
            <div class="loading-text blink">* BUFFERING *</div>
        </div>
    `;
    document.body.appendChild(videoModal);
    
    // Add event listener for closing the modal
    videoModal.querySelector('.modal-close').addEventListener('click', function() {
        videoModal.classList.remove('visible');
        videoModal.querySelector('.video-container').innerHTML = '';
        videoModal.querySelector('.loading-text').style.display = 'block';
    });
}
