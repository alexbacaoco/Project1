$(document).ready(function () {
    console.log("hello")
    // DECLARE DATABASE VARIABLE 
    var database = firebase.database();

    // INPUT IDS 
    var eventTitle = $("#event-title");
    var eventHost = $("#event-host");
    var eventDate = $("#event-date");
    var eventTime = $("#event-time");
    var eventLocation = $("#event-location");
    var eventDescription = $("#event-description");
// =================== FUNCTION ======================
    
    // FUNCITON TO REDIRECT PAGE 
    function submitForm() {
        // GET INPUT VALUES
        var titleValue = eventTitle.val().trim();
        var hostValue = eventHost.val().trim();
        var dateValue = eventDate.val().trim();
        var timeValue = eventTime.val().trim();
        var locationValue = eventLocation.val().trim();
        var descriptionValue = eventDescription.val().trim();
        // IF IPUT LEFT EMPTY DONT PUSH TO DATABASE
        if (titleValue === "" || 
            hostValue === "" || 
            dateValue === "" ||
            timeValue === "" || 
            locationValue === "") {
            // RUN FUCNTION FOR MISSING FEILDS
            console.log("Missing Info");
        } else { // ELSE PUSH VALUE TO THE DATABASE
            // PUSH THE DATA TO THE DATABASE 
            var newRef = database.ref().push({
                title: titleValue,
                host: hostValue,
                date: dateValue,
                time: timeValue,
                location: locationValue,
                description: descriptionValue
            });
            window.location = "event.html?id="+newRef.key
            // CLEAR INPUT FEILDS
            $("input").val("");
            $("textarea").val("");
        } // END ELSE STATEMENT
    };

// =================== ONCLICK ======================

    $("#add-event").on("click", function (event) {
        event.preventDefault();
        // CALL THE SUBMIT FUCNTION TO REDIRECT
        submitForm();
    }); // END CLICK FUNCTION
}); // END READY FUNCTION