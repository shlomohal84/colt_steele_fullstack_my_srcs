let player1Score = 0;
let player2Score = 0;
const scoreBoard = document.querySelector('#score');
const player1Span = document.createElement('span');
const player2Span = document.createElement('span');
const winScore = document.querySelector('#max-score-select');

const setScoreBoard = () => {
    player1Score = 0;
    player2Score = 0;
    scoreBoard.innerText = '';
    player1Span.innerText = player1Score;
    player1Span.style.color = 'black';
    player1Span.setAttribute('id', 'player1');
    player2Span.innerText = player2Score;
    player2Span.style.color = 'black';
    player2Span.setAttribute('id', 'player2');
    scoreBoard.append('Score: ', player1Span, ' to ', player2Span);
    scoreBoard.style.color = 'black';
};

setScoreBoard();


const btnPlayer1Point = document.querySelector('#player1-add-point');
const btnPlayer2Point = document.querySelector('#player2-add-point');
const btnReset = document.querySelector('#reset-score');


btnPlayer1Point.addEventListener('click', function () {
    if (player1Score < winScore.value - 1) {
        player1Score++;
        player1Span.style.color = 'blue';
        player2Span.style.color = 'black';
        player1Span.innerText = player1Score;
    } else {
        player1Score++;
        scoreBoard.style.color = 'blue';
        scoreBoard.innerText = `Player 1 Wins! Score: ${player1Score} to ${player2Score}`;
        console.log(`player 1 wins! Score: ${player1Score} to ${player2Score}`);
        player1Score = 0;
        player2Score = 0;
        lockButtons();
    }
});
btnPlayer2Point.addEventListener('click', function () {
    if (player2Score < winScore.value - 1) {
        player2Score++;
        player2Span.style.color = 'red';
        player1Span.style.color = 'black';
        player2Span.innerText = player2Score;
    } else {
        player2Score++;
        scoreBoard.style.color = 'red';
        scoreBoard.innerText = `Player 2 Wins! Score: ${player1Score} to ${player2Score}`;
        console.log(`player 2 wins! Score: ${player1Score} to ${player2Score}`);
        player1Score = 0;
        player2Score = 0;
        lockButtons();
    }
});

const lockButtons = () => {
    btnPlayer1Point.setAttribute('disabled', '');
    btnPlayer1Point.style.backgroundColor = 'lightgray';
    btnPlayer1Point.style.color = 'gray';
    btnPlayer2Point.setAttribute('disabled', '');
    btnPlayer2Point.style.backgroundColor = 'lightgray';
    btnPlayer2Point.style.color = 'gray';
    winScore.setAttribute('disabled', '');
};

btnReset.addEventListener('click', function () {

    setScoreBoard();
    btnPlayer1Point.removeAttribute('disabled', '');
    btnPlayer1Point.style.backgroundColor = 'blue';
    btnPlayer1Point.style.color = 'white';
    btnPlayer2Point.removeAttribute('disabled', '');
    btnPlayer2Point.style.backgroundColor = 'red';
    btnPlayer2Point.style.color = 'white';
    winScore.removeAttribute('disabled');


});

