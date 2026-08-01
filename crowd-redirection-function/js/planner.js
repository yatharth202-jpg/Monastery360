/**
 * Monastery360 — Travel Planner & Monastery List Module
 * Smart India Hackathon 2026 (SIH25061)
 * 
 * Features:
 * - Real-time live traffic indicator based on current system time.
 * - Multi-language translation support.
 */

const PLAN_STORAGE_KEY = "mv-planned";
let plannedMonasteriesSet = new Set();
let activeDistrictFilter = "All";

function initPlanner() {
  loadPlannedState();
  renderDistrictChips();
  renderMonasteryList();
  updateProgressBar();
}

function loadPlannedState() {
  try {
    const storedData = localStorage.getItem(PLAN_STORAGE_KEY);
    if (storedData) {
      const parsedArray = JSON.parse(storedData);
      plannedMonasteriesSet = new Set(parsedArray);
    }
  } catch (error) {
    console.error("Failed to parse mv-planned from localStorage:", error);
    plannedMonasteriesSet = new Set();
  }
}

function savePlannedState() {
  try {
    const arrayData = Array.from(plannedMonasteriesSet);
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(arrayData));
  } catch (error) {
    console.error("Failed to save mv-planned to localStorage:", error);
  }
}

function renderDistrictChips() {
  const container = document.getElementById("district-chips-container");
  if (!container) return;

  const uniqueDistricts = Array.from(new Set(monasteryData.map(m => m.district)));
  const allDistricts = ["All", ...uniqueDistricts];

  const filterNamesMap = {
    "All": t("filterAll"),
    "East Sikkim": t("filterEast"),
    "West Sikkim": t("filterWest"),
    "North Sikkim": t("filterNorth"),
    "South Sikkim": t("filterSouth")
  };

  container.innerHTML = allDistricts.map(district => {
    const isActive = district === activeDistrictFilter;
    const label = filterNamesMap[district] || district;

    return `
      <button 
        type="button"
        class="chip ${isActive ? "active" : ""}"
        data-district="${district}"
        onclick="setDistrictFilter('${district}')"
      >
        ${label}
      </button>
    `;
  }).join("");
}

function setDistrictFilter(district) {
  activeDistrictFilter = district;
  renderDistrictChips();
  renderMonasteryList();
}

/**
 * Calculates current real-time live traffic estimate based on system time
 */
function getLiveTrafficStatus(monastery) {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Map hour to nearest hourly prediction
  let hourKey = "9 AM";
  if (currentHour >= 6 && currentHour < 8) hourKey = "7 AM";
  else if (currentHour >= 8 && currentHour < 10) hourKey = "9 AM";
  else if (currentHour >= 10 && currentHour < 12) hourKey = "11 AM";
  else if (currentHour >= 12 && currentHour < 14) hourKey = "1 PM";
  else if (currentHour >= 14 && currentHour < 16) hourKey = "3 PM";
  else hourKey = "5 PM";

  const percent = monastery.hourlyCrowd[hourKey] || 30;
  
  let label = t("crowdLow");
  let dot = "🟢";
  if (percent >= 70) {
    label = t("crowdHigh");
    dot = "🔴";
  } else if (percent >= 40) {
    label = t("crowdMed");
    dot = "🟡";
  }

  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return {
    percent,
    label,
    dot,
    timeFormatted
  };
}

function renderMonasteryList() {
  const container = document.getElementById("monastery-list-container");
  if (!container) return;

  const filteredList = monasteryData.filter(monastery => {
    if (activeDistrictFilter === "All") return true;
    return monastery.district === activeDistrictFilter;
  });

  if (filteredList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center glass-panel">
        <p class="text-muted text-base">No monasteries found for the selected district.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredList.map(monastery => {
    const isPlanned = plannedMonasteriesSet.has(monastery.name);
    const liveTraffic = getLiveTrafficStatus(monastery);

    let badgeClass = "badge-low";
    if (liveTraffic.percent >= 70) badgeClass = "badge-high";
    else if (liveTraffic.percent >= 40) badgeClass = "badge-med";

    const amenitiesPreview = (monastery.amenities || []).slice(0, 2).map(a => `
      <span class="px-2 py-0.5 rounded text-[11px] bg-app/80 border border-theme text-muted">
        ${a}
      </span>
    `).join("");

    return `
      <article 
        class="surface-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between group"
        tabindex="0"
        role="button"
        aria-label="View details for ${monastery.name}"
        onclick="openMonasteryPanel('${monastery.name.replace(/'/g, "\\'")}')"
        onkeydown="if(event.key === 'Enter' || event.key === ' ') { openMonasteryPanel('${monastery.name.replace(/'/g, "\\'")}'); event.preventDefault(); }"
      >
        <!-- Fixed Brand Top Border Stripe -->
        <div class="brand-stripe"></div>

        <!-- Monastery Image Header -->
        <div class="relative h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
          <img 
            src="${monastery.image}" 
            alt="${monastery.name}"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <!-- Real-Time Live Traffic Badge -->
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full shadow-lg ${badgeClass} flex items-center gap-1">
              ${liveTraffic.dot} ${liveTraffic.label} (${liveTraffic.percent}%)
            </span>
          </div>

          ${isPlanned ? `
            <div class="absolute top-3 left-3 bg-accent text-surface px-2.5 py-1 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              ${t("inPlan")}
            </div>
          ` : ''}

          <div class="absolute bottom-3 left-4 right-4 text-white">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[11px] font-semibold uppercase tracking-wider bg-white/20 backdrop-blur px-2 py-0.5 rounded text-white">
                📍 ${monastery.district}
              </span>
              <span class="text-[11px] font-mono text-gray-200">
                ⛰️ ${monastery.elevation}
              </span>
            </div>
            <h3 class="text-xl font-bold font-heading leading-tight drop-shadow">
              ${monastery.name}
            </h3>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <p class="text-sm text-muted line-clamp-3 leading-relaxed">
            ${monastery.shortHistory}
          </p>

          <!-- Live System Time Traffic Indicator -->
          <div class="p-2.5 rounded-xl bg-app/80 border border-theme text-xs flex items-center justify-between text-main font-medium">
            <span>⚡ ${t("liveNow", { time: liveTraffic.timeFormatted })}</span>
            <span class="font-bold text-accent">${liveTraffic.percent}% capacity</span>
          </div>

          <div class="flex flex-wrap gap-1.5">
            ${amenitiesPreview}
          </div>

          <div class="pt-3 border-t border-theme flex items-center justify-between text-xs">
            <span class="text-muted font-medium">
              🚗 ${monastery.distance}
            </span>

            <span class="text-accent font-semibold flex items-center group-hover:translate-x-1 transition-transform">
              ${t("exploreBtn")}
            </span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function updateProgressBar() {
  const countElement = document.getElementById("planned-count-text");
  const fillElement = document.getElementById("progress-bar-fill");

  const totalCount = monasteryData.length;
  const plannedCount = plannedMonasteriesSet.size;
  const percentage = Math.min(100, Math.round((plannedCount / totalCount) * 100));

  if (countElement) {
    countElement.textContent = t("planCount", { x: plannedCount, y: totalCount });
  }

  if (fillElement) {
    fillElement.style.width = `${percentage}%`;
  }
}

function toggleMonasteryPlan(monasteryName) {
  if (plannedMonasteriesSet.has(monasteryName)) {
    plannedMonasteriesSet.delete(monasteryName);
  } else {
    plannedMonasteriesSet.add(monasteryName);
  }

  savePlannedState();
  updateProgressBar();
  renderMonasteryList();
}
