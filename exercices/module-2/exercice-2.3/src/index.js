import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const numberOfLines = document.querySelector('#numberOfLines').value;
    const numberOfColumns = document.querySelector('#numberOfColumns').value;
    const initialString = document.querySelector('#initialString').value;

    createArray(numberOfLines, numberOfColumns, initialString);
});

function createArray(numberOfLines, numberOfColumns, initialString) {
    const array = new Array();
    for (let i = 0; i <= numberOfLines; i++) {
        const arrayLine = new Array();
        for (let j = 0; j <= numberOfColumns; j++) {
            arrayLine[arrayLine.length] = initialString + "[" + i + "][" + j + "]";
        }
        array[array.length] = arrayLine;
    }
    console.log(array);
    createHtmlTableAsString(array);
}

function createHtmlTableAsString(array) {
    let table = "<table>";
    for (const arrayLine of array) {
        table += "<tr>";
        for (const object of arrayLine) {
            table += "<td>" + object + "</td>";
        }
        table += "<tr>";
    }
    table += "</table>"
    const div = document.querySelector('div');
    div.innerHTML = table;
}

