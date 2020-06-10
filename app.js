

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
(function (){
    // State variable = gamePlaying
    let scores = [0,0], roundScore, activePlayer, gamePlaying;

    newGame();

    // document.querySelector("#current-" + activePlayer).innerHTML = "<h1>" + dice + "</h1>";

    // Retrieving a score
    // activePlayer = 1;
    // let player2Score = document.querySelector("#score-" + activePlayer).textContent;
    // console.log(player2Score);



    document.querySelector(".btn-roll").addEventListener("click", function(){
        if(gamePlaying){
            // 1) Need a random number
            // Gets a number from 1 - 6
            let dice = Math.floor(Math.random() * 6) + 1;

            // 2) Display dice image
            let diceDOM_Obj = document.querySelector(".dice");
            diceDOM_Obj.style.display = "block";
            diceDOM_Obj.src = "dice-" + dice + ".png";



            // 3) Update the round score if the rolled number is not 1
            if(dice > 1){
                // Add Score
                roundScore += dice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }else{
                // Next player
                switchPlayer();
            }
        }
        
    }); 

    document.querySelector(".btn-hold").addEventListener("click", function(){
        if(gamePlaying){
            // Saves the number to scores for that player
            scores[activePlayer] += roundScore;
            document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
            
            winningScore = document.querySelector(".finalScore").value;
            winningScore = parseInt(winningScore);
            
            if(!isNaN(winningScore)){
                newScore = parseInt(winningScore);
            }else{
                winningScore = 100;
            }
            console.log(winningScore);
            // Switches to next user turn if the current player has not won 
            if(scores[activePlayer] >= winningScore){
                document.getElementById("name-" + activePlayer).textContent = "WINNER!";

                //Implement CSS class winner for better styling
                document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
                document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
                gamePlaying = false;
                
            }else{
                switchPlayer();
            }
        }
    });

    document.querySelector(".btn-new").addEventListener("click", newGame);


    function switchPlayer (){
        roundScore = 0;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");

    }

    function newGame(){
        document.querySelector(".dice").style.display = "none";
        scores[0] = 0;
        scores[1] = 0;
        activePlayer = 0;
        roundScore = 0;
        document.getElementById("score-0").textContent = "0";
        document.getElementById("score-1").textContent = "0";
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";
        document.getElementById("name-" + (activePlayer+1)).textContent = "Player " + (activePlayer+2);
        document.getElementById("name-" + activePlayer).textContent = "Player " + (activePlayer + 1);
        document.querySelector(".player-0-panel").classList.add("active");
        document.querySelector(".player-1-panel").classList.remove("active");
        document.querySelector(".player-0-panel").classList.remove("winner");
        document.querySelector(".player-1-panel").classList.remove("winner");
        gamePlaying = true;
    }
})();