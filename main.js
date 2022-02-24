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
// loading footer from footer.html
var request2 = new XMLHttpRequest();
request2.open('GET', 'footer.html', true);
request2.onload = function() {
if (request2.status >= 200 && request2.status < 400) {
        var resp = request2.responseText;
        document.querySelector('.footerArea').innerHTML = resp;
    }
};
request2.send();

// sidebar loading ends here

function hideAddToCartPopUp(){
    document.querySelector('.addQuantityPopUp').style.visibility = 'hidden';
}
function selectProductForCart(productId, productAmount, productName, productImage) {
    try {
        document.querySelector('.addQuantityPopUp').style.visibility = "visible";
        let cartProducts = localStorage.getItem('Grocery-Cart');
        let jsonData = Array.from(JSON.parse(cartProducts));
        let previousQuantity = 0;

        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].id == productId) {
                previousQuantity = jsonData[i].qty;
                break;
            }
        }
        let fieldQuantity = document.querySelector('#qtyNumber');
        let fieldProductId = document.querySelector('#selectedProductId');
        let fieldProductName = document.querySelector('#selectedProductName');
        let fieldProductAmount = document.querySelector('#selectedProductAmount');
        let fieldProductImage = document.querySelector('#selectedProductImage');
        let productNameArea = document.querySelector('.addToCartProductDesc');
        fieldQuantity.value = previousQuantity;
        fieldProductId.value = productId;
        fieldProductName.value = productName;
        fieldProductAmount.value = productAmount;
        fieldProductImage.value = productImage;
        productNameArea.innerHTML = productName + ", ₹"+productAmount;
        
    }
    catch(err) {
        console.log("Error: " + err.message);
    }
}
function addtocart(productId, productAmount, productName, productImage) {
    try {
        var cartProducts = localStorage.getItem('Grocery-Cart');
        var jsonData = Array.from(JSON.parse(cartProducts));
        var isProductAddedInCart = 0;

        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].id == productId) {
                isProductAddedInCart = 1;
                break;
            }
        }
        if(isProductAddedInCart == 0) {
            jsonData.push({"id": productId, "amount": productAmount, "qty": 1, "productName": productName, "productImage": productImage});
            refreshCartCount(jsonData.length);
            localStorage.setItem('Grocery-Cart', JSON.stringify(jsonData));
        }
    
    }
    catch(err) {
        console.log("Error: " + err.message);
    }
    
}
function updateQuantity(productId, quantity) {
    try {
        var cartProducts = localStorage.getItem('Grocery-Cart');
        var jsonData = Array.from(JSON.parse(cartProducts));
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].id == productId) {
                jsonData[i].qty = quantity;
                break;
            }
        }
        localStorage.setItem('Grocery-Cart', JSON.stringify(jsonData));
    }
    catch(err) {
        console.log("Error: " + err.message);
    }
}
// setting up cart key in localstorage
let cartProducts = localStorage.getItem('Grocery-Cart');
if(cartProducts == null) {
    localStorage.setItem('Grocery-Cart', '[]');
}

function incrementDecrement(operator) {
    let quantity = document.querySelector('#qtyNumber');
    let productId = document.querySelector('#selectedProductId');
    let productName = document.querySelector('#selectedProductName');
    let productAmount = document.querySelector('#selectedProductAmount');
    let productImage = document.querySelector('#selectedProductImage');
    let quantityNumber = parseInt(quantity.value);
    if(quantityNumber == 0) {
        addtocart(productId.value, productAmount.value, productName.value, productImage.value);
    } else if(quantityNumber > 0) {
        updateQuantity(productId.value, quantityNumber);
    }
    operator === 'increase' ? quantity.stepUp() : quantity.stepDown();
    
}

//loading products from the json file
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'products.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}