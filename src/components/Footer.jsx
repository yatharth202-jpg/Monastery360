import React from 'react';

export default function Footer({ setActivePage, t }) {
  return (
    <footer className="bg-monastery-maroon-deep text-monastery-cream/80 border-t-2 border-monastery-gold/40 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg maroon-gradient border border-monastery-gold flex items-center justify-center">
                <span className="text-xl">🛕</span>
              </div>
              <span className="font-serif text-lg font-bold gold-gradient-text">Monastery360 — Heritage Guardian</span>
            </div>
            <p className="text-xs leading-relaxed text-monastery-cream/70 max-w-md">
              Community Alert & Heritage Decay Reporting Module developed for Smart India Hackathon (SIH25061) in partnership with the Government of Sikkim. Protecting ancient Nyingma and Kagyu sacred heritage sites through community verification, AI pre-analysis, and official government routing.
            </p>
            <div className="flex items-center gap-3 text-xs text-monastery-gold">
              <span className="px-2.5 py-1 bg-monastery-gold/10 border border-monastery-gold/30 rounded-full">ASI Sikkim Circle</span>
              <span className="px-2.5 py-1 bg-monastery-gold/10 border border-monastery-gold/30 rounded-full">Tourism Dept, Gangtok</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-monastery-gold uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-monastery-gold transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-monastery-gold"></i>
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('report')} className="hover:text-monastery-gold transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-monastery-gold"></i>
                  {t.nav.report}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-monastery-gold transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-monastery-gold"></i>
                  {t.nav.dashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('feed')} className="hover:text-monastery-gold transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-monastery-gold"></i>
                  {t.nav.feed}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('audit')} className="hover:text-monastery-gold transition-colors flex items-center gap-1.5">
                  <i className="fa-solid fa-chevron-right text-[10px] text-monastery-gold"></i>
                  {t.nav.audit}
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Helpline */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-monastery-gold uppercase tracking-wider">Heritage Helplines</h4>
            <div className="space-y-2 text-xs">
              <div className="bg-monastery-slate/80 p-2.5 rounded-lg border border-monastery-gold/20 space-y-1">
                <p className="font-semibold text-white">Ecclesiastical Affairs Control</p>
                <p className="text-monastery-gold"><i className="fa-solid fa-phone me-1"></i> 03592-203310</p>
              </div>
              <div className="bg-monastery-slate/80 p-2.5 rounded-lg border border-monastery-gold/20 space-y-1">
                <p className="font-semibold text-white">Monastery Tourism Cell</p>
                <p className="text-monastery-gold"><i className="fa-solid fa-phone me-1"></i> 03592-209090</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Attribution */}
        <div className="mt-8 pt-6 border-t border-monastery-gold/20 text-center text-xs text-monastery-cream/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Monastery360 • Government of Sikkim Heritage Preservation Module (SIH25061)</p>
          <p className="flex items-center gap-2">
            <span>Quota-Safe Offline LocalStorage Architecture</span>
            <span>•</span>
            <span className="text-monastery-gold font-mono text-[11px]">v1.0-SIH</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
