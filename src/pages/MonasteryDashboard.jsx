import React, { useState } from 'react';
import { MONASTERIES, getMonasteryById } from '../data/monasteries';
import TimelineView from '../components/TimelineView';

export default function MonasteryDashboard({ selectedMonasteryId, setSelectedMonasteryId, reports, setActivePage, onOpenDrawer, t }) {
  const monastery = getMonasteryById(selectedMonasteryId) || MONASTERIES[0];
  const monasteryReports = reports.filter((r) => r.monasteryId === monastery.id);

  const langKey = t.lang || 'en';
  const mName = monastery.name[langKey] || monastery.name.en;

  const openAlerts = monasteryReports.filter(r => r.status !== 'resolved');

  return (
    <div className="space-y-10 animate-section-open pb-16">
      
      {/* Monastery Header & Selector Pill */}
      <section className="glass-3d-panel p-8 sm:p-12 rounded-3xl border-2 border-monastery-gold/40 shadow-2xl space-y-6 text-monastery-cream">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-monastery-gold overflow-hidden shadow-gold-glow shrink-0">
              <img src={monastery.image} alt={mName} className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-monastery-gold font-bold uppercase tracking-widest">{monastery.district}</span>
                <span className="bg-monastery-gold/20 text-monastery-gold text-[10px] px-2 py-0.5 rounded font-extrabold">Built {monastery.builtYear}</span>
              </div>
              <h1 className="font-serif font-extrabold text-3xl text-white gold-gradient-text">{mName}</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenDrawer && onOpenDrawer(monastery)}
              className="px-5 py-3 rounded-2xl bg-monastery-gold hover:bg-yellow-400 text-monastery-maroon font-bold text-xs shadow-gold-glow hover-3d-lift flex items-center gap-2"
            >
              <i className="fa-solid fa-up-right-from-square"></i>
              <span>Pop-Out 3D Inspector</span>
            </button>

            <button
              onClick={() => setActivePage('report')}
              className="px-5 py-3 rounded-2xl bg-monastery-turquoise hover:bg-monastery-turquoise-dark text-white font-bold text-xs shadow-turquoise-glow hover-3d-lift flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Log New Report</span>
            </button>
          </div>

        </div>

        {/* Monastery Selector Tabs */}
        <div className="pt-4 border-t border-monastery-gold/20 flex flex-wrap gap-2">
          {MONASTERIES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMonasteryId(m.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all hover-3d-lift ${
                selectedMonasteryId === m.id
                  ? 'bg-monastery-gold text-monastery-maroon shadow-md scale-105 font-extrabold'
                  : 'bg-monastery-slate text-monastery-cream/80 hover:bg-slate-700'
              }`}
            >
              {m.name.en}
            </button>
          ))}
        </div>
      </section>

      {/* Key Health Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 hover-3d-lift">
          <span className="text-xs text-monastery-gold font-bold uppercase tracking-wider">Health Score Meter</span>
          <p className="font-serif text-4xl font-extrabold text-white">{monastery.healthScore}%</p>
          <p className="text-[11px] text-monastery-cream/60">Structural Index</p>
        </div>

        <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 hover-3d-lift">
          <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Active Open Alerts</span>
          <p className="font-serif text-4xl font-extrabold text-white">{openAlerts.length}</p>
          <p className="text-[11px] text-amber-200/80">Pending Conservator Action</p>
        </div>

        <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 hover-3d-lift">
          <span className="text-xs text-teal-300 font-bold uppercase tracking-wider">Risk Classification</span>
          <p className="font-serif text-2xl font-extrabold text-teal-300 pt-1">{monastery.riskLevel}</p>
          <p className="text-[11px] text-teal-200/80">Monsoon Vulnerability</p>
        </div>

        <div className="glass-3d-card p-6 rounded-3xl text-center space-y-2 hover-3d-lift">
          <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Default Govt Routing</span>
          <p className="font-serif text-sm font-bold text-emerald-300 pt-2 truncate">{monastery.defaultAuthority}</p>
          <p className="text-[11px] text-emerald-200/80">Nodal Authority</p>
        </div>
      </section>

      {/* Signature Decay & Restoration Timeline */}
      <section className="space-y-4">
        <h2 className="font-serif font-extrabold text-2xl text-white flex items-center gap-2">
          <i className="fa-solid fa-timeline text-monastery-gold"></i>
          <span className="gold-gradient-text">Decay & Restoration Timeline</span>
        </h2>
        
        <TimelineView reports={monasteryReports} monastery={monastery} t={t} />
      </section>

    </div>
  );
}
