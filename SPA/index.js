let priceList = [2000, 3000, 1000, 500];
let goodsList = ["Kabluki", "Kolodki", "Podoshvi", "Gachki"];

function postData(url = '', data = {}) {
    // Значения по умолчанию обозначены знаком *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    })
        .then(response => response.json()); // парсит JSON ответ в Javascript объект
}
// let x = Get("http://localhost:5000/api/Clients/1");
// console.log(x);


let form = document.getElementById("submit");

function ClientGetDataInLocalStorage() {
    let json = getData('http://localhost:5000/api/Clients/').then((elements) => {
        localStorage.setItem('Clients', elements);
    });
    let elements = JSON.parse(localStorage.getItem('Clients'));
    let select = this.document.getElementById("companies");
    let options = select.children;
    let counter = options.length - 1;
    while (options.length) {
        options[counter].remove();
        counter--;
    }
    elements.forEach(el => {
        let option = document.createElement("option");
        option.value = el.name;
        option.innerHTML = el.name;
        select.appendChild(option);
    });
}

function GoodsGetDataInLocalStorage() {
    let json = getData('http://localhost:5000/api/Goods/').then((elements) => {
        localStorage.setItem('Goods', elements);
    });
    let elements = JSON.parse(localStorage.getItem('Goods'));
    let select = this.document.getElementById("goods");
    let options = select.children;
    let counter = options.length - 1;
    while (options.length) {
        options[counter].remove();
        counter--;
    }
    elements.forEach(el => {
        let option = document.createElement("option");
        option.value = el.name;
        option.innerHTML = el.name;
        select.appendChild(option);
    });
}

window.onload = function () {
    ClientGetDataInLocalStorage();
    GoodsGetDataInLocalStorage();
}

form.onclick = function () {
    let obj = {};
    let name = document.getElementById("name");
    let prodName = document.getElementById("prod_name");
    let phone = document.getElementById("phone");
    let email = document.getElementById("email");
    obj.Name = name.value;
    obj.ProdName = prodName.value;
    obj.Phone = phone.value;
    obj.Email = email.value;
    obj.Date = new Date();
    postData('http://localhost:5000/api/Clients/', obj)
        .then(data => {
            ClientGetDataInLocalStorage();
            console.log(JSON.stringify(data))
        }) // JSON-строка полученная после вызова `response.json()`
        .catch(error => {
            ClientGetDataInLocalStorage();
            console.error(error)
        });
    name.value = '';
    prodName.value = '';
    phone.value = '';
    email.value = '';
}

let form2 = document.getElementById("submit1");

form2.onclick = function () {
    let obj = {};
    let companyName = document.getElementById("companies").value;
    let elements = JSON.parse(localStorage.getItem('Clients'));
    elements.forEach((el) => {
        if (el.name == companyName) {
            obj.ClientId = el.id;
        }
    });
    let goodsName = document.getElementById("goods").value;
    obj.GoodsId = goodsList.indexOf(goodsName) + 1 || null;
    let amount = document.getElementById("amount");
    obj.Amount = +amount.value;
    obj.Sum = Number(amount.value) * priceList[goodsList.indexOf(goodsName)];
    obj.FinalDate = new Date().now;
    postData('http://localhost:5000/api/Orders/', obj)
        .then(data => {
            console.log(JSON.stringify(data));
            GoodsGetDataInLocalStorage();
        }) // JSON-строка полученная после вызова `response.json()`
        .catch(error => {
            console.error(error);
            GoodsGetDataInLocalStorage();
        });
    document.getElementById("amount").value = 500;
    document.getElementById("price").value = "";    
}

async function getData(url) {
    const response = await fetch(url)
    const myJson = await response.json();
    return JSON.stringify(myJson);
}

let amount = document.getElementById("amount");
let price = document.getElementById("price");
let goods = document.getElementById("goods");
amount.onchange = function sumDisplay(){
    price.value = +amount.value * priceList[goodsList.indexOf(goods.value)];
}