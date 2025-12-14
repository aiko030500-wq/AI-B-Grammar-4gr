/* app.js — AI BAYAN GRAMMAR 4gr (fixed)
   - Student PIN 2844, Teacher PIN 3244
   - Logins 4GL1..4GL15
   - Menu tiles like Beginner menu
   - Unit color changes header + tabs (5 shades)
   - Check: ✅/❌, stars saved, 1 attempt
   - AI Bayan: SMS opens modal, 1 question/day (students)
   - Print watermark
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
    session: "AIBAYAN_G4_SESSION",
    stars: "AIBAYAN_G4_STARS",
    attempts: "AIBAYAN_G4_ATTEMPTS",
    chat: "AIBAYAN_G4_CHAT",
    teacher: "AIBAYAN_G4_TEACHER",
    chatlog_prefix: "AIBAYAN_G4_CHATLOG_",
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

  // ---------- data ----------
  function getData() {
    const d = window.APP_DATA || {};
    return {
      units: Array.isArray(d.units) ? d.units : [],
      tests: Array.isArray(d.tests) ? d.tests : [],
    };
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
    return loadJSON(LS.stars, {}); // {login:{points:number}}
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
    return loadJSON(LS.attempts, {}); // {login:{key:true}}
  }
  function markAttempt(login, key) {
    const a = getAttempts();
    if (!a[login]) a[login] = {};
    a[login][key] = true;
    saveJSON(LS.attempts, a);
  }
  function hasAttempt(login, key) {
    const a = getAttempts();
    return !!a?.[login]?.[key];
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

  // ---------- themes ----------
  // 15 base colors (Unit 1 purple), 5 shades for ex1..ex5
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

  // ---------- mount ----------
  function mount() {
    const session = getSession();
    if (!session) return renderLogin();
    renderApp(session);
  }

  // ---------- login ----------
  function renderLogin(errMsg = "") {
    $("#app").innerHTML = `
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
        </div>
      </div>
    `;

    $("#loginBtn").onclick = () => {
      const login = ($("#loginInput").value || "").trim();
      const pin = ($("#pinInput").value || "").trim();

      if (!login || !pin) return renderLogin("Fill in Login and PIN.");

      if (pin === AUTH.teacherPin) {
        setSession({ role: "teacher", login: login || "TEACHER" });
        state.view = "menu";
        return mount();
      }

      const okLogin = AUTH.logins.includes(login);
      const okPin = pin === AUTH.studentPin;
      if (!okLogin || !okPin) return renderLogin("Wrong login or PIN.");

      setSession({ role: "student", login });
      state.view = "menu";
      mount();
    };
  }

  // ---------- app shell ----------
  function renderApp(session) {
    const data = getData();
    const units = data.units || [];
    const tests = data.tests || [];
    const unit = units.find((u) => u.id === state.unitId) || units[0];
    const unitIndex = Math.max(0, units.findIndex((u) => u.id === unit?.id));
    const theme = getUnitTheme(unitIndex);

    const ex = (unit?.exercises || []).find((e) => e.id === state.exId) || (unit?.exercises || [])[0];
    const test = tests.find((t) => t.id === state.testId) || tests[0];

    // set accent: menu uses main blue-grey, unit uses unit color
    const menuAccent = "#0f7c8a";
    const accent = state.view === "unit" ? theme.base : menuAccent;
    document.documentElement.style.setProperty("--accent", accent);

    const totalStars = session.role === "student" ? getTotalStars(session.login) : 0;

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

    // side nav
    $$(".navBtn[data-view]").forEach((b) => {
      b.onclick = () => {
        state.view = b.dataset.view;
        if (state.view !== "unit") document.documentElement.style.setProperty("--accent", menuAccent);
        renderApp(session);
      };
    });

    // logout
    $("#logoutBtn").onclick = () => {
      clearSession();
      mount();
    };
    $("#logoutBtn2").onclick = () => {
      clearSession();
      mount();
    };

    // print
    $("#printBtn").onclick = () => window.print();

    // sms open
    $("#smsBtn").onclick = () => {
      state.chatOpen = true;
      renderApp(session);
      setChatUI(session);
    };
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

    // back buttons
    const backUnits = $("#backUnits");
    if (backUnits) {
      backUnits.onclick = () => {
        state.view = "menu";
        renderApp(session);
      };
    }
    const backMenu = $("#backMenu");
    if (backMenu) {
      backMenu.onclick = () => {
        state.view = "menu";
        renderApp(session);
      };
    }

    // exercise tabs (5 shades)
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

    // submit
    const submitBtn = $("#submitBtn");
    if (submitBtn) {
      submitBtn.onclick = () => submitExercise(session, unit, ex);
      setAttemptUI(session, `unit_${unit.id}_${ex.id}`, "#attemptInfo", "#submitBtn");
    }
    const submitTestBtn = $("#submitTestBtn");
    if (submitTestBtn) {
      submitTestBtn.onclick = () => submitTest(session, test);
      setAttemptUI(session, `test_${test.id}`, "#attemptInfoTest", "#submitTestBtn");
    }

    if (state.view === "teacher") renderTeacher();
  }

  // ---------- main render ----------
  function renderMain(session, data, unit, ex, test, theme) {
    const units = data.units || [];
    const tests = data.tests || [];

    if (state.view === "menu") {
      return `
        <div class="pageHeader">
          <div class="pageTitle">Units</div>
          <div class="pageSub">Choose a unit</div>
        </div>

        <div class="tiles">
          ${units
            .map((u, i) => {
              const th = getUnitTheme(i);
              return `
                <div class="unitTile" data-uid="${esc(u.id)}" style="--tile:${th.base}">
                  <div class="tileTop">
                    <img class="tileLogo" src="logo.png" alt="logo"/>
                    <div class="tileText">
                      <div class="tileTitle">${esc(u.title)}</div>
                      <div class="tileSub">${esc(u.topic || "")}</div>
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
          ${tests
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
            <div class="cardTitle">${esc(test?.title || "Test")}</div>
            <div class="badge">10 items</div>
          </div>

          ${renderItemsForm(test?.items || [], `test_${test?.id || "t"}`)}

          ${
            session.role === "student"
              ? `<div class="cardActions">
                  <button id="submitTestBtn" class="btnPrimary">Check</button>
                  <button id="backMenu" class="btnGhost">Back to Units</button>
                  <div id="attemptInfoTest" class="muted"></div>
                </div>`
              : `<div class="muted">Teacher can view, but checking is for students.</div>`
          }
        </div>
      `;
    }

    if (state.view === "teacher") {
      return `
        <div class="pageHeader">
          <div class="pageTitle">Teacher Journal</div>
          <div class="pageSub">Saved on this device (localStorage)</div>
        </div>
        <div class="card" id="teacherCard"><div class="muted">Loading…</div></div>
      `;
    }

    // UNIT VIEW
    const exTabs = (unit.exercises || [])
      .slice(0, 5)
      .map((e, idx) => {
        const shade = theme.shades[idx] || theme.base;
        const active = e.id === ex.id ? "active" : "";
        return `<button class="exTab ${active}" data-exid="${esc(e.id)}" style="--tab:${shade}">${esc(
          e.title
        )}</button>`;
      })
      .join("");

    return `
      <div class="unitHeader" style="background:${theme.base}">
        <div class="unitHeaderLeft">
          <img class="unitLogo" src="logo.png" alt="logo"/>
          <div>
            <div class="unitTitle">${esc(unit.title)}</div>
            <div class="unitSub">${esc(unit.topic || "")}</div>
          </div>
        </div>
        <div class="unitHeaderRight">
          <button id="backUnits" class="btnGhostLight">Back to Units</button>
        </div>
      </div>

      <div class="ruleCard" style="border-left-color:${theme.base}">
        <div class="ruleTop">
          <img class="ruleLogo" src="logo.png" alt="logo"/>
          <div>
            <div class="ruleTitle">Grammar rule</div>
            <div class="ruleTopic">${esc(unit.topic || "")}</div>
          </div>
        </div>
        <div class="ruleBlock">
          <div class="ruleLabel">Formula (EN)</div>
          <div class="ruleText">${esc(unit.ruleEn || "")}</div>
        </div>
        <div class="ruleBlock">
          <div class="ruleLabel">Объяснение (RU)</div>
          <div class="ruleText">${esc(unit.ruleRu || "")}</div>
        </div>
      </div>

      <div class="tabsRow">${exTabs}</div>

      <div class="card">
        <div class="cardHeader">
          <div class="cardTitle">${esc(ex.title)}</div>
          <div class="badge" style="background:${theme.shades[4]}">10 items</div>
        </div>

        ${renderItemsForm(ex.items || [], `unit_${unit.id}_${ex.id}`)}

        ${
          session.role === "student"
            ? `<div class="cardActions">
                <button id="submitBtn" class="btnPrimary" style="background:${theme.base}">Check</button>
                <button id="backMenu" class="btnGhost">Back to Units</button>
                <div id="attemptInfo" class="muted"></div>
              </div>`
            : `<div class="muted">Teacher can view, but checking is for students.</div>`
        }
      </div>
    `;
  }

  // IMPORTANT FIX: ids must match submit() search
  function renderItemsForm(items, keyPrefix) {
    const list = (items || []).slice(0, 10);
    return `
      <div class="items">
        ${list
          .map((it, idx) => {
            const rowId = `${keyPrefix}__${it.id}`; // <-- stable
            return `
              <div class="itemRow">
                <div class="q">
                  <div class="qNum">${idx + 1}.</div>
                  <div class="qText">${esc(it.prompt)}</div>
                </div>
                <div class="a">
                  <input class="input ans" data-aid="${esc(it.id)}" data-rowid="${esc(
                    rowId
                  )}" placeholder="Answer..." />
                  <div class="mark" id="${esc(rowId)}__mark"></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  // ---------- checking (✅/❌ + stars) ----------
  function isAnswerCorrect(user, expected) {
    if (expected === "ok") return String(user || "").trim().length > 0;

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

    items.forEach((it) => {
      const inp = $(`.ans[data-aid="${CSS.escape(it.id)}"]`);
      const user = (inp?.value || "").trim();
      const ok = isAnswerCorrect(user, it.answer);

      const rowId = inp?.dataset?.rowid || `${key}__${it.id}`;
      const mark = $(`#${CSS.escape(rowId)}__mark`);
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

      const rowId = inp?.dataset?.rowid || `${key}__${it.id}`;
      const mark = $(`#${CSS.escape(rowId)}__mark`);
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

  function setAttemptUI(session, key, infoSel, btnSel) {
    if (session.role !== "student") return;
    const attempted = hasAttempt(session.login, key);
    const info = $(infoSel);
    const btn = $(btnSel);

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
    const stars = getStars();

    // summary list 4GL1..4GL15
    const summaryRows = AUTH.logins
      .map((login) => {
        const total = stars?.[login]?.points || 0;
        const last = [...all].reverse().find((r) => r.login === login);
        const lastText = last
          ? `${new Date(last.when).toLocaleDateString()} • ${last.type} • ${last.score}`
          : "—";
        return `<tr>
          <td><b>${esc(login)}</b></td>
          <td>⭐ ${esc(total)}</td>
          <td>${esc(lastText)}</td>
        </tr>`;
      })
      .join("");

    const lastRows = all
      .slice()
      .reverse()
      .slice(0, 80)
      .map((r) => {
        const when = new Date(r.when);
        const w = `${when.toLocaleDateString()} ${when.toLocaleTimeString()}`;
        const title = r.type === "exercise" ? `${r.unit} — ${r.ex}` : `${r.test}`;
        return `<tr>
          <td>${esc(w)}</td>
          <td>${esc(r.login)}</td>
          <td>${esc(r.type)}</td>
          <td>${esc(title)}</td>
          <td><b>${esc(r.score)}</b></td>
          <td>⭐ ${esc(r.stars)}</td>
        </tr>`;
      })
      .join("");

    card.innerHTML = `
      <div class="tableTitle">Students (4GL1–4GL15)</div>
      <div class="tableWrap">
        <table class="t">
          <thead><tr><th>Login</th><th>Total stars</th><th>Last activity</th></tr></thead>
          <tbody>${summaryRows}</tbody>
        </table>
      </div>

      <div class="tableTitle" style="margin-top:14px;">Last results</div>
      <div class="tableWrap">
        <table class="t">
          <thead>
            <tr><th>Time</th><th>Login</th><th>Type</th><th>Unit/Test</th><th>Score</th><th>Stars</th></tr>
          </thead>
          <tbody>${lastRows || ""}</tbody>
        </table>
      </div>

      <div class="mutedSmall">Saved in this browser (localStorage).</div>
    `;
  }

  // ---------- chat modal ----------
  function renderChatModal(session) {
    if (!state.chatOpen) return "";
    const locked = session.role === "student" ? !canAskToday(session.login) : false;

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
    const login = session.login || "user";
    const logKey = LS.chatlog_prefix + login;
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

    const logKey = LS.chatlog_prefix + login;
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
    if (s.includes("check")) return "Send your sentence and I’ll check it (grammar + correction).";
    return "Ask about Unit 1–15. I will explain with a formula and examples.";
  }

  // ---------- init ----------
  document.addEventListener("DOMContentLoaded", mount);
})();
