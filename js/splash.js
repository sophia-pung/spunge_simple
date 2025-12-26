/**
 * SPoNGe - ASCII Animation Engine
 * The Whale & The Dreamer
 */

// ========================================
// ASCII ART FRAMES
// ========================================

const FRAMES = {
    // Scene 1: Man with lamp, lamp sweeping left
    lampLeft: `
                                                                              
                                                                              
                                                                              
                        . * .                                                 
                      *       *                                               
                    .    ___    .                                             
                      * |   | *                                               
                        |___|                                                 
                      .' | | '.                                               
                   .'    | |    '.                                            
                .'   .   | |   .   '.                                         
             .'    '     | |     '    '.                                      
          .'      .      | |      .      '.                                   
       .'        '       | |       '        '.                                
    .'          .                   .          '.                             
                                                                              
                                                                              
                                         _____                                
                                        /     \\                               
                                       |  o o  |                              
                                       |   >   |                              
                                        \\_____/                               
                                           |                                  
                                       ____|____                              
                                      |         |                             
                                      |         |                             
                                       \\       /                              
                                        |     |                               
                                        |     |                               
                                       /       \\                              
                                      /         \\                             
`,

    // Scene 1: Man with lamp, lamp sweeping center
    lampCenter: `
                                                                              
                                                                              
                                                                              
                                         . * .                                
                                       *       *                              
                                     .    ___    .                            
                                       * |   | *                              
                                         |___|                                
                                       .' | | '.                              
                                    .'    | |    '.                           
                                 .'   .   | |   .   '.                        
                              .'    '     | |     '    '.                     
                           .'      .      | |      .      '.                  
                        .'        '       | |       '        '.               
                     .'          .        | |        .          '.            
                                          | |                                 
                                          | |                                 
                                         _____                                
                                        /     \\                               
                                       |  o o  |                              
                                       |   >   |                              
                                        \\_____/                               
                                           |                                  
                                       ____|____                              
                                      |         |                             
                                      |         |                             
                                       \\       /                              
                                        |     |                               
                                        |     |                               
                                       /       \\                              
                                      /         \\                             
`,

    // Scene 1: Man with lamp, lamp sweeping right
    lampRight: `
                                                                              
                                                                              
                                                                              
                                                         . * .               
                                                       *       *             
                                                     .    ___    .           
                                                       * |   | *             
                                                         |___|               
                                                       .' | | '.             
                                                    .'    | |    '.          
                                                 .'   .   | |   .   '.       
                                              .'    '     | |     '    '.    
                                           .'      .      | |      .      '. 
                                        .'        '       | |       '        
                                     .'          .                   .       
                                                                              
                                                                              
                                         _____                                
                                        /     \\                               
                                       |  o o  |                              
                                       |   >   |                              
                                        \\_____/                               
                                           |                                  
                                       ____|____                              
                                      |         |                             
                                      |         |                             
                                       \\       /                              
                                        |     |                               
                                        |     |                               
                                       /       \\                              
                                      /         \\                             
`,

    // Scene 2: Whale appears in distance
    whaleAppears: `
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
     ___                                                                      
   /'   '\\                                                                    
  /       \\                                                                   
 |  .   .  |                                                                  
 |         |                                                                  
  \\       /                                                                   
   '.___.'                                                                    
                                                                              
                                                                              
                                                                              
                                         . * .                                
                                       *   _   *                              
                                     .    |_|    .                            
                                         _____                                
                                        /     \\                               
                                       |  o o  |                              
                                       |   >   |                              
                                        \\_____/                               
                                           |                                  
                                       ____|____                              
                                      |         |                             
                                      |         |                             
                                       \\       /                              
                                        |     |                               
                                        |     |                               
                                       /       \\                              
                                      /         \\                             
`,

    // Scene 2: Whale approaches
    whaleApproaches: `
                                                                              
                                                                              
                                                                              
                                                                              
                ___________                                                   
              /'           '\\                                                 
             /               \\                                                
            /                 \\                                               
           |    .       .      |                                              
           |                   |                                              
            \\                 /                                               
             \\               /                                                
              '\\___________/'                                                 
                                                                              
                                         . * .                                
                                       *   _   *                              
                                     .    |_|    .                            
                                         _____                                
                                        /     \\                               
                                       |  o o  |                              
                                       |   O   |                              
                                        \\_____/                               
                                           |                                  
                                       ____|____                              
                                      |         |                             
                                      |         |                             
                                       \\       /                              
                                        |     |                               
                                        |     |                               
                                       /       \\                              
                                      /         \\                             
`,

    // Scene 3: Whale mouth opens
    whaleMouthOpen: `
                                                                              
                                                                              
                _____________________                                         
              /'                     '\\                                       
             /                         \\                                      
            /                           \\                                     
           |      .             .        |                                    
           |                             |                                    
           |                             |                                    
            \\                           /                                     
             \\                         /                                      
              \\                       /                                       
               |                     |                                        
               |                     |                                        
               |         . *         |                                        
               |       *   _ *       |                  
               |     .    |_|  .     |                 
               |         _____       |                
               |        /     \\      |               
               |       |  o o  |     |              
               |       |   O   |     |             
               |        \\_____/      |            
               |           |         |           
               |       ____|____     |          
               |      |         |    |         
                \\     |         |   /        
                 \\     \\       /   /       
                  \\     |     |   /      
                   \\    |     |  /     
                    \\  /       \\/    
                     \\/         \\  
`,

    // Scene 3: Being swallowed
    beingSwallowed: `
                                                                              
                _________________________________                             
              /'                                 '\\                           
             /                                     \\                          
            /                                       \\                         
           |        .                   .            |                        
           |                                         |                        
           |                                         |                        
           |                                         |                        
            \\                                       /                         
             \\                                     /                          
              \\                                   /                           
               |                                 |                             
               |                                 |                             
               |                                 |                             
               |              . *                |                             
               |            *     *              |                             
               |          .   ___   .            |                             
               |             |   |               |                             
               |             |___|               |                             
               |            .' | '.              |                             
               |           '   |   '             |                             
               |          .    *    .            |                             
               |                                 |                             
                \\                               /                              
                 \\                             /                               
                  \\                           /                                
                   \\                         /                                 
                    \\                       /                                  
                     \\_____________________/                                   
`,

    // Scene 4: Swallowed - darkness with fading light
    swallowed: `
                                                                              
              _______________________________________________                 
            /'                                               '\\               
           /                                                   \\              
          /                                                     \\             
         |                                                       |            
         |                                                       |            
         |                                                       |            
         |                                                       |            
         |                                                       |            
          \\                                                     /             
           \\                                                   /              
            \\                                                 /               
             |                                               |                
             |                                               |                
             |                                               |                
             |                                               |                
             |                      .                        |                
             |                     * *                       |                
             |                      '                        |                
             |                                               |                
             |                                               |                
             |                                               |                
             |                                               |                
              \\                                             /                 
               \\                                           /                  
                \\                                         /                   
                 \\                                       /                    
                  \\_____________________________________/                     
                                                                              
`,

    // Scene 4: Complete darkness
    darkness: `
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                         .                                    
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
                                                                              
`
};

// ========================================
// ANIMATION SEQUENCE CONFIGURATION
// ========================================

const ANIMATION_SEQUENCE = [
    { frame: 'lampLeft', duration: 800 },
    { frame: 'lampCenter', duration: 800 },
    { frame: 'lampRight', duration: 800 },
    { frame: 'lampCenter', duration: 800 },
    { frame: 'lampLeft', duration: 800 },
    { frame: 'lampCenter', duration: 600 },
    { frame: 'whaleAppears', duration: 1200 },
    { frame: 'whaleApproaches', duration: 1500 },
    { frame: 'whaleMouthOpen', duration: 1800 },
    { frame: 'beingSwallowed', duration: 1500 },
    { frame: 'swallowed', duration: 1200 },
    { frame: 'darkness', duration: 1000 }
];

// ========================================
// ANIMATION ENGINE
// ========================================

class SpongeAnimation {
    constructor() {
        this.layerWhite = document.getElementById('layer-white');
        this.layerBlue = document.getElementById('layer-blue');
        this.layerYellow = document.getElementById('layer-yellow');
        this.splashScreen = document.getElementById('splash-screen');
        this.transitionOverlay = document.getElementById('transition-overlay');
        
        this.currentSequenceIndex = 0;
        this.isRunning = true;
        this.lastFrameTime = 0;
        this.frameDuration = 0;
        
        this.init();
    }
    
    init() {
        // Start animation
        this.setFrame(ANIMATION_SEQUENCE[0].frame);
        this.frameDuration = ANIMATION_SEQUENCE[0].duration;
        this.lastFrameTime = performance.now();
        
        // Start animation loop
        this.animate();
        
        // Setup click to enter
        this.setupClickHandler();
    }
    
    setFrame(frameName) {
        const frameContent = FRAMES[frameName];
        if (frameContent) {
            this.layerWhite.textContent = frameContent;
            this.layerBlue.textContent = frameContent;
            this.layerYellow.textContent = frameContent;
        }
    }
    
    animate() {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        const elapsed = currentTime - this.lastFrameTime;
        
        if (elapsed >= this.frameDuration) {
            // Move to next frame
            this.currentSequenceIndex = (this.currentSequenceIndex + 1) % ANIMATION_SEQUENCE.length;
            const nextFrame = ANIMATION_SEQUENCE[this.currentSequenceIndex];
            
            this.setFrame(nextFrame.frame);
            this.frameDuration = nextFrame.duration;
            this.lastFrameTime = currentTime;
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupClickHandler() {
        this.splashScreen.addEventListener('click', () => this.enterSite());
        
        // Also allow Enter key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.enterSite();
            }
        });
    }
    
    enterSite() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        
        // Fade to black
        this.transitionOverlay.classList.add('active');
        
        // Navigate to home page after transition
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1200);
    }
    
    // Stop animation (for cleanup)
    stop() {
        this.isRunning = false;
    }
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure fonts are loaded
    setTimeout(() => {
        window.spongeAnimation = new SpongeAnimation();
    }, 100);
});

// ========================================
// PRELOAD CHECK
// ========================================

// Ensure content is visible after load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

