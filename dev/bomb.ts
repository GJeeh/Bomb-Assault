
class Bomb {
    public dead:boolean = false;
    public _div: HTMLElement;
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    private speed:number;

    private ySpeed:number;
    private xSpeed:number;
    public HP:number;
    private color:string;
    private score:Score;
    private game:Game
    private mouseE:EventListener;
    private numbers:Numbers;

    private rotation:number;
    public get publics(): Score {
		return this.score;
	}
	public set display(value: Score) {
		this.score = value;
	}
    

    constructor(x:number, y:number, HP:number, color:string, g:Game) {
        this._div = document.createElement("bomb");
        this.game = g;
        document.body.appendChild(this._div);
        this.score = new Score();
        this.speed = 0.002;
        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;
        this.ySpeed = (innerHeight/2 - this.y);
        this.xSpeed = (innerWidth/2 - this.x);
        this.rotation = 0;
        this.HP = HP;
        this.mouseE = (e:MouseEvent) => this.onClick(e);
        this._div.addEventListener("click", this.mouseE);
        this._div.style.backgroundColor = color;
}   
    public addNumbers(){
        if(!this.numbers){
            this.numbers = new Numbers(this,this.game,this.HP);
        }
    }
    public removeMe(){
        this._div.removeEventListener("click", this.mouseE);
        this._div.style.backgroundColor = "";
        if(this.numbers){
            this.numbers.thisDiv.remove();
        }
        setTimeout(() => this.removal(), 500);
    }
    public removal(){
        this._div.remove();
    }
    public move():void {
        this.x += this.speed * this.xSpeed;
        this.y += this.speed * this.ySpeed;
        this.rotation += 1;
        if(this.rotation >= 360){
            this.rotation -= 360;
        }
        this._div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
        this._div.style.transform += "rotate("+this.rotation+"deg)";
    }
    private onClick(e:MouseEvent):void{
        if(this.game.display.clicks > 0){
            this.HP -= 1;
            this.game.display.updateScore(0,-1,0);
            if(this.HP == 1){
                this._div.style.backgroundColor = "green";
            }
            else if(this.HP == 2){
                this._div.style.backgroundColor = "red";
            }
            if(this.HP == 0 && this.game.display.lives > 0 && this.game.display.score < 40) {
                this.game.display.updateScore(0,1,1);
                if(this.game.display.score == 5){
                    this.game.display.updateScore(-2,7,0);
                }
                else if(this.game.display.score == 10){
                    this.game.display.updateScore(-2,6,0);
                }
                else if(this.game.display.score == 20){
                    this.game.display.updateScore(-6,6,0);
                }
            }
            if(!this.numbers){
                this.numbers = new Numbers(this,this.game,this.HP);
            }
            else{
                this.numbers.updateNumbers(this.HP);
            }
        }
        else{

        }
    }
}

class BigBomb extends Bomb{
    constructor(x:number,y:number, g:Game){
        super(x,y,3, "purple", g);
    }
}

class StandardBomb extends Bomb{
    constructor(x:number, y:number, g:Game){
        super(x,y,2, "", g);
        super.addNumbers();
    }
}
class SmallBomb extends Bomb{
    constructor(x:number, y:number, g:Game){
        super(x, y, 1, "purple", g);

    }
}
