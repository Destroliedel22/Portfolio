var numselected = null;
var boxselected = null;

let timesclicked = 0;

var hearts = 5;
var heartcount = [];

var board = []
let tile;

var savedTiles = [];

var filledTiles = 0

var solution = []

var smallnumbs = ["1","2","3","4","5","6","7","8","9"]

window.onload = function() 
{
    generateBoard();
    setGame();
    heartcount.push(document.getElementById("Hearts").children)
}

function setGame() 
{
    for(let i = 1; i <= 9; i++)
    {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectedNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            if(board[i][j] != "-")
            {
                tile.innerText = board[i][j];
                tile.classList.add("tile-start");
            }
            if(i == 2 || i == 5) 
            {
                tile.classList.add("horizontal-line");
            }
            if(j == 2 || j == 5) 
            {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.addEventListener("contextmenu", smallNumb);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
            savedTiles.push(tile);
        }
    }
}

function selectedNumber()
{
    if(numselected != null)
    {
        numselected.classList.remove("number-selected");
    }
    if(numselected == this)
    {
        numselected.classList.remove("number-selected");
        numselected = null;
    }
    else
    {
        numselected = this;
        numselected.classList.add("number-selected");
    }
}

function selectTile()
{
    filledTiles = 0;
    if(numselected)
    {
        let coords = this.id.split("-");
        let i = parseInt(coords[0]);
        let j = parseInt(coords[1]);

        if(solution[i][j] == numselected.id)
        {
            this.innerText = "";
            this.innerText = numselected.id;
            this.classList.add("tile-input");
            this.classList.remove("small-numb-tile");
        }
        else
        {
            hearts -= 1;
            document.images.item(hearts).src = "Minigames/Sudoku/Images/DeadHeart.png"
            if(hearts <= 0)
            {
                savedTiles.forEach(tile => 
                {
                    tile.removeEventListener("click", selectTile);
                    tile.removeEventListener("contextmenu", smallNumb);
                });

                document.getElementById("Failed").hidden = false;
                document.getElementById("body").style.backgroundColor = "rgb(100, 100, 100)"
            }
        }
    }

    savedTiles.forEach(tile => {
        if(tile.innerText != "" && tile.classList.contains("small-numb-tile") == false)
        {
            filledTiles += 1;
            console.log(tile.id, tile.innerText, filledTiles);
        }
    });

    if(filledTiles == 81)
        {
            tile.removeEventListener("click", selectTile);
            tile.removeEventListener("contextmenu", smallNumb);
            document.getElementById("Win").hidden = false;
            document.getElementById("body").style.backgroundColor = "rgb(13, 88, 0)"
        }
}

function smallNumb(e) {
    e.preventDefault();
    if (numselected)
    {
        if (!this.innerText.includes(numselected.id)) 
        {
            this.innerText += numselected.id;
            this.classList.add("small-numb-tile");
        } 
        else 
        {
            this.innerText = this.innerText.replace(numselected.id, '');
        }
    }
}

function generateBoard() {
    let size = 9;
    let boxSize = 3;

    function isValid(board, row, col, num) {
        for (let i = 0; i < size; i++) {
            if (board[row][i] == num || board[i][col] == num) return false;
        }

        let boxRow = Math.floor(row / boxSize) * boxSize;
        let boxCol = Math.floor(col / boxSize) * boxSize;
        for (let i = 0; i < boxSize; i++) {
            for (let j = 0; j < boxSize; j++) {
                if (board[boxRow + i][boxCol + j] == num) return false;
            }
        }
        return true;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function solve(board) {
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (board[row][col] == 0) {
                    let numbers = shuffle([1,2,3,4,5,6,7,8,9]);
                    for (let num of numbers) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function generateSolvedBoard() {
        let board = Array.from({ length: size }, () => Array(size).fill(0));
        solve(board);
        return board;
    }

    function removeNumbers(board, difficulty = 0.5) {
        let newBoard = board.map(row => [...row]);
        let squares = size * size;
        let empties = Math.floor(squares * difficulty);
        while (empties > 0) {
            let row = Math.floor(Math.random() * size);
            let col = Math.floor(Math.random() * size);
            if (newBoard[row][col] !== 0) {
                newBoard[row][col] = "-";
                empties--;
            }
        }
        return newBoard;
    }

    solution = generateSolvedBoard().map(row => row.map(String)); // to string
    board = removeNumbers(solution, 0.5).map(row => row.map(n => n === "-" ? "-" : n)); // keep "-" or string numbers
}