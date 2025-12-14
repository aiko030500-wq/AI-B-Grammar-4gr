/* =========================
   AI BAYAN GRAMMAR 4gr
   app.js (FULL FIXED)
========================= */

const LS = {
  session: "aibayan4_session",
  attempts: "aibayan4_attempts",
  stars: "aibayan4_stars",
  aiDaily: "aibayan4_aiDaily"
};

const $ = (sel, root=document) => root.querySelector(sel);

const state = {
  view: "units",      // units | unit | tests | testRun | journal
  unitId: null,
  exId: null,
  testId: null,
  lastScore: null
};

function readJSON(key, fallback){
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function todayKey(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function canAskAI(){
  const obj = readJSON(LS.aiDaily, {});
  return obj[todayKey()] !== true;
}
function incAI(){
  const obj = readJSON(LS.aiDaily, {});
  obj[todayKey()] = true;
  writeJSON(LS.aiDaily, obj);
}

function getAttempts(){ return readJSON(LS.attempts, {}); }
function setAttempts(x){ writeJSON(LS.attempts, x); }

function getStars(){ return readJSON(LS.stars, {}); }
function setStars(x){ writeJSON(LS.stars, x); }

function keyExercise(session, unitId, exId){
  return `ex:${session.role}:${session.login}:${unitId}:${exId}`;
}
function keyUnitStars(session, unitId){
  return `unitStars:${session.role}:${session.login}:${unitId}`;
}
function testKey(session, testId){
  return `test:${session.role}:${session.login}:${testId}`;
}

/* =========================
   COLOR THEME
========================= */
function hexToRgb(hex){
  const h = (hex || "#0f7c8a").replace("#","").trim();
  const full = h.length===3 ? h.split("").map(x=>x+x).join("") : h;
  const n = parseInt(full, 16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}
function makeSoft(hex, alpha=0.14){
  const {r,g,b} = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
function applyUnitTheme(hex){
  const c = hex || "#0f7c8a";
  document.documentElement.style.setProperty("--unit", c);
  document.documentElement.style.setProperty("--unit-soft", makeSoft(c, 0.12));
}

/* =========================
   BOOT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  ensureData();
  const session = readJSON(LS.session, null);
  if (session) renderApp(session);
  else renderLogin();
});

function ensureData(){
  if (!window.APP_DATA) {
    console.error("APP_DATA not found. Check data.js!");
  }
}

/* =========================
   LOGIN
========================= */
function renderLogin(){
  applyUnitTheme("#0f7c8a");

  const root = $("#app") || document.body;
  root.innerHTML = `
    <div style="max-width:980px;margin:22px auto;padding:0 14px;">
      <div style="background:#fff;border-radius:16px;box-shadow:0 12px 26px rgba(0,0,0,.12);overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0f7c8a,#0a5c66);color:#fff;padding:16px 18px;font-weight:900;">
          AI BAYAN GRAMMAR 4gr
        </div>
        <div style="padding:18px;">
          <div style="display:flex;gap:14px;align-items:center;margin-bottom:14px;">
            <img src="logo.png" alt="logo" style="width:54px;height:54px;border-radius:50%;object-fit:cover;">
            <div>
              <div style="font-weight:900;font-size:18px;">Login</div>
              <div style="color:#5f7a83;font-size:13px;">(no hints)</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <div style="font-weight:800;margin-bottom:6px;">Login</div>
              <input id="loginName" style="width:100%;padding:10px 12px;border-radius:12px;border:1px solid #cfdde2;">
            </div>
            <div>
              <div style="font-weight:800;margin-bottom:6px;">PIN</div>
              <input id="loginPin" type="password" style="width:100%;padding:10px 12px;border-radius:12px;border:1px solid #cfdde2;">
            </div>
          </div>

          <div id="loginErr" style="margin-top:10px;color:#ef4444;font-weight:800;"></div>

          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn" id="btnEnter">Enter</button>
            <button class="btn" id="btnReset" style="background:#123c45;">Reset saved data</button>
          </div>
        </div>
      </div>
    </div>
  `;

  $("#btnEnter").onclick = () => {
    const login = ($("#loginName").value || "").trim();
    const pin = ($("#loginPin").value || "").trim();
    const ok = auth(login, pin);
    if (!ok.ok){
      $("#loginErr").textContent = ok.msg;
      return;
    }
    writeJSON(LS.session, ok.session);
    renderApp(ok.session);
  };

  $("#btnReset").onclick = () => {
    localStorage.removeItem(LS.session);
    localStorage.removeItem(LS.attempts);
    localStorage.removeItem(LS.stars);
    localStorage.removeItem(LS.aiDaily);
    $("#loginErr").textContent = "Saved data cleared.";
  };
}

function auth(login, pin){
  const a = window.APP_DATA?.auth;
  if (!a) return { ok:false, msg:"APP_DATA.auth missing." };

  // teacher
  if (pin === a.teacherPin) {
    return { ok:true, session:{ role:"teacher", login: login || "TEACHER" } };
  }

  // student
  const validLogin = a.logins.includes(login);
  if (!validLogin) return { ok:false, msg:"Wrong login." };
  if (pin !== a.studentPin) return { ok:false, msg:"Wrong PIN." };
  return { ok:true, session:{ role:"student", login } };
}

/* =========================
   APP SHELL
========================= */
function renderApp(session){
  const root = $("#app") || document.body;

  const groups = window.APP_DATA.groups || [];
  const currentUnit = groups.find(g => g.id === state.unitId) || groups[0];

  // apply theme color
  if (state.view === "unit" && currentUnit) applyUnitTheme(currentUnit.color);
  else applyUnitTheme("#0f7c8a");

  root.innerHTML = `
    <div class="shell">
      <div class="sidebar">
        <div class="logo">
          <img src="logo.png" alt="logo">
          <div>
            <div class="logoTitle">AI BAYAN</div>
            <div style="font-size:12px;color:var(--muted);font-weight:800;">${session.login}</div>
          </div>
        </div>

        <button class="sidebtn ${state.view==="units" ? "active":""}" data-go="units">Units</button>
        <button class="sidebtn ${state.view==="tests" ? "active":""}" data-go="tests">Tests</button>
        ${session.role==="teacher" ? `<button class="sidebtn ${state.view==="journal" ? "active":""}" data-go="journal">Teacher Journal</button>` : ``}
        <button class="sidebtn" id="btnLogout">Logout</button>

        <div style="margin-top:14px;padding-top:12px;border-top:1px dashed rgba(0,0,0,.12);">
          <div style="font-weight:900;margin-bottom:6px;">Progress</div>
          <div style="font-size:13px;color:var(--muted);font-weight:800;" id="progBox"></div>
        </div>
      </div>

      <div class="main">
        <div class="header">AI BAYAN GRAMMAR 4gr</div>
        <div class="content" id="content"></div>
      </div>
    </div>
  `;

  // sidebar routing
  document.querySelectorAll("[data-go]").forEach(btn=>{
    btn.onclick = () => {
      state.view = btn.dataset.go;
      state.lastScore = null;
      renderApp(session);
    };
  });

  $("#btnLogout").onclick = () => {
    localStorage.removeItem(LS.session);
    state.view = "units";
    state.unitId = null;
    state.exId = null;
    state.testId = null;
    renderLogin();
  };

  renderProgress(session);
  renderContent(session);
  renderAIDock(); // SMS chat (hidden by default)
}

function renderProgress(session){
  const stars = getStars();
  const groups = window.APP_DATA.groups || [];
  let total = 0;

  groups.forEach(g=>{
    const k = keyUnitStars(session, g.id);
    total += (stars[k] || 0);
  });

  const box = $("#progBox");
  if (box) {
    box.textContent = `⭐ Total stars: ${total}`;
  }
}

/* =========================
   CONTENT ROUTER
========================= */
function renderContent(session){
  const content = $("#content");
  const groups = window.APP_DATA.groups || [];

  if (state.view === "units"){
    content.innerHTML = renderUnits(session);
    wireUnits(session);
    return;
  }

  if (state.view === "unit"){
    const unit = groups.find(g=>g.id===state.unitId) || groups[0];
    if (!unit){ state.view="units"; renderApp(session); return; }
    applyUnitTheme(unit.color);
    content.innerHTML = renderUnit(session, unit);
    wireUnit(session, unit);
    return;
  }

  if (state.view === "tests"){
    content.innerHTML = renderTests();
    wireTests(session);
    return;
  }

  if (state.view === "testRun"){
    const t = (window.APP_DATA.tests || []).find(x=>x.id===state.testId);
    if (!t){ state.view="tests"; renderApp(session); return; }
    applyUnitTheme(t.color || "#0f7c8a");
    content.innerHTML = renderTestRun(session, t);
    wireTestRun(session, t);
    return;
  }

  if (state.view === "journal"){
    content.innerHTML = renderJournal(session);
    wireJournal(session);
    return;
  }
}

/* =========================
   UNITS LIST
========================= */
function renderUnits(session){
  const groups = window.APP_DATA.groups || [];
  return `
    <div class="breadcrumb">AI BAYAN GRAMMAR 4gr • Units</div>
    <h2 class="title">Units</h2>

    <div class="card">
      ${groups.map(g=>{
        const stars = getStars();
        const uStars = stars[keyUnitStars(session, g.id)] || 0;
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 6px;border-bottom:1px dashed rgba(0,0,0,.12);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="width:14px;height:14px;border-radius:4px;background:${g.color};display:inline-block;"></span>
              <div style="font-weight:1100;">${g.title}</div>
              <div style="color:var(--muted);font-weight:900;">⭐ ${uStars}</div>
            </div>
            <button class="btn" data-unit="${g.id}">Open</button>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function wireUnits(session){
  document.querySelectorAll("button[data-unit]").forEach(b=>{
    b.onclick = () => {
      state.unitId = b.dataset.unit;
      state.exId = null;
      state.view = "unit";
      state.lastScore = null;
      renderApp(session);
    };
  });
}

/* =========================
   UNIT VIEW
========================= */
function renderUnit(session, unit){
  const rulesHtml = (unit.rules || []).map(r=>`
    <div class="ruleBox">
      <div class="ruleTitle">${r.title}</div>
      <div class="ruleFormula">${(r.formula || []).join(" • ")}</div>
      <div class="ruleRu">${r.ru || ""}</div>
    </div>
  `).join("");

  const exTabs = (unit.exercises || []).map((ex, i)=>`
    <div class="tab ${(!state.exId && i===0) || state.exId===ex.id ? "active":""}" data-ex="${ex.id}">
      ${ex.title}
    </div>
  `).join("");

  // choose current exercise
  const currentEx = pickExercise(unit);

  return `
    <div class="breadcrumb">Units → ${unit.title}</div>
    <h2 class="title">${unit.title}</h2>

    ${rulesHtml}

    <div class="tabs">${exTabs}</div>

    <div class="card">
      ${renderExercise(session, unit, currentEx)}
      <div class="footerBtns">
        <button class="btn" id="btnCheckEx">Check</button>
        <button class="btn" id="btnPrint" style="background:#123c45;">Print</button>
        <button class="btn" id="btnBack" style="background:#123c45;">Back</button>
      </div>
    </div>
  `;
}

function pickExercise(unit){
  const list = unit.exercises || [];
  if (!list.length) return null;
  if (!state.exId) return list[0];
  return list.find(x=>x.id===state.exId) || list[0];
}

function renderExercise(session, unit, ex){
  if (!ex) return `<div style="font-weight:900;">No exercises.</div>`;

  const attempts = getAttempts();
  const k = keyExercise(session, unit.id, ex.id);
  const locked = attempts[k]?.done === true;

  const items = ex.items || [];
  const body = items.map((it, idx)=>{
    if (ex.type === "mc"){
      return `
        <div class="q">
          <div class="qnum">${idx+1}.</div>
          <div class="qtext">${it.text}</div>
          <select data-q="${idx}" ${locked?"disabled":""}>
            ${it.options.map((o,oi)=>`<option value="${oi}">${o}</option>`).join("")}
          </select>
        </div>
      `;
    }
    // input
    return `
      <div class="q">
        <div class="qnum">${idx+1}.</div>
        <div class="qtext">${it.text}</div>
        <input data-q="${idx}" ${locked?"disabled":""} />
      </div>
    `;
  }).join("");

  const saved = attempts[k]?.score;
  const scoreBar = locked
    ? `<div class="scoreBar" style="margin-top:10px;font-weight:900;">Saved score: ${saved}/${items.length}</div>`
    : (state.lastScore ? `<div class="scoreBar" style="margin-top:10px;font-weight:900;">${state.lastScore}</div>` : "");

  return `
    <div style="font-weight:1000;margin-bottom:10px;">${ex.title} <span style="color:var(--muted);font-weight:900;">(${items.length} items)</span></div>
    ${body}
    ${scoreBar}
  `;
}

function wireUnit(session, unit){
  // tabs
  document.querySelectorAll(".tab[data-ex]").forEach(t=>{
    t.onclick = () => {
      state.exId = t.dataset.ex;
      state.lastScore = null;
      renderApp(session);
    };
  });

  $("#btnBack").onclick = () => { state.view="units"; state.lastScore=null; renderApp(session); };

  $("#btnPrint").onclick = () => {
    const ex = pickExercise(unit);
    doPrint(session, unit, ex);
  };

  $("#btnCheckEx").onclick = () => {
    const ex = pickExercise(unit);
    if (!ex) return;

    const attempts = getAttempts();
    const k = keyExercise(session, unit.id, ex.id);
    if (attempts[k]?.done) {
      state.lastScore = "This exercise is locked (1 attempt).";
      renderApp(session);
      return;
    }

    const items = ex.items || [];
    let score = 0;

    // clear old marks
    document.querySelectorAll(".mark").forEach(m=>m.remove());

    if (ex.type === "mc"){
      document.querySelectorAll("select[data-q]").forEach(sel=>{
        const i = Number(sel.dataset.q);
        const ok = Number(sel.value) === items[i].answer;
        score += ok ? 1 : 0;

        const mark = document.createElement("div");
        mark.className = "mark " + (ok ? "ok":"bad");
        mark.textContent = ok ? "✓" : "✕";
        sel.parentElement.appendChild(mark);
      });
    } else {
      document.querySelectorAll("input[data-q]").forEach(inp=>{
        const i = Number(inp.dataset.q);
        const user = (inp.value || "").trim().toLowerCase();
        const ans = String(items[i].answer || "").trim().toLowerCase();
        const ok = user === ans;
        score += ok ? 1 : 0;

        const mark = document.createElement("div");
        mark.className = "mark " + (ok ? "ok":"bad");
        mark.textContent = ok ? "✓" : "✕";
        inp.parentElement.appendChild(mark);
      });
    }

    attempts[k] = { done:true, score, total:items.length, when:new Date().toISOString() };
    setAttempts(attempts);

    // add stars to unit total
    const stars = getStars();
    const uk = keyUnitStars(session, unit.id);
    stars[uk] = (stars[uk] || 0) + score;
    setStars(stars);

    state.lastScore = `Your score is ${score}/${items.length} • ⭐ +${score}`;
    renderApp(session);
  };
}

/* =========================
   TESTS
========================= */
function renderTests(){
  const list = window.APP_DATA.tests || [];
  return `
    <div class="breadcrumb">AI BAYAN GRAMMAR 4gr • Tests</div>
    <h2 class="title">Tests</h2>
    <div class="card">
      ${list.map(t=>`
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 6px;border-bottom:1px dashed rgba(0,0,0,.12);">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="width:14px;height:14px;border-radius:4px;background:${t.color || "#0f7c8a"};display:inline-block;"></span>
            <div style="font-weight:1100;">${t.title}</div>
            <div style="color:var(--muted);font-weight:900;">(${t.items.length} items)</div>
          </div>
          <button class="btn" data-t="${t.id}">Open</button>
        </div>
      `).join("")}
    </div>
  `;
}

function wireTests(session){
  document.querySelectorAll("button[data-t]").forEach(b=>{
    b.onclick = () => {
      state.testId = b.dataset.t;
      state.view = "testRun";
      state.lastScore = null;
      renderApp(session);
    };
  });
}

function renderTestRun(session, test){
  const attempts = getAttempts();
  const k = testKey(session, test.id);
  const locked = attempts[k]?.done === true;

  const body = (test.items || []).map((it, idx)=>`
    <div class="q">
      <div class="qnum">${idx+1}.</div>
      <div class="qtext">${it.text}</div>
      <select data-ti="${idx}" ${locked?"disabled":""}>
        ${it.options.map((o,oi)=>`<option value="${oi}">${o}</option>`).join("")}
      </select>
    </div>
  `).join("");

  const saved = attempts[k]?.score;
  const scoreBar = locked
    ? `<div style="margin-top:10px;font-weight:900;">Saved score: ${saved}/${test.items.length}</div>`
    : (state.lastScore ? `<div style="margin-top:10px;font-weight:900;">${state.lastScore}</div>` : "");

  return `
    <div class="breadcrumb">Tests → ${test.title}</div>
    <h2 class="title">${test.title}</h2>
    <div class="card">
      ${body}
      ${scoreBar}
      <div class="footerBtns">
        <button class="btn" id="testCheck" ${locked?"disabled":""}>Check</button>
        <button class="btn" id="testBack" style="background:#123c45;">Back</button>
      </div>
    </div>
  `;
}

function wireTestRun(session, test){
  $("#testBack").onclick = () => { state.view="tests"; state.lastScore=null; renderApp(session); };

  const btn = $("#testCheck");
  if (!btn) return;

  btn.onclick = () => {
    const attempts = getAttempts();
    const k = testKey(session, test.id);
    if (attempts[k]?.done) return;

    // clear old marks
    document.querySelectorAll(".mark").forEach(m=>m.remove());

    let score = 0;
    document.querySelectorAll("select[data-ti]").forEach(sel=>{
      const i = Number(sel.dataset.ti);
      const ok = Number(sel.value) === test.items[i].answer;
      score += ok ? 1 : 0;

      const mark = document.createElement("div");
      mark.className = "mark " + (ok ? "ok":"bad");
      mark.textContent = ok ? "✓" : "✕";
      sel.parentElement.appendChild(mark);
    });

    attempts[k] = { done:true, score, total:test.items.length, when:new Date().toISOString() };
    setAttempts(attempts);

    state.lastScore = `Your score is ${score}/${test.items.length} (locked)`;
    renderApp(session);
  };
}

/* =========================
   TEACHER JOURNAL (simple)
========================= */
function renderJournal(session){
  const a = window.APP_DATA.auth;
  const logins = a?.logins || [];
  const groups = window.APP_DATA.groups || [];
  const stars = getStars();

  const rows = logins.map(l=>{
    const fakeSession = { role:"student", login:l };
    let sum = 0;
    groups.forEach(g=>{
      sum += (stars[keyUnitStars(fakeSession, g.id)] || 0);
    });
    return `<tr><td>${l}</td><td>⭐ ${sum}</td></tr>`;
  }).join("");

  return `
    <div class="breadcrumb">Teacher Journal</div>
    <h2 class="title">Teacher Journal</h2>
    <div class="card">
      <div style="font-weight:900;margin-bottom:10px;">Stars summary</div>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px;border-bottom:1px solid rgba(0,0,0,.12);">Login</th>
            <th style="text-align:left;padding:8px;border-bottom:1px solid rgba(0,0,0,.12);">Total Stars</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="footerBtns">
        <button class="btn" id="jrBack" style="background:#123c45;">Back</button>
      </div>
    </div>
  `;
}
function wireJournal(session){
  const b = $("#jrBack");
  if (b) b.onclick = () => { state.view="units"; renderApp(session); };
}

/* =========================
   PRINT (A4 + watermark)
========================= */
function doPrint(session, unit, ex){
  const title = `AI BAYAN GRAMMAR 4gr`;
  const sub = `${unit?.title || ""} • ${ex?.title || ""}`;
  const wm = `${title}`;

  const items = ex?.items || [];
  const list = items.map((it, i)=>`<li style="margin:6px 0;">${i+1}. ${it.text}</li>`).join("");

  const win = window.open("", "_blank");
  win.document.write(`
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Print</title>
      <style>
        body{font-family:Arial,sans-serif;margin:28px;}
        h1{font-size:18px;margin:0;}
        h2{font-size:13px;color:#555;margin:6px 0 18px;}
        .wm{
          position:fixed; inset:0;
          display:flex; align-items:center; justify-content:center;
          pointer-events:none;
          font-size:64px; font-weight:900;
          color:rgba(0,0,0,.06);
          transform:rotate(-20deg);
          z-index:0;
        }
        .box{position:relative; z-index:1;}
      </style>
    </head>
    <body>
      <div class="wm">${wm}</div>
      <div class="box">
        <h1>${title}</h1>
        <h2>${sub} • ${session.login} • ${new Date().toLocaleDateString()}</h2>
        <ol>${list}</ol>
      </div>
      <script>window.print();</script>
    </body>
    </html>
  `);
  win.document.close();
}

/* =========================
   AI BAYAN SMS CHAT (1/day)
========================= */
function renderAIDock(){
  // remove old
  const oldDock = document.querySelector(".aiDock");
  if (oldDock) oldDock.remove();
  const oldBtn = document.querySelector(".smsBtn");
  if (oldBtn) oldBtn.remove();

  const dock = document.createElement("div");
  dock.className = "aiDock";
  dock.style.display = "none";

  const welcome = (window.APP_DATA.aiBayan?.welcome || "AI Bayan chat.");
  const quick = (window.APP_DATA.aiBayan?.quick || []);

  dock.innerHTML = `
    <div class="aiHead">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span>AI Bayan</span>
        <span style="opacity:.9;font-size:12px;">1 question/day</span>
      </div>
    </div>
    <div class="aiBody">
      <div class="aiMsg" id="aiMsg">${welcome}</div>
      <div class="aiRow">
        <input id="aiInp" type="text" placeholder="Type your question..." />
        <button class="btn" id="aiSend">Send</button>
      </div>
      <div class="quickRow">
        ${quick.map(q=>`<button class="quick" data-q="${q}">${q}</button>`).join("")}
      </div>
      <div class="aiTiny" id="aiTiny"></div>
    </div>
  `;
  document.body.appendChild(dock);

  const btn = document.createElement("button");
  btn.className = "smsBtn";
  btn.textContent = "SMS";
  document.body.appendChild(btn);

  const setTiny = () => {
    const ok = canAskAI();
    $("#aiTiny").textContent = ok
      ? `You can ask 1 question today (${todayKey()}).`
      : `Limit reached for today (${todayKey()}). Come back tomorrow.`;
  };
  setTiny();

  const answerLocal = (q) => {
    const t = (q || "").toLowerCase();
    if (t.includes("present simple") || t.includes("ps")) {
      return "Present Simple (RU): привычки/факты. he/she/it + s/es. Neg: don’t/doesn’t + V1. Q: Do/Does + S + V1?";
    }
    if (t.includes("present continuous") || t.includes("pc")) {
      return "Present Continuous (RU): действие сейчас. am/is/are + V-ing. Neg: am not/isn’t/aren’t. Q: Am/Is/Are + S + V-ing?";
    }
    if (t.includes("past simple")) {
      return "Past Simple (RU): V2/ed. Neg: didn’t + V1. Q: Did + S + V1? words: yesterday/last/ago.";
    }
    if (t.includes("examples")) return "Examples: I study English. She studies every day. They are playing now. I went to school yesterday. There are some apples.";
    if (t.includes("check")) return "Write your sentence. I will correct it (grammar + better version).";
    return "I can explain rules (RU), give examples, and check sentences.";
  };

  const send = (text) => {
    const msg = (text || "").trim();
    if (!msg) return;
    if (!canAskAI()) { setTiny(); return; }
    incAI();
    $("#aiMsg").textContent = answerLocal(msg);
    $("#aiInp").value = "";
    setTiny();
  };

  $("#aiSend").onclick = () => send($("#aiInp").value);
  dock.querySelectorAll(".quick").forEach(b => b.onclick = () => send(b.dataset.q));

  btn.onclick = () => {
    dock.style.display = (dock.style.display === "none") ? "block" : "none";
  };
}
