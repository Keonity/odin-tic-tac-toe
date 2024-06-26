const gameboard = (function() {
    board = new Array(9);

    // Detect Matches function

    return { board };
});

const game = (function() {
    // 0 1 2
    // 3 4 5
    // 6 7 8

    // board = new Array(9);

    // Needs to instantiate two players and keep track of their score/placements.

    const gameBoard = gameboard();

    const checkGame = () => {
        // Uses Detect Matches function from gameboard object
        if (gameBoard.board[0] === "X" && gameBoard.board[1] === "X" && gameBoard.board[2] === "X") {
            return "Win";
        }
        else {
            return "Lose";
        }
    }

    return { gameBoard, checkGame };
})();

let newGame = game;