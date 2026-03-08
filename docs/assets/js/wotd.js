const WOTD_PHRASES = [
  { native: "Bonjour", phonetic: "bohn-zhoor", english: "Good morning / Hello", category: "Greeting" },
  { native: "S'il vous plaît", phonetic: "seel voo pleh", english: "Please", category: "Politeness" },
  { native: "Merci beaucoup", phonetic: "mair-see boh-koo", english: "Thank you very much", category: "Politeness" },
  { native: "L'addition, s'il vous plaît", phonetic: "lah-dee-syohn", english: "The check, please", category: "Cafe" },
  { native: "Je voudrais un café", phonetic: "zhuh voo-dreh uhn kah-feh", english: "I would like a coffee", category: "Cafe" },
  { native: "Une carafe d'eau", phonetic: "oon kah-rahf doh", english: "A pitcher of tap water (free)", category: "Cafe" },
  { native: "Je ne parle pas français", phonetic: "zhuh nuh parl pah frohn-seh", english: "I don't speak French", category: "Survival" },
  { native: "Parlez-vous anglais?", phonetic: "par-leh voo ahn-gleh", english: "Do you speak English?", category: "Survival" },
  { native: "Où sont les toilettes?", phonetic: "oo sohn lay twah-let", english: "Where are the restrooms?", category: "Survival" },
  { native: "Excusez-moi", phonetic: "ex-koo-zay mwah", english: "Excuse me", category: "Politeness" },
  { native: "C'est combien?", phonetic: "seh kohm-byen", english: "How much is it?", category: "Shopping" },
  { native: "À emporter", phonetic: "ah ahm-por-teh", english: "To go / Takeaway", category: "Cafe" },
  { native: "Sur place", phonetic: "soor plahs", english: "For here / Dine-in", category: "Cafe" },
  { native: "Génial!", phonetic: "zhay-nyal", english: "Awesome! / Great!", category: "Slang" },
  { native: "C'est ouf!", phonetic: "seh oof", english: "That's crazy! (Verlan for fou)", category: "Slang" },
  { native: "Bref", phonetic: "bref", english: "Anyway... / Long story short", category: "Slang" },
  { native: "Santé!", phonetic: "sahn-teh", english: "Cheers! (To your health)", category: "Social" },
  { native: "Bonsoir", phonetic: "bohn-swahr", english: "Good evening", category: "Greeting" },
  { native: "Un verre de vin", phonetic: "uhn vair duh vahn", english: "A glass of wine", category: "Food" },
  { native: "À bientôt", phonetic: "ah byen-toh", english: "See you soon", category: "Greeting" }
];

function getDeterministicIndex(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % WOTD_PHRASES.length;
}

function initWotd() {
  const wotdRoots = document.querySelectorAll('#wotd-root, .wotd-root-class');
  if (wotdRoots.length === 0) return;

  const today = new Date();
  const todayStr = today.toLocaleDateString('en-CA'); // YYYY-MM-DD

  // --- Streak Calculation ---
  let lastVisit = localStorage.getItem('swalpa_last_visit');
  let streak = parseInt(localStorage.getItem('swalpa_streak')) || 0;

  if (!lastVisit) {
    // First ever visit
    streak = 1;
  } else if (lastVisit !== todayStr) {
    // A new day!
    const lastDate = new Date(lastVisit + 'T00:00:00');
    // Calculate difference in whole days
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++; // Consecutive day
    } else {
      streak = 1; // Streak broken
    }

    // Award streak badges
    if (window.unlockBadge) {
      if (streak >= 2) window.unlockBadge('streak_2');
      if (streak >= 5) window.unlockBadge('streak_5');
    }

    // Log activity points for keeping streak alive
    if (window.logActivity && streak > 1) {
      window.logActivity(5 * streak); // More points for higher streaks
    }
  }

  // Save state
  localStorage.setItem('swalpa_last_visit', todayStr);
  localStorage.setItem('swalpa_streak', streak.toString());

  // Update Header Streak Counter if exists
  const headerStreakCount = document.getElementById('header-streak-count');
  if (headerStreakCount) {
    headerStreakCount.innerText = streak;
  }

  // --- Render Widget ---
  const phraseIndex = getDeterministicIndex(todayStr);
  const phrase = WOTD_PHRASES[phraseIndex];

  const html = `
        <div class="wotd-container">
            <div class="wotd-header">
                <h3>Mot du Jour 🇫🇷</h3>
                <div class="streak-pill ${streak > 1 ? 'active' : ''}">
                    <span>${streak > 1 ? '🔥' : '⏳'}</span>
                    <span>${streak} ${streak === 1 ? 'Day' : 'Days'}</span>
                </div>
            </div>
            <div class="wotd-body">
                <div class="wotd-native">${phrase.native}</div>
                <div class="wotd-eng">"${phrase.english}"</div>
                <div class="wotd-phonetic">⟨ ${phrase.phonetic} ⟩</div>
            </div>
        </div>
    `;

  // Inject into all roots (could be multiple on the page)
  wotdRoots.forEach(root => root.innerHTML = html);
}

// Ensure it runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initWotd);
