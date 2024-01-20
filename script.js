let Gameboard = {
    board: Array(9).fill("1"),
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
    }
};

let round = (function() {
    Gameboard.printBoard();
})();