/* =========================================================
   AD WALL TIMER (shell)
   Runs on normal pages. When the user's time runs out, it
   sends them to ad.html and remembers where they were. The
   countdown lives in localStorage, so it can't be skipped by
   going back — only finishing ad.html resets it.
   ========================================================= */
(function () {
  // ---- CONFIG ----
  const AD_INTERVAL_MIN = 1;   // TESTING: 1 minute.  For real: change to 15.
  const KEY = 'vja-ad-next';   // localStorage: timestamp (ms) the next ad is due
  // ----------------

  const INTERVAL_MS = AD_INTERVAL_MIN * 60 * 1000;

  // ad.html lives next to this script, so resolve it relative to ourselves.
  // (Works whether the page is in / or /accounts/ etc.)
  const adUrl = new URL('ad.html', document.currentScript.src).href;

  function goToAd() {
    location.replace(adUrl + '?return=' + encodeURIComponent(location.href));
  }

  let next;
  try {
    const now = Date.now();
    next = parseInt(localStorage.getItem(KEY) || '0', 10);

    // First time ever on the site: start the clock.
    if (!next) {
      next = now + INTERVAL_MS;
      localStorage.setItem(KEY, String(next));
    }

    // Time's already up -> go watch the ad right now.
    if (now >= next) { goToAd(); return; }

    // Otherwise, tick once a second: print the countdown to the console and
    // fire the ad the moment it reaches 0.
    const tick = function () {
      const remaining = Math.ceil((next - Date.now()) / 1000);
      if (remaining <= 0) {
        console.log('Ad timer: 0 — going to ad!');
        goToAd();
        return;
      }
      console.log('Ad timer: ' + remaining + 's left');
    };
    tick();                         // show the first number right away
    const timerId = setInterval(tick, 1000);

    // Stop ticking if the user leaves this page (avoids stray logs/redirects).
    window.addEventListener('pagehide', function () { clearInterval(timerId); });
  } catch (e) {
    // localStorage blocked (private mode) — fail open, don't trap the user.
  }
})();
