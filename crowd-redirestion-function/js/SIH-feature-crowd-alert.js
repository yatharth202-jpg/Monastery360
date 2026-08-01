/**
 * Monastery360 — SIH Feature: Real-Time Crowd Alert & Traffic Rerouting Engine
 * Smart India Hackathon 2026 (SIH25061 - Sikkim Tourism Department)
 * File: js/SIH-feature-crowd-alert.js
 * 
 * Features:
 * - Real-time crowd threshold monitoring & congestion alerts.
 * - Smart alternative monastery recommendation when a site reaches high capacity.
 * - Interactive alert banner widget at top of list.
 */

class SIHCrowdAlertEngine {
  constructor() {
    this.highThreshold = 70; // High crowd alert percentage
    this.medThreshold = 40;  // Moderate crowd advisory percentage
  }

  /**
   * Scans current crowd estimates and generates smart alerts
   */
  evaluateCrowdAlerts(monasteries) {
    const alerts = [];

    monasteries.forEach(monastery => {
      const live = getLiveTrafficStatus(monastery);
      
      if (live.percent >= this.highThreshold) {
        // Find nearest low-crowd alternative in Sikkim
        const alt = monasteries.find(m => m.id !== monastery.id && m.crowdLevel === "low");
        alerts.push({
          type: "high",
          monasteryName: monastery.name,
          district: monastery.district,
          percent: live.percent,
          message: `High visitor density detected at ${monastery.name} (${live.percent}% capacity).`,
          recommendation: alt ? `Recommended alternative: Visit ${alt.name} (${alt.district}) for a peaceful experience.` : "Consider visiting during early morning hours (7:00 AM - 9:00 AM)."
        });
      } else if (live.percent >= this.medThreshold) {
        alerts.push({
          type: "med",
          monasteryName: monastery.name,
          district: monastery.district,
          percent: live.percent,
          message: `Moderate visitor traffic at ${monastery.name} (${live.percent}% capacity).`,
          recommendation: "Parking and footwear counter available with minimal wait times."
        });
      }
    });

    return alerts;
  }

  /**
   * Renders the SIH Live Crowd Alert Banner into the DOM
   */
  renderAlertBanner() {
    let alertContainer = document.getElementById("sih-crowd-alert-banner");
    if (!alertContainer) return;

    const alerts = this.evaluateCrowdAlerts(monasteryData);
    if (alerts.length === 0) {
      alertContainer.innerHTML = "";
      return;
    }

    // Display top high or moderate alert
    const topAlert = alerts.find(a => a.type === "high") || alerts[0];
    const isHigh = topAlert.type === "high";

    alertContainer.innerHTML = `
      <div class="p-4 rounded-xl border ${
        isHigh 
          ? "border-red-400/50 bg-red-500/10 text-main" 
          : "border-amber-400/50 bg-amber-500/10 text-main"
      } backdrop-blur shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div class="flex items-start gap-3">
          <span class="text-2xl">${isHigh ? "🚨" : "🟡"}</span>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider ${isHigh ? "text-red-500" : "text-amber-500"}">
                SIH 2026 Live Crowd Alert
              </span>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-app border border-theme text-muted font-mono">
                ${topAlert.monasteryName} &bull; ${topAlert.percent}% Capacity
              </span>
            </div>
            <p class="text-sm font-semibold text-main mt-0.5">
              ${topAlert.message}
            </p>
            <p class="text-xs text-muted mt-0.5">
              ✨ ${topAlert.recommendation}
            </p>
          </div>
        </div>

        <button 
          type="button" 
          onclick="openMonasteryPanel('${topAlert.monasteryName.replace(/'/g, "\\'")}')"
          class="px-3.5 py-2 rounded-lg ${isHigh ? "bg-red-500 text-white" : "bg-accent text-surface"} text-xs font-semibold hover:opacity-90 transition shadow shrink-0"
        >
          View Live Details →
        </button>
      </div>
    `;
  }
}

// Global instance of SIH Crowd Alert Engine
const sihCrowdAlertEngine = new SIHCrowdAlertEngine();

// Auto render banner when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof sihCrowdAlertEngine !== "undefined") {
      sihCrowdAlertEngine.renderAlertBanner();
    }
  }, 300);
});
