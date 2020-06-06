document.addEventListener('DOMContentLoaded', ()=>{

    const maincontainer = document.querySelector('.main-container');
    let squares = Array.from(document.querySelectorAll('.main-container div'));
    const displayScore = document.getElementById('display-score');
    const gameoverPrompt = document.getElementById('gameover-prompt');
    const width = 10;
    const playPauseButton = document.getElementById('play-pause-button');
    const upButton = document.getElementById('up');
    const downButton = document.getElementById('down');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    let nextRandom = 0;
    let timerId;
    let score = 0;

//drawing all the shapes and their rotations
   
const lShape =[
    [0, width, width*2, width*2+1],
    [0, width, 1, 2],
    [0, 1, width+1, width*2+1],
    [width, width+1, width+2, 2]
];

const zShape = [
    [0, 1, width+1, width+2],
    [1, width, width+1, width*2],
    [0, 1, width+1, width+2],
    [1, width, width+1, width*2]
];

const tShape =[
    [1, width, width+1, width+2],
    [0, width, width*2, width+1],
    [0, 1, 2, width+1],
    [1, width+1, width*2+1, width]
];

const oShape = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];


const iShape= [
    [0, width, width*2, width*3],
    [0, 1, 2, 3],
    [0, width, width*2, width*3],
    [0, 1, 2, 3]
];

//a complete array of all the shapes and their rotations
const shapes = [lShape, zShape, tShape, oShape, iShape];

let currentPosition =4;
let currentRotation = 0; 

//to randomly select a shape and its first rotation
let random = Math.floor(Math.random()*shapes.length);
let current = shapes[random][currentRotation];

//To draw the shapes
function draw(){
    switch(random){
        case 0:
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('l-color');
        });
        break;

        case 1:
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('z-color');
        });
        break;

        case 2:
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('t-color');
        });
        break;

        case 3:
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('o-color');
        });
        break;

        case 4:
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('i-color');
        });
        break;
    }
}

//To undraw the shapes
function undraw(){
    switch(random){
        case 0:
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('l-color');
        });
        break;

        case 1:
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('z-color');
        });
        break;

        case 2:
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('t-color');
        });
        break;

        case 3:
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('o-color');
        });
        break;

        case 4:
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove('i-color');
        });
        break;
    }
}

//to make the shapes move right or left at key stroke or by clicking button
document.addEventListener('keydown', control);
upButton.addEventListener('click', rotate);
downButton.addEventListener('click', moveDown);
leftButton.addEventListener('click', moveLeft);
rightButton.addEventListener('click', moveRight);

//to freeze shapes once it touches the last row 
function freeze(){
    if((current.some(index=> squares[currentPosition + index + width].classList.contains('last')))||(current.some(index=>{
        squares[currentPosition + index +1].classList.contains('last')}))){
        current.forEach(index=>squares[currentPosition+index].classList.add('last'));
        // to start the next shape falling
        random = nextRandom;
        nextRandom = Math.floor(Math.random()*shapes.length);
        current = shapes[random][currentRotation];
        currentPosition = 4;
        draw();
        drawNext();
        incrementScore();
        gameOver();
    }    
}

//to make the shapes move down
function moveDown(){
    if(playPauseButton.innerHTML == "Pause"){
    undraw();
    currentPosition+=width;
    draw();
    freeze();
    }
}


function control(e){
    
     if(e.keyCode === 38){
        rotate();
    }else if (e.keyCode === 37){
        moveLeft();
    }else if(e.keyCode === 39){
        moveRight();
    }else if(e.keyCode === 40){
        moveDown();
    }
    
}

//to make it rotate
function rotate(){
    if(playPauseButton.innerHTML == "Pause"){
        undraw();
        currentRotation++;
        if(currentRotation === current.length){
            currentRotation = 0;
        }
        current = shapes[random][currentRotation];
        draw();
    }
}

//to make it move right
function moveRight(){
    if(playPauseButton.innerHTML == "Pause"){
        undraw();
        const rightEdge = current.some(index => (currentPosition+index)%width ===width-1);
        if(!rightEdge){
            currentPosition +=1;
        }
        if(current.some(index=>squares[currentPosition + index].classList.contains('last'))){
            currentPosition -=1;
        }
        draw();
        freeze();
    }
}

//to make it move left
function moveLeft(){
    if(playPauseButton.innerHTML == "Pause"){
        undraw();
        const leftEdge = current.some(index=>(currentPosition + index)%width === 0);
        if(!leftEdge){
            currentPosition -=1;
        }
        if(current.some(index=>squares[currentPosition + index].classList.contains('last'))){
            currentPosition -=1;
        }
        draw();
        freeze();
    }
    
}


const displayNextSquares = document.querySelectorAll('.display-next div')
const displayWidth =5;
let nextCurrentPosition = 6;

const nextShapes =[
        [0, displayWidth, displayWidth*2, displayWidth*2+1],
        [0, 1, displayWidth+1, displayWidth+2],
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0, 1, displayWidth, displayWidth+1],
        [0,displayWidth, displayWidth*2, displayWidth*3]

];

//to draw the next shape
function drawNext(){
    displayNextSquares.forEach(square =>{
        square.classList.remove('l-color');
        square.classList.remove('z-color');
        square.classList.remove('t-color');
        square.classList.remove('o-color');
        square.classList.remove('i-color');
    });

    nextShapes[nextRandom].forEach(displayIndex=>{
        
        switch(nextRandom){
            case 0:
            displayNextSquares[nextCurrentPosition + displayIndex].classList.add("l-color");
            break;

            case 1:
            displayNextSquares[nextCurrentPosition + displayIndex].classList.add("z-color");
            break;

            case 2:
            displayNextSquares[nextCurrentPosition + displayIndex].classList.add("t-color");
            break;

            case 3:
            displayNextSquares[nextCurrentPosition + displayIndex].classList.add("o-color");
            break;

            case 4:
            displayNextSquares[nextCurrentPosition + displayIndex].classList.add("i-color");
            break;
        }
    });
}

//enabling play and pause by clicking button
//remember to try coding play and pause using spacebar
playPauseButton.addEventListener('click', ()=>{
    if(timerId){
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = "Play";
    }
    else if(playPauseButton.innerHTML === "Play"){
            playPauseButton.innerHTML = "Pause";
            draw();
            timerId = setInterval(moveDown, 1000);
            drawNext();
    }
    else if(playPauseButton.innerHTML === "Replay"){
        playPauseButton.innerHTML = "Pause";
        gameoverPrompt.style.display = 'none';
        squares.forEach(i=>{
            i.classList.remove('last');
            i.classList.remove('l-color');
            i.classList.remove('z-color');
            i.classList.remove('t-color');
            i.classList.remove('o-color');
            i.classList.remove('i-color');
        });
        for(let i = 200; i < 210; i+=width){
            const lastRow = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            lastRow.forEach(index=>{
                squares[index].classList.add('last');
            });
        }
        score = 0;
        displayScore.innerHTML = score;
        draw();
        timerId = setInterval(moveDown, 1000);
        drawNext();
    }
});

//increment score function
function incrementScore(){
    for(let i = 0; i < 199; i+=width){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

        if(row.every(index =>  squares[index].classList.contains('last'))){
            setTimeout(function(){
            score +=10;
            displayScore.innerHTML = score;
            
            row.forEach(index=>{
                squares[index].classList.remove('last');
                squares[index].classList.remove('l-color');
                squares[index].classList.remove('z-color');
                squares[index].classList.remove('t-color');
                squares[index].classList.remove('o-color');
                squares[index].classList.remove('i-color');
            });
            const squaresRemoved = squares.splice(i, width);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => maincontainer.appendChild(cell));
            },300);
            
            
            
        }
    }

}

//Gameover
function gameOver(){
    if(current.some(index => squares[currentPosition + index].classList.contains('last'))){
        gameoverPrompt.style.display = 'block';
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = "Replay";
    }
}

});

