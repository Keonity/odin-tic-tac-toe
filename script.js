const gameboard = (function() {
    let spaceCounter = 0;
    board = new Array(9);

    for (let i = 0; i < 9; i++) {
        board[i] = "Null";
    }

    // Detect Matches function

    // 0 1 2
    // 3 4 5
    // 6 7 8

    const createSpace = () => {
        const gameBody = document.querySelector(".gameBody");

        const space = document.createElement("input");
        space.setAttribute("class", "space");
        space.setAttribute("id", spaceCounter++);
        space.setAttribute("type", "button");
        space.addEventListener("click", (e) => {
            // console.log(e.target.id);
            game.takeTurn(e.target.id);
        });

        gameBody.appendChild(space);
    }

    const clearBoard = () => {

        const gameboardParent = document.querySelector(".gameBody");
        while (gameboardParent.firstChild) {
            gameboardParent.removeChild(gameboardParent.lastChild);
        }

        for (let i = 0; i < 9; i++) {
            board[i] = "Null";
            createSpace();
        }
        spaceCounter = 0;
    }

    const detectBoardFill = () => {
        for (let i = 0; i < 9; i++) {
            if (board[i] === "Null") {
                return false;
            }
        }
        return true;
    }

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

            if (detectBoardFill()) {
                return "Draw";
            }
            else {
                return "No match";
            }
        }
        else {
            return "No match";
        }
    }

    return { board, detectMatches, clearBoard, createSpace };
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
                gameBoard.clearBoard();
                console.log("Reset Game");
                break;
            }
            else if (gameBoard.detectMatches() === "Draw") {
                winState = "Draw";
                gameBoard.clearBoard();
                console.log("Reset Game");
                break;
            }
            else {
                // winState = "Lose";
            }
        }

        return winState;
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
            const xPlace = document.getElementById(position);
            xPlace.setAttribute("value", "X");
            if (checkGame() === "Win") {
                xPlayer.incPoints();
                console.log("Player X wins");
                currTurn = "X";
            }
            else {
                currTurn = "O";
            }
        }
        else {
            const oPlace = document.getElementById(position);
            oPlace.setAttribute("value", "O");
            gameBoard.board[position] = "O";
            if (checkGame() === "Win") {
                oPlayer.incPoints();
                console.log("Player O wins");
            }
            currTurn = "X";
        }

        return checkGame();
    }

    const getScores = () => {
        console.log(`X Player: ${xPlayer.getPoints()}, O Player: ${oPlayer.getPoints()}`);
    }

    return { gameBoard, checkGame, takeTurn, getScores };
})();

let newGame = game;
newGame.gameBoard.clearBoard();

/* const gameBody = document.querySelector(".gameBody");

const space0 = document.createElement("input");
space0.setAttribute("class", "space");


gameBody.appendChild(space0); */