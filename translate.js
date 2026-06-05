/* ===========================================================================
   Site-wide translate widget — uses Google's free website translation tool.
   Floating "🌐 Translate" button (bottom-right) opens a panel with:
     • a one-click Dutch (Nederlands) button
     • a dropdown to pick ANY language
   The chosen language is remembered across pages on this domain via a cookie,
   so once you translate one page the rest follow automatically.
   Drop into any page with: <script src="PATH/translate.js"></script>
   =========================================================================== */
(function () {
  if (window.__vjTranslateLoaded) return;     // never inject twice
  window.__vjTranslateLoaded = true;

  // ---- styles -------------------------------------------------------------
  var style = document.createElement('style');
  style.textContent = [
    '#vj-translate-btn{position:fixed;bottom:18px;right:18px;z-index:2147483646;',
    "font-family:'Space Mono',ui-monospace,monospace;background:#0a0d14;color:#00f0ff;",
    'border:1px solid #00f0ff;padding:10px 14px;border-radius:10px;cursor:pointer;',
    'font-size:13px;font-weight:700;letter-spacing:.5px;box-shadow:0 0 18px rgba(0,240,255,.35);}',
    '#vj-translate-btn:hover{background:#00f0ff;color:#05060a;}',
    '#vj-translate-panel{position:fixed;bottom:62px;right:18px;z-index:2147483646;',
    'background:#0a0d14;border:1px solid #00f0ff;border-radius:10px;padding:12px;display:none;',
    'box-shadow:0 0 24px rgba(0,240,255,.3);font-family:"Space Mono",ui-monospace,monospace;color:#e6f1ff;}',
    '#vj-translate-panel.open{display:block;}',
    '#vj-translate-panel .vj-tt-title{font-size:11px;color:#7c8aa3;margin-bottom:8px;letter-spacing:1px;}',
    '#vj-dutch-btn{display:block;width:100%;margin-bottom:10px;cursor:pointer;background:#05060a;',
    'color:#ffb300;border:1px solid #ffb300;padding:8px;border-radius:8px;font-weight:700;font-family:inherit;}',
    '#vj-dutch-btn:hover{background:#ffb300;color:#05060a;}',
    /* hide Google's top banner + the body offset it forces */
    '.goog-te-banner-frame.skiptranslate,.goog-te-gadget-icon{display:none !important;}',
    'body{top:0 !important;position:static !important;}',
    '.goog-text-highlight{background:none !important;box-shadow:none !important;}',
    '#goog-gt-tt,.goog-te-balloon-frame{display:none !important;}',
    '.goog-te-gadget{color:transparent !important;font-size:0 !important;}',
    '.goog-te-gadget .goog-te-combo{color:#e6f1ff !important;background:#05060a;border:1px solid #00f0ff;',
    'border-radius:8px;padding:6px;font-family:inherit;font-size:13px;}'
  ].join('');
  document.head.appendChild(style);

  // ---- DOM ----------------------------------------------------------------
  var gt = document.createElement('div');           // container Google fills in
  gt.id = 'google_translate_element';

  var btn = document.createElement('button');
  btn.id = 'vj-translate-btn';
  btn.type = 'button';
  btn.textContent = '🌐 Translate';

  var panel = document.createElement('div');
  panel.id = 'vj-translate-panel';

  var title = document.createElement('div');
  title.className = 'vj-tt-title';
  title.textContent = 'TRANSLATE THIS PAGE';

  var dutch = document.createElement('button');
  dutch.id = 'vj-dutch-btn';
  dutch.type = 'button';
  dutch.textContent = '🇳🇱 Nederlands (Dutch)';

  panel.appendChild(title);
  panel.appendChild(dutch);
  panel.appendChild(gt);

  function mount() {
    document.body.appendChild(btn);
    document.body.appendChild(panel);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  btn.addEventListener('click', function () { panel.classList.toggle('open'); });

  // ---- one-click Dutch ----------------------------------------------------
  function translateTo(lang) {
    var combo = document.querySelector('.goog-te-combo');
    if (!combo) return false;
    combo.value = lang;
    combo.dispatchEvent(new Event('change'));     // tells Google to translate
    return true;
  }
  dutch.addEventListener('click', function () {
    if (translateTo('nl')) return;
    // widget may not be ready on first click — retry briefly
    var tries = 0;
    var iv = setInterval(function () {
      if (translateTo('nl') || ++tries > 20) clearInterval(iv);
    }, 150);
  });

  // ---- load Google's widget ----------------------------------------------
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement({
      pageLanguage: 'en',          // source language of the site
      // (no includedLanguages = EVERY language is offered, Dutch included)
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  };

  var s = document.createElement('script');
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(s);
})();
