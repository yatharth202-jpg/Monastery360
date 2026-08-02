import React, { useState } from 'react';
import { MONASTERIES } from '../data/monasteries';

export default function AuditExport({ reports, t }) {
  const [selectedMonastery, setSelectedMonastery] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredReports = reports.filter(r => {
    if (selectedMonastery !== 'all' && r.monasteryId !== selectedMonastery) return false;
    if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Control Bar (Hidden during Print) */}
      <div className="no-print bg-monastery-slate p-6 rounded-3xl border border-monastery-gold/40 shadow-2xl text-monastery-cream space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-monastery-gold">{t.audit.title}</h2>
            <p className="text-xs text-monastery-cream/70">{t.audit.subtitle}</p>
          </div>

          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-xl bg-monastery-gold hover:bg-amber-400 text-monastery-maroon font-serif font-extrabold text-sm flex items-center gap-2 shadow-gold-glow hover:scale-105 transition-all self-start md:self-auto"
          >
            <i className="fa-solid fa-print text-base"></i>
            <span>{t.audit.printBtn}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-monastery-gold/20 text-xs">
          <div>
            <label className="block text-monastery-gold font-bold mb-1">{t.audit.filterMonastery}</label>
            <select
              value={selectedMonastery}
              onChange={(e) => setSelectedMonastery(e.target.value)}
              className="w-full bg-monastery-slate-card border border-monastery-gold/40 text-monastery-cream p-2.5 rounded-xl"
            >
              <option value="all">{t.common.filterAll}</option>
              {MONASTERIES.map((m) => (
                <option key={m.id} value={m.id}>{m.name.en}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-monastery-gold font-bold mb-1">{t.audit.filterStatus}</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-monastery-slate-card border border-monastery-gold/40 text-monastery-cream p-2.5 rounded-xl"
            >
              <option value="all">All Statuses</option>
              <option value="pending">{t.status.pending}</option>
              <option value="verified">{t.status.verified}</option>
              <option value="resolved">{t.status.resolved}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Official Printable Report Container */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-3xl border-2 border-monastery-gold/40 shadow-2xl space-y-8 font-sans">
        
        {/* Official Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-monastery-maroon text-monastery-gold flex items-center justify-center text-3xl font-serif border-2 border-monastery-gold shadow-md">
              🛕
            </div>
            <div>
              <h1 className="font-serif font-extrabold text-xl sm:text-2xl text-slate-900 uppercase tracking-wide">
                Government of Sikkim
              </h1>
              <p className="text-xs font-bold text-slate-700">Ecclesiastical Affairs Department & Tourism Directorate</p>
              <p className="text-[11px] text-slate-500 font-mono">SIH25061 Heritage Preservation Audit Ledger</p>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-600 text-right space-y-1">
            <p><strong>Audit Ref:</strong> SK-HERITAGE-2026-AUD</p>
            <p><strong>Generated Date:</strong> {currentDate}</p>
            <p><strong>Jurisdiction:</strong> Sikkim Circle (ASI / State)</p>
          </div>
        </div>

        {/* Audit Executive Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-500 font-bold uppercase">Audited Records</p>
            <p className="font-serif font-extrabold text-2xl text-slate-900">{filteredReports.length}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-700 font-bold uppercase">Critical Threats</p>
            <p className="font-serif font-extrabold text-2xl text-red-700">
              {filteredReports.filter(r => r.severityKey === 'critical').length}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-blue-700 font-bold uppercase">Trust Verified</p>
            <p className="font-serif font-extrabold text-2xl text-blue-700">
              {filteredReports.filter(r => r.status === 'verified').length}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-emerald-700 font-bold uppercase">Restored</p>
            <p className="font-serif font-extrabold text-2xl text-emerald-700">
              {filteredReports.filter(r => r.status === 'resolved').length}
            </p>
          </div>
        </div>

        {/* Audit Breakdown Table */}
        <div className="overflow-x-auto border rounded-2xl border-slate-300">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 border-b border-slate-300 font-serif font-bold text-slate-800">
              <tr>
                <th className="p-3.5">{t.audit.tableMonastery}</th>
                <th className="p-3.5">{t.audit.tableCategory}</th>
                <th className="p-3.5">{t.audit.tableSeverity}</th>
                <th className="p-3.5">{t.audit.tableAuthority}</th>
                <th className="p-3.5">{t.audit.tableStatus}</th>
                <th className="p-3.5">{t.audit.tableDate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              {filteredReports.map((rep) => {
                const mon = MONASTERIES.find(m => m.id === rep.monasteryId);
                return (
                  <tr key={rep.id} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">{mon?.name.en || rep.monasteryId}</td>
                    <td className="p-3.5">{t.categories[rep.categoryKey] || rep.categoryKey}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rep.severityKey === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rep.severityKey.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px]">{rep.routing?.code || 'ASI'}</td>
                    <td className="p-3.5 font-semibold text-slate-700">{rep.status.toUpperCase()}</td>
                    <td className="p-3.5 font-mono text-[11px]">{rep.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Official Inspector Signoff Footer */}
        <div className="pt-8 border-t-2 border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-700">
          <div className="space-y-1">
            <p className="font-bold text-slate-900">Verified & Authenticated by:</p>
            <p>Archaeological Survey of India (Sikkim Circle Conservator)</p>
            <p className="text-[10px] text-slate-500">Government of Sikkim Tourism Heritage Cell</p>
          </div>

          <div className="text-center sm:text-right space-y-2">
            <div className="w-48 border-b-2 border-slate-900 mx-auto sm:ml-auto"></div>
            <p className="font-serif font-bold text-slate-900">{t.audit.inspectorSignature}</p>
            <p className="text-[10px] text-slate-500 font-mono">SEAL & DATE</p>
          </div>
        </div>

      </div>

    </div>
  );
}
