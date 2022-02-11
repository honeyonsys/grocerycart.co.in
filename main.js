// Loading sidebar from sidebar.html
var currentUrl = window.location.href;
console.log(currentUrl);
var request = new XMLHttpRequest();
request.open('GET', 'navigation.html', true);
request.onload = function() {
if (request.status >= 200 && request.status < 400) {
    var resp = request.responseText;
    document.querySelector('.navigationBar').innerHTML = resp;
    }
};
request.send();
// sidebar loading ends here

