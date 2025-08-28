import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { diffLines, diffWords } from "diff";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const INBOX = path.join(ROOT, "inbox");
const SITE = path.join(ROOT, "site");
const UPDATES_DIR = path.join(SITE, "updates");

const DISCLAIMER = `The images and artwork used on this page are displayed strictly for educational, informational, commentary, and news reporting purposes.
This constitutes Fair Use under Section 107 of the U.S. Copyright Act and similar copyright provisions worldwide.
This content is not for commercial exploitation, and no ownership of the original works is claimed.
All intellectual property rights remain with their respective copyright holders.
If you are a rights holder and believe your content has been misused outside the scope of fair use/fair dealing, please contact me and it will be promptly addressed.`;

const PATREON_URL = "https://www.patreon.com/renegade2k6UK";

async function ensureDir(p) { await fs.mkdir(p, { recursive: true }).catch(()=>{}); }
async function exists(p) { try { await fs.stat(p); return true; } catch { return false; } }
async function readText(p) { try { return await fs.readFile(p, "utf8"); } catch { return null; } }

function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

async function copyDir(src, dst) {
  await ensureDir(dst);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d);
    } else {
      await fs.copyFile(s, d);
    }
  }
}

function escapeHTML(str) {
  return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function baseLayout({ title, body, backLink = null }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHTML(title)}</title>
<style>
:root{--bg:#0b0d10;--fg:#e6e9ef;--muted:#9aa4b2;--card:#111318;--accent:#6aa2ff;--add:#15351b;--del:#3a1b1b;--ctx:#1a1d23;}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.45 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial}
a{color:var(--accent);text-decoration:none}
header{position:sticky;top:0;background:linear-gradient(180deg,#0b0d10,rgba(11,13,16,0.95));backdrop-filter:blur(8px);border-bottom:2px solid #6aa2ff;padding:20px 16px;display:flex;align-items:center;z-index:10;box-shadow:0 4px 20px rgba(106,162,255,0.1)}
header h1{font-size:32px;margin:0;font-weight:700;text-shadow:0 2px 10px rgba(106,162,255,0.3);letter-spacing:0.5px;flex:1;text-align:center}
header a{color:var(--accent);text-decoration:none;padding:8px 16px;border:1px solid var(--accent);border-radius:8px;font-weight:600;transition:all 0.2s ease}
header a:hover{background:var(--accent);color:var(--bg);transform:translateY(-1px)}
.container{max-width:1180px;margin:24px auto;padding:0 16px}
.card{background:var(--card);border:1px solid #1b2027;border-radius:14px;padding:16px}
.grid{display:grid;gap:12px}
.grid.images{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}
.thumb{position:relative;border:1px solid #222632;border-radius:10px;overflow:hidden;background:#0c0f14}
.thumb img{width:100%;height:160px;object-fit:contain;background:#0c0f14;display:block}
.caption{font-size:12px;color:var(--muted);padding:6px 4px 8px;text-align:center}
.meta{display:flex;gap:10px;flex-wrap:wrap;color:var(--muted);font-size:12px;margin:8px 0 0}
.toolbar{display:flex;gap:8px;align-items:center;margin-bottom:12px}
select, input[type="search"], button{background:#0e1116;color:var(--fg);border:1px solid #1f2530;border-radius:10px;padding:8px 10px;font:inherit}
button{cursor:pointer}
.toggle{display:inline-flex;border:1px solid #1f2530;border-radius:10px;overflow:hidden}
.toggle button{border:0;border-right:1px solid #1f2530}
.toggle button:last-child{border-right:0}
.toggle .active{background:#152033}
.diff{background:var(--card);border:1px solid #1b2027;border-radius:14px;padding:0;overflow:hidden}
.diff-header{display:flex;gap:8px;align-items:center;padding:12px;border-bottom:1px solid #1b2027}
.diff-body{padding:12px;max-height:65vh;overflow:auto}
.diff-line{white-space:pre-wrap;padding:2px 8px;border-radius:6px;margin:1px 0}
.diff-line.add{background:var(--add)}
.diff-line.del{background:var(--del)}
.diff-line.ctx{background:var(--ctx)}
.empty-state{color:var(--muted);padding:12px}
details.mod-seg summary{cursor:pointer;margin-bottom:8px}
pre.raw{white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;background:#0f1218;border:1px solid #1c2130;border-radius:10px;padding:10px}
.tabs{display:flex;gap:8px;margin-bottom:12px}
.tab-btn{padding:8px 12px;border:1px solid #1f2530;border-radius:10px;background:#0e1116;cursor:pointer}
.tab-btn.active{background:#152033}
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,0.9);display:none;align-items:center;justify-content:center;z-index:100}
.lightbox.open{display:flex}
.lightbox img{max-width:92vw;max-height:90vh;object-fit:contain}
.lightbox .cap{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);color:#cbd5e1;font-size:12px;background:rgba(0,0,0,0.5);padding:6px 10px;border-radius:8px}
.searchbar{display:flex;gap:8px;align-items:center}
.kbd{font:12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;border:1px solid #2a3140;border-radius:6px;padding:2px 6px;background:#0f1218;color:#aab4c3}
.disclaimer{margin:18px 0;color:var(--fg);font-size:13px;line-height:1.6;border:2px solid #6aa2ff;border-radius:12px;padding:16px;background:linear-gradient(135deg,rgba(106,162,255,0.08),rgba(106,162,255,0.03));text-align:center}
.disclaimer div{margin:0 0 8px 0}
.disclaimer div:last-of-type{margin-bottom:16px}
.patreon-link{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(45deg,#1e88e5,#6aa2ff);color:white!important;text-decoration:none!important;padding:10px 20px;border-radius:8px;font-weight:600;margin-top:16px;transition:all 0.2s ease;border:0}
.patreon-link:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(30,136,229,0.4)}
.patreon-link::before{content:'💙';margin-right:4px}
.thumb[data-lazy="true"]{display:none}
.thumb img{will-change:transform;contain:layout style paint}
.grid.images{contain:layout}
.pagination-info{display:flex;align-items:center;gap:8px}
.diff-external{text-align:center;padding:20px;margin:10px 0}
.diff-external a{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:linear-gradient(45deg,#1e88e5,#6aa2ff);color:white!important;text-decoration:none;border-radius:8px;font-weight:600;transition:all 0.2s ease}
.diff-external a:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(30,136,229,0.4)}
.tab-btn[title]:hover::after{content:attr(title);position:absolute;bottom:-2em;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.9);color:white;padding:6px 8px;border-radius:6px;font-size:12px;white-space:nowrap;z-index:100;pointer-events:none}
.tab-btn{position:relative}
header h1{background:linear-gradient(135deg,#6aa2ff,#4f89ff,#00d4ff,#6aa2ff);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientShift 4s ease-in-out infinite}
@keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
</style>
</head>
<body>
<header>
  <h1>${escapeHTML(title)}</h1>
  ${backLink ? `<a href="${backLink}">All updates</a>` : ""}
</header>
<div class="container">
  <div class="card disclaimer">
    <div>The images and artwork used on this page are displayed strictly for educational, informational, commentary, and news reporting purposes.</div>
    <div>This constitutes Fair Use under Section 107 of the U.S. Copyright Act and similar copyright provisions worldwide.</div>
    <div>This content is not for commercial exploitation, and no ownership of the original works is claimed.</div>
    <div>All intellectual property rights remain with their respective copyright holders.</div>
    <div>If you are a rights holder and believe your content has been misused outside the scope of fair use/fair dealing, please contact me and it will be promptly addressed.</div>
    <a href="${PATREON_URL}" target="_blank" rel="noopener" class="patreon-link">Support LFU Informer on Patreon</a>
  </div>
${body}
</div>
<script>
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !/input|textarea|select/.test(document.activeElement.tagName.toLowerCase())) {
    const s = document.querySelector('input[type="search"]'); if (s) { e.preventDefault(); s.focus(); s.select(); }
  }
});
</script>
</body>
</html>`;
}

function additionsOnlyHTML(oldText, newText) {
  // If no previous version, show "no previous version to compare"
  if (!oldText || oldText.trim() === "") {
    return `<div class="empty-state">No previous version to compare against.</div>`;
  }
  
  const lineDiff = diffLines(oldText ?? "", newText ?? "");
  let html = "";
  for (const part of lineDiff) {
    if (part.added) {
      const lines = part.value.split("\n");
      for (const line of lines) {
        if (!line) continue;
        html += `<div class="diff-line add">+ ${escapeHTML(line)}</div>`;
      }
    }
  }
  if (!html) html = `<div class="empty-state">No new additions.</div>`;
  return html;
}

function fullDiffHTML(oldText, newText) {
  // If no previous version, show "no previous version to compare"
  if (!oldText || oldText.trim() === "") {
    return `<div class="empty-state">No previous version to compare against.</div>`;
  }
  
  const lineDiff = diffLines(oldText ?? "", newText ?? "");
  let html = "";
  for (const part of lineDiff) {
    const cls = part.added ? "add" : part.removed ? "del" : "ctx";
    const prefix = part.added ? "+ " : part.removed ? "- " : "  ";
    const lines = part.value.split("\n");
    for (const line of lines) {
      if (line === "") continue;
      html += `<div class="diff-line ${cls}">${prefix}${escapeHTML(line)}</div>`;
    }
  }
  if (!html) html = `<div class="empty-state">No differences.</div>`;
  return html;
}

function rawHTML(oldText, newText) {
  const oldSet = new Set((oldText ?? "").split("\n"));
  const lines = (newText ?? "").split("\n");
  let html = "";
  for (const line of lines) {
    if (line === "") continue;
    const isNew = !oldSet.has(line);
    html += `<div class="diff-line ${isNew ? "add" : "ctx"}">${escapeHTML(line)}</div>`;
  }
  return html || `<div class="empty-state">File is empty.</div>`;
}

function chunkDiffHTML(htmlContent, maxChunkSize = 200 * 1024) {
  if (htmlContent.length <= maxChunkSize) {
    return [htmlContent];
  }
  
  const chunks = [];
  const lines = htmlContent.split('<div class="diff-line');
  let currentChunk = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = i === 0 ? lines[i] : '<div class="diff-line' + lines[i];
    
    if (currentChunk.length + line.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = line;
    } else {
      currentChunk += line;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  return chunks.length > 0 ? chunks : [htmlContent];
}

async function getSortedUpdateDates() {
  if (!(await exists(UPDATES_DIR))) return [];
  const entries = await fs.readdir(UPDATES_DIR, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(e.name))
    .map(e => e.name)
    .sort((a,b) => (a < b ? -1 : 1));
}

async function getPrevTextFor(dateStr) {
  const dates = await getSortedUpdateDates();
  const prev = dates.filter(d => d < dateStr).pop();
  if (!prev) return null;
  return readText(path.join(UPDATES_DIR, prev, `text_en_${prev}.ini`));
}

function buildUpdateHTML({ date, images, addHTML, fullHTML, rawFileHTML, newLinesCount }) {
  const title = `LFU Informer - LFU Leaks`;
  
  // Optimize image grid with better lazy loading and virtualization hints
  const imageGrid = images.map((fn, idx) => `
    <div class="thumb" data-name="${escapeHTML(fn.toLowerCase())}" ${idx >= 100 ? 'data-lazy="true"' : ''}>
      <img ${idx >= 20 ? 'loading="lazy"' : ''} ${idx >= 100 ? 'data-src' : 'src'}="./assets/${encodeURIComponent(fn)}" alt="${escapeHTML(fn)}" width="160" height="160" />
      <div class="caption">${escapeHTML(fn)}</div>
    </div>
  `).join("");

  const body = `
<div class="card">
  <div class="meta">Images: ${images.length} · New lines: ${newLinesCount} · Generated: ${new Date().toISOString()}</div>
</div>

<div class="tabs">
  <button class="tab-btn active" data-tab="images">New Images (${images.length})</button>
  <button class="tab-btn" data-tab="diff" title="Differences from last update">Config Diff</button>
</div>

<div id="tab-images">
  <div class="toolbar">
    <div class="searchbar">
      <input type="search" id="imgSearch" placeholder="Filter images (press / to focus)" />
      <span class="kbd">Enter</span>
    </div>
    ${images.length > 100 ? `
    <div class="pagination-info">
      <button id="loadMore" style="margin-left:12px">Load More Images</button>
      <span id="showingCount" style="margin-left:8px;font-size:12px;color:var(--muted)">Showing first 100 of ${images.length}</span>
    </div>` : ''}
  </div>
  <div class="grid images" id="imgGrid">
    ${imageGrid || `<div class="empty-state">No images in this update.</div>`}
  </div>
</div>

<div id="tab-diff" style="display:none">
  <div class="diff">
    <div class="diff-header">
      <div class="toggle" id="diffToggle">
        <button data-mode="add" class="active">Additions</button>
        <button data-mode="full">Full</button>
        <button data-mode="raw">Raw</button>
      </div>
      <div class="spacer"></div>
      <input type="search" id="diffSearch" placeholder="Find in diff…" />
    </div>
    <div class="diff-body" id="diffBody" data-mode="add">
      <div data-mode="add">${addHTML}</div>
      <div data-mode="full" style="display:none">${fullHTML}</div>
      <div data-mode="raw" style="display:none">${rawFileHTML}</div>
    </div>
  </div>
</div>

<div class="lightbox" id="lightbox">
  <img alt="">
  <div class="cap"></div>
</div>

<script>
(function(){
  // Performance optimizations
  const raf = requestAnimationFrame;
  let searchTimeout;
  
  // Tabs
  const tabs = document.querySelectorAll('.tab-btn');
  const tabImages = document.getElementById('tab-images');
  const tabDiff = document.getElementById('tab-diff');
  tabs.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tabs.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.tab;
      tabImages.style.display = (t==='images') ? '' : 'none';
      tabDiff.style.display = (t==='diff') ? '' : 'none';
    });
  });

  // Optimized lazy loading for images beyond viewport
  const lazyImages = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        lazyImages.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  // Initialize lazy loading for images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => lazyImages.observe(img));

  // Load more functionality
  const loadMoreBtn = document.getElementById('loadMore');
  const showingCount = document.getElementById('showingCount');
  let currentlyLoaded = 100;
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const hiddenThumbs = [...document.querySelectorAll('.thumb[data-lazy="true"]')].slice(0, 100);
      hiddenThumbs.forEach(thumb => {
        thumb.removeAttribute('data-lazy');
        const img = thumb.querySelector('img[data-src]');
        if (img) lazyImages.observe(img);
      });
      currentlyLoaded += hiddenThumbs.length;
      const totalImages = document.querySelectorAll('.thumb').length;
      showingCount.textContent = \`Showing \${currentlyLoaded} of \${totalImages}\`;
      if (currentlyLoaded >= totalImages) {
        loadMoreBtn.style.display = 'none';
        showingCount.textContent = \`All \${totalImages} images loaded\`;
      }
    });
  }

  // Lightbox with preloading
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.cap');
  document.getElementById('imgGrid')?.addEventListener('click', e=>{
    const img = e.target.closest('.thumb img');
    if(!img) return;
    const src = img.src || img.dataset.src;
    if (src) {
      lbImg.src = src;
      lbCap.textContent = decodeURIComponent(src.split('/').pop());
      lb.classList.add('open');
    }
  });
  lb.addEventListener('click', ()=>lb.classList.remove('open'));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') lb.classList.remove('open') });

  // Optimized search with debouncing
  const imgSearch = document.getElementById('imgSearch');
  let allThumbs;
  
  function initSearch() {
    allThumbs = [...document.querySelectorAll('.thumb')];
  }
  
  function performSearch(query) {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;
    allThumbs.forEach(t => {
      const name = t.getAttribute('data-name') || '';
      const isMatch = !q || name.includes(q);
      t.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });
  }
  
  imgSearch?.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (!allThumbs) initSearch();
      raf(() => performSearch(e.target.value));
    }, 150);
  });
  
  imgSearch?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      clearTimeout(searchTimeout);
      if (!allThumbs) initSearch();
      performSearch(e.target.value);
    }
  });

  // Diff mode toggle
  const diffToggle = document.getElementById('diffToggle');
  const diffBody = document.getElementById('diffBody');
  diffToggle?.addEventListener('click', (e)=>{
    const b = e.target.closest('button'); if(!b) return;
    diffToggle.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const mode = b.dataset.mode;
    diffBody.dataset.mode = mode;
    diffBody.querySelectorAll('[data-mode]').forEach(sec=>{
      sec.style.display = (sec.getAttribute('data-mode')===mode) ? '' : 'none';
    });
  });

  // Diff search (basic)
  const diffSearch = document.getElementById('diffSearch');
  diffSearch?.addEventListener('change', ()=>{
    const q = diffSearch.value.trim();
    diffBody.querySelectorAll('mark.hl').forEach(n=>n.classList.remove('hl'));
    if(!q) return;
    const sec = diffBody.querySelector('[data-mode="'+diffBody.dataset.mode+'"]');
    const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    const ranges = [];
    while(walker.nextNode()){
      const node = walker.currentNode;
      const idx = node.nodeValue.toLowerCase().indexOf(q.toLowerCase());
      if(idx>=0){
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx+q.length);
        ranges.push(range);
      }
    }
    ranges.forEach(r=>{
      const mark = document.createElement('mark'); mark.className='hl';
      r.surroundContents(mark);
    });
  });
})();
</script>
`;
  return baseLayout({ title, body, backLink: "../../index.html" });
}

function buildIndexHTML(list) {
  const title = "LFU Informer - LFU Leaks";
  const rows = list.map(u => `
    <a class="card" href="./updates/${u.date}/index.html" style="display:block;text-decoration:none">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="font-weight:600;font-size:16px">${u.date}</div>
        <div class="meta">Images: ${u.images} · New lines: ${u.newLines} · File lines: ${u.totalLines}</div>
      </div>
    </a>
  `).reverse().join("");

const body = `
<div class="grid" style="grid-template-columns:1fr;gap:10px">
  ${rows || `<div class="empty-state">No updates yet.</div>`}
</div>
`;
  return baseLayout({ title, body, backLink: null });
}

async function getOrCreateTodayUpdateDir(date) {
  const dir = path.join(UPDATES_DIR, date);
  await ensureDir(dir);
  await ensureDir(path.join(dir, "assets"));
  return dir;
}

async function main() {
  await ensureDir(INBOX);
  await ensureDir(UPDATES_DIR);

  const inboxSprite = path.join(INBOX, "Sprite");
  const inboxIni = path.join(INBOX, "text_en.ini");

  const hasSprite = await exists(inboxSprite);
  const hasIni = await exists(inboxIni);

  const date = todayISO();
  const updateDir = await getOrCreateTodayUpdateDir(date);
  const assetsDir = path.join(updateDir, "assets");
  const datedIniPath = path.join(updateDir, `text_en_${date}.ini`);

  let newText = null;

  if (hasSprite && hasIni) {
    // Copy images to assets
    await copyDir(inboxSprite, assetsDir);

    // Copy/rename INI
    newText = await readText(inboxIni);
    await fs.writeFile(datedIniPath, newText ?? "", "utf8");

    // Clean inbox (optional)
    try {
      await fs.rm(inboxSprite, { recursive: true, force: true });
    } catch {}
    try { await fs.unlink(inboxIni); } catch {}
  } else {
    // Rebuild pass: if today's ini exists, use it
    if (await exists(datedIniPath)) newText = await readText(datedIniPath);
  }

  // Previous text for diff
  const prevText = await getPrevTextFor(date);

  // Create update page if we have text
  if (newText !== null) {
    let addHTML = additionsOnlyHTML(prevText, newText);
    let fullHTML = fullDiffHTML(prevText, newText);
    let rawFileHTML = rawHTML(prevText, newText);

    // For very large diffs, save to separate files and use lightweight main page
    const diffSize = addHTML.length + fullHTML.length + rawFileHTML.length;
    const useLightweightMode = diffSize > 512 * 1024; // > 512KB
    
    if (useLightweightMode) {
      // Create chunked versions for very large files
      const addChunks = chunkDiffHTML(addHTML, 150 * 1024);
      const fullChunks = chunkDiffHTML(fullHTML, 150 * 1024);
      const rawChunks = chunkDiffHTML(rawFileHTML, 150 * 1024);
      
      // Create index pages for multi-chunk files
      if (addChunks.length > 1) {
        const addIndex = baseLayout({
          title: `Config Additions - ${date} - LFU Informer`,
          body: `<div class="diff"><div class="diff-body">
            <div class="card" style="margin-bottom: 16px;">
              <div>This diff is split into ${addChunks.length} parts due to size:</div>
              ${addChunks.map((_, i) => `<div><a href="./diff-add-${i + 1}.html" target="_blank">📄 Part ${i + 1} of ${addChunks.length}</a></div>`).join('')}
            </div>
          </div></div>`,
          backLink: "./index.html"
        });
        await fs.writeFile(path.join(updateDir, "diff-add.html"), addIndex, "utf8");
        
        // Create individual chunk files
        for (let i = 0; i < addChunks.length; i++) {
          const chunkHTML = baseLayout({
            title: `Config Additions Part ${i + 1}/${addChunks.length} - ${date} - LFU Informer`,
            body: `<div class="diff"><div class="diff-body">${addChunks[i]}</div></div>`,
            backLink: "./diff-add.html"
          });
          await fs.writeFile(path.join(updateDir, `diff-add-${i + 1}.html`), chunkHTML, "utf8");
        }
      } else {
        const addPageHTML = baseLayout({
          title: `Config Additions - ${date} - LFU Informer`,
          body: `<div class="diff"><div class="diff-body">${addHTML}</div></div>`,
          backLink: "./index.html"
        });
        await fs.writeFile(path.join(updateDir, "diff-add.html"), addPageHTML, "utf8");
      }
      
      // Similar for full diff
      if (fullChunks.length > 1) {
        const fullIndex = baseLayout({
          title: `Config Diff - ${date} - LFU Informer`,
          body: `<div class="diff"><div class="diff-body">
            <div class="card" style="margin-bottom: 16px;">
              <div>This diff is split into ${fullChunks.length} parts due to size:</div>
              ${fullChunks.map((_, i) => `<div><a href="./diff-full-${i + 1}.html" target="_blank">📄 Part ${i + 1} of ${fullChunks.length}</a></div>`).join('')}
            </div>
          </div></div>`,
          backLink: "./index.html"
        });
        await fs.writeFile(path.join(updateDir, "diff-full.html"), fullIndex, "utf8");
        
        for (let i = 0; i < fullChunks.length; i++) {
          const chunkHTML = baseLayout({
            title: `Config Diff Part ${i + 1}/${fullChunks.length} - ${date} - LFU Informer`,
            body: `<div class="diff"><div class="diff-body">${fullChunks[i]}</div></div>`,
            backLink: "./diff-full.html"
          });
          await fs.writeFile(path.join(updateDir, `diff-full-${i + 1}.html`), chunkHTML, "utf8");
        }
      } else {
        const fullPageHTML = baseLayout({
          title: `Config Diff - ${date} - LFU Informer`,
          body: `<div class="diff"><div class="diff-body">${fullHTML}</div></div>`,
          backLink: "./index.html"
        });
        await fs.writeFile(path.join(updateDir, "diff-full.html"), fullPageHTML, "utf8");
      }
      
      // Similar for raw
      if (rawChunks.length > 1) {
        const rawIndex = baseLayout({
          title: `Raw Config - ${date} - LFU Informer`,
          body: `<div class="diff"><div class="diff-body">
            <div class="card" style="margin-bottom: 16px;">
              <div>This file is split into ${rawChunks.length} parts due to size:</div>
              ${rawChunks.map((_, i) => `<div><a href="./diff-raw-${i + 1}.html" target="_blank">📄 Part ${i + 1} of ${rawChunks.length}</a></div>`).join('')}
            </div>
          </div></div>`,
          backLink: "./index.html"
        });
        await fs.writeFile(path.join(updateDir, "diff-raw.html"), rawIndex, "utf8");
        
        for (let i = 0; i < rawChunks.length; i++) {
          const chunkHTML = baseLayout({
            title: `Raw Config Part ${i + 1}/${rawChunks.length} - ${date} - LFU Informer`,
            body: `<div class="diff"><div class="diff-body">${rawChunks[i]}</div></div>`,
            backLink: "./diff-raw.html"
          });
          await fs.writeFile(path.join(updateDir, `diff-raw-${i + 1}.html`), chunkHTML, "utf8");
        }
      } else {
        const rawPageHTML = baseLayout({
          title: `Raw Config - ${date} - LFU Informer`,
          body: `<div class="diff"><div class="diff-body">${rawFileHTML}</div></div>`,
          backLink: "./index.html"
        });
        await fs.writeFile(path.join(updateDir, "diff-raw.html"), rawPageHTML, "utf8");
      }
      
      // Use lightweight versions for main page
      addHTML = '<div class="diff-external"><a href="./diff-add.html" target="_blank">📄 View Additions (Large File)</a></div>';
      fullHTML = '<div class="diff-external"><a href="./diff-full.html" target="_blank">📄 View Full Diff (Large File)</a></div>';
      rawFileHTML = '<div class="diff-external"><a href="./diff-raw.html" target="_blank">📄 View Raw Content (Large File)</a></div>';
    }

    const newLinesCount = diffLines(prevText ?? "", newText ?? "")
      .filter(p => p.added)
      .map(p => p.value.split("\n").filter(Boolean).length)
      .reduce((a,b)=>a+b,0);

    // Collect images
    let images = [];
    const allowed = new Set([".png",".jpg",".jpeg",".webp"]);
    try {
      const files = await fs.readdir(assetsDir);
      images = files.filter(f => allowed.has(path.extname(f).toLowerCase())).sort((a,b)=>a.localeCompare(b));
    } catch {}

    const html = buildUpdateHTML({ date, images, addHTML, fullHTML, rawFileHTML, newLinesCount });
    await fs.writeFile(path.join(updateDir, "index.html"), html, "utf8");
    console.log(`[ok] Built update page for ${date}`);
  }

  // Build main index from all updates
  const dates = await getSortedUpdateDates();
  const list = [];
  for (const d of dates) {
    const dir = path.join(UPDATES_DIR, d);
    const assets = path.join(dir, "assets");
    const iniPath = path.join(dir, `text_en_${d}.ini`);
    const txt = await readText(iniPath) || "";
    const totalLines = txt.split("\n").filter(Boolean).length;
    const prev = await getPrevTextFor(d);
    const newLines = diffLines(prev ?? "", txt)
      .filter(p => p.added)
      .map(p => p.value.split("\n").filter(Boolean).length)
      .reduce((a,b)=>a+b,0);
    let images = 0;
    try {
      const files = await fs.readdir(assets);
      const allowed = new Set([".png",".jpg",".jpeg",".webp"]);
      images = files.filter(f => allowed.has(path.extname(f).toLowerCase())).length;
    } catch {}
    list.push({ date: d, images, newLines, totalLines });
  }
  const indexHTML = buildIndexHTML(list);
  await fs.writeFile(path.join(SITE, "index.html"), indexHTML, "utf8");
  console.log("[ok] Rebuilt main index");
}

main().catch(err => { console.error(err); process.exit(1); });
