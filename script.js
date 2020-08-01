function generateTable(table, data) {
    let count = 1;
    table = table.getElementsByTagName('tbody')[0];
    for (let element of data) {
        let row = table.insertRow();
        let th = document.createElement("th");
        let text = document.createTextNode(count++);
        th.setAttribute("scope", "row");
        th.appendChild(text);
        row.appendChild(th);
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function makeRequest(url, callback) {
    http_request = new XMLHttpRequest();
    http_request.onreadystatechange = callback;
    http_request.open('GET', url, true);

    http_request.send();
}

function fetchAndOrder() {

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let people = [];

        for (i = 0; i < data.results.length; i++) {
            let person = new Object();
            person.firstName = data.results[i].name.first;
            person.lastName = data.results[i].name.last;
            person.age = data.results[i].dob.age;
            person.city = data.results[i].location.city;

            people.push(person);
        }

        people.sort((a, b) => a.firstName < b.firstName ? -1 : (a.firstName > b.firstName ? 1 : 0));

        let table = document.querySelector("#table1");
        generateTable(table, people);
    }
}

function fetchAndFind() {
    let age = document.getElementById("age").value;

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let people = data.results;
        let peopleFiltered = [];
        let person = new Object();

        people.sort((a, b) => a.dob.age < b.dob.age ? -1 : (a.dob.age > b.dob.age ? 1 : 0));

        for (i = 0; i < people.length; i++) {
            if (people[i].dob.age >= age) {
                let person = new Object();
                person.firstName = people[i].name.first;
                person.lastName = people[i].name.last;
                person.age = people[i].dob.age;
                person.city = people[i].location.city;
                peopleFiltered.push(person)
                break;
            }
        }

        let table = document.querySelector("#table2");
        let body = table.getElementsByTagName('tbody')[0];
            body.innerHTML = '';

        generateTable(table, peopleFiltered);
        // console.log(person);
    }
}

function fetchAndCount() {

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let people = [];

        for (i = 0; i < data.results.length; i++) {
            let person = new Object();
            person.firstName = data.results[i].name.first;
            person.lastName = data.results[i].name.last;
            person.letterCount = letterCount(person.firstName + person.lastName);

            people.push(person);
        }

        people.sort((a, b) => a.firstName < b.firstName ? -1 : (a.firstName > b.firstName ? 1 : 0));

        let table = document.querySelector("#table3");
        generateTable(table, people);
    }
}

function letterCount(text){
    let countStrings = [], x;
    text = text.toLowerCase().split('').sort().join('');
    let match = text.match(/([a-z])\1+/g);

    if (match != null && match != undefined) {
        match.sort(function(a, b){
            return a.length> b.length? -1: 1;
        });

        if (match.length > 0) {
            x = match[0].length;
            while(match.length && match[0].length == x){
                countStrings.push(match.shift().charAt(0));
            }
        }
        return countStrings.join(' y ')+' aparece '+x+' veces.'
    }
    return 'No hay letras repetidas.'
}

function fastestShip() {

    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let starships = [];
        console.log(data)
        // for (i = 0; i < data.results.length; i++) {
        //     let person = new Object();
        //     person.firstName = data.results[i].name.first;
        //     person.lastName = data.results[i].name.last;
        //     person.letterCount = letterCount(person.firstName + person.lastName);

        //     people.push(person);
        // }

        // people.sort((a, b) => a.firstName < b.firstName ? -1 : (a.firstName > b.firstName ? 1 : 0));

        // let table = document.querySelector("#table3");
        // generateTable(table, people);
    }
}


let dynamicSeed = 'rootstack' + Date.now();

// Fetch & order
let url1 = 'https://randomuser.me/api/?results=10&seed='+dynamicSeed;
makeRequest(url1, fetchAndOrder);

// Fetch & find
let url2 = 'https://randomuser.me/api/?results=10&seed='+dynamicSeed;
document.getElementById('search-by-age').addEventListener('click', function (e) {
    e.preventDefault();
    makeRequest(url2, fetchAndFind);
});

// Fetch & count
let url3 = 'https://randomuser.me/api/?results=5&seed='+dynamicSeed;
makeRequest(url3, fetchAndCount);

// Fastest ship
let url4 = 'https://swapi.dev/starships/';
makeRequest(url4, fastestShip);

