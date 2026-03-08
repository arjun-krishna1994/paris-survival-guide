export function getActivityLog() {
  try {
    const log = localStorage.getItem('activity_log');
    return log ? JSON.parse(log) : {};
  } catch {
    return {};
  }
}

export function logActivity(points = 10) {
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
  const log = getActivityLog();
  log[today] = (log[today] || 0) + points;

  try {
    localStorage.setItem('activity_log', JSON.stringify(log));

    // Trigger first lesson badge if points are logged for the first time
    if (Object.keys(log).length === 1 && window.unlockBadge) {
      window.unlockBadge('first_lesson');
    }
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

// Make globally available for other scripts
window.logActivity = logActivity;

// Auto-log simply for visiting pages (passive learning)
document.addEventListener('DOMContentLoaded', () => {
  // Only log once per session to prevent spamming from reloads
  if (!sessionStorage.getItem('session_logged')) {
    logActivity(5); // 5 points for visiting
    sessionStorage.setItem('session_logged', 'true');
  }
});
