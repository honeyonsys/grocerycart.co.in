function refreshCartCount(count) {
    try {
        document.querySelector('#cartCount').innerText = count;
    } 
    catch(err) {
        console.log("Error: " + err.message);
    }
}
// Loading sidebar from sidebar.html
var request = new XMLHttpRequest();
request.open('GET', 'navigation.html', true);
request.onload = function() {
if (request.status >= 200 && request.status < 400) {
        var resp = request.responseText;
        document.querySelector('.navigationBar').innerHTML = resp;
        // updating cart count on top navigation
        let cartItems = localStorage.getItem('Grocery-Cart');
        let cartJson = Array.from(JSON.parse(cartItems));
        refreshCartCount(cartJson.length);
    }
};
request.send();
// sidebar loading ends here

