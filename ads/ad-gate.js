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

    // Otherwise, fire the ad the moment the timer runs out while on this page.
    setTimeout(goToAd, next - now);
  } catch (e) {
    // localStorage blocked (private mode) — fail open, don't trap the user.
  }
})();
