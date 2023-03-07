let myEvents = events.events
// recuperamos el querystring
const querystring = window.location.search
console.log(myEvents); console.log(querystring);
// usando el querystring, creamos un objeto del tipo URLSearchParams
const params = new URLSearchParams(querystring)

let id = parseInt(params.get('id'))
console.log(id);
const myEvent = myEvents.find(event => event._id == id)

console.log(myEvent);

let details = document.getElementById("details")
console.log(details);

details.innerHTML = `
                    <div class="row g-0 d-flex align-items-center">
                        <div class="col-md-6">
                            <img src="${myEvent.image}" class="img-fluid m-4" alt="Image of ${myEvent.image}">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body m-4 d-flex flex-column align-items-center">
                                <h5 class="card-title">${myEvent.name}</h5>
                                <p class="card-text">Place: ${myEvent.place}</p>
                                <p class="card-text">${myEvent.description}</p>
                                <p class="card-text">Date: ${myEvent.date}</p>
                                <p class="card-text">Price: $${myEvent.price}</p>
                                <p class="card-text">Capacidad: ${myEvent.capacity}</p>
                                <p class="card-text">Asistencia: ${myEvent.assistance || myEvent.estimate}</p>
                                <div class="">
                                    <a href="javascript: history.go(-1)" class="btn btn-primary rounded-0" id="ancla"><< Volver</a>
                                    <a href="#" onclick="alert('Sorry! This functionality is under construction.')" class="btn btn-danger rounded-0" id="asist"> Asistir </a>
                                </div>
                            </div>
                        </div>
                    </div>
`
