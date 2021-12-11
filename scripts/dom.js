window.addEventListener('load', () => {

    const suspectPlayerTable = document.querySelector('#suspect');
    const placesPlayerTable = document.querySelector('#places');
    const weaponsPlayerTable = document.querySelector('#weapons');
    const visionsHand = document.querySelector('#ghost-hand');
    const playerHand = document.querySelector('#p-hand')
    const redMystery = document.querySelector('#red-mystery')
    const mainBoard = document.querySelector('#main-board')
    const wonScreen = document.querySelector('#won')
    
    
    const states = {
        mainBoard: true,
        wonScreen: false,
    }
    
    
    class Board {
        constructor(){
            this.uniqueSuspects = [];
            this.uniquePlaces = [];
            this.uniqueWeapons = [];
            this.uniqueVisions = [];
            this.turns = 0;
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
            for (let i = 0; i < this.uniqueSuspects.length; i += 1){
                suspectPlayerTable.innerHTML += ` <div class="suspect-div">
                <img src=${this.uniqueSuspects[i].image} class="suspect-card" />
                <div class="choose-btn">Choose</div>
                </div>
                `
                
            }
            for (let i = 0; i < this.uniquePlaces.length; i += 1){
             placesPlayerTable.innerHTML += ` <div class="place-div">
             <img src=${this.uniquePlaces[i].image} class="place-card" />
             <div class="choose-btn">Choose</div>
             </div>
             `
            }
            for (let i = 0; i < this.uniqueWeapons.length; i += 1){
             weaponsPlayerTable.innerHTML += ` <div class="weapon-div">
                <img src=${this.uniqueWeapons[i].image} class="weapon-card" />
                <div class="choose-btn">Choose</div>
                </div>
                `
            }
            for (let i = 0; i < this.uniqueVisions.length; i += 1){
             visionsHand.innerHTML += `<img src=${this.uniqueVisions[i].image} class="vision-card" />`
            }
         }
        
        nextTurn = () => {
            this.turns += 1;
        }
    }
    
    
    class Ghost {
        constructor(){
            this.visions = boardMysterium.uniqueVisions;
            this.mystery = [];
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


        pickMystery = () => {
            const randomSuspect = Math.floor(Math.random() * boardMysterium.uniqueSuspects.length);
            const randomPlace = Math.floor(Math.random() * boardMysterium.uniquePlaces.length);
            const randomWeapon = Math.floor(Math.random() * boardMysterium.uniqueWeapons.length);
            const mysterySuspect = boardMysterium.uniqueSuspects[randomSuspect]
            const mysteryPlace = boardMysterium.uniquePlaces[randomPlace]
            const mysteryWeapon = boardMysterium.uniqueWeapons[randomWeapon]
            this.mystery.push(mysterySuspect, mysteryPlace, mysteryWeapon);
            this.mystery.forEach((e) => {
                redMystery.innerHTML += `<img src=${e.image} class=${e.class} />` 
            })
        }
       
    }

    class Player {
        constructor(color){
            this.player = color;
            this.hand = [];
        }

        showHand = () => {
            playerHand.innerHTML = ``;
            for (let i = 0; i < this.hand.length; i += 1){
                playerHand.innerHTML += `<img src=${this.hand[i].image} class="vision-card" />`
            }
        }

        addToHand = (card) => {
            this.hand.push(card)
        }

        takeAGuess = (index) => {
            const gSuspect = boardMysterium.uniqueSuspects[index];
            return gSuspect;
        }
    };
    
    
    const boardMysterium = new Board();
    
    const test = document.querySelector('#test-button');
    test.addEventListener('click', () => {
        boardMysterium.randomBoard();
        makeButtonsClickable();
        makeCardsClickable();   
    })
    
    const playerRed = new Player('red');
    const ghost = new Ghost();
    
    const dumper = document.querySelector('#dumper');
    dumper.addEventListener ('click', () => {
        deliverCards();
        ghost.drawHand();
        ghost.updateHand();
        makeCardsClickable();
    })
    
    const test1 = document.querySelector('#test1card');
    test1.addEventListener ('click', () => {
        ghost.pickMystery();
        
    })
   
    
    function selectCard (event) {
        const target = event.target;
        target.classList.toggle('active');
       
    }

    function deliverCards() {
        const cards = document.querySelectorAll('#ghost-hand .vision-card')
        for (let i = cards.length - 1; i >= 0 ; i -= 1){
            if (cards[i].className.includes('active')){
                const card = ghost.removeFromHand(i);
                for (let j = 0; j < card.length; j += 1){
                    playerRed.addToHand(card[j]);
                };
            };
        }
        ghost.updateHand();
        playerRed.showHand();
    }

    function chooseThis(){
        const suspectBtn = document.querySelectorAll('#suspect .choose-btn')
        let suspectNumber = 0;
        for (let i = 0; i < suspectBtn.length; i += 1){
            if (suspectBtn[i].className.includes('active')){
                suspectNumber = i;
            }
        }
        return suspectNumber
        
    }

    function makeCardsClickable() {
        const cardClicker = document.querySelectorAll('#ghost-hand .vision-card')
        for (let card of cardClicker){
           card.addEventListener('click', selectCard);
        }
    }
    
    function makeButtonsClickable(){
        const btnClicker = document.querySelectorAll('.choose-btn')
        for (let btn of btnClicker){
            btn.addEventListener('click', selectCard);
            btn.addEventListener('click', chooseThis);
            btn.addEventListener('click', compareSuspect);
        }
    }

    function compareSuspect(){
        const suspectGuess = playerRed.takeAGuess(chooseThis());
        const suspectBtn = document.querySelectorAll('#suspect .choose-btn')
        suspectBtn[chooseThis()].classList.remove('active');
        if (suspectGuess === ghost.mystery[0]){
            console.log("winner")
            return youWon();
        }
        return window.alert('you guessed wrong')
        
    }

    function youWon(){
        states.mainBoard = !states.mainBoard;
        states.wonScreen = !states.wonScreen;
        if (!states.mainBoard){
            mainBoard.classList.add('hidden')
        }
        if (states.wonScreen){
            wonScreen.classList.remove('hidden')
        }
    }
    
});







