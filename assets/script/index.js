
let cardsGrid = document.getElementById("cardsGrid")
let cards = events.events
let currentDate = events.currentDate
let filteredCategory = []
let filterBySearchText = []
let nothing = false

//         -------------         Cards         --------------

function renderCards() {
    if (filterBySearchText.length > 0) {
        allCards(filterBySearchText)
        console.log("render filtered");
    } else {
        if (nothing) {
            cardsGrid.innerHTML = `
            <div>
            <h3>Nothing found</h3>
            <img src="../assets/images/nothing_found.jpg" class="card-img-top" alt="Nothing found">
            </div>                        `
            console.log(nothing)
        } else {
            allCards(cards)
            console.log("render all");
            console.log(nothing)
        }
    }
}

//console.log(cards);
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

renderCards()

//         ------            Barra de Busqueda         -------        //

let searchText = document.getElementById("searchText")

// keyUp
searchText.addEventListener('keyup', function (e) {
    filterBySearchText = []
    console.log("evento keyup: " + searchText.value.trim().toLowerCase())
    cards.forEach(event => {
        if (event.name.toLowerCase().includes(searchText.value.trim().toLowerCase())) {
            filterBySearchText.push(event)
            console.log(event.name.toLowerCase() + " | " + searchText.value.trim().toLowerCase())
        }
    })
    console.log(filterBySearchText.length);
    if (filterBySearchText.length == 0 && searchText.length != 0) {
        nothing = true
    } else {
        nothing = false
    }
    //allCards(filterBySearchText)
    renderCards()
})


//checked para el checkbox

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
    //allCards(filteredCategory)
    if (filteredCategory.length == 0 && !e.target.checked) {
        nothing = false
    } else {
        nothing = true
    }
    console.log(nothing)
    renderCards()
})


