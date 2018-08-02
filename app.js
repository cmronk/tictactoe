// we will need setup
var origBoard;
var user = "0";
var ai = "X";
var winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [6, 4, 2]
];
var cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys());
    // console.log(origBoard);
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = " ";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false);
    }
}

function turnClick(square) {
    // console.log(square.target.id)
    turn(square.target.id, user)
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    var gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        // if element = player, concat i(index)
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

// determine winner
function gameOver(gameWon){
    for(var index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = 
        gameWon.player == user ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i ++) {
        cells[i].removeEventListener("click", turnClick, false)
    }
}
// basic AI and winner


// minimax algorithm