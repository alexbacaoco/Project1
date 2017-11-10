//this js file goes with google-api.html

function performGetRequest1() {

	var resultElement = document.getElementById('getResult1');
	resultElement.innerHTML = '';

	axios.get(' ')
	.then(function(response) {
		resultElement.innerHTML = generateSuccessHTMLOutput(response);
	})
	.catch(function(error) {
		resultElement.innerHTML = generateErrorHTMLOutput(error);
	});
}
