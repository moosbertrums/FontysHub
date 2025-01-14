//hieronder is een mock-up van de code die Oscar heeft gemaakt, Dit is een minder uitgebreide versie zodat ik het makkelijk kan testen.

//de Event class is aangemaakt met verschillende variabelen die ik makkelijk terug kan roepen in mijn html/css
class Event {
    constructor(title, date, description, location, image = '', parking = false, gear = false ) {
        this.title = title;
        this.date = new Date(date);
        this.description = description;
        this.location = location;
        this.image = image;
        this.parking = parking;
        this.gear = gear;
    }
}
//de EventCatalog class zet events op binnen de kalender.
class EventCatalog {
    constructor() {
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    getEventsForMonth(month, year) {
        return this.events.filter(event => event.date.getMonth() === month && event.date.getFullYear() === year);
    }
}
//Voorbeeld events die ik zelf waardes heb gegeven.
const eventCatalog = new EventCatalog();

eventCatalog.addEvent(new Event("Kerstfeest", "2024-12-25", "Vier kerst met vrienden!", "NoordPool", "img/TQimg.jpg", true, false));
eventCatalog.addEvent(new Event("Oudejaarsavond", "2024-12-31", "Aftellen naar het nieuwe jaar!", "TQ", "https://content.presspage.com/uploads/1593/1920_fotoictinnovationlab.jpg?10000", false, false));
eventCatalog.addEvent(new Event("Introductie 3de semester", "2025-02-03", "Introductie 3de semester semester","TQ", "img/TQimg.jpg", true, true));
eventCatalog.addEvent(new Event("Je Verjaardag", "2025-01-25", "Het is je verjaardag! Je verjaardag komt ene keer per jaar","Thuis op de Bank", "https://www.amazingballoons.nl/wp-content/uploads/2023/05/banner-amazing-balloons.jpg", false, true));
eventCatalog.addEvent(new Event("Nieuwjaarsborrel", "2025-01-11", "Heb jij ook zo zin om al je nieuwjaars voornemens te delen met al je mede studenten???" + "IK OOK!","TQ", "https://images.unsplash.com/photo-1560986752-2e31d9507413?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlyZXdvcmtzfGVufDB8fDB8fHww", true, true));

eventCatalog.addEvent(new Event("Kikker in je bil", "2025-04-01", "1 April, kikker in je bil!", "Moeras", "img/Kikker.webp", false, false));
eventCatalog.addEvent(new Event("The Future is now", "2030-01-15", "Hoe ziet jouw leven er over 5 jaar uit?", "Jouw Toekomst", "img/Future1.jpg", true, true))
eventCatalog.addEvent(new Event("The Future is now", "2030-05-24", "Hoe ziet jouw leven er over 5 jaar uit?", "Jouw Toekomst", "img/Future2.avif", false, false))
eventCatalog.addEvent(new Event("The Future is now", "2030-09-11", "Hoe ziet jouw leven er over 5 jaar uit?", "Jouw Toekomst", "img/Future3.jpg", false, true))
eventCatalog.addEvent(new Event("The Future is now", "2030-11-27", "Hoe ziet jouw leven er over 5 jaar uit?", "Jouw Toekomst", "img/Future4.jpg", true, true))

let currentDate = new Date();

//De functie die de kalender visueel maakt op de website.
function renderCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthYearLabel = document.getElementById("month-year");
    monthYearLabel.innerText = `${currentDate.toLocaleString('nl-NL', { month: 'long' })} ${year}`;

    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); // Zondag als 7

    let row = document.createElement('tr');
    for (let i = 1; i < startingDay; i++) {
        row.appendChild(document.createElement('td'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if ((startingDay - 1 + day - 1) % 7 === 0 && day !== 1) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        cell.innerText = day;
        //  cell.style.width = '38px';
        //  cell.className = 'tdd';

        const eventsOnThisDay = eventCatalog.getEventsForMonth(month, year).filter(event => event.date.getDate() === day);

        if (eventsOnThisDay.length > 0) {
            cell.classList.add('event');
            cell.title = eventsOnThisDay.map(event => `${event.title}: ${event.description}`).join('\n');
        }

        row.appendChild(cell);
    }

    calendarBody.appendChild(row);
}

//Functie die alle events assigned aan de juiste data en ze ophaald als iemand er op klikt.
function displayEventsForDay(day) {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const eventsOnThisDay = eventCatalog.getEventsForMonth(month, year).filter(event => event.date.getDate() === day);

    const eventList = document.getElementById('events');
    eventList.innerHTML = ''; // Maak de lijst leeg

    if (eventsOnThisDay.length > 0) {
        eventsOnThisDay.forEach(event => {

            const li = document.createElement('li');

            const aanmeldButton = document.createElement('button');
            aanmeldButton.innerText = "aanmelden";
            aanmeldButton.addEventListener('click', () =>{
                alert(`U bent aangemeld voor: ${event.title}`);
            });
            li.appendChild(aanmeldButton);

            const checkboxParkLabel = document.createElement('label');
            checkboxParkLabel.innerText = "Parkeren mogelijk";
            const checkboxPark = document.createElement('input');
            checkboxPark.type = 'checkbox';
            checkboxPark.checked = event.parking;
            checkboxPark.disabled = true;

            checkboxParkLabel.appendChild(checkboxPark);
            li.appendChild(checkboxParkLabel);

            const checkboxGearLabel = document.createElement('label');
            checkboxGearLabel.innerText = "Eigen spullen mee";
            const checkboxGear = document.createElement('input');
            checkboxGear.type = 'checkbox';
            checkboxGear.checked = event.gear;
            checkboxGear.disabled = true;

            checkboxGearLabel.appendChild(checkboxGear);
            li.appendChild(checkboxGearLabel);

            const eventDesc = document.createElement('div');
            eventDesc.classList.add('event-desc');
            eventDesc.innerText = `${event.description}
            
            `;
            li.appendChild(eventDesc);

            const eventTitle = document.createElement('div');
            eventTitle.classList.add('event-title');
            eventTitle.innerText = `${event.title}
            
            `;
            li.appendChild(eventTitle);

            if (event.image) {
                const img = document.createElement('img');
                img.src = event.image;
                img.alt = event.title;
                li.appendChild(img);
            }


            eventList.appendChild(li);


        });
    } else {
        const li = document.createElement('li');
        li.innerText = "Geen evenementen op deze dag.";
        eventList.appendChild(li);
    }
}

//knop vorige maand.
document.getElementById("prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

//knop volgende maand.
document.getElementById("next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
//wat er gebeurd als er iemand op een event klikt.
document.getElementById('calendar-table').addEventListener('click', (event) => {
    if (event.target.tagName === 'TD' && event.target.innerText !== '') {
        const day = parseInt(event.target.innerText);
        displayEventsForDay(day);
    }
});
