var prodRequest = new XMLHttpRequest();
var catRequest = new XMLHttpRequest();
var prodTable;
var prodData;
var catData;
var prodLoaded;
var catLoaded;
var discount;


prodRequest.addEventListener('load', prodLoad);
prodRequest.open('GET', 'products.json');
prodRequest.send();

catRequest.addEventListener('load', catLoad);
catRequest.open('GET', 'categories.json');
catRequest.send();

function getDiscount(departmentId) {
  var seasonSelected = document.querySelector(".season").value;
  var catSeason = catData.categories[departmentId].season_discount;
  if (seasonSelected === catSeason) {
    discount = catData.categories[departmentId].discount;
  } else {
    discount = 0;
  }
}

function printProducts() {
  for (var i = 0; i < prodData.products.length; i++) {
    var prodName = prodData.products[i].name;
    var departmentId = prodData.products[i].category_id;
    departmentId -= 1;
    var department = catData.categories[departmentId].name;
    getDiscount(departmentId);
    var discountMultiplier = (1 - discount);
    var listPrice = prodData.products[i].price;
    var price = parseFloat(listPrice * discountMultiplier).toFixed(2);
    prodTable += `<tr><td>${prodName}</td><td>${department}</td><td>${price}</td></tr>`
  }
  var tbody =document.getElementById("products").innerHTML = prodTable;
}

function allLoaded() {
  if (prodLoaded && catLoaded) {
    printProducts();
  }
}

function catLoad (catEvt) {
  catData = JSON.parse(catEvt.target.responseText);
  catLoaded = true;
  allLoaded();
}

function prodLoad(prodEvt) {
  prodData = JSON.parse(prodEvt.target.responseText);
  prodLoaded = true;
  allLoaded();
}
