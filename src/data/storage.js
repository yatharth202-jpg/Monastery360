// Quota-Safe LocalStorage Manager for Monastery360
import { INITIAL_REPORTS } from './initialReports';

const STORAGE_KEYS = {
  REPORTS: 'monastery360_reports',
  LANG: 'monastery360_lang',
  UPVOTES: 'monastery360_upvotes',
  TRUST_MODE: 'monastery360_trust_mode',
  RATINGS: 'monastery360_ratings',
  THEME: 'monastery360_theme',
  ADOPTIONS: 'monastery360_adoptions'
};

export function initStorage() {
  try {
    const existingReports = localStorage.getItem(STORAGE_KEYS.REPORTS);
    if (!existingReports) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
    }

    const existingRatings = localStorage.getItem(STORAGE_KEYS.RATINGS);
    if (!existingRatings) {
      const defaultRatings = {
        rumtek: [{ stars: 5, review: "Peaceful atmosphere and breathtaking golden stupa!", author: "Tenzin K.", date: "2026-07-28" }],
        pemayangtse: [{ stars: 5, review: "The 7-tiered Zandog Palri wooden structure is a masterpiece.", author: "Sarah M.", date: "2026-07-25" }],
        tashiding: [{ stars: 4, review: "Sacred energy on the hill. Steps need minor maintenance.", author: "Pema W.", date: "2026-07-20" }]
      };
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(defaultRatings));
    }
  } catch (e) {
    console.error("LocalStorage initialization error:", e);
  }
}

export function getReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return data ? JSON.parse(data) : INITIAL_REPORTS;
  } catch (e) {
    return INITIAL_REPORTS;
  }
}

export function saveReports(reports) {
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  } catch (e) {
    console.error("Error saving reports to LocalStorage:", e);
  }
}

export function addReport(newReportData) {
  const reports = getReports();
  
  const newReport = {
    id: `REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    monasteryId: newReportData.monasteryId,
    categoryKey: newReportData.categoryKey,
    severityKey: newReportData.severityKey,
    description: newReportData.description,
    photo: {
      hasPhoto: newReportData.hasPhoto || false,
      filename: newReportData.filename || (newReportData.hasPhoto ? `heritage_photo_${Date.now()}.jpg` : ""),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      thumbnailUrl: newReportData.thumbnailUrl || (newReportData.hasPhoto ? "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400" : ""),
      aiScan: newReportData.aiScan || null
    },
    reporterRole: newReportData.reporterRole || "tourist",
    isAnonymous: newReportData.isAnonymous || false,
    reporterName: newReportData.isAnonymous ? "Anonymous Reporter" : (newReportData.reporterName || "Community Member"),
    upvotes: 1,
    duplicateCount: 0,
    status: "pending",
    createdAt: new Date().toISOString().split('T')[0],
    routing: newReportData.routing,
    timelineHistory: [
      {
        date: new Date().toISOString().split('T')[0],
        event: "Community decay report logged & routed",
        status: "pending"
      }
    ]
  };

  reports.unshift(newReport);
  saveReports(reports);
  return newReport;
}

export function checkDuplicates(monasteryId, categoryKey) {
  const reports = getReports();
  return reports.filter(r => r.monasteryId === monasteryId && r.categoryKey === categoryKey && r.status !== 'resolved');
}

export function upvoteReport(reportId) {
  const upvotedIds = getUpvotedReportIds();
  if (upvotedIds.includes(reportId)) {
    return { success: false, reason: "already_upvoted" };
  }

  const reports = getReports();
  const index = reports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    reports[index].upvotes += 1;
    saveReports(reports);

    upvotedIds.push(reportId);
    try {
      localStorage.setItem(STORAGE_KEYS.UPVOTES, JSON.stringify(upvotedIds));
    } catch (e) {
      console.error("Error saving upvote token:", e);
    }

    return { success: true, newCount: reports[index].upvotes };
  }

  return { success: false, reason: "not_found" };
}

export function getUpvotedReportIds() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.UPVOTES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function updateReportStatus(reportId, newStatus, verifierNote = "") {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    reports[index].status = newStatus;
    
    const statusLabels = {
      pending: "Returned to Pending Review",
      verified: "Verified by Monastery Trust Conservators",
      resolved: "Restoration Completed & Archived"
    };

    reports[index].timelineHistory.push({
      date: new Date().toISOString().split('T')[0],
      event: verifierNote ? `${statusLabels[newStatus]} (${verifierNote})` : statusLabels[newStatus],
      status: newStatus
    });

    saveReports(reports);
    return reports[index];
  }
  return null;
}

export function adoptRepairPledge(reportId, amount, sponsorName) {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === reportId);
  if (index !== -1) {
    reports[index].adopted = true;
    reports[index].sponsorName = sponsorName || "Anonymous Patron";
    reports[index].pledgeAmount = amount;

    reports[index].timelineHistory.push({
      date: new Date().toISOString().split('T')[0],
      event: `Adopt-a-Repair Pledge of ₹${amount.toLocaleString()} received from ${sponsorName}`,
      status: reports[index].status
    });

    saveReports(reports);
    return { success: true, report: reports[index] };
  }
  return { success: false };
}

export function getMonasteryRatings(monasteryId) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RATINGS);
    const ratingsObj = data ? JSON.parse(data) : {};
    return ratingsObj[monasteryId] || [];
  } catch (e) {
    return [];
  }
}

export function addMonasteryRating(monasteryId, stars, reviewText, authorName) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RATINGS);
    const ratingsObj = data ? JSON.parse(data) : {};
    if (!ratingsObj[monasteryId]) {
      ratingsObj[monasteryId] = [];
    }

    const newRating = {
      stars,
      review: reviewText,
      author: authorName || "Visitor",
      date: new Date().toISOString().split('T')[0]
    };

    ratingsObj[monasteryId].unshift(newRating);
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratingsObj));
    return ratingsObj[monasteryId];
  } catch (e) {
    console.error("Error saving rating:", e);
    return [];
  }
}

export function getSavedLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEYS.LANG) || 'en';
  } catch (e) {
    return 'en';
  }
}

export function setSavedLanguage(langCode) {
  try {
    localStorage.setItem(STORAGE_KEYS.LANG, langCode);
  } catch (e) {
    console.error("Error saving language preference:", e);
  }
}

export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch (e) {
    return 'dark';
  }
}

export function setSavedTheme(themeMode) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, themeMode);
  } catch (e) {
    console.error("Error saving theme preference:", e);
  }
}

export function getTrustMode() {
  try {
    return localStorage.getItem(STORAGE_KEYS.TRUST_MODE) === 'true';
  } catch (e) {
    return false;
  }
}

export function setTrustMode(isTrustAdmin) {
  try {
    localStorage.setItem(STORAGE_KEYS.TRUST_MODE, isTrustAdmin ? 'true' : 'false');
  } catch (e) {
    console.error("Error saving trust mode:", e);
  }
}
