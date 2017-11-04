$(document).ready(function () {

    // DECLARE DATABASE VARIABLE 
    var database = firebase.database();

    // INPUT IDS 
    var eventTitle = $("#event-title");
    var eventHost = $("#event-host");
    var eventDate = $("#event-date");
    var eventTime = $("#event-time");
    var eventLocation = $("#event-location");
    var eventDescription = $("#event-description");

    // =================== FUNCTIONS =====================



    // =================== ONCLICK ======================

    $("#submit").on("click", function (event) {
        console.log("We in this b****!");
        event.preventDefault();
        // GET INPUT VALUES
        var titleValue = eventTitle.val().trim();
        console.log(titleValue);
        var hostValue = eventHost.val().trim();
        console.log(hostValue);
        var dateValue = eventDate.val().trim();
        console.log(dateValue);
        var timeValue = eventTime.val().trim();
        console.log(timeValue);
        var locationValue = eventLocation.val().trim();
        console.log(locationValue);
        var descriptionValue = eventDescription.val().trim();
        console.log(descriptionValue);
        // IF IPUT LEFT EMPTY DONT PUSH TO DATABASE
        if (titleValue === "" || 
            hostValue === "" || 
            dateValue === "" ||
            timeValue === "" || 
            locationValue === "") {
            console.log("Input feild missing.");
        } else { // ELSE VALUE IS THERE RUN THE CODE
            // PUSH THE DATA TO THE DATABASE 
            database.ref().push({
                title: titleValue,
                host: hostValue,
                date: dateValue,
                time: timeValue,
                location: locationValue,
                description: descriptionValue
            });
            // CLEAR INPUT FEILDS
            $("input").val("");
            $("textarea").val("");
        }
    }); // END CLICK FUNCTION
}); // END READY FUNCTION