let URL = "https://mindhub-xj03.onrender.com/api/amazing"

let eventStatistics = document.getElementById('eventStatistics')
let upcomingEventsStatistics = document.getElementById('upcomingEventsStatistics')
let pastEventsStatistics = document.getElementById('pastEventsStatistics')
let cards = []          //  events.events
let currentDate         //  events.currentDate
let eventsTranformed = []      //  nuevo objeto con toda la informacion necesaria para generar las tablas
let upcomingEvents = [] //  events.date >= currentDate
let pastEvents = []     //  events.date < currentDate
let categories = []     // arreglo de categorías

fetch(URL)
    .then(response => response.json())
    .then(data => {
        currentDate = data.currentDate
        cards = data.events
        //console.log(cards);
        eventsWithStats()
        filterEvents(eventsTranformed)
        //console.log(eventsTranformed);
        //console.log(upcomingEvents);
        //console.log(pastEvents);
        generateCategories()
        calculateStatisticsCategories(upcomingEvents)
        generateTableEventsStatistics()
        generateTableUpcomingEventsStatistics()
        generateTablePastEventsStatistics()
    })
    .catch(error => console.log(error))

//      -----  Events Statistics   -----
function generateTableEventsStatistics() {
    eventStatistics.innerHTML += `<tr>
                                <td class="border p-3">Events with the highest percentage of attendance</td>
                                <td class="border">Events with the lowest percentage of attendance</td>
                                <td class="border">Events with larger capacity</td>
                            </tr>`
    eventStatistics.innerHTML += `<tr>
                                    <td>${eventsTranformed[0].name}: ${eventsTranformed[0].percentage} %</td>
                                    <td>${eventsTranformed[30].name}: ${eventsTranformed[30].percentage} %</td>
                                    <td>${eventsTranformed[15].name}: ${eventsTranformed[15].percentage} %</td>
                                </tr>`
    eventStatistics.innerHTML += `<tr>
                                    <td>${eventsTranformed[1].name}: ${eventsTranformed[1].percentage} %</td>
                                    <td>${eventsTranformed[29].name}: ${eventsTranformed[29].percentage} %</td>
                                    <td>${eventsTranformed[16].name}: ${eventsTranformed[16].percentage} %</td>
                                </tr>`
    eventStatistics.innerHTML += `<tr>
                                    <td>${eventsTranformed[2].name}: ${eventsTranformed[2].percentage} %</td>
                                    <td>${eventsTranformed[18].name}: ${eventsTranformed[28].percentage} %</td>
                                    <td>${eventsTranformed[17].name}: ${eventsTranformed[17].percentage} %</td>
                                </tr>`
}

//      -----  Upcoming Events Statistics   -----
function generateTableUpcomingEventsStatistics() {
    upcomingEventsStatistics.innerHTML += `<tr>
                                            <td class="border">Categories</td>
                                            <td class="border">Revenues</td>
                                            <td class="border">Percentage of attendance</td>
                                        </tr>`
}

//      -----  Past Events Statistics   -----
function generateTablePastEventsStatistics() {
    pastEventsStatistics.innerHTML += `<tr>
                                            <td class="border">Categories</td>
                                            <td class="border">Revenues</td>
                                            <td class="border">Percentage of attendance</td>
                                        </tr>`
}
function filterEvents(cards) {
    //console.log(cards)
    for (card of cards) {
        //console.log(card.date);
        if (card.date >= currentDate) {
            upcomingEvents.push(card)
        } else {
            pastEvents.push(card)
        }
    }
    //console.log(upcomingEvents.length);
    //console.log(pastEvents.length);
}

// calcula el porcentaje. Si Total es cero, devuelve 'undefined'
function percentage(num, total) {
    return total != 0 ? num / total * 100 : undefined
}

// Calcula el ingreso total, multiplicando la asistencia por el precio de la entrada
function revenue(assitance, price) {
    return assitance * price
}
//console.log(`promedio ${percentage(10, 30)}`);

// Arreglo de categorías
function generateCategories() {
    eventsTranformed.forEach((element) => {
        if (!categories.includes(element.category)) {
            categories.push(element.category)
        }
    })
    //console.log(categories);
}

// Agrupa por categorías
function calculateStatisticsCategories(arr) {
    let categoryStats = []
    console.log(categoryStats);
    arr.map(element => element.category === "concert")
    return categoryStats
}

// Genera un arreglo conteniendo la información necesaria para generar las tablas: 
// id, nombre, categoría, promedio, ingreso total, capacidad, precio
function eventsWithStats() {
    cards.forEach(event => {
        let element = {
            _id: event._id,
            name: event.name,
            date: event.date,
            category: event.category,
            percentage: Number.parseFloat(percentage(event.assistance || event.estimate, event.capacity)).toFixed(2),
            revenue: revenue(event.assistance || event.estimate, event.price),
            capacity: event.capacity,
            price: event.price,
            estimate: event.estimate,
            assistance: event.assistance,
            concurrence: (event.estimate || event.assistance)
        }
        eventsTranformed.push(element)
        //console.log(element);
    })
}

function eventsHigestAssistance(array) {
    return
}
function eventsLowestAssistance(array) {
    return
}
function eventsHigestCapatity(array) {
    return
}

