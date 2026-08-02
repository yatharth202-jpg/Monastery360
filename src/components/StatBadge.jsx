import React from 'react';

export function SeverityBadge({ severityKey, t, upvotes = 0 }) {
  const isUrgent = upvotes >= 15;

  if (isUrgent) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 border border-amber-200 shadow-gold-glow animate-pulse">
        <i className="fa-solid fa-triangle-exclamation text-slate-950"></i>
        {t.severity.urgent}
      </span>
    );
  }

  // Refined palette: Replaced harsh aggressive red with Velvet Sangria / Terracotta Clay & Lapis Turquoise
  const styles = {
    critical: "bg-gradient-to-r from-monastery-maroon-light via-monastery-maroon to-monastery-maroon-dark text-amber-100 border-monastery-gold/50 shadow-md",
    medium: "bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-amber-100 border-amber-500/60 shadow-sm",
    low: "bg-gradient-to-r from-monastery-turquoise-dark to-monastery-turquoise text-teal-100 border-monastery-turquoise-light/50"
  };

  const icons = {
    critical: "fa-fire-flame-curved text-monastery-gold",
    medium: "fa-triangle-exclamation text-amber-300",
    low: "fa-circle-info text-teal-200"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[severityKey] || styles.low}`}>
      <i className={`fa-solid ${icons[severityKey] || icons.low}`}></i>
      {t.severity[severityKey] || severityKey}
    </span>
  );
}

export function StatusBadge({ statusKey, t }) {
  const styles = {
    pending: "bg-monastery-slate-card/90 text-amber-300 border-amber-500/50 backdrop-blur-md",
    verified: "bg-monastery-turquoise-dark/95 text-teal-100 border-monastery-turquoise-light/60 shadow-turquoise-glow backdrop-blur-md",
    resolved: "bg-emerald-950/90 text-emerald-100 border-emerald-500/60 backdrop-blur-md"
  };

  const icons = {
    pending: "fa-clock-rotate-left text-amber-400",
    verified: "fa-certificate text-teal-300",
    resolved: "fa-circle-check text-emerald-400"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[statusKey] || styles.pending}`}>
      <i className={`fa-solid ${icons[statusKey] || icons.pending}`}></i>
      {t.status[statusKey] || statusKey}
    </span>
  );
}
