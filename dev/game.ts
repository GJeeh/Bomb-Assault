/// <reference path="player.ts" />

class Game{
    private player:Player;
    private bombs:Array<Bomb>;
    private posY:number;
    private posX:number;
    private rand:number;
    private rand2:number;
    private collisions:Collisions;
    private score:Score;    
    private startUI: Element;
    public get display(): Score {
		return this.score;
	}
	public set display(value: Score) {
		this.score = value;
	}
    
    constructor(){
        this.startUI = document.getElementsByTagName("notice")[0]; 
        this.collisions = new Collisions();
        this.score = new Score();
        this.player = new Player((innerWidth/2), (innerHeight/2));
        this.bombs = new Array<Bomb>();
        if(this.startUI.innerHTML = "Play"){
            this.startUI.addEventListener("click", (e:MouseEvent) => this.onClick(e));
        }
    }
    private onClick(e:MouseEvent):void{
        this.startUI.remove();
        requestAnimationFrame(() => this.gameloop());
        setTimeout(() => this.bombGeneration(), 1000);
    }
    private gameloop(){
        this.destroy();
        for(let t of this.bombs){
            if(t !== undefined){
                t.move();
            }
        }                    
        requestAnimationFrame(() => this.gameloop());
    }
    private bombGeneration(){
        if(this.score.lives > 0 && this.score.score < 40){
            this.rand = Math.random();
            this.rand2 = Math.random();
            if(this.rand2 < 0.33){
                if(this.rand < 0.25){
                    this.bombs.push(new StandardBomb(0,Math.random()*innerHeight,this));
                }
                else if(this.rand < 0.5 && this.rand >= 0.25){
                    this.bombs.push(new StandardBomb(Math.random()*innerWidth,0,this));
                }
                else if(this.rand < 0.75 && this.rand >= 0.5){
                    this.bombs.push(new StandardBomb(innerWidth,Math.random()*innerHeight,this));
                }
                else{
                    this.bombs.push(new StandardBomb(Math.random()*innerWidth,innerHeight,this));
                }
            }
            else if(this.rand2 > 0.33 && this.rand2 < 0.67){
                if(this.rand < 0.25){
                    this.bombs.push(new BigBomb(0,Math.random()*innerHeight,this));
                }
                else if(this.rand < 0.5 && this.rand >= 0.25){
                    this.bombs.push(new BigBomb(Math.random()*innerWidth, 0,this));
                }
                else if(this.rand < 0.75 && this.rand >= 0.5){
                    this.bombs.push(new BigBomb(innerWidth,Math.random()*innerHeight,this));
                }
                else{
                    this.bombs.push(new BigBomb(Math.random()*innerWidth,innerHeight,this));
                }
            }
            else{
                if(this.rand < 0.25){
                    this.bombs.push(new SmallBomb(0,Math.random()*innerHeight,this));
                }
                else if(this.rand < 0.5 && this.rand >= 0.25){
                    this.bombs.push(new SmallBomb(Math.random()*innerWidth, 0,this));
                }
                else if(this.rand < 0.75 && this.rand >= 0.5){
                    this.bombs.push(new SmallBomb(innerWidth,Math.random()*innerHeight,this));
                }
                else{
                    this.bombs.push(new SmallBomb(Math.random()*innerWidth,innerHeight,this));
                }
            }
            setTimeout(() => this.bombGeneration(), 2500);
        }
    }
    public destroy():void{
        var biemsound  = <HTMLAudioElement>document.getElementById("biem");
        var defuse  = <HTMLAudioElement>document.getElementById("defuse");
        for(var i = 0; i < this.bombs.length; i++){
            if(this.bombs[i] !== undefined){
                if(this.collisions.collision(this.player,this.bombs[i]) || this.bombs[i].HP == 0){
                    if(this.bombs[i].HP !== 0 && this.score.score < 40 && this.score.lives > 0){
                        this.score.updateScore(1,1,0);
                        biemsound.pause();
                        biemsound.currentTime = 0.7;
                        biemsound.play();
                    }
                    else{
                        defuse.pause();
                        defuse.currentTime = 0.7;
                        defuse.play();
                    }
                    this.bombs[i].removeMe();
                    this.bombs[i] = undefined;
                }
            }
        }
    }
}