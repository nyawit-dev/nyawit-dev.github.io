// Daftar proyek nyawit-dev — dimuat otomatis dari GitHub API.
// Repo yang namanya ada di LIVE akan ditautkan ke situs live-nya.
const LIVE = {
  'cuekin-bazer': {
    url: 'https://nyawit-dev.github.io/cuekin-bazer/',
    label: '#CuekinBuzzer',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop',
    blurb: 'Gerakan & panduan melawan buzzer, hoaks, dan pengalihan isu. SvelteKit + Tailwind, satir & fakta terverifikasi.'
  },
  'poster-fakta': {
    url: 'https://nyawit-dev.github.io/poster-fakta/',
    label: 'Poster Fakta',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    blurb: 'Generator poster fakta 1080×1080 siap share — 10 tema, 3 layout, 3 ukuran, tanpa server.'
  }
};

const GENERIC_IMGS = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop'
];

const FALLBACK = [
  { name: 'cuekin-bazer', description: LIVE['cuekin-bazer'].blurb, language: 'Svelte', updated_at: new Date().toISOString() },
  { name: 'poster-fakta', description: LIVE['poster-fakta'].blurb, language: 'Svelte', updated_at: new Date().toISOString() }
];

function card(repo, i) {
  const live = LIVE[repo.name];
  const href = live ? live.url : repo.html_url;
  const title = live ? live.label : repo.name;
  const desc = (live && live.blurb) || repo.description || 'Proyek open-source nyawit-dev.';
  const img = (live && live.img) || GENERIC_IMGS[i % GENERIC_IMGS.length];
  const date = repo.updated_at ? new Date(repo.updated_at).toISOString().slice(0, 10) : '';
  const a = document.createElement('a');
  a.className = 'card reveal';
  a.href = href;
  if (!live) { a.target = '_blank'; a.rel = 'noreferrer'; }
  a.innerHTML = `
    <div class="thumb"><img src="${img}" alt="" loading="lazy" /></div>
    <div class="body">
      <h3></h3>
      <p></p>
      <div class="meta">
        <span class="badge ${live ? 'live' : ''}">${live ? '● LIVE' : 'REPO'}</span>
        <span class="lang">${repo.language ? repo.language + ' · ' : ''}${date}</span>
      </div>
    </div>`;
  a.querySelector('h3').textContent = title;
  a.querySelector('p').textContent = desc;
  a.querySelector('img').addEventListener('error', (e) => { e.currentTarget.style.display = 'none'; });
  return a;
}

function observeReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
}

function render(repos) {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  const sorted = [...repos].sort((a, b) => {
    const la = LIVE[a.name] ? 0 : 1, lb = LIVE[b.name] ? 0 : 1;
    return la - lb || new Date(b.updated_at) - new Date(a.updated_at);
  });
  sorted.forEach((r, i) => grid.appendChild(card(r, i)));
  observeReveals();
}

observeReveals();

fetch('https://api.github.com/users/nyawit-dev/repos?per_page=100&sort=updated')
  .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(render)
  .catch(() => render(FALLBACK));
