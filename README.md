# nyawit-dev.github.io

> Diam bukan berarti buta. Cuek bukan berarti setuju.

Halaman utama akun **nyawit-dev** — hub proyek open-source: daftar proyek live dan repo, dimuat otomatis dari GitHub API.

**Live:** https://nyawit-dev.github.io/

## Proyek live

- [#CuekinBuzzer](https://nyawit-dev.github.io/cuekin-bazer/) — gerakan & panduan melawan buzzer
- [Poster Fakta](https://nyawit-dev.github.io/poster-fakta/) — generator poster fakta siap share

## Tech

Static murni (HTML/CSS/JS) → GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).
Tanpa build step, tanpa dependensi, tanpa tracking. Daftar proyek diambil dari `https://api.github.com/users/nyawit-dev/repos` saat halaman dimuat, dengan fallback statis bila API tidak tersedia.

## Lisensi

MIT.
