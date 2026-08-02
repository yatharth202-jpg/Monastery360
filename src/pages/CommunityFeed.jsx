import React, { useState } from 'react';
import { MONASTERIES, getMonasteryById } from '../data/monasteries';
import { upvoteReport, getUpvotedReportIds } from '../data/storage';
import { SeverityBadge, StatusBadge } from '../components/StatBadge';
import AIAnalysisBadge from '../components/AIAnalysisBadge';
import AdoptRepairModal from '../components/AdoptRepairModal';

export default function CommunityFeed({ reports, onReportUpdated, onOpenDrawer, t }) {
  const [filterMonastery, setFilterMonastery] = useState('all');
  const [sortBy, setSortBy] = useState('upvotes');
  const [upvotedIds, setUpvotedIds] = useState(() => getUpvotedReportIds());
  const [adoptModalReport, setAdoptModalReport] = useState(null);

  const handleUpvote = (reportId) => {
    const res = upvoteReport(reportId);
    if (res.success) {
      setUpvotedIds(getUpvotedReportIds());
      onReportUpdated();
    }
  };

  let filteredReports = reports.filter((r) => {
    if (filterMonastery !== 'all' && r.monasteryId !== filterMonastery) return false;
    return true;
  });

  if (sortBy === 'upvotes') {
    filteredReports.sort((a, b) => b.upvotes - a.upvotes);
  } else if (sortBy === 'recent') {
    filteredReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === 'priority') {
    const pRank = { critical: 3, high: 2, medium: 1 };
    filteredReports.sort((a, b) => (pRank[b.severityKey] || 0) - (pRank[a.severityKey] || 0));
  }

  return (
    <div className="space-y-10 animate-section-open pb-16">
      
      {/* Feed Banner */}
      <section className="glass-3d-panel p-8 sm:p-12 rounded-3xl border-2 border-monastery-gold/40 shadow-2xl space-y-4 text-monastery-cream">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-monastery-gold font-bold bg-monastery-gold/20 px-3 py-1 rounded-full border border-monastery-gold/40">
              Community Watch & Public Transparency
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white gold-gradient-text">
              Community Alerts Feed
            </h1>
            <p className="text-xs sm:text-sm text-monastery-cream/80 leading-relaxed font-sans">
              Upvote observed structural decay, track verified repairs, or adopt a monastery restoration project.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-3d-card p-4 rounded-2xl text-center">
              <span className="text-xs text-monastery-cream/60 font-medium">Total Alerts</span>
              <p className="font-serif text-2xl font-extrabold text-white">{reports.length}</p>
            </div>
            <div className="glass-3d-card p-4 rounded-2xl text-center">
              <span className="text-xs text-monastery-gold font-medium">Community Upvotes</span>
              <p className="font-serif text-2xl font-extrabold text-monastery-gold">
                {reports.reduce((acc, r) => acc + r.upvotes, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-4 border-t border-monastery-gold/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-monastery-cream/70 font-bold me-2">Monastery:</span>
            <button
              onClick={() => setFilterMonastery('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all hover-3d-lift ${
                filterMonastery === 'all'
                  ? 'bg-monastery-gold text-monastery-maroon shadow-md'
                  : 'bg-monastery-slate text-monastery-cream/80 hover:bg-slate-700'
              }`}
            >
              All Monasteries
            </button>
            {MONASTERIES.map((m) => (
              <button
                key={m.id}
                onClick={() => setFilterMonastery(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover-3d-lift ${
                  filterMonastery === m.id
                    ? 'bg-monastery-gold text-monastery-maroon shadow-md'
                    : 'bg-monastery-slate text-monastery-cream/80 hover:bg-slate-700'
                }`}
              >
                {m.name.en}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-monastery-cream/70 font-bold me-1">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-monastery-slate border border-monastery-gold/30 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="upvotes">Most Upvoted ("I Observed This")</option>
              <option value="recent">Most Recent Reports</option>
              <option value="priority">Highest Priority First</option>
            </select>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredReports.map((r) => {
          const monastery = getMonasteryById(r.monasteryId);
          const hasUpvoted = upvotedIds.includes(r.id);

          return (
            <div
              key={r.id}
              className="glass-3d-card rounded-3xl p-6 space-y-5 flex flex-col justify-between hover-3d-lift"
            >
              <div className="space-y-4">
                
                {/* Card Top Info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <button
                      onClick={() => onOpenDrawer && onOpenDrawer(monastery)}
                      className="group flex items-center gap-2 hover-3d-lift text-left"
                    >
                      <span className="text-sm">🛕</span>
                      <span className="font-serif font-extrabold text-base text-white group-hover:text-monastery-gold transition-colors">
                        {monastery?.name?.en}
                      </span>
                      <i className="fa-solid fa-up-right-from-square text-[10px] text-monastery-gold opacity-70"></i>
                    </button>
                    <p className="text-[11px] font-mono text-monastery-cream/60 mt-0.5">{r.id} • {r.createdAt}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <SeverityBadge severityKey={r.severityKey} t={t} upvotes={r.upvotes} />
                    <StatusBadge statusKey={r.status} t={t} />
                  </div>
                </div>

                {/* Photo Thumbnail */}
                {r.photo?.hasPhoto && (
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-monastery-gold/30">
                    <img src={r.photo.thumbnailUrl} alt="Decay observation photo" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 bg-slate-900/90 text-monastery-gold text-[10px] px-2.5 py-1 rounded-full font-mono border border-monastery-gold/40">
                      📷 Photo Verified
                    </div>
                  </div>
                )}

                <p className="text-xs text-monastery-cream/90 font-sans leading-relaxed">
                  {r.description}
                </p>

                {/* AI Analysis Scan */}
                <AIAnalysisBadge aiScan={r.photo?.aiScan} categoryKey={r.categoryKey} />

                {/* Govt Routing Tag */}
                <div className="bg-[#14151E] p-3 rounded-xl border border-monastery-gold/20 text-xs space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-monastery-gold font-bold">Auto-Routed Authority:</span>
                  <p className="text-white font-bold">{r.routing?.agency}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-monastery-gold/20 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleUpvote(r.id)}
                  disabled={hasUpvoted}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover-3d-lift ${
                    hasUpvoted
                      ? 'bg-monastery-gold/20 text-monastery-gold border border-monastery-gold/50 cursor-default'
                      : 'bg-monastery-gold hover:bg-yellow-400 text-monastery-maroon shadow-gold-glow'
                  }`}
                >
                  <i className="fa-solid fa-thumbs-up"></i>
                  <span>{hasUpvoted ? 'Upvoted' : 'I Observed This'} ({r.upvotes})</span>
                </button>

                <button
                  onClick={() => setAdoptModalReport(r)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-monastery-turquoise hover:bg-monastery-turquoise-dark text-white font-bold text-xs shadow-turquoise-glow hover-3d-lift"
                >
                  <i className="fa-solid fa-hand-holding-heart text-monastery-gold"></i>
                  <span>Adopt Repair</span>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Adopt Modal */}
      {adoptModalReport && (
        <AdoptRepairModal
          report={adoptModalReport}
          onClose={() => setAdoptModalReport(null)}
          t={t}
        />
      )}

    </div>
  );
}
