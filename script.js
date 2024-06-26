const gameboard = (function() {
    board = new Array(9);

    for (let i = 0; i < 9; i++) {
        board[i] = "Null";
    }

    // Detect Matches function

    // 0 1 2
    // 3 4 5
    // 6 7 8

    const detectMatches = (position) => {
        if (board[position] !== "Null") {
            if (position === 0) {
                if (board[0] === board[1] && board[0] === board[2]) {
                    return "Win";
                }
                else if (board[0] === board[4] && board[0] === board[8]) {
                    return "Win";
                }
                else if (board[0] === board[3] && board[0] === board[6]) {
                    return "Win";
                }
            }
            else if (position === 1) {
                if (board[1] === board[4] && board[1] === board[7]) {
                    return "Win";
                }
            }
            else if (position === 2) {
                if (board[2] === board[4] && board[2] === board[6]) {
                    return "Win";
                }
                else if (board[2] === board[5] && board[2] === board[8]) {
                    return "Win";
                }
            }
            else if (position === 3) {
                if (board[3] === board[4] && board[3] === board[5]) {
                    return "Win";
                }
            }
            else if (position === 6) {
                if (board[6] === board[7] && board[6] === board[8]) {
                    return "Win";
                }
            }
        }
        else {
            return "Lose";
        }
    }

    return { board, detectMatches };
});

const player = (function() {
    let symbol = "X";
    let points = 0;
    let isTurn = false;

    const setSymbol = (playerSymbol) => {
        symbol = playerSymbol;
    }

    const getPoints = () => { return points };

    const incPoints = () => { points++ };

    return { setSymbol, getPoints, incPoints, isTurn };
});

const game = (function() {
    // 0 1 2
    // 3 4 5
    // 6 7 8

    // board = new Array(9);

    // Needs to instantiate two players and keep track of their score/placements.

    let currTurn = "X";

    const xPlayer = player();
    xPlayer.setSymbol("X");

    const oPlayer = player();
    oPlayer.setSymbol("O");

    const gameBoard = gameboard();

    const checkGame = () => {
        let winState = "Null";

        for (let i = 0; i < 7; i++) {
            if (gameBoard.detectMatches(i) === "Win") {
                winState = "Win";
                break;
            }
            else {
                winState = "Lose";
            }
        }
        // Uses Detect Matches function from gameboard object
        return winState;
        /* if (gameBoard.board[0] === "X" && gameBoard.board[1] === "X" && gameBoard.board[2] === "X") {
            return "Win";
        }
        else {
            return "Lose";
        } */
    }

    const takeTurn = (position) => {
        while (true) {
            if (gameBoard.board[position] === "X" || gameBoard.board[position] === "O" ){
                console.log("Please pick an empty space.");
                position = parseInt(prompt("Please pick an empty space."));
            }
            else {
                break;
            }
        }

        if (currTurn === "X") {
            gameBoard.board[position] = "X";
            if (checkGame() === "Win") {
                xPlayer.incPoints();
                console.log("Player X wins");
            }
            currTurn = "O";
        }
        else {
            gameBoard.board[position] = "O";
            if (checkGame() === "Win") {
                oPlayer.incPoints();
                console.log("Player O wins");
            }
            currTurn = "X";
        }

        return checkGame();
    }

    return { gameBoard, checkGame, takeTurn };
})();

let newGame = game;