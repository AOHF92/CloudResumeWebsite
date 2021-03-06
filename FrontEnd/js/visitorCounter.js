window.addEventListener('DOMContentLoaded', (event) => {
	getVisitorCount();
});

const apiUrl = "https://getcounter.azurewebsites.net/api/HttpTriggerforcrw?code=";
const appendUrl = "xSSWM4sojDKrguuFLh6EITzgm/fu7KFk/xxT5FYvJjDsRLkv2tzMxQ==";

const getVisitorCount = () => {
fetch([apiUrl, appendUrl].join(''))
	.then(response => {
		return response.json();
	})
	.then (response => {
		console.log('Fetch succeeded.');
		console.log(response);
		count = response.VisitorCount;
		document.getElementById('visitor').innerHTML = 'This page has been visited ' + count + ' times.';
	})
	.catch(error => {
		console.error('Fetch operation failed:', error);
	});
}
