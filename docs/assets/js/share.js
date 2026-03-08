// Share JS Module

function createShareModal() {
  if (document.getElementById('swalpa-share-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'swalpa-share-overlay';
  overlay.className = 'share-modal-overlay';

  // Clicking outside closes the modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeShareModal();
  });

  const modal = document.createElement('div');
  modal.className = 'share-modal';

  modal.innerHTML = `
        <button class="share-close" onclick="closeShareModal()">×</button>
        <h3 class="share-title">📤 Share</h3>
        <div id="share-preview-text" class="share-preview"></div>
        <div class="share-buttons">
            <a id="btn-share-wa" class="share-btn share-wa" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
            </a>
            <a id="btn-share-x" class="share-btn share-x" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Post
            </a>
            <button id="btn-share-copy" class="share-btn share-copy">
                📋 Copy Text
            </button>
        </div>
    `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function closeShareModal() {
  const overlay = document.getElementById('swalpa-share-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

window.triggerShare = function (text, url = window.location.href) {
  const fullText = `${text}\n\n${url}`;

  // Use Native Web Share API if on mobile (and supported)
  if (navigator.share && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    navigator.share({
      title: document.title,
      text: text,
      url: url
    }).catch(err => {
      console.log("Error sharing:", err);
      openFallbackModal(fullText);
    });
  } else {
    openFallbackModal(fullText);
  }
};

function openFallbackModal(fullText) {
  createShareModal();

  document.getElementById('share-preview-text').innerText = fullText;

  const encodedText = encodeURIComponent(fullText);
  document.getElementById('btn-share-wa').href = `https://wa.me/?text=${encodedText}`;
  document.getElementById('btn-share-x').href = `https://twitter.com/intent/tweet?text=${encodedText}`;

  const copyBtn = document.getElementById('btn-share-copy');
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(fullText).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '✅ Copied!';
      copyBtn.style.color = 'var(--brand-green)';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.color = '';
      }, 2000);
    });
  };

  setTimeout(() => {
    document.getElementById('swalpa-share-overlay').classList.add('active');
  }, 10);
}

// Ensure closeShareModal is global for HTML onclicks
window.closeShareModal = closeShareModal;
