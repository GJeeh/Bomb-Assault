/// <reference path="player.ts" />

class Game{
    private player:Player;
    private bombs:Array<Bomb>;
    private rand:number;
    private rand2:number;
    private collisions:Collisions;
    private score:Score;    
    private startUI: Element;
    private soundtrack: HTMLAudioElement;
    public get display():Score{
        return this.score;
    }
    public set display(value:Score){
        this.score = value;
    }
    constructor(){
        this.soundtrack  = <HTMLAudioElement>document.getElementById("soundtrack");
        this.soundtrack.play();
        this.soundtrack.volume = 0.5;
        this.startUI = document.getElementsByTagName("notice")[0]; 
        this.collisions = new Collisions();
        this.score = new Score();
        this.player = new Player((innerWidth/2), (innerHeight/2));
        this.bombs = new Array<Bomb>();
        if(this.startUI.innerHTML = "Play"){
            this.startUI.addEventListener("click", (e:MouseEvent) => this.onClick(e));
        }
        requestAnimationFrame(() => this.SoundtrackLoop());
    }
    private onClick(e:MouseEvent):void{
        this.startUI.remove();
        requestAnimationFrame(() => this.gameloop());
        setTimeout(() => this.bombGeneration(), 1000);
    }
    private SoundtrackLoop(){
        if(this.soundtrack.currentTime >= 27){    
            this.soundtrack.currentTime = 0;
        }
        requestAnimationFrame(() => this.SoundtrackLoop());
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
        if(this.score.Lives > 0 && this.score.Score < 40){
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
                    this.bombs.push(new bigBomb(0,Math.random()*innerHeight,this));
                }
                else if(this.rand < 0.5 && this.rand >= 0.25){
                    this.bombs.push(new bigBomb(Math.random()*innerWidth, 0,this));
                }
                else if(this.rand < 0.75 && this.rand >= 0.5){
                    this.bombs.push(new bigBomb(innerWidth,Math.random()*innerHeight,this));
                }
                else{
                    this.bombs.push(new bigBomb(Math.random()*innerWidth,innerHeight,this));
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
            if(this.bombs[i] !== undefined && this.bombs[i].Dead == false){
                if(this.collisions.collision(this.player,this.bombs[i]) || this.bombs[i].Health == 0){
                    if(this.bombs[i].Health !== 0 && this.score.Score < 40 && this.score.Lives > 0){
                        this.score.updateScore(1,1,0);
                        biemsound.pause();
                        biemsound.currentTime = 0.7;
                        biemsound.play();
                        this.bombs[i].DIV.style.backgroundImage = "url(images/explode2.gif)";
                        this.bombs[i].removeMe();
                    }
                    else{
                        defuse.pause();
                        defuse.currentTime = 0.7;
                        defuse.play();
                        this.bombs[i].removal();
                    }                    
                    this.bombs[i].Dead = true;
                    setTimeout(() => this.undefine(this.bombs[i]),500);
                }
                
            }
        }
    }
    public undefine(bomb:Bomb):void{
                bomb = undefined;
            }
}