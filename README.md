
# Datamine Static Generator

A zero-backend static site generator for your weekly game datamine drops.

## How it works
- Drop a `Sprite/` folder and a `text_en.ini` into `inbox/`
- Run: `npm i` once, then `npm run generate` for each drop
- Output goes to `site/`, including:
  - `site/index.html` (main index)
  - `site/updates/YYYY-MM-DD/index.html` (update page)
  - `site/updates/YYYY-MM-DD/assets/` (copied images)
  - `site/updates/YYYY-MM-DD/text_en_YYYY-MM-DD.ini` (archived text file)

## Hosting
Upload `site/index.html` and the whole `site/updates/` folder to your static host.
Each time you run the generator with a new drop, re-upload the new `site/index.html` and the new `site/updates/YYYY-MM-DD/` folder.

## Disclaimer
Every page includes the Fair Use disclaimer and a Patreon link (as required).
