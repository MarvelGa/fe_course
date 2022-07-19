/* START TASK 1: Your code goes here */
let specialCellIndex = 5;
let firstCellIndex = 0;
let fourthCellIndex = 3;
let seventhCellIndex = 6;
let oneNumber = 1;
let secondNumber = 2;
let rowLength = 3;

const squares = document.querySelectorAll('.grid div');
for (let element of squares) {
    element.style.backgroundColor = 'white';
}

squares.forEach((element, index) => element.addEventListener('click', function () {
    element.style.backgroundColor = 'yellow';

    if (index === specialCellIndex) {
        document.querySelectorAll('.grid div').forEach(el => {
                if (el.style.backgroundColor === 'white') {
                    el.style.backgroundColor = 'green';
                }
            }
        )
    }

    if (index === firstCellIndex || index === fourthCellIndex || index === seventhCellIndex) {
        if (squares[index + oneNumber].style.backgroundColor !== 'yellow' &&
            squares[index + secondNumber].style.backgroundColor !== 'yellow') {
            for (let i = 0; i < rowLength; i++) {
                squares[index + i].style.backgroundColor = 'blue';
            }
        }
    }

}));
/* END TASK 1 */

/* START TASK 2: Your code goes here */
const button = document.querySelector('#submitButton');
const message = document.querySelector('#message');
const inputText = document.querySelector('#phone-number');
const symbolAmount = 13;
button.disabled = true;

button.onclick = () => {
    message.innerHTML = 'Data was successfully sent'
    message.style.backgroundColor = 'green';
    return false;
}

inputText.oninput = () => {
    inputText.style.border = '2px solid black'
    let text = inputText.value.trim();
    if (text.length === symbolAmount) {
        let regex = /^[+][380][0-9]{11}/;
        if (regex.test(text)) {
            message.innerHTML = '';
            message.style.backgroundColor = 'white';
            button.disabled = false;
        } else {
            button.disabled = true;
            message.style.backgroundColor = 'salmon';
            message.innerHTML = `Type number does not follow formant <br /> +380*********`;
            inputText.style.border = '3px solid red'
        }
    } else {
        button.disabled = true;
        message.innerHTML = '';
        message.style.backgroundColor = 'white';
    }
}
/* END TASK 2 */

/* START TASK 3: Your code goes here */
let canvas = document.getElementById('c1');
let ctx = canvas.getContext('2d');
let gameMessage = document.getElementById('gameMessage');

let ballHeight = 40;
let ballWidth = 40;
let ballRadius = 20;

let ballStartX = 280;
let ballStartY = 145;

let timeOut = 3000;
let quantityRadius = 2;

let bucketTeamAX1 = 9;
let bucketTeamAX2 = 24;
let bucketTeamAY1 = 136.7;
let bucketTeamAY2 = 151.1;

let bucketTeamBX1 = 536.5;
let bucketTeamBX2 = 551.5;
let bucketTeamBY1 = 136.7;
let bucketTeamBY2 = 151.1;

drawBall(ballStartX, ballStartY);

canvas.addEventListener('mousedown', (e) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left - ballRadius;
    let y = e.clientY - rect.top - ballRadius;

    drawBall(x, y);

    if (x >= bucketTeamAX1 && x <= bucketTeamAX2 && y >= bucketTeamAY1 && y <= bucketTeamAY2) {
        let event = new CustomEvent('goal', {
            detail: {
                team: 'TeamB'
            }
        });
        canvas.dispatchEvent(event);
    }

    if (x >= bucketTeamBX1 && x <= bucketTeamBX2 && y >= bucketTeamBY1 && y <= bucketTeamBY2) {
        let event = new CustomEvent('goal', {
            detail: {
                team: 'TeamA'
            }
        });
        canvas.dispatchEvent(event);
    }

});

canvas.addEventListener('goal', e => {
    if (e.detail.team === 'TeamB') {
        let score = document.getElementById('scoreTeamB');
        let currentScore = score.textContent;
        score.innerText = `${parseInt(currentScore) + 1}`;
        gameMessage.style.color = 'red';
        gameMessage.innerText = 'Team B score!'
        window.setTimeout(function () {
            gameMessage.innerText = '';
        }, timeOut);
    } else {
        let score = document.getElementById('scoreTeamA');
        let currentScore = score.textContent;
        score.innerText = `${parseInt(currentScore) + 1}`;
        gameMessage.style.color = 'blue';
        gameMessage.innerText = 'Team A score!'
        window.setTimeout(function () {
            gameMessage.innerText = '';
        }, timeOut);
    }
});

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * quantityRadius);
    ctx.arc.background = new Image();
    ctx.arc.background.src = './assets/ball.png';
    ctx.arc.background.onload = function () {
        ctx.drawImage(ctx.arc.background, x, y, ballHeight, ballWidth);
    }
    ctx.closePath();
}
/* END TASK 3 */
