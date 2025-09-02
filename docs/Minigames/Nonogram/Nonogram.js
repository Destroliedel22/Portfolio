let tile;
let tiles = [];

let rowTile
let colTile;

let x;
let y;

let solution = [];
let rowClues = [];
let colClues = [];

window.onload = function()
{
    setGame();
}

function setGame()
{
    for (let i = 0; i < 10; i++) 
    {
        let row = [];
        for (let j = 0; j < 10; j++) {
            row.push(Math.random() < 0.5 ? 1 : 0);
        }
        solution.push(row);
        console.log(solution);
    }

    function getClues(line) {
        let clues = [];
        let count = 0;
        for (let cell of line) {
            if (cell === 1) {
                count++;
            } else if (count > 0) {
                clues.push(count);
                count = 0;
            }
        }
        if (count > 0) clues.push(count);
        return clues.length > 0 ? clues.join(" ") : "0";
    }

    rowClues = solution.map(row => getClues(row));

    for (let j = 0; j < 10; j++) {
        let col = [];
        for (let i = 0; i < 10; i++) {
            col.push(solution[i][j]);
        }
        colClues.push(getClues(col));
    }

    for(let i = 0; i < 11; i++)
    {
        for(let j = 0; j < 11; j++)
        {
            tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            if(i === 0)
            {
                tile.classList.add("fillCounter");
                tile.innerText = colClues[j - 1];
            }
            else if(j === 0)
            {
                tile.classList.add("fillCounter");
                tile.innerText = rowClues[i - 1];
            }
            else
            {
                tile.addEventListener("click", selectTile);
                tile.addEventListener("contextmenu", crossed)
                tile.dataset.solution = solution[i - 1][j - 1];
            }

            if (i === 0 && j === 0)
            {
                tile.innerText = ""
            }
            
            board.append(tile);
            tiles.push(tile);
        }
    }
}

function selectTile()
{
    let coords = this.id.split("-");
    x = parseInt(coords[0]);
    y = parseInt(coords[1]);

    if(this.classList.contains("tileSelected"))
    {
        this.classList.remove("tileSelected");
    }
    else if(!this.classList.contains("Crossed"))
    {
        this.classList.add("tileSelected");
    }

    // let splitinnertext = document.getElementById(x + "-" + 0).innerText;
    // console.log(document.getElementById(x + "-" + 0));

    // if(checkRowAutoCross(x) === document.getElementById(x + "-" + 0))
    // {
    //     for (let col = 1; col <= 10; col++) 
    //         {
    //             let tile = document.getElementById(x + "-" + col);
    //             if(!tile.classList.contains("tileSelected")) 
    //             {
    //                 tile.classList.add("Crossed");
    //             }
    //         }
    // }

    // checkColAutoCross(y);

    if(checkIfBoardIsCorrect())
    {
        document.getElementById("Win").hidden = false;
        document.getElementById("body").style.backgroundColor = "rgb(13, 88, 0)"
    }
}

function crossed(e)
{
    e.preventDefault();
    if(this.classList.contains("Crossed"))
    {
        this.classList.remove("Crossed");
    }
    else if(!this.classList.contains("tileSelected"))
    {
        this.classList.add("Crossed");
    }
}

function checkIfBoardIsCorrect()
{
    for (let i = 1; i <= 10; i++)
    {
        for (let j = 1; j <= 10; j++) 
        {
            let tile = document.getElementById(i + "-" + j);
            let expected = solution[i - 1][j - 1];

            if ((expected === 1 && !tile.classList.contains("tileSelected")) || (expected === 0 && tile.classList.contains("tileSelected"))) 
            {
                return false;
            }
        }
    }
    return true;
}

function checkRowAutoCross(rowIndex) 
{
    let filledCount = 0;

    for (let col = 1; col <= 10; col++) 
    {
        let tile = document.getElementById(rowIndex + "-" + col);
        if (tile.classList.contains("tileSelected")) 
        {
            filledCount++;
        }
    }
    return filledCount;
}

function checkColAutoCross(colIndex) 
{
    let filledCount = 0;

    for (let row = 1; row <= 10; row++) 
    {
        let tile = document.getElementById(row + "-" + colIndex);
        if (tile.classList.contains("tileSelected")) 
        {
            filledCount++;
        }
    }
    return filledCount;
}