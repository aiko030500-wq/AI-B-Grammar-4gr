/* app.js — AI BAYAN GRAMMAR 4gr (FINAL FIX)
   - Student PIN 2844, Teacher PIN 3244
   - Logins: 4GL1..4GL15
   - 15 Units + Tests
   - Main menu: unit tiles разноцветные БЕЗ девочки
   - Logo girl: ONLY Login + Main Menu header + Unit header
   - Unit header color changes per unit
   - 5 exercises = 5 strong shades
   - ✅/❌ + stars saved + 1 attempt saved
   - SMS chat ONLY on main menu (1 question/day)
   - Teacher Journal shows 4GL1..4GL15
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
    stars: "AIBAYAN_GF4_STARS",
    attempts: "AIBAYAN_GF4_ATTEMPTS",
    results: "AIBAYAN_GF4_RESULTS",
    chat: "AIBAYAN_GF4_CHAT",
    teacherLog: "AIBAYAN_GF4_TEACHER_LOG",
    chatlogPrefix: "GF4_CHATLOG_",
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
      { title: "Unit 1", topic: "Present Simple vs Present Continuous", ruleEn: "PS: habits/facts. PC: now/temporary. PS Q: Do/Does + S + V1? PC Q: Am/Is/Are + S + V-ing?", ruleRu: "PS: привычки/факты. PC: сейчас/временно. Вопросы: Do/Does (PS) и Am/Is/Are (PC)." },
      { title: "Unit 2", topic: "Past Simple (regular verbs + be)", ruleEn: "Past Simple: finished past actions. Regular: V+ed. Be: was/were. Neg: didn’t + V1 (be: wasn’t/weren’t). Q: Did + S + V1? (Was/Were + S?)", ruleRu: "Past Simple: завершённые действия. V+ed. Be: was/were. Отриц: didn’t + V1 (be: wasn’t/weren’t). Вопрос: Did + S + V1? (Was/Were + S?)" },
      { title: "Unit 3", topic: "Past Simple (irregular verbs)", ruleEn: "Affirmative: V2. Neg/Q: didn’t + V1; Did + S + V1? Short: Yes, I did / No, I didn’t.", ruleRu: "Утв.: V2. Отриц/вопр.: didn’t + V1; Did + S + V1? Кратко: Yes, I did / No, I didn’t." },
      { title: "Unit 4", topic: "Possessive pronouns + ’s", ruleEn: "mine/yours/his/hers/ours/theirs. ’s shows possession: Tom’s bag.", ruleRu: "mine/yours/his/hers/ours/theirs. ’s = принадлежность: Tom’s bag." },
      { title: "Unit 5", topic: "Have to / must + Imperative", ruleEn: "Have to/must + V1 = obligation. Imperative: Open… / Don’t + V1.", ruleRu: "Have to/must + V1 = обязанность. Imperative: Open… / Don’t + V1." },
      { title: "Unit 6", topic: "Comparatives & Superlatives", ruleEn: "Comparative: -er/more. Superlative: the -est/the most. good→better→best.", ruleRu: "Сравнит.: -er/more. Превосх.: the -est/the most. good→better→best." },
      { title: "Unit 7", topic: "Will / won’t", ruleEn: "Future: will/won’t + V1. Q: Will + S + V1?", ruleRu: "Будущее: will/won’t + V1. Вопрос: Will + S + V1?" },
      { title: "Unit 8", topic: "Much / many / some / any", ruleEn: "Much (uncountable), many (plural). Some (affirmative), any (Q/negative).", ruleRu: "Much (неисч.), many (мн.ч.). Some (утв.), any (вопрос/отриц.)." },
      { title: "Unit 9", topic: "Infinitive of purpose", ruleEn: "To + V1 = purpose: I went to buy…", ruleRu: "To + V1 = цель: I went to buy…" },
      { title: "Unit 10", topic: "Present Perfect (1)", ruleEn: "Have/has + V3. Q: Have/Has + S + V3?", ruleRu: "Have/has + V3. Вопрос: Have/Has + S + V3?" },
      { title: "Unit 11", topic: "Present Perfect (2): ever / never", ruleEn: "Ever (questions). Never = not at any time.", ruleRu: "Ever (вопросы). Never = никогда." },
      { title: "Unit 12", topic: "Should / could", ruleEn: "Should = advice. Could = ability/permission.", ruleRu: "Should = совет. Could = умение/возможность." },
      { title: "Unit 13", topic: "Object pronouns + who/which", ruleEn: "me/you/him/her/it/us/them. who (people), which (things).", ruleRu: "me/you/him/her/it/us/them. who (люди), which (вещи)." },
      { title: "Unit 14", topic: "Past Continuous", ruleEn: "was/were + V-ing (in progress in the past).", ruleRu: "was/were + V-ing (действие в процессе)." },
      { title: "Unit 15", topic: "Past Simple vs Past Continuous", ruleEn: "Past Simple = finished; Past Continuous = in progress.", ruleRu: "Past Simple = завершено; Past Continuous = процесс." },
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
      "#7C4DFF",
      "#00BFA6",
      "#1E88E5",
      "#43A047",
      "#FB8C00",
      "#E53935",
      "#8E24AA",
      "#00897B",
      "#3949AB",
      "#6D4C41",
      "#F4511E",
      "#039BE5",
      "#5E35B1",
      "#2E7D32",
      "#C0CA33",
    ];
    return palette[i % palette.length];
  }

  // Unit 1: заметные фиолетовые оттенки (как просила)
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

  // ---------- LOGIN (logo big only here) ----------
  function renderLogin(errMsg = "") {
    $("#app").innerHTML = `
      <div class="loginPage">
        <div class="loginCard">
          <div class="loginBrand">
            <img class="logoBig" src="logo.png" alt="logo"/>
            <div>
              <div class="appTitle">${esc(APP_TITLE)}</div>
            </div>
          </div>

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

    // Topbar: app color always (не повторяем девочку постоянно)
    const barColor = APP_BAR;

    const totalStars = session.role === "student" ? getTotalStars(session.login) : 0;

    // Apply CSS variables for unit colors (buttons can use them)
    document.documentElement.style.setProperty("--appbar", barColor);
    document.documentElement.style.setProperty("--unitBase", theme.base);
    document.documentElement.style.setProperty("--shade1", theme.shades[0]);
    document.documentElement.style.setProperty("--shade2", theme.shades[1]);
    document.documentElement.style.setProperty("--shade3", theme.shades[2]);
    document.documentElement.style.setProperty("--shade4", theme.shades[3]);
    document.documentElement.style.setProperty("--shade5", theme.shades[4]);

    $("#app").innerHTML = `
      <div class="shell">

        <header class="topbar" style="background:${esc(barColor)}">
          <div class="brandTextOnly">
            <div class="brandTitle">${esc(APP_TITLE)}</div>
            <div class="brandSub">${esc(session.role === "teacher" ? "Teacher" : session.login)}</div>
          </div>

          <div class="topActions">
            <button id="printBtn" class="btnGhost">Print</button>
            <button id="logoutBtn" class="btnDanger">Logout</button>
          </div>
        </header>

        <div class="layout">
          <aside class="left">
            <div class="navCard">
              <button class="navBtn ${state.view === "menu" ? "active" : ""}" data-view="menu">Units</button>
              <button class="navBtn ${state.view === "tests" ? "active" : ""}" data-view="tests">Tests</button>
              ${
                session.role === "teacher"
                  ? `<button class="navBtn ${state.view === "teacher" ? "active" : ""}" data-view="teacher">Teacher Journal</button>`
                  : ""
              }
              <button class="navBtn" id="logoutBtn2">Logout</button>
            </div>

            ${
              session.role === "student"
                ? `<div class="progressCard">
                    <div class="progressTitle">Progress</div>
                    <div class="starsLine">⭐ Total stars: <b>${totalStars}</b></div>
                  </div>`
                : ""
            }
          </aside>

          <main class="main">
            ${renderMain(session, data, unit, ex, test, theme)}
          </main>
        </div>

        ${
          // SMS ONLY ON MAIN MENU
          state.view === "menu"
            ? `<button class="smsBtn" id="smsBtn">SMS</button>
               ${renderChatModal(session)}`
            : ``
        }

      </div>
    `;

    // bind nav
    $$(".navBtn[data-view]").forEach((b) => {
      b.onclick = () => {
        state.view = b.dataset.view;
        state.chatOpen = false;
        renderApp(session);
      };
    });

    $("#logoutBtn").onclick = () => {
      clearSession();
      mount();
    };
    $("#logoutBtn2").onclick = () => {
      clearSession();
      mount();
    };

    $("#printBtn").onclick = () => window.print();

    // unit tiles click
    $$(".unitTile").forEach((t) => {
      t.onclick = () => {
        state.unitId = t.dataset.uid;
        state.exId = "ex1";
        state.view = "unit";
        renderApp(session);
      };
    });

    // exercise tabs click
    $$(".exTab").forEach((b) => {
      b.onclick = () => {
        state.exId = b.dataset.exid;
        renderApp(session);
      };
    });

    // test tiles click
    $$(".testTile").forEach((t) => {
      t.onclick = () => {
        state.testId = t.dataset.tid;
        state.view = "tests";
        renderApp(session);
      };
    });

    // back to menu
    const backMenu = $("#backMenuBtn");
    if (backMenu) {
      backMenu.onclick = () => {
        state.view = "menu";
        renderApp(session);
      };
    }

    // submit handlers
    const submitBtn = $("#submitBtn");
    if (submitBtn) {
      submitBtn.onclick = () => submitExercise(session, unit, ex);
      setAttemptUI(session, `unit_${unit.id}_${ex.id}`);
    }

    const submitTestBtn = $("#submitTestBtn");
    if (submitTestBtn) {
      submitTestBtn.onclick = () => submitTest(session, test);
      setAttemptUI(session, `test_${test.id}`, true);
    }

    // SMS open (only if exists)
    const sms = $("#smsBtn");
    if (sms) {
      sms.onclick = () => {
        state.chatOpen = true;
        renderApp(session);
        setChatUI(session);
      };
    }
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

  // ---------- MAIN VIEWS ----------
  function renderMain(session, data, unit, ex, test, theme) {
    if (state.view === "menu") {
      // logo ONLY HERE (main menu header)
      return `
        <div class="menuHeader">
          <img class="menuLogo" src="logo.png" alt="logo" style="width:64px;height:64px;border-radius:50%;object-fit:cover;" />
          <div>
            <div class="pageTitle">Units</div>
            <div class="pageSub">Choose a unit</div>
          </div>
        </div>

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
          <div class="pageTitle">Tests</div>
          <div class="pageSub">Each test: 10 questions</div>
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
                  <button id="submitTestBtn" class="btnPrimary" style="background:var(--unitBase);border-color:var(--unitBase);">Check</button>
                  <button id="backMenuBtn" class="btnGhost" style="border-color:var(--unitBase);color:var(--unitBase);">Back to Menu</button>
                  <div id="attemptInfoTest" class="muted"></div>
                </div>`
              : `<div class="muted">Teacher can view, but checking is for students.</div>
                 <div class="cardActions">
                   <button id="backMenuBtn" class="btnGhost" style="border-color:var(--unitBase);color:var(--unitBase);">Back to Menu</button>
                 </div>`
          }
        </div>
      `;
    }

    if (state.view === "teacher") {
      return `
        <div class="pageHeader">
          <div class="pageTitle">Teacher Journal</div>
          <div class="pageSub">4GL1–4GL15 · Stars & Attempts</div>
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
        return `<button class="exTab ${active}" data-exid="${esc(e.id)}"
                 style="background:${esc(shade)}; color:#fff; border:none;">${esc(e.title)}</button>`;
      })
      .join("");

    const unitKey = `unit_${unit.id}_${ex.id}`;

    return `
      <!-- Unit header: logo small ONLY here -->
      <div class="unitHeader" style="background:${esc(theme.base)}">
        <img class="unitHeaderLogo" src="logo.png" alt="logo"
             style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;" />
        <div class="unitHeaderText">
          <div class="unitHeaderTitle">${esc(unit.title)}</div>
          <div class="unitHeaderSub">${esc(unit.topic)}</div>
        </div>
      </div>

      <!-- Grammar rule WITHOUT logo -->
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
                <button id="submitBtn" class="btnPrimary" style="background:var(--unitBase);border-color:var(--unitBase);">Check</button>
                <button id="backMenuBtn" class="btnGhost" style="border-color:var(--unitBase);color:var(--unitBase);">Back to Menu</button>
                <div id="attemptInfo" class="muted"></div>
              </div>`
            : `<div class="muted">Teacher can view, but checking is for students.</div>
               <div class="cardActions">
                 <button id="backMenuBtn" class="btnGhost" style="border-color:var(--unitBase);color:var(--unitBase);">Back to Menu</button>
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
    const disabled = saved ? "disabled" : "";

    return `
      <div class="items">
        ${list
          .map((it, idx) => {
            const id = `${keyPrefix}_${it.id}`;
            const ans = savedAnswers[it.id] ?? "";
            const mark = savedMarks[it.id]; // "ok" | "bad" | undefined
            return `
              <div class="itemRow">
                <div class="q">
                  <div class="qNum">${idx + 1}.</div>
                  <div class="qText">${esc(it.prompt)}</div>
                </div>
                <div class="a">
                  <input class="input ans" data-aid="${esc(it.id)}" id="${esc(id)}"
                         value="${esc(ans)}" placeholder="Answer..." ${disabled}/>
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

  // ---------- CHECKING (✅/❌ + stars) ----------
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
              <button id="chatSend" class="btnPrimary" ${locked ? "disabled" : ""} style="background:var(--appbar);border-color:var(--appbar);">Send</button>
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
    const logKey = `${LS.chatlogPrefix}${login}`;
    const history = loadJSON(logKey, []);
    const logEl = $("#chatLog");
    if (logEl) {
      logEl.innerHTML = history
        .map(
          (m) => `
          <div class="msg ${m.role}">
            <div class="bubble">${esc(m.text)}</div>
          </div>`
        )
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
      inp.onkeydown = (e) => {
        if (e.key === "Enter") sendBtn.click();
      };
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

    const logKey = `${LS.chatlogPrefix}${login}`;
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
