
var gridcontainer = document.getElementById("game-board");
var messagediv = document.querySelector(".messagediv");

let rcnum = 15;



class Snake {
 
    snake; 
    direction = "R"; 
    food = [];
    speed ;
    rows ;
    cols ;
    score = 0;
    started = false;
    intervel;


    constructor(grid,speed){
        this.snake = [[3, 3]]
        this.rows = grid;
        this.cols = grid;
        this.speed = speed;
        this.drawUI();
        messagediv.innerHTML = `<h1>Press Enter to Start</h1>`
    }

    
    snakeMovement(){

        let head = this.snake[0];
        let newhead = [...head];
       
        if(this.direction=="R")newhead[1]++;
        if(this.direction=="L")newhead[1]--;
        if(this.direction=="U")newhead[0]--;
        if(this.direction=="D")newhead[0]++;

        
       
        this.snake.unshift(newhead);

        return newhead;
        
        
    }

    terminated(newhead){

        let rtval = this.snake.some(([headrow,headcol],ind)=>(ind>1 && headrow===newhead[0] && headcol===newhead[1]))

        return (newhead[0]<0 || newhead[1]<0 || newhead[0]>this.rows || newhead[1]>this.cols ||rtval);
    }

    FoodConsumed([row,col]){
        if (this.food[0]==row && this.food[1]==col) {
            this.score++;
            this.food = [];
            return true;
        }
        else false;
    }

    drawUI(){
        gridcontainer.innerHTML = "";
        for (let i = 1; i <= this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const element = document.createElement("div");

                for (let k = 0; k < this.snake.length; k++) {
                    
                    if (this.snake[k][0]==i && this.snake[k][1]==j) {
                        element.classList.add("snake")
                    }else if (this.food[0]==i && this.food[1]==j) {
                        element.classList.add("food")
                    }
                    
                }

                gridcontainer.appendChild(element)
                
            }
        }
    }
    
    generateFood (){
        let row, col; 
        do {  
          row = Math.floor(Math.random() * this.rows)+1;
          col = Math.floor(Math.random() * this.cols)+1;
        } while (this.snake.some(segment => segment[0] === row && segment[1] === col)||(row==0 || row>=this.rows) || (col == 0 || col>=this.cols));
        
        this.food = [row,col]
    }

    startGame(){
        messagediv.classList.add("hidden")
        this.started = true;

        this.intervel = setInterval(() => {
            if (this.started) {
                let head = this.snakeMovement()
                if(this.terminated(head)){
                    this.gameOver()
    
                    return;
                }
              
                // console.log(this.food)


                if (!this.food[0] && !this.food[1]) {
                    this.generateFood()
                }
                if (!this.FoodConsumed(head)) {
                    this.snake.pop()
                }
                this.drawUI()
            }
           

        }, this.speed);
        
    }

    gameOver(){
        this.started = false;
        clearInterval(this.intervel)
        messagediv.innerHTML = `<h1>Game is Over <br> Your Score is : <span style="font-weight:bold; color:green;">  ${this.score}</span>
        <br>
        Press Enter
        </h1>`
        this.snake = [[5,5]]
        this.score = 0;
        messagediv.classList.remove("hidden")
    }

}


let snake = new Snake(20,200);

window.addEventListener("keydown",(event)=>{
    if (snake.started && event.key == "Enter") {
        snake.gameOver();
    }else 
    if (event.key=="Enter" && !snake.started) {
        snake.startGame();
    }
   
    

    if (event.key=="ArrowLeft" && snake.direction !="R" ) {
        snake.direction = 'L'
    }else
    if (event.key=="ArrowRight" && snake.direction !="L" ) {
        snake.direction = 'R'
    }else
    if (event.key=="ArrowUp" && snake.direction !="D" ) {
        snake.direction = 'U'
    }else
    if (event.key=="ArrowDown" && snake.direction !="U" ) {
        snake.direction = 'D'
    }
       
})