let URL = "https://mindhub-xj03.onrender.com/api/amazing"

let eventStatistics = document.getElementById('eventStatistics')
let upcomingEventsStatistics = document.getElementById('upcomingEventsStatistics')
let pastEventsStatistics = document.getElementById('pastEventsStatistics')
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
            if (card.date > currentDate)
                upcomingEvents.push(card)
        }
        console.log(upcomingEvents.length);
        //allCards(upcomingEvents)
    })
    .catch(error => console.log(error))

//      -----  Events Statistics   -----

eventStatistics.innerHTML += `<tr>
                                <td class="border p-3">Events with the highest percentage of attendance</td>
                                <td class="border">Events with the highest percentage of attendance</td>
                                <td class="border">Events with the highest percentage of attendance</td>
                            </tr>`
console.log(eventStatistics);

//      -----  Upcoming Events Statistics   -----

upcomingEventsStatistics.innerHTML += `<tr>
                                            <td class="border">Categories</td>
                                            <td class="border">Revenues</td>
                                            <td class="border">Percentage of attendance</td>
                                        </tr>`
console.log(upcomingEventsStatistics);

//      -----  Past Events Statistics   -----

pastEventsStatistics.innerHTML += `<tr>
                                            <td class="border">Categories</td>
                                            <td class="border">Revenues</td>
                                            <td class="border">Percentage of attendance</td>
                                        </tr>`
console.log(pastEventsStatistics);

