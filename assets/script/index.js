
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
                <img src="${card.image}" class="card-img-top" alt="${card.place}">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text">${card.description}</p>
                    <div>
                        <p class="d-inline text-danger fw-bold">Price: $ ${card.price}</p>
                        <a href="./pages/details.html?id=${card._id}" class="btn btn-primary rounded-0">More...</a>
                    </div>
                </div>
            </div>`
}

let categoriesMenu = document.getElementById('categoriesMenu')

let categories = []
cards.forEach((element) => {
    if (!categories.includes(element.category)) {
        categories.push(element.category)
    }
})

let menues = ''
categories.forEach(category => {
    menues += `<div class="me-3" >
                                <input type="checkbox" name="category" id="${category}" value="${category}">
                                <label for="${category}">${category}</label>
                            </div>`})

categoriesMenu.innerHTML = menues

allCards(cards)

//         ------            Barra de Busqueda         -------        //

let searchText = document.getElementById("searchText")

//searchText.innerText = "escriba"
//searchText.setAttribute('value', 'escriba aqui');

// change
/* searchText.addEventListener('change', function () {
    console.log("evento chage: " + searchText.value);
}) */
// keyUp
searchText.addEventListener('keyup', function (e) {
    console.log("evento keyup: " + searchText.value)
    cards.filter(event => {

    })
})

let searchBtn = document.getElementById("searchBtn")
searchBtn.addEventListener('click', () => {
    console.log("evento click: " + searchText.value)
})

//checked para el checkbox
let filteredCategory = []
categoriesMenu.addEventListener('click', (e) => {
    console.log("e.target.value: " + e.target.value + " | e.target.checked: " + e.target.checked);

    if (e.target.checked) {
        cards.forEach(event => {
            if (e.target.value === event.category && e.target.checked) {
                filteredCategory.push(event)
                console.log("agregando...");
            }
        })
        // recorrer el array buscando la categoría y pushear a filteredCategory
    } else {
        // recorrer el filteredCategory buscando la categoría y sacarla de filteredCategory
        cards.forEach((event, index) => {
            if (e.target.value === event.category && !e.target.checked) {
                //filteredCategory.slice(index, 1)
                filteredCategory = filteredCategory.filter(event => !(e.target.value === event.category && !e.target.checked))
                console.log("borrando...");
            }
        })
    }
    console.log("-----------------------------------");
    filteredCategory.map(c => console.log(c.name, c.category))
    console.log(filteredCategory.length);
})


//let checkboxes = document.querySelectorAll("input[checkbox]")
//console.log("------- los checboxes  ------ " + checkboxes);