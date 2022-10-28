const allNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let randomNumber;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const genNumber = () => {
    randomNumber = allNumbers.slice(0);
    shuffle(randomNumber);
    randomNumber = randomNumber.slice(0, 4);
}

const getNumber = () => {
    if (!randomNumber) {
        genNumber()
    }
    return randomNumber;
}

export { genNumber, getNumber };