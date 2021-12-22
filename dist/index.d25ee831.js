const gameBoard = function() {
    let _state = [
        [
            "",
            "",
            ""
        ],
        [
            "",
            "",
            ""
        ],
        [
            "",
            "",
            ""
        ], 
    ];
    function getState() {
        return _state;
    }
    function addField(fieldX, fieldY, option) {
        _state[fieldX][fieldY] = option;
    }
    function restartGame() {
        for(let i = 0; i < 3; i++)for(let j = 0; j < 3; j++)_state[i][j] = "";
    }
    return {
        getState,
        addField,
        restartGame
    };
}();
const gameController = function() {
    let _turn = "O";
    function getTurn() {
        return _turn;
    }
    function changeTurn() {
        if (_turn === "O") _turn = "X";
        else _turn = "O";
    }
    function checkWin() {
        const state = gameBoard.getState();
        // Horizontal & Vertical
        for(let i = 0; i < 3; i++){
            if (state[i][0] === state[i][1] && state[i][1] === state[i][2] && state[i][0] !== "") return state[i][0];
            if (state[0][i] === state[1][i] && state[1][i] === state[2][i] && state[0][i] !== "") return state[0][i];
        }
        // Diagonal
        if (state[0][0] === state[1][1] && state[1][1] === state[2][2] && state[0][0] !== "") return state[0][0];
        if (state[0][2] === state[1][1] && state[1][1] === state[2][0] && state[0][2] !== "") return state[0][2];
        return undefined;
    }
    function restartGame() {
        _turn = "O";
    }
    return {
        getTurn,
        changeTurn,
        checkWin,
        restartGame
    };
}();
const displayController = function() {
    const _board = document.querySelectorAll(`.game__field`);
    const _message = document.querySelector(`.message`);
    const _restart = document.querySelector(`.restart`);
    _board.forEach((box)=>{
        box.addEventListener(`click`, _boxClick);
    });
    _restart.addEventListener(`click`, _restartGame);
    function _boxClick() {
        if (this.innerHTML) return;
        if (gameController.getTurn() === "O") {
            this.innerHTML = "O";
            gameBoard.addField(Math.floor(this.dataset.index / 3), this.dataset.index % 3, "O");
        } else {
            this.innerHTML = "X";
            gameBoard.addField(Math.floor(this.dataset.index / 3), this.dataset.index % 3, "X");
        }
        if (gameController.checkWin()) _messageWin(gameController.checkWin());
        else {
            gameController.changeTurn();
            _messageChange(gameController.getTurn());
        }
    }
    function _messageWin(winner) {
        _message.innerHTML = `PLAYER ${winner} WINS 🙌`;
    }
    function _messageChange(turn) {
        _message.innerHTML = `Player ${turn}'s turn`;
    }
    function _restartGame() {
        _board.forEach((box)=>box.innerHTML = ""
        );
        gameController.restartGame();
        gameBoard.restartGame();
        _messageChange(gameController.getTurn());
    }
    return {
    };
}();

//# sourceMappingURL=index.d25ee831.js.map
