// console.log('Script loaded successfuly');

const player1 = {
    score: 0,
    button: document.querySelector('#player1Button'),
    display: document.querySelector('#player1Display'),
};
const player2 = {
    score: 0,
    button: document.querySelector('#player2Button'),
    display: document.querySelector('#player2Display'),
};




const resetButton = document.querySelector('#resetButton');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

player1.button.addEventListener('click', function () {
    updateScores(player1, player2);
});

player2.button.addEventListener('click', function () {
    updateScores(player2, player1);
});

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [player1, player2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}