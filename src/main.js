import * as THREE from 'three';

/* ==========================================================================
   MINIMALIST THREE.JS SCENE (LIGHT / WHITE AESTHETIC)
   ========================================================================== */

const canvas = document.querySelector('#bg-canvas');

// 1. Scene, Camera, Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.FogExp2(0xffffff, 0.03);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xe4e4e7, 2);
directionalLight.position.set(5, 8, 5);
scene.add(directionalLight);

// 3. Minimalist 3D Sculpture Group
const group = new THREE.Group();
scene.add(group);

// Subtle Wireframe Icosahedron
const outerGeo = new THREE.IcosahedronGeometry(2.4, 2);
const outerMat = new THREE.MeshBasicMaterial({
  color: 0xd4d4d8,
  wireframe: true,
  transparent: true,
  opacity: 0.7
});
const outerMesh = new THREE.Mesh(outerGeo, outerMat);
group.add(outerMesh);

// Minimal Inner Torus Knot
const innerGeo = new THREE.TorusKnotGeometry(1.2, 0.28, 100, 16);
const innerMat = new THREE.MeshStandardMaterial({
  color: 0xf4f4f5,
  roughness: 0.4,
  metalness: 0.1,
  wireframe: false
});
const innerMesh = new THREE.Mesh(innerGeo, innerMat);
group.add(innerMesh);

// Delicate floating ambient points
const particleCount = 200;
const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3;
  particlePositions[i3] = (Math.random() - 0.5) * 20;
  particlePositions[i3 + 1] = (Math.random() - 0.5) * 20;
  particlePositions[i3 + 2] = (Math.random() - 0.5) * 15;
}

const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

const particleMat = new THREE.PointsMaterial({
  color: 0xa1a1aa,
  size: 0.04,
  transparent: true,
  opacity: 0.5
});

const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// Position sculpture to the right or center based on screen width
function updateSculptureLayout() {
  if (window.innerWidth < 800) {
    group.position.set(0, 0, -2);
    group.scale.set(0.7, 0.7, 0.7);
  } else {
    group.position.set(2.8, 0, 0);
    group.scale.set(1, 1, 1);
  }
}
updateSculptureLayout();

/* ==========================================================================
   INTERACTION & ANIMATION LOOP
   ========================================================================== */

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  updateSculptureLayout();
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Smooth mouse damping
  targetMouseX += (mouseX - targetMouseX) * 0.05;
  targetMouseY += (mouseY - targetMouseY) * 0.05;

  // Gentle continuous rotation
  outerMesh.rotation.x = elapsedTime * 0.12;
  outerMesh.rotation.y = elapsedTime * 0.15;

  innerMesh.rotation.x = -elapsedTime * 0.18;
  innerMesh.rotation.y = elapsedTime * 0.22;

  particles.rotation.y = elapsedTime * 0.02;

  // Interactive subtle parallax
  group.rotation.x = targetMouseY * 0.25;
  group.rotation.y = targetMouseX * 0.35;

  camera.position.x = targetMouseX * 0.4;
  camera.position.y = targetMouseY * 0.4;
  camera.lookAt(0, 0, 0);

  // TODO: add some cool simulations (water, etc)
  // renderer.render(scene, camera);
}

animate();

/* ==========================================================================
   TAB NAVIGATION LOGIC
   ========================================================================== */

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

function switchTab(tabId) {
  tabButtons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  tabPanes.forEach(pane => {
    if (pane.id === `tab-${tabId}`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  // Scroll to top of content smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update hash
  if (history.pushState) {
    history.pushState(null, null, `#${tabId}`);
  } else {
    location.hash = `#${tabId}`;
  }

  // Track tab switch in Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'tab_view', {
      tab_name: tabId,
      page_path: `/#${tabId}`,
      page_title: `Lucie Choi - ${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`
    });
  }
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    if (tabId) switchTab(tabId);
  });
});

// Handle direct hash navigation (e.g., #projects, #cv, #about)
function checkInitialHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(`tab-${hash}`)) {
    switchTab(hash);
  }
}
window.addEventListener('popstate', checkInitialHash);
checkInitialHash();

/* ==========================================================================
   ABOUT ME SUBTAB NAVIGATION LOGIC
   ========================================================================== */

const subtabButtons = document.querySelectorAll('.subtab-btn');
const subtabPanes = document.querySelectorAll('.subtab-pane');

subtabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetSubtab = button.getAttribute('data-subtab');

    subtabButtons.forEach(btn => btn.classList.remove('active'));
    subtabPanes.forEach(pane => pane.classList.remove('active'));

    button.classList.add('active');
    const targetPane = document.getElementById(`subtab-${targetSubtab}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    // Track subtab switch in Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'subtab_view', {
        subtab_name: targetSubtab
      });
    }
  });
});

/* ==========================================================================
   ANONYMOUS FEEDBACK FORM (GOOGLE SHEETS / APPS SCRIPT)
   ========================================================================== */

// Replace with your deployed Google Apps Script Web App URL:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwr5FrcmzQ1se5sMS668b_2eoNGFfOhA10aX4mPq9ypK8fjv-W_nQa3o1P9WzPTTOYM/exec';

const feedbackForm = document.getElementById('feedback-form');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackSubmitBtn = document.getElementById('feedback-submit-btn');
const feedbackBtnText = document.getElementById('feedback-btn-text');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE')) {
      feedbackStatus.textContent = 'Please paste your Google Apps Script Web App URL into src/main.js.';
      feedbackStatus.className = 'feedback-status error';
      return;
    }

    const message = document.getElementById('feedback-message')?.value || '';

    if (!message.trim()) return;

    // Loading state
    feedbackSubmitBtn.disabled = true;
    feedbackBtnText.textContent = 'Sending...';
    feedbackStatus.textContent = '';
    feedbackStatus.className = 'feedback-status';

    try {
      const payload = {
        message: message,
        timestamp: new Date().toISOString()
      };

      // Sending text/plain with no-cors avoids Google Apps Script 302 CORS redirection block
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });

      // Show success feedback
      feedbackStatus.textContent = '✓ Thank you! Your note has been sent.';
      feedbackStatus.className = 'feedback-status success';
      feedbackForm.reset();

      // Track submission event in Google Analytics
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'feedback_submitted');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      feedbackStatus.textContent = 'Oops! Failed to send. Please try again.';
      feedbackStatus.className = 'feedback-status error';
    } finally {
      feedbackSubmitBtn.disabled = false;
      feedbackBtnText.textContent = 'Send Note';
    }
  });
}

