// variable to store and loop through scheduler
var myDay = [
    {
        //12 hour and 24 hour clock
        id: "0",
        hour: "12",
        time: "12",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "01",
        time: "01",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "02",
        time: "02",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "03",
        time: "03",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "4",
        hour: "04",
        time: "04",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "5",
        hour: "05",
        time: "05",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "6",
        hour: "06",
        time: "06",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "7",
        hour: "07",
        time: "07",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "8",
        hour: "08",
        time: "08",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "09",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "10",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "11",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: "",
    },
    {
        // This ends the 12 hour window and begins the 24 hour window
        id: "12",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "13",
        hour: "1",
        time: "13",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "14",
        hour: "2",
        time: "14",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "15",
        hour: "3",
        time: "15",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "16",
        hour: "4",
        time: "16",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "17",
        hour: "5",
        time: "17",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "18",
        hour: "6",
        time: "18",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "19",
        hour: "7",
        time: "19",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "20",
        hour: "8",
        time: "20",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "21",
        hour: "9",
        time: "21",
        meridiem: "pm",
        reminder: "",
    },
    {
        id: "22",
        hour: "10",
        time: "22",
        meridiem:"pm",
        reminder: "",
    },
    {
        id: "23",
        hour: "11",
        time: "23",
        meridiem: "pm"

    },
    
    
]

// Header DATA
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// Timer DATA
function getHeaderTime() {
    var currentHeaderTime = moment().format('h: mm: ssa Z');
    $("#currentTime").text(currentHeaderTime);
}


// saves data to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// loads header date
getHeaderDate();

// loads header time
getHeaderTime();

// creates the visuals for the scheduler body
myDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after components created
init();


// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})