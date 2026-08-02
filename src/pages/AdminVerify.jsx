import React, { useState } from 'react';
import { MONASTERIES } from '../data/monasteries';

import { SeverityBadge, StatusBadge } from '../components/StatBadge';
import { updateReportStatus } from '../data/storage';

export default function AdminVerify({ reports, onReportUpdated, t }) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [verifierNotes, setVerifierNotes] = useState({});

  const filteredReports = reports.filter(r => {
    if (selectedStatusFilter !== 'all' && r.status !== selectedStatusFilter) return false;
    return true;
  });

  const handleStatusChange = (repId, newStatus) => {
    const note = verifierNotes[repId] || '';
    updateReportStatus(repId, newStatus, note);
    if (onReportUpdated) onReportUpdated();
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Header Bar */}
      <div className="bg-monastery-slate p-6 rounded-3xl border-2 border-amber-500 shadow-2xl text-monastery-cream space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-2xl font-bold border border-amber-300 shadow-gold-glow animate-pulse">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-2xl text-monastery-gold">{t.nav.admin}</h2>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                TRUST & GOVT AUTH
              </span>
            </div>
            <p className="text-xs text-monastery-cream/80">
              Verification workflow for Monastery Trustees & ASI Heritage Conservation Officers
            </p>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 pt-2 text-xs flex-wrap">
          <span className="text-monastery-gold font-bold me-2">Filter View:</span>
          <button
            onClick={() => setSelectedStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              selectedStatusFilter === 'all' ? 'bg-monastery-gold text-monastery-maroon font-bold' : 'bg-monastery-slate-card text-monastery-cream/80'
            }`}
          >
            All Reports ({reports.length})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              selectedStatusFilter === 'pending' ? 'bg-monastery-gold text-monastery-maroon font-bold' : 'bg-monastery-slate-card text-monastery-cream/80'
            }`}
          >
            Pending Review ({reports.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setSelectedStatusFilter('verified')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              selectedStatusFilter === 'verified' ? 'bg-monastery-gold text-monastery-maroon font-bold' : 'bg-monastery-slate-card text-monastery-cream/80'
            }`}
          >
            Trust Verified ({reports.filter(r => r.status === 'verified').length})
          </button>
        </div>
      </div>

      {/* Verification Queue Cards */}
      <div className="space-y-4">
        {filteredReports.map((rep) => {
          const monastery = MONASTERIES.find(m => m.id === rep.monasteryId) || MONASTERIES[0];

          return (
            <div 
              key={rep.id} 
              className="bg-white p-6 rounded-3xl border border-monastery-gold/30 shadow-monastery space-y-4 text-monastery-slate"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b pb-3">
                <div>
                  <span className="font-mono font-bold text-monastery-gold-dark text-sm">{rep.id}</span>
                  <h3 className="font-serif font-bold text-base text-monastery-maroon">{monastery.name.en}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <SeverityBadge severityKey={rep.severityKey} t={t} upvotes={rep.upvotes} />
                  <StatusBadge statusKey={rep.status} t={t} />
                </div>
              </div>

              <p className="text-xs font-sans leading-relaxed">{rep.description}</p>

              {/* Photo & AI Scan Badge */}
              {rep.photo?.hasPhoto && (
                <div className="bg-monastery-cream p-3 rounded-xl border border-monastery-gold/20 flex items-center gap-3 text-xs">
                  <img src={rep.photo.thumbnailUrl} alt="Damage evidence" className="w-12 h-12 object-cover rounded-lg border" />
                  <div>
                    <p className="font-bold text-monastery-maroon">{rep.photo.filename}</p>
                    {rep.photo.aiScan && (
                      <p className="text-[11px] text-emerald-700 font-medium">
                        AI Scan: {rep.photo.aiScan.damageType} ({rep.photo.aiScan.confidence}%)
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Verifier Notes Text Input */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-monastery-slate/80">Verifier Conservator Note:</label>
                <input
                  type="text"
                  placeholder="e.g. Site inspection verified by Lama Trustee on Aug 1. ASI team scheduled."
                  value={verifierNotes[rep.id] || ''}
                  onChange={(e) => setVerifierNotes({ ...verifierNotes, [rep.id]: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-monastery-gold/40 text-xs bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Status Transition Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 flex-wrap text-xs">
                <span className="font-bold text-monastery-maroon me-2">Transition Status:</span>

                <button
                  onClick={() => handleStatusChange(rep.id, 'pending')}
                  className={`px-3 py-1.5 rounded-lg border font-semibold ${
                    rep.status === 'pending' ? 'bg-amber-100 border-amber-500 font-bold' : 'bg-slate-50 hover:bg-amber-50'
                  }`}
                >
                  Pending Review
                </button>

                <button
                  onClick={() => handleStatusChange(rep.id, 'verified')}
                  className={`px-3 py-1.5 rounded-lg border font-semibold ${
                    rep.status === 'verified' ? 'bg-blue-100 text-blue-900 border-blue-600 font-bold' : 'bg-slate-50 hover:bg-blue-50'
                  }`}
                >
                  <i className="fa-solid fa-check me-1"></i>
                  Verify by Trust
                </button>

                <button
                  onClick={() => handleStatusChange(rep.id, 'resolved')}
                  className={`px-3 py-1.5 rounded-lg border font-semibold ${
                    rep.status === 'resolved' ? 'bg-emerald-100 text-emerald-900 border-emerald-600 font-bold' : 'bg-slate-50 hover:bg-emerald-50'
                  }`}
                >
                  <i className="fa-solid fa-wand-magic-sparkles me-1"></i>
                  Mark Resolved
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
