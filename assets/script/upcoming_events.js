let URL = "https://mindhub-xj03.onrender.com/api/amazing"

let cardsGrid = document.getElementById("cardsGrid")
let cards = [] // = events.events
let currentDate // = events.currentDate
let upcomingEvents = []

fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentDate = data.currentDate
        cards = data.events
        console.log(currentDate)
        console.log(cards)
        for (card of cards) {
            if (card.date >= currentDate)
                upcomingEvents.push(card)
        }
        console.log(upcomingEvents.length);
        allCards(upcomingEvents)
    })
    .catch(error => console.log(error))

function allCards(cards) {
    let cardCollection = ``
    for (card of cards) {
        cardCollection += oneCard(card)
    }
    cardsGrid.innerHTML = cardCollection
}

function oneCard(card) {
    return `<div class="card h-100 rounded-0 col-12 col-sm-5 col-md-4 col-lg-3">
                <img src="${card.image}" class="card-img-top" alt="${card.place}">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                    <div>
                        <p class="d-inline text-danger fw-bold">Price: $ ${card.price}</p>
                        <a href="./details.html?id=${card._id}" class="btn btn-primary rounded-0">More...</a>
                    </div>
                </div>
            </div>`
}



