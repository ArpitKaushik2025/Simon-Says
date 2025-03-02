let level = document.querySelector("#level");
let green = document.querySelector(".green");
let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let blue = document.querySelector(".blue"); 
let score = document.querySelector("#score");
let hscore = document.querySelector("#high-score");
let reset = document.querySelector("#reset");
let allBtns = document.querySelectorAll(".btn");
let help = document.querySelector("#help");

let gameCount = 1;
let started = false;
let gameSeq = [];
let userSeq = [];
let highScore = 0;
let userScore = 0;

let btns = ["green", "red", "yellow", "blue"];

// Disable buttons before Game Starts
if (started == false) {
    allBtns.forEach(element => {
        element.disabled = true;
    });  
} 

// Game Flash Button
const gameFlash = (btn) => {
    btn.classList.add("gameFlash");
    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 250);
}

// Flash previous buttons
const flash2 = (idx, delay) => {
    let newBtn = document.querySelector(`.${gameSeq[idx]}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            gameFlash(newBtn);
            resolve();
        }, delay)
    })
}

const flashBtns = async () => {
    for (let i = 0; i < gameSeq.length; i++){
        await flash2(i, 500);
    }
    await randomBtn();
}

// User Flash Button
const userFlash = (btn) => {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 50);
}

// Generate random Button
const randomBtn = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let randInt = Math.floor(Math.random() * 4);
            let randCol = btns[randInt];
            let rndBtn = document.querySelector(`.${randCol}`);
            gameSeq.push(randCol);
            gameFlash(rndBtn);
            started = true;
            if (started == true) {
                allBtns.forEach(element => {
                element.disabled = false;
                });
            }
            resolve();
        }, 500); 
    })
    
}

// Start Game
const gameStart = () => { 
    score.innerText = "";
    reset.innerText = "";
    started = true;
    if (started == true) {
    allBtns.forEach(element => {
        element.disabled = false;
    });
    }
    level.innerText = `Level ${gameCount}`;
    randomBtn();
    document.removeEventListener("keypress", gameStart);
}

// Game Lost 
const gameLost = () => {
    level.innerText = "You Lost. Game Ended.....";
    reset.innerText = "Press any key to restart";
    score.innerText = `Your score is : ${userScore}`;
    document.addEventListener("keypress", gameStart);
    started = false;
    allBtns.forEach(element => {
        element.disabled = true;
    });
    gameSeq = [];
    userSeq = [];
    gameCount = 1;
    if (userScore > highScore){
        highScore = userScore;
        hscore.innerText = `High Score : ${highScore}`;
    }
    userScore = 0;    
}

// Game Won
const gameWon = () => {
    started = false
    if (started == false) {
        allBtns.forEach(element => {
            element.disabled = true;
        });  
    }
    userSeq = [];
    gameCount++;
    userScore++
    level.innerText = `Level ${gameCount}`;
    flashBtns();
}

// Check condition 
const check = () => {
    for (let i = 0; i < userSeq.length; i++){
        if (userSeq[i] != gameSeq[i]) {
            gameLost();
        } else {
            if (i === gameSeq.length - 1) {
                setTimeout(() => {
                    gameWon();
                }, 1000);
            } 
        }
    }
}

// User choices
green.addEventListener("click", () => {
    userFlash(green);
    userSeq.push('green');
    if (gameCount === 1) {
        if (gameSeq[0] === userSeq[0]) {
            setTimeout(() => {
                gameWon();
            }, 1000);
        } else {
            gameLost();
        }
    } else {
        check();
    }
})

red.addEventListener("click", () => {
    userFlash(red);
    userSeq.push('red');
    if (gameCount === 1) {
        if (gameSeq[0] === userSeq[0]) {
            setTimeout(() => {
                gameWon();
            }, 1000);
        } else {
            gameLost();
        }
    } else {
        check();
    }
})

yellow.addEventListener("click", () => {
    userFlash(yellow);
    userSeq.push('yellow');
    if (gameCount === 1) {
        if (gameSeq[0] === userSeq[0]) {
            setTimeout(() => {
                gameWon();
            }, 1000);
        } else {
            gameLost();
        }
    } else {
        check();
    }
})

blue.addEventListener("click", () => {
    userFlash(blue);
    userSeq.push('blue');  
    if (gameCount === 1) {
        if (gameSeq[0] === userSeq[0]) {
            setTimeout(() => {
                gameWon();
            }, 1000);
        } else {
            gameLost();
        }
    } else {
        check();
    }
})

document.addEventListener("keypress", gameStart);