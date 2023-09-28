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
  
//build a dropdown of specific cities
function buildDropDown() {

    //grab the select list we want to add city names to.
    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";
    //grab a template we want to use to populate the select list
    const template = document.getElementById("cityDD-template");
  
    //Pull the events from local storage if there are none pull form the
    //default data.
    curEvents = JSON.parse(localStorage.getItem("eventsArray"));
    if (curEvents == null) {
      curEvents = events;
    }
  
    let distinctEvents = [...new Set(curEvents.map((event) => event.city))];
    let ddItemNode = document.importNode(template.content, true);
    ddItem = ddItemNode.querySelector("a");
    ddItem.setAttribute("data-string", "All");
    ddItem.textContent = "All";
    eventDD.appendChild(ddItem);
  
    for (var i = 0; i < distinctEvents.length; i++) {
      ddItemNode = document.importNode(template.content, true);
      ddItem = ddItemNode.querySelector("a");
      ddItem.setAttribute("data-string", distinctEvents[i]);
      ddItem.textContent = distinctEvents[i];
      eventDD.appendChild(ddItem);
    }
    displayStats(curEvents);
    displayData();
  }
  
  //show stats for a specific location
  function getEvents(element) {
    let city = element.getAttribute("data-string");
    curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    let filteredEvents = curEvents;
  
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if (city != "All") {
      //Explain how array filtering works-
      filteredEvents = curEvents.filter(function (item) {
        if (item.city == city) {
          return item;
        }
      });
    }
    displayStats(filteredEvents);
  }
  
  function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;
  
    //display total attendance
    for (let i = 0; i < filteredEvents.length; i++) {
      currentAttendance = filteredEvents[i].attendance;
      total += currentAttendance;
  
      if (most < currentAttendance) {
        most = currentAttendance;
      }
  
      if (least > currentAttendance || least < 0) {
        least = currentAttendance;
      }
    }
    average = total / filteredEvents.length;
  
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
      undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    );
  }
  
  function displayData() {
    const template = document.getElementById("eventData-template");
    const eventBody = document.getElementById("eventBody");
    //clear table first
    eventBody.innerHTML = "";
    //grab the events from local storage
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || [];
  
    if (curEvents.length == 0) {
      curEvents = events;
      localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    }
  
    for (let i = 0; i < curEvents.length; i++) {
      const eventRow = document.importNode(template.content, true);
      //grab only the columns in the template
      eventCols = eventRow.querySelectorAll("td");
  
      eventCols[0].textContent = curEvents[i].event;
      eventCols[1].textContent = curEvents[i].city;
      eventCols[2].textContent = curEvents[i].state;
      eventCols[3].textContent = curEvents[i].attendance;
      eventCols[4].textContent = new Date(
        curEvents[i].date
      ).toLocaleDateString();
  
      eventBody.appendChild(eventRow);
    }
  }
  
  function saveEventData() {
    //grab the events out of local storage
    let curEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
  
    //document.getElementById("newEventName");
    let obj = {};
    obj["event"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newEventCity").value;
  
    let stateSel = document.getElementById("newEventState");
    obj["state"] = stateSel.options[stateSel.selectedIndex].text
  
    obj["attendance"] = parseInt(
      document.getElementById("newEventAttendance").value,
      10
    );
  
    let eventDate = document.getElementById("newEventDate").value;
    let eventDate2 = `${eventDate} 00:00`
  
    obj["date"] = new Date(eventDate2).toLocaleDateString();
  
    curEvents.push(obj);
  
    localStorage.setItem("eventsArray", JSON.stringify(curEvents));
    //clear the form
    //Access the values from the form by ID and add an object to the array.
    buildDropDown();
    displayData();
  }