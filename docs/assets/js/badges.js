export const BADGE_DEFINITIONS = {
  'first_lesson': { title: 'Le Débutant', description: 'Gained your first Respect points.', emoji: '☕' },
  'game_pro': { title: 'Le Négociateur', description: 'Scored high in the Cafe Simulator.', emoji: '🗣️' },
  'streak_2': { title: 'Deux Jours', description: 'Hit a 2-day streak.', emoji: '🔄' },
  'streak_5': { title: 'En Feu', description: 'Achieve a 5-day streak.', emoji: '🔥' },
  'flashcard_start': { title: 'L\'Étudiant', description: 'Try your first flashcard.', emoji: '🗂️' },
  'all_lessons': { title: 'Le Sage', description: 'Complete all 10 lessons.', emoji: '👑' }
};

export function getUnlockedBadges() {
  try {
    const stored = localStorage.getItem('swalpa_badges');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function unlockBadge(badgeId) {
  if (!BADGE_DEFINITIONS[badgeId]) return false;

  const unlocked = getUnlockedBadges();
  if (unlocked.includes(badgeId)) return false; // Already unlocked

  unlocked.push(badgeId);
  try {
    localStorage.setItem('swalpa_badges', JSON.stringify(unlocked));
  } catch (e) {
    console.error("Local storage error:", e);
  }

  showBadgeToast(badgeId);

  // Log activity points for unlocking a badge
  if (window.logActivity) window.logActivity(50);

  return true;
}

function showBadgeToast(badgeId) {
  const badge = BADGE_DEFINITIONS[badgeId];
  if (!badge) return;

  const toast = document.createElement('div');
  toast.className = 'badge-toast slide-in-bottom';
  toast.innerHTML = `
        <div class="toast-emoji">${badge.emoji}</div>
        <div class="toast-content">
            <div class="toast-title">Badge Unlocked!</div>
            <div class="toast-desc">${badge.title}</div>
        </div>
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.replace('slide-in-bottom', 'slide-out-bottom');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// Make globally available for inline scripts to call
window.unlockBadge = unlockBadge;
