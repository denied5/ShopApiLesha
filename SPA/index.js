

function Get (url)
{
    let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    var answer;
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    xhr.send();
}

let x = Get("http://localhost:5000/api/Clients/1");
console.log(x);