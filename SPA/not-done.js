window.onload = function () {
    let row = document.getElementsByTagName("tr");
    let orders = JSON.parse(localStorage.getItem('Orders'));
    orders.forEach((elem) => {
        createRow(elem);
    });
    Array.prototype.forEach.call(row, (elem, index, arr) => {
        elem.addEventListener('click', modalWindow);
    });
}

async function getData(url) {
    const response = await fetch(url)
    const myJson = await response.json();
    return JSON.stringify(myJson);
}

function createCell(row, value) {
    let t = document.createElement("td");
    t.appendChild(document.createTextNode(value));
    row.appendChild(t);
}

function createRow(obj) {
    if (obj.finalDate == "0001-01-01T00:00:00") {
        const table = document.getElementById("table").getElementsByTagName("tbody")[0];
        let row = document.createElement("tr");
        let date = new Date(obj.orderDate);
        date = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getUTCFullYear();
        createCell(row, obj.id);
        createCell(row, obj.client.name);
        createCell(row, obj.client.prodName);
        createCell(row, obj.goods.name);
        createCell(row, obj.amount);
        createCell(row, obj.sum);
        createCell(row, date);
        let select = document.createElement("select");
        select.setAttribute("class", "form-control");
        for (let i in obj.warehouses) {
            let option = document.createElement("option");
            option.innerHTML = obj.warehouses[i].name;
            select.appendChild(option);
        }
        row.appendChild(select);
        table.appendChild(row);
    }
}

function sortTableById() {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    const table = document.getElementsByTagName("tr");
    let arr = Array.from(table).slice(1);
    arr = arr.sort(function (a, b) {
        a = parseInt(a.firstChild.innerHTML);
        b = parseInt(b.firstChild.innerHTML);
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    });
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    for (let i = 0; i < arr.length; i++) {
        tbody.appendChild(arr[i]);
    }
}

function sortTableByGoodsName() {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    const table = document.getElementsByTagName("tr");
    let arr = Array.from(table).slice(1);
    arr = arr.sort(function (a, b) {
        a = a.childNodes[3].innerHTML;
        b = b.childNodes[3].innerHTML;
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    });
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    for (let i = 0; i < arr.length; i++) {
        tbody.appendChild(arr[i]);
    }
}

function sortTableByOrdererName() {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    const table = document.getElementsByTagName("tr");
    let arr = Array.from(table).slice(1);
    arr = arr.sort(function (a, b) {
        a = a.childNodes[1].innerHTML;
        b = b.childNodes[1].innerHTML;
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    });
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    for (let i = 0; i < arr.length; i++) {
        tbody.appendChild(arr[i]);
    }
}

function sortTableByDate() {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    const table = document.getElementsByTagName("tr");
    let arr = Array.from(table).slice(1);
    arr = arr.sort(function (a, b) {
        a = a.childNodes[6].innerHTML;
        b = b.childNodes[6].innerHTML;
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    });
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    for (let i = 0; i < arr.length; i++) {
        tbody.appendChild(arr[i]);
    }
}

function sortTableByCompanyName() {
    const tbody = document.getElementById("table").getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    const table = document.getElementsByTagName("tr");
    let arr = Array.from(table).slice(1);
    arr = arr.sort(function (a, b) {
        a = a.childNodes[2].innerHTML;
        b = b.childNodes[2].innerHTML;
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    });
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    for (let i = 0; i < arr.length; i++) {
        tbody.appendChild(arr[i]);
    }
}

let sort1 = document.getElementById("sort1");
sort1.onclick = sortTableById;

let sort3 = document.getElementById("sort3");
sort3.onclick = sortTableByGoodsName;

let sort4 = document.getElementById("sort4");
sort4.onclick = sortTableByOrdererName;

let sort5 = document.getElementById("sort5");
sort5.onclick = sortTableByOrdererName;

let sort2 = document.getElementById("sort2");
sort2.onclick = sortTableByDate;

let search = document.getElementById("search");
let searchSubmit = document.getElementById("search-submit");

searchSubmit.onclick = function () {
    let expression = new RegExp(search.value);
    let orders = JSON.parse(localStorage.getItem('Orders'));
    const table = document.getElementsByTagName("tr");
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    orders.forEach((elem) => {
        if (isFound(elem, expression)) {
            createRow(elem);
        }
    })
}

function isFound(obj, expression) {
    for (i in obj) {
        if (typeof obj[i] == 'object') {
            for (j in obj[i]) {
                if (expression.test(obj[i][j])) {
                    return true;
                }
            }
        }
        if (expression.test(obj[i])) {
            return true;
        }
    }
    return false;
}
let arrOfElem = [];
function modalWindow(event) {
    console.log(event.target.tagName);
    if (event.target.tagName == 'SELECT') return;
    let title = document.getElementById("myModalLabel");
    let body = document.getElementsByClassName("modal-body")[0];

    let id = event.currentTarget.firstChild.innerHTML;
    let wareName = event.currentTarget.lastChild.value ;
    console.log(event.currentTarget.children);

    title.innerHTML = "Замовлення номер " + id;

    body.innerHTML = "Ім'я замовника: " + event.currentTarget.children[1].innerHTML + "<br>";
    body.innerHTML += "Назва підприємства: " + event.currentTarget.children[2].innerHTML + "<br>";
    body.innerHTML += "Найменування товару: " + event.currentTarget.children[3].innerHTML + "<br>";
    body.innerHTML += "Кількість замовленної продукції: " + event.currentTarget.children[4].innerHTML + "<br>";
    body.innerHTML += "Сума: " + event.currentTarget.children[5].innerHTML + " грн" + "<br>";
    body.innerHTML += "Cклад: " + event.currentTarget.children[7].value + "<br>";
    body.innerHTML += "<input type='button' id='print' value='Надрукувати квитанцію' onclick='window.print();' />";

    event.target.setAttribute("data-toggle", "modal");
    event.target.setAttribute("data-target", "#myModal");


    document.getElementById("submit-modal").onclick = function () {
        $("#myModal").modal("hide");
        let seekInOrders = JSON.parse(localStorage.getItem('Orders'));
        let wareId = null;
        seekInOrders.forEach((el) => {
            if (parseInt(el.id) == parseInt(id)) {
                for(let i = 0; i < el.warehouses.length; i++){
                    if(el.warehouses[i].name == wareName){
                        wareId = el.warehouses[i].id;
                    }
                }
                
            }
        });
        putData('http://localhost:5000/api/Orders/' + id + "/" + wareId)
            .then(data => {
                console.log(JSON.stringify(data));
            }) // JSON-строка полученная после вызова `response.json()`
            .catch(error => {
                console.error(error);
            });

        const table = document.getElementsByTagName("tr");
        let counter = table.length - 1;
        while (table.length > 1) {
            table[counter].remove();
            counter--;
        }
        let orders = JSON.parse(localStorage.getItem('Orders'));
        orders.forEach((elem) => {
            createRow(elem);
        });

    }
}


function GoodsGetDataInLocalStorage() {
    let json = getData('http://localhost:5000/api/Orders/').then((elements) => {
        localStorage.setItem('Orders', elements);
    });
}


function putData(url = '', data = {}) {
    // Значения по умолчанию обозначены знаком *
    return fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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

// document.getElementById("show").onchange = function (event) {
//     if (event.target.checked) {
//         const table = document.getElementsByTagName("tr");
//         let counter = table.length - 1;
//         while (table.length > 1) {
//             table[counter].remove();
//             counter--;
//         }
//         let orders = JSON.parse(localStorage.getItem('Orders'));

//         orders.forEach((elem) => {
//             if (elem.IsAble) {
//                 createRow(elem);
//             }
//         });
//     }
//     else {
//         const table = document.getElementsByTagName("tr");
//         let counter = table.length - 1;
//         while (table.length > 1) {
//             table[counter].remove();
//             counter--;
//         }
//         let orders = JSON.parse(localStorage.getItem('Orders'));
//         orders.forEach((elem) => {
//             createRow(elem);
//         });
//     }
// }