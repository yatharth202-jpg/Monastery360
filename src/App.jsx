import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MonasteriesGrid from './components/MonasteriesGrid';
import CommunityFeed from './components/CommunityFeed';
import ReportDecayForm from './components/ReportDecayForm';
import DecayTimeline from './components/DecayTimeline';
import HeritageAuditReport from './components/HeritageAuditReport';
import TrustVerifierAdmin from './components/TrustVerifierAdmin';
import DrawerPopout from './components/DrawerPopout';
import { MONASTERIES_DATA } from './data/monasteries';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [monasteries, setMonasteries] = useState(MONASTERIES_DATA);
  const [selectedMonastery, setSelectedMonastery] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedTheme = localStorage.getItem('monastery360_theme');
    if (savedTheme === 'light') setIsDarkMode(false);
    
    const savedLang = localStorage.getItem('monastery360_lang');
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('monastery360_theme', newTheme ? 'dark' : 'light');
    if (!newTheme) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('monastery360_lang', lang);
  };

  const openMonasteryDrawer = (monastery) => {
    setSelectedMonastery(monastery);
    setDrawerOpen(true);
  };

  return (
    <div class={`min-h-screen flex flex-col justify-between ${isDarkMode ? 'bg-[#0B0C10] text-[#FAF7F2]' : 'bg-[#F6F3EC] text-[#0B0C10]'}`}>
      <!-- International Buddhist 5-Color Flag Ribbon -->
      <div class="buddhist-flag-ribbon"></div>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={handleLanguageChange}
      />

      <main class="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
        {activeTab === 'home' && (
          <MonasteriesGrid 
            monasteries={monasteries} 
            onSelectMonastery={openMonasteryDrawer} 
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'feed' && <CommunityFeed monasteries={monasteries} />}
        {activeTab === 'report' && <ReportDecayForm monasteries={monasteries} setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && <DecayTimeline monasteries={monasteries} />}
        {activeTab === 'audit' && <HeritageAuditReport monasteries={monasteries} />}
        {activeTab === 'admin' && <TrustVerifierAdmin monasteries={monasteries} />}
      </main>

      <DrawerPopout 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        monastery={selectedMonastery}
        setActiveTab={setActiveTab}
      />

      <Footer />
    </div>
  );
}
