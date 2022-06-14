import minimist from "minimist";

const args = minimist(process.argv);
const qty = args["QTYRECIBED"];

let randomNumbers = [];

for (let i = 0; i < qty; i++) {
    randomNumbers.push(Math.floor(Math.random() * 1000) + 1);
}

const countOcurrences = (arr) =>
    arr.reduce((obj, e) => {
        obj[e] = (obj[e] || 0) + 1;
        return obj;
    }, {});


process.send(countOcurrences(randomNumbers));