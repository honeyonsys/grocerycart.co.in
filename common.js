// Loading sidebar from sidebar.html
var request = new XMLHttpRequest();
request.open('GET', 'sidebar.html', true);
request.onload = function() {
if (request.status >= 200 && request.status < 400) {
    var resp = request.responseText;
    document.querySelector('#headerSidebar').innerHTML = resp;
    }
};
request.send();
// sidebar loading ends here


document.addEventListener("DOMContentLoaded", function (event) {
   masonryBuild();
});

document.addEventListener("DOMContentLoaded", function (event) {
    navbarToggleSidebar();
    navActivePage();
  });