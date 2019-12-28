window.onload = function () {
    let orders = JSON.parse(localStorage.getItem('Orders'));
    orders.forEach((elem) => {
        createRow(elem);
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
    console.log(obj.finalDate);
    if (obj.finalDate != "0001-01-01T00:00:00") {
        const table = document.getElementById("table").getElementsByTagName("tbody")[0];
        let row = document.createElement("tr");
        let date = new Date(obj.finalDate);
        
        date = "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getUTCFullYear();
        let date1 = new Date(obj.orderDate);
        date1 = "" + date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getUTCFullYear();
        createCell(row, obj.id);
        createCell(row, obj.client.name);
        createCell(row, obj.client.prodName);
        createCell(row, obj.goods.name);
        createCell(row, obj.amount);
        createCell(row, obj.sum);
        createCell(row, date1);
        createCell(row, date);

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

let print = document.getElementById("print");
print.onclick = function () {
    window.print();
}
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

document.getElementById("ok").onclick = function () {
    let select = document.getElementById("month");
    const table = document.getElementsByTagName("tr");
    let counter = table.length - 1;
    while (table.length > 1) {
        table[counter].remove();
        counter--;
    }
    let orders = JSON.parse(localStorage.getItem('Orders'));

    if (select.value != "A") {
        orders.forEach((elem) => {
            if (select.value == 'first' && new Date(elem.orderDate).getMonth() < 3) {
                createRow(elem);
            }
            else if (select.value == 'second' && new Date(elem.orderDate).getMonth() >= 3 && new Date(elem.orderDate).getMonth() < 6) {
                createRow(elem);
            }
            else if (select.value == 'third' && new Date(elem.orderDate).getMonth() >= 6 && new Date(elem.orderDate).getMonth() < 9) {
                createRow(elem);
            } 
            else if (select.value == 'fourth' && new Date(elem.orderDate).getMonth() >= 9 ) {
                createRow(elem);
            } 
        });
    }
    else {
        orders.forEach((elem) => {
            createRow(elem);
        });
    }
}