---
description: Your personalized learning dashboard. Check your Rank, unlock Badges, and track your daily activity in French.
hide:
  - toc
---
# 📝 Mon Profil

Track your progress, unlock achievements, and climb the ranks from a confused Tourist to a true Parisian Local.

<div id="profile-root">
    <div style="text-align: center; padding: 40px; color: var(--brand-gold);">
        <i>Loading profile data...</i>
    </div>
</div>

<div class="wotd-root-class" style="max-width: 600px; margin: 30px auto;"></div>

<script type="module">
import { calculateProgress } from '../assets/js/progress.js';
import { BADGE_DEFINITIONS, getUnlockedBadges } from '../assets/js/badges.js';
import { getActivityLog } from '../assets/js/activity.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('profile-root');
    const stats = calculateProgress();
    const unlocked = getUnlockedBadges();
    const activity = getActivityLog();
    
    // 1. Rank Card
    let html = `
        <div class="profile-card">
            <div class="p-rank-header">
                <div class="p-emoji">${stats.rank.emoji}</div>
                <div>
                    <h2 class="p-title">${stats.rank.title}</h2>
                    <p class="p-desc">${stats.rank.desc}</p>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px;">
                    <span>Progress to ${stats.nextRank || 'Max Level'}</span>
                    <span>${stats.pointsToNext > 0 ? stats.pointsToNext + ' RP needed' : 'Maxed out!'}</span>
                </div>
                <div class="progress-bar-container" style="height: 12px; background: rgba(128,128,128,0.2); border-radius: 6px;">
                    <div class="progress-bar respect-bar" style="width: ${stats.progressPercent}%; background: var(--brand-gold); height: 100%; border-radius: 6px;"></div>
                </div>
            </div>
            
            <div class="p-stats-grid">
                <div class="p-stat-box">
                    <div class="p-stat-val">${stats.totalRP}</div>
                    <div class="p-stat-label">Respect Pts</div>
                </div>
                <div class="p-stat-box">
                    <div class="p-stat-val">${unlocked.length}</div>
                    <div class="p-stat-label">Badges</div>
                </div>
                <div class="p-stat-box">
                    <div class="p-stat-val">${Object.keys(activity).length}</div>
                    <div class="p-stat-label">Active Days</div>
                </div>
            </div>
        </div>
    `;

    // 2. Heatmap
    // Generate last 90 days grid
    let heatmapCells = '';
    const today = new Date();
    for (let i = 89; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString('en-CA');
        const pts = activity[dateStr] || 0;
        let lvl = 0;
        if (pts > 0) lvl = 1;
        if (pts > 20) lvl = 2;
        if (pts > 50) lvl = 3;
        if (pts > 100) lvl = 4;
        heatmapCells += `<div class="heatmap-cell" data-level="${lvl}" data-title="${pts} RP on ${dateStr}"></div>`;
    }

    html += `
        <div class="profile-card">
            <h3 style="margin-top:0; color: var(--brand-gold);">Activity Log (90 Days)</h3>
            <div class="heatmap-container">
                ${heatmapCells}
            </div>
        </div>
    `;

    // 3. Badges Grid
    html += `
        <div class="profile-card">
            <h3 style="margin-top:0; color: var(--brand-gold);">Achievements</h3>
            <div class="badges-grid">
    `;
    
    Object.keys(BADGE_DEFINITIONS).forEach(id => {
        const bd = BADGE_DEFINITIONS[id];
        const isUnlocked = unlocked.includes(id);
        html += `
            <div class="badge-item ${isUnlocked ? 'unlocked' : ''}" data-desc="${bd.description}">
                <div class="badge-emoji">${isUnlocked ? bd.emoji : '🔒'}</div>
                <div class="badge-title">${bd.title}</div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    // Share Button
    html += `
        <div style="text-align: center; margin-top: 30px;">
            <button class="btn-primary" onclick="window.triggerShare('I am officially ranked as a ${stats.rank.title} in the Paris Survival Guide with ${stats.totalRP} Respect Points! Can you beat my score?')">
                📤 Share My Rank
            </button>
        </div>
    `;

    root.innerHTML = html;
});
</script>
