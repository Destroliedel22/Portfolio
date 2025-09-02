var selected = null;

var hangingmanPic = ["Minigames/HangingMan/Images/Side.png", "Minigames/HangingMan/Images/Top.png", "Minigames/HangingMan/Images/Bar.png",
"Minigames/HangingMan/Images/Head.png", "Minigames/HangingMan/Images/Body.png", "Minigames/HangingMan/Images/Arms.png", "Minigames/HangingMan/Images/Dead.png"];

var hangingmanPhase = 0;

var solution = [];
var displayedWord = [];
var RandomWord = [];

let letter = null;

var Alphabet = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
  ];

window.onload = function()
{
    setGame();
}

async function setWord() {
    const response = await fetch("https://random-word-api.vercel.app/api?words=1");
    const data = await response.json();
    const word = data[0];
    RandomWord = data[0];
    solution = word.split("");
}

async function setGame()
{
    await setWord();
    displayedWord = Array(solution.length).fill("_");
    document.getElementById("Word").innerText = displayedWord.join(" ");

    for(let i = 0; i < Alphabet.length; i++)
    {
        letter = document.createElement("div");
        letter.id = i;
        letter.innerText = Alphabet[i];
        letter.addEventListener("click", selectedLetter);
        letter.classList.add("letter");
        document.getElementById("Keyboard").appendChild(letter);

        if (i === 9 || i === 18) {
            document.getElementById("Keyboard").appendChild(document.createElement("br"));
        }
    }
}

function selectedLetter()
{
    let rightLetter = false;
    for (let i = 0; i < solution.length; i++) {
        if (solution[i].toUpperCase() === this.innerText.toUpperCase()) {
            displayedWord[i] = solution[i];
            document.getElementById("Word").innerText = displayedWord.join(" ");
            rightLetter = true;
        }
    }
    if(rightLetter == false)
    {
        if(hangingmanPhase == hangingmanPic.length - 1)
        {
            document.images.item(0).src = hangingmanPic[hangingmanPhase];
            Fail();
        }
        else
        {
            document.images.item(0).src = hangingmanPic[hangingmanPhase];
            hangingmanPhase++;
        }
    }
    else
    {
        CheckForWin();
    }
    this.removeEventListener("click", selectedLetter);
    this.classList.add("used");
}

function CheckForWin()
{
    if(!displayedWord.includes("_"))
    {
        Win()
    }
}

function Win()
{
    document.getElementById("Win").hidden = false;
}

function Fail()
{
    let Letters = document.getElementsByClassName("letter");
    Array.from(Letters).forEach(letter => {
        letter.removeEventListener("click", selectedLetter);
        letter.classList.add("used");
    });
    setTimeout(function()
    {
        document.getElementById("Failed").hidden = false;
        document.getElementById("body").style.backgroundColor = "rgb(100, 100, 100)"
    }, 1000)
    document.getElementById("Word").innerText = RandomWord;
}