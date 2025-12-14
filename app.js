/* app.js — AI BAYAN GRAMMAR 4gr (fixed UI + back buttons + colors + journal list) */
(function () {
  const APP_TITLE = "AI BAYAN GRAMMAR 4gr";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
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

  const AUTH = {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({ length: 15 }, (_, i) => `4GL${i + 1}`),
  };

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

  function getSession() { return loadJSON(LS.session, null); }
  function setSession(s) { saveJSON(LS.session, s); }
  function clearSession() { localStorage.removeItem(LS.session); }

  function getData() {
    const d = window.APP_DATA || {};
    return {
      units: Array.isArray(d.units) ? d.units : [],
      tests: Array.isArray(d.tests) ? d.tests : [],
    };
  }

  const state = {
    view: "menu", // menu | unit | tests | teacher
    unitId: "u1",
    exId: "ex1",
    testId: "t1",
    chatOpen: false,
    teacherLogin: "4GL1",
  };

  // --- stars/attempts ---
  function getStars() { return loadJSON(LS.stars, {}); }
  function addStars(login, delta) {
    const s = getStars();
    if (!s[login]) s[login] = { points: 0 };
    s[login].points += delta;
    saveJSON(LS.stars, s);
  }
  function getTotalStars(login) { return getStars()?.[login]?.points || 0; }

  function getAttempts() { return loadJSON(LS.attempts, {}); }
  function hasAttempt(login, key) { return !!getAttempts()?.[login]?.[key]; }
  function markAttempt(login, key) {
    const all = getAttempts();
    if (!all[login]) all[login] = {};
    all[login][key] = true;
    saveJSON(LS.attempts, all);
  }

  // --- chat limit ---
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

  // --- themes ---
  function getUnitTheme(i) {
    const palette = [
      "#7C4DFF", "#00BFA6", "#1E88E5", "#43A047", "#FB8C00",
      "#E53935", "#8E24AA", "#00897B", "#3949AB", "#6D4C41",
      "#F4511E", "#039BE5", "#5E35B1", "#2E7D32", "#C0CA33",
    ];
    const base = palette[i % palette.length];
    const shades = makeShades(base, 5);
    return { base, shades };
  }
  function makeShades(hex, n) {
    const rgb = hexToRgb(hex);
    const res = [];
    for (let i = 0; i < n; i++) {
      const t = 0.10 + i * 0.12;
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

  // --- more tolerant checking ---
  function norm(x) {
    return String(x || "")
      .trim()
      .toLowerCase()
      .replace(/[“”]/g, '"')
      .replace(/[’]/g, "'")
      .replace(/\s+/g, " ")
      .replace(/[.?!]+$/g, ""); // allow missing final punctuation
  }
  function isAnswerCorrect(user, expected) {
    if (expected === "ok") return norm(user).length > 0;
    return norm(user) === norm(expected);
  }

  // --- teacher journal store ---
  function saveTeacherResult(row) {
    const all = loadJSON(LS.teacher, []);
    all.push(row);
    saveJSON(LS.teacher, all);
  }

  function mount() {
    const session = getSession();
    if (!session) return renderLogin();
    renderApp(session);
  }

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
        setSession({ role: "teacher", login: "TEACHER" });
        state.view = "teacher";
        state.teacherLogin = "4GL1";
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

  function renderApp(session) {
    const data = getData();
    const unit = data.units.find((u) => u.id === state.unitId) || data.units[0];
    const unitIndex = Math.max(0, data.units.findIndex((u) => u.id === unit.id));
    const ex = (unit.exercises || []).find((e) => e.id === state.exId) || unit.exercises?.[0];
    const test = data.tests.find((t) => t.id === state.testId) || data.tests[0];

    const theme = getUnitTheme(unitIndex);
    document.documentElement.style.setProperty("--unit", theme.base);
    document.documentElement.style.setProperty("--u1", theme.shades[0]);
    document.documentElement.style.setProperty("--u2", theme.shades[1]);
    document.documentElement.style.setProperty("--u3", theme.shades[2]);
    document.documentElement.style.setProperty("--u4", theme.shades[3]);
    document.documentElement.style.setProperty("--u5", theme.shades[4]);

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

            ${
              session.role === "teacher"
                ? renderTeacherList()
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

    // Nav
    $$(".navBtn[data-view]").forEach((b) => {
      b.onclick = () => {
        state.view = b.dataset.view;
        renderApp(session);
      };
    });

    // Logout
    $("#logoutBtn").onclick = () => { clearSession(); mount(); };
    $("#logoutBtn2").onclick = () => { clearSession(); mount(); };

    // Print
    $("#printBtn").onclick = () => window.print();

    // SMS open
    $("#smsBtn").onclick = () => {
      state.chatOpen = true;
      renderApp(session);
      setChatUI(session);
    };

    // Chat close
    const close = $("#chatClose");
    if (close) close.onclick = () => { state.chatOpen = false; renderApp(session); };

    // Unit tiles
    $$(".unitTile").forEach((t) => {
      t.onclick = () => {
        state.unitId = t.dataset.uid;
        state.exId = "ex1";
        state.view = "unit";
        renderApp(session);
      };
    });

    // Back buttons
    const backMenu = $("#backMenuBtn");
    if (backMenu) backMenu.onclick = () => { state.view = "menu"; renderApp(session); };
    const backUnit = $("#backUnitBtn");
    if (backUnit) backUnit.onclick = () => { state.view = "unit"; renderApp(session); };

    // Exercise tabs
    $$(".exTab").forEach((b) => {
      b.onclick = () => { state.exId = b.dataset.exid; renderApp(session); };
    });

    // Test tiles
    $$(".testTile").forEach((t) => {
      t.onclick = () => { state.testId = t.dataset.tid; state.view = "tests"; renderApp(session); };
    });

    // Submit
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

    // Teacher journal table render
    if (state.view === "teacher") renderTeacherTable();
    // Teacher list click
    $$(".studentPick").forEach((b) => {
      b.onclick = () => { state.teacherLogin = b.dataset.login; renderApp(session); };
    });
  }

  function renderTeacherList() {
    const items = AUTH.logins
      .map((l) => {
        const active = l === state.teacherLogin ? "activePick" : "";
        const stars = getTotalStars(l);
        return `<button class="studentPick ${active}" data-login="${esc(l)}">${esc(l)} <span>⭐ ${stars}</span></button>`;
      })
      .join("");
    return `
      <div class="teacherList">
        <div class="teacherListTitle">Students</div>
        <div class="teacherListBox">${items}</div>
      </div>
    `;
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
                  <button id="backMenuBtn" class="btnGhost">Back to Menu</button>
                  <div id="attemptInfoTest" class="muted"></div>
                </div>`
              : `<div class="muted">Teacher can view, but checking is for students.</div>`
          }
        </div>
      `;
    }

    if (state.view === "teacher") {
      return `
        <div class="unitHeaderBar" style="background: var(--unit)">
          <img src="logo.png" class="unit-logo" alt="AI Bayan"/>
          <div>
            <div class="unit-title">Teacher Journal</div>
            <div class="unit-sub">Selected: ${esc(state.teacherLogin)}</div>
          </div>
        </div>

        <div class="card" id="teacherCard">
          <div class="muted">Loading…</div>
        </div>
      `;
    }

    // UNIT VIEW
    const exTabs = (unit.exercises || [])
      .map((e, idx) => {
        const shade = theme.shades[idx] || theme.base;
        const active = e.id === ex.id ? "active" : "";
        return `<button class="exTab ${active}" data-exid="${esc(e.id)}" style="--tab:${shade}">${esc(e.title)}</button>`;
      })
      .join("");

    return `
      <div class="unitHeaderBar" style="background: var(--unit)">
        <img src="logo.png" class="unit-logo" alt="AI Bayan"/>
        <div>
          <div class="unit-title">${esc(unit.title)}</div>
          <div class="unit-sub">${esc(unit.topic)}</div>
        </div>
      </div>

      <div class="ruleCard">
        <div class="ruleTop">
          <img class="ruleLogo" src="logo.png" alt="logo"/>
          <div>
            <div class="ruleTitle">Grammar rule</div>
            <div class="ruleTopic">${esc(unit.topic)}</div>
          </div>
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

        ${renderItemsForm(ex.items, `unit_${unit.id}_${ex.id}`)}

        ${
          session.role === "student"
            ? `<div class="cardActions">
                <button id="submitBtn" class="btnPrimary">Check</button>
                <button id="backMenuBtn" class="btnGhost">Back to Menu</button>
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

  // ✅/❌ + stars
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

  // Teacher table filtered by selected login
  function renderTeacherTable() {
    const card = $("#teacherCard");
    if (!card) return;

    const all = loadJSON(LS.teacher, []);
    const selected = state.teacherLogin;

    const filtered = all.filter((r) => r.login === selected);
    if (!filtered.length) {
      card.innerHTML = `<div class="muted">No results for ${esc(selected)} yet.</div>`;
      return;
    }

    const rows = filtered
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

  // Chat (offline simple)
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
    const login = session.role === "student" ? session.login : "TEACHER";
    const logKey = `log_${login}`;
    const history = loadJSON(logKey, []);
    const logEl = $("#chatLog");
    if (logEl) {
      logEl.innerHTML = history
        .map((m) => `<div class="msg ${m.role}"><div class="bubble">${esc(m.text)}</div></div>`)
        .join("");
      logEl.scrollTop = logEl.scrollHeight;
    }

    const sendBtn = $("#chatSend");
    const inp = $("#chatInput");
    if (sendBtn && inp) {
      sendBtn.onclick = () => sendChat(session, inp.value || "");
      inp.onkeydown = (e) => { if (e.key === "Enter") sendBtn.click(); };
    }
  }

  function sendChat(session, text) {
    const login = session.role === "student" ? session.login : "TEACHER";
    const msg = (text || "").trim();
    if (!msg) return;

    if (session.role === "student" && !canAskToday(login)) return;

    const logKey = `log_${login}`;
    const history = loadJSON(logKey, []);
    history.push({ role: "user", text: msg });

    const reply = "Write your unit number and your sentence. I will explain with a formula + correct it.";
    history.push({ role: "ai", text: reply });
    saveJSON(logKey, history);

    if (session.role === "student") markAskedToday(login);
    setChatUI(session);

    const inp = $("#chatInput");
    if (inp) inp.value = "";
  }

  document.addEventListener("DOMContentLoaded", mount);
})();
