//this js file is for event.html

//We are going to be making HTTP request using axios

//3 API requests: HTML (geolocation), Google Maps (event lat/long), Uber (time estimate), Uber (price estimate)


//API used: Uber API
//To-Do: display these results within browser, ensure geolocation is working, ensure event lat/long are properly inputted from Google API
function timeEstimate(pos, eventPos) {

    var tripTime = document.getElementById('estimated time');
    axios({
            headers: {
                Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
            },
            method: 'get',
            url: 'https://api.uber.com/v1.2/estimates/time?start_latitude=' + position.coords.latitude + '&start_longitude=' +
                position.coords.longitude + '&end_latitude=' + eventPos.latitude + '&end_longitude=' + eventPos.longitude
        })

        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
}

//API used: Uber API
//To-Do: display these results within browser, ensure geolcation is working, ensure event lat/long are properly inputted from Google API
function priceEstimate(pos, eventPos) {

    var tripPrice = document.getElementById('estimated price');

    axios({
            headers: {
                Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
            },
            method: 'get',
            url: 'https://api.uber.com/v1.2/estimates/price?start_latitude=' + position.coords.latitude + '&start_longitude=' +
                position.coords.longitude + '&end_latitude=' + eventPos.latitude + '&end_longitude=' + eventPos.longitude
        })
        .then(function(response) {
            
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
}


//----------------------------------To Add To Google API----------------------------------------
//APIs used: Google Maps and HTML geolocation
//This needs to go in Alex's Google API code?
var geocoder = new google.maps.Geocoder();
var address = event-location;
//use jquery here to get the event address thee user inputted

geocoder.geocode({ 'event-location': address }, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
        var eventPos = {}
        eventPos.latitude = results[0].geometry.location.lat();
        eventPos.longitude = results[0].geometry.location.lng();

        navigator.geolocation.getCurrentPosition(function(getPosition) {
            console.log(position)
            timeEstimate(position, eventPos)
            priceEstimate(position, eventPos)
        });
    }
});