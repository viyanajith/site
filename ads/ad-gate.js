/* =========================================================
   AD WALL TIMER (shell)
   Counts down ONLY while you're actually looking at the page.
   Switch tabs or leave -> it pauses. Come back -> it resumes.
   When it hits 0 it sends you to ad.html, which resets the
   timer and sends you back — so the cycle repeats forever.
   The seconds-left live in localStorage, so it can't be
   skipped by going back; only finishing ad.html resets it.
   ========================================================= */
(function () {
  // ---- CONFIG ----
  const AD_INTERVAL_MIN = 1;   // TESTING: 1 minute.  For real: change to 15.
  const KEY = 'vja-ad-left';   // localStorage: seconds left until the next ad
  // ----------------

  const INTERVAL_SEC = AD_INTERVAL_MIN * 60;

  // ad.html lives next to this script, so resolve it relative to ourselves.
  // (Works whether the page is in / or /accounts/ etc.)
  const adUrl = new URL('ad.html', document.currentScript.src).href;

  function goToAd() {
    location.replace(adUrl + '?return=' + encodeURIComponent(location.href));
  }

  let left, timerId = null;
  try {
    localStorage.removeItem('vja-ad-next'); // tidy up the old timer key

    // How many seconds are left? First visit ever -> start a fresh countdown.
    left = parseInt(localStorage.getItem(KEY), 10);
    if (isNaN(left)) {
      left = INTERVAL_SEC;
      localStorage.setItem(KEY, String(left));
    }

    // Time's already up -> go watch the ad right now.
    if (left <= 0) { goToAd(); return; }

    function tick() {
      left--;
      try { localStorage.setItem(KEY, String(left)); } catch (e) {}
      if (left <= 0) {
        console.log('Ad timer: 0 — going to ad!');
        goToAd();
        return;
      }
      console.log('Ad timer: ' + left + 's left');
    }

    // Start ticking, but only if the page is actually being looked at.
    function start() {
      if (timerId === null && document.visibilityState === 'visible') {
        console.log('Ad timer: running (' + left + 's left)');
        timerId = setInterval(tick, 1000);
      }
    }

    // Stop ticking and remember where we paused.
    function stop() {
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        try { localStorage.setItem(KEY, String(left)); } catch (e) {}
        console.log('Ad timer: paused (' + left + 's left)');
      }
    }

    // Pause when you switch tabs / minimize, resume when you come back.
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') start(); else stop();
    });
    window.addEventListener('pagehide', stop);

    start(); // begin now if the page is visible
  } catch (e) {
    // localStorage blocked (private mode) — fail open, don't trap the user.
  }
})();
