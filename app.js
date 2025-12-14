/* app.js — AI BAYAN GRAMMAR 4gr
   - Login: Student PIN 2844, Teacher PIN 3244
   - Logins: 4GL1..4GL15
   - 15 Units (tiles like Beginner menu)
   - Each unit has its own color + 5 shades for Exercise 1..5
   - Check (✅) / X (❌) feedback, stars saved (localStorage)
   - AI Bayan: SMS button opens chat modal, 1 question/day
   - Print with watermark
*/

(function () {
  const APP_TITLE = "AI BAYAN GRAMMAR 4gr";

  // ---------- helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const esc = (s = "") =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const LS = {
    session: "AIBAYAN_GF4_SESSION",
    stars: "AIBAYAN_GF4_STARS",
    attempts: "AIBAYAN_GF4_ATTEMPTS",
    chat: "AIBAYAN_GF4_CHAT",
    teacher: "AIBAYAN_GF4_TEACHER",
  };

  const todayKey = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const loadJSON = (k, fallback) => {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  };
  const saveJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  // ---------- auth ----------
  const AUTH = {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({ length: 15 }, (_, i) => `4GL${i + 1}`),
  };

  function getSession() {
    return loadJSON(LS.session, null);
  }
  function setSession(session) {
    saveJSON(LS.session, session);
  }
  function clearSession() {
    localStorage.removeItem(LS.session);
  }

  // ---------- DATA (fallback if data.js missing) ----------
  // IMPORTANT: You can replace/extend content in data.js as window.APP_DATA
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

  // Topics aligned with Grammar Friends 4 contents (paraphrased rules) :contentReference[oaicite:1]{index=1}
  function buildDefaultUnits() {
    const topics = [
      {
        title: "Unit 1",
        topic: "Present Simple vs Present Continuous + Adverbs of frequency",
        ruleEn:
          "Present Simple: habits/facts. Form: I/You/We/They + V1; He/She/It + V1+s/es. Neg: don’t/doesn’t + V1. Q: Do/Does + S + V1?",
        ruleRu:
          "Present Simple: привычки/факты. I/You/We/They + V1; He/She/It + V1+s/es. Отрицание: don’t/doesn’t + V1. Вопрос: Do/Does + подл. + V1?",
      },
      {
        title: "Unit 2",
        topic: "Past Simple (be/have + regular verbs) + Past time expressions",
        ruleEn:
          "Past Simple: finished actions. Regular verbs: V + -ed. Be: was/were. Neg: didn’t + V1 (be: wasn’t/weren’t). Q: Did + S + V1? (be: Was/Were + S?).",
        ruleRu:
          "Past Simple: завершённые действия. Правильные: V + -ed. Be: was/were. Отрицание: didn’t + V1 (be: wasn’t/weren’t). Вопрос: Did + подл. + V1? (be: Was/Were + подл.?).",
      },
      {
        title: "Unit 3",
        topic: "Past Simple (irregular verbs) + questions/short answers",
        ruleEn:
          "Irregular verbs: V2 in affirmative (go→went). Neg/Q: didn’t + V1; Did + S + V1? Short: Yes, I did / No, I didn’t.",
        ruleRu:
          "Неправильные глаголы: V2 в утвердительном (go→went). Отриц/вопрос: didn’t + V1; Did + подл. + V1? Кратко: Yes, I did / No, I didn’t.",
      },
      {
        title: "Unit 4",
        topic: "Possessive pronouns + Adverbs",
        ruleEn:
          "Possessive pronouns replace a noun: mine, yours, his, hers, ours, theirs. (This is my bag → This is mine.) Adverbs often end -ly (quick→quickly).",
        ruleRu:
          "Притяжательные местоимения заменяют существительное: mine, yours, his, hers, ours, theirs. (This is my bag → This is mine.) Наречия часто с -ly (quick→quickly).",
      },
      {
        title: "Unit 5",
        topic: "Have to + Imperative + Why/Because",
        ruleEn:
          "Have to + V1 = must/need. Past: had to + V1. Imperative: Turn left. Why? → Because + reason.",
        ruleRu:
          "Have to + V1 = нужно/должен. Прош.: had to + V1. Повелит.: Turn left. Why? → Because + причина.",
      },
      {
        title: "Unit 6",
        topic: "Comparatives & Superlatives",
        ruleEn:
          "Comparative: -er / more + adj (taller, more comfortable). Superlative: the -est / the most (the tallest). Irregular: good→better→best; bad→worse→worst.",
        ruleRu:
          "Сравнительная: -er / more (taller, more comfortable). Превосходная: the -est / the most. Искл.: good→better→best; bad→worse→worst.",
      },
      {
        title: "Unit 7",
        topic: "Will / won’t + Future time expressions",
        ruleEn:
          "Future: will/won’t + V1. Q: Will + S + V1? Time: tomorrow, next week, in a month’s time, soon, later.",
        ruleRu:
          "Будущее: will/won’t + V1. Вопрос: Will + подл. + V1? Время: tomorrow, next week, in a month’s time, soon, later.",
      },
      {
        title: "Unit 8",
        topic: "Much/Many/Lots of/A lot of + Some/Any",
        ruleEn:
          "Much (uncountable) / Many (countable plural) in neg/Q. Lots of / a lot of in all. Some in affirmative; any in neg/Q.",
        ruleRu:
          "Much (неисч.) / Many (исч. мн.ч.) в отриц/вопросах. Lots of / a lot of — везде. Some в утвердит., any в отриц/вопросах.",
      },
      {
        title: "Unit 9",
        topic: "Infinitive of purpose + How often…?",
        ruleEn:
          "To + V1 shows purpose: I went to the shop to buy bread. How often…? → once/twice/three times a week; every day.",
        ruleRu:
          "To + V1 = цель: I went… to buy… How often…? → once/twice/three times a week; every day.",
      },
      {
        title: "Unit 10",
        topic: "Present Perfect (1)",
        ruleEn:
          "Present Perfect: have/has + V3 for life experience/recent result. Neg: haven’t/hasn’t + V3. Q: Have/Has + S + V3?",
        ruleRu:
          "Present Perfect: have/has + V3 (опыт/результат). Отриц.: haven’t/hasn’t + V3. Вопрос: Have/Has + подл. + V3?",
      },
      {
        title: "Unit 11",
        topic: "Present Perfect (2): ever / never",
        ruleEn:
          "Ever in questions: Have you ever…? Never in affirmative meaning ‘not at any time’: I’ve never…",
        ruleRu:
          "Ever в вопросах: Have you ever…? Never в утвердит. со значением «никогда»: I’ve never…",
      },
      {
        title: "Unit 12",
        topic: "Should / shouldn’t + Could / couldn’t",
        ruleEn:
          "Should/shouldn’t + V1 = advice. Could/couldn’t + V1 = ability/permission in the past or general ability.",
        ruleRu:
          "Should/shouldn’t + V1 = совет. Could/couldn’t + V1 = мог/не мог (умение/возможность).",
      },
      {
        title: "Unit 13",
        topic: "Object pronouns + Relative pronouns (who/which)",
        ruleEn:
          "Object pronouns: me, you, him, her, it, us, them. Relative: who (people), which (things).",
        ruleRu:
          "Объектные местоимения: me, you, him, her, it, us, them. Относит.: who (люди), which (вещи).",
      },
      {
        title: "Unit 14",
        topic: "Past Continuous + Dates / was born + On/In",
        ruleEn:
          "Past Continuous: was/were + V-ing (action in progress in the past). Dates: He was born on… On + days/dates; In + months/years.",
        ruleRu:
          "Past Continuous: was/were + V-ing (действие в процессе). Даты: He was born on… On + дни/даты; In + месяцы/годы.",
      },
      {
        title: "Unit 15",
        topic: "Past Simple vs Past Continuous + There/They’re/Their",
        ruleEn:
          "Past Simple (finished) vs Past Continuous (in progress). There = ‘там/есть’; they’re = they are; their = ‘их’.",
        ruleRu:
          "Past Simple (закончилось) vs Past Continuous (в процессе). There = «там/есть»; they’re = they are; their = «их».",
      },
    ];

    return topics.map((t, idx) => ({
      id: `u${idx + 1}`,
      title: t.title,
      topic: t.topic,
      ruleEn: t.ruleEn,
      ruleRu: t.ruleRu,
      // default 5 exercises, 10 items each
      exercises: Array.from({ length: 5 }, (_, e) => ({
        id: `ex${e + 1}`,
        title: `Exercise ${e + 1}`,
        items: buildDefaultItems(idx + 1, e + 1, 10),
      })),
    }));
  }

  function buildDefaultItems(unitNum, exNum, n) {
    // Simple safe placeholders; you can replace in data.js later
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
        kind: "text",
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

  // ---------- stars / attempts ----------
  function getStars() {
    return loadJSON(LS.stars, {}); // {login: {points: number}}
  }
  function addStars(login, delta) {
    const stars = getStars();
    if (!stars[login]) stars[login] = { points: 0 };
    stars[login].points += delta;
    saveJSON(LS.stars, stars);
  }
  function getTotalStars(login) {
    const stars = getStars();
    return (stars[login]?.points || 0);
  }

  function getAttempts() {
    return loadJSON(LS.attempts, {}); // {login: {key: true}}
  }
  function markAttempt(login, key) {
    const all = getAttempts();
    if (!all[login]) all[login] = {};
    all[login][key] = true;
    saveJSON(LS.attempts, all);
  }
  function hasAttempt(login, key) {
    const all = getAttempts();
    return !!all?.[login]?.[key];
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

  // ---------- rendering ----------
  function mount() {
    const session = getSession();
    if (!session) return renderLogin();
    renderApp(session);
  }

  function renderLogin(errMsg = "") {
    const html = `
      <div class="loginPage">
        <div class="loginCard">
          <div class="loginBrand">
            <img class="logoBig" src="logo.png" alt="logo"/>
            <div>
              <div class="appTitle">${esc(APP_TITLE)}</div>
              <div class="appSub">Login</div>
            </div>
          </div>

          ${errMsg ? `<div class="loginError">${esc(errMsg)}</div>` : ""}

          <div class="loginForm">
            <label>Login</label>
            <input id="loginInput" class="input" placeholder="4GL1" autocomplete="username" />
            <label>PIN</label>
            <input id="pinInput" class="input" placeholder="****" type="password" autocomplete="current-password" />
            <button id="loginBtn" class="btnPrimary">Enter</button>
          </div>

          <div class="loginHint"> </div>
        </div>
      </div>
    `;
    $("#app").innerHTML = html;

    $("#loginBtn").onclick = () => {
      const login = ($("#loginInput").value || "").trim();
      const pin = ($("#pinInput").value || "").trim();

      if (!login || !pin) return renderLogin("Fill in Login and PIN.");

      // teacher
      if (pin === AUTH.teacherPin) {
        setSession({ role: "teacher", login: login || "TEACHER" });
        return mount();
      }

      // student
      const okLogin = AUTH.logins.includes(login);
      const okPin = pin === AUTH.studentPin;
      if (!okLogin || !okPin) return renderLogin("Wrong login or PIN.");
      setSession({ role: "student", login });
      mount();
    };
  }

  function renderApp(session) {
    const data = getData();
    const unit = data.units.find((u) => u.id === state.unitId) || data.units[0];
    const unitIndex = data.units.findIndex((u) => u.id === unit.id);
    const ex = (unit.exercises || []).find((e) => e.id === state.exId) || unit.exercises[0];
    const test = data.tests.find((t) => t.id === state.testId) || data.tests[0];

    const totalStars = session.role === "student" ? getTotalStars(session.login) : 0;

    // theme colors per unit
    const theme = getUnitTheme(unitIndex);
    document.documentElement.style.setProperty("--unit", theme.base);
    document.documentElement.style.setProperty("--unit2", theme.shades[1]);
    document.documentElement.style.setProperty("--unit3", theme.shades[2]);
    document.documentElement.style.setProperty("--unit4", theme.shades[3]);
    document.documentElement.style.setProperty("--unit5", theme.shades[4]);

    $("#app").innerHTML = `
      <div class="shell">
        <header class="topbar">
          <div class="brand">
            <img class="logo" src="logo.png" alt="logo"/>
            <div class="brandText">
              <div class="brandTitle">${esc(APP_TITLE)}</div>
              <div class="brandSub">${esc(session.role === "teacher" ? "Teacher" : session.login)}</div>
            </div>
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

        <button class="smsBtn" id="smsBtn">SMS</button>
        ${renderChatModal(session)}
      </div>
    `;

    // bind
    $$(".navBtn[data-view]").forEach((b) => {
      b.onclick = () => {
        state.view = b.dataset.view;
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

    // sms
    $("#smsBtn").onclick = () => {
      state.chatOpen = true;
      renderApp(session);
      setChatUI(session);
    };

    // chat close
    const close = $("#chatClose");
    if (close) {
      close.onclick = () => {
        state.chatOpen = false;
        renderApp(session);
      };
    }

    // unit tiles
    $$(".unitTile").forEach((t) => {
      t.onclick = () => {
        state.unitId = t.dataset.uid;
        state.exId = "ex1";
        state.view = "unit";
        renderApp(session);
      };
    });

    // exercise tabs
    $$(".exTab").forEach((b) => {
      b.onclick = () => {
        state.exId = b.dataset.exid;
        renderApp(session);
      };
    });

    // test tiles
    $$(".testTile").forEach((t) => {
      t.onclick = () => {
        state.testId = t.dataset.tid;
        state.view = "tests";
        renderApp(session);
      };
    });

    // submit handlers
    const submitBtn = $("#submitBtn");
    if (submitBtn) {
      submitBtn.onclick = () => submitExercise(session, unit, ex);
      setAttemptUI(session, unit, ex);
    }
    const submitTestBtn = $("#submitTestBtn");
    if (submitTestBtn) {
      submitTestBtn.onclick = () => submitTest(session, test);
      setAttemptUI_Test(session, test);
    }

    // teacher view render table
    if (state.view === "teacher") {
      renderTeacher(session);
    }

    // show feedback icons style hook
  }

  function renderMain(session, data, unit, ex, test, theme) {
    if (state.view === "menu") {
      return `
        <div class="pageHeader">
          <div class="pageTitle">Units</div>
          <div class="pageSub">Choose a unit</div>
        </div>

        <div class="tiles">
          ${data.units
            .map((u, i) => {
              const th = getUnitTheme(i);
              return `
                <div class="unitTile" data-uid="${esc(u.id)}" style="--tile:${th.base}">
                  <div class="tileTop">
                    <img class="tileLogo" src="logo.png" alt="logo"/>
                    <div class="tileText">
                      <div class="tileTitle">${esc(u.title)}</div>
                      <div class="tileSub">${esc(u.topic)}</div>
                    </div>
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

          ${renderItemsForm(test.items, `test_${test.id}`)}

          ${
            session.role === "student"
              ? `<div class="cardActions">
                  <button id="submitTestBtn" class="btnPrimary">Check</button>
                  <div id="attemptInfoTest" class="muted"></div>
                </div>`
              : `<div class="muted">Teacher can view, but checking is for students.</div>`
          }
        </div>
      `;
    }

    if (state.view === "teacher") {
      return `
  <div class="unit-header unit-${unit.color}">
    <img src="logo.png" class="unit-logo" alt="AI Bayan">
    <div>
      <div class="unit-title">${esc(unit.title)}</div>
      <div class="unit-sub">${esc(unit.topic || unit.rules?.title || "")}</div>
    </div>
  </div>
        <div class="card" id="teacherCard">
          <div class="muted">Loading…</div>
        </div>
      `;
    }

    // unit view
    const exTabs = unit.exercises
      .map((e, idx) => {
        const shade = theme.shades[idx] || theme.base;
        const active = e.id === ex.id ? "active" : "";
        return `<button class="exTab ${active}" data-exid="${esc(e.id)}" style="--tab:${shade}">${esc(
          e.title
        )}</button>`;
      })
      .join("");

    return `
      <div class="ruleCard">
        <div class="ruleTop">
          <img class="ruleLogo" src="logo.png" alt="logo"/>
          <div>
            <div class="ruleTitle">Grammar rule</div>
            <div class="ruleTopic">${esc(unit.topic)}</div>
          </div>
        </div>
        <div class="ruleBlock">
          <div class="ruleLabel">Formula (EN)</div>
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

        ${renderItemsForm(ex.items, `unit_${unit.id}_${ex.id}`)}

        ${
          session.role === "student"
            ? `<div class="cardActions">
                <button id="submitBtn" class="btnPrimary">Check</button>
                <div id="attemptInfo" class="muted"></div>
              </div>`
            : `<div class="muted">Teacher can view, but checking is for students.</div>`
        }
      </div>
    `;
  }

  function renderItemsForm(items, keyPrefix) {
    const list = (items || []).slice(0, 10);
    return `
      <div class="items">
        ${list
          .map((it, idx) => {
            const id = `${keyPrefix}_${it.id}`;
            return `
              <div class="itemRow">
                <div class="q">
                  <div class="qNum">${idx + 1}.</div>
                  <div class="qText">${esc(it.prompt)}</div>
                </div>
                <div class="a">
                  <input class="input ans" data-aid="${esc(it.id)}" id="${esc(id)}" placeholder="Answer..." />
                  <div class="mark" id="${esc(id)}_mark"></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

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
                : `Teacher mode: chat is available (no limit).`
            }</div>
          </div>
        </div>
      </div>
    `;
  }

  function setChatUI(session) {
    const chat = loadJSON(LS.chat, {});
    const login = session.login || "user";
    const logKey = `log_${login}`;
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

    // Save user msg
    const logKey = `log_${login}`;
    const history = loadJSON(logKey, []);
    history.push({ role: "user", text: msg });

    // Simple local “AI” response (offline). You can replace with real API later.
    const reply = buildLocalAIReply(msg);
    history.push({ role: "ai", text: reply });

    saveJSON(logKey, history);

    if (session.role === "student") markAskedToday(login);

    // re-render modal only
    setChatUI(session);
    const inp = $("#chatInput");
    if (inp) inp.value = "";

    const info = $("#chatLimitInfo");
    if (info && session.role === "student") info.textContent = "Limit reached for today. Come back tomorrow.";
    if ($("#chatSend")) $("#chatSend").disabled = session.role === "student";
    if ($("#chatInput")) $("#chatInput").disabled = session.role === "student";
  }

  function buildLocalAIReply(q) {
    const s = q.toLowerCase();
    if (s.includes("present simple")) return "Present Simple (RU): привычки/факты. Формула: I/You/We/They + V1; He/She/It + V1+s/es. Отриц: don’t/doesn’t + V1. Вопрос: Do/Does + S + V1?";
    if (s.includes("present continuous")) return "Present Continuous (RU): действие сейчас/временно. Формула: am/is/are + V-ing. Отриц: am not / isn’t / aren’t + V-ing. Вопрос: Am/Is/Are + S + V-ing?";
    if (s.includes("past simple")) return "Past Simple (RU): завершённое действие в прошлом. Формула: V2 или V-ed. Отриц: didn’t + V1. Вопрос: Did + S + V1?";
    if (s.includes("examples")) return "5 examples:\n1) I go to school every day.\n2) She plays tennis on Sundays.\n3) They aren’t watching TV now.\n4) We went to the park yesterday.\n5) Have you ever been to London?";
    if (s.includes("check")) return "Send your sentence and I’ll check it (grammar + correction).";
    return "Write your question about grammar (Unit 1–15) and I will explain with a formula and examples.";
  }

  // ---------- checking (✅/❌ + stars) ----------
  function submitExercise(session, unit, ex) {
    if (session.role !== "student") return;
    const key = `unit_${unit.id}_${ex.id}`;
    if (hasAttempt(session.login, key)) return;

    const items = (ex.items || []).slice(0, 10);
    let correct = 0;

    items.forEach((it) => {
      const inp = $(`.ans[data-aid="${CSS.escape(it.id)}"]`);
      const user = (inp?.value || "").trim();
      const ok = isAnswerCorrect(user, it.answer);

      const mark = $(`#${CSS.escape(key + "_" + it.id)}_mark`);
      if (mark) {
        mark.className = "mark " + (ok ? "ok" : "bad");
        mark.textContent = ok ? "✓" : "✗";
      }
      if (ok) correct++;
      if (inp) inp.disabled = true;
    });

    // stars: 1 star per correct answer
    addStars(session.login, correct);
    markAttempt(session.login, key);

    // store result for teacher journal
    saveTeacherResult({
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

    items.forEach((it) => {
      const inp = $(`.ans[data-aid="${CSS.escape(it.id)}"]`);
      const user = (inp?.value || "").trim();
      const ok = isAnswerCorrect(user, it.answer);

      const mark = $(`#${CSS.escape(key + "_" + it.id)}_mark`);
      if (mark) {
        mark.className = "mark " + (ok ? "ok" : "bad");
        mark.textContent = ok ? "✓" : "✗";
      }
      if (ok) correct++;
      if (inp) inp.disabled = true;
    });

    // stars: 1 star per correct
    addStars(session.login, correct);
    markAttempt(session.login, key);

    saveTeacherResult({
      type: "test",
      login: session.login,
      when: new Date().toISOString(),
      test: test.title,
      score: `${correct}/10`,
      stars: correct,
    });

    renderApp(session);
  }

  function isAnswerCorrect(user, expected) {
    // For now: if expected is "ok" accept any non-empty; else compare normalized
    if (expected === "ok") return user.length > 0;

    const norm = (x) =>
      String(x || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    return norm(user) === norm(expected);
  }

  function setAttemptUI(session, unit, ex) {
    if (session.role !== "student") return;
    const key = `unit_${unit.id}_${ex.id}`;
    const attempted = hasAttempt(session.login, key);
    const info = $("#attemptInfo");
    const btn = $("#submitBtn");
    if (attempted) {
      if (info) info.textContent = "Attempt used (1 try).";
      if (btn) btn.disabled = true;
      $$(".ans").forEach((i) => (i.disabled = true));
    } else {
      if (info) info.textContent = "1 attempt.";
      if (btn) btn.disabled = false;
    }
  }

  function setAttemptUI_Test(session, test) {
    if (session.role !== "student") return;
    const key = `test_${test.id}`;
    const attempted = hasAttempt(session.login, key);
    const info = $("#attemptInfoTest");
    const btn = $("#submitTestBtn");
    if (attempted) {
      if (info) info.textContent = "Attempt used (1 try).";
      if (btn) btn.disabled = true;
      $$(".ans").forEach((i) => (i.disabled = true));
    } else {
      if (info) info.textContent = "1 attempt.";
      if (btn) btn.disabled = false;
    }
  }

  // ---------- teacher journal ----------
  function saveTeacherResult(row) {
    const all = loadJSON(LS.teacher, []);
    all.push(row);
    saveJSON(LS.teacher, all);
  }

  function renderTeacher(session) {
    const card = $("#teacherCard");
    if (!card) return;

    const all = loadJSON(LS.teacher, []);
    if (!all.length) {
      card.innerHTML = `<div class="muted">No results yet.</div>`;
      return;
    }

    const rows = all
      .slice()
      .reverse()
      .slice(0, 200)
      .map((r) => {
        const when = new Date(r.when);
        const w = `${when.toLocaleDateString()} ${when.toLocaleTimeString()}`;
        const title =
          r.type === "exercise" ? `${r.unit} — ${r.ex}` : `${r.test}`;
        return `
          <tr>
            <td>${esc(w)}</td>
            <td>${esc(r.login)}</td>
            <td>${esc(r.type)}</td>
            <td>${esc(title)}</td>
            <td><b>${esc(r.score)}</b></td>
            <td>⭐ ${esc(r.stars)}</td>
          </tr>
        `;
      })
      .join("");

    card.innerHTML = `
      <div class="tableWrap">
        <table class="t">
          <thead>
            <tr>
              <th>Time</th>
              <th>Login</th>
              <th>Type</th>
              <th>Unit/Test</th>
              <th>Score</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="mutedSmall">Saved in this browser (localStorage).</div>
    `;
  }

  // ---------- themes ----------
  // 15 different base colors (greenish-blue app overall), with 5 shades each
  function getUnitTheme(i) {
    const palette = [
      "#7C4DFF", // u1 purple
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
    const base = palette[i % palette.length];
    const shades = makeShades(base, 5);
    return { base, shades };
  }

  function makeShades(hex, n) {
    // simple shade generator by mixing with white
    const rgb = hexToRgb(hex);
    const res = [];
    for (let i = 0; i < n; i++) {
      const t = 0.12 + i * 0.12; // mix strength
      res.push(rgbToHex(mix(rgb, { r: 255, g: 255, b: 255 }, t)));
    }
    return res;
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

  // ---------- init ----------
  document.addEventListener("DOMContentLoaded", mount);
})();
