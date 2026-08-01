/**
 * Monastery360 — Main Entry Point & Authentic Dharmachakra Canvas Renderer
 * Smart India Hackathon 2026 (SIH25061)
 * 
 * Features:
 * - Initializes Multi-Language system, Theme, Planner, and Panel.
 * - Renders an authentic 8-Spoke Dharmachakra (Wheel of Dharma) matching Wikipedia specs:
 *   Concentric outer rims, 8 thick tapered spokes, outer rim knobs, central lotus hub,
 *   and continuous stately rotation with ambient gold glow.
 * - Updates Government Portal Footer text dynamically across 8 languages.
 */

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initTheme();

  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  initPlanner();
  initPanel();

  // Initialize Authentic 8-Spoke Dharmachakra Background Canvas
  initAuthenticDharmachakraCanvas();

  // Initialize Interactive Tibetan Prayer Wheel widget
  initInteractivePrayerWheelWidget();
});

/**
 * Updates all UI strings across the page including Government Portal Footer
 */
function updateAllTranslationsUI() {
  const titleEl = document.getElementById("ui-site-title");
  const subEl = document.getElementById("ui-site-sub");
  const portalTagEl = document.getElementById("ui-portal-tag");
  const heroTitleEl = document.getElementById("ui-hero-title");
  const heroDescEl = document.getElementById("ui-hero-desc");
  const planTitleEl = document.getElementById("ui-plan-title");
  const filterTitleEl = document.getElementById("ui-filter-title");

  if (titleEl) titleEl.textContent = t("siteTitle");
  if (subEl) subEl.textContent = t("siteSub");
  if (portalTagEl) portalTagEl.textContent = t("portalTag");
  if (heroTitleEl) heroTitleEl.textContent = t("heroTitle");
  if (heroDescEl) heroDescEl.textContent = t("heroDesc");
  if (planTitleEl) planTitleEl.textContent = t("planTitle");
  if (filterTitleEl) filterTitleEl.textContent = t("filterTitle");

  // Government Footer Translations
  const fDept = document.getElementById("ui-footer-dept");
  const fGovt = document.getElementById("ui-footer-govt");
  const fQuick = document.getElementById("ui-footer-quick");
  const fPermits = document.getElementById("ui-footer-permits");
  const fCircuit = document.getElementById("ui-footer-circuit");
  const fFestivals = document.getElementById("ui-footer-festivals");
  const fHelpline = document.getElementById("ui-footer-helpline");
  const fContact = document.getElementById("ui-footer-contact");
  const fAddress = document.getElementById("ui-footer-address");
  const fToll = document.getElementById("ui-footer-toll");
  const fEmail = document.getElementById("ui-footer-email");
  const fCopy = document.getElementById("ui-footer-copy");
  const fNote = document.getElementById("ui-footer-note");

  if (fDept) fDept.textContent = t("footerDept");
  if (fGovt) fGovt.textContent = t("footerGovt");
  if (fQuick) fQuick.textContent = t("footerQuickLinks");
  if (fPermits) fPermits.textContent = t("footerPermits");
  if (fCircuit) fCircuit.textContent = t("footerCircuit");
  if (fFestivals) fFestivals.textContent = t("footerFestivals");
  if (fHelpline) fHelpline.textContent = t("footerHelpline");
  if (fContact) fContact.textContent = t("footerContactTitle");
  if (fAddress) fAddress.textContent = t("footerAddress");
  if (fToll) fToll.textContent = t("footerTollFree");
  if (fEmail) fEmail.textContent = t("footerEmail");
  if (fCopy) fCopy.textContent = t("footerCopy");
  if (fNote) fNote.textContent = t("footerNote");

  updateProgressBar();
  renderDistrictChips();
  renderMonasteryList();

  if (currentPanelMonastery) {
    openMonasteryPanel(currentPanelMonastery.name);
  }
}

/**
 * Authentic 8-Spoke Dharmachakra (Wheel of Dharma) Canvas Renderer
 */
function initAuthenticDharmachakraCanvas() {
  const canvas = document.getElementById("bg-3d-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Mouse tilt tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX - width / 2) * 0.0003;
    targetMouseY = (e.clientY - height / 2) * 0.0003;
  });

  // Floating Golden Sparkles / Lotus Petal Dust
  const sparkles = [];
  for (let i = 0; i < 45; i++) {
    sparkles.push({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      size: Math.random() * 2.5 + 1,
      speed: Math.random() * 0.3 + 0.1
    });
  }

  let rotationAngle = 0;
  let breathTime = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    rotationAngle += 0.005 + mouseX * 0.05;
    breathTime += 0.02;

    const floatY = Math.sin(breathTime) * 10;
    const centerX = width * 0.82;
    const centerY = height * 0.46 + floatY;

    const isDark = document.documentElement.classList.contains("dark");
    const goldColor = isDark ? "rgba(240, 169, 60, 0.68)" : "rgba(184, 135, 58, 0.58)";
    const glowColor = isDark ? "rgba(240, 169, 60, 0.12)" : "rgba(184, 135, 58, 0.08)";
    const darkAccent = isDark ? "rgba(31, 37, 48, 0.8)" : "rgba(255, 252, 245, 0.8)";

    // Render Floating Golden Particles
    ctx.fillStyle = goldColor;
    sparkles.forEach(p => {
      p.y -= p.speed;
      if (p.y < -height / 2) p.y = height / 2;

      const px = centerX + p.x;
      const py = centerY + p.y;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationAngle);

    const outerRadius = 220;
    const innerRimRadius = 180;
    const hubRadius = 60;
    const centerEyeRadius = 24;
    const spokesCount = 8;

    // 1. Golden Aura Backlight Glow
    const auraGrad = ctx.createRadialGradient(0, 0, hubRadius, 0, 0, outerRadius + 40);
    auraGrad.addColorStop(0, glowColor);
    auraGrad.addColorStop(1, "transparent");
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius + 40, 0, Math.PI * 2);
    ctx.fill();

    // 2. Outer Rim Double Rings
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, innerRimRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Central Hub Double Circles
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, hubRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, centerEyeRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Render 8 Authentic Tapered Spokes (Noble Eightfold Path)
    for (let i = 0; i < spokesCount; i++) {
      const angle = (i * Math.PI * 2) / spokesCount;

      ctx.save();
      ctx.rotate(angle);

      // Main Spoke Shaft (tapered rectangle)
      ctx.fillStyle = goldColor;
      ctx.beginPath();
      ctx.moveTo(-7, hubRadius - 2);
      ctx.lineTo(-12, innerRimRadius + 2);
      ctx.lineTo(12, innerRimRadius + 2);
      ctx.lineTo(7, hubRadius - 2);
      ctx.closePath();
      ctx.fill();

      // Spoke center groove line
      ctx.strokeStyle = darkAccent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, hubRadius);
      ctx.lineTo(0, innerRimRadius);
      ctx.stroke();

      // Outer Rim Knob / Teardrop Jewel at spoke tip
      ctx.fillStyle = goldColor;
      ctx.beginPath();
      ctx.arc(0, outerRadius, 9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // 5. Central Gankyil Swirl Emblem inside Hub
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 2;
    for (let s = 0; s < 3; s++) {
      const swirlAngle = (s * Math.PI * 2) / 3;
      ctx.save();
      ctx.rotate(swirlAngle);
      ctx.beginPath();
      ctx.arc(8, 0, 12, 0, Math.PI);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();

    requestAnimationFrame(render);
  }

  render();
}

/**
 * Interactive Tibetan Prayer Wheel Widget State
 */
let prayerSpinCount = 0;

function initInteractivePrayerWheelWidget() {
  const btn = document.getElementById("spin-wheel-btn");
  const countEl = document.getElementById("spin-count-display");
  const wheelIcon = document.getElementById("interactive-wheel-icon");

  if (!btn) return;

  btn.addEventListener("click", () => {
    prayerSpinCount++;
    if (countEl) countEl.textContent = prayerSpinCount;

    if (wheelIcon) {
      wheelIcon.classList.add("rotate-180");
      setTimeout(() => {
        wheelIcon.classList.remove("rotate-180");
      }, 300);
    }
  });
}
