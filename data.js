/* data.js — AI BAYAN GRAMMAR 4gr */

window.APP_DATA = {
  units: [

/* ================= UNIT 1 ================= */
{
  id:"u1",
  title:"Unit 1",
  topic:"Present Simple vs Present Continuous",
  ruleEn:"Present Simple: habits, facts. Form: I/you/we/they + V1; he/she/it + V1+s.\nPresent Continuous: action now. am/is/are + V-ing.",
  ruleRu:"Present Simple: привычки, факты.\nPresent Continuous: действие сейчас.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u1e${e+1}q${i+1}`,
      prompt:`Choose the correct form (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 2 ================= */
{
  id:"u2",
  title:"Unit 2",
  topic:"Past Simple (regular verbs)",
  ruleEn:"Past Simple: finished actions. Regular verbs: V + ed.",
  ruleRu:"Past Simple: завершённые действия. Правильные глаголы: +ed.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u2e${e+1}q${i+1}`,
      prompt:`Write Past Simple (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 3 ================= */
{
  id:"u3",
  title:"Unit 3",
  topic:"Past Simple (irregular verbs)",
  ruleEn:"Irregular verbs have special past forms (V2).",
  ruleRu:"Неправильные глаголы имеют особую форму (V2).",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u3e${e+1}q${i+1}`,
      prompt:`Write irregular verb in Past (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 4 ================= */
{
  id:"u4",
  title:"Unit 4",
  topic:"Possessive pronouns",
  ruleEn:"mine, yours, his, hers, ours, theirs.",
  ruleRu:"Притяжательные местоимения.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u4e${e+1}q${i+1}`,
      prompt:`Choose possessive (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 5 ================= */
{
  id:"u5",
  title:"Unit 5",
  topic:"Have to / Must",
  ruleEn:"Have to / must = obligation.",
  ruleRu:"Have to / must = обязанность.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u5e${e+1}q${i+1}`,
      prompt:`Choose have to / must (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 6 ================= */
{
  id:"u6",
  title:"Unit 6",
  topic:"Comparatives & Superlatives",
  ruleEn:"-er / more — the -est / the most.",
  ruleRu:"Сравнительная и превосходная степень.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u6e${e+1}q${i+1}`,
      prompt:`Make comparative or superlative (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 7 ================= */
{
  id:"u7",
  title:"Unit 7",
  topic:"Will / Won’t",
  ruleEn:"Will = future decisions.",
  ruleRu:"Will — будущее время.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u7e${e+1}q${i+1}`,
      prompt:`Use will / won't (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 8 ================= */
{
  id:"u8",
  title:"Unit 8",
  topic:"Much / Many / Some / Any",
  ruleEn:"Much — uncountable, Many — countable.",
  ruleRu:"Much — неисчисляемые, Many — исчисляемые.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u8e${e+1}q${i+1}`,
      prompt:`Choose much / many (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 9 ================= */
{
  id:"u9",
  title:"Unit 9",
  topic:"Infinitive of purpose",
  ruleEn:"to + verb = purpose.",
  ruleRu:"to + глагол = цель.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u9e${e+1}q${i+1}`,
      prompt:`Use to + verb (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 10 ================= */
{
  id:"u10",
  title:"Unit 10",
  topic:"Present Perfect",
  ruleEn:"have / has + V3.",
  ruleRu:"have / has + третья форма.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u10e${e+1}q${i+1}`,
      prompt:`Use Present Perfect (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 11 ================= */
{
  id:"u11",
  title:"Unit 11",
  topic:"ever / never",
  ruleEn:"ever — questions, never — negative meaning.",
  ruleRu:"ever — в вопросах, never — никогда.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u11e${e+1}q${i+1}`,
      prompt:`Use ever / never (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 12 ================= */
{
  id:"u12",
  title:"Unit 12",
  topic:"Should / Could",
  ruleEn:"Should = advice. Could = ability.",
  ruleRu:"Should — совет. Could — умение.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u12e${e+1}q${i+1}`,
      prompt:`Choose should / could (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 13 ================= */
{
  id:"u13",
  title:"Unit 13",
  topic:"Object pronouns",
  ruleEn:"me, you, him, her, it, us, them.",
  ruleRu:"Объектные местоимения.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u13e${e+1}q${i+1}`,
      prompt:`Choose object pronoun (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 14 ================= */
{
  id:"u14",
  title:"Unit 14",
  topic:"Past Continuous",
  ruleEn:"was / were + V-ing.",
  ruleRu:"Past Continuous: was / were + ing.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u14e${e+1}q${i+1}`,
      prompt:`Use Past Continuous (${i+1})`,
      answer:"ok"
    }))
  }))
},

/* ================= UNIT 15 ================= */
{
  id:"u15",
  title:"Unit 15",
  topic:"Past Simple vs Past Continuous",
  ruleEn:"Past Simple — finished, Past Continuous — in progress.",
  ruleRu:"Past Simple — завершено, Past Continuous — процесс.",

  exercises: Array.from({length:5},(_,e)=>({
    id:`ex${e+1}`,
    title:`Exercise ${e+1}`,
    items: Array.from({length:10},(_,i)=>({
      id:`u15e${e+1}q${i+1}`,
      prompt:`Choose correct tense (${i+1})`,
      answer:"ok"
    }))
  }))
}

],

tests: Array.from({length:15},(_,i)=>({
  id:`t${i+1}`,
  title:`Test Unit ${i+1}`,
  items: Array.from({length:10},(_,k)=>({
    id:`t${i+1}q${k+1}`,
    prompt:`Unit ${i+1} question ${k+1}`,
    answer:"ok"
  }))
}))
};
