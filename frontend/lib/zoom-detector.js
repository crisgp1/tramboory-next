/**
 * Utility to detect page zooming/scaling and temporarily disable animations
 * This helps prevent unwanted animation side effects during zooming
 */

// Variables to track zoom state
let lastWidth = window.innerWidth;
let zoomTimeout;
const HTML = document.documentElement;

/**
 * Detect zooming by comparing previous and current window dimensions
 * and temporarily apply a class to disable animations
 */
export function initZoomDetector() {
  // Initial setup - store window dimensions
  updateDimensions();
  
  // Listen for resize events which could indicate zooming
  window.addEventListener('resize', handleResize);
  
  // Listen for touch events that might lead to pinch-zoom
  if ('ontouchstart' in window) {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  }
  
  // Clean up on page unload
  return () => {
    window.removeEventListener('resize', handleResize);
    if ('ontouchstart' in window) {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
  };
}

// Store initial touch points for pinch detection
let initialTouchDistance = 0;

// Handle touch start events to detect potential pinch-zoom gestures
function handleTouchStart(e) {
  if (e.touches.length === 2) {
    // Calculate initial distance between touch points
    initialTouchDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
  }
}

// Detect pinch gestures during touch movement
function handleTouchMove(e) {
  if (e.touches.length === 2 && initialTouchDistance > 0) {
    // Calculate new distance between touch points
    const currentDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    
    // If the distance changed significantly, user is likely pinching
    const pinchThreshold = 10; // pixels
    if (Math.abs(currentDistance - initialTouchDistance) > pinchThreshold) {
      pauseAnimations();
    }
  }
}

// Reset after touch end
function handleTouchEnd() {
  initialTouchDistance = 0;
  // Keep animations paused for a brief moment after touch ends
  setTimeout(resumeAnimations, 500);
}

// Handle window resize events which might indicate zooming
function handleResize() {
  const currentWidth = window.innerWidth;
  
  // If width changed by a small amount while height stayed the same,
  // it's likely zooming rather than a window resize
  if (Math.abs(currentWidth - lastWidth) < 20) {
    pauseAnimations();
  }
  
  updateDimensions();
}

// Update stored dimensions
function updateDimensions() {
  lastWidth = window.innerWidth;
}

// Pause animations by adding a class
function pauseAnimations() {
  HTML.classList.add('zoom-detected');
  
  // Clear any existing timeout
  if (zoomTimeout) {
    clearTimeout(zoomTimeout);
  }
  
  // Reset after a delay to resume animations
  zoomTimeout = setTimeout(resumeAnimations, 1000);
}

// Resume animations by removing the class
function resumeAnimations() {
  HTML.classList.remove('zoom-detected');
}