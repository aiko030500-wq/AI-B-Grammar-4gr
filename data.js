window.APP_DATA = {
  groups: [
    {
      id: "u1-3",
      title: "Units 1-3",
      rules: [
        {
          title: "Present Simple",
          formula: [
            "I/You/We/They + V1",
            "He/She/It + V1 + s/es",
            "Neg: don't / doesn't + V1",
            "Q: Do/Does + subject + V1 ?"
          ],
          ru: "Привычки, факты, расписание. Маркеры: always, usually, every day."
        },
        {
          title: "Present Continuous",
          formula: [
            "am/is/are + V-ing",
            "Neg: am not / isn't / aren't + V-ing",
            "Q: Am/Is/Are + subject + V-ing ?"
          ],
          ru: "Действие сейчас/в момент речи. Маркеры: now, at the moment."
        }
      ],
      exercises: [
        {
          id:"ex1",
          title:"Exercise 1",
          type:"mc",
          items:[
            {text:"I ____ salad for lunch today.", options:["have","am having","has"], answer:1},
            {text:"Mum ____ the shopping every Saturday.", options:["does","is doing","do"], answer:0},
            {text:"What ____ right now?", options:["you do","are you doing","do you"], answer:1},
            {text:"Sam ____ mushrooms very much.", options:["doesn't like","isn't liking","don't like"], answer:0},
            {text:"It's warm but the sun ____ .", options:["doesn't shine","isn't shining","don't shine"], answer:1}
          ]
        },
        { id:"ex2", title:"Exercise 2", type:"input", items:[
          {text:"Usually I (go) ____ to school by bus.", answer:"go"},
          {text:"Right now she (read) ____ .", answer:"is reading"},
          {text:"He (not like) ____ milk.", answer:"doesn't like"},
          {text:"We (play) ____ now.", answer:"are playing"},
          {text:"They (watch) ____ TV every evening.", answer:"watch"}
        ]},
        { id:"ex3", title:"Exercise 3", type:"mc", items:[
          {text:"We ____ a great time at the party.", options:["have","had","has"], answer:1},
          {text:"Phil and Matt ____ football all afternoon.", options:["play","played","are playing"], answer:1},
          {text:"Dad ____ the car outside the cinema.", options:["stopped","stop","is stopping"], answer:0},
          {text:"Chloe ____ very happy this morning.", options:["wasn't","isn't","weren't"], answer:0},
          {text:"The people ____ their hands.", options:["clap","clapped","are clapping"], answer:1}
        ]},
        { id:"ex4", title:"Exercise 4", type:"mc", items:[
          {text:"I started at this school two years ____.", options:["ago","last","week"], answer:0},
          {text:"Cathy didn't watch TV ____ evening.", options:["yesterday","tomorrow","soon"], answer:0},
          {text:"My aunt phoned ____ night.", options:["last","next","ago"], answer:0},
          {text:"They weren't late yesterday ____.", options:["morning","week","month"], answer:0},
          {text:"We moved house last ____.", options:["week","ago","morning"], answer:0}
        ]},
        { id:"ex5", title:"Exercise 5", type:"input", items:[
          {text:"We (see) ____ lots of interesting things.", answer:"saw"},
          {text:"The children (not eat) ____ any jelly.", answer:"didn't eat"},
          {text:"My cousins (go) ____ to New York.", answer:"went"},
          {text:"I (not think) ____ the exam was easy.", answer:"didn't think"},
          {text:"Milly (buy) ____ souvenirs.", answer:"bought"}
        ]}
      ],
      tests: [
        { id:"t1", title:"Test 1: Present simple & continuous", itemsCount:15 },
        { id:"t2", title:"Test 2: Past simple", itemsCount:15 },
        { id:"t3", title:"Test 3: Possessive pronouns", itemsCount:12 },
        { id:"t4", title:"Test 4: Will/won't & future", itemsCount:12 }
      ]
    }
  ],

  auth: {
    studentPin: "2844",
    teacherPin: "3244",
    logins: Array.from({length:15}, (_,i)=>`4GL${i+1}`)
  },

  aiBayan: {
    welcome: "Сәлем! I’m AI Bayan 😊 Ask me ONE grammar question per day.",
    quick: [
      "Explain Present Simple (RU)",
      "Explain Present Continuous (RU)",
      "Give 5 examples",
      "Make 5 questions",
      "Check my sentence"
    ]
  }
};
