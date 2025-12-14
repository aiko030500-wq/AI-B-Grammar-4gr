window.APP_DATA = {
  auth: {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({ length: 15 }, (_, i) => `4GL${i + 1}`)
  },

groups: [

  // ---------- UNIT 1 ----------
  makeUnit("u1","Unit 1","#2fbf71",[
    rule("Present Simple: routines & facts",[
      "I/You/We/They + V1",
      "He/She/It + V1 + s/es"
    ],"Привычки, факты, расписание. В 3 лице ед.ч. добавляем -s/-es."),
    rule("Negatives & Questions",[
      "don’t/doesn’t + V1",
      "Do/Does + S + V1?"
    ],"В вопросе/отрицании окончания -s нет: does + V1, doesn’t + V1.")
  ],[
    exMC("ex1","Exercise 1 (choose)",[
      {text:"She ____ to school at 8:00.", options:["go","goes","going"], answer:1},
      {text:"They ____ football on Fridays.", options:["play","plays","playing"], answer:0},
      {text:"My dad ____ coffee every morning.", options:["drink","drinks","drinking"], answer:1},
      {text:"I ____ my homework after dinner.", options:["do","does","doing"], answer:0},
      {text:"Tom ____ TV a lot.", options:["watch","watches","watching"], answer:1},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"He (study) ____ English every day.", answer:"studies"},
      {text:"I (not like) ____ onions.", answer:"don't like"},
      {text:"Mia (watch) ____ cartoons on Sunday.", answer:"watches"},
      {text:"They (not play) ____ on Mondays.", answer:"don't play"},
      {text:"Sam (go) ____ to bed at 10.", answer:"goes"},
    ]),
    exMC("ex3","Exercise 3 (questions)",[
      {text:"____ you play chess?", options:["Do","Does","Are"], answer:0},
      {text:"____ she live near here?", options:["Do","Does","Is"], answer:1},
      {text:"____ they speak English?", options:["Do","Does","Are"], answer:0},
      {text:"____ he like apples?", options:["Do","Does","Is"], answer:1},
      {text:"____ we need a pen?", options:["Do","Does","Are"], answer:0},
    ]),
    exIN("ex4","Exercise 4 (negatives)",[
      {text:"He likes milk. → He ____ like milk.", answer:"doesn't"},
      {text:"They play tennis. → They ____ play tennis.", answer:"don't"},
      {text:"She reads books. → She ____ read books.", answer:"doesn't"},
      {text:"I get up early. → I ____ get up early.", answer:"don't"},
      {text:"Tom watches TV. → Tom ____ watch TV.", answer:"doesn't"},
    ]),
    exMC("ex5","Exercise 5 (frequency)",[
      {text:"I ____ get up at 7. (usually)", options:["usually","am usually","usually am"], answer:0},
      {text:"She is ____ late. (never)", options:["never","nevers","never is"], answer:0},
      {text:"We ____ play outside. (often)", options:["often","are often","often are"], answer:0},
      {text:"He ____ does his homework. (always)", options:["always","is always","always is"], answer:0},
      {text:"They are ____ happy. (sometimes)", options:["sometimes","sometime","some time"], answer:0},
    ]),
  ]),

  // ---------- UNIT 2 ----------
  makeUnit("u2","Unit 2","#1aa6b7",[
    rule("Present Continuous",["am/is/are + V-ing"],"Действие сейчас: now, at the moment."),
    rule("Questions & negatives",["Am/Is/Are + S + V-ing?","am not/isn't/aren't + V-ing"],"Вопрос перестановкой, отрицание через not.")
  ],[
    exMC("ex1","Exercise 1 (choose)",[
      {text:"I ____ a sandwich now.", options:["eat","am eating","eats"], answer:1},
      {text:"She ____ her bike at the moment.", options:["ride","is riding","rides"], answer:1},
      {text:"They ____ TV now.", options:["watch","are watching","watches"], answer:1},
      {text:"He ____ a song now.", options:["sings","is singing","sing"], answer:1},
      {text:"We ____ in the park now.", options:["run","are running","runs"], answer:1},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"She (play) ____ tennis now.", answer:"is playing"},
      {text:"They (not swim) ____ now.", answer:"aren't swimming"},
      {text:"I (read) ____ a book now.", answer:"am reading"},
      {text:"He (not listen) ____ to music now.", answer:"isn't listening"},
      {text:"We (write) ____ an email now.", answer:"are writing"},
    ]),
    exMC("ex3","Exercise 3 (questions)",[
      {text:"____ you studying now?", options:["Do","Are","Does"], answer:1},
      {text:"____ she cooking now?", options:["Is","Does","Do"], answer:0},
      {text:"____ they playing?", options:["Are","Do","Is"], answer:0},
      {text:"____ he sleeping?", options:["Is","Are","Do"], answer:0},
      {text:"____ we waiting?", options:["Are","Do","Does"], answer:0},
    ]),
    exMC("ex4","Exercise 4 (PS vs PC)",[
      {text:"Every day I ____ to school, but today I ____ by car.", options:["go / am going","am going / go","go / goes"], answer:0},
      {text:"She usually ____ tea, but now she ____ juice.", options:["drinks / is drinking","is drinking / drinks","drink / drinking"], answer:0},
      {text:"They ____ football on Fridays. Look! They ____ now!", options:["play / are playing","are playing / play","plays / play"], answer:0},
      {text:"He ____ his homework every evening. Now he ____ it.", options:["does / is doing","is doing / does","do / does"], answer:0},
      {text:"I ____ English. Today I ____ for a test.", options:["study / am studying","am studying / study","studies / am studying"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (spelling -ing)",[
      {text:"make → ____", answer:"making"},
      {text:"run → ____", answer:"running"},
      {text:"swim → ____", answer:"swimming"},
      {text:"write → ____", answer:"writing"},
      {text:"sit → ____", answer:"sitting"},
    ]),
  ]),

  // ---------- UNIT 3 ----------
  makeUnit("u3","Unit 3","#2f6fed",[
    rule("Present Simple vs Present Continuous",["PS: usually/always/every day","PC: now/at the moment/today"],"PS — привычка, PC — сейчас."),
    rule("Stative verbs",["like, love, know, want, need"],"Обычно не ставим в Continuous.")
  ],[
    exMC("ex1","Exercise 1 (choose PS/PC)",[
      {text:"Listen! The baby ____.", options:["cries","is crying","cry"], answer:1},
      {text:"My brother ____ video games every day.", options:["plays","is playing","play"], answer:0},
      {text:"We ____ dinner now.", options:["have","are having","has"], answer:1},
      {text:"She ____ her keys. (not have)", options:["doesn't have","isn't having","don't have"], answer:0},
      {text:"I ____ English on Tuesdays.", options:["study","am studying","studies"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"He (usually / go) ____ to bed at 10.", answer:"usually goes"},
      {text:"I (now / write) ____ a message.", answer:"am now writing"},
      {text:"They (never / be) ____ late.", answer:"are never"},
      {text:"She (today / wear) ____ a blue dress.", answer:"is today wearing"},
      {text:"We (often / play) ____ outside.", answer:"often play"},
    ]),
    exMC("ex3","Exercise 3 (stative)",[
      {text:"I ____ this song. (like)", options:["like","am liking","likes"], answer:0},
      {text:"She ____ the answer. (know)", options:["knows","is knowing","know"], answer:0},
      {text:"We ____ new shoes. (want)", options:["want","are wanting","wants"], answer:0},
      {text:"He ____ a new phone. (need)", options:["needs","is needing","need"], answer:0},
      {text:"They ____ this game. (love)", options:["love","are loving","loves"], answer:0},
    ]),
    exMC("ex4","Exercise 4 (short answers)",[
      {text:"Do you play tennis? — Yes, I ____.", options:["do","am","does"], answer:0},
      {text:"Does she like pizza? — No, she ____.", options:["doesn't","isn't","don't"], answer:0},
      {text:"Are they studying now? — Yes, they ____.", options:["are","do","does"], answer:0},
      {text:"Is he sleeping? — No, he ____.", options:["isn't","doesn't","don't"], answer:0},
      {text:"Do we need pencils? — No, we ____.", options:["don't","aren't","doesn't"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (fix the sentence)",[
      {text:"She don't like milk. → She ____ like milk.", answer:"doesn't"},
      {text:"He is play football now. → He ____ playing football now.", answer:"is"},
      {text:"They goes to school. → They ____ to school.", answer:"go"},
      {text:"I am know the answer. → I ____ the answer.", answer:"know"},
      {text:"Does she goes? → Does she ____?", answer:"go"},
    ]),
  ]),

  // ---------- UNIT 4 ----------
  makeUnit("u4","Unit 4","#9b59ff",[
    rule("There is / There are",["There is + singular","There are + plural"],"Говорим что где-то есть."),
    rule("Some / Any",["some: affirmative","any: questions/negatives"],"Some — утверд., any — вопросы/отриц.")
  ],[
    exMC("ex1","Exercise 1 (choose)",[
      {text:"There ____ a book on the table.", options:["is","are","am"], answer:0},
      {text:"There ____ two chairs.", options:["is","are","be"], answer:1},
      {text:"There ____ an apple in the bag.", options:["is","are","have"], answer:0},
      {text:"There ____ three windows.", options:["is","are","has"], answer:1},
      {text:"There ____ a lamp in my room.", options:["is","are","were"], answer:0},
    ]),
    exMC("ex2","Exercise 2 (questions)",[
      {text:"____ there any milk?", options:["Is","Are","Do"], answer:0},
      {text:"____ there two bathrooms?", options:["Is","Are","Does"], answer:1},
      {text:"____ there a park near here?", options:["Is","Are","Do"], answer:0},
      {text:"____ there any apples?", options:["Is","Are","Does"], answer:1},
      {text:"____ there a fridge in the kitchen?", options:["Is","Are","Do"], answer:0},
    ]),
    exIN("ex3","Exercise 3 (negatives)",[
      {text:"There is a cat. → There ____ a cat.", answer:"isn't"},
      {text:"There are books. → There ____ books.", answer:"aren't"},
      {text:"There is a TV. → There ____ a TV.", answer:"isn't"},
      {text:"There are chairs. → There ____ chairs.", answer:"aren't"},
      {text:"There is a computer. → There ____ a computer.", answer:"isn't"},
    ]),
    exMC("ex4","Exercise 4 (some/any)",[
      {text:"I have ____ bread.", options:["some","any","a"], answer:0},
      {text:"Do you have ____ juice?", options:["some","any","an"], answer:1},
      {text:"We don’t have ____ bananas.", options:["some","any","many"], answer:1},
      {text:"There are ____ cookies on the plate.", options:["some","any","an"], answer:0},
      {text:"Is there ____ cheese?", options:["some","any","a"], answer:1},
    ]),
    exIN("ex5","Exercise 5 (write there is/are)",[
      {text:"____ a pencil in my bag. (singular)", answer:"There is"},
      {text:"____ two posters on the wall. (plural)", answer:"There are"},
      {text:"____ an orange on the table.", answer:"There is"},
      {text:"____ three books on the desk.", answer:"There are"},
      {text:"____ a shop near my house.", answer:"There is"},
    ]),
  ]),

  // ---------- UNIT 5 ----------
  makeUnit("u5","Unit 5","#ff5aa5",[
    rule("Countable / Uncountable",["countable: apples","uncountable: water"],"Исчисляемые/неисчисляемые."),
    rule("How much / How many",["How many + plural?","How much + uncountable?"],"How many — можно посчитать, How much — нельзя.")
  ],[
    exMC("ex1","Exercise 1 (much/many)",[
      {text:"How ____ apples are there?", options:["many","much","some"], answer:0},
      {text:"How ____ water do you drink?", options:["many","much","few"], answer:1},
      {text:"How ____ sandwiches do we need?", options:["many","much","a"], answer:0},
      {text:"How ____ milk is in the fridge?", options:["many","much","an"], answer:1},
      {text:"How ____ eggs are in the box?", options:["many","much","any"], answer:0},
    ]),
    exMC("ex2","Exercise 2 (a/an/some)",[
      {text:"I want ____ orange.", options:["a","an","some"], answer:1},
      {text:"She has ____ banana.", options:["a","an","some"], answer:0},
      {text:"We need ____ rice.", options:["a","an","some"], answer:2},
      {text:"He buys ____ apples.", options:["a","an","some"], answer:2},
      {text:"I see ____ egg.", options:["a","an","some"], answer:1},
    ]),
    exIN("ex3","Exercise 3 (countable/uncountable)",[
      {text:"bread is ____ (countable/uncountable)", answer:"uncountable"},
      {text:"apple is ____ (countable/uncountable)", answer:"countable"},
      {text:"milk is ____", answer:"uncountable"},
      {text:"cookie is ____", answer:"countable"},
      {text:"water is ____", answer:"uncountable"},
    ]),
    exMC("ex4","Exercise 4 (some/any)",[
      {text:"We have ____ juice.", options:["some","any","many"], answer:0},
      {text:"Do we have ____ oranges?", options:["some","any","much"], answer:1},
      {text:"I don’t have ____ money.", options:["some","any","a"], answer:1},
      {text:"There are ____ tomatoes.", options:["some","any","an"], answer:0},
      {text:"Is there ____ bread?", options:["some","any","many"], answer:1},
    ]),
    exIN("ex5","Exercise 5 (write questions)",[
      {text:"____ ____ apples do you eat? (many)", answer:"How many"},
      {text:"____ ____ water do you need? (much)", answer:"How much"},
      {text:"____ ____ sandwiches are there? (many)", answer:"How many"},
      {text:"____ ____ milk is there? (much)", answer:"How much"},
      {text:"____ ____ eggs do we need? (many)", answer:"How many"},
    ]),
  ]),

  // ---------- UNIT 6 ----------
  makeUnit("u6","Unit 6","#ff8a3d",[
    rule("Can / Can’t",["can + V1","can’t + V1"],"Умение/разрешение."),
    rule("Imperatives",["V1!","Don’t + V1!"],"Команды и запреты.")
  ],[
    exMC("ex1","Exercise 1 (can/can’t)",[
      {text:"I ____ swim.", options:["can","can't","am"], answer:0},
      {text:"He ____ drive. He’s 10.", options:["can","can't","does"], answer:1},
      {text:"We ____ speak English.", options:["can","can't","are"], answer:0},
      {text:"She ____ play the piano.", options:["can","can't","is"], answer:0},
      {text:"They ____ come today.", options:["can","can't","do"], answer:0},
    ]),
    exMC("ex2","Exercise 2 (questions)",[
      {text:"____ you ride a bike?", options:["Can","Do","Are"], answer:0},
      {text:"____ he cook?", options:["Can","Does","Is"], answer:0},
      {text:"____ they dance?", options:["Can","Do","Are"], answer:0},
      {text:"____ she sing?", options:["Can","Does","Is"], answer:0},
      {text:"____ we use this room?", options:["Can","Do","Are"], answer:0},
    ]),
    exIN("ex3","Exercise 3 (short answers)",[
      {text:"Can you play chess? — Yes, I ____.", answer:"can"},
      {text:"Can he run fast? — No, he ____.", answer:"can't"},
      {text:"Can they swim? — Yes, they ____.", answer:"can"},
      {text:"Can she drive? — No, she ____.", answer:"can't"},
      {text:"Can we start? — Yes, we ____.", answer:"can"},
    ]),
    exMC("ex4","Exercise 4 (imperatives)",[
      {text:"____ the door, please.", options:["Open","Opens","Opening"], answer:0},
      {text:"____ on the grass!", options:["Don't walk","Doesn't walk","Not walk"], answer:0},
      {text:"____ quiet!", options:["Be","Are","Is"], answer:0},
      {text:"____ your hands!", options:["Wash","Washes","Washing"], answer:0},
      {text:"____ late.", options:["Don't be","Doesn't be","Not be"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (make negative)",[
      {text:"You can jump. → You ____ jump.", answer:"can't"},
      {text:"He can sing. → He ____ sing.", answer:"can't"},
      {text:"They can come. → They ____ come.", answer:"can't"},
      {text:"She can dance. → She ____ dance.", answer:"can't"},
      {text:"We can go. → We ____ go.", answer:"can't"},
    ]),
  ]),

  // ---------- UNIT 7 ----------
  makeUnit("u7","Unit 7","#ffd166",[
    rule("Past Simple: be",["was / were","wasn’t / weren’t","Was/Were + S …?"],"Прошедшее be."),
  ],[
    exMC("ex1","Exercise 1 (was/were)",[
      {text:"I ____ at home yesterday.", options:["was","were","am"], answer:0},
      {text:"They ____ happy.", options:["was","were","is"], answer:1},
      {text:"She ____ late.", options:["was","were","are"], answer:0},
      {text:"We ____ in the park.", options:["was","were","is"], answer:1},
      {text:"He ____ tired.", options:["was","were","are"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (negatives)",[
      {text:"I was tired. → I ____ tired.", answer:"wasn't"},
      {text:"They were here. → They ____ here.", answer:"weren't"},
      {text:"She was angry. → She ____ angry.", answer:"wasn't"},
      {text:"We were late. → We ____ late.", answer:"weren't"},
      {text:"He was at school. → He ____ at school.", answer:"wasn't"},
    ]),
    exMC("ex3","Exercise 3 (questions)",[
      {text:"____ you at home?", options:["Was","Were","Did"], answer:1},
      {text:"____ he tired?", options:["Was","Were","Did"], answer:0},
      {text:"____ they noisy?", options:["Was","Were","Did"], answer:1},
      {text:"____ she happy?", options:["Was","Were","Did"], answer:0},
      {text:"____ we early?", options:["Was","Were","Did"], answer:1},
    ]),
    exIN("ex4","Exercise 4 (short answers)",[
      {text:"Was he late? — No, he ____.", answer:"wasn't"},
      {text:"Were they here? — Yes, they ____.", answer:"were"},
      {text:"Was she ill? — Yes, she ____.", answer:"was"},
      {text:"Were we ready? — No, we ____.", answer:"weren't"},
      {text:"Was I wrong? — No, you ____.", answer:"weren't"},
    ]),
    exMC("ex5","Exercise 5 (time words)",[
      {text:"Past time word:", options:["yesterday","now","tomorrow"], answer:0},
      {text:"Past time word:", options:["last week","today","at the moment"], answer:0},
      {text:"Past time word:", options:["two days ago","next week","soon"], answer:0},
      {text:"Past time word:", options:["last night","right now","usually"], answer:0},
      {text:"Past time word:", options:["yesterday morning","every day","now"], answer:0},
    ]),
  ]),

  // ---------- UNIT 8 ----------
  makeUnit("u8","Unit 8","#06d6a0",[
    rule("Past Simple: regular verbs",["V + ed","didn’t + V1","Did + S + V1?"],"Правильные глаголы в прошедшем."),
  ],[
    exMC("ex1","Exercise 1 (choose)",[
      {text:"I ____ my room yesterday.", options:["cleaned","clean","cleaning"], answer:0},
      {text:"She ____ to music last night.", options:["listened","listens","listening"], answer:0},
      {text:"We ____ the game.", options:["played","play","plays"], answer:0},
      {text:"They ____ a cake.", options:["cooked","cook","cooks"], answer:0},
      {text:"He ____ his bike.", options:["fixed","fix","fixes"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (write -ed)",[
      {text:"watch → ____", answer:"watched"},
      {text:"dance → ____", answer:"danced"},
      {text:"study → ____", answer:"studied"},
      {text:"stop → ____", answer:"stopped"},
      {text:"like → ____", answer:"liked"},
    ]),
    exMC("ex3","Exercise 3 (did/didn’t)",[
      {text:"He ____ play yesterday.", options:["didn't","doesn't","don't"], answer:0},
      {text:"____ you watch TV?", options:["Did","Do","Are"], answer:0},
      {text:"They ____ visit grandma.", options:["didn't","don't","doesn't"], answer:0},
      {text:"____ she clean her room?", options:["Did","Does","Is"], answer:0},
      {text:"We ____ cook dinner.", options:["didn't","don't","doesn't"], answer:0},
    ]),
    exIN("ex4","Exercise 4 (make questions)",[
      {text:"you / play / yesterday → ____?", answer:"Did you play yesterday"},
      {text:"she / visit / aunt → ____?", answer:"Did she visit aunt"},
      {text:"they / watch / film → ____?", answer:"Did they watch film"},
      {text:"he / clean / room → ____?", answer:"Did he clean room"},
      {text:"we / walk / home → ____?", answer:"Did we walk home"},
    ]),
    exMC("ex5","Exercise 5 (choose V1/V2)",[
      {text:"Did you ____ (go/went)?", options:["go","went","goed"], answer:0},
      {text:"He didn't ____ (play/played).", options:["play","played","plaied"], answer:0},
      {text:"Did she ____ (watch/watched)?", options:["watch","watched","watcht"], answer:0},
      {text:"They didn't ____ (clean/cleaned).", options:["clean","cleaned","cleant"], answer:0},
      {text:"Did we ____ (start/started)?", options:["start","started","startt"], answer:0},
    ]),
  ]),

  // ---------- UNIT 9 ----------
  makeUnit("u9","Unit 9","#118ab2",[
    rule("Past Simple: irregular verbs",["V2 (2 форма)","didn’t + V1","Did + S + V1?"],"Неправильные глаголы: went, saw, bought…"),
  ],[
    exMC("ex1","Exercise 1 (choose V2)",[
      {text:"go → ____", options:["went","goed","goes"], answer:0},
      {text:"see → ____", options:["saw","seed","sees"], answer:0},
      {text:"buy → ____", options:["bought","buyed","buys"], answer:0},
      {text:"take → ____", options:["took","taked","takes"], answer:0},
      {text:"have → ____", options:["had","haved","has"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"Yesterday I (go) ____ to the cinema.", answer:"went"},
      {text:"We (see) ____ a great show.", answer:"saw"},
      {text:"She (buy) ____ a souvenir.", answer:"bought"},
      {text:"He (take) ____ a photo.", answer:"took"},
      {text:"They (have) ____ pizza.", answer:"had"},
    ]),
    exMC("ex3","Exercise 3 (didn’t)",[
      {text:"I ____ go yesterday.", options:["didn't","don't","doesn't"], answer:0},
      {text:"She ____ buy anything.", options:["didn't","doesn't","don't"], answer:0},
      {text:"We ____ see Tom.", options:["didn't","don't","doesn't"], answer:0},
      {text:"They ____ have time.", options:["didn't","don't","doesn't"], answer:0},
      {text:"He ____ take my pen.", options:["didn't","doesn't","don't"], answer:0},
    ]),
    exMC("ex4","Exercise 4 (Did…?)",[
      {text:"____ you go to the park?", options:["Did","Do","Are"], answer:0},
      {text:"____ she see the film?", options:["Did","Does","Is"], answer:0},
      {text:"____ they buy bread?", options:["Did","Do","Are"], answer:0},
      {text:"____ he take a bus?", options:["Did","Does","Is"], answer:0},
      {text:"____ we have lunch?", options:["Did","Do","Are"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (V1 after did)",[
      {text:"Did you ____ (went/go)?", answer:"go"},
      {text:"He didn't ____ (saw/see).", answer:"see"},
      {text:"Did she ____ (bought/buy)?", answer:"buy"},
      {text:"They didn't ____ (took/take).", answer:"take"},
      {text:"Did we ____ (had/have)?", answer:"have"},
    ]),
  ]),

  // ---------- UNIT 10 ----------
  makeUnit("u10","Unit 10","#073b4c",[
    rule("Adverbs of frequency",["always/usually/often/sometimes/never"],"Показывают частоту."),
    rule("Word order",["S + adv + V1","be + adv"],"Перед V1, но после am/is/are.")
  ],[
    exMC("ex1","Exercise 1 (choose)",[
      {text:"I ____ get up early. (always)", options:["always","am always","always am"], answer:0},
      {text:"She is ____ friendly. (usually)", options:["usually","usual","use"], answer:0},
      {text:"We ____ play outside. (often)", options:["often","are often","often are"], answer:0},
      {text:"He ____ late. (never)", options:["is never","never is","never"], answer:0},
      {text:"They ____ help at home. (sometimes)", options:["sometimes","sometime","some times"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (put the adverb)",[
      {text:"I play chess. (often) → I ____ play chess.", answer:"often"},
      {text:"She is tired. (sometimes) → She is ____ tired.", answer:"sometimes"},
      {text:"We eat vegetables. (always) → We ____ eat vegetables.", answer:"always"},
      {text:"He is late. (never) → He is ____ late.", answer:"never"},
      {text:"They do homework. (usually) → They ____ do homework.", answer:"usually"},
    ]),
    exMC("ex3","Exercise 3 (How often)",[
      {text:"____ do you read books?", options:["How often","How many","How much"], answer:0},
      {text:"____ do they play football?", options:["How often","How much","How old"], answer:0},
      {text:"____ does she go swimming?", options:["How often","How many","How far"], answer:0},
      {text:"____ do we eat pizza?", options:["How often","How much","How many"], answer:0},
      {text:"____ does he watch TV?", options:["How often","How many","How much"], answer:0},
    ]),
    exIN("ex4","Exercise 4 (answer)",[
      {text:"How often do you study? → I study ____ (every day).", answer:"every day"},
      {text:"How often is she late? → She is ____ (never).", answer:"never"},
      {text:"How often do they help? → They help ____ (sometimes).", answer:"sometimes"},
      {text:"How often do we play? → We play ____ (often).", answer:"often"},
      {text:"How often does he read? → He reads ____ (usually).", answer:"usually"},
    ]),
    exMC("ex5","Exercise 5 (correct order)",[
      {text:"He always is late.", options:["Correct","Wrong"], answer:1},
      {text:"He is always late.", options:["Correct","Wrong"], answer:0},
      {text:"I often play football.", options:["Correct","Wrong"], answer:0},
      {text:"I play often football.", options:["Correct","Wrong"], answer:1},
      {text:"They are sometimes noisy.", options:["Correct","Wrong"], answer:0},
    ]),
  ]),

  // ---------- UNIT 11 ----------
  makeUnit("u11","Unit 11","#845ec2",[
    rule("Comparatives",["adj-er / more + adj","than"],"Сравниваем 2 предмета."),
  ],[
    exMC("ex1","Exercise 1 (choose)",[
      {text:"Tom is ____ than Max. (tall)", options:["taller","tallest","more tall"], answer:0},
      {text:"This book is ____ than that one. (interesting)", options:["more interesting","interestinger","most interesting"], answer:0},
      {text:"My bag is ____ than yours. (heavy)", options:["heavier","heaviest","more heavy"], answer:0},
      {text:"This task is ____ than yesterday’s. (easy)", options:["easier","easiest","more easy"], answer:0},
      {text:"A car is ____ than a bike. (fast)", options:["faster","fastest","more fast"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"big → ____", answer:"bigger"},
      {text:"nice → ____", answer:"nicer"},
      {text:"happy → ____", answer:"happier"},
      {text:"hot → ____", answer:"hotter"},
      {text:"busy → ____", answer:"busier"},
    ]),
    exMC("ex3","Exercise 3 (than)",[
      {text:"My sister is older ____ me.", options:["than","that","then"], answer:0},
      {text:"This test is easier ____ the last one.", options:["than","then","that"], answer:0},
      {text:"A lion is bigger ____ a cat.", options:["than","then","that"], answer:0},
      {text:"Winter is colder ____ autumn.", options:["than","then","that"], answer:0},
      {text:"A plane is faster ____ a train.", options:["than","then","that"], answer:0},
    ]),
    exMC("ex4","Exercise 4 (much/a bit)",[
      {text:"This is ____ better.", options:["much","many","any"], answer:0},
      {text:"She is ____ taller than me.", options:["a bit","a many","muchly"], answer:0},
      {text:"Today is ____ colder.", options:["much","any","some"], answer:0},
      {text:"This game is ____ easier.", options:["a bit","many","some"], answer:0},
      {text:"That film is ____ more interesting.", options:["much","a many","any"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (make sentences)",[
      {text:"cats / small / dogs → Cats are ____ than dogs.", answer:"smaller"},
      {text:"math / difficult / english → Math is ____ than English.", answer:"more difficult"},
      {text:"my room / clean / your room → My room is ____ than your room.", answer:"cleaner"},
      {text:"summer / hot / spring → Summer is ____ than spring.", answer:"hotter"},
      {text:"this chair / comfortable / that chair → This chair is ____ than that chair.", answer:"more comfortable"},
    ]),
  ]),

  // ---------- UNIT 12 ----------
  makeUnit("u12","Unit 12","#ff9671",[
    rule("Superlatives",["the + adj-est","the most + adj"],"Самый/самая в группе."),
  ],[
    exMC("ex1","Exercise 1 (choose)",[
      {text:"Tom is the ____ in the class. (tall)", options:["tallest","taller","most tall"], answer:0},
      {text:"This is the ____ book. (interesting)", options:["most interesting","more interesting","interestinger"], answer:0},
      {text:"She is the ____ runner. (fast)", options:["fastest","faster","most fast"], answer:0},
      {text:"That was the ____ day! (good)", options:["best","better","goodest"], answer:0},
      {text:"This puzzle is the ____ . (easy)", options:["easiest","easier","most easy"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"big → the ____", answer:"biggest"},
      {text:"happy → the ____", answer:"happiest"},
      {text:"hot → the ____", answer:"hottest"},
      {text:"nice → the ____", answer:"nicest"},
      {text:"beautiful → the ____", answer:"most beautiful"},
    ]),
    exMC("ex3","Exercise 3 (in/of)",[
      {text:"the tallest ____ the class", options:["in","of","on"], answer:0},
      {text:"the best ____ all", options:["of","in","at"], answer:0},
      {text:"the biggest ____ the city", options:["in","of","to"], answer:0},
      {text:"the smallest ____ all the toys", options:["of","in","on"], answer:0},
      {text:"the fastest ____ the team", options:["in","of","at"], answer:0},
    ]),
    exMC("ex4","Exercise 4 (irregular)",[
      {text:"good →", options:["best","goodest","better"], answer:0},
      {text:"bad →", options:["worst","badest","worse"], answer:0},
      {text:"far →", options:["farthest","farest","most far"], answer:0},
      {text:"many →", options:["most","manyest","more"], answer:0},
      {text:"little →", options:["least","littlest","less"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (make sentences)",[
      {text:"This is ____ film (funny) I know.", answer:"the funniest"},
      {text:"She is ____ student (smart) in our class.", answer:"the smartest"},
      {text:"That is ____ building (tall) in the city.", answer:"the tallest"},
      {text:"This is ____ game (exciting) today.", answer:"the most exciting"},
      {text:"It was ____ day (bad) of the week.", answer:"the worst"},
    ]),
  ]),

  // ---------- UNIT 13 ----------
  makeUnit("u13","Unit 13","#f9c74f",[
    rule("Future: going to",["am/is/are going to + V1"],"План/намерение."),
    rule("Future: will / won’t",["will + V1","won’t + V1"],"Прогноз/обещание/решение сейчас."),
  ],[
    exMC("ex1","Exercise 1 (going to)",[
      {text:"I ____ to visit my grandma.", options:["am going","going","go"], answer:0},
      {text:"She ____ to buy a new bag.", options:["is going","goes going","going is"], answer:0},
      {text:"They ____ to play football.", options:["are going","is going","am going"], answer:0},
      {text:"We ____ to watch a film.", options:["are going","going are","are go"], answer:0},
      {text:"He ____ to study tonight.", options:["is going","are going","am going"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"I (go) ____ to help my mum.", answer:"am going"},
      {text:"She (not / go) ____ to swim today.", answer:"isn't going"},
      {text:"They (go) ____ to travel next week.", answer:"are going"},
      {text:"We (not / go) ____ to play outside.", answer:"aren't going"},
      {text:"He (go) ____ to clean his room.", answer:"is going"},
    ]),
    exMC("ex3","Exercise 3 (will/won’t)",[
      {text:"I think it ____ rain tomorrow.", options:["will","won't","is"], answer:0},
      {text:"Don’t worry. I ____ help you.", options:["will","won't","am"], answer:0},
      {text:"He ____ forget your birthday.", options:["won't","will","is"], answer:0},
      {text:"I’m tired. I ____ go to bed now.", options:["will","won't","am"], answer:0},
      {text:"They ____ be late. They’re usually on time.", options:["won't","will","are"], answer:0},
    ]),
    exMC("ex4","Exercise 4 (choose)",[
      {text:"Plan: We ____ visit the museum.", options:["are going to","will","were"], answer:0},
      {text:"Prediction: I think you ____ like this.", options:["will","are going to","going"], answer:0},
      {text:"Promise: I ____ call you later.", options:["will","am going to","was"], answer:0},
      {text:"Plan: She ____ buy a gift.", options:["is going to","will","are"], answer:0},
      {text:"Prediction: It ____ snow soon.", options:["will","is going to","are"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (future time)",[
      {text:"Write a future time word: ____ (например tomorrow)", answer:"tomorrow"},
      {text:"Write a future time word: ____ (например next week)", answer:"next week"},
      {text:"Write a future time word: ____ (например this evening)", answer:"this evening"},
      {text:"Write a future time word: ____ (например next month)", answer:"next month"},
      {text:"Write a future time word: ____ (например tomorrow morning)", answer:"tomorrow morning"},
    ]),
  ]),

  // ---------- UNIT 14 ----------
  makeUnit("u14","Unit 14","#43aa8b",[
    rule("Should / shouldn’t",["should + V1","shouldn’t + V1"],"Советы."),
    rule("Could / couldn’t",["could + V1","couldn’t + V1"],"Мог/не мог (прошлое) или возможность."),
  ],[
    exMC("ex1","Exercise 1 (should)",[
      {text:"You ____ eat more fruit.", options:["should","shouldn't","could"], answer:0},
      {text:"You ____ stay up late.", options:["shouldn't","should","could"], answer:0},
      {text:"We ____ do our homework.", options:["should","shouldn't","couldn't"], answer:0},
      {text:"He ____ be rude.", options:["shouldn't","should","could"], answer:0},
      {text:"She ____ drink water.", options:["should","shouldn't","couldn't"], answer:0},
    ]),
    exIN("ex2","Exercise 2 (write)",[
      {text:"Advice: I have a cold. I ____ see a doctor.", answer:"should"},
      {text:"Advice: It’s late. You ____ go to bed.", answer:"should"},
      {text:"Advice: This is dangerous. You ____ do it.", answer:"shouldn't"},
      {text:"Advice: I’m tired. I ____ rest.", answer:"should"},
      {text:"Advice: He is angry. You ____ shout.", answer:"shouldn't"},
    ]),
    exMC("ex3","Exercise 3 (could/couldn’t past)",[
      {text:"When I was five, I ____ swim.", options:["couldn't","could","should"], answer:0},
      {text:"She ____ read at 6.", options:["could","couldn't","should"], answer:0},
      {text:"They ____ speak English last year.", options:["couldn't","could","should"], answer:0},
      {text:"He ____ ride a bike at 7.", options:["could","couldn't","shouldn't"], answer:0},
      {text:"We ____ find the place.", options:["couldn't","could","should"], answer:0},
    ]),
    exMC("ex4","Exercise 4 (suggestion)",[
      {text:"Let’s ____ a game!", options:["play","plays","playing"], answer:0},
      {text:"Let’s ____ to the park.", options:["go","goes","going"], answer:0},
      {text:"Let’s ____ a photo.", options:["take","takes","taking"], answer:0},
      {text:"Let’s ____ pizza.", options:["eat","eats","eating"], answer:0},
      {text:"Let’s ____ music.", options:["listen to","listens to","listening"], answer:0},
    ]),
    exIN("ex5","Exercise 5 (mix)",[
      {text:"You feel sick → You ____ see a doctor.", answer:"should"},
      {text:"It’s very hot → You ____ drink water.", answer:"should"},
      {text:"It’s dangerous → You ____ touch it.", answer:"shouldn't"},
      {text:"When I was 4, I ____ write.", answer:"couldn't"},
      {text:"At 8, she ____ read.", answer:"could"},
    ]),
  ]),

  // ---------- UNIT 15 ----------
  makeUnit("u15","Unit 15","#277da1",[
    rule("Present Perfect (ever/never)",["have/has + V3","Have you ever…?","I’ve never…"],"Опыт (когда-то в жизни)."),
    rule("just/already/yet",["just","already","yet"],"yet — в вопросах/отрицаниях; already/just — в утверждениях."),
  ],[
    exMC("ex1","Exercise 1 (have/has)",[
      {text:"I ____ visited London.", options:["have","has","did"], answer:0},
      {text:"She ____ eaten sushi.", options:["has","have","did"], answer:0},
      {text:"They ____ finished.", options:["have","has","did"], answer:0},
      {text:"He ____ seen this film.", options:["has","have","did"], answer:0},
      {text:"We ____ cleaned the room.", options:["have","has","did"], answer:0},
    ]),
    exMC("ex2","Exercise 2 (ever/never)",[
      {text:"Have you ____ ridden a horse?", options:["ever","never","yet"], answer:0},
      {text:"I have ____ tried that food.", options:["never","ever","yet"], answer:0},
      {text:"She has ____ been to Almaty.", options:["never","ever","yet"], answer:1},
      {text:"Have they ____ met a famous person?", options:["ever","never","already"], answer:0},
      {text:"He has ____ lost his keys.", options:["never","ever","yet"], answer:1},
    ]),
    exMC("ex3","Exercise 3 (just/already/yet)",[
      {text:"I’ve ____ finished my homework. (just)", options:["just","yet","never"], answer:0},
      {text:"Have you done it ____? (yet)", options:["yet","already","just"], answer:0},
      {text:"She has ____ eaten. (already)", options:["already","yet","never"], answer:0},
      {text:"They haven’t arrived ____. (yet)", options:["yet","already","just"], answer:0},
      {text:"We’ve ____ started. (just)", options:["just","already","yet"], answer:0},
    ]),
    exIN("ex4","Exercise 4 (V3)",[
      {text:"go → ____ (V3)", answer:"gone"},
      {text:"see → ____ (V3)", answer:"seen"},
      {text:"eat → ____ (V3)", answer:"eaten"},
      {text:"buy → ____ (V3)", answer:"bought"},
      {text:"do → ____ (V3)", answer:"done"},
    ]),
    exIN("ex5","Exercise 5 (object pronouns)",[
      {text:"I see ____ (he).", answer:"him"},
      {text:"She helps ____ (I).", answer:"me"},
      {text:"We know ____ (they).", answer:"them"},
      {text:"He calls ____ (she).", answer:"her"},
      {text:"They invite ____ (we).", answer:"us"},
    ]),
  ]),

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
