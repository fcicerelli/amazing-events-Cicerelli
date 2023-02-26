


let upcomingEvents = []
for (card of cards) {
    if (card.date > currentDate)
        upcomingEvents.push(card)
}
console.log(upcomingEvents.length);

allCards(upcomingEvents)
