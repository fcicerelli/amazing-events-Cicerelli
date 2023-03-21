let URL = "https://mindhub-xj03.onrender.com/api/amazing"
let cardsGrid = document.getElementById("cardsGrid")
let cards = [] // = events.events
let currentDate // = events.currentDate
var filteredCategory = []
let filterBySearchText = []
let doubleFilter = []
let nothingFoundTextBox = false

fetch(URL)
    .then(response => response.json())
    .then(data => {
        currentDate = data.currentDate
        cards = data.events
        menuCategories()
        allCards(cards)

    })
    .catch(error => console.log(error))

//         -------------         Cards         --------------

function renderCards() {
    if (filterBySearchText.length > 0 || filteredCategory.length > 0) {
        // si algun filtro tiene resultado
        doubleFilter = []
        if (filterBySearchText.length > 0 && filteredCategory.length == 0) {
            // si solo el buscador tiene resultado
            doubleFilter = filterBySearchText
        } else if (filterBySearchText.length == 0 && filteredCategory.length > 0) {
            // si solo los checkbox tienen resultados
            if (!nothingFoundTextBox) {
                doubleFilter = filteredCategory
            } else {
                cardsGrid.innerHTML = `
            <div>
            <h3>Nothing found</h3>
            <img src="../assets/images/nothing_found.jpg" class="card-img-top" alt="Nothing found">
            </div>                        `
            }
        } else {
            // si ambos tienen resultados
            let s = new Set(filteredCategory)
            doubleFilter = filterBySearchText.filter(item => s.has(item))
        }
        if (!nothingFoundTextBox) { allCards(doubleFilter) }
    } else {
        if (nothingFoundTextBox) {
            cardsGrid.innerHTML = `
            <div>
            <h3>Nothing found</h3>
            <img src="../assets/images/nothing_found.jpg" class="card-img-top" alt="Nothing found">
            </div>                        `
        } else {
            allCards(cards)
        }
    }
}

function allCards(arr) {
    let cardCollection = ``
    for (card of arr) {
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
                        <a href="./pages/details.html?id=${card._id}" class="btn btn-primary rounded-0">More...</a>
                    </div>
                </div>
            </div>`
}

//    --------------      Categories    Menu     -----------------------

let categoriesMenu = document.getElementById('categoriesMenu')

let categories = []
function menuCategories() {
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
}

//         ------           Search Bar         -------        //

let searchText = document.getElementById("searchText")

// keyUp
searchText.addEventListener('keyup', function (e) {
    filterBySearchText = []
    if (searchText.value == "") {
        cards.forEach(event => {
            filterBySearchText.push(event)
        })
    } else {
        cards.forEach(event => {
            if (event.name.toLowerCase().includes(searchText.value.trim().toLowerCase())) {
                filterBySearchText.push(event)
            }
        })
    }
    if (filterBySearchText.length == 0 && searchText.length != 0) {
        nothingFoundTextBox = true
    } else {
        nothingFoundTextBox = false
    }

    renderCards()
})


//checked para el checkbox

categoriesMenu.addEventListener('click', (e) => {

    if (e.target.checked) {
        cards.forEach(event => {
            if (e.target.value === event.category && e.target.checked) {
                filteredCategory.push(event)
            }
        })
        // recorrer el array buscando la categoría y pushear a filteredCategory
    } else {
        // recorrer el filteredCategory buscando la categoría y sacarla de filteredCategory
        cards.forEach((event, index) => {
            if (e.target.value === event.category && !e.target.checked) {
                filteredCategory = filteredCategory.filter(event => !(e.target.value === event.category && !e.target.checked))
            }
        })
    }
    renderCards()
})


