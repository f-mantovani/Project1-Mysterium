window.addEventListener('load', () => {

    const suspectPlayerTable = document.querySelector('#suspect');
    const placesPlayerTable = document.querySelector('#places');
    const weaponsPlayerTable = document.querySelector('#weapons');
    const visionsHand = document.querySelector('#ghost-hand');
    const playerHand = document.querySelector('#p-hand')

    
    class Board {
        constructor(){
            this.uniqueSuspects = [];
            this.uniquePlaces = [];
            this.uniqueWeapons = [];
            this.uniqueVisions = [];
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
             suspectPlayerTable.innerHTML += `<img src=${this.uniqueSuspects[i].image} />`
            }
            for (let i = 0; i < this.uniquePlaces.length; i += 1){
             placesPlayerTable.innerHTML += `<img src=${this.uniquePlaces[i].image} />`
            }
            for (let i = 0; i < this.uniqueWeapons.length; i += 1){
             weaponsPlayerTable.innerHTML += `<img src=${this.uniqueWeapons[i].image} />`
            }
            for (let i = 0; i < this.uniqueVisions.length; i += 1){
             visionsHand.innerHTML += `<img src=${this.uniqueVisions[i].image} />`
            }
         }
    }
    
    
    class Ghost {
        constructor(){
            this.suspects = boardMysterium.uniqueSuspects;
            this.places = boardMysterium.uniquePlaces;
            this.weapons = boardMysterium.uniqueWeapons;
            this.visions = boardMysterium.uniqueVisions;
        }

        dumpHand = () => {
            playerRed.hand.push(this.visions[0]);
            this.visions.shift();
            console.log(this.visions);
            visionsHand.innerHTML = ``;
            for (let i = 0; i < this.visions.length; i += 1){
                visionsHand.innerHTML += `<img src=${this.visions[i].image} />`
            }
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
                playerHand.innerHTML += `<img src=${this.hand[i].image} />`
            }
        }
    };
    
    
    const boardMysterium = new Board();
    
    const test = document.querySelector('#test-button');
    test.addEventListener('click', () => {
        boardMysterium.randomBoard();
        
    })
    
    const ghost = new Ghost();
    const playerRed = new Player('red');
    
    const dumper = document.querySelector('#dumper');
    dumper.addEventListener ('click', () => {
        ghost.dumpHand();
        playerRed.showHand();
    })
   
});







