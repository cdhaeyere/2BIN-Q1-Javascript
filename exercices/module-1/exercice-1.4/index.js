const divRed = document.querySelector("#red");
const divOrange = document.querySelector("#orange");
const divGreen = document.querySelector("#green");

let direction = "down";

startApplication();

function startApplication() {
    setInterval(lightUp, 2000);
}

function lightUp() {

    if (divRed.style.backgroundColor === "" && divOrange.style.backgroundColor === "" && divGreen.style.backgroundColor === "") {
        divRed.style.backgroundColor = "red"
    } else {
        if (divRed.style.backgroundColor === divRed.id) {
            divRed.style.backgroundColor = ""
            divOrange.style.backgroundColor = divOrange.id
            direction = "down"
        } else if (divOrange.style.backgroundColor === divOrange.id && direction === "down") {
            divOrange.style.backgroundColor = ""
            divGreen.style.backgroundColor = divGreen.id
        } else if (divOrange.style.backgroundColor === divOrange.id && direction === "up") {
            divOrange.style.backgroundColor = ""
            divRed.style.backgroundColor = divRed.id
        } else {
            divGreen.style.backgroundColor = ""
            divOrange.style.backgroundColor = divOrange.id
            direction = "up"
        }
    }
}
