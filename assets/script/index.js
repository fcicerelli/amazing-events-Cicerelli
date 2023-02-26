
let cardsGrid = document.getElementById("cardsGrid")
let cards = events.events
let currentDate = events.currentDate

function allCards(cards) {
    let cardCollection = ``
    for (card of cards) {
        cardCollection += oneCard(card)
    }
    cardsGrid.innerHTML = cardCollection
}

function oneCard(card) {
    return `<div class="card h-100 rounded-0 col-2">
                <img src="${card.image}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                    <div>
                        <p class="d-inline">Price: $ ${card.price}</p>
                        <a href="/pages/details.html" class="btn btn-primary rounded-0">Ver mas...</a>
                    </div>
                </div>
            </div>`
}

allCards(cards)



