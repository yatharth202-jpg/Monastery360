import React, { useState, useEffect } from 'react';
import { getMonasteryRatings, addMonasteryRating } from '../data/storage';

export default function MonasteryDetailDrawer({ monastery, isOpen, onClose, setActivePage, setSelectedMonasteryId, t }) {
  const [userStars, setUserStars] = useState(5);
  const [userReviewText, setUserReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [ratingsList, setRatingsList] = useState([]);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  useEffect(() => {
    if (monastery) {
      setRatingsList(getMonasteryRatings(monastery.id));
    }
  }, [monastery]);

  if (!monastery || !isOpen) return null;

  const langKey = t.lang || 'en';
  const mName = monastery.name[langKey] || monastery.name.en;

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (userReviewText.trim()) {
      const updated = addMonasteryRating(monastery.id, userStars, userReviewText, userName || "Visitor");
      setRatingsList(updated);
      setUserReviewText('');
      setRatingSuccess(true);
      setTimeout(() => setRatingSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* Backdrop Click to Close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Right-Side Pop-Out 3D Glass Detail Panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#14151E]/95 backdrop-blur-2xl border-l-2 border-monastery-gold/50 shadow-2xl h-full overflow-y-auto p-6 space-y-6 text-monastery-cream z-10 animate-section-open">
        
        {/* Header & Close Button */}
        <div className="flex items-center justify-between border-b border-monastery-gold/30 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛕</span>
            <div>
              <span className="text-[10px] font-mono text-monastery-gold font-extrabold uppercase tracking-widest">
                Monastery360 Pop-Out Inspector
              </span>
              <h3 className="font-serif font-extrabold text-lg text-white gold-gradient-text">{mName}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-monastery-slate border border-monastery-gold/40 text-monastery-gold hover:text-white flex items-center justify-center hover-3d-lift"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Monastery Image Billboard */}
        <div className="relative h-48 rounded-2xl overflow-hidden border border-monastery-gold/40 shadow-xl">
          <img src={monastery.image} alt={mName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14151E] via-transparent to-transparent"></div>
          
          <div className="absolute top-3 left-3">
            <span className="bg-monastery-maroon-dark/90 text-monastery-gold text-[11px] font-extrabold px-3 py-1 rounded-full border border-monastery-gold/50 backdrop-blur-md">
              Built {monastery.builtYear}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <span className="text-[10px] text-monastery-gold font-bold uppercase tracking-wider">{monastery.district}</span>
              <p className="text-xs text-white/90 font-medium">{monastery.sect} Sect</p>
            </div>
          </div>
        </div>

        {/* Description & Overview */}
        <div className="space-y-2">
          <h4 className="font-serif font-bold text-xs text-monastery-gold uppercase tracking-wider">Historical Overview</h4>
          <p className="text-xs text-monastery-cream/85 leading-relaxed font-sans">{monastery.description[langKey] || monastery.description.en}</p>
        </div>

        {/* Health Score Gauge Bar */}
        <div className="bg-[#1C1E2B] p-4 rounded-2xl border border-monastery-gold/30 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-monastery-cream">Structural Health Score:</span>
            <span className="text-monastery-gold font-mono text-sm">{monastery.healthScore}%</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-monastery-gold/30">
            <div 
              className={`h-full ${monastery.healthScore > 75 ? 'bg-teal-400' : monastery.healthScore > 65 ? 'bg-amber-400' : 'bg-monastery-gold'}`}
              style={{ width: `${monastery.healthScore}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-monastery-cream/60 text-right">Risk Level: <span className="text-monastery-gold font-bold">{monastery.riskLevel}</span></p>
        </div>

        {/* Heritage Assets List */}
        {monastery.keyAssets && (
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-xs text-monastery-gold uppercase tracking-wider">Sacred Heritage Assets</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {monastery.keyAssets.map((asset, idx) => (
                <div key={idx} className="bg-[#1C1E2B] p-2.5 rounded-xl border border-monastery-gold/20 flex items-center gap-2 text-monastery-cream/90">
                  <i className="fa-solid fa-gem text-monastery-gold text-[10px]"></i>
                  <span className="truncate">{asset}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              setSelectedMonasteryId(monastery.id);
              setActivePage('report');
              onClose();
            }}
            className="py-3 bg-monastery-gold hover:bg-yellow-400 text-monastery-maroon font-bold text-xs rounded-xl shadow-gold-glow hover-3d-lift flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>Report Decay</span>
          </button>

          <button
            onClick={() => {
              setSelectedMonasteryId(monastery.id);
              setActivePage('dashboard');
              onClose();
            }}
            className="py-3 bg-monastery-turquoise hover:bg-monastery-turquoise-dark text-white font-bold text-xs rounded-xl shadow-turquoise-glow hover-3d-lift flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-chart-pie"></i>
            <span>Open Dashboard</span>
          </button>
        </div>

        {/* Visitor Rating & Community Reviews Module */}
        <div className="pt-4 border-t border-monastery-gold/20 space-y-4">
          <h4 className="font-serif font-bold text-xs text-monastery-gold uppercase tracking-wider flex items-center gap-1.5">
            <span>⭐ Visitor Ratings ({ratingsList.length})</span>
          </h4>

          {/* Rating Input Form */}
          <form onSubmit={handleRatingSubmit} className="bg-[#1C1E2B] p-4 rounded-2xl border border-monastery-gold/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-monastery-cream/80 font-medium">Rate Experience:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserStars(star)}
                    className={`text-xl ${star <= userStars ? 'text-monastery-gold' : 'text-slate-600'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#12131A] border border-monastery-gold/30 text-xs text-white"
            />

            <textarea
              rows={2}
              placeholder="Write your review or atmosphere observations..."
              value={userReviewText}
              onChange={(e) => setUserReviewText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#12131A] border border-monastery-gold/30 text-xs text-white focus:outline-none"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full py-2 bg-monastery-gold text-monastery-maroon font-bold text-xs rounded-xl shadow-gold-glow hover-3d-lift"
            >
              Submit Rating
            </button>

            {ratingSuccess && (
              <p className="text-[11px] text-emerald-400 font-bold text-center">Rating saved successfully!</p>
            )}
          </form>

          {/* Existing Ratings List */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {ratingsList.map((r, idx) => (
              <div key={idx} className="bg-[#1C1E2B] p-3 rounded-xl border border-monastery-gold/20 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{r.author}</span>
                  <span className="text-monastery-gold font-bold">{"★".repeat(r.stars)}</span>
                </div>
                <p className="text-monastery-cream/80 italic font-sans">"{r.review}"</p>
                <p className="text-[10px] text-monastery-cream/40 font-mono text-right">{r.date}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
