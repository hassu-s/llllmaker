const openButtons = document.querySelectorAll('[data-popup-id]');
const closeButtons = document.querySelectorAll('.close-popup');
const overlay = document.getElementById('overlay');
const offlinePopup = document.getElementById('offline-popup');
const offlineCloseButton = document.getElementById('offline-close');
const popupStack = [];
let isOffline = !navigator.onLine;
let lastOpenPopup = null;

function disableScrolling() {
  document.body.style.overflow = 'hidden';
}

function enableScrolling() {
  document.body.style.overflow = '';
}

openButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (isOffline) return;

    const popupId = button.getAttribute('data-popup-id');
    const popup = document.getElementById(popupId);

    if (popupStack.includes(popup)) return;

    if (popupStack.length > 0) {
      const currentPopup = popupStack[popupStack.length - 1];
      currentPopup.classList.remove('open');
      currentPopup.classList.add('closing');
      setTimeout(() => {
        currentPopup.classList.remove('closing');
        currentPopup.style.display = 'none';
      }, 300);
    }

    popup.style.display = 'block';
    popup.classList.add('open');
    overlay.style.display = 'block';
    popupStack.push(popup);

    // Disable scrolling when a popup opens
    disableScrolling();
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup-container');
    popup.classList.remove('open');
    popup.classList.add('closing');

    setTimeout(() => {
      popup.classList.remove('closing');
      popup.style.display = 'none';
      popupStack.pop();

      if (popupStack.length > 0) {
        const previousPopup = popupStack[popupStack.length - 1];
        previousPopup.style.display = 'block';
        previousPopup.classList.add('open');
      } else {
        overlay.style.display = 'none';

        // Re-enable scrolling when no popup is open
        enableScrolling();
      }
    }, 300);
  });
});

function showOfflinePopup() {
  if (popupStack.length > 0) {
    lastOpenPopup = popupStack[popupStack.length - 1];
    popupStack.forEach(popup => {
      popup.classList.remove('open');
      popup.classList.add('closing');
      setTimeout(() => {
        popup.classList.remove('closing');
        popup.style.display = 'none';
      }, 300);
    });
    popupStack.length = 0;
  }

  offlinePopup.style.display = 'block';
  offlinePopup.classList.add('open');
  overlay.style.display = 'block';

  // Disable scrolling when offline popup is shown
  disableScrolling();
}

function hideOfflinePopup() {
  offlinePopup.classList.remove('open');
  offlinePopup.classList.add('closing');
  setTimeout(() => {
    offlinePopup.classList.remove('closing');
    offlinePopup.style.display = 'none';
    overlay.style.display = lastOpenPopup ? 'block' : 'none';

    if (lastOpenPopup) {
      lastOpenPopup.style.display = 'block';
      lastOpenPopup.classList.add('open');
      popupStack.push(lastOpenPopup);
      lastOpenPopup = null;
    } else {
      // Re-enable scrolling when offline popup is hidden
      enableScrolling();
    }
  }, 300);
}

function updateOfflineState() {
  isOffline = !navigator.onLine;
  if (isOffline) {
    showOfflinePopup();
    offlineCloseButton.disabled = true;
  } else {
    offlineCloseButton.disabled = false;
    offlineCloseButton.onclick = hideOfflinePopup;
  }
}

window.addEventListener('online', updateOfflineState);
window.addEventListener('offline', updateOfflineState);

updateOfflineState();
