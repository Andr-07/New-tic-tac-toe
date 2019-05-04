const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

function grid() {return Array.from(document.querySelectorAll('.table_item'));}
function tToNum(element) {return Number.parseInt(element.id.replace('t',''));}
const emptyItems = () => grid().filter(el=>el.innerText === '')
const allSame = (arr) => arr.every(element => element.innerText === arr[0].innerText && element.innerText !== '');
 
function opponentChoice() {return tToNum(emptyItems()[Math.floor(Math.random()*emptyItems().length)]);}
function takeTurn(index, letter) {return grid()[index].innerText = letter;}

function endGame(winningSequence) {
    winningSequence.forEach(el=>el.classList.add('winner'));
    document.getElementsByTagName('h2')[0].innerText = "GAME IS OVER";
    document.querySelector('.table_container').style.display = 'none';
}
function checkForVictory() {
    let victrory = false;
    winningCombos.forEach(function(el){
        const _grid = grid();
        const sequence =[_grid[el[0]],_grid[el[1]],_grid[el[2]]];
        console.log(allSame(sequence))
        if(allSame(sequence)) {
            victory = true;
            endGame(sequence)
        }
    });
    return victrory;
}

function opponentTurn() {
    disableListeners();
    setTimeout(function(){
        takeTurn(opponentChoice(), 'O');
        if(!checkForVictory())
        enableListeners();
    }, 1000);
}

function clickFn(event) {
    takeTurn(tToNum(event.target), 'X');
    if(!checkForVictory())
    opponentTurn();
}

function enableListeners() {
    grid().forEach(function(element){
        element.addEventListener('click', clickFn)
    });
}

function disableListeners() {
    grid().forEach(function(element){
        element.removeEventListener('click', clickFn)
    });

}

enableListeners();