window.addEventListener('load', () => {

    // Variáveis de DOM
    const welcomePage = document.querySelector('#welcome-page')
    const ghostTable = document.querySelector('#ghost-table');
    const visionsHand = document.querySelector('#ghost-hand');
    const guessing = document.querySelector('.player-guess')
    const crowCounter = document.querySelector('#crows')
    const redMystery = document.querySelector('#red-mystery');
    const suspectOverview = document.querySelector('#suspect-table');
    const placesOverview = document.querySelector('#places-table');
    const weaponsOverview = document.querySelector('#weapons-table');
    const playerTable = document.querySelector('#players-table');
    const playerPic = document.querySelector('.player-pic')
    const suspectPlayerTable = document.querySelector('#suspect');
    const placesPlayerTable = document.querySelector('#places');
    const weaponsPlayerTable = document.querySelector('#weapons');
    const playerHand = document.querySelector('#p-hand');
    const turnsCounter = document.querySelectorAll('.turns');
    const ghostTransition = document.querySelector('#transition');
    const mainBoard = document.querySelector('#main-board');
    const wonScreen = document.querySelector('#won');
    const mysteryDown = document.querySelector('#mysteryDown');
    const loseScreen = document.querySelector('#lose');
    

    const states = {
        mainBoard: true,
        wonScreen: false,
        loseScreen: false,
        ghostTable: false,
        playerTable: true,
        ghostTransition: false,
    }
    
    // Construtor do Jogo
    class Board {
        constructor(){
            this.uniqueSuspects = [];
            this.uniquePlaces = [];
            this.uniqueWeapons = [];
            this.uniqueVisions = [];
            this.turn = 1;
        }
    
        randomBoard = () => {
            while (this.uniqueSuspects.length < 6){
                let randomSuspect = Math.floor(Math.random() * suspects.length);
                if (!this.uniqueSuspects.includes(suspects[randomSuspect])) {
                    this.uniqueSuspects.push(suspects[randomSuspect]);
                }
            }
            while (this.uniquePlaces.length < 6){
                let randomPlaces = Math.floor(Math.random() * places.length);
                if (!this.uniquePlaces.includes(places[randomPlaces])) {
                    this.uniquePlaces.push(places[randomPlaces]);
                }
            }
            while (this.uniqueWeapons.length < 6){
                let randomWeapons = Math.floor(Math.random() * weapons.length);
                if (!this.uniqueWeapons.includes(weapons[randomWeapons])) {
                    this.uniqueWeapons.push(weapons[randomWeapons]);
                }
            }
            while (this.uniqueVisions.length < 7){
                let randomVisions = Math.floor(Math.random() * visions.length);
                if (!this.uniqueVisions.includes(visions[randomVisions])) {
                    this.uniqueVisions.push(visions[randomVisions]);
                }
            }
            this.populateBoard();    
        }
    
        populateBoard = () => {
            playerPic.innerHTML += `<img src =${players[5].image} class="player-card" />`;
            suspectOverview.innerHTML += `<p>SUSPECTS</p>`;
            placesOverview.innerHTML += `<p>PLACES</p>`;
            weaponsOverview.innerHTML += `<p>WEAPONS</p>`;
            for (let i = 0; i < this.uniqueSuspects.length; i += 1){
                suspectPlayerTable.innerHTML += ` <div class="suspect-div">
                <img src=${this.uniqueSuspects[i].image} class="suspect-card" />
                <input type="button" class="choose-suspect choose" value="Choose"></input>
                </div>
                `
                suspectOverview.innerHTML += `<img src=${this.uniqueSuspects[i].image} class="suspect-card" />`
                
            }
            for (let i = 0; i < this.uniquePlaces.length; i += 1){
                placesPlayerTable.innerHTML += ` <div class="place-div">
                <img src=${this.uniquePlaces[i].image} class="place-card" />
                <input type="button" class="choose-place choose" value="Choose"></input>
                </div>
                `
                placesOverview.innerHTML += `<img src=${this.uniquePlaces[i].image} />`
            }
            for (let i = 0; i < this.uniqueWeapons.length; i += 1){
                weaponsPlayerTable.innerHTML += ` <div class="weapon-div">
                <img src=${this.uniqueWeapons[i].image} class="weapon-card" />
                <input type="button" class="choose-weapon choose" value="Choose"></input>
                </div>
                `
                weaponsOverview.innerHTML += `<img src=${this.uniqueWeapons[i].image} class="weapon-card" />`
            }
            for (let i = 0; i < this.uniqueVisions.length; i += 1){
             visionsHand.innerHTML += `<img src=${this.uniqueVisions[i].image} class="vision-card" />`
            }

            for (let i = 0; i < turnsCounter.length; i += 1){
                turnsCounter[i].innerHTML = `
                <h2>Round: ${boardMysterium.turn}</h2>
                <p>out of 7</p>
                `
            }
         }
        
        nextTurn = () => {
            this.turn += 1;
        }

    }
    
    // Construtor do Fantasma
    
    class Ghost {
        constructor(){
            this.visions = boardMysterium.uniqueVisions;
            this.mystery = [];
            this.crows = [];
        }
        
        drawHand = () => {
            while (this.visions.length < 7 ){
                if (playerRed.hand.length >= visions.length - 7) break;
                let randomVisions = Math.floor(Math.random() * visions.length);
                if (!this.visions.includes(visions[randomVisions]) && !playerRed.hand.includes(visions[randomVisions])) {
                    this.visions.push(visions[randomVisions]);
                }
            } 
             
        };
        
        updateHand = () => {
            visionsHand.innerHTML = ``;
            for (let i = 0; i < this.visions.length; i += 1){
                visionsHand.innerHTML += `<img src=${this.visions[i].image} class="vision-card" />`
            }
              
        }

        removeFromHand = (index) => {
            const cardRemoved = this.visions.splice(index, 1);
            return cardRemoved;
        }

        callCrow = () => {
            while(this.visions.length){
                this.visions.pop()
            };
        };

        bringTheCrows = () => {
            for (let i = 0; i < crowsData.length; i += 1){
                this.crows.push(crowsData[i])
            }
        }


        pickMystery = () => {
            const randomSuspect = Math.floor(Math.random() * boardMysterium.uniqueSuspects.length);
            const randomPlace = Math.floor(Math.random() * boardMysterium.uniquePlaces.length);
            const randomWeapon = Math.floor(Math.random() * boardMysterium.uniqueWeapons.length);
            const mysterySuspect = boardMysterium.uniqueSuspects[randomSuspect]
            const mysteryPlace = boardMysterium.uniquePlaces[randomPlace]
            const mysteryWeapon = boardMysterium.uniqueWeapons[randomWeapon]
            this.mystery.push(mysterySuspect, mysteryPlace, mysteryWeapon);
            this.mystery.forEach((e) => {
                redMystery.innerHTML += `
                <div id="${e.class}-mystery">
                <p>${e.class.toUpperCase()}</p>
                <img src=${e.image} class=${e.class} />
                </div>
                ` 
            })
        }
       
    }

    // Construtor do Jogador
    class Player {
        constructor(color){
            this.player = color;
            this.playerCorrectGuess = [];
            this.hand = [];
        }

        showHand = () => {
            playerHand.innerHTML = ``;
            playerHand.innerHTML += "<h3>VISIONS</h3>";
            for (let i = 0; i < this.hand.length; i += 1){
                playerHand.innerHTML += `<img src=${this.hand[i].image} class="vision-card" />`
            }
        }

        addToHand = (card) => {
            this.hand.push(card)
        }

        cleanHand = () => {
            while(this.hand.length){
                this.hand.pop()
            }
        }

        takeAGuess = (index) => {
            if (playerRed.playerCorrectGuess.length === 0){
                const gSuspect = boardMysterium.uniqueSuspects[index];
                return gSuspect;
            } else if (playerRed.playerCorrectGuess.length === 1) {
                const pSuspect = boardMysterium.uniquePlaces[index];
                return pSuspect;
            } else if (playerRed.playerCorrectGuess.length === 2){
                const wSuspect = boardMysterium.uniqueWeapons[index];
                return wSuspect;
            }   
        };
    };
    
    const boardMysterium = new Board();
    
    // Botões
    const startBtn = document.querySelector('#start-button');
    startBtn.addEventListener('click', () => {
        boardMysterium.randomBoard();
        welcomePage.classList.add('hidden');
        mainBoard.classList.remove('hidden');
        updateGhostTable();
        updatePlayersTable();
        changeScreen();
        ghost.pickMystery();
        updateMystery();
        chooseSuspectAction();
        choosePlacesAction();
        chooseWeaponsAction();
        makeCardsClickable(); 
        ghost.bringTheCrows();
        updateCrowCount(); 
        makeTransitionBtnClickable(); 
    })
    
    const playerRed = new Player('red');
    const ghost = new Ghost();
    
    const giveCards = document.querySelector('#pass-cards');
    giveCards.addEventListener ('click', () => {
        deliverCards();
        ghost.drawHand();
        ghost.updateHand();
        makeCardsClickable();
    })
    
    function makeCrowsClickable(){
        const crows =[...document.querySelectorAll('.crow')];
        crows.forEach((crow) => {
        crow.addEventListener('click',() => {
            useCrow();
        })
    })}
    
    // Funções de ação
    function selectCard (event) {
        const target = event.target;
        target.classList.toggle('active');
       
    }

    function deliverCards() {
        const cards = document.querySelectorAll('#ghost-hand .vision-card')
        const cardsSelected = document.querySelectorAll('.active')
        if (!cardsSelected.length){
            return window.alert('You must pass a vision to the player')
        };
        for (let i = cards.length - 1; i >= 0 ; i -= 1){
            if (cards[i].className.includes('active')){
                const card = ghost.removeFromHand(i);
                for (let j = 0; j < card.length; j += 1){
                    playerRed.addToHand(card[j]);
                };
            };
        };
        ghost.updateHand();
        playerRed.showHand();
        changeScreen();
    }

    function useCrow(){
        playCrowSound();
        ghost.callCrow();
        ghost.drawHand();
        ghost.updateHand();
        makeCardsClickable();
        removeCrow();
        updateCrowCount();
    }

    function removeCrow(){
        ghost.crows.pop();
    }

    function updateCrowCount(){
        crowCounter.innerHTML = "";
        for (let i = 0; i < ghost.crows.length; i += 1){
            crowCounter.innerHTML += `<img src=${ghost.crows[i].image} class="crow" />`
        }
        makeCrowsClickable();
    }

    function playCrowSound(){
        let crowSound = new Audio ('./Mysterium/Sounds/CROW SOUND EFFECT.mp3');
        crowSound.volume = 0.3;
        crowSound.play();
    }

    function updateMystery(){
        const suspectGuessing = document.querySelector('#suspect-mystery')
        const placeGuessing = document.querySelector('#place-mystery')
        const weaponGuessing = document.querySelector('#weapon-mystery')
        guessing.innerHTML = "<p>Player is guessing:</p>"
        if(playerRed.playerCorrectGuess.length === 0){ 
            suspectGuessing.classList.add('guessing')  
            }
        if(playerRed.playerCorrectGuess.length === 1){
            suspectGuessing.classList.remove('guessing')  
            placeGuessing.classList.add('guessing')  
        }
        if(playerRed.playerCorrectGuess.length === 2){
            placeGuessing.classList.remove('guessing')  
            weaponGuessing.classList.add('guessing')  
        }
    }
 
    function makeCardsClickable() {
        const cardClicker = document.querySelectorAll('#ghost-hand .vision-card')
        for (let card of cardClicker){
            card.addEventListener('click', selectCard);
        }
    }

    function makeTransitionBtnClickable(){
        const transitionBtn = document.querySelector('input[value="Yes"]')
        transitionBtn.addEventListener('click', () => {
            transitioningScreen();
        })
    }
    
    function chooseThis(){
        const indexBtn = document.querySelectorAll('.choose')
        let indexNumber = 0;
        for (let i = 0; i < indexBtn.length; i += 1){
            if (indexBtn[i].className.includes('active')){
                indexNumber = i;
            }
        }
        return indexNumber - (6 * playerRed.playerCorrectGuess.length)  
    }

    function chooseSuspectAction(){
        const btnClicker = document.querySelectorAll('.choose-suspect');
        for (let btn of btnClicker){
            btn.addEventListener('click', selectCard);
            btn.addEventListener('click', chooseThis);
            btn.addEventListener('click', compareSuspect);
            btn.addEventListener('click', roundsUp);
            btn.addEventListener('click', transitionScreenAppears);
            btn.addEventListener('click', updateMystery);
        }
    }
    
    function choosePlacesAction(){
        const btnClicker = document.querySelectorAll('#places .choose-place');
        for (let btn of btnClicker){
            btn.addEventListener('click', selectCard);
            btn.addEventListener('click', chooseThis);
            btn.addEventListener('click', comparePlaces);
            btn.addEventListener('click', roundsUp);
            btn.addEventListener('click', transitionScreenAppears);
            btn.addEventListener('click', updateMystery);
        }
    }
    
    function chooseWeaponsAction(){
        const btnClicker = document.querySelectorAll('#weapons .choose-weapon')
        for (let btn of btnClicker){
            btn.addEventListener('click', selectCard);
            btn.addEventListener('click', chooseThis);
            btn.addEventListener('click', compareWeapon);
            btn.addEventListener('click', roundsUp);
            btn.addEventListener('click', transitionScreenAppears);
            btn.addEventListener('click', updateMystery);
        }
    }

    function compareSuspect(){
        const suspectWrong = document.querySelectorAll('.suspect-div')
        const suspectGuess = playerRed.takeAGuess(chooseThis());
        const suspectBtn = document.querySelectorAll('#suspect .choose-suspect')
        let thisNumber = chooseThis();
        suspectBtn[chooseThis()].classList.remove('active');
        if (suspectGuess === ghost.mystery[0]){
            playerRed.playerCorrectGuess.push(ghost.mystery[0])
            updateTurn();
            playerRed.cleanHand();
            updateGhostTable();
            return updatePlayersTable();
        }
        suspectWrong[thisNumber].classList.add('tried');
        updateTurn();
        return window.alert('you guessed wrong');   
    }
    
    function comparePlaces(){
        const placeWrong = document.querySelectorAll('.place-div')
        const placesGuess = playerRed.takeAGuess(chooseThis());
        const placesBtn = document.querySelectorAll('#places .choose-place')
        let thisNumber = chooseThis();
        placesBtn[chooseThis()].classList.remove('active');
        if (placesGuess === ghost.mystery[1]){
            playerRed.playerCorrectGuess.push(ghost.mystery[1])
            updateTurn();
            playerRed.cleanHand();
            updateGhostTable();
            return updatePlayersTable();
        }
        placeWrong[thisNumber].classList.add('tried');
        updateTurn();
        return window.alert('you guessed wrong')
    }
    
    function compareWeapon(){
        const weaponWrong = document.querySelectorAll('.weapon-div')
        const weaponGuess = playerRed.takeAGuess(chooseThis());
        const weaponBtn = document.querySelectorAll('#weapons .choose-weapon')
        let thisNumber = chooseThis();
        weaponBtn[chooseThis()].classList.remove('active');
        if (weaponGuess === ghost.mystery[2]){
            playerRed.playerCorrectGuess.push(ghost.mystery[2]);
            updateTurn();
            playerRed.cleanHand();
            updateGhostTable();
            return youWon();
        }
        weaponWrong[thisNumber].classList.add('tried');
        updateTurn();
        return window.alert('you guessed wrong')
    }
  
    function updateTurn(){
        boardMysterium.nextTurn();
        turnsCounter.innerHTML = "";
        for (let i = 0; i < turnsCounter.length; i += 1){
            turnsCounter[i].innerHTML = `
            <h2>Round: ${boardMysterium.turn}</h2>
            <p>out of 7</p>
            `
        }
        roundsUp();
    }

    function changeScreen(){
        states.ghostTable = !states.ghostTable;  
        states.playerTable = !states.playerTable;
        if (!states.playerTable){
            playerTable.classList.add('hidden')
        } else if (states.playerTable){
            playerTable.classList.remove('hidden')
        };
        if (states.ghostTable){
            ghostTable.classList.remove('hidden')
        } else if (!states.ghostTable){
            ghostTable.classList.add('hidden')
        };
    };

    function transitioningScreen(){    
        ghostTransition.classList.add('hidden')  
        ghostTable.classList.remove('hidden')           
    }
    
    function transitionScreenAppears(){
        ghostTransition.classList.remove('hidden')
        changeScreen();  
        ghostTable.classList.add('hidden')   
    }

    function updatePlayersTable(){  
        if (playerRed.playerCorrectGuess.length === 0){
            placesPlayerTable.classList.add('hidden')
            weaponsPlayerTable.classList.add('hidden')
        } else if (playerRed.playerCorrectGuess.length === 1){
            placesPlayerTable.classList.remove('hidden')
            weaponsPlayerTable.classList.add('hidden')
            suspectPlayerTable.classList.add('hidden')
        } else if (playerRed.playerCorrectGuess.length === 2){
            suspectPlayerTable.classList.add('hidden')
            placesPlayerTable.classList.add('hidden')
            weaponsPlayerTable.classList.remove('hidden')
        }
    }

    function updateGhostTable(){  
        if (playerRed.playerCorrectGuess.length === 0){
            placesOverview.classList.add('hidden')
            weaponsOverview.classList.add('hidden')
        } else if (playerRed.playerCorrectGuess.length === 1){
            placesOverview.classList.remove('hidden')
            weaponsOverview.classList.add('hidden')
            suspectOverview.classList.add('hidden')
        } else if (playerRed.playerCorrectGuess.length === 2){
            suspectOverview.classList.add('hidden')
            placesOverview.classList.add('hidden')
            weaponsOverview.classList.remove('hidden')
        }
    }
    function youWon(){
        states.mainBoard = !states.mainBoard;
        states.wonScreen = !states.wonScreen;
        if (!states.mainBoard){
            mainBoard.classList.add('hidden');
        }
        if (states.wonScreen){
            wonScreen.classList.remove('hidden')
            displayMysteryOwned();

        }
        
    }

    function displayMysteryOwned(){
        ghost.mystery.forEach((card) => {
            mysteryDown.innerHTML += `
            <div class="guessing">
            <p>${card.class.toUpperCase()}</p>
            <img src=${card.image} class=${card.class} />
            </div>
            `
        }  )
    }
    
    function roundsUp(){
        if (boardMysterium.turn > 7) return youLose()
    }
    
    function youLose(){
        states.mainBoard = !states.mainBoard;
        states.loseScreen = !states.loseScreen;
        if (!states.mainBoard){
            mainBoard.classList.add('hidden')
        }
        if (states.loseScreen){
            loseScreen.classList.remove('hidden')
        }
    }

});
