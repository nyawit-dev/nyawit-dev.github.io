// Daftar proyek nyawit-dev — dimuat otomatis dari GitHub API.
// Repo yang namanya ada di LIVE akan ditautkan ke situs live-nya.
const LIVE = {
  'cuekin-bazer': {
    url: 'https://nyawit-dev.github.io/cuekin-bazer/',
    label: '#CuekinBuzzer',
    blurb: 'Gerakan & panduan melawan buzzer, hoaks, dan pengalihan isu. SvelteKit + Tailwind, satir & fakta terverifikasi.'
  },
  'poster-fakta': {
    url: 'https://nyawit-dev.github.io/poster-fakta/',
    label: 'Poster Fakta',
    blurb: 'Generator poster fakta 1080×1080 siap share — 10 tema, 3 layout, 3 ukuran, tanpa server.'
  }
};

const FALLBACK = [
  { name: 'cuekin-bazer', description: LIVE['cuekin-bazer'].blurb },
  { name: 'poster-fakta', description: LIVE['poster-fakta'].blurb }
];

function card(repo) {
  const live = LIVE[repo.name];
  const href = live ? live.url : repo.html_url;
  const title = live ? live.label : repo.name;
  const desc = (live && live.blurb) || repo.description || 'Proyek open-source nyawit-dev.';
  const badge = live
    ? '<span class="badge live">● LIVE</span>'
    : '<span class="badge repo">REPO</span>';
  const a = document.createElement('a');
  a.className = 'card';
  a.href = href;
  if (!live) { a.target = '_blank'; a.rel = 'noreferrer'; }
  a.innerHTML = `<h3></h3><p></p>${badge}`;
  a.querySelector('h3').textContent = title;
  a.querySelector('p').textContent = desc;
  return a;
}

function render(repos) {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  // Proyek live dulu, lalu sisanya
  const sorted = [...repos].sort((a, b) => {
    const la = LIVE[a.name] ? 0 : 1, lb = LIVE[b.name] ? 0 : 1;
    return la - lb || new Date(b.updated_at) - new Date(a.updated_at);
  });
  sorted.forEach((r) => grid.appendChild(card(r)));
}

fetch('https://api.github.com/users/nyawit-dev/repos?per_page=100&sort=updated')
  .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(render)
  .catch(() => render(FALLBACK));
