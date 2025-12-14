window.APP_DATA = {
  auth: {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({ length: 15 }, (_, i) => `4GL${i + 1}`)
  },

  groups: [
    makeGroup("u1-3", "Units 1–3", [
      rule("Like + -ing; can/can’t; a/an/some; be going to", [
        "like + V-ing",
        "can / can’t + V1",
        "a/an + singular; some + plural/uncountable",
        "be going to + V1"
      ], "Like + V-ing: люблю делать. Can/can’t: могу/не могу. a/an/some: артикли и some. be going to: план/намерение.")
    ]),

    makeGroup("u4-6", "Units 4–6", [
      rule("Present simple & present continuous", [
        "PS: I/you/we/they + V1; he/she/it + V1+s/es",
        "PC: am/is/are + V-ing"
      ], "PS — привычки/факты. PC — действие сейчас/в момент речи."),
      rule("Adverbs of frequency", [
        "always / usually / often / sometimes / never",
        "S + adv + V1  (I usually play...)",
        "be + adv (He is always late.)"
      ], "Наречия частоты: ставим перед смысловым глаголом, после am/is/are.")
    ]),

    makeGroup("u7-9", "Units 7–9", [
      rule("Past simple (1): be, have, regular verbs", [
        "was/were",
        "had",
        "V-ed (regular)"
      ], "Прошедшее: was/were, had, правильные глаголы -ed."),
      rule("Past time expressions", [
        "yesterday / last night / last week",
        "two days ago"
      ], "Слова времени для Past Simple.")
    ]),

    makeGroup("u10-12", "Units 10–12", [
      rule("Past simple (2): irregular verbs", [
        "go → went, see → saw, buy → bought",
        "Neg: didn’t + V1",
        "Q: Did + S + V1 ?"
      ], "Неправильные глаголы: 2 форма. Отрицание/вопрос через did."),
      rule("Possessive pronouns + adverbs", [
        "mine, yours, his, hers, ours, theirs",
        "quickly, slowly, carefully…"
      ], "Притяжательные местоимения и наречия.")
    ]),

    makeGroup("u13-15", "Units 13–15", [
      rule("Have to / imperative / why-because", [
        "have to + V1",
        "Imperative: Sit down! Don’t run!",
        "Why…? Because…"
      ], "Обязанность, повелительное наклонение, why-because."),
      rule("Comparatives & superlatives / will-won’t / future expressions", [
        "taller / the tallest",
        "will / won’t + V1",
        "tomorrow / next week"
      ], "Сравнения, будущее will/won’t, слова будущего."),
      rule("Present perfect + ever/never; should/shouldn’t; could/couldn’t", [
        "have/has + V3",
        "ever / never",
        "should / shouldn’t",
        "could / couldn’t"
      ], "Present Perfect + ever/never и модальные should/could."),
      rule("Object pronouns / relative pronouns / past continuous", [
        "me, you, him, her, it, us, them",
        "who / which",
        "was/were + V-ing"
      ], "Объектные местоимения, who/which, Past Continuous.")
    ])
  ],

  testsCatalog: [
    { id:"t1", title:"Test 1: The present simple and present continuous", itemsCount:15 },
    { id:"t2", title:"Test 2: The past simple", itemsCount:15 },
    { id:"t3", title:"Test 3: Possessive pronouns", itemsCount:12 },
    { id:"t4", title:"Test 4: Will / won’t and future time expressions", itemsCount:12 },
    { id:"t5", title:"Test 5: The present perfect with ‘ever’ and ‘never’", itemsCount:12 },
    { id:"t6", title:"Test 6: Should / shouldn’t, could / couldn’t", itemsCount:12 },
    { id:"t7", title:"Test 7: Object pronouns", itemsCount:12 },
    { id:"t8", title:"Test 8: The past continuous", itemsCount:12 },
    { id:"t9", title:"Test 9: The past simple and past continuous", itemsCount:12 },
    { id:"t10", title:"Test 10: All grammar topics", itemsCount:20 }
  ],

  aiBayan: {
    welcome: "Сәлем! I’m AI Bayan 😊 You can ask ONE question per day.",
    quick: [
      "Explain Present Simple (RU)",
      "Explain Present Continuous (RU)",
      "Explain Past Simple (RU)",
      "Give 5 examples",
      "Check my sentence"
    ]
  }
};

function makeGroup(id, title, rules) {
  return {
    id,
    title,
    rules,
    exercises: [
      stubExercise("ex1", "Exercise 1"),
      stubExercise("ex2", "Exercise 2"),
      stubExercise("ex3", "Exercise 3"),
      stubExercise("ex4", "Exercise 4"),
      stubExercise("ex5", "Exercise 5")
    ]
  };
}

function rule(title, formula, ru) {
  return { title, formula, ru };
}

function stubExercise(id, title){
  return {
    id, title,
    type: "mc",
    items: [
      { text: "Sample question 1 ____.", options:["A","B","C"], answer:0 },
      { text: "Sample question 2 ____.", options:["A","B","C"], answer:1 },
      { text: "Sample question 3 ____.", options:["A","B","C"], answer:2 },
      { text: "Sample question 4 ____.", options:["A","B","C"], answer:0 },
      { text: "Sample question 5 ____.", options:["A","B","C"], answer:1 }
    ]
  };
}
