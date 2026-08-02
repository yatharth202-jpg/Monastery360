import React, { useState } from 'react';
import { MONASTERIES, getGovernmentRoutingAuthority } from '../data/monasteries';

import AIAnalysisBadge from '../components/AIAnalysisBadge';
import DuplicateDetector from '../components/DuplicateDetector';
import { checkDuplicates, addReport } from '../data/storage';

export default function ReportFlow({ reports, onReportCreated, setActivePage, t }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedMonasteryId, setSelectedMonasteryId] = useState('rumtek');
  const [categoryKey, setCategoryKey] = useState('mural');
  const [severityKey, setSeverityKey] = useState('medium');
  const [description, setDescription] = useState('');
  const [reporterRole, setReporterRole] = useState('tourist');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState('');
  
  // Photo & AI Scan State
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoFilename, setPhotoFilename] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [aiScanResult, setAiScanResult] = useState(null);

  // Duplicate Check State
  const [duplicates, setDuplicates] = useState([]);
  const [submittedReport, setSubmittedReport] = useState(null);

  const categoriesList = [
    { key: 'mural', label: t.categories.mural, icon: 'fa-palette' },
    { key: 'woodenPillar', label: t.categories.woodenPillar, icon: 'fa-tree' },
    { key: 'manuscript', label: t.categories.manuscript, icon: 'fa-book-bible' },
    { key: 'roofLeak', label: t.categories.roofLeak, icon: 'fa-cloud-showers-heavy' },
    { key: 'stoneSculpture', label: t.categories.stoneSculpture, icon: 'fa-monument' },
    { key: 'electricalSafety', label: t.categories.electricalSafety, icon: 'fa-bolt' }
  ];

  const rolesList = [
    { key: 'tourist', label: t.roles.tourist, icon: 'fa-camera' },
    { key: 'monk', label: t.roles.monk, icon: 'fa-hands-praying' },
    { key: 'staff', label: t.roles.staff, icon: 'fa-building-columns' },
    { key: 'asiOfficial', label: t.roles.asiOfficial, icon: 'fa-user-shield' }
  ];

  const currentMonastery = MONASTERIES.find(m => m.id === selectedMonasteryId) || MONASTERIES[0];
  const routingAuthority = getGovernmentRoutingAuthority(selectedMonasteryId, categoryKey);

  // Handle Photo Selector Simulation
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setHasPhoto(true);
      setPhotoFilename(file.name);
      setIsScanning(true);
    }
  };

  const handleSimulateDefaultPhoto = () => {
    setHasPhoto(true);
    setPhotoFilename(`${selectedMonasteryId}_decay_sample_${Date.now().toString().slice(-4)}.jpg`);
    setIsScanning(true);
  };

  // Step 3 -> Step 4: Run Duplicate Detector
  const handleProceedToDuplicateCheck = () => {
    const foundDups = checkDuplicates(selectedMonasteryId, categoryKey);
    setDuplicates(foundDups);
    setCurrentStep(4);
  };

  // Final Submit Handler
  const handleSubmitReport = () => {
    const payload = {
      monasteryId: selectedMonasteryId,
      categoryKey,
      severityKey,
      description: description || `Decay observation at ${currentMonastery.name.en}`,
      reporterRole,
      isAnonymous,
      reporterName: isAnonymous ? "Anonymous Reporter" : (reporterName || "Community Member"),
      hasPhoto,
      filename: photoFilename,
      thumbnailUrl: hasPhoto ? "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400" : "",
      aiScan: aiScanResult,
      routing: routingAuthority
    };

    const newReport = addReport(payload);
    setSubmittedReport(newReport);
    if (onReportCreated) onReportCreated(newReport);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <h2 className="font-serif font-extrabold text-2xl sm:text-4xl text-monastery-maroon">
          {t.nav.report}
        </h2>
        <p className="text-xs text-monastery-slate/80">
          Guided 5-step community report for Sikkimese Monastery preservation
        </p>
      </div>

      {/* Stepper Glass Progress Bar */}
      <div className="bg-monastery-slate-card/90 backdrop-blur-xl p-4 rounded-2xl border-2 border-monastery-gold/40 shadow-xl">
        <div className="grid grid-cols-5 gap-2 text-center text-[10px] sm:text-xs font-bold">
          {[1, 2, 3, 4, 5].map((stepNum) => {
            const isActive = currentStep === stepNum;
            const isDone = currentStep > stepNum;
            return (
              <button
                key={stepNum}
                onClick={() => isDone && setCurrentStep(stepNum)}
                className={`py-2.5 px-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
                  isActive
                    ? 'bg-monastery-gold text-monastery-maroon font-extrabold shadow-gold-glow scale-105'
                    : isDone
                    ? 'bg-monastery-gold/20 text-monastery-gold border border-monastery-gold/40'
                    : 'bg-monastery-slate/80 text-monastery-cream/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  isActive ? 'bg-monastery-maroon text-monastery-gold' : 'bg-monastery-slate text-monastery-cream'
                }`}>
                  {isDone ? <i className="fa-solid fa-check text-[9px]"></i> : stepNum}
                </div>
                <span className="hidden sm:block truncate max-w-full">
                  {stepNum === 1 && "Monastery"}
                  {stepNum === 2 && "Priority"}
                  {stepNum === 3 && "Photo & AI"}
                  {stepNum === 4 && "Duplicate"}
                  {stepNum === 5 && "Submit"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Select Monastery */}
      {currentStep === 1 && (
        <div className="card-glass p-6 sm:p-8 rounded-3xl border-2 border-monastery-gold/30 shadow-monastery space-y-6 animate-fadeIn">
          <h3 className="font-serif font-bold text-xl text-monastery-maroon flex items-center gap-2">
            <span className="text-xl">🛕</span>
            <span>{t.stepper.step1}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MONASTERIES.map((m) => {
              const isSelected = selectedMonasteryId === m.id;
              const langKey = t.lang || 'en';
              const mName = m.name[langKey] || m.name.en;

              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMonasteryId(m.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-monastery-maroon text-monastery-cream border-monastery-gold shadow-2xl scale-[1.02]'
                      : 'bg-white/90 text-monastery-slate border-monastery-gold/20 hover:border-monastery-gold/60'
                  }`}
                >
                  <img src={m.image} alt={mName} className="w-full h-28 object-cover rounded-xl mb-3 border border-monastery-gold/30" />
                  <h4 className="font-serif font-bold text-sm line-clamp-1">{mName}</h4>
                  <p className="text-[11px] opacity-80 mt-1">{m.district}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 rounded-xl bg-monastery-gold text-monastery-maroon font-serif font-bold text-sm flex items-center gap-2 shadow-gold-glow hover:scale-105 transition-all"
            >
              <span>{t.stepper.next}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Category & Priority */}
      {currentStep === 2 && (
        <div className="card-glass p-6 sm:p-8 rounded-3xl border-2 border-monastery-gold/30 shadow-monastery space-y-8 animate-fadeIn">
          
          {/* Category Selector */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-xl text-monastery-maroon flex items-center gap-2">
              <i className="fa-solid fa-tags text-monastery-gold"></i>
              <span>Select Heritage Category</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categoriesList.map((cat) => {
                const isSelected = categoryKey === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setCategoryKey(cat.key)}
                    className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-monastery-maroon text-monastery-cream border-monastery-gold shadow-md font-bold'
                        : 'bg-white/90 text-monastery-slate border-monastery-gold/20 hover:border-monastery-gold/50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${
                      isSelected ? 'bg-monastery-gold text-monastery-maroon' : 'bg-monastery-cream-warm text-monastery-gold-dark'
                    }`}>
                      <i className={`fa-solid ${cat.icon}`}></i>
                    </div>
                    <span className="text-xs font-semibold">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Levels (Red replaced with Velvet Maroon / Terracotta Clay) */}
          <div className="space-y-4 pt-4 border-t border-monastery-gold/20">
            <h3 className="font-serif font-bold text-xl text-monastery-maroon flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation text-monastery-gold"></i>
              <span>Select Priority Level</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setSeverityKey('low')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  severityKey === 'low'
                    ? 'bg-monastery-turquoise-dark text-teal-100 border-teal-400 shadow-lg font-bold'
                    : 'bg-white/90 text-slate-700 border-slate-200 hover:border-teal-400'
                }`}
              >
                <span className="text-xs uppercase font-bold text-teal-300">Low</span>
                <p className="text-xs mt-1">{t.severity.low}</p>
              </button>

              <button
                type="button"
                onClick={() => setSeverityKey('medium')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  severityKey === 'medium'
                    ? 'bg-amber-950 text-amber-100 border-amber-500 shadow-lg font-bold'
                    : 'bg-white/90 text-slate-700 border-slate-200 hover:border-amber-400'
                }`}
              >
                <span className="text-xs uppercase font-bold text-amber-400">Medium</span>
                <p className="text-xs mt-1">{t.severity.medium}</p>
              </button>

              <button
                type="button"
                onClick={() => setSeverityKey('critical')}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  severityKey === 'critical'
                    ? 'bg-monastery-maroon-dark text-amber-100 border-monastery-gold shadow-lg font-bold'
                    : 'bg-white/90 text-slate-700 border-slate-200 hover:border-monastery-gold'
                }`}
              >
                <span className="text-xs uppercase font-bold text-monastery-gold">High Priority</span>
                <p className="text-xs mt-1">{t.severity.critical}</p>
              </button>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl border border-monastery-gold/40 text-monastery-maroon font-semibold text-xs"
            >
              {t.stepper.back}
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 rounded-xl bg-monastery-gold text-monastery-maroon font-serif font-bold text-sm flex items-center gap-2 shadow-gold-glow hover:scale-105 transition-all"
            >
              <span>{t.stepper.next}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Description, Photo Upload & AI Scan & Reporter Role */}
      {currentStep === 3 && (
        <div className="card-glass p-6 sm:p-8 rounded-3xl border-2 border-monastery-gold/30 shadow-monastery space-y-8 animate-fadeIn">
          
          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="block font-serif font-bold text-base text-monastery-maroon">
              Detailed Decay Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe location (e.g. 1st floor altar, west wing), damage nature (water seepage, termite dust, pigment flaking), and urgent risks..."
              className="w-full p-4 rounded-xl border border-monastery-gold/40 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-monastery-gold bg-white/90 text-monastery-slate shadow-inner"
            ></textarea>
          </div>

          {/* Reporter Role Tag & Anonymous Toggle */}
          <div className="space-y-3 pt-2">
            <label className="block font-serif font-bold text-sm text-monastery-maroon">
              Reporter Identity Role & Traceability
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {rolesList.map((r) => {
                const isSelected = reporterRole === r.key;
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setReporterRole(r.key)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-monastery-maroon text-monastery-cream border-monastery-gold shadow-md font-bold'
                        : 'bg-white/90 text-monastery-slate border-monastery-gold/30 hover:border-monastery-gold'
                    }`}
                  >
                    <i className={`fa-solid ${r.icon} text-monastery-gold`}></i>
                    <span className="truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center gap-3 bg-monastery-cream-warm/90 p-3.5 rounded-xl border border-monastery-gold/30 text-xs">
              <input
                type="checkbox"
                id="anonToggle"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-monastery-gold accent-monastery-gold rounded cursor-pointer"
              />
              <label htmlFor="anonToggle" className="cursor-pointer font-medium text-monastery-slate">
                {t.stepper.anonymousToggleLabel}
              </label>
            </div>

            {!isAnonymous && (
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Your Name (Optional)"
                className="w-full p-3 rounded-xl border border-monastery-gold/30 text-xs bg-white/90 text-monastery-slate"
              />
            )}
          </div>

          {/* Photo Drag & Drop / Simulated Upload & AI Scan */}
          <div className="space-y-3 pt-4 border-t border-monastery-gold/20">
            <label className="block font-serif font-bold text-base text-monastery-maroon">
              Photo Evidence & Simulated AI Pre-Analysis
            </label>

            <div className="border-2 border-dashed border-monastery-gold/60 rounded-2xl p-6 text-center bg-white/90 space-y-3 relative hover:bg-monastery-cream-warm/60 transition-colors">
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-monastery-gold"></i>
              <p className="text-xs font-semibold text-monastery-slate">{t.stepper.uploadPrompt}</p>

              <div className="flex justify-center gap-3">
                <label className="px-4 py-2 bg-monastery-maroon text-monastery-cream rounded-lg text-xs font-bold cursor-pointer hover:bg-monastery-maroon-light transition-all shadow">
                  Browse Photo
                  <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
                </label>

                <button
                  type="button"
                  onClick={handleSimulateDefaultPhoto}
                  className="px-4 py-2 bg-monastery-slate text-monastery-gold border border-monastery-gold/40 rounded-lg text-xs font-semibold hover:bg-monastery-slate-card transition-all"
                >
                  <i className="fa-solid fa-wand-magic-sparkles me-1.5"></i>
                  Use Sample Photo Scan
                </button>
              </div>

              {hasPhoto && (
                <div className="pt-2 text-xs text-emerald-700 font-mono font-bold flex items-center justify-center gap-2">
                  <i className="fa-solid fa-circle-check text-emerald-600"></i>
                  <span>Attached: {photoFilename}</span>
                </div>
              )}
            </div>

            {/* AI Computer Vision Scan Badge */}
            {hasPhoto && (
              <AIAnalysisBadge
                categoryKey={categoryKey}
                isScanning={isScanning}
                onScanComplete={(res) => {
                  setIsScanning(false);
                  setAiScanResult(res);
                }}
              />
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-xl border border-monastery-gold/40 text-monastery-maroon font-semibold text-xs"
            >
              {t.stepper.back}
            </button>

            <button
              onClick={handleProceedToDuplicateCheck}
              className="px-6 py-3 rounded-xl bg-monastery-gold text-monastery-maroon font-serif font-bold text-sm flex items-center gap-2 shadow-gold-glow hover:scale-105 transition-all"
            >
              <span>Check Duplicates & Routing</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Duplicate Detection */}
      {currentStep === 4 && (
        <div className="card-glass p-6 sm:p-8 rounded-3xl border-2 border-monastery-gold/30 shadow-monastery space-y-6 animate-fadeIn">
          <h3 className="font-serif font-bold text-xl text-monastery-maroon flex items-center gap-2">
            <i className="fa-solid fa-shield-cat text-monastery-gold"></i>
            <span>{t.stepper.step4}</span>
          </h3>

          {duplicates.length > 0 ? (
            <DuplicateDetector
              duplicates={duplicates}
              onUpvoteExisting={(repId) => {
                setActivePage('feed');
              }}
              onProceedNew={() => setCurrentStep(5)}
              t={t}
            />
          ) : (
            <div className="bg-monastery-turquoise-dark/95 backdrop-blur-xl text-teal-100 p-6 rounded-2xl border border-teal-500 space-y-2 text-center">
              <i className="fa-solid fa-circle-check text-3xl text-teal-300"></i>
              <h4 className="font-serif font-bold text-lg text-white">No Similar Reports Found</h4>
              <p className="text-xs text-teal-200/80">This appears to be a unique heritage observation for {currentMonastery.name.en}.</p>
              <button
                onClick={() => setCurrentStep(5)}
                className="mt-4 px-6 py-2.5 bg-monastery-gold text-monastery-maroon font-extrabold rounded-xl text-xs shadow-gold-glow"
              >
                Proceed to Dynamic Government Routing
              </button>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl border border-monastery-gold/40 text-monastery-maroon font-semibold text-xs"
            >
              {t.stepper.back}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Dynamic Routing Review & Submit */}
      {currentStep === 5 && (
        <div className="card-glass p-6 sm:p-8 rounded-3xl border-2 border-monastery-gold/30 shadow-monastery space-y-8 animate-fadeIn">
          
          <h3 className="font-serif font-bold text-xl text-monastery-maroon flex items-center gap-2">
            <i className="fa-solid fa-paper-plane text-monastery-gold"></i>
            <span>{t.stepper.step5}</span>
          </h3>

          {/* Dynamic Government Routing Banner */}
          <div className={`p-5 rounded-2xl border-2 space-y-2 text-monastery-cream shadow-xl ${routingAuthority.badgeColor}`}>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-monastery-gold">
              <i className="fa-solid fa-building-flag"></i>
              <span>{t.stepper.routingAuthority}</span>
            </div>

            <h4 className="font-serif font-bold text-lg text-white">{routingAuthority.name}</h4>
            <p className="text-xs opacity-90">{routingAuthority.dept}</p>
            <p className="text-xs font-mono text-monastery-gold pt-1">
              <i className="fa-solid fa-headset me-1.5"></i>
              {routingAuthority.contact}
            </p>
          </div>

          {/* Summary Review Box */}
          <div className="bg-white/90 p-5 rounded-2xl border border-monastery-gold/30 text-xs space-y-3">
            <h5 className="font-serif font-bold text-sm text-monastery-maroon border-b pb-2">Submission Summary</h5>
            
            <div className="grid grid-cols-2 gap-2">
              <div><strong className="text-monastery-slate/70">Monastery:</strong> {currentMonastery.name.en}</div>
              <div><strong className="text-monastery-slate/70">Category:</strong> {t.categories[categoryKey] || categoryKey}</div>
              <div><strong className="text-monastery-slate/70">Priority:</strong> {severityKey.toUpperCase()}</div>
              <div><strong className="text-monastery-slate/70">Role:</strong> {reporterRole} {isAnonymous ? '(Anonymous)' : ''}</div>
            </div>

            {description && (
              <p className="italic text-monastery-slate/90 pt-1 border-t">"{description}"</p>
            )}
          </div>

          {/* Submit Confirmation View */}
          {submittedReport ? (
            <div className="bg-monastery-turquoise-dark/95 backdrop-blur-xl text-teal-100 p-8 rounded-2xl border-2 border-teal-400 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-monastery-turquoise border-2 border-teal-300 text-teal-100 mx-auto flex items-center justify-center text-3xl animate-bounce">
                <i className="fa-solid fa-check"></i>
              </div>

              <h4 className="font-serif font-bold text-2xl text-white">{t.common.successSubmitTitle}</h4>
              <p className="text-xs text-teal-100/90 max-w-md mx-auto">{t.common.successSubmitDesc}</p>
              <p className="font-mono text-xs text-monastery-gold font-bold">Report ID: {submittedReport.id}</p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setActivePage('feed')}
                  className="px-6 py-3 rounded-xl bg-monastery-gold text-monastery-maroon font-serif font-extrabold text-xs shadow-gold-glow"
                >
                  View in Community Feed
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 rounded-xl border border-monastery-gold/40 text-monastery-maroon font-semibold text-xs"
              >
                {t.stepper.back}
              </button>

              <button
                onClick={handleSubmitReport}
                className="px-8 py-4 rounded-2xl bg-monastery-gold hover:bg-amber-400 text-monastery-maroon font-serif font-extrabold text-base flex items-center gap-3 shadow-gold-glow hover:scale-105 transition-all"
              >
                <i className="fa-solid fa-paper-plane text-lg"></i>
                <span>{t.stepper.submit}</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
