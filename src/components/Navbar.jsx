import React, { useState, useEffect } from 'react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  currentLang, 
  setCurrentLang, 
  themeMode, 
  setThemeMode, 
  t, 
  isTrustMode, 
  setIsTrustMode 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Monasteries', icon: 'fa-shapes' },
    { id: 'feed', label: 'Community Feed', icon: 'fa-fire' },
    { id: 'report', label: 'Report Decay', icon: 'fa-circle-plus' },
    { id: 'dashboard', label: 'Decay Timeline', icon: 'fa-timeline' },
    { id: 'audit', label: 'Heritage Audit', icon: 'fa-file-invoice' },
    { id: 'admin', label: 'Trust Verifier', icon: 'fa-shield-halved' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳', label: 'हि' },
    { code: 'ne', name: 'नेपाली (Nepali)', flag: '🇳🇵', label: 'ने' },
    { code: 'si', name: 'སིཀྐིམ (Sikkimese)', flag: '🏔️', label: 'སི' },
    { code: 'dz', name: 'རྫོང་ཁ (Bhutani)', flag: '🇧🇹', label: 'རྫ' },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵', label: '日' },
    { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳', label: '中' },
    { code: 'fr', name: 'Français (French)', flag: '🇫🇷', label: 'FR' }
  ];

  const toggleTheme = () => {
    const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 w-full ${
      scrolled 
        ? 'bg-[#0B0C10]/95 backdrop-blur-2xl border-b border-monastery-gold/40 shadow-2xl py-2' 
        : 'bg-gradient-to-b from-[#0B0C10]/95 via-[#0B0C10]/80 to-transparent py-3'
    }`}>
      
      {/* 5-Color International Buddhist Flag Top Ribbon */}
      <div className="h-1.5 w-full buddhist-flag-ribbon"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Flag Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-6 h-6 rounded-lg buddhist-flag-corner-badge flex items-center justify-center shadow-md text-[10px] font-bold text-white shrink-0" title="International Buddhist Flag">
              ☸
            </div>

            <div 
              className="flex items-center gap-2.5 cursor-pointer group hover-3d-lift" 
              onClick={() => setActivePage('home')}
            >
              <div className="w-10 h-10 rounded-2xl maroon-gradient border-2 border-monastery-gold flex items-center justify-center shadow-gold-glow group-hover:rotate-6 transition-all duration-300">
                <span className="text-xl">🛕</span>
              </div>

              <div className="flex flex-col">
                <span className="font-serif font-extrabold text-xl tracking-wider flex items-center gap-1">
                  MONASTERY<span className="text-monastery-gold gold-gradient-text">360</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-monastery-turquoise-light font-mono font-bold -mt-1">
                  Heritage Guardian
                </span>
              </div>
            </div>
          </div>

          {/* Symmetrical Nav Links */}
          <nav className="hidden lg:flex items-center gap-2 bg-[#171926]/90 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-monastery-gold/30 shadow-xl">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 hover-3d-lift ${
                    isActive
                      ? 'bg-monastery-gold text-monastery-maroon font-extrabold shadow-gold-glow scale-105'
                      : 'text-monastery-cream/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} ${isActive ? 'text-monastery-maroon' : 'text-monastery-gold'}`}></i>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities (Theme Switcher, Search, Language, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* THEME MODE TOGGLE BUTTON (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-xl bg-[#171926]/90 border border-monastery-gold/40 text-monastery-gold hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold shadow-md hover-3d-lift"
              title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              <span className="text-sm">{themeMode === 'dark' ? '☀️' : '🌙'}</span>
              <span className="hidden md:inline-block font-mono uppercase text-[11px]">
                {themeMode === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* Search Toggle */}
            <div className="relative flex items-center">
              {searchActive ? (
                <div className="flex items-center bg-[#1D1F2D]/95 border border-monastery-gold/60 rounded-xl px-3 py-1.5 shadow-lg backdrop-blur-md animate-fadeIn">
                  <i className="fa-solid fa-magnifying-glass text-monastery-gold text-xs me-2"></i>
                  <input
                    type="text"
                    placeholder="Search murals, roofs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs focus:outline-none w-28 sm:w-40"
                    autoFocus
                  />
                  <button onClick={() => setSearchActive(false)} className="text-monastery-cream/60 hover:text-white ms-2 text-xs hover-3d-lift">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchActive(true)}
                  className="p-2.5 rounded-xl bg-[#171926]/90 border border-monastery-gold/30 text-monastery-gold hover:text-white hover:border-monastery-gold transition-all hover-3d-lift"
                  title="Search Reports"
                >
                  <i className="fa-solid fa-magnifying-glass text-sm"></i>
                </button>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 bg-[#171926]/90 hover:bg-[#222538] border border-monastery-gold/40 px-3 py-2 rounded-xl text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all hover-3d-lift">
                <i className="fa-solid fa-globe text-monastery-gold"></i>
                <span className="uppercase tracking-wider font-mono">{languages.find(l => l.code === currentLang)?.label || 'EN'}</span>
                <i className="fa-solid fa-chevron-down text-[10px] text-monastery-gold"></i>
              </button>

              <div className="absolute right-0 mt-2 w-52 bg-[#171926]/95 backdrop-blur-2xl border-2 border-monastery-gold/40 rounded-2xl shadow-2xl overflow-hidden hidden group-hover:block z-50 max-h-72 overflow-y-auto animate-fadeIn">
                <div className="p-1.5 space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang.code)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs rounded-xl text-left transition-all hover-3d-lift ${
                        currentLang === lang.code
                          ? 'bg-monastery-gold text-monastery-maroon font-extrabold shadow-md'
                          : 'text-monastery-cream hover:bg-monastery-maroon-light'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {currentLang === lang.code && <i className="fa-solid fa-check text-monastery-maroon text-xs"></i>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Avatar & Name */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all hover-3d-lift ${
                  isTrustMode ? 'border-amber-400 bg-amber-500/20' : 'border-monastery-gold/40 bg-[#171926]/90'
                }`}
                title="User Profile Options"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-monastery-maroon via-monastery-gold to-monastery-turquoise flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {isTrustMode ? '🛡️' : '🧘'}
                </div>

                <span className="text-xs font-bold text-white hidden sm:inline-block max-w-[120px] truncate">
                  {isTrustMode ? 'Officer Sharma' : 'Tenzin Norbu'}
                </span>

                <i className="fa-solid fa-caret-down text-monastery-gold text-xs"></i>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#171926]/95 backdrop-blur-2xl border-2 border-monastery-gold/40 rounded-2xl shadow-2xl overflow-hidden z-50 p-3.5 space-y-3 animate-fadeIn text-xs text-monastery-cream">
                  <div className="flex items-center gap-3 border-b border-monastery-gold/20 pb-2.5">
                    <div className="w-10 h-10 rounded-xl maroon-gradient border border-monastery-gold flex items-center justify-center text-lg">
                      {isTrustMode ? '🛡️' : '🧘'}
                    </div>
                    <div>
                      <p className="font-bold text-white">{isTrustMode ? 'Officer Sharma' : 'Tenzin Norbu'}</p>
                      <p className="text-[10px] text-monastery-gold font-mono">{isTrustMode ? 'ASI Conservator (Trust Admin)' : 'Local Monk / Visitor'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsTrustMode(!isTrustMode);
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-monastery-maroon/70 hover:bg-monastery-maroon text-monastery-gold font-bold border border-monastery-gold/30 hover-3d-lift"
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-repeat"></i>
                      <span>Switch to {isTrustMode ? 'Public Visitor Mode' : 'Trust Admin Mode'}</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#171926] border border-monastery-gold/40 text-monastery-gold hover-3d-lift"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#171926]/95 backdrop-blur-2xl border-b-2 border-monastery-gold/40 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activePage === item.id
                  ? 'bg-monastery-gold text-monastery-maroon font-extrabold shadow-gold-glow'
                  : 'text-monastery-cream hover:bg-monastery-maroon-dark'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-monastery-gold`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
