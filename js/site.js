 const events = [
    {
        event: ".NET Core Deep Dive",
        city: "Seattle",
        state: "Washington",
        attendance: 420,
        date: "10/10/2023",
    },
    {
        event: "Full Stack with React & .NET",
        city: "Seattle",
        state: "Washington",
        attendance: 520,
        date: "10/20/2023",
    },
    {
        event: "OpenAI GPT-4 Workshop",
        city: "San Francisco",
        state: "California",
        attendance: 620,
        date: "10/30/2023",
    },
    {
        event: "Blazor & WebAssembly",
        city: "San Francisco",
        state: "California",
        attendance: 380,
        date: "11/05/2023",
    },
    {
        event: "Full Stack with Angular & .NET",
        city: "Austin",
        state: "Texas",
        attendance: 460,
        date: "11/15/2023",
    },
    {
        event: "OpenAI Codex Integration",
        city: "Austin",
        state: "Texas",
        attendance: 740,
        date: "11/25/2023",
    },
    {
        event: "MERN vs. MEAN Stack",
        city: "Los Angeles",
        state: "California",
        attendance: 560,
        date: "12/05/2023",
    },
    {
        event: "Advanced .NET Performance Tuning",
        city: "Los Angeles",
        state: "California",
        attendance: 510,
        date: "12/15/2023",
    },
    {
        event: "OpenAI & Robotics",
        city: "Los Angeles",
        state: "California",
        attendance: 390,
        date: "12/20/2023",
    },
];
  
//the default display for all events
let filteredEvents = events;

//build a dropdown of specific cities
function buildDropDown() {
    let eventDD = document.getElementById("eventDropDown");
    //distinct events for the events array
    let distinctEvents = [...new Set(events.map(event => event.city))];
    
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';

    let resultHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;
}

function getEvents(element) {
    let city = element.getAttribute("data-string");
    filteredEvents = events;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if ( city != "All") {
        filteredEvents = events.filter(function (item) {
            if(item.city == city) {
                return item;
            }
        })
    }

    displayStats();

}

//display the stats
function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (var i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if ( least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }

    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString((undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0}));
}