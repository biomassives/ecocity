// Additional JavaScript functions for the Old Skool theme experience

// Function to create and initialize typewriter effect on elements with 'typewriter' class
function initTypewriterEffects() {
    if (!document.documentElement.classList.contains('oldskool-theme')) return;
    
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        let i = 0;
        const typeSpeed = 100; // milliseconds per character
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove the animation once complete to avoid permanent cursor
                element.classList.remove('typewriter');
            }
        }
        
        typeWriter();
    });
}

// Function to create an old-school dialog box
function createOldSkoolDialog(title, content, buttons) {
    // Only proceed if oldskool theme is active
    if (!document.documentElement.classList.contains('oldskool-theme')) {
        // Create a standard dialog with normal styling instead
        const standardConfirm = confirm(content);
        return standardConfirm;
    }
    
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        dialog.className = 'dialog-box';
        
        // Create header with title and close button
        const header = document.createElement('div');
        header.className = 'dialog-header';
        header.innerHTML = `
            <span>${title || 'Message'}</span>
            <button class="dialog-close">X</button>
        `;
        
        // Create content area
        const contentArea = document.createElement('div');
        contentArea.className = 'dialog-content';
        contentArea.innerHTML = content;
        
        // Create buttons area
        const buttonsArea = document.createElement('div');
        buttonsArea.className = 'dialog-buttons';
        
        // Default buttons if none provided
        if (!buttons || !buttons.length) {
            buttons = [{ text: 'OK', value: true }];
        }
        
        // Add the buttons
        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = 'dialog-button';
            btn.textContent = button.text;
            btn.addEventListener('click', () => {
                document.body.removeChild(dialog);
                resolve(button.value);
            });
            buttonsArea.appendChild(btn);
        });
        
        // Add close button functionality
        dialog.querySelector('.dialog-close').addEventListener('click', () => {
            document.body.removeChild(dialog);
            resolve(false);
        });
        
        // Assemble the dialog
        dialog.appendChild(header);
        dialog.appendChild(contentArea);
        dialog.appendChild(buttonsArea);
        
        // Add to the document
        document.body.appendChild(dialog);
        
        // Add retro sound effect
        playDialogSound();
    });
}

// Function to play an old computer dialog sound
function playDialogSound() {
    // Only play if Web Audio API is supported and oldskool theme is active
    if ((window.AudioContext || window.webkitAudioContext) && 
        document.documentElement.classList.contains('oldskool-theme')) {
        
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        // Create a series of beeps for dialog sound
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(830, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
    }
}

// Create a matrix-style "digital rain" effect in background
function createDigitalRain() {
    // Only proceed if oldskool theme is active
    if (!document.documentElement.classList.contains('oldskool-theme')) return;
    
    // Check if canvas is supported
    if (!document.createElement('canvas').getContext) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'digital-rain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-5';
    canvas.style.opacity = '0.05';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Matrix-like characters (could use more complex characters for authenticity)
    const characters = '01';
    
    // Column settings
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store current position of each column
    const drops = [];
    
    // Initialize the drops' y position
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Drawing animation
    function draw() {
        // Semi-transparent black to create fade effect as we draw new characters
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00'; // Matrix green
        ctx.font = fontSize + 'px Courier New';
        
        // Loop over drops
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move the drop down
            drops[i]++;
            
            // Reset if drop goes off screen or randomly to create varied starting positions
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }
    
    // Run animation at lower framerate to match old-school feel
    return setInterval(draw, 100);
}

// Function to create and setup an old-school guestbook form
function setupGuestbook() {
    // Only proceed if oldskool theme is active
    if (!document.documentElement.classList.contains('oldskool-theme')) return;
    
    // Get the guestbook button
    const guestbookBtn = document.querySelector('.guestbook button');
    if (!guestbookBtn) return;
    
    // Remove existing event listeners
    const newBtn = guestbookBtn.cloneNode(true);
    guestbookBtn.parentNode.replaceChild(newBtn, guestbookBtn);
    
    // Add click handler to show guestbook form
    newBtn.addEventListener('click', showGuestbookForm);
}

// Function to create and show the guestbook form
function showGuestbookForm() {
    // Create the form
    const formContainer = document.createElement('div');
    formContainer.className = 'guestbook-form';
    formContainer.innerHTML = `
        <h3>SIGN OUR GUESTBOOK</h3>
        <div class="form-row">
            <label for="gb-name">Your Name:</label>
            <input type="text" id="gb-name" maxlength="25">
        </div>
        <div class="form-row">
            <label for="gb-email">Email (not published):</label>
            <input type="email" id="gb-email">
        </div>
        <div class="form-row">
            <label for="gb-location">Location:</label>
            <input type="text" id="gb-location">
        </div>
        <div class="form-row">
            <label for="gb-message">Message:</label>
            <textarea id="gb-message" rows="4"></textarea>
        </div>
        <button class="sign-guestbook">SUBMIT</button>
    `;
    
    // Find a good place to insert it
    const targetElement = document.querySelector('.guestbook');
    if (targetElement) {
        targetElement.appendChild(formContainer);
    } else {
        // Fallback to appending to the main container
        document.querySelector('.max-w-7xl').appendChild(formContainer);
    }
    
    // Add submit handler
    const submitBtn = formContainer.querySelector('.sign-guestbook');
    submitBtn.addEventListener('click', function() {
        handleGuestbookSubmit(formContainer);
    });
    
    // Play a sound
    playDialogSound();
}

// Function to handle the guestbook form submission
function handleGuestbookSubmit(formContainer) {
    const nameInput = formContainer.querySelector('#gb-name');
    const messageInput = formContainer.querySelector('#gb-message');
    
    // Simple validation
    if (!nameInput.value.trim() || !messageInput.value.trim()) {
        createOldSkoolDialog('Error', 'Please enter at least your name and a message!', [
            { text: 'OK', value: true }
        ]);
        return;
    }
    
    // Show success message
    createOldSkoolDialog('Success!', 'Thank you for signing our guestbook! Your message will appear after moderator approval.', [
        { text: 'OK', value: true }
    ]).then(() => {
        // Remove the form
        formContainer.parentNode.removeChild(formContainer);
        
        // Update the last signed
        const guestbook = document.querySelector('.guestbook');
        const namePart = nameInput.value.length > 10 ? nameInput.value.substring(0, 10) + '...' : nameInput.value;
        
        // Get current date in old-school format
        const now = new Date();
        const date = `${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')}.${now.getFullYear()} @ ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Check if last signed element exists
        const lastSignedElement = guestbook.querySelector('p');
        if (lastSignedElement) {
            lastSignedElement.innerHTML = `[LAST SIGNED: ${namePart} - ${date}]`;
        } else {
            // Create new element
            const signedElement = document.createElement('p');
            signedElement.style.marginTop = '15px';
            signedElement.style.fontSize = '12px';
            signedElement.innerHTML = `[LAST SIGNED: ${namePart} - ${date}]`;
            guestbook.appendChild(signedElement);
        }
    });
}

// Function to create a WebRing navigation
function createWebRing() {
    // Only proceed if oldskool theme is active
    if (!document.documentElement.classList.contains('oldskool-theme')) return;
    
    const webRing = document.createElement('div');
    webRing.className = 'webring';
    webRing.innerHTML = `
        <div class="webring-title">SUSTAINABLE TECH WEBRING</div>
        <div class="webring-links">
            <a href="#">&lt;&lt; PREVIOUS</a> |
            <a href="#">RANDOM</a> |
            <a href="#">NEXT &gt;&gt;</a>
        </div>
    `;
    
    // Find a good place to insert it
    const targetElement = document.querySelector('.visitor-counter');
    if (targetElement) {
        targetElement.parentNode.insertBefore(webRing, targetElement.nextSibling);
    } else {
        // Fallback to appending to the main container
        document.querySelector('.max-w-7xl').appendChild(webRing);
    }
    
    // Add click handlers
    const links = webRing.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            createOldSkoolDialog('WebRing', 'The WebRing feature is just for nostalgic decoration. In the 90s, WebRings connected related websites together before search engines were sophisticated.', [
                { text: 'Cool!', value: true }
            ]);
        });
    });
}

// Function to create old-school footer
function createFooter() {
    // Only proceed if oldskool theme is active
    if (!document.documentElement.classList.contains('oldskool-theme')) return;
    
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="valid-html">HTML 4.01 Compliant</div>
        <div class="valid-html">CSS 2.0 Validated</div>
        <div class="valid-html">Best Viewed at 800x600</div>
        <div class="copyright">© 1996-2025 Approvideo Learning Hub</div>
        <div class="last-updated">Last Updated: ${new Date().toLocaleDateString()}</div>
    `;
    
    // Append to the document
    document.body.appendChild(footer);
}

// Function to enhance the theme toggle experience
function enhanceThemeToggle() {
    // Only proceed if the toggle button exists
    const toggleBtn = document.querySelector('.oldskool-theme-toggle');
    if (!toggleBtn) return;
    
    // Add a click sound when hovering over the button
    toggleBtn.addEventListener('mouseenter', function() {
        if ((window.AudioContext || window.webkitAudioContext)) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(660, audioCtx.currentTime);
            
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        }
    });
}

// Function to create a retro cursor effect for oldskool theme
function createRetroCursor() {
    // Only proceed if oldskool theme is active
    if (!document.documentElement.classList.contains('oldskool-theme')) return;
    
    // Create custom cursor style element
    const style = document.createElement('style');
    style.id = 'retro-cursor-style';
    style.textContent = `
        body.oldskool-theme, 
        body.oldskool-theme * {
            cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDQtMDJUMTY6NDM6MTMtMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA0LTAyVDE2OjQ1OjExLTA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA0LTAyVDE2OjQ1OjExLTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1YTUzZGM3LTZiOTEtNDU4ZC1hOGE1LTBmMzA4YmQzNjAzYyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAyMDJjYmY5LWM4ZTgtMzA0OS05ZTYyLTZiMmYwZDYwYzQwZSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjZjY2ZjNDYwLWRmYmEtNDIyZS1hYTMwLWYxMjIxNzM3NjY2MSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmNjZmM0NjAtZGZiYS00MjJlLWFhMzAtZjEyMjE3Mzc2NjYxIiBzdEV2dDp3aGVuPSIyMDIwLTA0LTAyVDE2OjQzOjEzLTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTVhNTNkYzctNmI5MS00NThkLWE4YTUtMGYzMDhiZDM2MDNjIiBzdEV2dDp3aGVuPSIyMDIwLTA0LTAyVDE2OjQ1OjExLTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4RcyZ8AAADBElEQVRYw7WXzWtTQRDAfxuTpDGmSao1UQpRqKEm1ooFP/Bj60XwWlr0InjxIIj/gB56qKKCBxEEL54ET/Xm2T9AJB48qBcVW2ubtk3TJnl5ebvjIfvavPeakkw42Ddvd37zu7Mzs7tCKYWJCSHWPc/1PHc4kUgkP3375gFr+J29GWH3oY+PH189/dkh2mwsVkPDJ0/p7u6dZB+HaAOv9TjbqKqqrq67PTTkOpWVJlvNiAh5/c1cZ2dnvKOjUxHT3ZzxMymlZ1kW1dXVJJNJDF5bW0sikVCkUimt/5v9/gVA2/9NJFEyETxMFZVsowB0Oe4CeNEXNqiNIKyhLvzlGQKYm5sDwLZtbXNzc77v+8Risa3z8wvs3VPGsb4yLk84vHxTWt2wE3B0OIEUKvzB8RMnuXLlMrZtkc/n2b9/n/YV1fEJ4vG4LsTSsqzQd1VVFYZhbJ+fX+DZ8wlGjm3jyn0HwwzWnJ7LcOfuPe7fHw2UxGJY5uaBuHjxAkePHCFXu59czqe+Pg7A6dEBPPk7bUJIbFv65xavdLMsSxyUk87Pz6/ZtjX06NEYi4tLuG5G23xPAzWE3wWgXL6Oj58zmUyanZ0dPH06wfjzl4RzC0ABcOHCee7cGWXHjg4ApJQMDh5i7s1XTNG0bQKSySQdHR2MjT1h586dZLN9/Pz5E7l9O8JpYHAwz6FDB5ienuHt22m6urqoq9uhaxvAzp0VWJY9JMTS+Djyzo0xJ1r4olqO7gsXlFMxwPz8AlJKXaSpqSnK9+xh544cR0f6WFpc5vTpIR48eISUUhUWOTBxXTceq79oLvx99DxXaKmbdv7+m5+9nODcuTNkMn0ALCR+cPjwUXK5HI7jkE6ni99FsRZHlXgUY7PruiR1TvRryZJWVlasAXbzb/S/YqxfADQvLS0tVlRUUPbRwbLkv38HQRw8zxXZbFYpYeq74KLTGpPUa9Tz3IrpgU829NbzXIrDzjCM5e/T01PGOlupFQFEGzCCNmw3KP0ZGRB+hXwBm0nVQ9oeUzMAAAAASUVORK5CYII='), auto;
        }
        
        body.oldskool-theme a,
        body.oldskool-theme button,
        body.oldskool-theme .clickable {
            cursor: url('data:image/png;base64,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'), pointer;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add oldskool-theme class to body when theme is active
    if (document.documentElement.classList.contains('oldskool-theme')) {
        document.body.classList.add('oldskool-theme');
    }
}

// Function to initialize additional features when the old-school theme is activated
function initAdditionalFeatures() {
    // Create retro cursor
    createRetroCursor();
    
    // Setup the guestbook
    setupGuestbook();
    
    // Create WebRing
    createWebRing();
    
    // Create old-school footer
    createFooter();
    
    // Initialize typewriter effects 
    initTypewriterEffects();
    
    // Enhance the theme toggle
    enhanceThemeToggle();
    
    // Create digital rain effect (uncomment if you want this)
    // createDigitalRain();
}

// Enhanced theme toggle that also initializes all the additional features
function enhancedToggleTheme() {
    const oldTheme = document.documentElement.classList.contains('oldskool-theme');
    
    // Regular toggle
    toggleTheme();
    
    // If we just switched to oldskool theme, initialize additional features
    if (!oldTheme && document.documentElement.classList.contains('oldskool-theme')) {
        document.body.classList.add('oldskool-theme');
        initAdditionalFeatures();
    } else if (oldTheme && !document.documentElement.classList.contains('oldskool-theme')) {
        document.body.classList.remove('oldskool-theme');
        
        // Clean up any created elements for the oldskool theme
        // Remove digital rain
        const digitalRain = document.querySelector('.digital-rain');
        if (digitalRain) digitalRain.remove();
        
        // Remove webring
        const webring = document.querySelector('.webring');
        if (webring) webring.remove();
        
        // Remove footer
        const oldFooter = document.querySelector('footer');
        if (oldFooter) oldFooter.remove();
        
        // Remove retro cursor style
        const cursorStyle = document.getElementById('retro-cursor-style');
        if (cursorStyle) cursorStyle.remove();
    }
}

// Add this to document ready event to override the regular toggle with enhanced toggle
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to initialize
    setTimeout(function() {
        const toggleBtn = document.querySelector('.oldskool-theme-toggle');
        if (toggleBtn) {
            // Clone and replace to remove old event listeners
            const newBtn = toggleBtn.cloneNode(true);
            toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);
            
            // Add our enhanced toggle
            newBtn.addEventListener('click', enhancedToggleTheme);
            
            // Check if theme is already oldskool and initialize if needed
            if (document.documentElement.classList.contains('oldskool-theme')) {
                document.body.classList.add('oldskool-theme');
                initAdditionalFeatures();
            }
        }
    }, 500);
});
