//this js file is for event.html

//API used: Uber API
//To-Do: display these results within browser, ensure geolocation is working, ensure event lat/long are properly inputted from Google API

// Uber API constants
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
            $("#uber_xl_time").text(response.data.times[2].estimate+ " mins");
            $("#uber_black_time").text(response.data.times[4].estimate+ " mins");
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
    }  

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

// //dataRef.ref().on("#uber-submit", function (snap) {
//     eventLocation = snap.val();
// }); 

//Estimated Trip Time Post Function
// document.getElementById('timeModal').addEventListener('onclick', performPostRequest);
// function displayTimeEstimate(e) {

//     var tripPrice = document.getElementById('estimate');
//     var uberX = document.getElementById('estimate').value;
//     var uberXL = document.getElementById('estimate').value;
//     resultElement.innerHTML = '';

//     axios({
//             headers: {
//                 Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
//             },
//             method: 'post',
//             url: 'https://api.uber.com/v1.2/estimates/time?start_latitude=' + pos.coords.latitude + '&start_longitude=' +
//                 pos.coords.longitude + '&end_latitude=' + eventPos.latitude + '&end_longitude=' + eventPos.longitude,
//         })
//         .then(function(response) {
//             console.log("lol")
//             debugger;
//             console.log(response);
//             //doesnt need to be funxtion, display to HTML goes here
//             $("#time").text(response.data.times[0].estimate)

//         })

//         .catch(function(error) {
//             console.log(error)

//         })

//     e.preventDefault();
// }

//Estimated Trip Price Post Function
// function displayPriceEstimate(e) {

//     var tripPrice = document.getElementById('estimate');
//     var uberX = document.getElementById('estimate').value;
//     var uberXL = document.getElementById('estimate').value;
//     resultElement.innerHTML = '';

//     axios({
//             headers: {
//                 Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
//             },
//             method: 'post',
//             url: 'https://api.uber.com/v1.2/estimates/price?start_latitude=' + position.coords.latitude + '&start_longitude=' +
//                 position.coords.longitude + '&end_latitude=' + eventPos.latitude + '&end_longitude=' + eventPos.longitude,
//         })
//         .then(function(response) {
//             console.log(response)
//             resultElement.innerHTML = generateSuccessHTMLOutput(response);
//         })

//         .catch(function(error) {
//             console.log(error)
//             resultElement.innerHTML = generateErrorHTMLOutput(error);
//         })
//     e.preventDefault();
// }

//4 API requests: HTML (geolocation), Google Maps (event lat/long), Uber (time estimate), Uber (price estimate)

// //----------------------------------To Add To Google API----------------------------------------
// //APIs used: Google Maps and HTML geolocation
// //This needs to go in Alex's Google API code?
// var geocoder = new google.maps.Geocoder();
// var address = event-location;
// // //use jquery here to get the event address thee user inputted

// geocoder.geocode({ 'event-location': address }, function(results, status) {

//     if (status == google.maps.GeocoderStatus.OK) {
//         var eventPos = {}
//         eventPos.latitude = results[0].geometry.location.lat();
//         eventPos.longitude = results[0].geometry.location.lng();

//         navigator.geolocation.getCurrentPosition(function(getPosition) {
//             console.log(position)
//             timeEstimate(position, eventPos)
//             priceEstimate(position, eventPos)
//         });
//     }
// });

