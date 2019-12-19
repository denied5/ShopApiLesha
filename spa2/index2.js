window.onload = function() {
    getData('http://localhost:5000/api/Orders/').then((elements) => {
        localStorage.setItem('Orders', elements);
    });
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
    const table = document.getElementById("table").getElementsByTagName("tbody")[0]; 
    let row = document.createElement("tr");
    createCell(row,obj.id);
    createCell(row,obj.client.name);
    createCell(row,obj.prodName);
    createCell(row,obj.goods.name);
    createCell(row,obj.amount);
    createCell(row,obj.sum);
    createCell(row,obj.date);
    
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
