window.APP_DATA = {
  auth: {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({ length: 15 }, (_, i) => `4GL${i + 1}`)
  },

  groups: [
  makeUnit("u1", "Unit 1",  "#2fbf71", [
    rule("Present Simple: routines & facts", [
      "I/You/We/They + V1",
      "He/She/It + V1 + s/es"
    ], "Используем для привычек и фактов. В 3 лице ед.ч. добавляем -s/-es."),
    rule("Negative & Questions (Present Simple)", [
      "I/You/We/They: don’t + V1",
      "He/She/It: doesn’t + V1",
      "Do/Does + S + V1?"
    ], "В отрицании/вопросе окончание -s НЕ ставим: does + V1, doesn’t + V1."),
    rule("Spelling for -s / -es", [
      "work → works",
      "go → goes, watch → watches",
      "study → studies"
    ], "Если глагол на -o/-ch/-sh/-ss/-x → добавляем -es. Если согласная + y → y→ies.")
  ]),

  makeUnit("u2", "Unit 2", "#1aa6b7", [
    rule("Present Continuous: now / at the moment", [
      "am/is/are + V-ing"
    ], "Используем для действия сейчас (now, at the moment, today)."),
    rule("Negative & Questions (Present Continuous)", [
      "am not / isn’t / aren’t + V-ing",
      "Am/Is/Are + S + V-ing?"
    ], "Вопрос строим перестановкой: Are you doing…?"),
    rule("Spelling for -ing", [
      "play → playing",
      "make → making (drop e)",
      "run → running (double consonant)"
    ], "Если глагол на -e → убираем e. Если короткое слово CVC → удваиваем согласную: run→running.")
  ]),

  makeUnit("u3", "Unit 3", "#2f6fed", [
    rule("Present Simple vs Present Continuous", [
      "PS: every day / usually / always",
      "PC: now / at the moment / today"
    ], "PS — привычка, PC — сейчас. Слова-подсказки помогают выбрать время."),
    rule("Stative verbs (usually NOT in continuous)", [
      "like, love, hate, know, want, need",
      "I like it. (not: I’m liking it)"
    ], "Некоторые глаголы состояния обычно не используют в Continuous."),
    rule("Short answers", [
      "Do you…? — Yes, I do. / No, I don’t.",
      "Are you…? — Yes, I am. / No, I’m not."
    ], "Короткие ответы — как в тестах Oxford.")
  ]),

  makeUnit("u4", "Unit 4", "#9b59ff", [
    rule("There is / There are", [
      "There is + singular",
      "There are + plural"
    ], "Говорим, что где-то есть предметы: There is a book. There are two books."),
    rule("Questions & negatives", [
      "Is there…? / Are there…?",
      "There isn’t… / There aren’t…"
    ], "Вопрос: Is there / Are there. Отрицание: isn’t / aren’t."),
    rule("Some / Any", [
      "some (affirmative)",
      "any (questions/negatives)"
    ], "Some — в утверждениях, any — в вопросах и отрицаниях.")
  ]),

  makeUnit("u5", "Unit 5", "#ff5aa5", [
    rule("Countable / Uncountable nouns", [
      "an apple (countable)",
      "water, rice (uncountable)"
    ], "Исчисляемые можно посчитать, неисчисляемые — нет."),
    rule("a / an / some", [
      "a + consonant sound",
      "an + vowel sound",
      "some + plural/uncountable"
    ], "a/an — один предмет, some — немного/несколько."),
    rule("How much / How many", [
      "How many + plural?",
      "How much + uncountable?"
    ], "How many — исчисляемые, How much — неисчисляемые.")
  ]),

  makeUnit("u6", "Unit 6", "#ff8a3d", [
    rule("Can / Can’t (ability / permission)", [
      "can + V1",
      "can’t + V1"
    ], "Can — могу/умею/разрешено. Can’t — не могу/нельзя."),
    rule("Questions & short answers", [
      "Can you…? — Yes, I can. / No, I can’t."
    ], "После can всегда V1 без to."),
    rule("Imperatives (commands)", [
      "Sit down! / Don’t run!"
    ], "Повелительное: V1. Запрет: Don’t + V1.")
  ]),

  makeUnit("u7", "Unit 7", "#ffd166", [
    rule("Past Simple: be (was/were)", [
      "I/he/she/it → was",
      "you/we/they → were"
    ], "Past Simple глагола be: was/were."),
    rule("Negatives & questions (be)", [
      "wasn’t / weren’t",
      "Was/Were + S …?"
    ], "Вопрос: Was she…? Отрицание: wasn’t/weren’t."),
    rule("Time words (past)", [
      "yesterday, last night, last week, … ago"
    ], "Слова-подсказки прошедшего времени.")
  ]),

  makeUnit("u8", "Unit 8", "#06d6a0", [
    rule("Past Simple: regular verbs", [
      "V + ed"
    ], "Правильные глаголы: добавляем -ed."),
    rule("Spelling: -ed", [
      "play → played",
      "like → liked (drop e)",
      "stop → stopped (double consonant)",
      "study → studied (y→i + ed)"
    ], "Орфография -ed: e убираем, CVC удваиваем, y→i."),
    rule("Pronunciation of -ed", [
      "/t/: worked",
      "/d/: played",
      "/ɪd/: wanted"
    ], "Произношение -ed зависит от последнего звука.")
  ]),

  makeUnit("u9", "Unit 9", "#118ab2", [
    rule("Past Simple: irregular verbs", [
      "go→went, see→saw, buy→bought",
      "V2 (2 форма)"
    ], "Неправильные глаголы нужно учить: 2 форма."),
    rule("did / didn’t", [
      "Neg: didn’t + V1",
      "Q: Did + S + V1?"
    ], "С did/didn’t всегда V1 (не V2)."),
    rule("Past simple vs time expressions", [
      "last…, yesterday, … ago"
    ], "Если есть yesterday/last/ago — почти всегда Past Simple.")
  ]),

  makeUnit("u10", "Unit 10", "#073b4c", [
    rule("Adverbs of frequency", [
      "always, usually, often, sometimes, never"
    ], "Наречия частоты показывают как часто."),
    rule("Word order", [
      "S + adv + V1",
      "be + adv"
    ], "Перед смысловым глаголом: I often play. После be: He is always late."),
    rule("How often…?", [
      "How often do you…?"
    ], "Вопрос про частоту: How often…?")
  ]),

  makeUnit("u11", "Unit 11", "#845ec2", [
    rule("Comparatives (-er / more)", [
      "small → smaller",
      "beautiful → more beautiful"
    ], "Сравнение двух: -er (короткие), more (длинные)."),
    rule("Spelling rules", [
      "big → bigger",
      "nice → nicer",
      "happy → happier"
    ], "CVC удваиваем, e убираем, y→i."),
    rule("than / much / a bit", [
      "… than …",
      "much/a lot + comparative",
      "a bit + comparative"
    ], "than — чем. Усилители: much/a lot, ослабитель: a bit.")
  ]),

  makeUnit("u12", "Unit 12", "#ff9671", [
    rule("Superlatives", [
      "the + adj-est",
      "the most + adj"
    ], "Самый/самая: the + -est или the most."),
    rule("Examples", [
      "tall → the tallest",
      "interesting → the most interesting"
    ], "Перед суперлативом обычно the."),
    rule("in / of", [
      "the tallest in the class",
      "the best of all"
    ], "in — внутри группы/места, of — среди всех.")
  ]),

  makeUnit("u13", "Unit 13", "#f9c74f", [
    rule("Future: be going to (plans)", [
      "am/is/are going to + V1"
    ], "План/намерение: going to."),
    rule("Future: will / won’t (predictions, promises)", [
      "will + V1",
      "won’t + V1"
    ], "Will — обещание/прогноз/решение сейчас."),
    rule("Future time expressions", [
      "tomorrow, next week, this evening"
    ], "Слова будущего помогают выбрать форму.")
  ]),

  makeUnit("u14", "Unit 14", "#43aa8b", [
    rule("Should / Shouldn’t (advice)", [
      "should + V1",
      "shouldn’t + V1"
    ], "Совет: should. Не советую: shouldn’t."),
    rule("Could / Couldn’t (ability in the past / possibility)", [
      "could + V1",
      "couldn’t + V1"
    ], "Could — мог/умел в прошлом или возможно. Couldn’t — не мог."),
    rule("Let’s…", [
      "Let’s + V1"
    ], "Предложение: Let’s go! (Давай…) ")
  ]),

  makeUnit("u15", "Unit 15", "#277da1", [
    rule("Present Perfect (ever/never)", [
      "have/has + V3",
      "ever / never"
    ], "Опыт: Have you ever…? I’ve never…"),
    rule("Just / already / yet", [
      "just (только что)",
      "already (уже)",
      "yet (ещё/уже?)"
    ], "Yet — в вопросах/отрицаниях, already/just — в утверждениях."),
    rule("Object pronouns", [
      "me, you, him, her, it, us, them"
    ], "Объектные местоимения после глагола: I see him. She helps me.")
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
  welcome: "I’m AI Bayan. You can ask ONE question per day.",
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
