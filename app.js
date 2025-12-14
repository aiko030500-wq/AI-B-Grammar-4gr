(() => {
  const $ = (sel, root=document) => root.querySelector(sel);

  const LS = {
    session: "gf4_session",
    attempts: "gf4_attempts",
    aiDay: "gf4_ai_day",
    aiCount: "gf4_ai_count"
  };

  const todayKey = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,"0");
    const da = String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${da}`;
  };

  const getSession = () => {
    try { return JSON.parse(localStorage.getItem(LS.session) || "null"); }
    catch { return null; }
  };
  const setSession = (obj) => localStorage.setItem(LS.session, JSON.stringify(obj));
  const clearSession = () => localStorage.removeItem(LS.session);

  const getAttempts = () => {
    try { return JSON.parse(localStorage.getItem(LS.attempts) || "{}"); }
    catch { return {}; }
  };
  const setAttempts = (obj) => localStorage.setItem(LS.attempts, JSON.stringify(obj));

  const canAskAI = () => {
    const day = localStorage.getItem(LS.aiDay);
    const cnt = Number(localStorage.getItem(LS.aiCount) || "0");
    const t = todayKey();
    if (day !== t) {
      localStorage.setItem(LS.aiDay, t);
      localStorage.setItem(LS.aiCount, "0");
      return true;
    }
    return cnt < 1; // лимит 1 вопрос/день
  };
  const incAI = () => {
    const cnt = Number(localStorage.getItem(LS.aiCount) || "0");
    localStorage.setItem(LS.aiCount, String(cnt + 1));
  };

  const state = {
    groupId: "u1-3",
    exerciseId: "ex1",
    view: "units", // units | tests | teacher
    tab: "exercise",
    lastScore: null
  };

  function mount() {
    const session = getSession();
    if (!session) {
      renderLogin();
      return;
    }
    renderApp(session);
    renderAIDock(session);
  }

  function renderLogin(errMsg="") {
    const logins = window.APP_DATA.auth.logins;
    $("#app").innerHTML = `
      <div class="header">
        <div class="brand">
          <img src="logo.png" alt="logo" />
          <div>
            <h1>Grammar Friends 4</h1>
            <small>AI Bayan • Login</small>
          </div>
        </div>
        <div class="topActions">
          <div class="pill">Student PIN: 2844</div>
          <div class="pill">Teacher PIN: 3244</div>
        </div>
      </div>

      <div class="loginWrap">
        <div class="loginTop">
          <img src="logo.png" alt="logo" />
          <div>
            <p class="loginTitle">Enter Login + PIN</p>
            <p class="loginHint">Students: choose 4GL1–4GL15. Teacher: PIN 3244.</p>
          </div>
        </div>

        <div class="grid2">
          <div class="full">
            <label style="font-weight:900;">Login</label>
            <select id="loginSel">
              ${logins.map(l=>`<option value="${l}">${l}</option>`).join("")}
            </select>
          </div>

          <div class="full">
            <label style="font-weight:900;">PIN</label>
            <input id="pinInp" type="text" inputmode="numeric" placeholder="2844 or 3244" />
          </div>

          <button class="btn full" id="loginBtn">Enter</button>
          ${errMsg ? `<div class="err full">${errMsg}</div>` : ``}
        </div>
      </div>
    `;

    $("#loginBtn").onclick = () => {
      const login = $("#loginSel").value.trim();
      const pin = $("#pinInp").value.trim();

      if (pin === window.APP_DATA.auth.teacherPin) {
        setSession({ role:"teacher", login:"TEACHER" });
        mount();
        return;
      }
      if (pin !== window.APP_DATA.auth.studentPin) {
        renderLogin("Wrong PIN.");
        return;
      }
      if (!window.APP_DATA.auth.logins.includes(login)) {
        renderLogin("Wrong login.");
        return;
      }
      setSession({ role:"student", login });
      mount();
    };
  }

  function headerHTML(session){
    return `
      <div class="header">
        <div class="brand">
          <img src="logo.png" alt="logo" />
          <div>
            <h1>Grammar Friends 4</h1>
            <small>${session.role === "teacher" ? "Teacher Journal" : session.login}</small>
          </div>
        </div>
        <div class="topActions">
          <button class="btn" id="printBtn">Print</button>
          <button class="btn logoutBtn" id="logoutBtn">Logout</button>
        </div>
      </div>
    `;
  }

  function renderApp(session){
    $("#app").innerHTML = `
      ${headerHTML(session)}

      <div class="shell">
        <aside class="sidebar">
          <button class="sidebtn ${state.view==="units"?"active":""}" data-view="units">Units 1-3</button>
          <button class="sidebtn ${state.view==="tests"?"active":""}" data-view="tests">Tests</button>
          <button class="sidebtn ${state.view==="teacher"?"active":""}" data-view="teacher">Teacher Journal</button>
        </aside>

        <main class="main">
          <section class="content" id="content"></section>
        </main>
      </div>
    `;

    $("#logoutBtn").onclick = () => { clearSession(); mount(); };
    $("#printBtn").onclick = () => window.print();

    document.querySelectorAll(".sidebtn").forEach(b=>{
      b.onclick = () => { state.view = b.dataset.view; renderContent(session); };
    });

    renderContent(session);
  }

  function renderContent(session){
    const content = $("#content");
    if (state.view === "teacher") {
      content.innerHTML = renderTeacher();
      return;
    }
    if (state.view === "tests") {
      content.innerHTML = renderTests();
      return;
    }
    content.innerHTML = renderUnits(session);
    wireUnits(session);
  }

  function renderRules(group){
    if (!group.rules?.length) return "";
    return `
      <div class="rulesWrap">
        <div class="breadcrumb">Grammar Friends • Level 4 • ${group.title}</div>
        ${group.rules.map(r=>`
          <div class="ruleBox">
            <h3>${r.title}</h3>
            <ul class="formula">${r.formula.map(x=>`<li>${x}</li>`).join("")}</ul>
            <p class="ruleRu">${r.ru}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderUnits(session){
    const group = window.APP_DATA.groups.find(g=>g.id===state.groupId);
    const ex = group.exercises.find(e=>e.id===state.exerciseId);

    return `
      <div class="breadcrumb">Grammar Friends • Level 4 • ${group.title}</div>
      <h2 class="title">${group.title}</h2>

      <div class="tabs">
        ${group.exercises.map(e=>`
          <button class="tab ${e.id===state.exerciseId?"active":""}" data-ex="${e.id}">
            ${e.title}
          </button>
        `).join("")}
      </div>

      ${renderRules(group)}

      <div class="card" id="exerciseCard">
        ${renderExercise(session, group, ex)}
      </div>
    `;
  }

  function wireUnits(session){
    document.querySelectorAll(".tab").forEach(t=>{
      t.onclick = () => {
        state.exerciseId = t.dataset.ex;
        renderContent(session);
      };
    });
    wireCheckButtons(session);
  }

  function exKey(session, groupId, exId){
    return `${session.role}:${session.login}:${groupId}:${exId}`;
  }

  function renderExercise(session, group, ex){
    const attempts = getAttempts();
    const key = exKey(session, group.id, ex.id);
    const locked = attempts[key]?.done === true;

    const body = ex.items.map((it, idx)=>{
      if (ex.type === "mc") {
        return `
          <div class="q">
            <div class="qnum">${idx+1}.</div>
            <div class="qtext">${it.text}</div>
            <select data-i="${idx}" ${locked ? "disabled":""}>
              ${it.options.map((o,oi)=>`<option value="${oi}">${o}</option>`).join("")}
            </select>
          </div>
        `;
      } else {
        return `
          <div class="q">
            <div class="qnum">${idx+1}.</div>
            <div class="qtext">${it.text}</div>
            <input type="text" data-i="${idx}" placeholder="type answer" ${locked ? "disabled":""}/>
          </div>
        `;
      }
    }).join("");

    const savedScore = attempts[key]?.score;
    const scoreBar = (locked && typeof savedScore==="number")
      ? `<div class="scoreBar">Your score is ${savedScore} / ${ex.items.length} (saved)</div>`
      : (state.lastScore ? `<div class="scoreBar">${state.lastScore}</div>` : "");

    return `
      <div style="font-weight:1000; margin-bottom:8px;">${ex.title}</div>
      <div>${body}</div>

      ${scoreBar}

      <div class="footerBtns">
        <button class="btn" id="checkBtn" ${locked ? "disabled":""}>Check answers</button>
        <button class="btn" id="resetBtn">Try again</button>
        <button class="btn" id="showBtn">See answers</button>
      </div>

      ${locked ? `<div class="aiTiny" style="text-align:center;margin-top:10px;">
        This exercise is locked (1 attempt). Teacher can view results in Teacher Journal.
      </div>` : ``}
    `;
  }

  function wireCheckButtons(session){
    const content = $("#content");
    const group = window.APP_DATA.groups.find(g=>g.id===state.groupId);
    const ex = group.exercises.find(e=>e.id===state.exerciseId);
    const key = exKey(session, group.id, ex.id);
    const attempts = getAttempts();

    $("#resetBtn").onclick = () => {
      state.lastScore = null;
      // reset only UI (не снимаем lock, потому что 1 попытка!)
      renderContent(session);
    };

    $("#showBtn").onclick = () => {
      // показываем ответы подсказкой (без копирования из книги)
      alert(ex.items.map((it,i)=>{
        const a = ex.type==="mc" ? it.options[it.answer] : it.answer;
        return `${i+1}) ${a}`;
      }).join("\n"));
    };

    const checkBtn = $("#checkBtn");
    if (!checkBtn) return;

    checkBtn.onclick = () => {
      if (attempts[key]?.done) return;

      let score = 0;
      const marks = [];

      if (ex.type==="mc") {
        content.querySelectorAll("select[data-i]").forEach(sel=>{
          const i = Number(sel.dataset.i);
          const ok = Number(sel.value) === ex.items[i].answer;
          score += ok ? 1 : 0;
          marks.push({el: sel, ok});
        });
      } else {
        content.querySelectorAll("input[data-i]").forEach(inp=>{
          const i = Number(inp.dataset.i);
          const user = (inp.value || "").trim().toLowerCase();
          const ans = String(ex.items[i].answer).trim().toLowerCase();
          const ok = user === ans;
          score += ok ? 1 : 0;
          marks.push({el: inp, ok});
        });
      }

      // визуальные галочки/крестики
      marks.forEach(m=>{
        const mark = document.createElement("div");
        mark.className = "mark " + (m.ok ? "ok":"bad");
        mark.textContent = m.ok ? "✓" : "✕";
        m.el.parentElement.appendChild(mark);
      });

      attempts[key] = { done:true, score, total: ex.items.length, when: new Date().toISOString() };
      setAttempts(attempts);

      state.lastScore = `Your score is ${score} / ${ex.items.length}`;
      // перерисуем, чтобы заблокировать
      renderContent(session);
    };
  }

  function renderTests(){
    const group = window.APP_DATA.groups.find(g=>g.id===state.groupId);
    return `
      <div class="breadcrumb">Grammar Friends • Level 4 • Tests</div>
      <h2 class="title">Choose a test</h2>
      <div class="card">
        ${group.tests.map(t=>`
          <div style="padding:10px 6px;border-bottom:1px dashed rgba(0,0,0,.12);font-weight:900;">
            ${t.title} <span style="color:var(--muted);font-weight:800;">(${t.itemsCount} items)</span>
          </div>
        `).join("")}
        <div class="aiTiny" style="margin-top:10px;">
          (Дальше я добавлю сами тесты как отдельные экраны — скажи “делаем тест 1”)
        </div>
      </div>
    `;
  }

  function renderTeacher(){
    const attempts = getAttempts();
    const rows = Object.entries(attempts)
      .map(([k,v])=>{
        const parts = k.split(":");
        const role = parts[0];
        const who = parts[1];
        const group = parts[2];
        const ex = parts[3];
        return { role, who, group, ex, score:v.score, total:v.total, when:v.when };
      })
      .filter(r=>r.role==="student")
      .sort((a,b)=> (a.who>b.who?1:-1));

    return `
      <div class="breadcrumb">AI Bayan • Teacher Journal</div>
      <h2 class="title">Results (saved on this device)</h2>
      <div class="card">
        ${rows.length ? rows.map(r=>`
          <div style="padding:10px 6px;border-bottom:1px dashed rgba(0,0,0,.12);">
            <div style="font-weight:1000;">${r.who} • ${r.group} • ${r.ex}</div>
            <div style="color:var(--muted);font-weight:800;">
              Score: ${r.score}/${r.total} • ${new Date(r.when).toLocaleString()}
            </div>
          </div>
        `).join("") : `<div style="font-weight:900;color:var(--muted);">No results yet.</div>`}
      </div>
      <div class="aiTiny" style="margin-top:10px;">
        Важно: результаты сохраняются в браузере на этом компьютере/телефоне (localStorage).
      </div>
    `;
  }

  // AI Bayan Dock
  function renderAIDock(session){
    // показываем чат всем, но лимит 1 вопрос/день — на устройстве
    const welcome = window.APP_DATA.aiBayan.welcome;
    const quick = window.APP_DATA.aiBayan.quick;

    const existing = document.querySelector(".aiDock");
    if (existing) existing.remove();

    const dock = document.createElement("div");
    dock.className = "aiDock";
    dock.innerHTML = `
      <div class="aiHead">
        <div>AI Bayan</div>
        <div style="opacity:.9;font-size:12px;">1 question/day</div>
      </div>
      <div class="aiBody">
        <div class="aiMsg" id="aiMsg">${welcome}</div>
        <div class="aiRow">
          <input id="aiInp" type="text" placeholder="Ask your question..." />
          <button class="btn" id="aiSend">Send</button>
        </div>
        <div class="quickRow">
          ${quick.map(q=>`<button class="quick" data-q="${q}">${q}</button>`).join("")}
        </div>
        <div class="aiTiny" id="aiTiny"></div>
      </div>
    `;
    document.body.appendChild(dock);

    const setTiny = () => {
      const ok = canAskAI();
      $("#aiTiny").textContent = ok
        ? `You can ask 1 question today (${todayKey()}).`
        : `Limit reached for today (${todayKey()}). Come back tomorrow.`;
    };
    setTiny();

    const answerLocal = (q) => {
      // безопасный “мини-бот”: объяснения без внешнего API
      const ql = q.toLowerCase();
      if (ql.includes("present simple")) {
        return "Present Simple: привычки/факты. Формула: I/you/we/they + V1; he/she/it + V1+s. Neg: don't/doesn't + V1. Q: Do/Does + S + V1?";
      }
      if (ql.includes("present continuous")) {
        return "Present Continuous: действие сейчас. Формула: am/is/are + V-ing. Neg: am not/isn't/aren't + V-ing. Q: Am/Is/Are + S + V-ing?";
      }
      if (ql.includes("check")) {
        return "Write your sentence and I will check it (grammar + correction).";
      }
      return "I can explain grammar rules, give examples, make questions, and check sentences. Ask clearly 😊";
    };

    const send = (text) => {
      if (!text.trim()) return;
      if (!canAskAI()) { setTiny(); return; }
      incAI();
      $("#aiMsg").textContent = answerLocal(text);
      $("#aiInp").value = "";
      setTiny();
    };

    $("#aiSend").onclick = () => send($("#aiInp").value);
    dock.querySelectorAll(".quick").forEach(b=>{
      b.onclick = () => send(b.dataset.q);
    });
  }

  window.addEventListener("load", mount);
})();
