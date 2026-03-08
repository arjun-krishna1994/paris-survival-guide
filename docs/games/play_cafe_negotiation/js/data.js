export const NPCS = {
    'claude': {
        name: 'Claude (The Traditionalist)',
        avatar: '👨🏻‍🍳',
        modifiers: { respect: 0.8, patience: 1.0 },
        description: 'Older Parisian waiter. Very formal. Hates it when you speak English without trying first.'
    },
    'amelie': {
        name: 'Amélie (The Sympathetic)',
        avatar: '👩🏻‍🦰',
        modifiers: { respect: 1.2, patience: 1.5 },
        description: 'Young and patient. Appreciates any effort you make to speak French.'
    },
    'luc': {
        name: 'Luc (The Busy Hustler)',
        avatar: '👱🏼‍♂️',
        modifiers: { respect: 1.0, patience: 0.6 },
        description: 'Constantly rushing. Respects fast, confident orders. Loses patience quickly.'
    }
};

export const LEVELS = {
    1: {
        title: "The Greeting",
        scenario: "You enter a busy Parisian café. The waiter approaches your table.",
        bg: "assets/bg_cafe_out.png",
        dialogue: {
            start: {
                text: "Oui, monsieur? Vous désirez?",
                choices: [
                    {
                        text: "Bonjour, une table pour deux s'il vous plaît.",
                        translation: "Hello, a table for two please.",
                        effect: { respect: +20, patience: -5 },
                        next: "sit_down",
                        feedback: "Excellent! You started with 'Bonjour' and used 's'il vous plaît' (formal). The golden rule of Paris."
                    },
                    {
                        text: "Une table.",
                        translation: "A table.",
                        effect: { respect: -15, patience: -10 },
                        next: "sit_down_rude",
                        feedback: "Very rude! You forgot 'Bonjour' and didn't say please."
                    },
                    {
                        text: "Do you have a table for two?",
                        translation: "(Speaking English)",
                        isEnglish: true,
                        effect: { respect: -20, patience: -15, barrier: true },
                        next: "sit_down_english",
                        feedback: "Never start in English! Always attempt a French greeting first."
                    }
                ]
            },
            sit_down: {
                text: "Très bien. Par ici. Je vous apporte le menu.",
                choices: [
                    { text: "Merci beaucoup.", translation: "Thank you very much.", effect: { respect: +5, patience: 0 }, next: "level_complete", feedback: "Polite and simple." }
                ]
            },
            sit_down_rude: {
                text: "(Sighs). Suivez-moi.",
                choices: [
                    { text: "Merci.", translation: "Thank you.", effect: { respect: +5, patience: 0 }, next: "level_complete", feedback: "Trying to recover some politeness." }
                ]
            },
            sit_down_english: {
                text: "(In heavy accent) Yes, table. Follow me.",
                choices: [
                    { text: "Merci.", translation: "Thank you.", effect: { respect: +5, patience: 0 }, next: "level_complete", feedback: "Good, you switched back to French." }
                ]
            }
        }
    },
    2: {
        title: "The Order",
        scenario: "The waiter returns for your coffee order. You want a large American coffee, not a small espresso.",
        bg: "assets/bg_cafe_in.png",
        dialogue: {
            start: {
                text: "Alors, qu'est-ce que je vous sers ?",
                choices: [
                    {
                        text: "Je voudrais un café allongé, s'il vous plaît.",
                        translation: "I would like an American coffee, please.",
                        effect: { respect: +25, patience: -5 },
                        next: "water_ask",
                        feedback: "Perfect! 'Je voudrais' is very polite, and you correctly ordered an 'allongé'."
                    },
                    {
                        text: "Un café.",
                        translation: "A coffee.",
                        effect: { respect: 0, patience: 0 },
                        next: "wrong_coffee",
                        feedback: "You'll get a tiny espresso, not a large coffee. But it wasn't rude."
                    },
                    {
                        text: "Je veux un grand café.",
                        translation: "I want a large coffee.",
                        effect: { respect: -15, patience: -5 },
                        next: "water_ask",
                        feedback: "Using 'Je veux' (I want) sounds demanding and childlike to French ears. Use 'Je voudrais'."
                    }
                ]
            },
            wrong_coffee: {
                text: "(Brings a tiny espresso) Et avec ça ?",
                choices: [
                    { text: "C'est parfait, merci.", translation: "It's perfect, thank you.", effect: { respect: +5, patience: 0 }, next: "water_ask", feedback: "You accepted your fate." }
                ]
            },
            water_ask: {
                text: "Très bien. Autre chose ?",
                choices: [
                    {
                        text: "Une carafe d'eau, si possible.",
                        translation: "A pitcher of tap water, if possible.",
                        effect: { respect: +15, patience: 0 },
                        next: "level_complete",
                        feedback: "Correct! 'Une carafe d'eau' gets you free tap water instead of an expensive bottle."
                    },
                    {
                        text: "De l'eau, s'il vous plaît.",
                        translation: "Some water, please.",
                        effect: { respect: -5, patience: 0 },
                        next: "level_complete",
                        feedback: "They might bring you a 6-euro bottle of Evian. Always specify 'carafe'."
                    }
                ]
            }
        }
    },
    3: {
        title: "The Bill",
        scenario: "You've finished, but the waiter hasn't brought the check. In France, they won't rush you.",
        bg: "assets/bg_cafe_out.png",
        dialogue: {
            start: {
                text: "(The waiter is walking past your table quickly)",
                choices: [
                    {
                        text: "Excusez-moi, l'addition s'il vous plaît.",
                        translation: "Excuse me, the check please.",
                        effect: { respect: +15, patience: -5 },
                        next: "pay_method",
                        feedback: "Perfect. 'L'addition' is the right word, and you caught their attention politely."
                    },
                    {
                        text: "Garçon ! L'addition !",
                        translation: "Boy! The check!",
                        effect: { respect: -40, patience: -20 },
                        next: "angry_waiter",
                        feedback: "DISASTER. Never call a waiter 'Garçon'. It's incredibly offensive and outdated."
                    },
                    {
                        text: "Check please?",
                        isEnglish: true,
                        translation: "(Speaking English)",
                        effect: { respect: -10, patience: -10, barrier: true },
                        next: "pay_method",
                        feedback: "A bit blunt, but they understand the universal sign for the bill."
                    }
                ]
            },
            angry_waiter: {
                text: "Je ne suis pas votre 'garçon'. Voilà l'addition.",
                choices: [
                    { text: "Pardon, je suis désolé(e).", translation: "Sorry, I apologize.", effect: { respect: +10, patience: 0 }, next: "level_complete", feedback: "Good recovery." }
                ]
            },
            pay_method: {
                text: "Voilà. Ça fera 7 euros 50.",
                choices: [
                    {
                        text: "Je peux payer par carte ?",
                        translation: "Can I pay by card?",
                        effect: { respect: +10, patience: 0 },
                        next: "level_complete",
                        feedback: "A very natural way to ask to pay by card."
                    },
                    {
                        text: "Voilà 10 euros. Gardez la monnaie.",
                        translation: "Here is 10 euros. Keep the change.",
                        effect: { respect: +15, patience: +10 },
                        next: "level_complete",
                        feedback: "Tipping isn't required in France, but it's appreciated for good service."
                    }
                ]
            }
        }
    }
};
