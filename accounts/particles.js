// Celebratory particle burst — used on successful login / signup.
export function celebrate() {
  const colors = ['#00f0ff', '#ff3df0', '#7dff8a', '#ffd23d'];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  for (let i = 0; i < 46; i++) {
    const color = colors[i % colors.length];
    const p = document.createElement('div');
    p.style.cssText =
      'position:fixed;left:' + cx + 'px;top:' + cy + 'px;width:9px;height:9px;' +
      'border-radius:50%;pointer-events:none;z-index:99999;background:' + color +
      ';box-shadow:0 0 10px ' + color + ';';
    document.body.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const dist  = 90 + Math.random() * 250;
    const dur   = 750 + Math.random() * 650;
    p.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: 'translate(calc(-50% + ' + (Math.cos(angle) * dist) + 'px),' +
        ' calc(-50% + ' + (Math.sin(angle) * dist) + 'px)) scale(0)', opacity: 0 }
    ], { duration: dur, easing: 'cubic-bezier(0.2,0.6,0.3,1)' });
    setTimeout(() => p.remove(), dur);
  }
}
