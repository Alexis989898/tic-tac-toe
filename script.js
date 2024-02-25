let Gameboard = {
    board: Array.from({ length: 10 }, (_, index) => index),
    turnPlayer: "X",
    printBoard: function() {
        let boardString = "";
        for(let i = 0; i < 9; i++) {
            boardString += this.board[i];
            if(i % 3 === 2 && i < 8) {
                boardString += "\n---------\n";
            } else if(i < 8) {
                boardString += " | ";
            }
        }
        console.log(boardString);
    },
    playerAction: function() {
        let playerChoice = prompt(this.turnPlayer + "'s turn. Choose a space:");
        while(this.board[playerChoice] == "X" || this.board[playerChoice] == "O" 
        || playerChoice == NaN || this.board[playerChoice] == null) {
            playerChoice = prompt("Incorrect. Choose an available space:")
        }
        this.board[playerChoice] = this.turnPlayer;
    },
    switchPlayer: function() {
        if(this.turnPlayer == "X") {
            this.turnPlayer = "O";
        } else {
            this.turnPlayer = "X";
        }
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
                this.printBoard();
                console.log(this.turnPlayer + " won!");
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
                this.printBoard();
                console.log(this.turnPlayer + " won!");
                win = true;
            }

        return win;
    }
};

/*let round = (function() {
    let win = false;
    let roundCounter = 0;
    while(!win && roundCounter < 9) {
        Gameboard.printBoard();
        Gameboard.playerAction();
        win = Gameboard.winCheck();
        Gameboard.switchPlayer();
        roundCounter++;
    }
    if(!win && roundCounter === 9) {
        console.log("It's a draw");
    }
})(); */

let GameDisplay = {

}