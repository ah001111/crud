var nameInput = document.getElementById('nameInput');
var categoryInput = document.getElementById('categoryInput');
var priceInput = document.getElementById('priceInput');
var descriptionInput = document.getElementById('descriptionInput');
var tbody = document.getElementById('tbody');
var addBtn = document.getElementById('addBtn');
var clearbtt = document.getElementById('clearbtt');
var searchinput = document.getElementById('searchinput');


var alertMessage1 = document.querySelector('.alertMessage1');
var alertMessage2 = document.querySelector('.alertMessage2');
var alertMessage3 = document.querySelector('.alertMessage3');
var alertMessage4 = document.querySelector('.alertMessage4');


var indexContainer = 0;

addBtn.addEventListener('click', function () {
    if (addBtn.innerHTML !== 'update product') {
        createProduct();
    }
    else {
        updateproduct_2(indexContainer);
        clearform();
        addBtn.innerHTML = 'add product';
    }
})

// ===================================create Product========================================

if (localStorage.getItem('productdate') !== null) {
    var Productarray = JSON.parse(localStorage.getItem('productdate'));
    allproduct = Productarray;
    displaytable();
}
else {
    var allproduct = [];
}


function removeValid(){
    nameInput.classList.remove('is-valid');
    priceInput.classList.remove('is-valid');
    categoryInput.classList.remove('is-valid');
    descriptionInput.classList.remove('is-valid');
}


class product{
    constructor(productname, productcategory, productprice, productdescription) {
        this.productname = productname;
        this.productcategory = productcategory;
        this.productprice = productprice;
        this.productdescription = productdescription;
    }
}


function createProduct() {

    var p = new product(nameInput.value ,  categoryInput.value , priceInput.value ,  descriptionInput.value);


    if (validateproductname() && validateproductcategory() && validateproductprice() && validateproductdescription()) {

        allproduct.push(p);

        var stringdate = JSON.stringify(allproduct);

        localStorage.setItem('productdate', stringdate);

        removeValid();
    }


}


// ===================================clear form========================================

function clearform() {
    nameInput.value = "";
    categoryInput.value = "";
    priceInput.value = "";
    descriptionInput.value = "";
}
addBtn.addEventListener('click', clearform);
clearbtt.addEventListener('click', clearform)

// ==================================Retrive Product====================================

function RetriveProduct() {
    var trs = '';
    for (var i = 0; i < allproduct.length; i++) {
        trs = `<tr>
        <td>${i}</td>
    <td>${allproduct[i].productname} </td>
    <td>${allproduct[i].productcategory} </td>
    <td>${allproduct[i].productprice} </td>
    <td>${allproduct[i].productdescription} </td>
    <td>
        <button onclick="updateproduct(${i})" class="btn btn-warning">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
    </td>
    <td>
        <button onclick="delateproduct(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
        </button>
    </td>
    </tr>`

    }

    tbody.innerHTML += trs;
}
addBtn.addEventListener('click', RetriveProduct)

// ================================display table=====================================

function displaytable() {

    var trs = '';
    for (var i = 0; i < allproduct.length; i++) {
        trs += `<tr>
        <td>${i}</td>
    <td>${allproduct[i].productname} </td>
    <td>${allproduct[i].productcategory} </td>
    <td>${allproduct[i].productprice} </td>
    <td>${allproduct[i].productdescription} </td>
    <td>
        <button onclick="updateproduct(${i})" class="btn btn-warning">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
    </td>
    <td>
        <button onclick="delateproduct(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
        </button>
    </td>
    </tr>`

    }

    tbody.innerHTML = trs;
}
addBtn.addEventListener('click', displaytable);

// ===================================search Product===================================

function searchProduct() {

    var searchword = searchinput.value
    var trs = '';
    for (var i = 0; i < allproduct.length; i++) {
        if (allproduct[i].productname.toLowerCase().includes(searchword.toLowerCase())) {
            trs += `<tr>
            <td>${i}</td>
        <td>${allproduct[i].productname} </td>
        <td>${allproduct[i].productcategory} </td>
        <td>${allproduct[i].productprice} </td>
        <td>${allproduct[i].productdescription} </td>
        <td>
            <button onclick="updateproduct(${i})" class="btn btn-warning">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </td>
        <td>
            <button onclick="delateproduct(${i})" class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
        </tr>`

        }
    }

    tbody.innerHTML = trs;
}
searchinput.addEventListener('keyup', searchProduct);

// =================================delate product===================================

function delateproduct(index) {

    allproduct.splice(index, 1);
    localStorage.setItem('productdate', JSON.stringify(allproduct));
    displaytable();

}

// ==================================update product===================================

function updateproduct(i) {

    indexContainer = i;

    nameInput.value = allproduct[i].productname;
    categoryInput.value = allproduct[i].productcategory;
    priceInput.value = allproduct[i].productprice;
    descriptionInput.value = allproduct[i].productdescription;

    addBtn.innerHTML = 'update product';
}

function updateproduct_2(index) {

    // var product = {
    //     productname: nameInput.value,
    //     productcategory: categoryInput.value,
    //     productprice: priceInput.value,
    //     productdescription: descriptionInput.value
    // }

    var p = new product(nameInput.value ,  categoryInput.value , priceInput.value ,  descriptionInput.value)

    allproduct.splice(index, 1, p);
    console.log(allproduct);

    localStorage.setItem('productdate', JSON.stringify(allproduct));
    displaytable();
    removeValid();
}

// ==================================validate name===================================

function validateproductname() {

    var productnameregex = /^[A-Z][a-z]{3,15}[0-9]{0,3}$/;
    var pname = nameInput.value;

    if (productnameregex.test(pname)) {

        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        alertMessage1.classList.replace('d-flex', 'd-none');
        return true;
    }
    else {

        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid')
        alertMessage1.classList.replace('d-none', 'd-flex');
        return false;
    }

}

nameInput.addEventListener('blur', validateproductname);

// ==================================validate Category===================================

function validateproductcategory() {

    var productcategoryregex = /^[A-Z][a-z]{2,10}[0-9]{3,5}$/;
    var pcategory = categoryInput.value;

    if (productcategoryregex.test(pcategory)) {
        categoryInput.classList.add('is-valid');
        categoryInput.classList.remove('is-invalid');
        alertMessage2.classList.replace('d-flex', 'd-none');
        return true;
    }
    else {
        categoryInput.classList.add('is-invalid');
        categoryInput.classList.remove('is-valid');
        alertMessage2.classList.replace('d-none', 'd-flex');
        return false;

    }

}

categoryInput.addEventListener('blur', validateproductcategory);

// ==================================validate price===================================

function validateproductprice() {

    var productpriceregex = /^[0-9][0-9]{3,4}$/;
    var pprice = priceInput.value;

    if (productpriceregex.test(pprice)) {
        priceInput.classList.add('is-valid');
        priceInput.classList.remove('is-invalid');
        alertMessage3.classList.replace('d-flex', 'd-none');
        return true;
    }
    else {
        priceInput.classList.add('is-invalid');
        priceInput.classList.remove('is-valid');
        alertMessage3.classList.replace('d-none', 'd-flex');
        return false;

    }

}

priceInput.addEventListener('blur', validateproductprice);


// ==================================validate description===================================

function validateproductdescription() {

    var productdescriptionregex = /^[A-Z][a-z]{3,15}$/;
    var pdescription = descriptionInput.value;

    if (productdescriptionregex.test(pdescription)) {
        descriptionInput.classList.add('is-valid');
        descriptionInput.classList.remove('is-invalid');
        alertMessage4.classList.replace('d-flex', 'd-none');
        return true;
    }
    else {
        descriptionInput.classList.add('is-invalid');
        descriptionInput.classList.remove('is-valid');
        alertMessage4.classList.replace('d-none', 'd-flex');
        return false;

    }

}

descriptionInput.addEventListener('blur', validateproductdescription);


