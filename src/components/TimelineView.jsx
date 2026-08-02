import React, { useState } from 'react';
import { SeverityBadge, StatusBadge } from './StatBadge';

export default function TimelineView({ monastery, reports, t }) {
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [activeNode, setActiveNode] = useState(null);

  // Filter reports for this monastery
  const monasteryReports = reports.filter(r => r.monasteryId === monastery.id);

  // Combine reports with seasonal timeline events
  const timelineEvents = [
    {
      id: 'EVT-SEASON-2024-MONSOON',
      type: 'climate_event',
      season: 'monsoon',
      year: '2024',
      date: 'Monsoon 2024 (July - Sept)',
      title: t.timeline.monsoonSpike,
      description: 'Record rainfall (3,200 mm) in Sikkim hills triggered roof dampness across un-plastered monastery terraces.',
      severityKey: 'critical',
      icon: 'fa-cloud-showers-water'
    },
    ...monasteryReports.map(r => ({
      id: r.id,
      type: 'report',
      season: r.createdAt.includes('-07') || r.createdAt.includes('-08') ? 'monsoon' : 'winter',
      year: r.createdAt.split('-')[0],
      date: r.createdAt,
      title: r.description,
      description: `Reported by ${r.reporterName} • Category: ${t.categories[r.categoryKey] || r.categoryKey}`,
      severityKey: r.severityKey,
      status: r.status,
      upvotes: r.upvotes,
      icon: r.categoryKey === 'mural' ? 'fa-palette' : (r.categoryKey === 'roofLeak' ? 'fa-house-crack' : 'fa-scroll'),
      reportObj: r
    })),
    {
      id: 'EVT-RESTORE-2025',
      type: 'restoration_event',
      season: 'winter',
      year: '2025',
      date: 'Nov 2025',
      title: t.timeline.restorationCompleted,
      description: 'Sikkim Ecclesiastical Dept completed timber reinforcing on main entrance frame.',
      severityKey: 'low',
      status: 'resolved',
      icon: 'fa-wand-magic-sparkles'
    }
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredEvents = timelineEvents.filter(e => {
    if (selectedSeason === 'all') return true;
    return e.season === selectedSeason;
  });

  return (
    <div className="bg-monastery-slate border-2 border-monastery-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-monastery-cream">
      
      {/* Timeline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-monastery-gold/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⌛</span>
            <h3 className="font-serif font-extrabold text-xl sm:text-2xl gold-gradient-text">{t.timeline.title}</h3>
          </div>
          <p className="text-xs text-monastery-cream/70 mt-1">{t.timeline.subtitle}</p>
        </div>

        {/* Season Filter Pills */}
        <div className="flex items-center gap-1.5 bg-monastery-slate-card p-1.5 rounded-2xl border border-monastery-gold/30 text-xs">
          <button
            onClick={() => setSelectedSeason('all')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              selectedSeason === 'all' ? 'bg-monastery-gold text-monastery-maroon font-extrabold shadow-md' : 'text-monastery-cream/80 hover:text-white'
            }`}
          >
            All Periods
          </button>
          <button
            onClick={() => setSelectedSeason('monsoon')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              selectedSeason === 'monsoon' ? 'bg-monastery-gold text-monastery-maroon font-extrabold shadow-md' : 'text-monastery-cream/80 hover:text-white'
            }`}
          >
            🌧️ Monsoon Moisture
          </button>
          <button
            onClick={() => setSelectedSeason('winter')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              selectedSeason === 'winter' ? 'bg-monastery-gold text-monastery-maroon font-extrabold shadow-md' : 'text-monastery-cream/80 hover:text-white'
            }`}
          >
            ❄️ Winter & Restorations
          </button>
        </div>
      </div>

      {/* Signature Vertical Interactive Timeline */}
      <div className="relative pl-7 sm:pl-12 space-y-8 before:content-[''] before:absolute before:left-3.5 sm:before:left-5 before:top-3 before:bottom-3 before:w-1.5 before:bg-gradient-to-b before:from-monastery-gold before:via-monastery-turquoise-light before:to-monastery-maroon-light">
        {filteredEvents.map((evt) => {
          const isClimate = evt.type === 'climate_event';
          const isRestore = evt.type === 'restoration_event';

          return (
            <div 
              key={evt.id} 
              className={`relative group transition-all cursor-pointer ${
                activeNode === evt.id ? 'scale-[1.01]' : ''
              }`}
              onClick={() => setActiveNode(evt.id === activeNode ? null : evt.id)}
            >
              {/* Timeline Node Badge Icon */}
              <div className={`absolute -left-7 sm:-left-12 top-0.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm border-2 transition-all shadow-gold-glow ${
                isClimate
                  ? 'bg-red-950 border-red-500 text-red-200 animate-pulse'
                  : isRestore
                  ? 'bg-monastery-turquoise-dark border-teal-400 text-teal-100 shadow-turquoise-glow'
                  : 'bg-monastery-maroon-dark border-monastery-gold text-monastery-gold'
              }`}>
                <i className={`fa-solid ${evt.icon}`}></i>
              </div>

              {/* Event Card Content */}
              <div className={`p-5 rounded-2xl border transition-all ${
                activeNode === evt.id
                  ? 'bg-monastery-maroon-dark/95 border-monastery-gold shadow-2xl ring-2 ring-monastery-gold/40'
                  : 'bg-monastery-slate-card hover:bg-monastery-slate-card/90 border-monastery-gold/25 hover:border-monastery-gold/60'
              }`}>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-monastery-gold font-extrabold">{evt.date}</span>
                    {isClimate && (
                      <span className="bg-red-950 text-red-300 border border-red-700 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">
                        CLIMATE IMPACT
                      </span>
                    )}
                    {isRestore && (
                      <span className="bg-teal-950 text-teal-300 border border-teal-700 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">
                        TRUST INTERVENTION
                      </span>
                    )}
                  </div>

                  {evt.severityKey && <SeverityBadge severityKey={evt.severityKey} t={t} upvotes={evt.upvotes || 0} />}
                </div>

                <h4 className="font-serif font-extrabold text-base text-white mt-2 line-clamp-1">{evt.title}</h4>
                <p className="text-xs text-monastery-cream/80 mt-1">{evt.description}</p>

                {/* Expanded Report Preview */}
                {activeNode === evt.id && evt.reportObj && (
                  <div className="mt-4 pt-4 border-t border-monastery-gold/30 space-y-3 text-xs animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-monastery-gold font-mono font-bold">{evt.reportObj.id}</span>
                      <StatusBadge statusKey={evt.reportObj.status} t={t} />
                    </div>
                    {evt.reportObj.photo?.hasPhoto && (
                      <div className="flex items-center gap-3.5 bg-monastery-slate p-3 rounded-xl border border-monastery-gold/30">
                        <img 
                          src={evt.reportObj.photo.thumbnailUrl} 
                          alt="Damage thumbnail" 
                          className="w-14 h-14 object-cover rounded-lg border border-monastery-gold/40"
                        />
                        <div className="space-y-1">
                          <p className="text-xs text-monastery-gold font-bold flex items-center gap-1.5">
                            <i className="fa-solid fa-camera text-monastery-gold"></i>
                            {evt.reportObj.photo.filename}
                          </p>
                          {evt.reportObj.photo.aiScan && (
                            <p className="text-[11px] text-emerald-400 font-medium">
                              AI Scan: {evt.reportObj.photo.aiScan.damageType} ({evt.reportObj.photo.aiScan.confidence}%)
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
