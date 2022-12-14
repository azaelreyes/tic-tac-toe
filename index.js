const gameBoard = {
    board: ['', '', '',   // 0  1  2
            '', '', '',   // 3  4  5
            '', '', ''] , // 6  7  8


    winningCombos: [
    [0, 1, 2],[3, 4, 5], [6, 7, 8],  //horizontal
    [0, 3, 6],[1, 4, 7], [2, 5, 8],  //vertical
    [0, 4, 8] ,[2, 4, 6]]  //diagonal

};
//Use an event listener to add classes/create divs for each board item.
const containerDiv = document.getElementById("container");

function renderBoard(){
    gameBoard.board.forEach(element => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("boardDiv");
        containerDiv.appendChild(newDiv);
    });
};

const mainGameRules = document.getElementById("mainGameRules");
let marker =true;
let player1Arr=[];
let player2Arr=[];
//adds marker when boardDiv is clicked & adds index to array of each player, also checks winning combos
function markerAdderOnBoard(){
    document.querySelectorAll(".boardDiv").forEach((element, i) => {
        element.addEventListener('click', () => {
            let index = i;
            if(marker == true){
                element.innerHTML = "X";
                marker= false;
                mainGameRules.innerHTML="Player 2, make your move";
                player1Arr.push(index);

            }else{
                element.innerHTML = "O";
                marker= true;
                mainGameRules.innerHTML="Player 1, make your move";
                player2Arr.push(index);
            };
            //check winning combos after every move.
            if (checkForWinningCombos(player1Arr, gameBoard.winningCombos)) {
                mainGameRules.innerHTML="X Wins!";
                winningScreen("Player 1");
            } else if(checkForWinningCombos(player2Arr, gameBoard.winningCombos)) {
                mainGameRules.innerHTML="O Wins!";
                winningScreen("Player 2");
            }
            }, {once: true}); //allows event listener to only run once, 
                            // in other words, a box can only be chosen once.
        });
    };



function checkForWinningCombos(playerArr, winningCombos){  
    for (let x = 0; x < winningCombos.length; x++) {
        let combo = winningCombos[x];
        if (playerArr.includes(combo[0]) && playerArr.includes(combo[1]) && playerArr.includes(combo[2])){
            makeGreen(combo);
            return true;
            
        };      
    };
};

function makeGreen(combo){
    const boardDivs =document.querySelectorAll(".boardDiv");
    for (let i = 0; i < combo.length; i++) {
        boardDivs[combo[i]].classList.add("boardDivGreen");
    };
};

function winningScreen(player){
    const winDiv = document.createElement("div");
    winDiv.classList.add("winDiv");
    document.body.appendChild(winDiv);
    const winSign = document.createElement("h1");
    winSign.classList.add("winSign");
    const clickReset = document.createElement("p");
    clickReset.classList.add("clickReset");
    winDiv.appendChild(clickReset);
    winDiv.appendChild(winSign);
    winDiv.appendChild(clickReset);
    winSign.innerHTML = player + " has won!";
    clickReset.innerHTML="Click anywhere on the screen to play again!";
    winDiv.addEventListener("click", () => {
        resetGame();
    } )
};

function resetGame(){
    document.querySelectorAll(".boardDiv").forEach(element =>{
        element.remove();
    });
    mainGameRules.innerHTML="Player 1, make your move."
    document.querySelector(".winDiv").remove();
    player1Arr=[];
    player2Arr=[];
    marker=true;
    renderBoard();
    markerAdderOnBoard();
};

//game being run here.
renderBoard();
markerAdderOnBoard();