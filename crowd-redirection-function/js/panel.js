/**
 * Monastery360 — Sliding Glass Panel & Multi-City Distance Matrix
 * Smart India Hackathon 2026 (SIH25061)
 */

let currentPanelMonastery = null;

function initPanel() {
  const overlay = document.getElementById("panel-overlay");
  const closeBtn = document.getElementById("panel-close-btn");

  if (overlay) overlay.addEventListener("click", closeMonasteryPanel);
  if (closeBtn) closeBtn.addEventListener("click", closeMonasteryPanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closeMonasteryPanel();
    }
  });
}

function openMonasteryPanel(monasteryName) {
  const monastery = monasteryData.find(item => item.name === monasteryName);
  if (!monastery) return;

  currentPanelMonastery = monastery;

  const overlay = document.getElementById("panel-overlay");
  const panel = document.getElementById("panel-drawer");
  const content = document.getElementById("panel-content");

  if (!overlay || !panel || !content) return;

  const isPlanned = plannedMonasteriesSet.has(monastery.name);
  const liveTraffic = getLiveTrafficStatus(monastery);

  let badgeClass = "badge-low";
  if (liveTraffic.percent >= 70) badgeClass = "badge-high";
  else if (liveTraffic.percent >= 40) badgeClass = "badge-med";

  const amenitiesListHTML = (monastery.amenities || []).map(a => `
    <span class="px-2.5 py-1 rounded-lg text-xs bg-app/80 border border-theme text-main flex items-center gap-1 font-medium">
      ✓ ${a}
    </span>
  `).join("");

  const cityMatrix = monastery.cityDistances || {};

  content.innerHTML = `
    <!-- Top Image Container -->
    <div class="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden bg-gray-200 dark:bg-gray-800 group">
      <img 
        src="${monastery.image}" 
        alt="${monastery.name}" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <!-- Click to Zoom Badge -->
      <button 
        type="button" 
        onclick="openLightbox('${monastery.image}', '${monastery.name.replace(/'/g, "\\'")}')"
        class="absolute bottom-3 right-3 bg-surface/90 backdrop-blur text-main text-xs px-3 py-1.5 rounded-full font-semibold border border-theme shadow flex items-center gap-1.5 hover:bg-surface"
      >
        ${t("clickZoom")}
      </button>

      <div class="absolute bottom-4 left-6 right-20 text-white">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass} shadow">
            ${liveTraffic.dot} ${liveTraffic.label} (${liveTraffic.percent}%)
          </span>
          <span class="text-xs bg-white/20 backdrop-blur px-2.5 py-0.5 rounded-full font-medium">
            ${t("govtTag")}
          </span>
        </div>
        <h2 class="text-2xl font-bold font-heading text-white leading-tight">
          ${monastery.name}
        </h2>
      </div>
    </div>

    <!-- Travel Plan Toggle Button -->
    <div class="pb-5 border-b border-theme">
      <button
        id="panel-plan-toggle-btn"
        type="button"
        onclick="handlePanelPlanToggle('${monastery.name.replace(/'/g, "\\'")}')"
        class="w-full py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
          isPlanned 
            ? "border-2 border-theme bg-surface text-main hover:border-accent" 
            : "bg-accent text-surface hover:opacity-95 shadow"
        }"
      >
        ${isPlanned ? `
          <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          ${t("removePlanBtn")}
        ` : `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          ${t("addPlanBtn")}
        `}
      </button>
    </div>

    <!-- REAL-TIME LIVE TRAFFIC & TIME-BASED PREDICTOR -->
    <div class="py-5 border-b border-theme space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-wider text-muted">
          ⚡ ${t("liveTrafficTitle")}
        </h3>
        <span class="text-xs font-semibold text-accent" id="time-display-label">9:00 AM</span>
      </div>

      <div class="p-4 rounded-xl border border-theme bg-app/80 backdrop-blur space-y-3">
        <!-- Live System Time Output -->
        <div class="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-theme">
          <span class="text-xs text-muted font-medium">${t("liveNow", { time: liveTraffic.timeFormatted })}</span>
          <span class="text-xs font-bold text-accent font-mono">${liveTraffic.dot} ${liveTraffic.percent}% capacity (${liveTraffic.label})</span>
        </div>

        <!-- Interactive Slider -->
        <input 
          type="range" 
          id="crowd-time-slider"
          min="7" 
          max="17" 
          step="2" 
          value="9"
          class="w-full h-2 rounded-lg cursor-pointer bg-surface"
          oninput="updateCrowdPredictionSlider(this.value)"
        />

        <div class="flex justify-between text-[11px] text-muted font-medium font-mono">
          <span>7 AM</span>
          <span>9 AM</span>
          <span>11 AM</span>
          <span>1 PM</span>
          <span>3 PM</span>
          <span>5 PM</span>
        </div>

        <div class="pt-2 border-t border-theme flex items-center justify-between">
          <div>
            <span class="text-xs text-muted block">${t("predictedAt")} <span id="selected-hour-text" class="font-bold text-main">9:00 AM</span></span>
            <span id="predicted-density-text" class="text-sm font-bold text-main">30%</span>
          </div>
          <div class="w-24 h-2.5 bg-surface border border-theme rounded-full overflow-hidden">
            <div id="predicted-meter-fill" class="h-full bg-accent transition-all duration-300" style="width: 30%;"></div>
          </div>
        </div>

        <p class="text-xs text-muted leading-relaxed">
          ✨ <strong class="text-main">${t("bestWindow")}</strong> ${monastery.bestTime}
        </p>
      </div>
    </div>

    <!-- MULTI-CITY DISTANCE & TRAVEL MATRIX -->
    <div class="py-5 border-b border-theme space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-muted">
        ${t("multiCityTitle")}
      </h3>
      
      <div class="grid grid-cols-2 gap-2 text-xs">
        <div class="p-3 rounded-xl border border-theme bg-surface">
          <span class="text-muted block text-[11px] mb-0.5">${t("fromGangtok")}</span>
          <span class="font-bold text-main block font-mono">${cityMatrix.gangtok || monastery.distance}</span>
        </div>
        <div class="p-3 rounded-xl border border-theme bg-surface">
          <span class="text-muted block text-[11px] mb-0.5">${t("fromSiliguri")}</span>
          <span class="font-bold text-main block font-mono">${cityMatrix.siliguri || "115 km (3.5 hrs)"}</span>
        </div>
        <div class="p-3 rounded-xl border border-theme bg-surface">
          <span class="text-muted block text-[11px] mb-0.5">${t("fromBagdogra")}</span>
          <span class="font-bold text-main block font-mono">${cityMatrix.bagdogra || "122 km (4 hrs)"}</span>
        </div>
        <div class="p-3 rounded-xl border border-theme bg-surface">
          <span class="text-muted block text-[11px] mb-0.5">${t("fromDarjeeling")}</span>
          <span class="font-bold text-main block font-mono">${cityMatrix.darjeeling || "98 km (3 hrs)"}</span>
        </div>
      </div>

      <div class="p-3 rounded-xl border border-theme bg-app/80 text-xs text-muted">
        🛣️ <strong class="text-main">Road Condition:</strong> ${monastery.roadCondition}
      </div>

      ${monastery.annualFestival ? `
        <div class="p-3 rounded-xl border border-theme bg-surface text-xs">
          <span class="text-muted block mb-0.5">${t("festivalTitle")}</span>
          <span class="font-bold text-accent">${monastery.annualFestival}</span>
        </div>
      ` : ''}

      <div class="space-y-1.5">
        <span class="text-xs font-semibold text-muted block">${t("amenitiesTitle")}</span>
        <div class="flex flex-wrap gap-1.5">
          ${amenitiesListHTML}
        </div>
      </div>
    </div>

    <!-- History & Significance Section -->
    <div class="py-5 border-b border-theme space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-muted">
        ${t("historyTitle")}
      </h3>
      <p class="text-sm text-main leading-relaxed">
        ${monastery.shortHistory}
      </p>
    </div>

    <!-- Authentic Cultural Etiquette Section -->
    <div class="py-5 space-y-2">
      <h3 class="text-xs font-bold uppercase tracking-wider text-muted">
        ${t("etiquetteTitle")}
      </h3>
      <div class="p-4 rounded-xl border border-theme bg-surface space-y-1">
        <p class="text-xs text-main leading-relaxed">
          🙏 ${monastery.etiquette}
        </p>
      </div>
    </div>
  `;

  overlay.classList.add("active");
  panel.classList.add("open");
  document.body.style.overflow = "hidden";

  updateCrowdPredictionSlider("9");

  const closeBtn = document.getElementById("panel-close-btn");
  if (closeBtn) closeBtn.focus();
}

function updateCrowdPredictionSlider(hourValue) {
  if (!currentPanelMonastery) return;

  const hourNumber = parseInt(hourValue, 10);
  const hourMap = {
    7: "7 AM",
    9: "9 AM",
    11: "11 AM",
    13: "1 PM",
    15: "3 PM",
    17: "5 PM"
  };

  const hourKey = hourMap[hourNumber] || "9 AM";
  const crowdPercent = currentPanelMonastery.hourlyCrowd[hourKey] || 30;

  const labelEl = document.getElementById("time-display-label");
  const hourTextEl = document.getElementById("selected-hour-text");
  const densityTextEl = document.getElementById("predicted-density-text");
  const fillEl = document.getElementById("predicted-meter-fill");

  if (labelEl) labelEl.textContent = hourKey;
  if (hourTextEl) hourTextEl.textContent = hourKey;

  let levelLabel = t("crowdLow");
  let colorVar = "var(--status-low)";

  if (crowdPercent >= 70) {
    levelLabel = t("crowdHigh");
    colorVar = "var(--status-high)";
  } else if (crowdPercent >= 40) {
    levelLabel = t("crowdMed");
    colorVar = "var(--status-med)";
  }

  if (densityTextEl) {
    densityTextEl.textContent = `${crowdPercent}% (${levelLabel})`;
  }

  if (fillEl) {
    fillEl.style.width = `${crowdPercent}%`;
    fillEl.style.backgroundColor = colorVar;
  }
}

function closeMonasteryPanel() {
  const overlay = document.getElementById("panel-overlay");
  const panel = document.getElementById("panel-drawer");

  if (overlay) overlay.classList.remove("active");
  if (panel) panel.classList.remove("open");
  document.body.style.overflow = "";

  currentPanelMonastery = null;
}

function handlePanelPlanToggle(monasteryName) {
  toggleMonasteryPlan(monasteryName);
  if (currentPanelMonastery) {
    openMonasteryPanel(currentPanelMonastery.name);
  }
}

function openLightbox(imgSrc, title) {
  let modal = document.getElementById("photo-lightbox");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "photo-lightbox";
    modal.className = "lightbox-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-label", "Monastery Photo View");
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="relative max-w-4xl w-full bg-surface border border-theme rounded-2xl overflow-hidden shadow-2xl p-2">
      <div class="brand-stripe mb-2"></div>
      <div class="flex items-center justify-between px-4 py-2 border-b border-theme">
        <h4 class="font-heading font-bold text-main text-lg">${title}</h4>
        <button 
          type="button" 
          onclick="closeLightbox()"
          class="p-2 rounded-lg border border-theme text-muted hover:text-main"
        >
          ✕
        </button>
      </div>
      <div class="p-2 max-h-[75vh] overflow-hidden flex items-center justify-center bg-black/90">
        <img src="${imgSrc}" alt="${title}" class="max-h-[70vh] w-auto object-contain rounded-lg shadow" />
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeLightbox() {
  const modal = document.getElementById("photo-lightbox");
  if (modal) modal.classList.remove("active");
}
