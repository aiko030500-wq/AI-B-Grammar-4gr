window.APP_DATA = {
  auth: {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({ length: 15 }, (_, i) => `4GL${i + 1}`)
  },

  aiBayan: {
    // без "салем"
    welcome: "I’m AI Bayan. You can ask ONE question per day.",
    quick: [
      "Explain Present Simple (RU)",
      "Explain Present Continuous (RU)",
      "Explain Past Simple (RU)",
      "Give 5 examples",
      "Check my sentence"
    ]
  },

  // =========================
  // 15 UNITS (отдельно)
  // =========================
  groups: [
    makeUnit("u1","Unit 1","#2fbf71", unit1Rules(), unit1Exercises()),

    makeUnit("u2","Unit 2","#1aa6b7", unit2Rules(), unit2Exercises()),
    makeUnit("u3","Unit 3","#2f6fed", unit3Rules(), unit3Exercises()),
    makeUnit("u4","Unit 4","#9b59ff", unit4Rules(), unit4Exercises()),
    makeUnit("u5","Unit 5","#ff5aa5", unit5Rules(), unit5Exercises()),
    makeUnit("u6","Unit 6","#ff8a3d", unit6Rules(), unit6Exercises()),
    makeUnit("u7","Unit 7","#ffd166", unit7Rules(), unit7Exercises()),
    makeUnit("u8","Unit 8","#06d6a0", unit8Rules(), unit8Exercises()),
    makeUnit("u9","Unit 9","#118ab2", unit9Rules(), unit9Exercises()),
    makeUnit("u10","Unit 10","#073b4c", unit10Rules(), unit10Exercises()),
    makeUnit("u11","Unit 11","#845ec2", unit11Rules(), unit11Exercises()),
    makeUnit("u12","Unit 12","#ff9671", unit12Rules(), unit12Exercises()),
    makeUnit("u13","Unit 13","#f9c74f", unit13Rules(), unit13Exercises()),
    makeUnit("u14","Unit 14","#43aa8b", unit14Rules(), unit14Exercises()),
    makeUnit("u15","Unit 15","#277da1", unit15Rules(), unit15Exercises()),
  ],

  // =========================
  // TESTS (10 тестов, интерактив)
  // =========================
  tests: [
    makeTest("t1","Test 1: Present Simple", "#2fbf71", testPS()),
    makeTest("t2","Test 2: Present Continuous", "#1aa6b7", testPC()),
    makeTest("t3","Test 3: Present Simple vs Continuous", "#2f6fed", testMix()),
    makeTest("t4","Test 4: There is/are + some/any", "#9b59ff", testThere()),
    makeTest("t5","Test 5: much/many + a/an/some", "#ff5aa5", testCount()),
    makeTest("t6","Test 6: can/can’t + imperatives", "#ff8a3d", testCan()),
    makeTest("t7","Test 7: was/were", "#ffd166", testWasWere()),
    makeTest("t8","Test 8: Past Simple regular", "#06d6a0", testPastReg()),
    makeTest("t9","Test 9: Past Simple irregular + did", "#118ab2", testPastIrreg()),
    makeTest("t10","Test 10: Mixed", "#277da1", testAll())
  ]
};

// =====================================================
// HELPERS
// =====================================================
function makeUnit(id, title, color, rules, exercises){
  return { id, title, color, rules, exercises };
}
function rule(title, formula, ru){ return { title, formula, ru }; }

function exMC(id, title, items){ return { id, title, type:"mc", items }; }
function exIN(id, title, items){ return { id, title, type:"input", items }; }

function take10(arr){ return arr.slice(0,10); }

function makeTest(id,title,color,items){ return {id,title,color,items}; }

// =====================================================
// RULES (EN + RU) for Units
// =====================================================
function unit1Rules(){ return [
  rule("Present Simple: routines & facts",[
    "I/You/We/They + V1",
    "He/She/It + V1 + s/es",
    "Neg: don’t/doesn’t + V1",
    "Q: Do/Does + S + V1?"
  ],"Настоящее простое: привычки/факты. В 3 лице ед.ч. добавляем -s/-es. В вопросе/отрицании -s не ставим.")
];}
function unit2Rules(){ return [
  rule("Present Continuous: now",[
    "am/is/are + V-ing",
    "Neg: am not / isn’t / aren’t + V-ing",
    "Q: Am/Is/Are + S + V-ing?"
  ],"Настоящее продолженное: действие сейчас (now, at the moment)."),
  rule("Spelling -ing",[
    "make→making (drop e)",
    "run→running (double consonant)",
    "play→playing"
  ],"Орфография: -e убираем, CVC удваиваем согласную.")
];}
function unit3Rules(){ return [
  rule("Present Simple vs Present Continuous",[
    "PS: usually/always/every day",
    "PC: now/at the moment/today"
  ],"PS — привычка, PC — сейчас."),
  rule("Stative verbs",[
    "like, love, know, want, need"
  ],"Глаголы состояния обычно не используют в Continuous.")
];}
function unit4Rules(){ return [
  rule("There is / There are",[
    "There is + singular",
    "There are + plural",
    "Q: Is there…? / Are there…?"
  ],"There is/are — «там есть»."),
  rule("Some / Any",[
    "some: affirmative",
    "any: questions/negatives"
  ],"some — в утверждениях, any — в вопросах/отрицаниях.")
];}
function unit5Rules(){ return [
  rule("Countable / Uncountable + much/many",[
    "How many + plural?",
    "How much + uncountable?"
  ],"How many — исчисляемые, How much — неисчисляемые."),
  rule("a/an/some",[
    "a + consonant sound",
    "an + vowel sound",
    "some + plural/uncountable"
  ],"a/an — один предмет, some — немного/несколько.")
];}
function unit6Rules(){ return [
  rule("Can / Can’t",[
    "can + V1",
    "can’t + V1",
    "Q: Can + S + V1?"
  ],"can — могу/умею/можно. can’t — не могу/нельзя."),
  rule("Imperatives",[
    "V1! (Sit down!)",
    "Don’t + V1! (Don’t run!)"
  ],"Повелительное: команда/запрет.")
];}
function unit7Rules(){ return [
  rule("Past Simple: be (was/were)",[
    "I/he/she/it → was",
    "you/we/they → were",
    "Neg: wasn’t/weren’t",
    "Q: Was/Were + S …?"
  ],"Прошедшее be: was/were.")
];}
function unit8Rules(){ return [
  rule("Past Simple: regular verbs",[
    "V + ed",
    "Neg: didn’t + V1",
    "Q: Did + S + V1?"
  ],"Past Simple: правильные глаголы -ed. С did/didn’t всегда V1.")
];}
function unit9Rules(){ return [
  rule("Past Simple: irregular verbs",[
    "go→went, see→saw, buy→bought",
    "Neg: didn’t + V1",
    "Q: Did + S + V1?"
  ],"Неправильные глаголы: 2 форма. После did — V1.")
];}
function unit10Rules(){ return [
  rule("Adverbs of frequency",[
    "always/usually/often/sometimes/never",
    "S + adv + V1",
    "be + adv"
  ],"Наречия частоты: перед смысловым глаголом, после am/is/are.")
];}
function unit11Rules(){ return [
  rule("Comparatives",[
    "short adj: adj-er",
    "long adj: more + adj",
    "than"
  ],"Сравнение двух: taller than…, more interesting than…")
];}
function unit12Rules(){ return [
  rule("Superlatives",[
    "the + adj-est",
    "the most + adj",
    "in/of"
  ],"Самый/самая: the tallest, the most interesting. in the class / of all.")
];}
function unit13Rules(){ return [
  rule("Future: going to vs will",[
    "going to: plans",
    "will/won’t: prediction/promise/decision now"
  ],"going to — план. will — прогноз/обещание/решение сейчас.")
];}
function unit14Rules(){ return [
  rule("Should / Could",[
    "should/shouldn’t + V1 (advice)",
    "could/couldn’t + V1 (ability in past / possibility)"
  ],"should — совет. could — мог/умел (прошлое) или возможность.")
];}
function unit15Rules(){ return [
  rule("Present Perfect (ever/never)",[
    "have/has + V3",
    "Have you ever…?",
    "I’ve never…"
  ],"Опыт в жизни: ever/never."),
  rule("just/already/yet",[
    "just (только что)",
    "already (уже)",
    "yet (уже?/ещё) — questions/negatives"
  ],"yet — вопросы/отрицания; already/just — утверждения.")
];}

// =====================================================
// EXERCISES (Unit 1 already + Unit 2–15 fully)
// Each: 5 exercises × 10
// =====================================================
function unit1Exercises(){
  return [
    exMC("ex1","Exercise 1", take10([
      {text:"She ____ to school at 8:00.", options:["go","goes","going"], answer:1},
      {text:"They ____ football on Fridays.", options:["play","plays","playing"], answer:0},
      {text:"My dad ____ coffee every morning.", options:["drink","drinks","drinking"], answer:1},
      {text:"I ____ my homework after dinner.", options:["do","does","doing"], answer:0},
      {text:"Tom ____ TV a lot.", options:["watch","watches","watching"], answer:1},
      {text:"We ____ English on Mondays.", options:["study","studies","studying"], answer:0},
      {text:"Anna ____ books every day.", options:["read","reads","reading"], answer:1},
      {text:"Cats ____ milk.", options:["like","likes","liking"], answer:0},
      {text:"He ____ his teeth at night.", options:["brush","brushes","brushing"], answer:1},
      {text:"I ____ in Aktau.", options:["live","lives","living"], answer:0},
    ])),
    exIN("ex2","Exercise 2", take10([
      {text:"He (study) ____ English every day.", answer:"studies"},
      {text:"I (not like) ____ onions.", answer:"don't like"},
      {text:"Mia (watch) ____ cartoons on Sunday.", answer:"watches"},
      {text:"They (not play) ____ on Mondays.", answer:"don't play"},
      {text:"Sam (go) ____ to bed at 10.", answer:"goes"},
      {text:"She (wash) ____ her hands.", answer:"washes"},
      {text:"We (not go) ____ to school on Sunday.", answer:"don't go"},
      {text:"My mum (cook) ____ dinner.", answer:"cooks"},
      {text:"Tom (not read) ____ comics.", answer:"doesn't read"},
      {text:"I (do) ____ my homework.", answer:"do"},
    ])),
    exMC("ex3","Exercise 3", take10([
      {text:"____ you play chess?", options:["Do","Does","Are"], answer:0},
      {text:"____ she live near here?", options:["Do","Does","Is"], answer:1},
      {text:"____ they speak English?", options:["Do","Does","Are"], answer:0},
      {text:"____ he like apples?", options:["Do","Does","Is"], answer:1},
      {text:"____ we need a pen?", options:["Do","Does","Are"], answer:0},
      {text:"____ your brother study?", options:["Do","Does","Is"], answer:1},
      {text:"____ you like milk?", options:["Do","Does","Are"], answer:0},
      {text:"____ she play tennis?", options:["Do","Does","Is"], answer:1},
      {text:"____ they go by bus?", options:["Do","Does","Are"], answer:0},
      {text:"____ he watch TV?", options:["Do","Does","Is"], answer:1},
    ])),
    exIN("ex4","Exercise 4", take10([
      {text:"He likes milk. → He ____ like milk.", answer:"doesn't"},
      {text:"They play tennis. → They ____ play tennis.", answer:"don't"},
      {text:"She reads books. → She ____ read books.", answer:"doesn't"},
      {text:"I get up early. → I ____ get up early.", answer:"don't"},
      {text:"Tom watches TV. → Tom ____ watch TV.", answer:"doesn't"},
      {text:"We go to school. → We ____ go to school.", answer:"don't"},
      {text:"He studies English. → He ____ study English.", answer:"doesn't"},
      {text:"They eat fish. → They ____ eat fish.", answer:"don't"},
      {text:"She plays piano. → She ____ play piano.", answer:"doesn't"},
      {text:"I like coffee. → I ____ like coffee.", answer:"don't"},
    ])),
    exMC("ex5","Exercise 5", take10([
      {text:"I ____ get up at 7. (usually)", options:["usually","am usually","usually am"], answer:0},
      {text:"She is ____ late. (never)", options:["never","nevers","never is"], answer:0},
      {text:"We ____ play outside. (often)", options:["often","are often","often are"], answer:0},
      {text:"He ____ does his homework. (always)", options:["always","is always","always is"], answer:0},
      {text:"They are ____ happy. (sometimes)", options:["sometimes","sometime","some time"], answer:0},
      {text:"I ____ help my mum. (often)", options:["often","am often","often am"], answer:0},
      {text:"He is ____ friendly. (usually)", options:["usually","usual","use"], answer:0},
      {text:"We ____ go swimming. (sometimes)", options:["sometimes","sometime","some times"], answer:0},
      {text:"She ____ plays football. (never)", options:["never","nevers","never is"], answer:0},
      {text:"They ____ study at home. (usually)", options:["usually","are usually","usually are"], answer:0},
    ])),
  ];
}

// ---------- Unit 2 ----------
function unit2Exercises(){
  return [
    exMC("ex1","Exercise 1", take10([
      {text:"I ____ a sandwich now.", options:["eat","am eating","eats"], answer:1},
      {text:"She ____ her bike at the moment.", options:["ride","is riding","rides"], answer:1},
      {text:"They ____ TV now.", options:["watch","are watching","watches"], answer:1},
      {text:"He ____ a song now.", options:["sings","is singing","sing"], answer:1},
      {text:"We ____ in the park now.", options:["run","are running","runs"], answer:1},
      {text:"My mum ____ dinner now.", options:["cooks","is cooking","cook"], answer:1},
      {text:"Tom ____ his homework now.", options:["does","is doing","do"], answer:1},
      {text:"The cat ____ on the sofa now.", options:["sleep","is sleeping","sleeps"], answer:1},
      {text:"I ____ to music now.", options:["listen","am listening","listens"], answer:1},
      {text:"They ____ for the bus now.", options:["wait","are waiting","waits"], answer:1},
    ])),
    exIN("ex2","Exercise 2", take10([
      {text:"She (play) ____ tennis now.", answer:"is playing"},
      {text:"They (not swim) ____ now.", answer:"aren't swimming"},
      {text:"I (read) ____ a book now.", answer:"am reading"},
      {text:"He (not listen) ____ to music now.", answer:"isn't listening"},
      {text:"We (write) ____ an email now.", answer:"are writing"},
      {text:"Tom (run) ____ now.", answer:"is running"},
      {text:"My friends (dance) ____ now.", answer:"are dancing"},
      {text:"I (not watch) ____ TV now.", answer:"am not watching"},
      {text:"She (sit) ____ now.", answer:"is sitting"},
      {text:"They (make) ____ a cake now.", answer:"are making"},
    ])),
    exMC("ex3","Exercise 3", take10([
      {text:"____ you studying now?", options:["Do","Are","Does"], answer:1},
      {text:"____ she cooking now?", options:["Is","Does","Do"], answer:0},
      {text:"____ they playing?", options:["Are","Do","Is"], answer:0},
      {text:"____ he sleeping?", options:["Is","Are","Do"], answer:0},
      {text:"____ we waiting?", options:["Are","Do","Does"], answer:0},
      {text:"____ I speaking too fast?", options:["Am","Do","Does"], answer:0},
      {text:"____ she reading now?", options:["Is","Does","Do"], answer:0},
      {text:"____ they running now?", options:["Are","Do","Does"], answer:0},
      {text:"____ he writing now?", options:["Is","Do","Does"], answer:0},
      {text:"____ we listening?", options:["Are","Do","Does"], answer:0},
    ])),
    exMC("ex4","Exercise 4 (PS vs PC)", take10([
      {text:"Every day I ____ to school, but today I ____ by car.", options:["go / am going","am going / go","go / goes"], answer:0},
      {text:"She usually ____ tea, but now she ____ juice.", options:["drinks / is drinking","is drinking / drinks","drink / drinking"], answer:0},
      {text:"They ____ football on Fridays. Look! They ____ now!", options:["play / are playing","are playing / play","plays / play"], answer:0},
      {text:"He ____ his homework every evening. Now he ____ it.", options:["does / is doing","is doing / does","do / does"], answer:0},
      {text:"I ____ English. Today I ____ for a test.", options:["study / am studying","am studying / study","studies / am studying"], answer:0},
      {text:"My dad ____ at 7, but now he ____.", options:["works / is resting","is resting / works","work / resting"], answer:0},
      {text:"We ____ lunch now, but we ____ lunch at 1 pm.", options:["are having / have","have / are having","has / having"], answer:0},
      {text:"She ____ to school every day, but today she ____ at home.", options:["goes / is staying","is staying / goes","go / stay"], answer:0},
      {text:"They ____ TV now, but they ____ TV on weekends.", options:["are watching / watch","watch / are watching","watches / watching"], answer:0},
      {text:"I ____ now, but I ____ books every evening.", options:["am reading / read","read / am reading","reads / reading"], answer:0},
    ])),
    exIN("ex5","Exercise 5 (-ing spelling)", take10([
      {text:"make → ____", answer:"making"},
      {text:"run → ____", answer:"running"},
      {text:"swim → ____", answer:"swimming"},
      {text:"write → ____", answer:"writing"},
      {text:"sit → ____", answer:"sitting"},
      {text:"dance → ____", answer:"dancing"},
      {text:"get → ____", answer:"getting"},
      {text:"use → ____", answer:"using"},
      {text:"shop → ____", answer:"shopping"},
      {text:"play → ____", answer:"playing"},
    ])),
  ];
}

// ---------- Unit 3 ----------
function unit3Exercises(){
  return [
    exMC("ex1","Exercise 1", take10([
      {text:"Listen! The baby ____.", options:["cries","is crying","cry"], answer:1},
      {text:"My brother ____ video games every day.", options:["plays","is playing","play"], answer:0},
      {text:"We ____ dinner now.", options:["have","are having","has"], answer:1},
      {text:"She ____ the answer. (know)", options:["knows","is knowing","know"], answer:0},
      {text:"I ____ English on Tuesdays.", options:["study","am studying","studies"], answer:0},
      {text:"Look! They ____ in the yard.", options:["play","are playing","plays"], answer:1},
      {text:"He usually ____ to school by bus.", options:["goes","is going","go"], answer:0},
      {text:"Today we ____ for a test.", options:["study","are studying","studies"], answer:1},
      {text:"I ____ this song. (like)", options:["like","am liking","likes"], answer:0},
      {text:"At the moment she ____ a letter.", options:["writes","is writing","write"], answer:1},
    ])),
    exMC("ex2","Exercise 2 (PS/PC)", take10([
      {text:"every day", options:["Present Simple","Present Continuous"], answer:0},
      {text:"now", options:["Present Simple","Present Continuous"], answer:1},
      {text:"usually", options:["Present Simple","Present Continuous"], answer:0},
      {text:"at the moment", options:["Present Simple","Present Continuous"], answer:1},
      {text:"on Mondays", options:["Present Simple","Present Continuous"], answer:0},
      {text:"today", options:["Present Simple","Present Continuous"], answer:1},
      {text:"always", options:["Present Simple","Present Continuous"], answer:0},
      {text:"right now", options:["Present Simple","Present Continuous"], answer:1},
      {text:"often", options:["Present Simple","Present Continuous"], answer:0},
      {text:"listen!", options:["Present Simple","Present Continuous"], answer:1},
    ])),
    exMC("ex3","Exercise 3 (stative)", take10([
      {text:"I ____ this song. (like)", options:["like","am liking","likes"], answer:0},
      {text:"She ____ the answer. (know)", options:["knows","is knowing","know"], answer:0},
      {text:"We ____ new shoes. (want)", options:["want","are wanting","wants"], answer:0},
      {text:"He ____ a new phone. (need)", options:["needs","is needing","need"], answer:0},
      {text:"They ____ this game. (love)", options:["love","are loving","loves"], answer:0},
      {text:"I ____ hungry. (be)", options:["am","am being","is"], answer:0},
      {text:"She ____ tired. (feel)", options:["feels","is feeling","feel"], answer:0},
      {text:"We ____ your name. (remember)", options:["remember","are remembering","remembers"], answer:0},
      {text:"I ____ you. (believe)", options:["believe","am believing","believes"], answer:0},
      {text:"He ____ this book. (hate)", options:["hates","is hating","hate"], answer:0},
    ])),
    exIN("ex4","Exercise 4 (fix)", take10([
      {text:"She don't like milk. → She ____ like milk.", answer:"doesn't"},
      {text:"He is play football now. → He ____ playing football now.", answer:"is"},
      {text:"They goes to school. → They ____ to school.", answer:"go"},
      {text:"I am know the answer. → I ____ the answer.", answer:"know"},
      {text:"Does she goes? → Does she ____?", answer:"go"},
      {text:"We is studying now. → We ____ studying now.", answer:"are"},
      {text:"He don't reads books. → He ____ read books.", answer:"doesn't"},
      {text:"Are you play now? → Are you ____ now?", answer:"playing"},
      {text:"She is liking ice cream. → She ____ ice cream.", answer:"likes"},
      {text:"Do he live here? → ____ he live here?", answer:"Does"},
    ])),
    exMC("ex5","Exercise 5 (short answers)", take10([
      {text:"Do you play tennis? — Yes, I ____.", options:["do","am","does"], answer:0},
      {text:"Does she like pizza? — No, she ____.", options:["doesn't","isn't","don't"], answer:0},
      {text:"Are they studying now? — Yes, they ____.", options:["are","do","does"], answer:0},
      {text:"Is he sleeping? — No, he ____.", options:["isn't","doesn't","don't"], answer:0},
      {text:"Do we need pencils? — No, we ____.", options:["don't","aren't","doesn't"], answer:0},
      {text:"Does he go to school? — Yes, he ____.", options:["does","do","is"], answer:0},
      {text:"Are you writing now? — No, I’m ____.", options:["not","don’t","doesn’t"], answer:0},
      {text:"Is she reading? — Yes, she ____.", options:["is","does","do"], answer:0},
      {text:"Do they play chess? — No, they ____.", options:["don't","isn't","doesn't"], answer:0},
      {text:"Are we late? — Yes, we ____.", options:["are","do","does"], answer:0},
    ])),
  ];
}

// ---------- Unit 4 ----------
function unit4Exercises(){
  return [
    exMC("ex1","Exercise 1", take10([
      {text:"There ____ a book on the table.", options:["is","are","am"], answer:0},
      {text:"There ____ two chairs.", options:["is","are","be"], answer:1},
      {text:"There ____ an apple in the bag.", options:["is","are","have"], answer:0},
      {text:"There ____ three windows.", options:["is","are","has"], answer:1},
      {text:"There ____ a lamp in my room.", options:["is","are","were"], answer:0},
      {text:"There ____ four students.", options:["is","are","was"], answer:1},
      {text:"There ____ a dog in the yard.", options:["is","are","were"], answer:0},
      {text:"There ____ many books.", options:["is","are","am"], answer:1},
      {text:"There ____ a TV in the living room.", options:["is","are","were"], answer:0},
      {text:"There ____ two doors.", options:["is","are","was"], answer:1},
    ])),
    exMC("ex2","Exercise 2 (questions)", take10([
      {text:"____ there any milk?", options:["Is","Are","Do"], answer:0},
      {text:"____ there two bathrooms?", options:["Is","Are","Does"], answer:1},
      {text:"____ there a park near here?", options:["Is","Are","Do"], answer:0},
      {text:"____ there any apples?", options:["Is","Are","Does"], answer:1},
      {text:"____ there a fridge in the kitchen?", options:["Is","Are","Do"], answer:0},
      {text:"____ there any pens?", options:["Is","Are","Do"], answer:1},
      {text:"____ there a cat?", options:["Is","Are","Do"], answer:0},
      {text:"____ there any students?", options:["Is","Are","Does"], answer:1},
      {text:"____ there a computer?", options:["Is","Are","Do"], answer:0},
      {text:"____ there any pictures?", options:["Is","Are","Do"], answer:1},
    ])),
    exIN("ex3","Exercise 3 (negatives)", take10([
      {text:"There is a cat. → There ____ a cat.", answer:"isn't"},
      {text:"There are books. → There ____ books.", answer:"aren't"},
      {text:"There is a TV. → There ____ a TV.", answer:"isn't"},
      {text:"There are chairs. → There ____ chairs.", answer:"aren't"},
      {text:"There is a computer. → There ____ a computer.", answer:"isn't"},
      {text:"There are windows. → There ____ windows.", answer:"aren't"},
      {text:"There is a ball. → There ____ a ball.", answer:"isn't"},
      {text:"There are toys. → There ____ toys.", answer:"aren't"},
      {text:"There is a desk. → There ____ a desk.", answer:"isn't"},
      {text:"There are posters. → There ____ posters.", answer:"aren't"},
    ])),
    exMC("ex4","Exercise 4 (some/any)", take10([
      {text:"I have ____ bread.", options:["some","any","a"], answer:0},
      {text:"Do you have ____ juice?", options:["some","any","an"], answer:1},
      {text:"We don’t have ____ bananas.", options:["some","any","many"], answer:1},
      {text:"There are ____ cookies on the plate.", options:["some","any","an"], answer:0},
      {text:"Is there ____ cheese?", options:["some","any","a"], answer:1},
      {text:"She has ____ water.", options:["some","any","many"], answer:0},
      {text:"Are there ____ pencils?", options:["some","any","a"], answer:1},
      {text:"We have ____ apples.", options:["some","any","an"], answer:0},
      {text:"I don't have ____ money.", options:["some","any","a"], answer:1},
      {text:"Is there ____ milk?", options:["some","any","many"], answer:1},
    ])),
    exIN("ex5","Exercise 5 (write there is/are)", take10([
      {text:"____ a pencil in my bag. (singular)", answer:"There is"},
      {text:"____ two posters on the wall. (plural)", answer:"There are"},
      {text:"____ an orange on the table.", answer:"There is"},
      {text:"____ three books on the desk.", answer:"There are"},
      {text:"____ a shop near my house.", answer:"There is"},
      {text:"____ five chairs in the room.", answer:"There are"},
      {text:"____ a clock on the wall.", answer:"There is"},
      {text:"____ two windows here.", answer:"There are"},
      {text:"____ an egg in the fridge.", answer:"There is"},
      {text:"____ many students today.", answer:"There are"},
    ])),
  ];
}

// ---------- Unit 5 ----------
function unit5Exercises(){
  return [
    exMC("ex1","Exercise 1 (much/many)", take10([
      {text:"How ____ apples are there?", options:["many","much","some"], answer:0},
      {text:"How ____ water do you drink?", options:["many","much","few"], answer:1},
      {text:"How ____ sandwiches do we need?", options:["many","much","a"], answer:0},
      {text:"How ____ milk is in the fridge?", options:["many","much","an"], answer:1},
      {text:"How ____ eggs are in the box?", options:["many","much","any"], answer:0},
      {text:"How ____ bread do you want?", options:["many","much","few"], answer:1},
      {text:"How ____ books do you have?", options:["many","much","a"], answer:0},
      {text:"How ____ cheese is there?", options:["many","much","some"], answer:1},
      {text:"How ____ bananas do we have?", options:["many","much","an"], answer:0},
      {text:"How ____ juice is in the glass?", options:["many","much","any"], answer:1},
    ])),
    exMC("ex2","Exercise 2 (a/an/some)", take10([
      {text:"I want ____ orange.", options:["a","an","some"], answer:1},
      {text:"She has ____ banana.", options:["a","an","some"], answer:0},
      {text:"We need ____ rice.", options:["a","an","some"], answer:2},
      {text:"He buys ____ apples.", options:["a","an","some"], answer:2},
      {text:"I see ____ egg.", options:["a","an","some"], answer:1},
      {text:"She wants ____ water.", options:["a","an","some"], answer:2},
      {text:"I have ____ sandwich.", options:["a","an","some"], answer:0},
      {text:"We need ____ tomatoes.", options:["a","an","some"], answer:2},
      {text:"He eats ____ apple.", options:["a","an","some"], answer:1},
      {text:"They buy ____ milk.", options:["a","an","some"], answer:2},
    ])),
    exIN("ex3","Exercise 3 (countable/uncountable)", take10([
      {text:"bread is ____ (countable/uncountable)", answer:"uncountable"},
      {text:"apple is ____ (countable/uncountable)", answer:"countable"},
      {text:"milk is ____", answer:"uncountable"},
      {text:"cookie is ____", answer:"countable"},
      {text:"water is ____", answer:"uncountable"},
      {text:"rice is ____", answer:"uncountable"},
      {text:"banana is ____", answer:"countable"},
      {text:"cheese is ____", answer:"uncountable"},
      {text:"egg is ____", answer:"countable"},
      {text:"juice is ____", answer:"uncountable"},
    ])),
    exMC("ex4","Exercise 4 (some/any)", take10([
      {text:"We have ____ juice.", options:["some","any","many"], answer:0},
      {text:"Do we have ____ oranges?", options:["some","any","much"], answer:1},
      {text:"I don’t have ____ money.", options:["some","any","a"], answer:1},
      {text:"There are ____ tomatoes.", options:["some","any","an"], answer:0},
      {text:"Is there ____ bread?", options:["some","any","many"], answer:1},
      {text:"She has ____ cheese.", options:["some","any","many"], answer:0},
      {text:"We don’t have ____ milk.", options:["some","any","a"], answer:1},
      {text:"Are there ____ eggs?", options:["some","any","much"], answer:1},
      {text:"There is ____ water.", options:["some","any","many"], answer:0},
      {text:"Do you have ____ bread?", options:["some","any","a"], answer:1},
    ])),
    exIN("ex5","Exercise 5 (write questions)", take10([
      {text:"____ ____ apples do you eat? (many)", answer:"How many"},
      {text:"____ ____ water do you need? (much)", answer:"How much"},
      {text:"____ ____ sandwiches are there? (many)", answer:"How many"},
      {text:"____ ____ milk is there? (much)", answer:"How much"},
      {text:"____ ____ eggs do we need? (many)", answer:"How many"},
      {text:"____ ____ bread do you want? (much)", answer:"How much"},
      {text:"____ ____ books are on the table? (many)", answer:"How many"},
      {text:"____ ____ juice is there? (much)", answer:"How much"},
      {text:"____ ____ bananas are there? (many)", answer:"How many"},
      {text:"____ ____ cheese do you eat? (much)", answer:"How much"},
    ])),
  ];
}

// ---------- Unit 6 ----------
function unit6Exercises(){
  return [
    exMC("ex1","Exercise 1 (can/can’t)", take10([
      {text:"I ____ swim.", options:["can","can't","am"], answer:0},
      {text:"He ____ drive. He’s 10.", options:["can","can't","does"], answer:1},
      {text:"We ____ speak English.", options:["can","can't","are"], answer:0},
      {text:"She ____ play the piano.", options:["can","can't","is"], answer:0},
      {text:"They ____ come today.", options:["can","can't","do"], answer:0},
      {text:"My sister ____ cook.", options:["can","can't","is"], answer:0},
      {text:"I ____ fly a plane.", options:["can","can't","am"], answer:1},
      {text:"We ____ use phones here.", options:["can","can't","are"], answer:1},
      {text:"He ____ run fast.", options:["can","can't","do"], answer:0},
      {text:"She ____ speak Chinese.", options:["can","can't","is"], answer:1},
    ])),
    exMC("ex2","Exercise 2 (questions)", take10([
      {text:"____ you ride a bike?", options:["Can","Do","Are"], answer:0},
      {text:"____ he cook?", options:["Can","Does","Is"], answer:0},
      {text:"____ they dance?", options:["Can","Do","Are"], answer:0},
      {text:"____ she sing?", options:["Can","Does","Is"], answer:0},
      {text:"____ we use this room?", options:["Can","Do","Are"], answer:0},
      {text:"____ you swim?", options:["Can","Do","Are"], answer:0},
      {text:"____ he play chess?", options:["Can","Does","Is"], answer:0},
      {text:"____ they speak English?", options:["Can","Do","Are"], answer:0},
      {text:"____ she drive?", options:["Can","Does","Is"], answer:0},
      {text:"____ we start now?", options:["Can","Do","Are"], answer:0},
    ])),
    exIN("ex3","Exercise 3 (short answers)", take10([
      {text:"Can you play chess? — Yes, I ____.", answer:"can"},
      {text:"Can he run fast? — No, he ____.", answer:"can't"},
      {text:"Can they swim? — Yes, they ____.", answer:"can"},
      {text:"Can she drive? — No, she ____.", answer:"can't"},
      {text:"Can we start? — Yes, we ____.", answer:"can"},
      {text:"Can you sing? — No, I ____.", answer:"can't"},
      {text:"Can he cook? — Yes, he ____.", answer:"can"},
      {text:"Can they jump? — No, they ____.", answer:"can't"},
      {text:"Can she dance? — Yes, she ____.", answer:"can"},
      {text:"Can we go? — No, we ____.", answer:"can't"},
    ])),
    exMC("ex4","Exercise 4 (imperatives)", take10([
      {text:"____ the door, please.", options:["Open","Opens","Opening"], answer:0},
      {text:"____ on the grass!", options:["Don't walk","Doesn't walk","Not walk"], answer:0},
      {text:"____ quiet!", options:["Be","Are","Is"], answer:0},
      {text:"____ your hands!", options:["Wash","Washes","Washing"], answer:0},
      {text:"____ late.", options:["Don't be","Doesn't be","Not be"], answer:0},
      {text:"____ here!", options:["Come","Comes","Coming"], answer:0},
      {text:"____ your homework!", options:["Do","Does","Doing"], answer:0},
      {text:"____ that!", options:["Don't touch","Doesn't touch","Not touch"], answer:0},
      {text:"____ down!", options:["Sit","Sits","Sitting"], answer:0},
      {text:"____ in class!", options:["Don't shout","Doesn't shout","Not shout"], answer:0},
    ])),
    exIN("ex5","Exercise 5 (make negative)", take10([
      {text:"You can jump. → You ____ jump.", answer:"can't"},
      {text:"He can sing. → He ____ sing.", answer:"can't"},
      {text:"They can come. → They ____ come.", answer:"can't"},
      {text:"She can dance. → She ____ dance.", answer:"can't"},
      {text:"We can go. → We ____ go.", answer:"can't"},
      {text:"I can swim. → I ____ swim.", answer:"can't"},
      {text:"He can cook. → He ____ cook.", answer:"can't"},
      {text:"They can run. → They ____ run.", answer:"can't"},
      {text:"She can write. → She ____ write.", answer:"can't"},
      {text:"We can play. → We ____ play.", answer:"can't"},
    ])),
  ];
}

// ---------- Unit 7 ----------
function unit7Exercises(){
  return [
    exMC("ex1","Exercise 1 (was/were)", take10([
      {text:"I ____ at home yesterday.", options:["was","were","am"], answer:0},
      {text:"They ____ happy.", options:["was","were","is"], answer:1},
      {text:"She ____ late.", options:["was","were","are"], answer:0},
      {text:"We ____ in the park.", options:["was","were","is"], answer:1},
      {text:"He ____ tired.", options:["was","were","are"], answer:0},
      {text:"My friends ____ here.", options:["was","were","is"], answer:1},
      {text:"Tom ____ at school.", options:["was","were","are"], answer:0},
      {text:"You ____ very kind.", options:["was","were","am"], answer:1},
      {text:"The cat ____ sleepy.", options:["was","were","are"], answer:0},
      {text:"We ____ ready.", options:["was","were","is"], answer:1},
    ])),
    exIN("ex2","Exercise 2 (negatives)", take10([
      {text:"I was tired. → I ____ tired.", answer:"wasn't"},
      {text:"They were here. → They ____ here.", answer:"weren't"},
      {text:"She was angry. → She ____ angry.", answer:"wasn't"},
      {text:"We were late. → We ____ late.", answer:"weren't"},
      {text:"He was at school. → He ____ at school.", answer:"wasn't"},
      {text:"I was happy. → I ____ happy.", answer:"wasn't"},
      {text:"They were noisy. → They ____ noisy.", answer:"weren't"},
      {text:"She was ready. → She ____ ready.", answer:"wasn't"},
      {text:"We were at home. → We ____ at home.", answer:"weren't"},
      {text:"He was cold. → He ____ cold.", answer:"wasn't"},
    ])),
    exMC("ex3","Exercise 3 (questions)", take10([
      {text:"____ you at home?", options:["Was","Were","Did"], answer:1},
      {text:"____ he tired?", options:["Was","Were","Did"], answer:0},
      {text:"____ they noisy?", options:["Was","Were","Did"], answer:1},
      {text:"____ she happy?", options:["Was","Were","Did"], answer:0},
      {text:"____ we early?", options:["Was","Were","Did"], answer:1},
      {text:"____ Tom at school?", options:["Was","Were","Did"], answer:0},
      {text:"____ you ready?", options:["Was","Were","Did"], answer:1},
      {text:"____ she late?", options:["Was","Were","Did"], answer:0},
      {text:"____ they here?", options:["Was","Were","Did"], answer:1},
      {text:"____ he angry?", options:["Was","Were","Did"], answer:0},
    ])),
    exIN("ex4","Exercise 4 (short answers)", take10([
      {text:"Was he late? — No, he ____.", answer:"wasn't"},
      {text:"Were they here? — Yes, they ____.", answer:"were"},
      {text:"Was she ill? — Yes, she ____.", answer:"was"},
      {text:"Were we ready? — No, we ____.", answer:"weren't"},
      {text:"Were you tired? — Yes, I ____.", answer:"was"},
      {text:"Was it cold? — Yes, it ____.", answer:"was"},
      {text:"Were they happy? — No, they ____.", answer:"weren't"},
      {text:"Was she at home? — No, she ____.", answer:"wasn't"},
      {text:"Were we late? — Yes, we ____.", answer:"were"},
      {text:"Was he here? — No, he ____.", answer:"wasn't"},
    ])),
    exMC("ex5","Exercise 5 (time words)", take10([
      {text:"Past time word:", options:["yesterday","now","tomorrow"], answer:0},
      {text:"Past time word:", options:["last week","today","at the moment"], answer:0},
      {text:"Past time word:", options:["two days ago","next week","soon"], answer:0},
      {text:"Past time word:", options:["last night","right now","usually"], answer:0},
      {text:"Past time word:", options:["yesterday morning","every day","now"], answer:0},
      {text:"Past time word:", options:["last month","today","tomorrow"], answer:0},
      {text:"Past time word:", options:["three years ago","now","soon"], answer:0},
      {text:"Past time word:", options:["last Saturday","at the moment","often"], answer:0},
      {text:"Past time word:", options:["yesterday evening","next day","always"], answer:0},
      {text:"Past time word:", options:["a week ago","today","tomorrow"], answer:0},
    ])),
  ];
}

// ---------- Unit 8 ----------
function unit8Exercises(){
  return [
    exMC("ex1","Exercise 1 (regular past)", take10([
      {text:"I ____ my room yesterday.", options:["cleaned","clean","cleaning"], answer:0},
      {text:"She ____ to music last night.", options:["listened","listens","listening"], answer:0},
      {text:"We ____ the game.", options:["played","play","plays"], answer:0},
      {text:"They ____ a cake.", options:["cooked","cook","cooks"], answer:0},
      {text:"He ____ his bike.", options:["fixed","fix","fixes"], answer:0},
      {text:"I ____ my friend.", options:["visited","visit","visits"], answer:0},
      {text:"She ____ a letter.", options:["opened","open","opens"], answer:0},
      {text:"We ____ at 7.", options:["started","start","starts"], answer:0},
      {text:"They ____ in the park.", options:["walked","walk","walks"], answer:0},
      {text:"He ____ TV.", options:["watched","watch","watches"], answer:0},
    ])),
    exIN("ex2","Exercise 2 (write -ed)", take10([
      {text:"watch → ____", answer:"watched"},
      {text:"dance → ____", answer:"danced"},
      {text:"study → ____", answer:"studied"},
      {text:"stop → ____", answer:"stopped"},
      {text:"like → ____", answer:"liked"},
      {text:"play → ____", answer:"played"},
      {text:"visit → ____", answer:"visited"},
      {text:"open → ____", answer:"opened"},
      {text:"plan → ____", answer:"planned"},
      {text:"clean → ____", answer:"cleaned"},
    ])),
    exMC("ex3","Exercise 3 (did/didn’t)", take10([
      {text:"He ____ play yesterday.", options:["didn't","doesn't","don't"], answer:0},
      {text:"____ you watch TV?", options:["Did","Do","Are"], answer:0},
      {text:"They ____ visit grandma.", options:["didn't","don't","doesn't"], answer:0},
      {text:"____ she clean her room?", options:["Did","Does","Is"], answer:0},
      {text:"We ____ cook dinner.", options:["didn't","don't","doesn't"], answer:0},
      {text:"I ____ call you.", options:["didn't","don't","doesn't"], answer:0},
      {text:"____ he play chess?", options:["Did","Does","Is"], answer:0},
      {text:"They ____ study.", options:["didn't","don't","doesn't"], answer:0},
      {text:"____ we start at 8?", options:["Did","Do","Are"], answer:0},
      {text:"She ____ walk home.", options:["didn't","doesn't","don't"], answer:0},
    ])),
    exIN("ex4","Exercise 4 (make questions)", take10([
      {text:"you / play / yesterday → ____?", answer:"Did you play yesterday"},
      {text:"she / visit / aunt → ____?", answer:"Did she visit aunt"},
      {text:"they / watch / film → ____?", answer:"Did they watch film"},
      {text:"he / clean / room → ____?", answer:"Did he clean room"},
      {text:"we / walk / home → ____?", answer:"Did we walk home"},
      {text:"you / cook / dinner → ____?", answer:"Did you cook dinner"},
      {text:"she / call / you → ____?", answer:"Did she call you"},
      {text:"they / play / outside → ____?", answer:"Did they play outside"},
      {text:"he / watch / TV → ____?", answer:"Did he watch TV"},
      {text:"we / visit / grandma → ____?", answer:"Did we visit grandma"},
    ])),
    exMC("ex5","Exercise 5 (V1 after did)", take10([
      {text:"Did you ____ (go/went)?", options:["go","went","goed"], answer:0},
      {text:"He didn't ____ (play/played).", options:["play","played","plaied"], answer:0},
      {text:"Did she ____ (watch/watched)?", options:["watch","watched","watcht"], answer:0},
      {text:"They didn't ____ (clean/cleaned).", options:["clean","cleaned","cleant"], answer:0},
      {text:"Did we ____ (start/started)?", options:["start","started","startt"], answer:0},
      {text:"Did you ____ (visit/visited)?", options:["visit","visited","visiting"], answer:0},
      {text:"He didn't ____ (open/opened).", options:["open","opened","opening"], answer:0},
      {text:"Did she ____ (call/called)?", options:["call","called","calling"], answer:0},
      {text:"They didn't ____ (walk/walked).", options:["walk","walked","walking"], answer:0},
      {text:"Did we ____ (cook/cooked)?", options:["cook","cooked","cooking"], answer:0},
    ])),
  ];
}

// ---------- Unit 9 ----------
function unit9Exercises(){
  return [
    exMC("ex1","Exercise 1 (V2)", take10([
      {text:"go → ____", options:["went","goed","goes"], answer:0},
      {text:"see → ____", options:["saw","seed","sees"], answer:0},
      {text:"buy → ____", options:["bought","buyed","buys"], answer:0},
      {text:"take → ____", options:["took","taked","takes"], answer:0},
      {text:"have → ____", options:["had","haved","has"], answer:0},
      {text:"come → ____", options:["came","comed","comes"], answer:0},
      {text:"eat → ____", options:["ate","eated","eats"], answer:0},
      {text:"make → ____", options:["made","maked","makes"], answer:0},
      {text:"get → ____", options:["got","getted","gets"], answer:0},
      {text:"give → ____", options:["gave","gived","gives"], answer:0},
    ])),
    exIN("ex2","Exercise 2 (write)", take10([
      {text:"Yesterday I (go) ____ to the cinema.", answer:"went"},
      {text:"We (see) ____ a great show.", answer:"saw"},
      {text:"She (buy) ____ a souvenir.", answer:"bought"},
      {text:"He (take) ____ a photo.", answer:"took"},
      {text:"They (have) ____ pizza.", answer:"had"},
      {text:"I (come) ____ home late.", answer:"came"},
      {text:"We (eat) ____ ice cream.", answer:"ate"},
      {text:"She (make) ____ a cake.", answer:"made"},
      {text:"He (get) ____ a gift.", answer:"got"},
      {text:"They (give) ____ me a book.", answer:"gave"},
    ])),
    exMC("ex3","Exercise 3 (didn’t)", take10([
      {text:"I ____ go yesterday.", options:["didn't","don't","doesn't"], answer:0},
      {text:"She ____ buy anything.", options:["didn't","doesn't","don't"], answer:0},
      {text:"We ____ see Tom.", options:["didn't","don't","doesn't"], answer:0},
      {text:"They ____ have time.", options:["didn't","don't","doesn't"], answer:0},
      {text:"He ____ take my pen.", options:["didn't","doesn't","don't"], answer:0},
      {text:"I ____ eat breakfast.", options:["didn't","don't","doesn't"], answer:0},
      {text:"She ____ come to school.", options:["didn't","doesn't","don't"], answer:0},
      {text:"We ____ get a taxi.", options:["didn't","don't","doesn't"], answer:0},
      {text:"They ____ make a cake.", options:["didn't","don't","doesn't"], answer:0},
      {text:"He ____ give me the book.", options:["didn't","doesn't","don't"], answer:0},
    ])),
    exMC("ex4","Exercise 4 (Did…?)", take10([
      {text:"____ you go to the park?", options:["Did","Do","Are"], answer:0},
      {text:"____ she see the film?", options:["Did","Does","Is"], answer:0},
      {text:"____ they buy bread?", options:["Did","Do","Are"], answer:0},
      {text:"____ he take a bus?", options:["Did","Does","Is"], answer:0},
      {text:"____ we have lunch?", options:["Did","Do","Are"], answer:0},
      {text:"____ you eat pizza?", options:["Did","Do","Are"], answer:0},
      {text:"____ she come late?", options:["Did","Does","Is"], answer:0},
      {text:"____ they make a cake?", options:["Did","Do","Are"], answer:0},
      {text:"____ he get a gift?", options:["Did","Does","Is"], answer:0},
      {text:"____ we give him a book?", options:["Did","Do","Are"], answer:0},
    ])),
    exIN("ex5","Exercise 5 (V1 after did)", take10([
      {text:"Did you ____ (went/go)?", answer:"go"},
      {text:"He didn't ____ (saw/see).", answer:"see"},
      {text:"Did she ____ (bought/buy)?", answer:"buy"},
      {text:"They didn't ____ (took/take).", answer:"take"},
      {text:"Did we ____ (had/have)?", answer:"have"},
      {text:"Did you ____ (ate/eat)?", answer:"eat"},
      {text:"He didn't ____ (came/come).", answer:"come"},
      {text:"Did she ____ (made/make)?", answer:"make"},
      {text:"They didn't ____ (got/get).", answer:"get"},
      {text:"Did we ____ (gave/give)?", answer:"give"},
    ])),
  ];
}

// ---------- Unit 10 ----------
function unit10Exercises(){
  return [
    exMC("ex1","Exercise 1", take10([
      {text:"I ____ get up early. (always)", options:["always","am always","always am"], answer:0},
      {text:"She is ____ friendly. (usually)", options:["usually","usual","use"], answer:0},
      {text:"We ____ play outside. (often)", options:["often","are often","often are"], answer:0},
      {text:"He is ____ late. (never)", options:["is never","never is","never"], answer:0},
      {text:"They ____ help at home. (sometimes)", options:["sometimes","sometime","some times"], answer:0},
      {text:"I ____ read books. (often)", options:["often","am often","often am"], answer:0},
      {text:"He ____ eats breakfast. (always)", options:["always","is always","always is"], answer:0},
      {text:"She is ____ tired. (sometimes)", options:["sometimes","sometime","some time"], answer:0},
      {text:"We ____ watch TV. (usually)", options:["usually","are usually","usually are"], answer:0},
      {text:"They ____ go to bed late. (never)", options:["never","nevers","never are"], answer:0},
    ])),
    exIN("ex2","Exercise 2", take10([
      {text:"I play chess. (often) → I ____ play chess.", answer:"often"},
      {text:"She is tired. (sometimes) → She is ____ tired.", answer:"sometimes"},
      {text:"We eat vegetables. (always) → We ____ eat vegetables.", answer:"always"},
      {text:"He is late. (never) → He is ____ late.", answer:"never"},
      {text:"They do homework. (usually) → They ____ do homework.", answer:"usually"},
      {text:"I am happy. (always) → I am ____ happy.", answer:"always"},
      {text:"She reads. (often) → She ____ reads.", answer:"often"},
      {text:"We are busy. (usually) → We are ____ busy.", answer:"usually"},
      {text:"He plays football. (sometimes) → He ____ plays football.", answer:"sometimes"},
      {text:"They are late. (never) → They are ____ late.", answer:"never"},
    ])),
    exMC("ex3","Exercise 3", take10([
      {text:"____ do you read books?", options:["How often","How many","How much"], answer:0},
      {text:"____ do they play football?", options:["How often","How much","How old"], answer:0},
      {text:"____ does she go swimming?", options:["How often","How many","How far"], answer:0},
      {text:"____ do we eat pizza?", options:["How often","How much","How many"], answer:0},
      {text:"____ does he watch TV?", options:["How often","How many","How much"], answer:0},
      {text:"____ do you study English?", options:["How often","How many","How much"], answer:0},
      {text:"____ do they help at home?", options:["How often","How many","How much"], answer:0},
      {text:"____ does she clean her room?", options:["How often","How many","How much"], answer:0},
      {text:"____ do we go shopping?", options:["How often","How many","How much"], answer:0},
      {text:"____ does he play games?", options:["How often","How many","How much"], answer:0},
    ])),
    exMC("ex4","Exercise 4 (correct order)", take10([
      {text:"He always is late.", options:["Correct","Wrong"], answer:1},
      {text:"He is always late.", options:["Correct","Wrong"], answer:0},
      {text:"I often play football.", options:["Correct","Wrong"], answer:0},
      {text:"I play often football.", options:["Correct","Wrong"], answer:1},
      {text:"They are sometimes noisy.", options:["Correct","Wrong"], answer:0},
      {text:"She usually drinks tea.", options:["Correct","Wrong"], answer:0},
      {text:"She drinks usually tea.", options:["Correct","Wrong"], answer:1},
      {text:"We never are late.", options:["Correct","Wrong"], answer:1},
      {text:"We are never late.", options:["Correct","Wrong"], answer:0},
      {text:"He often is happy.", options:["Correct","Wrong"], answer:1},
    ])),
    exIN("ex5","Exercise 5 (answer)", take10([
      {text:"How often do you study? → I study ____ (every day).", answer:"every day"},
      {text:"How often is she late? → She is ____ (never).", answer:"never"},
      {text:"How often do they help? → They help ____ (sometimes).", answer:"sometimes"},
      {text:"How often do we play? → We play ____ (often).", answer:"often"},
      {text:"How often does he read? → He reads ____ (usually).", answer:"usually"},
      {text:"How often do you watch TV? → I watch TV ____ (often).", answer:"often"},
      {text:"How often do they go shopping? → They go ____ (sometimes).", answer:"sometimes"},
      {text:"How often is he tired? → He is ____ (usually).", answer:"usually"},
      {text:"How often do we eat fruit? → We eat fruit ____ (every day).", answer:"every day"},
      {text:"How often are you late? → I am ____ (never).", answer:"never"},
    ])),
  ];
}

// ---------- Unit 11 ----------
function unit11Exercises(){
  return [
    exMC("ex1","Exercise 1", take10([
      {text:"Tom is ____ than Max. (tall)", options:["taller","tallest","more tall"], answer:0},
      {text:"This book is ____ than that one. (interesting)", options:["more interesting","interestinger","most interesting"], answer:0},
      {text:"My bag is ____ than yours. (heavy)", options:["heavier","heaviest","more heavy"], answer:0},
      {text:"This task is ____ than yesterday’s. (easy)", options:["easier","easiest","more easy"], answer:0},
      {text:"A car is ____ than a bike. (fast)", options:["faster","fastest","more fast"], answer:0},
      {text:"My room is ____ than your room. (clean)", options:["cleaner","cleanest","more clean"], answer:0},
      {text:"This test is ____ than the last test. (hard)", options:["harder","hardest","more hard"], answer:0},
      {text:"Winter is ____ than autumn. (cold)", options:["colder","coldest","more cold"], answer:0},
      {text:"My sister is ____ than me. (old)", options:["older","oldest","more old"], answer:0},
      {text:"This chair is ____ than that chair. (comfortable)", options:["more comfortable","comfortabler","most comfortable"], answer:0},
    ])),
    exIN("ex2","Exercise 2 (write)", take10([
      {text:"big → ____", answer:"bigger"},
      {text:"nice → ____", answer:"nicer"},
      {text:"happy → ____", answer:"happier"},
      {text:"hot → ____", answer:"hotter"},
      {text:"busy → ____", answer:"busier"},
      {text:"thin → ____", answer:"thinner"},
      {text:"large → ____", answer:"larger"},
      {text:"easy → ____", answer:"easier"},
      {text:"heavy → ____", answer:"heavier"},
      {text:"funny → ____", answer:"funnier"},
    ])),
    exMC("ex3","Exercise 3 (than)", take10([
      {text:"My sister is older ____ me.", options:["than","that","then"], answer:0},
      {text:"This test is easier ____ the last one.", options:["than","then","that"], answer:0},
      {text:"A lion is bigger ____ a cat.", options:["than","then","that"], answer:0},
      {text:"Winter is colder ____ autumn.", options:["than","then","that"], answer:0},
      {text:"A plane is faster ____ a train.", options:["than","then","that"], answer:0},
      {text:"This bag is heavier ____ that bag.", options:["than","then","that"], answer:0},
      {text:"My bike is better ____ your bike.", options:["than","then","that"], answer:0},
      {text:"English is easier ____ math.", options:["than","then","that"], answer:0},
      {text:"Today is hotter ____ yesterday.", options:["than","then","that"], answer:0},
      {text:"My house is larger ____ your house.", options:["than","then","that"], answer:0},
    ])),
    exMC("ex4","Exercise 4 (much/a bit)", take10([
      {text:"This is ____ better.", options:["much","many","any"], answer:0},
      {text:"She is ____ taller than me.", options:["a bit","a many","muchly"], answer:0},
      {text:"Today is ____ colder.", options:["much","any","some"], answer:0},
      {text:"This game is ____ easier.", options:["a bit","many","some"], answer:0},
      {text:"That film is ____ more interesting.", options:["much","a many","any"], answer:0},
      {text:"This room is ____ bigger.", options:["much","many","any"], answer:0},
      {text:"I am ____ happier today.", options:["a bit","many","muchly"], answer:0},
      {text:"This task is ____ harder.", options:["much","any","some"], answer:0},
      {text:"This book is ____ more exciting.", options:["much","a many","any"], answer:0},
      {text:"My bag is ____ lighter.", options:["a bit","many","some"], answer:0},
    ])),
    exIN("ex5","Exercise 5", take10([
      {text:"cats / small / dogs → Cats are ____ than dogs.", answer:"smaller"},
      {text:"math / difficult / english → Math is ____ than English.", answer:"more difficult"},
      {text:"my room / clean / your room → My room is ____ than your room.", answer:"cleaner"},
      {text:"summer / hot / spring → Summer is ____ than spring.", answer:"hotter"},
      {text:"this chair / comfortable / that chair → This chair is ____ than that chair.", answer:"more comfortable"},
      {text:"cars / fast / bikes → Cars are ____ than bikes.", answer:"faster"},
      {text:"today / cold / yesterday → Today is ____ than yesterday.", answer:"colder"},
      {text:"my sister / old / me → My sister is ____ than me.", answer:"older"},
      {text:"this test / easy / that test → This test is ____ than that test.", answer:"easier"},
      {text:"this bag / heavy / that bag → This bag is ____ than that bag.", answer:"heavier"},
    ])),
  ];
}

// ---------- Unit 12 ----------
function unit12Exercises(){
  return [
    exMC("ex1","Exercise 1", take10([
      {text:"Tom is the ____ in the class. (tall)", options:["tallest","taller","most tall"], answer:0},
      {text:"This is the ____ book. (interesting)", options:["most interesting","more interesting","interestinger"], answer:0},
      {text:"She is the ____ runner. (fast)", options:["fastest","faster","most fast"], answer:0},
      {text:"That was the ____ day! (good)", options:["best","better","goodest"], answer:0},
      {text:"This puzzle is the ____ . (easy)", options:["easiest","easier","most easy"], answer:0},
      {text:"He is the ____ student. (smart)", options:["smartest","smarter","most smart"], answer:0},
      {text:"This is the ____ film. (funny)", options:["funniest","funnier","most funny"], answer:0},
      {text:"This is the ____ room. (big)", options:["biggest","bigger","most big"], answer:0},
      {text:"She is the ____ in the team. (young)", options:["youngest","younger","most young"], answer:0},
      {text:"It is the ____ task. (difficult)", options:["most difficult","difficulter","difficultest"], answer:0},
    ])),
    exIN("ex2","Exercise 2 (write)", take10([
      {text:"big → the ____", answer:"biggest"},
      {text:"happy → the ____", answer:"happiest"},
      {text:"hot → the ____", answer:"hottest"},
      {text:"nice → the ____", answer:"nicest"},
      {text:"beautiful → the ____", answer:"most beautiful"},
      {text:"small → the ____", answer:"smallest"},
      {text:"funny → the ____", answer:"funniest"},
      {text:"good → the ____", answer:"best"},
      {text:"bad → the ____", answer:"worst"},
      {text:"easy → the ____", answer:"easiest"},
    ])),
    exMC("ex3","Exercise 3 (in/of)", take10([
      {text:"the tallest ____ the class", options:["in","of","on"], answer:0},
      {text:"the best ____ all", options:["of","in","at"], answer:0},
      {text:"the biggest ____ the city", options:["in","of","to"], answer:0},
      {text:"the smallest ____ all the toys", options:["of","in","on"], answer:0},
      {text:"the fastest ____ the team", options:["in","of","at"], answer:0},
      {text:"the oldest ____ my family", options:["in","of","on"], answer:0},
      {text:"the most beautiful ____ the world", options:["in","of","at"], answer:0},
      {text:"the best ____ the class", options:["in","of","on"], answer:0},
      {text:"the worst ____ all", options:["of","in","at"], answer:0},
      {text:"the tallest ____ the school", options:["in","of","at"], answer:0},
    ])),
    exMC("ex4","Exercise 4 (irregular)", take10([
      {text:"good →", options:["best","goodest","better"], answer:0},
      {text:"bad →", options:["worst","badest","worse"], answer:0},
      {text:"far →", options:["farthest","farest","most far"], answer:0},
      {text:"many →", options:["most","manyest","more"], answer:0},
      {text:"little →", options:["least","littlest","less"], answer:0},
      {text:"well →", options:["best","wellest","better"], answer:0},
      {text:"much →", options:["most","muchest","more"], answer:0},
      {text:"good (comparative) →", options:["better","best","gooder"], answer:0},
      {text:"bad (comparative) →", options:["worse","worst","badder"], answer:0},
      {text:"far (comparative) →", options:["farther","farthest","farer"], answer:0},
    ])),
    exIN("ex5","Exercise 5", take10([
      {text:"This is ____ film (funny) I know.", answer:"the funniest"},
      {text:"She is ____ student (smart) in our class.", answer:"the smartest"},
      {text:"That is ____ building (tall) in the city.", answer:"the tallest"},
      {text:"This is ____ game (exciting) today.", answer:"the most exciting"},
      {text:"It was ____ day (bad) of the week.", answer:"the worst"},
      {text:"This is ____ book (interesting).", answer:"the most interesting"},
      {text:"He is ____ boy (young) in the family.", answer:"the youngest"},
      {text:"That is ____ room (big) in the house.", answer:"the biggest"},
      {text:"This is ____ test (easy).", answer:"the easiest"},
      {text:"She is ____ runner (fast) in the team.", answer:"the fastest"},
    ])),
  ];
}

// ---------- Unit 13 ----------
function unit13Exercises(){
  return [
    exMC("ex1","Exercise 1 (going to)", take10([
      {text:"I ____ to visit my grandma.", options:["am going to","will","go"], answer:0},
      {text:"She ____ to buy a new bag.", options:["is going to","will","goes"], answer:0},
      {text:"They ____ to play football.", options:["are going to","will","plays"], answer:0},
      {text:"We ____ to watch a film.", options:["are going to","will","watch"], answer:0},
      {text:"He ____ to study tonight.", options:["is going to","will","studies"], answer:0},
      {text:"I ____ to clean my room.", options:["am going to","will","clean"], answer:0},
      {text:"She ____ to make a cake.", options:["is going to","will","makes"], answer:0},
      {text:"They ____ to go shopping.", options:["are going to","will","go"], answer:0},
      {text:"We ____ to visit Almaty.", options:["are going to","will","visit"], answer:0},
      {text:"He ____ to read a book.", options:["is going to","will","reads"], answer:0},
    ])),
    exIN("ex2","Exercise 2 (write)", take10([
      {text:"I (go) ____ to help my mum.", answer:"am going to"},
      {text:"She (not / go) ____ to swim today.", answer:"isn't going to"},
      {text:"They (go) ____ to travel next week.", answer:"are going to"},
      {text:"We (not / go) ____ to play outside.", answer:"aren't going to"},
      {text:"He (go) ____ to clean his room.", answer:"is going to"},
      {text:"I (not / go) ____ to eat fast food.", answer:"am not going to"},
      {text:"She (go) ____ to study for a test.", answer:"is going to"},
      {text:"They (not / go) ____ to be late.", answer:"aren't going to"},
      {text:"We (go) ____ to watch TV.", answer:"are going to"},
      {text:"He (not / go) ____ to shout.", answer:"isn't going to"},
    ])),
    exMC("ex3","Exercise 3 (will/won’t)", take10([
      {text:"I think it ____ rain tomorrow.", options:["will","won't","is"], answer:0},
      {text:"Don’t worry. I ____ help you.", options:["will","won't","am"], answer:0},
      {text:"He ____ forget your birthday.", options:["won't","will","is"], answer:0},
      {text:"I’m tired. I ____ go to bed now.", options:["will","won't","am"], answer:0},
      {text:"They ____ be late. They’re usually on time.", options:["won't","will","are"], answer:0},
      {text:"I promise I ____ call you.", options:["will","won't","am"], answer:0},
      {text:"I think she ____ win.", options:["will","won't","is"], answer:0},
      {text:"We ____ lose this game.", options:["won't","will","are"], answer:0},
      {text:"It ____ be sunny.", options:["will","won't","is"], answer:0},
      {text:"I ____ do it now.", options:["will","won't","am"], answer:0},
    ])),
    exMC("ex4","Exercise 4 (choose)", take10([
      {text:"Plan: We ____ visit the museum.", options:["are going to","will","were"], answer:0},
      {text:"Prediction: I think you ____ like this.", options:["will","are going to","going"], answer:0},
      {text:"Promise: I ____ call you later.", options:["will","am going to","was"], answer:0},
      {text:"Plan: She ____ buy a gift.", options:["is going to","will","are"], answer:0},
      {text:"Prediction: It ____ snow soon.", options:["will","is going to","are"], answer:0},
      {text:"Decision now: I ____ help!", options:["will","am going to","go"], answer:0},
      {text:"Plan: They ____ play after school.", options:["are going to","will","play"], answer:0},
      {text:"Prediction: He ____ be famous.", options:["will","is going to","are"], answer:0},
      {text:"Promise: We ____ not be late.", options:["will","are going to","were"], answer:0},
      {text:"Plan: I ____ study tonight.", options:["am going to","will","studies"], answer:0},
    ])),
    exIN("ex5","Exercise 5 (future time)", take10([
      {text:"Write a future time phrase: ____ (tomorrow)", answer:"tomorrow"},
      {text:"Write a future time phrase: ____ (next week)", answer:"next week"},
      {text:"Write a future time phrase: ____ (this evening)", answer:"this evening"},
      {text:"Write a future time phrase: ____ (next month)", answer:"next month"},
      {text:"Write a future time phrase: ____ (tomorrow morning)", answer:"tomorrow morning"},
      {text:"Write a future time phrase: ____ (next year)", answer:"next year"},
      {text:"Write a future time phrase: ____ (this weekend)", answer:"this weekend"},
      {text:"Write a future time phrase: ____ (soon)", answer:"soon"},
      {text:"Write a future time phrase: ____ (in two days)", answer:"in two days"},
      {text:"Write a future time phrase: ____ (later)", answer:"later"},
    ])),
  ];
}

// ---------- Unit 14 ----------
function unit14Exercises(){
  return [
    exMC("ex1","Exercise 1 (should)", take10([
      {text:"You ____ eat more fruit.", options:["should","shouldn't","could"], answer:0},
      {text:"You ____ stay up late.", options:["shouldn't","should","could"], answer:0},
      {text:"We ____ do our homework.", options:["should","shouldn't","couldn't"], answer:0},
      {text:"He ____ be rude.", options:["shouldn't","should","could"], answer:0},
      {text:"She ____ drink water.", options:["should","shouldn't","couldn't"], answer:0},
      {text:"You ____ brush your teeth.", options:["should","shouldn't","could"], answer:0},
      {text:"You ____ eat too much candy.", options:["shouldn't","should","could"], answer:0},
      {text:"We ____ help our parents.", options:["should","shouldn't","could"], answer:0},
      {text:"He ____ shout in class.", options:["shouldn't","should","could"], answer:0},
      {text:"She ____ study for the test.", options:["should","shouldn't","could"], answer:0},
    ])),
    exIN("ex2","Exercise 2", take10([
      {text:"I have a cold. I ____ see a doctor.", answer:"should"},
      {text:"It’s late. You ____ go to bed.", answer:"should"},
      {text:"This is dangerous. You ____ do it.", answer:"shouldn't"},
      {text:"I’m tired. I ____ rest.", answer:"should"},
      {text:"He is angry. You ____ shout.", answer:"shouldn't"},
      {text:"I’m hungry. I ____ eat.", answer:"should"},
      {text:"It’s cold. You ____ wear a coat.", answer:"should"},
      {text:"You feel ill. You ____ drink cold water.", answer:"shouldn't"},
      {text:"We are late. We ____ hurry.", answer:"should"},
      {text:"It’s noisy. You ____ listen to loud music.", answer:"shouldn't"},
    ])),
    exMC("ex3","Exercise 3 (could/couldn’t)", take10([
      {text:"When I was five, I ____ swim.", options:["couldn't","could","should"], answer:0},
      {text:"She ____ read at 6.", options:["could","couldn't","should"], answer:0},
      {text:"They ____ speak English last year.", options:["couldn't","could","should"], answer:0},
      {text:"He ____ ride a bike at 7.", options:["could","couldn't","shouldn't"], answer:0},
      {text:"We ____ find the place.", options:["couldn't","could","should"], answer:0},
      {text:"I ____ write my name at 4.", options:["could","couldn't","should"], answer:0},
      {text:"She ____ play piano last year.", options:["could","couldn't","should"], answer:1},
      {text:"They ____ come yesterday.", options:["could","couldn't","should"], answer:1},
      {text:"He ____ run fast when he was 6.", options:["could","couldn't","should"], answer:0},
      {text:"We ____ open the door (it was locked).", options:["could","couldn't","should"], answer:1},
    ])),
    exMC("ex4","Exercise 4 (Let’s)", take10([
      {text:"Let’s ____ a game!", options:["play","plays","playing"], answer:0},
      {text:"Let’s ____ to the park.", options:["go","goes","going"], answer:0},
      {text:"Let’s ____ a photo.", options:["take","takes","taking"], answer:0},
      {text:"Let’s ____ pizza.", options:["eat","eats","eating"], answer:0},
      {text:"Let’s ____ music.", options:["listen to","listens to","listening"], answer:0},
      {text:"Let’s ____ homework.", options:["do","does","doing"], answer:0},
      {text:"Let’s ____ English.", options:["study","studies","studying"], answer:0},
      {text:"Let’s ____ outside.", options:["play","plays","playing"], answer:0},
      {text:"Let’s ____ early.", options:["start","starts","starting"], answer:0},
      {text:"Let’s ____ a cake.", options:["make","makes","making"], answer:0},
    ])),
    exIN("ex5","Exercise 5 (mix)", take10([
      {text:"You feel sick → You ____ see a doctor.", answer:"should"},
      {text:"It’s very hot → You ____ drink water.", answer:"should"},
      {text:"It’s dangerous → You ____ touch it.", answer:"shouldn't"},
      {text:"When I was 4, I ____ write.", answer:"couldn't"},
      {text:"At 8, she ____ read.", answer:"could"},
      {text:"It’s late → You ____ go to bed.", answer:"should"},
      {text:"It’s noisy → You ____ shout.", answer:"shouldn't"},
      {text:"When he was 5, he ____ swim.", answer:"couldn't"},
      {text:"Let’s ____ a game.", answer:"play"},
      {text:"Let’s ____ to the park.", answer:"go"},
    ])),
  ];
}

// ---------- Unit 15 ----------
function unit15Exercises(){
  return [
    exMC("ex1","Exercise 1 (have/has)", take10([
      {text:"I ____ visited London.", options:["have","has","did"], answer:0},
      {text:"She ____ eaten sushi.", options:["has","have","did"], answer:0},
      {text:"They ____ finished.", options:["have","has","did"], answer:0},
      {text:"He ____ seen this film.", options:["has","have","did"], answer:0},
      {text:"We ____ cleaned the room.", options:["have","has","did"], answer:0},
      {text:"My mum ____ cooked dinner.", options:["has","have","did"], answer:0},
      {text:"I ____ done my homework.", options:["have","has","did"], answer:0},
      {text:"Tom ____ gone home.", options:["has","have","did"], answer:0},
      {text:"They ____ bought a book.", options:["have","has","did"], answer:0},
      {text:"She ____ written a message.", options:["has","have","did"], answer:0},
    ])),
    exMC("ex2","Exercise 2 (ever/never)", take10([
      {text:"Have you ____ ridden a horse?", options:["ever","never","yet"], answer:0},
      {text:"I have ____ tried that food.", options:["never","ever","yet"], answer:0},
      {text:"She has ____ been to Almaty.", options:["never","ever","yet"], answer:1},
      {text:"Have they ____ met a famous person?", options:["ever","never","already"], answer:0},
      {text:"He has ____ lost his keys.", options:["never","ever","yet"], answer:1},
      {text:"Have you ____ seen snow?", options:["ever","never","yet"], answer:0},
      {text:"I have ____ been to China.", options:["never","ever","yet"], answer:1},
      {text:"She has ____ eaten sushi.", options:["never","ever","yet"], answer:1},
      {text:"Have they ____ played chess?", options:["ever","never","yet"], answer:0},
      {text:"He has ____ broken a phone.", options:["never","ever","yet"], answer:1},
    ])),
    exMC("ex3","Exercise 3 (just/already/yet)", take10([
      {text:"I’ve ____ finished my homework. (just)", options:["just","yet","never"], answer:0},
      {text:"Have you done it ____? (yet)", options:["yet","already","just"], answer:0},
      {text:"She has ____ eaten. (already)", options:["already","yet","never"], answer:0},
      {text:"They haven’t arrived ____. (yet)", options:["yet","already","just"], answer:0},
      {text:"We’ve ____ started. (just)", options:["just","already","yet"], answer:0},
      {text:"I’ve ____ cleaned my room. (already)", options:["already","yet","just"], answer:0},
      {text:"Have they finished ____? (yet)", options:["yet","already","just"], answer:0},
      {text:"She has ____ left. (just)", options:["just","already","yet"], answer:0},
      {text:"I haven’t eaten ____. (yet)", options:["yet","already","just"], answer:0},
      {text:"We’ve ____ done it. (already)", options:["already","yet","just"], answer:0},
    ])),
    exIN("ex4","Exercise 4 (V3)", take10([
      {text:"go → ____ (V3)", answer:"gone"},
      {text:"see → ____ (V3)", answer:"seen"},
      {text:"eat → ____ (V3)", answer:"eaten"},
      {text:"buy → ____ (V3)", answer:"bought"},
      {text:"do → ____ (V3)", answer:"done"},
      {text:"write → ____ (V3)", answer:"written"},
      {text:"take → ____ (V3)", answer:"taken"},
      {text:"make → ____ (V3)", answer:"made"},
      {text:"have → ____ (V3)", answer:"had"},
      {text:"read → ____ (V3)", answer:"read"},
    ])),
    exIN("ex5","Exercise 5 (object pronouns)", take10([
      {text:"I see ____ (he).", answer:"him"},
      {text:"She helps ____ (I).", answer:"me"},
      {text:"We know ____ (they).", answer:"them"},
      {text:"He calls ____ (she).", answer:"her"},
      {text:"They invite ____ (we).", answer:"us"},
      {text:"I like ____ (you).", answer:"you"},
      {text:"She sees ____ (he).", answer:"him"},
      {text:"We help ____ (she).", answer:"her"},
      {text:"He knows ____ (we).", answer:"us"},
      {text:"They see ____ (I).", answer:"me"},
    ])),
  ];
}

// =====================================================
// TEST ITEMS (10 each) — used by app.js tests view
// =====================================================
function testPS(){ return take10([
  {text:"He ____ to school.", options:["go","goes","going"], answer:1},
  {text:"They ____ English.", options:["study","studies","studying"], answer:0},
  {text:"She ____ milk.", options:["like","likes","liking"], answer:1},
  {text:"____ you play?", options:["Do","Does","Are"], answer:0},
  {text:"____ she play?", options:["Do","Does","Are"], answer:1},
  {text:"He ____ like fish.", options:["don't","doesn't","isn't"], answer:1},
  {text:"They ____ watch TV.", options:["don't","doesn't","aren't"], answer:0},
  {text:"My dad ____ coffee.", options:["drink","drinks","drinking"], answer:1},
  {text:"I ____ my homework.", options:["do","does","doing"], answer:0},
  {text:"Cats ____ fast.", options:["run","runs","running"], answer:0},
]);}
function testPC(){ return take10([
  {text:"I ____ now.", options:["read","am reading","reads"], answer:1},
  {text:"She ____ now.", options:["is cooking","cooks","cook"], answer:0},
  {text:"They ____ now.", options:["are playing","play","plays"], answer:0},
  {text:"____ you studying now?", options:["Do","Are","Does"], answer:1},
  {text:"He ____ listening.", options:["isn't","doesn't","don't"], answer:0},
  {text:"We ____ waiting.", options:["are","do","does"], answer:0},
  {text:"____ she sleeping?", options:["Is","Does","Do"], answer:0},
  {text:"I am ____ (write).", options:["writing","write","wrote"], answer:0},
  {text:"They are ____ (run).", options:["running","run","ran"], answer:0},
  {text:"She is ____ (make).", options:["making","make","made"], answer:0},
]);}
function testMix(){ return take10([
  {text:"Every day I ____ to school.", options:["go","am going","goes"], answer:0},
  {text:"Now I ____ to school.", options:["go","am going","goes"], answer:1},
  {text:"She usually ____ tea.", options:["drinks","is drinking","drink"], answer:0},
  {text:"Look! She ____ tea.", options:["drinks","is drinking","drink"], answer:1},
  {text:"They ____ football on Fridays.", options:["play","are playing","plays"], answer:0},
  {text:"Listen! They ____ football!", options:["play","are playing","plays"], answer:1},
  {text:"He ____ the answer. (know)", options:["knows","is knowing","know"], answer:0},
  {text:"I ____ this song. (like)", options:["like","am liking","likes"], answer:0},
  {text:"We ____ dinner now.", options:["have","are having","has"], answer:1},
  {text:"I ____ English on Tuesdays.", options:["study","am studying","studies"], answer:0},
]);}
function testThere(){ return take10([
  {text:"There ____ a book.", options:["is","are","am"], answer:0},
  {text:"There ____ two chairs.", options:["is","are","be"], answer:1},
  {text:"____ there any milk?", options:["Is","Are","Do"], answer:0},
  {text:"____ there any apples?", options:["Is","Are","Does"], answer:1},
  {text:"There ____ any cheese. (neg)", options:["isn't","aren't","don't"], answer:0},
  {text:"There ____ any chairs. (neg)", options:["isn't","aren't","doesn't"], answer:1},
  {text:"I have ____ bread.", options:["some","any","a"], answer:0},
  {text:"Do you have ____ juice?", options:["some","any","an"], answer:1},
  {text:"There are ____ cookies.", options:["some","any","an"], answer:0},
  {text:"Is there ____ water?", options:["some","any","many"], answer:1},
]);}
function testCount(){ return take10([
  {text:"How ____ apples?", options:["many","much","some"], answer:0},
  {text:"How ____ water?", options:["many","much","few"], answer:1},
  {text:"I want ____ orange.", options:["a","an","some"], answer:1},
  {text:"We need ____ rice.", options:["a","an","some"], answer:2},
  {text:"I don’t have ____ money.", options:["some","any","a"], answer:1},
  {text:"There are ____ tomatoes.", options:["some","any","an"], answer:0},
  {text:"How ____ eggs?", options:["many","much","any"], answer:0},
  {text:"How ____ milk?", options:["many","much","some"], answer:1},
  {text:"She has ____ banana.", options:["a","an","some"], answer:0},
  {text:"Do we have ____ oranges?", options:["some","any","much"], answer:1},
]);}
function testCan(){ return take10([
  {text:"I ____ swim.", options:["can","can't","am"], answer:0},
  {text:"He ____ drive. He’s 10.", options:["can","can't","does"], answer:1},
  {text:"____ you ride a bike?", options:["Can","Do","Are"], answer:0},
  {text:"____ he cook?", options:["Can","Does","Is"], answer:0},
  {text:"Yes, I ____. (Can you?)", options:["can","can't","do"], answer:0},
  {text:"No, he ____. (Can he?)", options:["can't","can","doesn't"], answer:0},
  {text:"____ the door, please.", options:["Open","Opens","Opening"], answer:0},
  {text:"____ on the grass!", options:["Don't walk","Doesn't walk","Not walk"], answer:0},
  {text:"____ quiet!", options:["Be","Are","Is"], answer:0},
  {text:"____ your hands!", options:["Wash","Washes","Washing"], answer:0},
]);}
function testWasWere(){ return take10([
  {text:"I ____ at home yesterday.", options:["was","were","am"], answer:0},
  {text:"They ____ happy.", options:["was","were","is"], answer:1},
  {text:"She ____ late.", options:["was","were","are"], answer:0},
  {text:"We ____ in the park.", options:["was","were","is"], answer:1},
  {text:"He ____ tired.", options:["was","were","are"], answer:0},
  {text:"I ____ tired. (neg)", options:["wasn't","weren't","don't"], answer:0},
  {text:"They ____ here. (neg)", options:["wasn't","weren't","doesn't"], answer:1},
  {text:"____ you at home?", options:["Was","Were","Did"], answer:1},
  {text:"____ he tired?", options:["Was","Were","Did"], answer:0},
  {text:"____ they noisy?", options:["Was","Were","Did"], answer:1},
]);}
function testPastReg(){ return take10([
  {text:"I ____ my room yesterday.", options:["cleaned","clean","cleaning"], answer:0},
  {text:"She ____ to music last night.", options:["listened","listens","listening"], answer:0},
  {text:"He ____ play yesterday.", options:["didn't","doesn't","don't"], answer:0},
  {text:"____ you watch TV?", options:["Did","Do","Are"], answer:0},
  {text:"watch → ____", options:["watched","watcht","watching"], answer:0},
  {text:"study → ____", options:["studied","studyed","studys"], answer:0},
  {text:"stop → ____", options:["stopped","stoped","stopping"], answer:0},
  {text:"like → ____", options:["liked","liking","likeed"], answer:0},
  {text:"Did she ____?", options:["clean","cleaned","cleaning"], answer:0},
  {text:"They didn't ____.", options:["play","played","playing"], answer:0},
]);}
function testPastIrreg(){ return take10([
  {text:"go → ____", options:["went","goed","goes"], answer:0},
  {text:"see → ____", options:["saw","seed","sees"], answer:0},
  {text:"buy → ____", options:["bought","buyed","buys"], answer:0},
  {text:"take → ____", options:["took","taked","takes"], answer:0},
  {text:"have → ____", options:["had","haved","has"], answer:0},
  {text:"I ____ go yesterday.", options:["didn't","don't","doesn't"], answer:0},
  {text:"____ you go?", options:["Did","Do","Are"], answer:0},
  {text:"Did you ____?", options:["go","went","gone"], answer:0},
  {text:"He didn't ____.", options:["see","saw","seen"], answer:0},
  {text:"Did she ____?", options:["buy","bought","buying"], answer:0},
]);}
function testAll(){ return take10([
  {text:"She ____ to school at 8.", options:["goes","go","going"], answer:0},
  {text:"Now she ____ to school.", options:["is going","goes","go"], answer:0},
  {text:"There ____ two chairs.", options:["are","is","am"], answer:0},
  {text:"How ____ milk?", options:["much","many","any"], answer:0},
  {text:"He ____ swim. (ability)", options:["can","can't","does"], answer:0},
  {text:"I ____ at home yesterday.", options:["was","were","am"], answer:0},
  {text:"go → ____ (V2)", options:["went","gone","goes"], answer:0},
  {text:"I didn't ____ yesterday.", options:["play","played","playing"], answer:0},
  {text:"Tom is ____ than Max.", options:["taller","tallest","more tall"], answer:0},
  {text:"Have you ____ been there?", options:["ever","never","yet"], answer:0},
]);}
