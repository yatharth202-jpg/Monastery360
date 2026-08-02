import React from 'react';
import { SeverityBadge, StatusBadge } from './StatBadge';

export default function DuplicateDetector({ duplicates, onUpvoteExisting, onProceedNew, t }) {
  if (!duplicates || duplicates.length === 0) return null;

  return (
    <div className="bg-amber-950/90 border-2 border-amber-500 rounded-2xl p-5 shadow-2xl space-y-4 animate-fadeIn my-6 text-monastery-cream">
      
      {/* Alert Header */}
      <div className="flex items-start gap-3 border-b border-amber-500/30 pb-3">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400 flex items-center justify-center text-lg shrink-0">
          <i className="fa-solid fa-copy"></i>
        </div>
        <div>
          <h4 className="font-serif font-bold text-lg text-amber-300">{t.duplicate.title}</h4>
          <p className="text-xs text-amber-200/80">{t.duplicate.subtitle}</p>
        </div>
      </div>

      {/* Duplicate Cards List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {duplicates.map((dup) => (
          <div key={dup.id} className="bg-monastery-slate/90 p-4 rounded-xl border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
              <span className="font-mono text-monastery-gold font-bold">{dup.id}</span>
              <div className="flex items-center gap-2">
                <SeverityBadge severityKey={dup.severityKey} t={t} upvotes={dup.upvotes} />
                <StatusBadge statusKey={dup.status} t={t} />
              </div>
            </div>
            
            <p className="text-xs text-monastery-cream line-clamp-2">{dup.description}</p>
            
            <div className="flex items-center justify-between pt-2 border-t border-monastery-gold/10 text-xs">
              <span className="text-monastery-cream/70">
                <i className="fa-solid fa-users me-1 text-monastery-gold"></i>
                {t.duplicate.duplicateCount} <strong className="text-white font-bold">{dup.upvotes}</strong>
              </span>

              <button
                onClick={() => onUpvoteExisting(dup.id)}
                className="bg-monastery-gold hover:bg-amber-400 text-monastery-maroon font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                <i className="fa-solid fa-thumbs-up"></i>
                <span>{t.duplicate.upvoteExisting}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Choice Buttons */}
      <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs text-amber-200/70 italic">Upvoting helps escalate existing issues faster!</span>
        <button
          onClick={onProceedNew}
          className="px-4 py-2 bg-monastery-maroon hover:bg-monastery-maroon-light border border-monastery-gold/40 text-monastery-cream text-xs font-semibold rounded-lg transition-all"
        >
          {t.duplicate.continueNew}
        </button>
      </div>

    </div>
  );
}
