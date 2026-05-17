// Navbar scroll effect
const nav = document.getElementById('nav');
const ham = document.getElementById('ham');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 50);
});

ham.addEventListener('click', () => navMenu.classList.toggle('open'));
ham.addEventListener('keydown', e => { if(e.key==='Enter') navMenu.classList.toggle('open'); });
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

// Hero load animation
window.addEventListener('load', () => document.getElementById('hero').classList.add('ready'));

// Parallax hero
const heroBg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if(heroBg && window.scrollY < window.innerHeight)
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1)`;
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObs.observe(el));

// Gallery lightbox
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
document.querySelectorAll('.gal-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
  });
});
function closeLb() { lb.classList.remove('on'); document.body.style.overflow = ''; }
document.getElementById('lbClose').addEventListener('click', closeLb);
lb.addEventListener('click', e => { if(e.target===lb) closeLb(); });
document.addEventListener('keydown', e => { if(e.key==='Escape') closeLb(); });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// Date inputs
const today = new Date().toISOString().split('T')[0];
const cin = document.getElementById('gCheckin');
const cout = document.getElementById('gCheckout');
if(cin){ cin.min = today; }
if(cin && cout){
  cin.addEventListener('change', () => {
    cout.min = cin.value;
    if(cout.value && cout.value <= cin.value) cout.value = '';
  });
}

// Inquiry form → WhatsApp
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name     = document.getElementById('gName').value.trim();
  const phone    = document.getElementById('gPhone').value.trim();
  const checkin  = document.getElementById('gCheckin').value;
  const checkout = document.getElementById('gCheckout').value;
  const guests   = document.getElementById('gGuests').value;
  const occasion = document.getElementById('gOccasion').value;
  const msg      = document.getElementById('gMsg').value.trim();

  if(!name || !phone){ alert('Please enter your name and phone number.'); return; }

  const fmt = d => { if(!d) return ''; const dt = new Date(d); return dt.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}); };

  const text = [
    `🌿 *Booking Inquiry – Gangutara Nivas*`,
    ``,
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    checkin  ? `📅 *Check-In:* ${fmt(checkin)}`   : '',
    checkout ? `📅 *Check-Out:* ${fmt(checkout)}` : '',
    guests   ? `👥 *Guests:* ${guests}`            : '',
    occasion ? `🎉 *Occasion:* ${occasion}`        : '',
    msg      ? `💬 *Message:* ${msg}`              : '',
    ``,
    `_Sent from gangutaranivas.com_`
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/919309331040?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
