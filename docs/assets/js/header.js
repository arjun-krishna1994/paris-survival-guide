import { calculateProgress } from './progress.js';

function injectStatusBar() {
  const stats = calculateProgress();

  // Create the header element
  const statusEl = document.createElement('div');
  statusEl.className = 'swalpa-status-header';
  statusEl.innerHTML = `
        <a href="/nanna_profile/" class="shp-rank-container">
            <span class="shp-emoji">${stats.rank.emoji}</span>
            <span class="shp-rank">${stats.rank.title}</span>
            <div class="shp-bar-wrapper">
                <div class="shp-bar-fill" style="width: ${stats.progressPercent}%"></div>
            </div>
            <span class="shp-rp">${stats.totalRP} RP</span>
        </a>
        <a href="/word_of_the_day/" class="shp-streak-container">
            <span class="shp-streak-emoji">🔥</span>
            <span class="shp-streak-count" id="header-streak-count">0</span>
        </a>
    `;

  // Try to insert it into the MkDocs header area
  // This depends on the specific template structure, usually .md-header__inner
  const headerInner = document.querySelector('.md-header__inner');
  if (headerInner) {
    // Insert it right after the title but before search
    const titleArea = headerInner.querySelector('.md-header__topic');
    if (titleArea) {
      titleArea.after(statusEl);
    } else {
      headerInner.appendChild(statusEl);
    }
  } else {
    // Backup: attach to top of body
    document.body.prepend(statusEl);
  }
}

// Initialized on load
document.addEventListener('DOMContentLoaded', () => {
  // Only inject if we are not on the intro page (maybe) or just inject everywhere
  setTimeout(injectStatusBar, 500); // Slight delay to ensure DOM is ready
});
