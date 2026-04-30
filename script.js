
const gameboard = (function() {

    let board = ["", "", "", "", "", "", "", "", ""]

    function getBoard() {
        return board;
    }

    function setCell(index, marker) {

        if (index < 0 || index > 8) {
            return;
        }

        if (board[index] != "") {
            return;
        }

        board[index] = marker;
    }

    function clearBoard(){
        board = ["", "", "", "", "", "", "", "", ""]
    }

    return {
        getBoard,
        setCell,
        clearBoard
    };

})();


function createPlayer(name, marker) {
    return {
        name,
        marker
    };
}


const gameController = (function() {

    const p1 = createPlayer("Player One", "X");
    const p2 = createPlayer("Player Two", "O");

    let currentPlayer = p1;
    let gameOver = false;

    function playRound(index) {
        if (gameOver == true) {
            return;
        }

        gameboard.setCell(index, currentPlayer.marker)

        function checkBoardState (board) {
            
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let combo of winningCombos) {
                const [a, b, c] = combo;

                if (
                    board[a] === currentPlayer.marker &&
                    board[b] === currentPlayer.marker &&
                    board[c] === currentPlayer.marker
                ) return currentPlayer;
            }

        }

        const winner = checkBoardState(gameboard.getBoard());

        if (winner) {
            gameOver = true;
        }

    }


    return {
        playRound
    };

})();


