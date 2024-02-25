let Gameboard = {
    board: Array(9).fill(""),
    turnPlayer: "X",
    updateBoard: function(e) {
        const clickedElement = e.target;
        const number = clickedElement.getAttribute("number");
        if(this.board[number] == "X" || this.board[number] == "O") {
            if(!(this.winCheck)) {
                textDiv.innerText = "Choose an available space";
            }
        } else {
            clickedElement.innerText = this.turnPlayer;
            this.board[number] = this.turnPlayer;
            const win = this.winCheck();
            if(!win) {this.switchPlayer();};
        }

        console.log(this.board);
    },
    switchPlayer: function() {
        if(this.turnPlayer == "X") {
            this.turnPlayer = "O";
        } else {
            this.turnPlayer = "X";
        }
        textDiv.innerText = Gameboard.turnPlayer + "'s turn";
    },
    winCheck: function() {
        let win = false;
        for(let i = 0; i < 3; i++) {
            if(
                (this.board[i * 3] == this.turnPlayer &&
                this.board[i * 3 + 1] == this.turnPlayer &&
                this.board[i * 3 + 2] == this.turnPlayer) 
                    ||
                (this.board[i] == this.turnPlayer &&
                this.board[i + 3] == this.turnPlayer &&
                this.board[i + 6] == this.turnPlayer)
            ) {
                textDiv.innerText = this.turnPlayer + " won!";
                win = true;
                break;
            }
        }
        if( 
            (this.board[0] == this.turnPlayer &&
            this.board[4] == this.turnPlayer &&
            this.board[8] == this.turnPlayer)
                ||
            (this.board[2] == this.turnPlayer &&
                this.board[4] == this.turnPlayer &&
                this.board[6] == this.turnPlayer)
            )  {
                textDiv.innerText = this.turnPlayer + " won!";
                win = true;
            }
        if(!Gameboard.board.includes("") && !win) {
            textDiv.innerText = "Draw";
            win = true;
        }
        return win;
    }
};

const divBoard = document.getElementById("board");
const textDiv = document.getElementById("text-div");

textDiv.innerText = Gameboard.turnPlayer + "'s turn";

for(let i = 0; i < Gameboard.board.length; i++) {
    const boardElement = document.createElement("div");
    boardElement.className = "boardspace";
    boardElement.setAttribute("number", i);
    boardElement.addEventListener("click", () => Gameboard.updateBoard(event));
    boardElement.innerText = Gameboard.board[i];
    divBoard.appendChild(boardElement);
}