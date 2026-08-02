import React, { useState, useEffect } from 'react';
import { MONASTERIES } from '../data/monasteries';
import { APP_CONFIG } from '../config/appConfig';
import { getMonasteryRatings, addMonasteryRating } from '../data/storage';

export default function Home({ reports, setActivePage, setSelectedMonasteryId, onOpenDrawer, t }) {
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [selectedDetailMonastery, setSelectedDetailMonastery] = useState(MONASTERIES[0]);

  // Visitor Rating State
  const [userStars, setUserStars] = useState(5);
  const [userReviewText, setUserReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [ratingsList, setRatingsList] = useState([]);
  const [ratingSubmittedMsg, setRatingSubmittedMsg] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIdx((prev) => (prev + 1) % APP_CONFIG.buddhistQuotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedDetailMonastery) {
      setRatingsList(getMonasteryRatings(selectedDetailMonastery.id));
    }
  }, [selectedDetailMonastery]);

  const handleMonasteryCardClick = (m) => {
    setSelectedDetailMonastery(m);
    setSelectedMonasteryId(m.id);
    if (onOpenDrawer) onOpenDrawer(m);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (selectedDetailMonastery && userReviewText.trim()) {
      const updated = addMonasteryRating(
        selectedDetailMonastery.id,
        userStars,
        userReviewText,
        userName || "Visitor"
      );
      setRatingsList(updated);
      setUserReviewText('');
      setRatingSubmittedMsg(true);
      setTimeout(() => setRatingSubmittedMsg(false), 3000);
    }
  };

  const totalIssues = reports.length;
  const criticalCount = reports.filter(r => r.severityKey === 'critical' || r.upvotes >= 15).length;
  const verifiedCount = reports.filter(r => r.status === 'verified').length;
  const avgHealth = Math.round(MONASTERIES.reduce((acc, m) => acc + m.healthScore, 0) / MONASTERIES.length);

  const activeQuote = APP_CONFIG.buddhistQuotes[currentQuoteIdx];
  const langKey = t.lang || 'en';

  const featuredFeatures = [
    {
      id: 'report',
      title: 'Report Heritage Decay',
      subtitle: '5-Step Guided Stepper with AI Pre-Scan & Govt Routing',
      icon: 'fa-triangle-exclamation',
      tag: 'Core Feature',
      badgeBg: 'bg-monastery-gold text-monastery-maroon font-bold'
    },
    {
      id: 'dashboard',
      title: 'Monastery Health & Timeline',
      subtitle: 'Inspect health scores & monsoon decay historical trends',
      icon: 'fa-chart-pie',
      tag: 'Signature Visual',
      badgeBg: 'bg-monastery-turquoise text-white font-bold'
    },
    {
      id: 'feed',
      title: 'Community Verification Feed',
      subtitle: 'Upvote observations & adopt heritage repairs',
      icon: 'fa-layer-group',
      tag: 'Community Watch',
      badgeBg: 'bg-monastery-maroon text-monastery-gold border border-monastery-gold/40 font-bold'
    },
    {
      id: 'audit',
      title: 'Sikkim State Heritage Audit',
      subtitle: 'Printable audit report for ASI & Tourism Department',
      icon: 'fa-file-invoice',
      tag: 'Official Export',
      badgeBg: 'bg-slate-800 text-teal-300 font-bold'
    }
  ];

  return (
    <div className="bg-tourism-3d-fit min-h-screen w-full space-y-16 animate-section-open pb-20">
      
      {/* 3D Tourism Hero Billboard */}
      <section className="relative rounded-3xl overflow-hidden glass-3d-panel p-8 sm:p-14 lg:p-16 border-2 border-monastery-gold/50 shadow-2xl text-monastery-cream animate-section-open">
        
        <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1600')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10] via-[#0B0C10]/85 to-transparent"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-monastery-gold/20 backdrop-blur-md border border-monastery-gold/60 text-monastery-gold text-xs font-extrabold uppercase tracking-widest shadow-gold-glow animate-float-3d">
            <span className="w-2.5 h-2.5 rounded-full bg-monastery-gold animate-ping"></span>
            Monastery360 • SIH25061 Heritage Guardian
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight gold-gradient-text">
            {t.hero.title}
          </h1>

          <p className="text-sm sm:text-base text-monastery-cream/90 leading-relaxed max-w-2xl font-sans font-medium">
            {t.hero.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActivePage('report')}
              className="px-7 py-4 rounded-2xl bg-monastery-gold hover:bg-yellow-400 text-monastery-maroon-dark font-serif font-extrabold text-sm sm:text-base flex items-center gap-3 shadow-gold-glow hover-3d-lift"
            >
              <i className="fa-solid fa-camera-retro text-xl text-monastery-maroon"></i>
              <span>Launch Decay Reporting Flow</span>
            </button>

            <button
              onClick={() => setActivePage('feed')}
              className="px-7 py-4 rounded-2xl bg-monastery-turquoise/80 hover:bg-monastery-turquoise backdrop-blur-md border border-monastery-turquoise-light/50 text-white font-serif font-bold text-sm sm:text-base flex items-center gap-2 shadow-turquoise-glow hover-3d-lift"
            >
              <i className="fa-solid fa-fire text-monastery-gold"></i>
              <span>View Community Alerts Feed</span>
            </button>
          </div>
        </div>
      </section>

      {/* Buddhist Wisdom Quote Banner */}
      <section className="glass-3d-card p-6 sm:p-8 rounded-3xl border-2 border-monastery-gold/40 shadow-2xl text-monastery-cream space-y-3 relative overflow-hidden animate-section-open">
        <div className="flex items-center gap-3 border-b border-monastery-gold/20 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-monastery-gold/20 text-monastery-gold border border-monastery-gold/40 flex items-center justify-center text-xl shadow-gold-glow">
            ☸
          </div>
          <span className="font-serif font-extrabold text-xs text-monastery-gold uppercase tracking-widest">
            Himalayan Heritage Wisdom & Mindfulness
          </span>
        </div>

        <blockquote className="font-serif italic text-base sm:text-lg text-white leading-relaxed pt-1">
          "{activeQuote.quote}"
        </blockquote>

        <div className="flex items-center justify-between text-xs text-monastery-cream/70 pt-1 font-sans">
          <span>— <strong className="text-monastery-gold">{activeQuote.author}</strong> ({activeQuote.source})</span>
          <span className="text-[10px] bg-monastery-gold/10 px-2.5 py-1 rounded-full border border-monastery-gold/30 text-monastery-gold font-mono">
            Quote {currentQuoteIdx + 1} of {APP_CONFIG.buddhistQuotes.length}
          </span>
        </div>
      </section>

      {/* Feature Directory Modules */}
      <section className="space-y-6 animate-section-open">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-extrabold text-2xl text-white flex items-center gap-2">
            <i className="fa-solid fa-cubes text-monastery-gold"></i>
            <span className="gold-gradient-text">Module Features Directory</span>
          </h3>
          <span className="text-xs text-monastery-cream/70 font-mono">Click any 3D card to launch module</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredFeatures.map((feat) => (
            <div
              key={feat.id}
              onClick={() => setActivePage(feat.id)}
              className="glass-3d-card p-6 rounded-3xl cursor-pointer flex flex-col justify-between group hover-3d-lift"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl maroon-gradient border border-monastery-gold flex items-center justify-center text-monastery-gold text-xl shadow-md group-hover:rotate-12 transition-transform">
                    <i className={`fa-solid ${feat.icon}`}></i>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full uppercase ${feat.badgeBg}`}>
                    {feat.tag}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-extrabold text-base text-white group-hover:text-monastery-gold transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-monastery-cream/80 mt-1 leading-relaxed">
                    {feat.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-monastery-gold/20 flex items-center justify-between text-xs font-bold text-monastery-turquoise-light group-hover:translate-x-1 transition-transform">
                <span>Launch Feature</span>
                <i className="fa-solid fa-arrow-right text-[11px]"></i>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Heritage Live Statistics */}
      <section className="space-y-6 animate-section-open">
        <div className="text-center space-y-1">
          <h3 className="font-serif font-extrabold text-2xl text-white flex items-center justify-center gap-2">
            <i className="fa-solid fa-chart-pie text-monastery-gold"></i>
            <span className="gold-gradient-text">Real-Time Heritage Health Index</span>
          </h3>
          <p className="text-xs text-monastery-cream/70">Live community alerts & conservator audits</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 text-monastery-cream hover-3d-lift">
            <p className="text-xs text-monastery-gold font-bold uppercase tracking-wider">{t.stats.totalIssues}</p>
            <p className="font-serif text-4xl font-extrabold text-white">{totalIssues}</p>
            <p className="text-[11px] text-monastery-cream/60">Across 6 Monasteries</p>
          </div>

          <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 text-amber-100 hover-3d-lift">
            <p className="text-xs text-monastery-gold font-bold uppercase tracking-wider">{t.stats.criticalCount}</p>
            <p className="font-serif text-4xl font-extrabold text-white">{criticalCount}</p>
            <p className="text-[11px] text-amber-200/80">Priority Conservation Alerts</p>
          </div>

          <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 text-teal-100 hover-3d-lift">
            <p className="text-xs text-teal-300 font-bold uppercase tracking-wider">{t.stats.verifiedCount}</p>
            <p className="font-serif text-4xl font-extrabold text-white">{verifiedCount}</p>
            <p className="text-[11px] text-teal-200/80">Verified by Monastery Trust</p>
          </div>

          <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 text-emerald-100 hover-3d-lift">
            <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider">{t.stats.healthIndex}</p>
            <p className="font-serif text-4xl font-extrabold text-white">{avgHealth}%</p>
            <p className="text-[11px] text-emerald-200/80">Structural Index</p>
          </div>
        </div>
      </section>

      {/* Monasteries Directory & RIGHT SIDE QUICK DETAIL DRAWER TOGGLE */}
      <section className="space-y-8 animate-section-open">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-serif font-extrabold text-3xl text-white">
              Monasteries Directory
            </h2>
            <p className="text-xs text-monastery-cream/70 mt-1">
              Click any monastery to open its 3D pop-out details on the right corner.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: MONASTERY CARDS GRID (2 Cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {MONASTERIES.map((m) => {
              const mReports = reports.filter(r => r.monasteryId === m.id);
              const openCount = mReports.filter(r => r.status !== 'resolved').length;
              const isSelected = selectedDetailMonastery.id === m.id;
              const mName = m.name[langKey] || m.name.en;

              return (
                <div 
                  key={m.id}
                  onClick={() => handleMonasteryCardClick(m)}
                  className={`glass-3d-card rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between group hover-3d-lift ${
                    isSelected ? 'ring-2 ring-monastery-gold border-monastery-gold shadow-gold-glow' : ''
                  }`}
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={m.image} 
                        alt={mName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/40 to-transparent opacity-90"></div>
                      
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="bg-monastery-maroon-dark/90 text-monastery-gold border border-monastery-gold/50 text-[11px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                          Built {m.builtYear}
                        </span>
                      </div>

                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <span className="text-[10px] uppercase tracking-widest text-monastery-gold font-extrabold">{m.district}</span>
                        <h3 className="font-serif font-extrabold text-xl text-white group-hover:text-monastery-gold transition-colors">{mName}</h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <p className="text-xs text-monastery-cream/80 leading-relaxed line-clamp-2">{m.description[langKey] || m.description.en}</p>
                      
                      <div className="flex items-center justify-between text-xs pt-3 border-t border-monastery-gold/20">
                        <span className="text-monastery-cream/70 font-semibold">Health Score:</span>
                        <span className="font-extrabold text-monastery-gold font-mono text-sm">{m.healthScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-[#171926]/90 border-t border-monastery-gold/20 flex items-center justify-between text-xs font-bold">
                    <span className="text-monastery-cream">
                      Open Alerts: <strong className="text-monastery-gold font-extrabold text-sm">{openCount}</strong>
                    </span>

                    <span className="text-monastery-turquoise-light group-hover:translate-x-1.5 transition-transform flex items-center gap-1.5 font-serif">
                      <span>Pop-Out Details</span>
                      <i className="fa-solid fa-up-right-from-square text-[11px]"></i>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE MONASTERY QUICK INSPECTOR PANEL */}
          <div className="lg:col-span-1 glass-3d-panel p-6 rounded-3xl border-2 border-monastery-gold/50 shadow-2xl space-y-5 sticky top-28 text-monastery-cream">
            
            <div className="flex items-center justify-between border-b border-monastery-gold/20 pb-3">
              <span className="text-[10px] font-mono text-monastery-gold font-bold uppercase tracking-widest flex items-center gap-1">
                <i className="fa-solid fa-circle-info"></i> Right Inspector Panel
              </span>
              <span className="bg-monastery-gold/20 text-monastery-gold text-[10px] px-2 py-0.5 rounded font-extrabold">
                {selectedDetailMonastery.district}
              </span>
            </div>

            <div className="relative h-44 rounded-2xl overflow-hidden border border-monastery-gold/30">
              <img 
                src={selectedDetailMonastery.image} 
                alt={selectedDetailMonastery.name.en}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] to-transparent opacity-85"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-serif font-extrabold text-lg text-white gold-gradient-text">
                  {selectedDetailMonastery.name[langKey] || selectedDetailMonastery.name.en}
                </h3>
              </div>
            </div>

            <p className="text-xs text-monastery-cream/85 leading-relaxed">
              {selectedDetailMonastery.description[langKey] || selectedDetailMonastery.description.en}
            </p>

            <div className="space-y-2 text-xs pt-2 border-t border-monastery-gold/20">
              <div className="flex justify-between">
                <span className="text-monastery-cream/60">Built Year:</span>
                <strong className="text-monastery-gold">{selectedDetailMonastery.builtYear}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-monastery-cream/60">Sect Order:</span>
                <strong className="text-white">{selectedDetailMonastery.sect}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-monastery-cream/60">Authority:</span>
                <strong className="text-teal-300 font-mono text-[11px]">{selectedDetailMonastery.defaultAuthority}</strong>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-monastery-gold/20">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-monastery-cream">Health Score Index:</span>
                <span className="text-monastery-gold font-mono">{selectedDetailMonastery.healthScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-monastery-gold/30">
                <div 
                  className={`h-full ${selectedDetailMonastery.healthScore > 75 ? 'bg-teal-400' : selectedDetailMonastery.healthScore > 65 ? 'bg-amber-400' : 'bg-monastery-gold'}`}
                  style={{ width: `${selectedDetailMonastery.healthScore}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleMonasteryCardClick(selectedDetailMonastery)}
                className="w-full py-3 bg-monastery-gold hover:bg-yellow-400 text-monastery-maroon font-bold text-xs rounded-xl shadow-gold-glow hover-3d-lift flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-up-right-from-square"></i>
                <span>Pop-Out 3D Details & Reviews</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Visitor Rating & Community Reviews Module */}
      <section className="glass-3d-panel p-8 sm:p-12 rounded-3xl border-2 border-monastery-gold/40 shadow-2xl space-y-8 text-monastery-cream animate-section-open">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-monastery-gold/30 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <h3 className="font-serif font-extrabold text-2xl text-white gold-gradient-text">
                Visitor Ratings & Decay Reporting for {selectedDetailMonastery.name.en}
              </h3>
            </div>
            <p className="text-xs text-monastery-cream/70 mt-1">
              Share your visitor experience or log an urgent preservation alert for this site.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedMonasteryId(selectedDetailMonastery.id);
              setActivePage('report');
            }}
            className="px-6 py-3 rounded-2xl bg-monastery-gold hover:bg-yellow-400 text-monastery-maroon font-serif font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-gold-glow hover-3d-lift shrink-0"
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>Report Issue for {selectedDetailMonastery.name.en}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <form onSubmit={handleRatingSubmit} className="glass-3d-card p-6 rounded-2xl border border-monastery-gold/30 space-y-4">
            <h4 className="font-serif font-bold text-sm text-monastery-gold uppercase tracking-wider">
              Add Your Visitor Rating & Review
            </h4>

            <div className="space-y-1">
              <label className="block text-xs text-monastery-cream/80 font-medium">Select Rating:</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserStars(star)}
                    className={`text-2xl transition-transform hover-3d-lift ${
                      star <= userStars ? 'text-monastery-gold scale-110' : 'text-slate-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-xs font-mono text-monastery-gold font-bold ms-2">{userStars} / 5 Stars</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs text-monastery-cream/80 font-medium">Your Name (Optional):</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Tenzin L."
                className="w-full p-3 rounded-xl bg-[#12131A] border border-monastery-gold/30 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs text-monastery-cream/80 font-medium">Review & Observations:</label>
              <textarea
                rows={3}
                value={userReviewText}
                onChange={(e) => setUserReviewText(e.target.value)}
                placeholder="Share your experience about preservation, atmosphere, or visitor facilities..."
                className="w-full p-3 rounded-xl bg-[#12131A] border border-monastery-gold/30 text-xs text-white focus:outline-none focus:ring-1 focus:ring-monastery-gold"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-monastery-turquoise hover:bg-monastery-turquoise-dark text-white font-bold text-xs rounded-xl shadow-turquoise-glow hover-3d-lift flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-paper-plane"></i>
              <span>Submit Visitor Rating</span>
            </button>

            {ratingSubmittedMsg && (
              <p className="text-xs text-emerald-400 font-bold text-center animate-fadeIn">
                Thank you! Your visitor rating has been recorded.
              </p>
            )}
          </form>

          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-monastery-gold uppercase tracking-wider">
              Community Visitor Reviews ({ratingsList.length})
            </h4>

            {ratingsList.length === 0 ? (
              <div className="bg-[#12131A]/80 p-8 rounded-2xl border border-monastery-gold/20 text-center text-xs text-monastery-cream/60 space-y-2">
                <i className="fa-solid fa-star text-2xl text-monastery-gold"></i>
                <p>No ratings submitted yet for this monastery. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {ratingsList.map((rat, idx) => (
                  <div key={idx} className="bg-[#12131A]/90 p-4 rounded-xl border border-monastery-gold/20 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{rat.author}</span>
                      <span className="text-monastery-gold font-bold">
                        {"★".repeat(rat.stars)} <span className="text-monastery-cream/50 text-[10px]">({rat.stars}/5)</span>
                      </span>
                    </div>
                    <p className="text-monastery-cream/80 italic font-sans">"{rat.review}"</p>
                    <p className="text-[10px] text-monastery-cream/50 font-mono pt-1 text-right">{rat.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </section>

    </div>
  );
}
