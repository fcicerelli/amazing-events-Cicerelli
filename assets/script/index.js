let URL = "https://mindhub-xj03.onrender.com/api/amazing"
let cardsGrid = document.getElementById("cardsGrid")
let cards = [] // = events.events
let currentDate // = events.currentDate
let filteredCategory = []
let filterBySearchText = []
let doubleFilter = []
let nothingFoundCheckBox = false
let nothingFoundTextBox = false


fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        currentDate = data.currentDate
        cards = data.events
        console.log(currentDate)
        console.log(cards)
        console.log(cards.length)
        allCards(cards)
    })
    .catch(error => console.log(error))

//         -------------         Cards         --------------

function renderCards() {
    if (filterBySearchText.length > 0 || filteredCategory.length > 0) {
        // si algun filtro tiene resultado
        doubleFilter = []
        if (filterBySearchText.length > 0 && filteredCategory.lenght == 0) {
            // si solo el buscador tiene resultado
            doubleFilter = filterBySearchText
            console.log("ONLY TEXTBOX")
        } else if (filterBySearchText.length == 0 && filteredCategory.lenght > 0) {
            // si solo los checkbox tienen resultados
            doubleFilter = filteredCategory
            console.log("ONLY CATEGORY")
        } else {
            // si ambos tienen resultados
            let s = new Set(filteredCategory)
            doubleFilter = filterBySearchText.filter(item => s.has(item))
            console.log("TEXTBOX AND CATEGORY")
            /*  filterBySearchText.forEach((searchText, index) => {
                 if (searchText._id.includes(filteredCategory)) {
                     doubleFilter.push(card)
                 }
             }) */
        }
        allCards(doubleFilter)
        console.log("render doubleFilter");
    } else {
        if (!nothingFoundTextBox && !nothingFoundCheckBox) {
            cardsGrid.innerHTML = `
            <div>
            <h3>Nothing found</h3>
            <img src="../assets/images/nothing_found.jpg" class="card-img-top" alt="Nothing found">
            </div>                        `
            console.log(nothingFoundTextBox && nothingFoundCheckBox)
        } else {
            allCards(cards)
            console.log("render all");
            console.log(nothingFoundTextBox && nothingFoundCheckBox)
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

//         ------           Search Bar         -------        //

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
        nothingFoundTextBox = true
    } else {
        nothingFoundTextBox = false
    }
    console.log("Se encontró algo en el textBox? " + !nothingFoundTextBox);
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
    console.log("-------------------------");
    filteredCategory.map(c => console.log(c.name, c.category))
    console.log(filteredCategory.length);
    //allCards(filteredCategory)
    if (filteredCategory.length == 0 && !e.target.checked) {
        nothingFoundCheckBox = true
    } else {
        nothingFoundCheckBox = false
    }
    console.log("Se encontró algo en el CheckBox ? " + !nothingFoundCheckBox)
    renderCards()
})


