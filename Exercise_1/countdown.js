function countdown(num) {
    let temp = num;
    let interval = setInterval(() => {
        if (temp === 0) {
            console.log("DONE!");
            clearInterval(interval);
        } else {
            console.log(temp--);
        }
    }, 1000);
}

function randomGame() {
    let tries = 0;
    let interval = setInterval(() => {
        let num = Math.random();
        tries++;
        if (num > 0.75) {
            console.log("Number of Tries: ", tries);
            clearInterval(interval);
        }
    }, 1000);
}

countdown(5);
randomGame();