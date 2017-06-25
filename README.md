# Bomb-Assault
**How to play:**<br>
 -Protect your smiley from the bombs and make sure it doesnt lose all of its lives.<br>
 -Defuse the bombs by clicking them; regular bombs need to be clicked twice, but purple bombs are randomized and need to either be clicked once or three times.
 <a href="https://gjeeh.github.io/Bomb-Assault">Click here to play!</a><br>
 Tips:<br>
 -Losing a life grants you a bonus click. So you'll need to sacrifice some lives in order to keep going.<br>
 -Defusing a bomb grants you a bonus click.<br>
 -Reaching certain scores grant you extra lives and clicks.<br>
 
 **Installation:**
 1. Clone or download the git onto your computer.
 2. Open the "index.html" file in the docs folder to play the game.
 
UML:<br>
<img src="/docs/images/UML.png">

# Assessment requirements
**Classes and instances:**
Elk element is als class aangemaakt behalve de scores en audio, de bommen worden als instances gepushed zodat deze vanuit random locaties buiten het speelveld kunnen komen.

**Encapsulation:**
Alle variabelen zijn private (of evt protected voor child classes), en waar nodig zijn variabelen toegankelijk gemaakt met gets/sets.

**Composition:**
Via de aanmaak van instances zijn verwijzingen doorgegeven om composition tot stand te brengen.

**Inheritance:**
Ik heb voor het onderscheiden van de verschillende bommen inheritance gebruikt. Dit was voornamelijk om het toevoegen van de nummers op de bommen eenvoudiger te maken en vanuit de child class een gefixeerde HP door te geven.
