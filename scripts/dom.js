window.addEventListener('load', () => {

    const suspectPlayerTable = document.querySelector('#suspect');
    const placesPlayerTable = document.querySelector('#places');
    const weaponsPlayerTable = document.querySelector('#weapons');
    const visionsHand = document.querySelector('#ghost-hand');
    const playerHand = document.querySelector('#p-hand')
    const redMystery = document.querySelector('#red-mystery')

    
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
             suspectPlayerTable.innerHTML += `<img src=${this.uniqueSuspects[i].image} class="suspect-card" />`
            }
            for (let i = 0; i < this.uniquePlaces.length; i += 1){
             placesPlayerTable.innerHTML += `<img src=${this.uniquePlaces[i].image} class="place-card" />`
            }
            for (let i = 0; i < this.uniqueWeapons.length; i += 1){
             weaponsPlayerTable.innerHTML += `<img src=${this.uniqueWeapons[i].image} class="weapon-card" />`
            }
            for (let i = 0; i < this.uniqueVisions.length; i += 1){
             visionsHand.innerHTML += `<img src=${this.uniqueVisions[i].image} class="vision-card" />`
            }
         }
    }
    
    
    class Ghost {
        constructor(){
            this.visions = boardMysterium.uniqueVisions;
        }

        dumpHand = () => {
            const cardsSelected = document.getElementsByClassName('active');
    
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
                redMystery.innerHTML += `<img src=${e.image} />` 
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
    };
    
    
    const boardMysterium = new Board();
    
    const test = document.querySelector('#test-button');
    test.addEventListener('click', () => {
        boardMysterium.randomBoard();
        const cardClicker = document.querySelectorAll('#ghost-hand .vision-card')
        for (let card of cardClicker){
            card.addEventListener('click', selectCard);
        }
        
    })
    
    const playerRed = new Player('red');
    const ghost = new Ghost();
    
    const dumper = document.querySelector('#dumper');
    dumper.addEventListener ('click', () => {
        ghost.dumpHand();
        deliverCards();
        // ghost.updateHand();
        playerRed.showHand();
        const cardClicker = document.querySelectorAll('#ghost-hand .vision-card')
        // console.log(cardClicker)
        for (let card of cardClicker){
            card.addEventListener('click', selectCard);
        }
    })
    
    const test1 = document.querySelector('#test1card');
    test1.addEventListener ('click', () => {
        // ghost.pickMystery();
        ghost.drawHand();
        ghost.updateHand();
    })
   
    
    function selectCard (event) {
        const target = event.target;
        target.classList.toggle('active');
       
    }

    function deliverCards() {
        const cards = [...document.querySelectorAll('#ghost-hand .vision-card')]
        for (let i = 0; i < cards.length ; i += 1){
            // console.log(cards[i].className)
            if (cards[i].className.includes('active')){
                const card = ghost.removeFromHand(i);
                for (let j = 0; j < card.length; j += 1){
                    playerRed.addToHand(card[j]);
                };
            };
        }
        ghost.updateHand();
        console.log(playerRed.hand)
        playerRed.showHand();
        
    }

});







