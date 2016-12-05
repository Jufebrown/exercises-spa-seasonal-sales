var prodRequest = new XMLHttpRequest();
var catRequest = new XMLHttpRequest();

prodRequest.addEventListener('load', ????????);
prodRequest.open('GET', 'products.json');
prodRequest.send();

catRequest.addEventListener('load', ???????);
catRequest.open('GET', 'categories.json');
catRequest.send();
