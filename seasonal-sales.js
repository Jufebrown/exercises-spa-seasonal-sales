var prodRequest = new XMLHttpRequest();
var catRequest = new XMLHttpRequest();
var prodTable;
var prodData;
var catData;
var prodLoaded;
var catLoaded;


prodRequest.addEventListener('load', prodLoad);
prodRequest.open('GET', 'products.json');
prodRequest.send();

catRequest.addEventListener('load', catLoad);
catRequest.open('GET', 'categories.json');
catRequest.send();

function getDiscount(departmentId) {
  var seasonSelected = document.querySelector(".season").value;
  var catSeason = catData.categories[departmentId].season_discount;
  var discount = catData.categories[departmentId].discount;
  if (seasonSelected === catSeason) {
    return discount;
  } else {
    discount = 0;
    return discount;
  }
}

function printProducts() {
  for (var i = 0; i < prodData.products.length; i++) {
    console.log('product name:',prodData.products[i].name);
    var prodName = prodData.products[i].name;
    var departmentId = prodData.products[i].category_id
    departmentId -= 1;
    console.log(departmentId, typeof(departmentId))
    var department = catData.categories[departmentId].name;
    console.log(department);
    getDiscount(departmentId);

    // prodTable += `<trow><td>${prodName}</td><td>${department}</td><td>${price}</td>`
  }
}

function allLoaded() {
  if (prodLoaded && catLoaded) {
    printProducts();
  }
}

function catLoad (catEvt) {
  catData = JSON.parse(catEvt.target.responseText);
  console.log('catData:',catData);
  catLoaded = true;
  allLoaded();
}

function prodLoad(prodEvt) {
  prodData = JSON.parse(prodEvt.target.responseText);
  console.log('prodData:',prodData);
  prodLoaded = true;
  allLoaded();
}
