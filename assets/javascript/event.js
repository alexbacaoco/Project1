$(document).ready(function () {
    // ================= VARIABLES ===================

    // LINKING FIREBASE
    var database = firebase.database();
    // GET DATA ID PULLED FROM GETURLPARAMETER
    var id = getUrlParameter("id");

    // ================= FUNCTIONS ===================

    // DISPLAY CONTENT ON THE SCREEN
    function displayData(snapshot) {
        // ADD THE DATA TO THE CONTENT DIV
        $("#eventTitle").text(snapshot.val().title);
        $("#eventHost").text(snapshot.val().host);
        $("#eventDate").text(snapshot.val().date);
        $("#eventTime").text(snapshot.val().time);
        $("#eventLocation").text(snapshot.val().location);
        // CREATE VAR FOR DESCRIPTION DATA
        var des = snapshot.val().description;
        // IF DESCRIPTION HAS DATA DISPLAY        
        if(des != "") {
            // CREATE P TAG
            var p = $("<p>");
            // PLACE DESCRIPTION IN P TAG
            p.text(des);
            // APPEND P TAG TO EVENT INFO
            $("#event-info").append(p);
        };
    }; // END DISPLAYDATA FUNCTION 

    // DO QUERY
    console.log("id", id)
    // REFERENCE FORM.HTML INPUT FROM DATABASE
    database.ref().child(id).once("value").then(function (snapshot) {
        // CALL DISPLAY DATA FUNCTION
        displayData(snapshot);
    })

    // PULLS ID OUT OF URL AND RETURNS VALUE
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }; // END GET URL FUNCTION

    // ================= ON CLICKS ===================
    
}); // END READY FUNCTION