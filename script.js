// Fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
document.querySelectorAll('.cr-members').forEach(el => io.observe(el));

// Member parallax
document.querySelectorAll('.cr-card').forEach(card => {
  const img = card.querySelector('.cr-card__art img');
  if(!img) return;
  const maxMove = 10, maxTilt = 3;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `translate(${x*maxMove}px, ${-y*maxMove}px) rotate(${x*maxTilt}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => { img.style.transform = ''; });
});

// Single-line NAV auto-fit
function fitHeaderNav(){
  const header = document.querySelector('.header');
  const nav = header?.querySelector('.nav');
  const logo = header?.querySelector('.logo');
  if(!header || !nav || !logo) return;
  document.documentElement.style.setProperty('--nav-font','15px');
  document.documentElement.style.setProperty('--nav-gap','22px');
  const cs = getComputedStyle(header);
  const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const available = Math.max(0, header.clientWidth - logo.getBoundingClientRect().width - padX - 8);
  let attempts = 0;
  while (attempts < 10 && nav.scrollWidth > available) {
    attempts++;
    const curFont = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-font'))||15;
    const curGap  = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-gap'))||22;
    const nextFont = Math.max(9, curFont*0.9);
    const nextGap  = Math.max(4, curGap*0.9);
    document.documentElement.style.setProperty('--nav-font', nextFont+'px');
    document.documentElement.style.setProperty('--nav-gap',  nextGap +'px');
  }
}
window.addEventListener('load', fitHeaderNav);
window.addEventListener('resize', fitHeaderNav);

// Neon logo controller
(function(){
  const wrap = document.querySelector('.hero--logo .neon-wrap');
  const logo = document.querySelector('.hero--logo .brand-logo');
  if(!wrap || !logo) return;
  wrap.style.animationDuration = (10 + Math.random()*6).toFixed(1) + 's';
  wrap.style.animationDelay = (Math.random()*2).toFixed(2) + 's';
  setInterval(() => {
    logo.classList.add('is-bright');
    setTimeout(()=>logo.classList.remove('is-bright'), 160 + Math.random()*200);
  }, 2500 + Math.random()*2500);
  setInterval(() => {
    const dx = (Math.random() - .5) * 0.6;
    const dy = (Math.random() - .5) * 0.6;
    logo.style.transform = `translate(${dx}px, ${dy}px)`;
    setTimeout(()=>{ logo.style.transform = ''; }, 80);
  }, 1400 + Math.random()*1800);
})();
