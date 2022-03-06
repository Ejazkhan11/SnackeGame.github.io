// Game Constants & Variables
let inputDir = {x: 0, y: 0};
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 4;
let score = 0;
let lastPainTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPainTime)/1000 < 1/speed){
        return;
    }
    lastPainTime = ctime;
    gameEngine();
}
function isCollide(sarr) {
     return false;
    
}
function gameEngine(){
    // part 1 updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        // musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to paly again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // if eaten the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    
    // Moving the snake 
    for (let i = snakeArr.length - 2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2 Display the snake and food 
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}










// Main Functions
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}
    moveSound.play();
    switch (e.key) {
        case "Arrowup":
        console.log("Arrowup");
        inputDir.x = 0;
        inputDir.y = 1;
        break;

        case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = -1;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
        default:
            break;
    }
});