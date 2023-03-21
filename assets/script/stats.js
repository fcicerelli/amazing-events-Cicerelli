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
let upcomingStats = []
let pastStats = []
let eventsWithHigestAssistance = []
let eventsWithLowestAssistance = []
let eventsWithHigestCapacity = []

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
        console.log(pastEvents);
        generateCategories()
        upcomingStats = calculateStatisticsCategories(upcomingEvents)
        pastStats = calculateStatisticsCategories(pastEvents)
        //console.log(pastStats);
        eventsHigestAssistance(pastEvents)
        eventsWithHigestAssistance.forEach(arr => console.log(`${arr.percentage} ${arr.name}`))
        console.log(eventsWithHigestAssistance);
        eventsLowestAssistance(pastEvents)
        eventsWithLowestAssistance.forEach(arr => console.log(`${arr.percentage} ${arr.name}`))
        console.log(eventsWithLowestAssistance);
        eventsWithHigestAssistance.forEach(arr => console.log(`${arr.percentage} ${arr.name}`))
        console.log("---");
        eventsHigestCapatity(pastEvents)
        eventsWithHigestCapacity.forEach(arr => console.log(`${arr.capacity} ${arr.name}`))
        console.log(eventsWithHigestCapacity);
        generateTableEventsStatistics()
        generateTableUpcomingEventsStatistics()
        generateTablePastEventsStatistics()
    })
    .catch(error => console.log(error))

//      -----  Events Statistics   -----
function generateTableEventsStatistics() {
    let renderTable = ``
    for (let i = 0; i < 3; i++) {
        renderTable += `<tr>
            <td class="border border-secondary text-center">${eventsWithHigestAssistance[i].name}: ${eventsWithHigestAssistance[i].percentage} %</td>
            <td class="border border-secondary text-center">${eventsWithLowestAssistance[i].name}: ${eventsWithLowestAssistance[i].percentage} %</td>
            <td class="border border-secondary text-center">${eventsWithHigestCapacity[i].name}: ${eventsWithHigestCapacity[i].capacity}</td>
        </tr>`
    }
    eventStatistics.innerHTML = renderTable

}

//      -----  Upcoming Events Statistics   -----
function generateTableUpcomingEventsStatistics() {
    let renderTable = ``
    upcomingStats.forEach(category => {
        renderTable += `<tr>
                            <td class="border border-secondary text-center">${category.category}</td>
                            <td class="border border-secondary text-center">$ ${category.revenues}</td>
                            <td class="border border-secondary text-center">${category.porcentage.toFixed(2)} %</td>
                        </tr>`
    })
    upcomingEventsStatistics.innerHTML = renderTable
}

//      -----  Past Events Statistics   -----
function generateTablePastEventsStatistics() {
    //console.log(pastStats)
    let renderTable = ``
    pastStats.forEach(category => {
        renderTable += `<tr>
                            <td class="border border-secondary text-center">${category.category}</td>
                            <td class="border border-secondary text-center">$ ${category.revenues}</td>
                            <td class="border border-secondary text-center">${category.porcentage.toFixed(2)} %</td>
                        </tr>`
    })
    pastEventsStatistics.innerHTML = renderTable
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
    categories.sort()
    //console.log(categories);
}

// Agrupa por categorías
function calculateStatisticsCategories(arr) {
    //console.log(arr);
    let categoriesStats = []
    categories.forEach(category => {
        let n = 0
        let revenue = 0
        let porcent = 0
        arr.forEach(element => {
            //console.log(element);
            //console.log(element.category === category);
            //console.log(element.category);
            //console.log(category);

            if (element.category === category) {
                revenue += element.revenue
                porcent = porcent + Number.parseFloat(element.percentage)
                n++
                //console.log(element);
            }
            //console.log(`n ${n} ingreso ${revenue} porcentaje ${porcent}`);
        })
        categoriesStats.push({
            category: category,
            porcentage: n == 0 ? n : porcent / n,
            revenues: revenue
        })
        //console.log(`n ${n} ingreso ${revenue} porcentaje ${porcent}`);
    })
    //console.log(categoriesStats);
    return categoriesStats
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
    eventsWithHigestAssistance = array.map(a => a).sort((e1, e2) => (e1.percentage < e2.percentage) ? 1 : (e1.percentage > e2.percentage) ? -1 : 0)
}
function eventsLowestAssistance(array) {
    eventsWithLowestAssistance = array.map(a => a).sort((e1, e2) => (e1.percentage < e2.percentage) ? -1 : (e1.percentage > e2.percentage) ? 1 : 0)
}

function eventsHigestCapatity(array) {
    eventsWithHigestCapacity = array.map(a => a).sort((e1, e2) => (e1.capacity < e2.capacity) ? 1 : (e1.capacity > e2.capacity) ? -1 : 0)
}

