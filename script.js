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
    let name = "";
    let points = 0;
    let isTurn = false;

    const setSymbol = (playerSymbol) => {
        symbol = playerSymbol;
    }

    const setName = (playerName) => {
        name = playerName;
    }

    const getName = () => { return name };

    const setPoints = (playerPoints) => {
        points = playerPoints;
    }

    const getPoints = () => { return points };

    const incPoints = () => { points++ };

    return { setSymbol, setName, getName, setPoints, getPoints, incPoints, isTurn };
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
    xPlayer.setName("Player 1");

    const oPlayer = player();
    oPlayer.setSymbol("O");
    oPlayer.setName("Player 2");

    const xPlayerScore = document.querySelector("#p1Score");
    const oPlayerScore = document.querySelector("#p2Score");

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
                alert("Please pick an empty space.");
                return;
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
                alert(`Winner: ${xPlayer.getName()}`);
                xPlayerScore.textContent = `Score: ${xPlayer.getPoints()}`;
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
                alert(`Winner: ${oPlayer.getName()}`);
                oPlayerScore.textContent = `Score: ${xPlayer.getPoints()}`;
            }
            currTurn = "X";
        }

        return checkGame();
    }

    const getScores = () => {
        console.log(`X Player: ${xPlayer.getPoints()}, O Player: ${oPlayer.getPoints()}`);
    }


    const xPlayerName = document.querySelector("#p1Name");
    xPlayerName.addEventListener("change", (e) => {
        xPlayer.setName(e.target.value);
    });

    const oPlayerName = document.querySelector("#p2Name");
    oPlayerName.addEventListener("change", (e) => {
        oPlayer.setName(e.target.value);
    });

    const resetGameBtn = document.querySelector("#resetBtn");
    resetGameBtn.addEventListener("click", (e) => {
        gameBoard.clearBoard();
        xPlayerName.setAttribute("value", "Player 1");
        oPlayerName.setAttribute("value", "Player 2");
        xPlayer.setName("Player 1");
        xPlayer.setPoints(0);
        oPlayer.setName("Player 2");
        oPlayer.setPoints(0);
        xPlayerScore.textContent = "Score: 0";
        oPlayerScore.textContent = "Score: 0";
    });

    return { gameBoard, checkGame, takeTurn, getScores, xPlayer, oPlayer };
})();

let ticTacToeGame = game;
ticTacToeGame.gameBoard.clearBoard();

/* const gameBody = document.querySelector(".gameBody");

const space0 = document.createElement("input");
space0.setAttribute("class", "space");


gameBody.appendChild(space0); */