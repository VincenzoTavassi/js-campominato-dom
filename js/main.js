// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti(ovvero quando ha rivelato tutte le celle che non sono bombe).


/*****************************************************
 *                                                   *
 *                    ON LOAD                        *
 *                                                   *
 ****************************************************/

// let testButton = document.getElementById('test');
// testButton.addEventListener('click', function handler() {
//     ///this will execute only once
//     alert('only once!');
//     this.removeEventListener('click', handler);
// });

// DEFINE HTML ELEMENTS 
// grid 
const gridEl = document.getElementById('grid');
// start and reset buttons 
const startButtonEl = document.getElementById('start-game');
const resetButtonEl = document.getElementById('reset-game');
// difficulty select tag
const difficultyInputEl = document.getElementById('difficulty');
// number of squares range input tag 
const selectedSquaresButtonEl = document.getElementById('square-number');
// selected squares span element - prints the selected squares
const selectedSquaresNumberEl = document.getElementById('selected-square-number');
// radio buttons
const difficultyRadio = document.getElementById('selezione-difficolta');
const generateSquaresRadio = document.getElementById('selezione-libera');

// DEFINE BOMBS ARRAY
let bombs = [];

/*****************************************************
 *                                                   *
 *               EVENT LISTENERS                     *
 *                                                   *
 ****************************************************/


// RADIO BUTTON EVENT LISTENERS 
// Radio input per la select. Disabilita l'input di range se la difficoltà viene scelta dall'utente tramite SELECT.
difficultyRadio.addEventListener('click', function () {
    selectedSquaresButtonEl.disabled = true;
    difficultyInputEl.disabled = false;
})

// Radio per il range input button. Disabilita la SELECT se l'input range viene usato. Mostra selezione al click.
generateSquaresRadio.addEventListener('click', function () {
    selectedSquaresButtonEl.disabled = false;
    difficultyInputEl.disabled = true;
    selectedSquaresNumberEl.innerHTML = selectedSquaresButtonEl.value;
})

// Mostra selezione del range input.
selectedSquaresButtonEl.addEventListener('input', function () {
    selectedSquaresNumberEl.innerHTML = selectedSquaresButtonEl.value;
})

// start game button. Comincia il gioco in base alla difficoltà scelta dall'utente OPPURE in base al numero di quadrati selezionati.
startButtonEl.addEventListener('click',
    function () {
        const selectedDifficulty = difficultyInputEl.value;
        let difficultyValue = 1;
        let bombsRange = 100;
        // se la SELCT è attiva seleziono livello di difficoltà in base alla scelta utente 
        if (difficultyInputEl.disabled == false) {
            if (selectedDifficulty == 'medium') {
                difficultyValue = 2;
                bombsRange = 81;
            } else if (selectedDifficulty == 'hard') {
                difficultyValue = 3;
                bombsRange = 49;
            }
        } else {
            // altrimenti si finisce nell'input range e la griglia genererà un numero equivalente di quadrati all'input utente 
            difficultyValue = selectedSquaresButtonEl.value;
            bombsRange = selectedSquaresButtonEl.value;
        }
        // RESET E GENERO 16 BOMBE
        bombs.length = 0;
        while (bombs.length < 16) {
            randomNumber = parseInt(Math.floor(Math.random() * bombsRange) + 1);
            if (!bombs.includes(randomNumber)) {
                bombs.push(randomNumber);
            }
        }
        console.log(bombs);
        // GENERO LA GRIGLIA 
        generateGrid(gridEl, difficultyValue);
    });

// reset game button 
resetButtonEl.addEventListener('click', function () {
    gridEl.innerHTML = '';
    selectedSquaresButtonEl.value = 100;
    selectedSquaresNumberEl.innerHTML = selectedSquaresButtonEl.value;
})



/*****************************************************
 *                                                   *
 *                  FUNCTIONS                        *
 *                                                   *
 ****************************************************/

/************************************************************************************************
 * 
 * Generates a grid based on the difficulty level 
 * ( 1 = easy, 2 = medium, 3 = hard, any other number = number of squares);
 * 
 * @param {HTMLElement} grid the HTML Element of the grid
 * @param {int} difficulty any number. If 1, 2 o 3 are specified the grid is set 
 * to work with 100, 81 or 49 squares.
 * 
 * 
************************************************************************************************/

function generateGrid(grid, difficulty) {
    // reset grid 
    grid.innerHTML = '';
    // STABILISCO LIVELLO DI DIFFICOLTA'
    let squareClass;
    let gridDimension;
    let punteggioUtente = 0;
    if (difficulty == 1) {
        gridDimension = 100;
        squareClass = 'easy'
    } else if (difficulty == 2) {
        gridDimension = 81;
        squareClass = 'medium'
    } else if (difficulty == 3) {
        gridDimension = 49;
        squareClass = 'hard'
    } else {
        // se non c'è un livello di difficoltà (1,2 o 3) , la dimensione della grid è pari al parametro inviato 
        gridDimension = difficulty;
        squareClass = 'easy'
    }

    // GENERO UN NUMERO DI QUADRATI PARI ALLA DIMENSIONE RICHIESTA 
    for (let i = 0; i < gridDimension; i++) {
        let newSquareEl = document.createElement('div');
        // AGGIUNGO QUADRATO CON CLASSE IN BASE ALLA DIFFICOLTA' 
        newSquareEl.classList.add('square', squareClass);
        // INSERISCO NUMERO DEL QUADRATO 
        newSquareEl.append(i + 1);
        // AGGIUNGO QUADRATO ALLA GRIGLIA 
        grid.append(newSquareEl);
        // AGGIUNGO EVENT LISTENER PER IL CLICK UTENTE 
        newSquareEl.addEventListener('click', function () {
            // console.log(newSquareEl); {
            // ATTIVO/DISATTIVO CLASSE .active 
            this.classList.toggle('active');
            // AUMENTO IL PUNTEGGIO 
            punteggioUtente++
            // DEFINISCO NUMERO DEL QUADRATO
            const squareNumber = parseInt(this.innerHTML);
            // SE EQUIVALE AD UNA BOMBA ESEGUO IL CODICE 
            if (bombs.includes(squareNumber)) {
                this.classList.toggle('active');
                this.classList.add('bomb');
                this.innerHTML = ('KA BOOM!');
                alert('Gioco terminato. Il tuo punteggio è ' + (punteggioUtente - 1));
                // MOSTRO TUTTE LE ALTRE BOMBE
                let allsquares = document.getElementsByClassName('square');
                for (let i = 0; i < allsquares.length; i++) {
                    let currentSquare = allsquares[i];
                    let currentSquareNumber = parseInt(currentSquare.innerHTML);
                    if (bombs.includes(currentSquareNumber)) {
                        currentSquare.classList.add('hidden-bomb');
                        currentSquare.innerHTML = ('BOMB!');
                    }
                    // RIMUOVO EVENT LISTENER 
                    currentSquare.outerHTML = currentSquare.outerHTML;
                }
                punteggioUtente = 0;
            }
        }

        )
    }

}