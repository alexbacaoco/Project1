$(document).ready(function() {
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
        if (des != "") {
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
    database.ref().child(id).once("value").then(function(snapshot) {
        // CALL DISPLAY DATA FUNCTION
        displayData(snapshot);
    })

    // PULLS ID OUT OF URL AND RETURNS VALUE
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }; // END GETURL 

    // USE THE URL TO SHARE 
    function shareUrl() {
        // CREATE VARIABLES FOR SHARE IDS
        var email = $("#share-email");
        var twitter = $("#share-twitter");
        var whatsApp = $("#share-whatsApp");
        // SLICE THE - OFF THE ID
        id = id.slice(1);
        console.log(id);
        // PLACE ID IN THE URL
        var emailUrl = "https://api.addthis.com/oexchange/0.8/forward/email/offer?url=file%3A%2F%2F%2FUsers%2Fjoshuaspears%2FDesktop%2Fcoding_bootcamp%2Fprojects%2FProject1%2Fevent.html%3Fid%3D-&pubid=" + id + "&title=AddThis%20%7C%20Home&ct=1";
        var twitterUrl = "https://api.addthis.com/oexchange/0.8/forward/twitter/offer?url=file%3A%2F%2F%2FUsers%2Fjoshuaspears%2FDesktop%2Fcoding_bootcamp%2Fprojects%2FProject1%2Fevent.html%3Fid%3D-&pubid=" + id + "&title=AddThis%20%7C%20Home&ct=1";
        var whatsAppUrl = "https://api.addthis.com/oexchange/0.8/forward/whatsapp/offer?url=file%3A%2F%2F%2FUsers%2Fjoshuaspears%2FDesktop%2Fcoding_bootcamp%2Fprojects%2FProject1%2Fevent.html%3Fid%3D-&pubid=" + id + "&title=AddThis%20%7C%20Home&ct=1";
        // PLACE THE URL IN THE IDS
        email.attr("href", emailUrl);
        twitter.attr("href", twitterUrl);
        whatsApp.attr("href", whatsAppUrl);
    }; // END SHAREURL

    $("#uber-submit").on("click", function(e) {
        var geocoder = new google.maps.Geocoder();
        // should be gotten from firebase object
        // we need make event address a global variable
        var address = database.ref().val().location;
        console.log(address);

        geocoder.geocode({ address: address }, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var eventPos = {}
                eventPos.latitude = results[0].geometry.location.lat();
                eventPos.longitude = results[0].geometry.location.lng();

                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log(position)
                    getTimeEstimate(position, eventPos)
                    getPriceEstimate(position, eventPos)
                });
            }
        });

        e.preventDefault();
    })

    // CALL FUNCTIONS ON READY
    shareUrl();
    getTimeEstimate();
    getPriceEstimate();

     

    getTimeEstimate();
    getPriceEstimate();
    // ================= ON CLICKS ===================

}); // END READY FUNCTION

var uberClientId = "HWZlXCetxoYlYlDkGGuSwmX69jVQV-Pp",
    uberServerToken = "irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y";

//Estimated Trip Time Get Function
function getTimeEstimate(pos, eventPos) {

    var tripTime = document.getElementById('estimate');
    axios({
            headers: {
                Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
            },
            method: 'get',
            url: 'https://api.uber.com/v1.2/estimates/time?start_latitude=' + pos.coords.latitude + '&start_longitude=' +
                pos.coords.longitude + '&end_latitude=' + eventPos.latitude + '&end_longitude=' + eventPos.longitude
        })
        .then(function(response) {
            console.log(response)
            //doesnt need to be funxtion, display to HTML goes here
            $("#uber_x_time").text(response.data.times[0].estimate + " mins");
            $("#uber_xl_time").text(response.data.times[2].estimate + " mins");
            $("#uber_black_time").text(response.data.times[4].estimate + " mins");
        })
}
//Estimated Trip Price Get Function
function getPriceEstimate(pos, eventPos) {

    var tripPrice = document.getElementById('estimate');

    axios({
            headers: {
                Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
            },
            method: 'get',
            url: 'https://api.uber.com/v1.2/estimates/price?start_latitude=' + pos.coords.latitude + '&start_longitude=' +
                pos.coords.longitude + '&end_latitude=' + eventPos.latitude + '&end_longitude=' + eventPos.longitude
        })
        .then(function(response) {

            console.log(response)
            $("#uber_x_price").text(response.data.prices[0].estimate);
            $("#uber_xl_price").text(response.data.prices[2].estimate);
            $("#uber_black_price").text(response.data.prices[4].estimate);
        })

        .catch(function(error) {
            console.log(error)
        })

} // END GETPRICE FUNCTION

