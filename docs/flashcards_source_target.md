---
title: English to French Flashcards
hide:
  - toc
---

<script type="module" src="https://js.withorbit.com/orbit-web-component.js"></script>
<script>
document.addEventListener("DOMContentLoaded", () => {
    let unlocked = false;
    const observer = new MutationObserver(() => {
        if (!unlocked) {
            console.log("Flashcard interaction detected! Badge unlock triggered.");
            // window.unlockBadge('flashcard_starter');
            unlocked = true;
            observer.disconnect();
        }
    });
    
    document.querySelectorAll('orbit-reviewarea').forEach(area => {
        observer.observe(area, { childList: true, subtree: true, attributes: true });
    });
});
</script>

# English → French (Active Recall)

## Group 1: Basics & Politeness

<orbit-reviewarea color="#1D3557">
    <orbit-prompt question="How do you say 'Hello' / 'Good morning'?" answer="Bonjour ⟨bohn-ZHOOR⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Good evening'?" answer="Bonsoir ⟨bohn-SWAHR⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Please' (formal)?" answer="S'il vous plaît ⟨seel voo play⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Thank you'?" answer="Merci ⟨mair-SEE⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Excuse me'?" answer="Excusez-moi ⟨ex-koo-zay-mwah⟩"></orbit-prompt>
</orbit-reviewarea>

## Group 2: Cafe & Drinks

<orbit-reviewarea color="#E63946">
    <orbit-prompt question="How do you ask for 'A table for two'?" answer="Une table pour deux ⟨oon tah-bl poor duh⟩"></orbit-prompt>
    <orbit-prompt question="How do you order a large, American-style coffee?" answer="Un café allongé ⟨uhn kah-fay ah-lohn-zhay⟩"></orbit-prompt>
    <orbit-prompt question="How do you order 'A glass of tap water'?" answer="Une carafe d'eau ⟨oon kah-rahf doh⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'It is delicious!'?" answer="C'est délicieux! ⟨say day-lee-syuh⟩"></orbit-prompt>
    <orbit-prompt question="How do you ask for 'The check/bill'?" answer="L'addition, s'il vous plaît ⟨lah-dee-syon seel voo play⟩"></orbit-prompt>
</orbit-reviewarea>

## Group 3: Navigation

<orbit-reviewarea color="#4A5568">
    <orbit-prompt question="How do you say 'Where is...?'" answer="Où se trouve...? ⟨oo suh troov⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Turn left'?" answer="Tournez à gauche ⟨toor-nay ah gohsh⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Turn right'?" answer="Tournez à droite ⟨toor-nay ah drwaht⟩"></orbit-prompt>
    <orbit-prompt question="How do you say 'Go straight ahead'?" answer="Allez tout droit ⟨ah-lay too drwah⟩"></orbit-prompt>
    <orbit-prompt question="How do you ask 'Is it far?'" answer="C'est loin? ⟨say lwan⟩"></orbit-prompt>
</orbit-reviewarea>
