// GET PARAM
var database = firebase.database();
var id = getUrlParameter("id");
// DO QUERY
console.log("id", id)
database.ref().child(id).once("value").then(function(snapshot) {
    console.log("yo")
    console.log(snapshot.val());
    // ===== START HTML MANIPULATION ========
    console.log(database.raf().child(id));
})


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};