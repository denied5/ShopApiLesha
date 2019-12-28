window.onload = function () {
    getData('http://localhost:5000/api/Orders/').then((elements) => {
        localStorage.setItem('Orders', elements);
    });
    getData('http://localhost:5000/api/Warehouses/').then((elements) => {
        localStorage.setItem('Warehouses', elements);
    });
    let elements = JSON.parse(localStorage.getItem('Warehouses'));
    elements.forEach((elem) => {
        elem.Goods.forEach((el) => {
            createRow(el.Goods.Name,el.Quatity);
        });
    });
    addOptionItems(elements);
}

function addOptionItems(elements) {
    let select = document.getElementById("ware");
    elements.forEach((el) => {
        let node = document.createElement("option");
        node.innerHTML = el.Name;
        select.appendChild(node);
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

function createRow(name, amount) {
    const table = document.getElementById("table").getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    // let date = new Date(obj.date);
    // date = "" + date.getDay() + "." + (date.getMonth() + 1) + "." + date.getUTCFullYear();
    createCell(row, name);
    createCell(row, amount);

    table.appendChild(row);
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
        a = a.childNodes[0].innerHTML;
        b = b.childNodes[0].innerHTML;
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

// let sort1 = document.getElementById("sort1");
// sort1.onclick = sortTableById;

let sort3 = document.getElementById("sort3");
sort3.onclick = sortTableByGoodsName;

// let sort4 = document.getElementById("sort4");
// sort4.onclick = sortTableByOrdererName;

// let sort5 = document.getElementById("sort5");
// sort5.onclick = sortTableByOrdererName;

// let sort2 = document.getElementById("sort2");
// sort2.onclick = sortTableByDate;

// let print = document.getElementById("print");
// print.onclick = function () {
//     window.print();
// }
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


document.getElementById("ok").onclick = function (event) {
    let select = document.getElementById("ware");
    const table = document.getElementsByTagName("tr");
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    let wares = JSON.parse(localStorage.getItem('Warehouses'));
    let currentWare;
    if (select.value != "all") {
        wares.forEach((el) => {
            if (el.Name == select.value) {
                currentWare = el.Goods;
            }
        });
            currentWare.forEach((elem) => {
                createRow(elem.Goods.Name,elem.Quatity);
            });
    }
    else {
        wares.forEach((elem) => {
            elem.Goods.forEach((el) => {
                createRow(el.Goods.Name,el.Quatity);
            });
        });
    }
}
async function getData(url) {
    const response = await fetch(url)
    const myJson = await response.json();
    return JSON.stringify(myJson);
}
