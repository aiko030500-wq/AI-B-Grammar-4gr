/* app.js — AI BAYAN GRAMMAR 4gr (UI fixed)
   - Student PIN 2844, Teacher PIN 3244
   - Logins: 4GL1..4GL15
   - 15 Units + Tests
   - Unit header color changes per unit
   - 5 exercises = 5 strong shades of unit color
   - ✅/❌ + stars saved + 1 attempt saved
   - Chat ONLY on main menu (bottom bar)
   - Print ONLY inside unit
*/

(function () {
  const APP_TITLE = "AI BAYAN GRAMMAR 4gr";

  // ---------- helpers ----------
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const esc = (s = "") =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const todayKey = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const loadJSON = (k, fb) => {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fb;
    } catch {
      return fb;
    }
  };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // ---------- localStorage keys ----------
  const LS = {
    session: "AIBAYAN_GF4_SESSION",
    stars: "AIBAYAN_GF4_STARS", // {login:{points:number}}
    attempts: "AIBAYAN_GF4_ATTEMPTS", // {login:{key:true}}
    results: "AIBAYAN_GF4_RESULTS", // {login:{key:{answers:{}, marks:{}, score:number}}}
    chat: "AIBAYAN_GF4_CHAT", // {login:{YYYY-MM-DD:true}}
    teacherLog: "AIBAYAN_GF4_TEACHER_LOG", // array
  };

  // ---------- auth ----------
  const AUTH = {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({ length: 15 }, (_, i) => `4GL${i + 1}`),
  };

  function getSession() {
    return loadJSON(LS.session, null);
  }
  function setSession(s) {
    saveJSON(LS.session, s);
  }
  function clearSession() {
    localStorage.removeItem(LS.session);
  }

  // ---------- data ----------
  const FALLBACK = {
    units: buildDefaultUnits(),
    tests: buildDefaultTests(),
  };

  function getData() {
    const d = window.APP_DATA || {};
    return {
      units: Array.isArray(d.units) && d.units.length ? d.units : FALLBACK.units,
      tests: Array.isArray(d.tests) && d.tests.length ? d.tests : FALLBACK.tests,
    };
  }

  function buildDefaultUnits() {
    const topics = [
      { title: "Unit 1", topic: "Present Simple vs Present Continuous",
        ruleEn: "Present Simple: habits/facts. Present Continuous: action now/temporary. PS Q: Do/Does + S + V1? PC Q: Am/Is/Are + S + V-ing?",
        ruleRu: "Present Simple: привычки/факты. Present Continuous: сейчас/временно. Вопросы: Do/Does (PS) и Am/Is/Are (PC)." },
      { title: "Unit 2", topic: "Past Simple (regular verbs + be)",
        ruleEn: "Past Simple: finished past actions. Regular verbs: V + -ed. Be: was/were. Neg: didn’t + V1 (be: wasn’t/weren’t). Q: Did + S + V1? (be: Was/Were + S?)",
        ruleRu: "Past Simple: завершённые действия. Правильные: V + -ed. Be: was/were. Отриц: didn’t + V1 (be: wasn’t/weren’t). Вопрос: Did + S + V1? (be: Was/Were + S?)" },
      { title: "Unit 3", topic: "Past Simple (irregular verbs)",
        ruleEn: "Affirmative: V2 (go→went). Neg/Q: didn’t + V1; Did + S + V1? Short: Yes, I did / No, I didn’t.",
        ruleRu: "Утв.: V2 (go→went). Отриц/вопр.: didn’t + V1; Did + S + V1? Кратко: Yes, I did / No, I didn’t." },
      { title: "Unit 4", topic: "Possessive pronouns + ’s",
        ruleEn: "Possessive pronouns: mine, yours, his, hers, ours, theirs. ’s shows possession: Tom’s bag.",
        ruleRu: "Притяж. местоимения: mine, yours, his, hers, ours, theirs. ’s = принадлежность: Tom’s bag." },
      { title: "Unit 5", topic: "Have to / must + Imperative",
        ruleEn: "Have to / must + V1 = obligation. Imperative: Open the door. Don’t + V1.",
        ruleRu: "Have to / must + V1 = обязанность. Imperative: Open… / Don’t + V1." },
      { title: "Unit 6", topic: "Comparatives & Superlatives",
        ruleEn: "Comparative: -er / more. Superlative: the -est / the most. Irregular: good→better→best.",
        ruleRu: "Сравнит.: -er / more. Превосх.: the -est / the most. Искл.: good→better→best." },
      { title: "Unit 7", topic: "Will / won’t",
        ruleEn: "Future: will/won’t + V1. Q: Will + S + V1?",
        ruleRu: "Будущее: will/won’t + V1. Вопрос: Will + S + V1?" },
      { title: "Unit 8", topic: "Much / many / some / any",
        ruleEn: "Much (uncountable), many (countable plural). Some in affirmative, any in questions/negative.",
        ruleRu: "Much (неисч.), many (исч. мн.ч.). Some в утвердит., any в вопрос/отриц." },
      { title: "Unit 9", topic: "Infinitive of purpose",
        ruleEn: "To + V1 = purpose.",
        ruleRu: "To + V1 = цель." },
      { title: "Unit 10", topic: "Present Perfect (1)",
        ruleEn: "Have/has + V3. Q: Have/Has + S + V3?",
        ruleRu: "Have/has + V3. Вопрос: Have/Has + S + V3?" },
      { title: "Unit 11", topic: "Present Perfect (2): ever / never",
        ruleEn: "Ever (questions). Never = not at any time.",
        ruleRu: "Ever (вопросы). Never = никогда." },
      { title: "Unit 12", topic: "Should / could",
        ruleEn: "Should = advice. Could = ability/permission.",
        ruleRu: "Should = совет. Could = умение/возможность." },
      { title: "Unit 13", topic: "Object pronouns + who/which",
        ruleEn: "me/you/him/her/it/us/them. who (people), which (things).",
        ruleRu: "me/you/him/her/it/us/them. who (люди), which (вещи)." },
      { title: "Unit 14", topic: "Past Continuous",
        ruleEn: "was/were + V-ing (in progress in the past).",
        ruleRu: "was/were + V-ing (действие в процессе)." },
      { title: "Unit 15", topic: "Past Simple vs Past Continuous",
        ruleEn: "Past Simple = finished; Past Continuous = in progress.",
        ruleRu: "Past Simple = завершено; Past Continuous = процесс." },
    ];

    return topics.map((t, idx) => ({
      id: `u${idx + 1}`,
      title: t.title,
      topic: t.topic,
      ruleEn: t.ruleEn,
      ruleRu: t.ruleRu,
      exercises: Array.from({ length: 5 }, (_, e) => ({
        id: `ex${e + 1}`,
        title: `Exercise ${e + 1}`,
        items: buildDefaultItems(idx + 1, e + 1, 10),
      })),
    }));
  }

  function buildDefaultItems(unitNum, exNum, n) {
    const base = [
      { q: "Write the correct form.", a: "ok" },
      { q: "Choose the correct option.", a: "ok" },
      { q: "Make a question.", a: "ok" },
      { q: "Make a negative sentence.", a: "ok" },
      { q: "Translate (RU→EN).", a: "ok" },
    ];
    return Array.from({ length: n }, (_, i) => ({
      id: `i${unitNum}_${exNum}_${i + 1}`,
      prompt: base[i % base.length].q,
      answer: base[i % base.length].a,
      kind: "text",
    }));
  }

  function buildDefaultTests() {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `t${i + 1}`,
      title: `Test — Unit ${i + 1}`,
      items: Array.from({ length: 10 }, (_, k) => ({
        id: `t${i + 1}_q${k + 1}`,
        prompt: `Unit ${i + 1}: Question ${k + 1}`,
        answer: "ok",
      })),
    }));
  }

  // ---------- state ----------
  const state = {
    view: "menu", // menu | unit | tests | teacher
    unitId: "u1",
    exId: "ex1",
    testId: "t1",
    chatOpen: false,
  };

  // ---------- stars / attempts / results ----------
  function getStars() {
    return loadJSON(LS.stars, {});
  }
  function addStars(login, delta) {
    const s = getStars();
    if (!s[login]) s[login] = { points: 0 };
    s[login].points += delta;
    saveJSON(LS.stars, s);
  }
  function getTotalStars(login) {
    const s = getStars();
    return s?.[login]?.points || 0;
  }

  function getAttempts() {
    return loadJSON(LS.attempts, {});
  }
  function hasAttempt(login, key) {
    const a = getAttempts();
    return !!a?.[login]?.[key];
  }
  function markAttempt(login, key) {
    const a = getAttempts();
    if (!a[login]) a[login] = {};
    a[login][key] = true;
    saveJSON(LS.attempts, a);
  }

  function getResults() {
    return loadJSON(LS.results, {});
  }
  function saveResult(login, key, payload) {
    const r = getResults();
    if (!r[login]) r[login] = {};
    r[login][key] = payload;
    saveJSON(LS.results, r);
  }
  function loadResult(login, key) {
    const r = getResults();
    return r?.[login]?.[key] || null;
  }

  // ---------- chat limit ----------
  function canAskToday(login) {
    const chat = loadJSON(LS.chat, {});
    const k = todayKey();
    return !chat?.[login]?.[k];
  }
  function markAskedToday(login) {
    const chat = loadJSON(LS.chat, {});
    const k = todayKey();
    if (!chat[login]) chat[login] = {};
    chat[login][k] = true;
    saveJSON(LS.chat, chat);
  }

  // ---------- teacher log ----------
  function pushTeacherLog(row) {
    const all = loadJSON(LS.teacherLog, []);
    all.push(row);
    saveJSON(LS.teacherLog, all);
  }

  // ---------- themes ----------
  const APP_BAR = "#0f7c8a";
  function getUnitBase(i) {
    const palette = [
      "#7C4DFF","#00BFA6","#1E88E5","#43A047","#FB8C00",
      "#E53935","#8E24AA","#00897B","#3949AB","#6D4C41",
      "#F4511E","#039BE5","#5E35B1","#2E7D32","#C0CA33",
    ];
    return palette[i % palette.length];
  }

  // Unit 1 purple shades requested
  const U1_PURPLES = ["#4B1FA6", "#B9A7FF", "#2D0B66", "#7A2EE6", "#E3D9FF"];

  function getUnitTheme(unitIndex) {
    const base = getUnitBase(unitIndex);
    if (unitIndex === 0) return { base, shades: U1_PURPLES };
    return { base, shades: makeStrongShades(base) };
  }

  function makeStrongShades(hex) {
    const rgb = hexToRgb(hex);
    const dark1 = rgbToHex(mix(rgb, { r: 0, g: 0, b: 0 }, 0.25));
    const dark2 = rgbToHex(mix(rgb, { r: 0, g: 0, b: 0 }, 0.45));
    const mid = rgbToHex(mix(rgb, { r: 255, g: 255, b: 255 }, 0.15));
    const light1 = rgbToHex(mix(rgb, { r: 255, g: 255, b: 255 }, 0.30));
    const light2 = rgbToHex(mix(rgb, { r: 255, g: 255, b: 255 }, 0.45));
    return [dark1, mid, dark2, light1, light2];
  }

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const num = parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }
  function mix(a, b, t) {
    return {
      r: Math.round(a.r * (1 - t) + b.r * t),
      g: Math.round(a.g * (1 - t) + b.g * t),
      b: Math.round(a.b * (1 - t) + b.b * t),
    };
  }
  function rgbToHex(c) {
    const h = (v) => v.toString(16).padStart(2, "0");
    return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
  }

  // ---------- mount ----------
  function mount() {
    const session = getSession();
    if (!session) return renderLogin();
    renderApp(session);
  }

  // ---------- LOGIN (no huge picture) ----------
  function renderLogin(errMsg = "") {
    $("#app").innerHTML = `
      <div class="loginPage">
        <div class="loginHero">
          <img class="heroLogo" src="logo.png" alt="logo"/>
          <div class="heroTitle">${esc(APP_TITLE)}</div>
          <div class="heroSub">4 GRADE</div>
        </div>

        <div class="loginCard">
          ${errMsg ? `<div class="loginError">${esc(errMsg)}</div>` : ""}

          <div class="loginForm">
            <label>Login</label>
            <input id="loginInput" class="input" autocomplete="username" />
            <label>PIN</label>
            <input id="pinInput" class="input" type="password" autocomplete="current-password" />
            <button id="loginBtn" class="btnPrimary">Enter</button>
          </div>
        </div>
      </div>
    `;

    $("#loginBtn").onclick = () => {
      const login = ($("#loginInput").value || "").trim();
      const pin = ($("#pinInput").value || "").trim();
      if (!login || !pin) return renderLogin("Fill in Login and PIN.");

      if (pin === AUTH.teacherPin) {
        setSession({ role: "teacher", login: login || "TEACHER" });
        return mount();
      }

      const okLogin = AUTH.logins.includes(login);
      const okPin = pin === AUTH.studentPin;
      if (!okLogin || !okPin) return renderLogin("Wrong login or PIN.");

      setSession({ role: "student", login });
      mount();
    };
  }

  // ---------- APP ----------
  function renderApp(session) {
    const data = getData();

    const unit = data.units.find((u) => u.id === state.unitId) || data.units[0];
    const unitIndex = data.units.findIndex((u) => u.id === unit.id);
    const ex = (unit.exercises || []).find((e) => e.id === state.exId) || unit.exercises[0];
    const test = data.tests.find((t) => t.id === state.testId) || data.tests[0];

    const theme = getUnitTheme(unitIndex);

    // Set main colors
    const barColor = state.view === "unit" ? theme.base : APP_BAR;

    document.documentElement.style.setProperty("--appbar", barColor);
    document.documentElement.style.setProperty("--unitBase", state.view === "unit" ? theme.base : "#0f7c8a");
    document.documentElement.style.setProperty("--shade1", theme.shades[0]);
    document.documentElement.style.setProperty("--shade2", theme.shades[1]);
    document.documentElement.style.setProperty("--shade3", theme.shades[2]);
    document.documentElement.style.setProperty("--shade4", theme.shades[3]);
    document.documentElement.style.setProperty("--shade5", theme.shades[4]);

    const totalStars = session.role === "student" ? getTotalStars(session.login) : 0;

    $("#app").innerHTML = `
      <div class="shell">

        <header class="topbar" style="background:${esc(barColor)}">
          <div class="brand">
            <img class="logo" src="logo.png" alt="logo"/>
            <div class="brandText">
              <div class="brandTitle">${esc(APP_TITLE)}</div>
              <div class="brandSub">${esc(session.role === "teacher" ? "Teacher" : session.login)}</div>
            </div>
          </div>
        </header>

        <div class="layout">
          <aside class="left">
            <div class="navCard">
              <button class="navBtn ${state.view === "menu" ? "active" : ""}" data-view="menu">Main Menu</button>
              <button class="navBtn ${state.view === "tests" ? "active" : ""}" data-view="tests">Tests</button>
              ${
                session.role === "teacher"
                  ? `<button class="navBtn ${state.view === "teacher" ? "active" : ""}" data-view="teacher">Teacher Journal</button>`
                  : ""
              }
              <button class="navBtn" id="logoutBtnSide">Logout</button>
            </div>
          </aside>

          <main class="main">
            ${renderMain(session, data, unit, ex, test, theme, totalStars)}
          </main>
        </div>

        ${state.view === "menu" ? renderBottomBar(session, totalStars) : ""}

        ${state.view === "menu" ? renderChatModal(session) : ""}

      </div>
    `;

    // NAV
    $$(".navBtn[data-view]").forEach((b) => {
      b.onclick = () => {
        state.view = b.dataset.view;
        state.chatOpen = false;
        renderApp(session);
      };
    });

    const logoutSide = $("#logoutBtnSide");
    if (logoutSide) logoutSide.onclick = () => { clearSession(); mount(); };

    // Unit tiles click
    $$(".unitTile").forEach((t) => {
      t.onclick = () => {
        state.unitId = t.dataset.uid;
        state.exId = "ex1";
        state.view = "unit";
        renderApp(session);
      };
    });

    // Exercise tabs click
    $$(".exTab").forEach((b) => {
      b.onclick = () => {
        state.exId = b.dataset.exid;
        renderApp(session);
      };
    });

    // Test tiles click
    $$(".testTile").forEach((t) => {
      t.onclick = () => {
        state.testId = t.dataset.tid;
        state.view = "tests";
        renderApp(session);
      };
    });

    // Back buttons
    const backMenu = $("#backMenuBtn");
    if (backMenu) {
      backMenu.onclick = () => {
        state.view = "menu";
        renderApp(session);
      };
    }

    // Submit handlers
    const submitBtn = $("#submitBtn");
    if (submitBtn) {
      submitBtn.onclick = () => submitExercise(session, unit, ex);
      setAttemptUI(session, `unit_${unit.id}_${ex.id}`);
      applySavedMarksIfAny(session, `unit_${unit.id}_${ex.id}`);
    }

    const submitTestBtn = $("#submitTestBtn");
    if (submitTestBtn) {
      submitTestBtn.onclick = () => submitTest(session, test);
      setAttemptUI(session, `test_${test.id}`, true);
      applySavedMarksIfAny(session, `test_${test.id}`, true);
    }

    // Print ONLY inside unit
    const printUnitBtn = $("#printUnitBtn");
    if (printUnitBtn) printUnitBtn.onclick = () => window.print();

    // Bottom bar actions (menu only)
    const bottomLogout = $("#bottomLogout");
    if (bottomLogout) bottomLogout.onclick = () => { clearSession(); mount(); };

    const bottomChat = $("#bottomChat");
    if (bottomChat) bottomChat.onclick = () => {
      state.chatOpen = true;
      renderApp(session);
      setChatUI(session);
    };

    const bottomTeacher = $("#bottomTeacher");
    if (bottomTeacher) bottomTeacher.onclick = () => {
      state.view = "teacher";
      state.chatOpen = false;
      renderApp(session);
    };

    // Chat close
    const close = $("#chatClose");
    if (close) {
      close.onclick = () => {
        state.chatOpen = false;
        renderApp(session);
      };
    }

    if (state.view === "teacher") {
      renderTeacherJournal();
    }
  }

  // ---------- Bottom bar (menu only) ----------
  function renderBottomBar(session, totalStars) {
    return `
      <div style="height:86px"></div>
      <div style="
        position:fixed; left:0; right:0; bottom:0; z-index:80;
        padding:10px 12px 14px;
        background: linear-gradient(180deg, rgba(255,255,255,.0) 0%, rgba(255,255,255,.92) 30%, rgba(255,255,255,.98) 100%);
        backdrop-filter: blur(8px);
      ">
        <div style="
          max-width:820px; margin:0 auto;
          display:grid; gap:10px;
          grid-template-columns: 1fr 1fr;
        ">
          <div class="card" style="margin:0; padding:12px;">
            <div style="font-weight:1000; color:#0f4450;">Progress</div>
            <div class="starsLine" style="margin-top:6px;">⭐ Total stars: <b>${esc(String(totalStars))}</b></div>
          </div>

          <div style="display:grid; gap:10px; grid-template-columns: 1fr 1fr;">
            <button id="bottomChat" class="btnPrimary" style="width:100%; margin:0;">AI Bayan Chat</button>

            ${
              session.role === "teacher"
                ? `<button id="bottomTeacher" class="btnPrimary" style="width:100%; margin:0;">Teacher Journal</button>`
                : `<button id="bottomLogout" class="btnDanger" style="width:100%; margin:0;">Logout</button>`
            }
          </div>
        </div>

        ${
          session.role === "teacher"
            ? `<div style="max-width:820px; margin:10px auto 0;">
                 <button id="bottomLogout" class="btnDanger" style="width:100%;">Logout</button>
               </div>`
            : ``
        }
      </div>
    `;
  }

  // ---------- MAIN VIEWS ----------
  function renderMain(session, data, unit, ex, test, theme, totalStars) {
    if (state.view === "menu") {
      return `
        <div class="tiles unitsGrid">
          ${data.units
            .map((u, i) => {
              const th = getUnitTheme(i);
              return `
                <div class="unitTile" data-uid="${esc(u.id)}" style="--tile:${esc(th.base)}">
                  <div class="tileTextOnly">
                    <div class="tileTitle">${esc(u.title)}</div>
                    <div class="tileSub">${esc(u.topic)}</div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    }

    if (state.view === "tests") {
      return `
        <div class="pageHeader">
          <div class="pageSub">Tests</div>
        </div>

        <div class="tiles">
          ${data.tests
            .map((t) => {
              return `
                <div class="testTile" data-tid="${esc(t.id)}">
                  <div class="tileTitle">${esc(t.title)}</div>
                  <div class="tileSub">10 items</div>
                </div>
              `;
            })
            .join("")}
        </div>

        <div class="card">
          <div class="cardHeader">
            <div class="cardTitle">${esc(test.title)}</div>
            <div class="badge">10 items</div>
          </div>

          ${renderItemsForm(session, test.items, `test_${test.id}`)}

          ${
            session.role === "student"
              ? `<div class="cardActions">
                  <button id="submitTestBtn" class="btnPrimary">Check</button>
                  <button id="backMenuBtn" class="btnGhost">Back to Menu</button>
                  <div id="attemptInfoTest" class="muted"></div>
                </div>`
              : `<div class="cardActions">
                  <button id="backMenuBtn" class="btnGhost">Back to Menu</button>
                </div>`
          }
        </div>
      `;
    }

    if (state.view === "teacher") {
      return `
        <div class="pageHeader">
          <div class="pageSub">Teacher Journal</div>
        </div>
        <div class="card" id="teacherCard">
          <div class="muted">Loading…</div>
        </div>
      `;
    }

    // ---------- UNIT VIEW ----------
    const exTabs = unit.exercises
      .map((e, idx) => {
        const shade = theme.shades[idx] || theme.base;
        const active = e.id === ex.id ? "active" : "";
        return `<button class="exTab ${active}" data-exid="${esc(e.id)}" style="--tab:${esc(shade)}">${esc(e.title)}</button>`;
      })
      .join("");

    const unitKey = `unit_${unit.id}_${ex.id}`;

    return `
      <div class="unitHeader" style="--unitBase:${esc(theme.base)}">
        <div class="unitHeaderText">
          <div class="unitHeaderTitle">${esc(unit.title)}</div>
          <div class="unitHeaderSub">${esc(unit.topic)}</div>
        </div>
        <img class="unitHeaderLogo" src="logo.png" alt="logo"/>
      </div>

      <div class="ruleCard">
        <div class="ruleTitleRow">
          <div class="ruleTitle">Grammar rule</div>
          <div class="badge">Unit</div>
        </div>

        <div class="ruleBlock">
          <div class="ruleLabel">Rule (EN)</div>
          <div class="ruleText">${esc(unit.ruleEn)}</div>
        </div>
        <div class="ruleBlock">
          <div class="ruleLabel">Объяснение (RU)</div>
          <div class="ruleText">${esc(unit.ruleRu)}</div>
        </div>
      </div>

      <div class="tabsRow">${exTabs}</div>

      <div class="card">
        <div class="cardHeader">
          <div class="cardTitle">${esc(ex.title)}</div>
          <div class="badge">10 items</div>
        </div>

        ${renderItemsForm(session, ex.items, unitKey)}

        ${
          session.role === "student"
            ? `<div class="cardActions">
                <button id="submitBtn" class="btnPrimary">Check</button>
                <button id="backMenuBtn" class="btnGhost">Back to Menu</button>
                <button id="printUnitBtn" class="btnGhost">Print</button>
                <div id="attemptInfo" class="muted"></div>
              </div>`
            : `<div class="cardActions">
                <button id="backMenuBtn" class="btnGhost">Back to Menu</button>
                <button id="printUnitBtn" class="btnGhost">Print</button>
              </div>`
        }
      </div>
    `;
  }

  // ---------- ITEMS FORM with SAVED marks ----------
  function renderItemsForm(session, items, keyPrefix) {
    const list = (items || []).slice(0, 10);
    const saved = session.role === "student" ? loadResult(session.login, keyPrefix) : null;
    const savedAnswers = saved?.answers || {};
    const savedMarks = saved?.marks || {};

    return `
      <div class="items">
        ${list
          .map((it, idx) => {
            const id = `${keyPrefix}_${it.id}`;
            const ans = savedAnswers[it.id] ?? "";
            const mark = savedMarks[it.id];
            const disabled = saved ? "disabled" : "";
            return `
              <div class="itemRow">
                <div class="q">
                  <div class="qNum">${idx + 1}.</div>
                  <div class="qText">${esc(it.prompt)}</div>
                </div>
                <div class="a">
                  <input class="input ans" data-aid="${esc(it.id)}" id="${esc(id)}" value="${esc(ans)}" placeholder="Answer..." ${disabled}/>
                  <div class="mark ${mark ? esc(mark) : ""}" id="${esc(id)}_mark">${
                    mark === "ok" ? "✓" : mark === "bad" ? "✗" : ""
                  }</div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  // ---------- CHECKING ----------
  function isAnswerCorrect(user, expected) {
    if (expected === "ok") return user.trim().length > 0;
    const norm = (x) =>
      String(x || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
    return norm(user) === norm(expected);
  }

  function submitExercise(session, unit, ex) {
    if (session.role !== "student") return;
    const key = `unit_${unit.id}_${ex.id}`;
    if (hasAttempt(session.login, key)) return;

    const items = (ex.items || []).slice(0, 10);
    let correct = 0;
    const marks = {};
    const answers = {};

    items.forEach((it) => {
      const inp = $(`.ans[data-aid="${CSS.escape(it.id)}"]`);
      const user = (inp?.value || "").trim();
      answers[it.id] = user;

      const ok = isAnswerCorrect(user, it.answer);
      marks[it.id] = ok ? "ok" : "bad";

      const markEl = $(`#${CSS.escape(key + "_" + it.id)}_mark`);
      if (markEl) {
        markEl.className = "mark " + (ok ? "ok" : "bad");
        markEl.textContent = ok ? "✓" : "✗";
      }
      if (ok) correct++;
      if (inp) inp.disabled = true;
    });

    addStars(session.login, correct);
    markAttempt(session.login, key);
    saveResult(session.login, key, { answers, marks, score: correct });

    pushTeacherLog({
      type: "exercise",
      login: session.login,
      when: new Date().toISOString(),
      unit: unit.title,
      ex: ex.title,
      score: `${correct}/10`,
      stars: correct,
    });

    renderApp(session);
  }

  function submitTest(session, test) {
    if (session.role !== "student") return;
    const key = `test_${test.id}`;
    if (hasAttempt(session.login, key)) return;

    const items = (test.items || []).slice(0, 10);
    let correct = 0;
    const marks = {};
    const answers = {};

    items.forEach((it) => {
      const inp = $(`.ans[data-aid="${CSS.escape(it.id)}"]`);
      const user = (inp?.value || "").trim();
      answers[it.id] = user;

      const ok = isAnswerCorrect(user, it.answer);
      marks[it.id] = ok ? "ok" : "bad";

      const markEl = $(`#${CSS.escape(key + "_" + it.id)}_mark`);
      if (markEl) {
        markEl.className = "mark " + (ok ? "ok" : "bad");
        markEl.textContent = ok ? "✓" : "✗";
      }
      if (ok) correct++;
      if (inp) inp.disabled = true;
    });

    addStars(session.login, correct);
    markAttempt(session.login, key);
    saveResult(session.login, key, { answers, marks, score: correct });

    pushTeacherLog({
      type: "test",
      login: session.login,
      when: new Date().toISOString(),
      test: test.title,
      score: `${correct}/10`,
      stars: correct,
    });

    renderApp(session);
  }

  function setAttemptUI(session, key, isTest = false) {
    if (session.role !== "student") return;
    const attempted = hasAttempt(session.login, key);

    const info = isTest ? $("#attemptInfoTest") : $("#attemptInfo");
    const btn = isTest ? $("#submitTestBtn") : $("#submitBtn");

    if (attempted) {
      if (info) info.textContent = "Attempt used (1 try).";
      if (btn) btn.disabled = true;
      $$(".ans").forEach((i) => (i.disabled = true));
    } else {
      if (info) info.textContent = "1 attempt.";
      if (btn) btn.disabled = false;
    }
  }

  function applySavedMarksIfAny(session, key) {
    if (session.role !== "student") return;
    const saved = loadResult(session.login, key);
    if (!saved) return;
    setAttemptUI(session, key, key.startsWith("test_"));
  }

  // ---------- TEACHER JOURNAL ----------
  function renderTeacherJournal() {
    const card = $("#teacherCard");
    if (!card) return;

    const stars = loadJSON(LS.stars, {});
    const attempts = loadJSON(LS.attempts, {});
    const log = loadJSON(LS.teacherLog, []).slice().reverse();

    const rows = AUTH.logins
      .map((login) => {
        const s = stars?.[login]?.points || 0;
        const aCount = Object.keys(attempts?.[login] || {}).length;

        const last = log.find((x) => x.login === login);
        const lastText = last
          ? `${new Date(last.when).toLocaleDateString()} ${new Date(last.when).toLocaleTimeString()} · ${last.type} · ⭐${last.stars}`
          : "—";

        return `
          <tr>
            <td><b>${esc(login)}</b></td>
            <td>⭐ ${esc(String(s))}</td>
            <td>${esc(String(aCount))}</td>
            <td>${esc(lastText)}</td>
          </tr>
        `;
      })
      .join("");

    card.innerHTML = `
      <div class="tableWrap">
        <table class="t">
          <thead>
            <tr>
              <th>Student</th>
              <th>Stars</th>
              <th>Attempts</th>
              <th>Last activity</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <div class="mutedSmall" style="margin-top:10px;">Saved on this device (localStorage).</div>

      <div style="height:14px"></div>

      <div class="card" style="padding:14px;">
        <div style="font-weight:1000; margin-bottom:8px;">Latest results</div>
        <div class="tableWrap">
          <table class="t">
            <thead>
              <tr>
                <th>Time</th><th>Login</th><th>Type</th><th>Unit/Test</th><th>Score</th><th>Stars</th>
              </tr>
            </thead>
            <tbody>
              ${
                log.length
                  ? log.slice(0, 80).map((r) => {
                      const when = new Date(r.when);
                      const w = `${when.toLocaleDateString()} ${when.toLocaleTimeString()}`;
                      const title = r.type === "exercise" ? `${r.unit} — ${r.ex}` : `${r.test}`;
                      return `
                        <tr>
                          <td>${esc(w)}</td>
                          <td>${esc(r.login)}</td>
                          <td>${esc(r.type)}</td>
                          <td>${esc(title)}</td>
                          <td><b>${esc(r.score)}</b></td>
                          <td>⭐ ${esc(String(r.stars))}</td>
                        </tr>
                      `;
                    }).join("")
                  : `<tr><td colspan="6">No results yet.</td></tr>`
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ---------- CHAT (menu only) ----------
  function renderChatModal(session) {
    if (!state.chatOpen) return "";
    const locked = session.role !== "student" ? false : !canAskToday(session.login);

    return `
      <div class="chatOverlay">
        <div class="chatModal">
          <div class="chatHeader">
            <div class="chatTitle">AI Bayan</div>
            <button class="chatClose" id="chatClose">✕</button>
          </div>

          <div class="chatBody">
            <div class="mutedSmall">1 question/day · ${esc(todayKey())}</div>

            <div class="quickRow">
              <button class="chip" data-q="Explain Present Simple (RU)">Explain Present Simple (RU)</button>
              <button class="chip" data-q="Explain Present Continuous (RU)">Explain Present Continuous (RU)</button>
              <button class="chip" data-q="Explain Past Simple (RU)">Explain Past Simple (RU)</button>
              <button class="chip" data-q="Give 5 examples">Give 5 examples</button>
              <button class="chip" data-q="Check my sentence">Check my sentence</button>
            </div>

            <div class="chatLog" id="chatLog"></div>

            <div class="chatInputRow">
              <input id="chatInput" class="input" placeholder="Type your question..." ${locked ? "disabled" : ""}/>
              <button id="chatSend" class="btnPrimary" ${locked ? "disabled" : ""}>Send</button>
            </div>

            <div class="mutedSmall" id="chatLimitInfo">${
              session.role === "student"
                ? locked
                  ? `Limit reached for today. Come back tomorrow.`
                  : `You can ask 1 question today.`
                : `Teacher mode: chat is available.`
            }</div>
          </div>
        </div>
      </div>
    `;
  }

  function setChatUI(session) {
    const login = session.login || "user";
    const logKey = `GF4_CHATLOG_${login}`;
    const history = loadJSON(logKey, []);
    const logEl = $("#chatLog");
    if (logEl) {
      logEl.innerHTML = history
        .map((m) => `
          <div class="msg ${m.role}">
            <div class="bubble">${esc(m.text)}</div>
          </div>`)
        .join("");
      logEl.scrollTop = logEl.scrollHeight;
    }

    $$(".chip").forEach((c) => {
      c.onclick = () => {
        if (session.role === "student" && !canAskToday(login)) return;
        sendChat(session, c.dataset.q || "");
      };
    });

    const sendBtn = $("#chatSend");
    const inp = $("#chatInput");
    if (sendBtn && inp) {
      sendBtn.onclick = () => sendChat(session, inp.value || "");
      inp.onkeydown = (e) => { if (e.key === "Enter") sendBtn.click(); };
    }
  }

  function sendChat(session, text) {
    const login = session.login || "user";
    const msg = (text || "").trim();
    if (!msg) return;

    if (session.role === "student" && !canAskToday(login)) {
      const info = $("#chatLimitInfo");
      if (info) info.textContent = "Limit reached for today. Come back tomorrow.";
      return;
    }

    const logKey = `GF4_CHATLOG_${login}`;
    const history = loadJSON(logKey, []);
    history.push({ role: "user", text: msg });

    const reply = buildLocalAIReply(msg);
    history.push({ role: "ai", text: reply });
    saveJSON(logKey, history);

    if (session.role === "student") markAskedToday(login);

    setChatUI(session);

    const inp = $("#chatInput");
    if (inp) inp.value = "";

    if (session.role === "student") {
      const info = $("#chatLimitInfo");
      if (info) info.textContent = "Limit reached for today. Come back tomorrow.";
      if ($("#chatSend")) $("#chatSend").disabled = true;
      if ($("#chatInput")) $("#chatInput").disabled = true;
    }
  }

  function buildLocalAIReply(q) {
    const s = q.toLowerCase();
    if (s.includes("present simple"))
      return "Present Simple (RU): привычки/факты. Формула: I/You/We/They + V1; He/She/It + V1+s/es. Отриц: don’t/doesn’t + V1. Вопрос: Do/Does + S + V1?";
    if (s.includes("present continuous"))
      return "Present Continuous (RU): действие сейчас/временно. Формула: am/is/are + V-ing. Отриц: am not / isn’t / aren’t + V-ing. Вопрос: Am/Is/Are + S + V-ing?";
    if (s.includes("past simple"))
      return "Past Simple (RU): завершённое действие в прошлом. Формула: V2 или V-ed. Отриц: didn’t + V1. Вопрос: Did + S + V1?";
    if (s.includes("examples"))
      return "5 examples:\n1) I go to school every day.\n2) She plays tennis on Sundays.\n3) They aren’t watching TV now.\n4) We went to the park yesterday.\n5) Have you ever been to London?";
    if (s.includes("check"))
      return "Write your sentence here, I will correct it and explain the mistake.";
    return "Ask about Unit 1–15 grammar. I will explain with a formula and examples.";
  }

  // ---------- init ----------
  document.addEventListener("DOMContentLoaded", mount);
})();
