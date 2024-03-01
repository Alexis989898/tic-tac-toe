const Gameboard = (function() {

    let board = Array(9).fill("");
    let turnPlayer = "X";

    const getBoard = function() {
        return board;
    }

    const getTurnPlayer = function() {
        return turnPlayer;
    }

    const setBoard = function(newBoard) {
        board = newBoard;
    };

    const setTurnPlayer = function(newTurnPlayer) {
        turnPlayer = newTurnPlayer;
    };

    const updateBoard = function(e, textDiv) {
        const clickedElement = e.target;
        const number = clickedElement.getAttribute("number");

        if (board[number] == "X" || board[number] == "O") {
            if (!winCheck(textDiv)) {
                textDiv.innerText = "Choose an available space";
            }
        } else {
            clickedElement.classList.add("checked");
            clickedElement.innerText = turnPlayer;
            board[number] = turnPlayer;
            const win = winCheck(textDiv);
            if(!win) { 
                switchPlayer(textDiv); 
            };
        }

        const boardSpaces = document.querySelectorAll(".boardspace");
        boardSpaces.forEach(space => space.setAttribute("data-player", turnPlayer));
    };

    const switchPlayer = function (textDiv) {
        if (turnPlayer == "X") {
            turnPlayer = "O";
        } else {
            turnPlayer = "X";
        }
        textDiv.innerText = turnPlayer + "'s turn";
    };

    const winCheck = function (textDiv) {
        let win = false;
        for (let i = 0; i < 3; i++) {
            if (
                (board[i * 3] == turnPlayer &&
                    board[i * 3 + 1] == turnPlayer &&
                    board[i * 3 + 2] == turnPlayer)
                ||
                (board[i] == turnPlayer &&
                    board[i + 3] == turnPlayer &&
                    board[i + 6] == turnPlayer)
            ) {
                textDiv.innerText = turnPlayer + " won!";
                win = true;
                break;
            }
        }
        if (
            (board[0] == turnPlayer &&
                board[4] == turnPlayer &&
                board[8] == turnPlayer)
            ||
            (board[2] == turnPlayer &&
                board[4] == turnPlayer &&
                board[6] == turnPlayer)
        ) {
            textDiv.innerText = turnPlayer + " won!";
            win = true;
        }
        if (!board.includes("") && !win) {
            textDiv.innerText = "Draw";
            win = true;
        }
        return win;
    };

    return {
        getBoard: getBoard,
        getTurnPlayer: getTurnPlayer,
        updateBoard: updateBoard,
        switchPlayer: switchPlayer,
        winCheck: winCheck,
        setBoard: setBoard,
        setTurnPlayer: setTurnPlayer
    };
})();

const display = (function() {
    // Getting divs
    const divBoard = document.querySelector("#board");
    const textDiv = document.querySelector("#text-div");
    const resetButton = document.querySelector(".reset-btn");

    // Reset button logic
    resetButton.addEventListener("click", function() {
        Gameboard.setBoard(Array(9).fill(""));
        Gameboard.setTurnPlayer("X");
        textDiv.innerText = Gameboard.getTurnPlayer() + "'s turn";

        const boardSpaces = document.querySelectorAll(".boardspace");

        boardSpaces.forEach(space => {
            space.classList.remove("checked");
            space.innerText = "";
        });

        boardSpaces.forEach(space => {
            space.setAttribute("data-player", Gameboard.getTurnPlayer());
        });
    });

    textDiv.innerText = Gameboard.getTurnPlayer() + "'s turn";

    // Creating board
    for (let i = 0; i < 9; i++) {
        const boardElement = document.createElement("div");
        boardElement.className = "boardspace";
        boardElement.setAttribute("number", i);
        boardElement.setAttribute("data-player", Gameboard.getTurnPlayer());
        boardElement.addEventListener("click", (e) => Gameboard.updateBoard(e, textDiv));
        boardElement.innerText = Gameboard.getBoard()[i];
        divBoard.appendChild(boardElement);
    }
})();

const switchlight = (function() {
    const switchBtn = document.querySelector(".darkswitch-btn");
    const darkIcon = document.querySelector(".dark-icon");
    const lightIcon = document.querySelector(".light-icon");
    let body = document.body;

    switchBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        darkIcon.classList.toggle("hidden-display");
        lightIcon.classList.toggle("hidden-display");
    });
})();