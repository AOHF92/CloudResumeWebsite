
const apiUrl = "https://httpservice.azurewebsites.net";
const appendUrl = "";

fetch([apiUrl, appendUrl].join(''))
	.then(response => {
		return response.json();
	})
	.then (response => {
		console.log('Fetch succeeded to the function.');
		console.log(response);
		count = response.VisitorCount;
		document.getElementById('visitor').innerHTML = 'This page has been visited' + count + '.';
	})
	.catch(error => {
		console.error('Fetch operation failed:', error);
	});