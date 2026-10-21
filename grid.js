const WD = ['nd', 'pn', 'wt', 'śr', 'czw', 'pt', 'sb'];
const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca',
  'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const endOf = (h) => `${pad(+h.split(':')[0] + 1)}:${h.split(':')[1]}`;
const short = (h) => h.replace(/^0/, '');
const isOff = (d, t) => (OFF[WD[d.getDay()]] || []).includes(t) || (OFF_DATES[iso(d)] || []).includes(t);

// Dni robocze z config.js, pogrupowane w tygodnie
function weeks() {
  const out = [];
  for (let d = new Date(FROM + 'T12:00'); iso(d) <= TO; d.setDate(d.getDate() + 1)) {
    const wd = d.getDay();
    if (wd === 0 || wd === 6 || SKIP.includes(iso(d))) continue;
    if (wd === 1 || !out.length) out.push([]);
    out[out.length - 1].push(new Date(d));
  }
  return out;
}

// slot id: "2026-10-26 16:00" → "pn 26.10, 16:00–17:00"
function slotLabel(id) {
  const [date, h] = id.split(' ');
  const d = new Date(date + 'T12:00');
  return `${WD[d.getDay()]} ${d.getDate()}.${pad(d.getMonth() + 1)}, ${short(h)}–${short(endOf(h))}`;
}

// Rysuje siatkę godzin (wiersze) × dni (kolumny), tydzień po tygodniu. cell(slotId, el) dla każdej aktywnej komórki.
function renderGrid(container, cell) {
  weeks().forEach((w) => {
    const a = w[0], b = w[w.length - 1];
    const h = document.createElement('h3');
    h.textContent = a.getMonth() === b.getMonth()
      ? `${a.getDate()}–${b.getDate()} ${MONTHS[a.getMonth()]}`
      : `${a.getDate()} ${MONTHS[a.getMonth()]} – ${b.getDate()} ${MONTHS[b.getMonth()]}`;
    container.appendChild(h);

    const g = document.createElement('div');
    g.className = 'grid';
    g.style.gridTemplateColumns = `3.4rem repeat(${w.length}, minmax(0,1fr))`;
    g.appendChild(document.createElement('div'));
    w.forEach((d) => {
      const hd = document.createElement('div');
      hd.className = 'hd day';
      hd.innerHTML = `${WD[d.getDay()]}<small>${d.getDate()}.${pad(d.getMonth() + 1)}</small>`;
      g.appendChild(hd);
    });
    HOURS.forEach((t) => {
      const lab = document.createElement('div');
      lab.className = 'hour';
      lab.innerHTML = `${short(t)}<small>–${short(endOf(t))}</small>`;
      g.appendChild(lab);
      w.forEach((d) => {
        if (isOff(d, t)) {
          const off = document.createElement('div');
          off.className = 'slot off';
          off.setAttribute('aria-hidden', 'true');
          return g.appendChild(off);
        }
        const el = document.createElement('button');
        el.type = 'button';
        el.className = 'slot';
        cell(`${iso(d)} ${t}`, el);
        g.appendChild(el);
      });
    });
    container.appendChild(g);
  });
}
