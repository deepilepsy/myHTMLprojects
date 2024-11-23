var gameCount = 1;
var winLose = false;
var winLoseStatement;
var winLoseColor;

var cardCount = 1;
var aceCount = 0;
var score = 0;
var cards = [];

var dcardCount = 1;
var daceCount = 0;
var dscore = 0;

function startGame() {
    document.getElementById("startGame").style.display = "none";
    document.getElementById("newCard").style.display = "inline-block";
    document.getElementById("stand").style.display = "inline-block";
    document.getElementById("game-tab").style.display = "inline-block";
    for (let i = 0; i < 52; i++)
        cards[cards.length] = i;


    let randomNumber = Math.floor(Math.random() * 52)
    while (cards[randomNumber] == -1) {
        randomNumber = Math.floor(Math.random() * 52);
    }

    /* Determining the shape of the card.*/
    let shape;
    if (randomNumber % 4 == 0)
        shape = "clubs";
    else if (randomNumber % 4 == 1)
        shape = "diamonds";
    else if (randomNumber % 4 == 2)
        shape = "hearts";
    else if (randomNumber % 4 == 3)
        shape = "spades";

    /* Displaying the card and updating the score.*/
    let num = Math.floor(randomNumber / 4) + 2;
    document.getElementById('dcard'+dcardCount).innerHTML = "<img class='card-image-front' src='images/PNG-cards-1.3/"+num+"_of_"+shape+".png'>";
    
    if (num >= 12) num = 10;
    dscore += num;

    dcardCount++;
    cards[randomNumber] = -1;
    document.getElementById("dealersScoreResult").innerHTML = dscore;

    newCard();
}

function newCard() {
    /* Picking a random card.*/
    let randomNumber = Math.floor(Math.random() * 52)
    while (cards[randomNumber] == -1) {
        randomNumber = Math.floor(Math.random() * 52);
    }
       
    /* Determining the shape of the card.*/
    let shape;
    if (randomNumber % 4 == 0)
        shape = "clubs";
    else if (randomNumber % 4 == 1)
        shape = "diamonds";
    else if (randomNumber % 4 == 2)
        shape = "hearts";
    else if (randomNumber % 4 == 3)
        shape = "spades";

    /* Displaying the card and updating the score.*/
    let number = Math.floor(randomNumber / 4) + 2;
    document.getElementById('card'+cardCount).innerHTML = "<img class='card-image-front' src='images/PNG-cards-1.3/"+number+"_of_"+shape+".png'>";
    
    if (number >= 12) number = 10;
    score += number;

    if (number == 11) aceCount++;

    while (aceCount > 0 && score > 21) {
        aceCount --;
        score -= 10; 
    }
    cardCount++;
    cards[randomNumber] = -1;
    document.getElementById("scoreResult").innerHTML = score;

    if (score > 21) {
        document.getElementById("winLose").style.display = "inline-block";
        document.getElementById("winLose").innerHTML = "You Lose.";
        document.getElementById("winLose").style.color = "red";
        document.getElementById("newCard").style.display = "none";
        document.getElementById("stand").style.display = "none";
        document.getElementById("restart").style.display = "inline-block";
        winLose = false;
        gameCounter();
    }
}

function stand() {
    while (dscore < 17) {
        let randomNumber = Math.floor(Math.random() * 52)
        while (cards[randomNumber] == -1) {
            randomNumber = Math.floor(Math.random() * 52);
        }
        /* Determining the shape of the card.*/
        let shape;
        if (randomNumber % 4 == 0)
            shape = "clubs";
        else if (randomNumber % 4 == 1)
            shape = "diamonds";
        else if (randomNumber % 4 == 2)
            shape = "hearts";
        else if (randomNumber % 4 == 3)
            shape = "spades";

        /* Displaying the card and updating the score.*/
        let num = Math.floor(randomNumber / 4) + 2;
        document.getElementById('dcard'+dcardCount).innerHTML = "<img class='card-image-front' src='images/PNG-cards-1.3/"+num+"_of_"+shape+".png'>";
    
        if (num >= 12) num = 10;
        dscore += num;

        if (num == 11) daceCount++;
         
        if (daceCount > 0 && dscore > 21) {
            daceCount = 0;
            dscore -= 10; 
        }
        dcardCount++;
        cards[randomNumber] = -1;
    }
    document.getElementById("dealersScoreResult").innerHTML = dscore;
    if (dscore > 21) {
        document.getElementById("winLose").style.display = "inline-block";
        document.getElementById("winLose").innerHTML = "You Win.";
        document.getElementById("winLose").style.color = "rgb(55, 217, 85)";
        document.getElementById("newCard").style.display = "none";
        document.getElementById("stand").style.display = "none";
        document.getElementById("restart").style.display = "inline-block";
        winLose = true;
        gameCounter();
    } else if (dscore >= score) {
        document.getElementById("winLose").style.display = "inline-block";
        document.getElementById("winLose").innerHTML = "You lose.";
        document.getElementById("winLose").style.color = "red";
        document.getElementById("newCard").style.display = "none";
        document.getElementById("stand").style.display = "none";
        document.getElementById("restart").style.display = "inline-block";
        winLose = false;
        gameCounter();
    } else if (dscore < score) {
        document.getElementById("winLose").style.display = "inline-block";
        document.getElementById("winLose").innerHTML = "You Win.";
        document.getElementById("winLose").style.color = "rgb(55, 217, 85)";
        document.getElementById("newCard").style.display = "none";
        document.getElementById("stand").style.display = "none";
        document.getElementById("restart").style.display = "inline-block";
        winLose = true;
        gameCounter();
    }
}

function restart() {
    for(let i = 1; i < 10; i++)
        document.getElementById('card'+i).innerHTML = "<img class='card-image' src='images/PNG-cards-1.3/back.png'>";
    for(let i = 1; i < 10; i++)
        document.getElementById('dcard'+i).innerHTML = "<img class='card-image' src='images/PNG-cards-1.3/back.png'>";
    document.getElementById("restart").style.display = "none";

    document.getElementById("winLose").style.display = "none";
    cardCount = 1;
    score = 0;

    dcardCount = 1;
    dscore = 0;
    cards = [];

    startGame();
}

function gameCounter() {
    if (winLose == true) {
        winLoseStatement = "Win";
        winLoseColor = "greenyellow";
    } else {
        winLoseStatement = "Lose";
        winLoseColor = "rgb(249, 162, 162)";
    }
    document.getElementById("tbody").innerHTML += 
    "<tr>" + 
        "<td class='table-body' id='gameCount'>" + gameCount + "</td>" +
        "<td class='table-body' id='dealersScoreTable'>"+ dscore + "</td>" + 
        "<td class='table-body' id='yourScoreTable'>"+ score + "</td>" + 
        "<td class='table-body' style='color:" + winLoseColor + ";' id='winOrLose'>" + winLoseStatement + "</td>" +
    "</tr>";
    gameCount++;
}

console.log("created by G");

