


let pastEvents = []
for (card of cards) {
    if (card.date > currentDate)
        pastEvents.push(card)
}

console.log(pastEvents.length);

allCards(pastEvents)