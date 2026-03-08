export function calculateProgress() {
  const RANKS = [
    { title: '🌱 Tourist', minPoints: 0, desc: 'Just arrived. Confused but curious.' },
    { title: '🚶 Regular', minPoints: 100, desc: 'Starting to find your way around.' },
    { title: '🏃 Local', minPoints: 300, desc: 'You know the shortcuts and standard phrases.' },
    { title: '🧭 Insider', minPoints: 600, desc: 'People ask YOU for directions.' },
    { title: '👑 Parisien', minPoints: 1000, desc: 'Maximum respect achieved. You belong here.' }
  ];

  // Read points from various sources
  let totalRP = 0;
  try {
    const gameScores = JSON.parse(localStorage.getItem('swalpa_highscores') || '{}');
    Object.values(gameScores).forEach(score => totalRP += parseInt(score) || 0);

    const activityLog = JSON.parse(localStorage.getItem('activity_log') || '{}');
    Object.values(activityLog).forEach(pts => totalRP += parseInt(pts) || 0);
  } catch (e) {
    console.error("Error reading points:", e);
  }

  // Default 10 points for just being here
  if (totalRP === 0) totalRP = 10;

  let currentRankIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (totalRP >= RANKS[i].minPoints) {
      currentRankIndex = i;
    } else {
      break;
    }
  }

  const currentRank = RANKS[currentRankIndex];
  const nextRank = currentRankIndex < RANKS.length - 1 ? RANKS[currentRankIndex + 1] : null;

  let progressPercent = 100;
  let pointsToNext = 0;

  if (nextRank) {
    const pointsInTier = totalRP - currentRank.minPoints;
    const tierSize = nextRank.minPoints - currentRank.minPoints;
    progressPercent = Math.min(100, Math.max(0, (pointsInTier / tierSize) * 100));
    pointsToNext = nextRank.minPoints - totalRP;
  }

  // Split title and emoji
  const emojiMatch = currentRank.title.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|\S)\s+(.*)/);
  const emoji = emojiMatch ? emojiMatch[1] : '';
  const title = emojiMatch ? emojiMatch[2] : currentRank.title;

  return {
    totalRP,
    rank: {
      title: title,
      emoji: emoji,
      desc: currentRank.desc
    },
    nextRank: nextRank ? nextRank.title : null,
    progressPercent,
    pointsToNext
  };
}
