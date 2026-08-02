import React, { useState } from 'react';
import { getMonasteryById } from '../data/monasteries';
import { adoptRepairPledge } from '../data/storage';

export default function AdoptRepairModal({ report, onClose, onReportAdopted, t }) {
  const [pledgeAmount, setPledgeAmount] = useState(25000);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!report) return null;

  const monastery = getMonasteryById(report.monasteryId);

  const handlePledgeSubmit = (e) => {
    e.preventDefault();
    const res = adoptRepairPledge(report.id, pledgeAmount, sponsorName || "Anonymous Patron");
    if (res.success) {
      setIsSuccess(true);
      if (onReportAdopted) onReportAdopted();
      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-[#171926]/95 backdrop-blur-2xl border-2 border-monastery-gold/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-monastery-cream space-y-6 animate-section-open">
        
        {/* Header & Close Button */}
        <div className="flex items-start justify-between border-b border-monastery-gold/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl maroon-gradient border border-monastery-gold flex items-center justify-center text-monastery-gold text-2xl shadow-gold-glow">
              🤝
            </div>
            <div>
              <span className="text-[10px] font-mono text-monastery-gold font-bold uppercase tracking-widest">
                Sikkim Heritage Trust Sponsorship Handoff
              </span>
              <h3 className="font-serif font-extrabold text-xl text-white gold-gradient-text">
                Adopt-a-Repair Project
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-monastery-slate border border-monastery-gold/40 text-monastery-gold hover:text-white flex items-center justify-center hover-3d-lift"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center text-3xl mx-auto animate-bounce">
              ✓
            </div>
            <h4 className="font-serif font-extrabold text-2xl text-white">Sponsorship Pledge Recorded!</h4>
            <p className="text-xs text-monastery-cream/80 leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-monastery-gold">{sponsorName || "Generous Patron"}</strong>! Your pledge of <strong className="text-emerald-400">₹{pledgeAmount.toLocaleString()}</strong> has been submitted to the Sikkim Monastic Trust conservator team.
            </p>
            <p className="text-[11px] text-monastery-gold font-mono">Tax Exemption Receipt (80G) will be issued to your email.</p>
          </div>
        ) : (
          <form onSubmit={handlePledgeSubmit} className="space-y-5">
            
            {/* Target Issue Overview */}
            <div className="bg-[#12131A] p-4 rounded-2xl border border-monastery-gold/30 space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-monastery-gold">🛕 {monastery?.name?.en}</span>
                <span className="text-monastery-cream/60 font-mono">{report.id}</span>
              </div>
              <p className="text-monastery-cream/90 italic font-sans">"{report.description}"</p>
              <div className="pt-2 border-t border-monastery-gold/20 flex justify-between text-[11px]">
                <span className="text-monastery-cream/70">Estimated Repair Budget:</span>
                <strong className="text-emerald-400 font-mono">₹45,000 INR</strong>
              </div>
            </div>

            {/* Pledge Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-monastery-gold">Select Pledge Amount (INR):</label>
              <div className="grid grid-cols-3 gap-2">
                {[10000, 25000, 45000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setPledgeAmount(amt)}
                    className={`py-2.5 rounded-xl text-xs font-bold font-mono transition-all hover-3d-lift ${
                      pledgeAmount === amt
                        ? 'bg-monastery-gold text-monastery-maroon shadow-gold-glow font-extrabold'
                        : 'bg-[#12131A] text-monastery-cream/80 border border-monastery-gold/30 hover:bg-monastery-maroon/50'
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Form Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-monastery-cream/80 font-medium mb-1">Patron / Sponsor Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Tenzin Norbu Foundation"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#12131A] border border-monastery-gold/30 text-xs text-white focus:outline-none focus:ring-1 focus:ring-monastery-gold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-monastery-cream/80 font-medium mb-1">Email for 80G Tax Exemption Receipt:</label>
                <input
                  type="email"
                  placeholder="patron@heritage.org"
                  value={sponsorEmail}
                  onChange={(e) => setSponsorEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#12131A] border border-monastery-gold/30 text-xs text-white focus:outline-none focus:ring-1 focus:ring-monastery-gold"
                  required
                />
              </div>
            </div>

            {/* Official Bank Account Information Banner */}
            <div className="bg-monastery-maroon/40 p-3.5 rounded-2xl border border-monastery-gold/30 text-[11px] space-y-1">
              <p className="font-bold text-monastery-gold">🏦 Official Sikkim Heritage Conservation Bank Account:</p>
              <p className="text-monastery-cream/80 font-mono">Account Name: Sikkim State Monastic Trust Board</p>
              <p className="text-monastery-cream/80 font-mono">SBI Gangtok Branch • IFSC: SBIN0000232 • A/C: 38492019482</p>
            </div>

            {/* Submit Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 rounded-xl bg-monastery-slate text-monastery-cream/80 text-xs font-bold hover:bg-slate-800 hover-3d-lift"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl bg-monastery-gold hover:bg-yellow-400 text-monastery-maroon font-serif font-extrabold text-xs shadow-gold-glow hover-3d-lift flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-hand-holding-heart"></i>
                <span>Confirm Adoption Pledge</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
