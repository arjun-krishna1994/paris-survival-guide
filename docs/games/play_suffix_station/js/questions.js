export const QUESTIONS = [
  // Tier 1: Basics, Rules, Polite forms
  {
    prompt: "Vous ____ (to have)",
    options: ["avez", "êtes", "allez", "faites"],
    correct: 0,
    explanation: "'Vous avez' is the formal 'You have'. Very important verb!",
    tier: 1
  },
  {
    prompt: "Je ____ (to be)",
    options: ["suis", "es", "est", "sommes"],
    correct: 0,
    explanation: "'Je suis' means 'I am'.",
    tier: 1
  },
  {
    prompt: "What does 'S'il vous plaît' literally translate to?",
    options: ["If it pleases you", "If you please", "Please for you", "Thank you"],
    correct: 0,
    explanation: "Literally 'If it pleases you'. It highlights the formal 'vous'.",
    tier: 1
  },
  {
    prompt: "Turn '-tion' (English) to French:",
    options: ["-tion (same spelling)", "-sion", "-ique", "-té"],
    correct: 0,
    explanation: "English words ending in -tion are almost exactly the same in French (Information -> Information).",
    tier: 1
  },
  {
    prompt: "What is the golden rule before speaking to any Parisian?",
    options: ["Say 'Bonjour'", "Tip 20%", "Ask 'Parlez-vous anglais?'", "Smile silently"],
    correct: 0,
    explanation: "Saying 'Bonjour' is absolutely mandatory to establish respect.",
    tier: 1
  },

  // Tier 2: Real-world survival, Grammar Hacks
  {
    prompt: "How do you politely order a coffee?",
    options: ["Je voudrais un café", "Je veux un café", "Donnez-moi un café", "Un café, maintenant"],
    correct: 0,
    explanation: "'Je voudrais' (I would like) is the polite way. 'Je veux' (I want) is demanding.",
    tier: 2
  },
  {
    prompt: "Turn English '-ty' to French:",
    options: ["-té", "-tion", "-ment", "-ique"],
    correct: 0,
    explanation: "University -> Université. Reality -> Réalité.",
    tier: 2
  },
  {
    prompt: "Which phrase turns any statement into a question?",
    options: ["Est-ce que", "Qu'est-ce que", "Pourquoi", "Comment"],
    correct: 0,
    explanation: "Slap 'Est-ce que' at the front, and it's suddenly a question.",
    tier: 2
  },
  {
    prompt: "To describe the weather being hot, you say:",
    options: ["Il fait chaud", "C'est chaud", "Je suis chaud", "Il est chaud"],
    correct: 0,
    explanation: "'Il fait chaud' uses the verb 'faire' (to do/make) for weather.",
    tier: 2
  },
  {
    prompt: "What happens to the final 'S' or 'T' in most French words?",
    options: ["It is silent", "It is emphasized", "It becomes an 'R' sound", "It turns into a nasal sound"],
    correct: 0,
    explanation: "In words like 'Paris', 'Comment', the final consonant is usually silent unless followed by a vowel.",
    tier: 2
  },

  // Tier 3: Slang, Nuance, Culture
  {
    prompt: "What does 'Je t'aime bien' mean?",
    options: ["I like you (as a friend)", "I love you passionately", "I hate you", "I am well"],
    correct: 0,
    explanation: "Adding 'bien' ironically friendzones the person in French.",
    tier: 3
  },
  {
    prompt: "What is the Verlan (slang) word for 'femme' (woman)?",
    options: ["Meuf", "Keum", "Ouf", "Zarbi"],
    correct: 0,
    explanation: "'Meuf' is the reversed (verlan) version of 'femme'.",
    tier: 3
  },
  {
    prompt: "If a waiter says 'Hors charges' for an apartment, it means:",
    options: ["Utilities NOT included", "Utilities included", "No charge", "Free water"],
    correct: 0,
    explanation: "HC (Hors charges) means you pay utilities separately. CC (Charges comprises) means they are included.",
    tier: 3
  },
  {
    prompt: "Which suffix makes an adjective into an adverb (like '-ly')?",
    options: ["-ment", "-tion", "-té", "-isme"],
    correct: 0,
    explanation: "Rapide -> Rapidement (Rapidly). Exact -> Exactement (Exactly).",
    tier: 3
  },
  {
    prompt: "What does the 'y' mean in 'On y va'?",
    options: ["There / To it", "Yes", "Now", "Us"],
    correct: 0,
    explanation: "'y' replaces a place. So 'Let's go [there]'.",
    tier: 3
  }
];
