//https request using axios


//2 API requests: time estimate and price estimate
//constants: party address

// axios({
//     headers: {
//         Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
//     }
//     method: 'get',
//     url: 'https://api.uber.com/v1.2/estimates/time?start_latitude=37.7752315&start_longitude=-122.418075'
// })


//will have to connect this to the Uber HTML 
function timeEstimate() {

    var tripTime = document.getElementById('estimated time');
    axios({
            headers: {
                Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
            },
            method: 'get',
            url: 'https://api.uber.com/v1.2/estimates/time?start_latitude=37.7752315&start_longitude=-122.418075'
        })
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
}

//will have to connect this to the Uber HTML 
function priceEstimate() {

    var tripPrice = document.getElementById('estimated price');

    axios({
            headers: {
                Authorization: "Token irb_NpHpH3aMuWFLs5Lghb-ZW557cZi5WZH4Qv0y"
            },
            method: 'get',
            url: 'https://api.uber.com/v1.2/estimates/price?start_latitude=37.7752315&start_longitude=-122.418075&end_latitude=37.7752415&end_longitude=-122.518075'
        })
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
        })
}

timeEstimate()
priceEstimate()