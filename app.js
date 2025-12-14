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
  // Supports two formats:
  // A) units: [{id:'u1', title, topic, ruleEn, ruleRu, exercises:[{id:'ex1', items:[{prompt,answer}]}]}]
  // B) units: [{id: 1, title, color, rules:{title,en,ru}, tasks:{ex1:{items:[{q,a}]}...}}]
  const FALLBACK = {
    units: buildDefaultUnits(),
    tests: buildDefaultTests(),
  };

  function getData() {
    const d = window.APP_DATA || {};
    const rawUnits = Array.isArray(d.units) ? d.units : [];
    const rawTests = Array.isArray(d.tests) ? d.tests : [];

    const units =
      rawUnits.length ? normalizeUnits(rawUnits) : FALLBACK.units;

    const tests =
      rawTests.length ? normalizeTests(rawTests) : FALLBACK.tests;

    return { units, tests };
  }

  function normalizeUnits(rawUnits) {
    // If already in format A (ruleEn/ruleRu + exercises array)
    const looksLikeA =
      rawUnits.some(
        (u) =>
          typeof u?.ruleEn === "string" ||
          Array.isArray(u?.exercises)
      );

    if (looksLikeA) {
      return rawUnits.map((u, idx) => {
        const id = String(u.id || `u${idx + 1}`);
        return {
          id: id.startsWith("u") ? id : `u${id}`,
          title: u.title || `Unit ${idx + 1}`,
          topic: u.topic || u.rules?.title || "",
          ruleEn: u.ruleEn || u.rules?.en || "",
          ruleRu: u.ruleRu || u.rules?.ru || "",
          exercises: Array.isArray(u.exercises) && u.exercises.length
            ? u.exercises.map((e, eidx) => ({
                id: e.id || `ex${eidx + 1}`,
                title: e.title || `Exercise ${eidx + 1}`,
                items: (e.items || []).map((it, ii) => ({
                  id: it.id || `i${idx + 1}_${eidx + 1}_${ii + 1}`,
                  prompt: it.prompt ?? it.q ?? "",
                  answer: it.answer ?? it.a ?? "ok",
                  kind: it.kind || "text",
                })),
              }))
            : Array.from({ length: 5 }, (_, eidx) => ({
                id: `ex${eidx + 1}`,
                title: `Exercise ${eidx + 1}`,
                items: buildDefaultItems(idx + 1, eidx + 1, 10),
              })),
        };
      });
    }

    // Format B (rules/tasks)
    return rawUnits.map((u, idx) => {
      const num = Number(u.id || idx + 1);
      const id = `u${num}`;
      const ruleTitle = u.rules?.title || u.topic || "";
      const ruleEn = u.rules?.en || u.ruleEn || "";
      const ruleRu = u.rules?.ru || u.ruleRu || "";

      // tasks -> exercises ex1..ex5
      const exs = [];
      for (let k = 1; k <= 5; k++) {
        const key = `ex${k}`;
        const items = u.tasks?.[key]?.items || [];
        exs.push({
          id: key,
          title: `Exercise ${k}`,
          items: (items.length ? items : buildDefaultItems(num, k, 10)).slice(0, 10).map((it, ii) => ({
            id: it.id || `i${num}_${k}_${ii + 1}`,
            prompt: it.prompt ?? it.q ?? "",
            answer: it.answer ?? it.a ?? "ok",
            kind: it.kind || "text",
          })),
        });
      }

      return {
        id,
        title: u.title || `Unit ${num}`,
        topic: ruleTitle,
        ruleEn,
        ruleRu,
        exercises: exs,
      };
    });
  }

  function normalizeTests(rawTests) {
    // Accept {id,title,items:[{prompt,answer}]}
    return rawTests.map((t, idx) => ({
      id: String(t.id || `t${idx + 1}`).startsWith("t") ? String(t.id || `t${idx + 1}`) : `t${t.id}`,
      title: t.title || `Test — Unit ${idx + 1}`,
      items: (t.items || []).slice(0, 10).map((it, ii) => ({
        id: it.id || `t${idx + 1}_q${ii + 1}`,
        prompt: it.prompt ?? it.q ?? `Question ${ii + 1}`,
        answer: it.answer ?? it.a ?? "ok",
        kind: it.kind || "text",
      })),
    }));
  }

  // ---------- fallback content ----------
  function buildDefaultUnits() {
    const topics = [
      { title: "Unit 1", topic: "Present Simple vs Present Continuous", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 2", topic: "Past Simple", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 3", topic: "Irregular Verbs", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 4", topic: "Possessive Pronouns", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 5", topic: "Have to / Imperative", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 6", topic: "Comparatives / Superlatives", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 7", topic: "Will / Won’t", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 8", topic: "Much / Many / Some / Any", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 9", topic: "Infinitive of purpose", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 10", topic: "Present Perfect (1)", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 11", topic: "Present Perfect (2)", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 12", topic: "Should / Could", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 13", topic: "Object pronouns / who / which", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 14", topic: "Past Continuous", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
      { title: "Unit 15", topic: "Past Simple vs Past Continuous", ruleEn: "Add your rule in data.js", ruleRu: "Добавь правило в data.js" },
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
      "Write the correct form.",
      "Choose the correct option.",
      "Make a question.",
      "Make a negative sentence.",
      "Translate (RU→EN).",
    ];
    return Array.from({ length: n }, (_, i) => ({
      id: `i${unitNum}_${exNum}_${i + 1}`,
      prompt: base[i % base.length],
      answer: "ok",
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
    return loadJSON(LS.stars, {});
  }
  function addStars(login, delta) {
    const stars = getStars();
    if (!stars[login]) stars[login] = { points: 0 };
    stars[login].points += delta;
    saveJSON(LS.stars, stars);
  }
  function getTotalStars(login) {
    const stars = getStars();
    return stars[login]?.points || 0;
  }

  function getAttempts() {
    return loadJSON(LS.attempts, {});
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

  // ---------- PRINT with watermark ----------
  function printWithWatermark() {
    const wm = document.createElement("div");
    wm.id = "__wm";
    wm.textContent = APP_TITLE;
    wm.style.position = "fixed";
    wm.style.left = "50%";
    wm.style.top = "50%";
    wm.style.transform = "translate(-50%,-50%) rotate(-25deg)";
    wm.style.fontSize = "64px";
    wm.style.fontWeight = "900";
    wm.style.opacity = "0.08";
    wm.style.pointerEvents = "none";
    wm.style.zIndex = "999999";
    document.body.appendChild(wm);

    window.print();

    setTimeout(() => {
      wm.remove();
    }, 300);
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
            <input id="loginInput" class="input" autocomplete="username" />
            <label>PIN</label>
            <input id="pinInput" class="input" type="password" inputmode="numeric" autocomplete="current-password" />
            <button id="loginBtn" class="btnPrimary">Enter</button>
          </div>
        </div>
      </div>
    `;
    $("#app").innerHTML = html;

    $("#loginBtn").onclick = () => {
      const loginRaw = ($("#loginInput").value || "").trim();
      const pin = ($("#pinInput").value || "").trim();

      if (!pin) return renderLogin("Enter PIN.");

      // teacher by PIN only
      if (pin === AUTH.teacherPin) {
        setSession({ role: "teacher", login: "TEACHER" });
        return mount();
      }

      // student
      const login = loginRaw;
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
    const unitIndex = Math.max(0, data.units.findIndex((u) => u.id === unit.id));
    const ex = (unit.exercises || []).find((e) => e.id === state.exId) || (unit.exercises || [])[0];
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

    // nav
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

    $("#printBtn").onclick = () => printWithWatermark();

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
      // ✅ IMPORTANT: do NOT use unit.* here (teacher page is global)
      return `
        <div class="pageHeader">
          <div class="pageTitle">Teacher Journal</div>
          <div class="pageSub">Saved in this browser (localStorage)</div>
        </div>

        <div class="card" id="teacherCard">
          <div class="muted">Loading…</div>
        </div>
      `;
    }

    // unit view
    const exTabs = (unit.exercises || [])
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
            <div class="ruleTitle">${esc(unit.title)}</div>
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
                  <input class="input ans" data-aid="${esc(it.id)}" id="${esc(id)}" />
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
              <input id="chatInput" class="input" ${locked ? "disabled" : ""}/>
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

    const logKey = `log_${login}`;
    const history = loadJSON(logKey, []);
    history.push({ role: "user", text: msg });

    const reply = buildLocalAIReply(msg);
    history.push({ role: "ai", text: reply });

    saveJSON(logKey, history);

    if (session.role === "student") markAskedToday(login);

    setChatUI(session);

    const inp = $("#chatInput");
    if (inp) inp.value = "";

    // lock only if student after first question
    if (session.role === "student") {
      const info = $("#chatLimitInfo");
      if (info) info.textContent = "Limit reached for today. Come back tomorrow.";
      const b = $("#chatSend");
      const i = $("#chatInput");
      if (b) b.disabled = true;
      if (i) i.disabled = true;
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
      return "Send your sentence and I’ll check it (grammar + correction).";
    return "Write your grammar question (Unit 1–15). I will explain with formula + examples.";
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

    addStars(session.login, correct);
    markAttempt(session.login, key);

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

  function renderTeacher() {
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
        const title = r.type === "exercise" ? `${r.unit} — ${r.ex}` : `${r.test}`;
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
  function getUnitTheme(i) {
    const palette = [
      "#7C4DFF", // 1 purple
      "#00BFA6", // 2 green-blue
      "#1E88E5", // 3 blue
      "#43A047", // 4 green
      "#FB8C00", // 5 orange
      "#E53935", // 6 red
      "#8E24AA", // 7 violet
      "#00897B", // 8 teal
      "#3949AB", // 9 indigo
      "#6D4C41", // 10 brown
      "#F4511E", // 11 deep orange
      "#039BE5", // 12 light blue
      "#5E35B1", // 13 purple
      "#2E7D32", // 14 dark green
      "#C0CA33", // 15 lime
    ];
    const base = palette[i % palette.length];
    const shades = makeShades(base, 5);
    return { base, shades };
  }

  function makeShades(hex, n) {
    const rgb = hexToRgb(hex);
    const res = [];
    for (let i = 0; i < n; i++) {
      const t = 0.12 + i * 0.12;
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
