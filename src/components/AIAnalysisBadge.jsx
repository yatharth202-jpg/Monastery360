import React, { useState, useEffect } from 'react';

export default function AIAnalysisBadge({ categoryKey, isScanning, onScanComplete }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const categoryScans = {
    mural: {
      damageType: "Mural Pigment Degradation & Moisture Flaking",
      confidence: 94,
      urgency: "CRITICAL",
      action: "Pigment Stabilization & Terrace Waterproofing",
      icon: "fa-palette"
    },
    woodenPillar: {
      damageType: "Insect/Termite Structural Decay & Fiber Wear",
      confidence: 89,
      urgency: "MEDIUM",
      action: "Anti-Termite Inject & Structural Beam Shoring",
      icon: "fa-tree"
    },
    manuscript: {
      damageType: "Fungal Spore Growth & Organic Paper Fragility",
      confidence: 96,
      urgency: "CRITICAL",
      action: "Dehumidified Storage & Vacuum Desiccation",
      icon: "fa-book-bible"
    },
    roofLeak: {
      damageType: "Active Monsoon Water Seepage / Roof Membrane Break",
      confidence: 92,
      urgency: "CRITICAL",
      action: "Emergency Tarpaulin & Terrace Re-tiling",
      icon: "fa-cloud-showers-heavy"
    },
    stoneSculpture: {
      damageType: "Lichen Bio-Erosion & Frost Fracture",
      confidence: 85,
      urgency: "LOW",
      action: "Biocide Micro-cleaning & Sealant Application",
      icon: "fa-monument"
    },
    electricalSafety: {
      damageType: "Thermal Cable Overheat / Uninsulated Fire Hazard",
      confidence: 91,
      urgency: "MEDIUM",
      action: "Fire-Grade Cable Conduit Installation",
      icon: "fa-bolt"
    }
  };

  useEffect(() => {
    if (isScanning) {
      setScanProgress(0);
      setComplete(false);
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setComplete(true);
            const res = categoryScans[categoryKey] || categoryScans.mural;
            setScanResult(res);
            if (onScanComplete) onScanComplete(res);
            return 100;
          }
          return prev + 15;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isScanning, categoryKey]);

  if (!isScanning && !complete && !scanResult) return null;

  return (
    <div className="bg-monastery-slate border border-monastery-gold/40 rounded-xl p-4 shadow-xl relative overflow-hidden text-monastery-cream my-4">
      {/* Simulation Watermark Badge */}
      <div className="flex items-center justify-between border-b border-monastery-gold/20 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-monastery-gold animate-ping"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-monastery-gold">
            <i className="fa-solid fa-microchip me-1.5"></i>
            Simulated AI Pre-Analysis (Demo Simulation)
          </span>
        </div>
        <span className="text-[10px] bg-monastery-gold/20 text-monastery-gold px-2 py-0.5 rounded font-mono">
          Computer Vision v2.4
        </span>
      </div>

      {/* Active Scanning Animation */}
      {isScanning && !complete && (
        <div className="space-y-3 relative py-4 text-center">
          <div className="animate-scan-laser"></div>
          <div className="text-monastery-gold font-serif text-sm font-semibold flex items-center justify-center gap-2">
            <i className="fa-solid fa-spinner animate-spin"></i>
            <span>Analyzing Image Micro-textures & Defect Features...</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-monastery-maroon-dark rounded-full h-2 overflow-hidden border border-monastery-gold/30">
            <div 
              className="bg-gradient-to-r from-monastery-gold to-amber-400 h-full transition-all duration-150"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-monastery-cream/60 font-mono">{scanProgress}% Computed</p>
        </div>
      )}

      {/* Completed Scan Diagnostic Output */}
      {complete && scanResult && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between gap-3 bg-monastery-maroon/60 p-3 rounded-lg border border-monastery-gold/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-monastery-gold/20 border border-monastery-gold/50 flex items-center justify-center text-monastery-gold text-lg">
                <i className={`fa-solid ${scanResult.icon}`}></i>
              </div>
              <div>
                <h5 className="font-semibold text-sm text-white">{scanResult.damageType}</h5>
                <p className="text-xs text-monastery-gold font-mono">
                  Confidence Rating: <strong className="text-white font-bold">{scanResult.confidence}%</strong>
                </p>
              </div>
            </div>
            
            <span className={`px-2.5 py-1 rounded text-[11px] font-bold border ${
              scanResult.urgency === 'CRITICAL' ? 'bg-red-900 text-red-200 border-red-700' : 'bg-amber-900 text-amber-200 border-amber-700'
            }`}>
              {scanResult.urgency}
            </span>
          </div>

          <div className="text-xs space-y-1 bg-monastery-slate-card p-2.5 rounded border border-monastery-gold/20">
            <p className="text-monastery-cream/70 font-semibold">Recommended Preservation Action:</p>
            <p className="text-monastery-gold font-medium flex items-center gap-1.5">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              {scanResult.action}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
