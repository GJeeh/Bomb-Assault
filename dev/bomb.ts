
class Bomb {
    private ySpeed:number;
    private xSpeed:number;
    private color:string;
    protected game:Game
    private mouseE:EventListener;
    protected numbers:Numbers;
    private rotation:number;
    private speed:number;
    private dead:boolean = false;
    private _div: HTMLElement;
    private x:number;
    private y:number;
    private width:number;
    private height:number;
    private HP:number;
    private score:Score;
    public get Dead(): boolean{
        return this.dead;
    }
    public set Dead(value: boolean){
        this.dead = value;
    }
    public get DIV(): HTMLElement{
        return this._div;
    }
    public set DIV(value: HTMLElement){
        this._div = value;
    }
    public get X(): number{
        return this.x;
    }
    public set X(value: number){
        this.x = value;
    }
    public get Y(): number{
        return this.y;
    }
    public set Y(value: number){
        this.y = value;
    }
    public get Width(): number{
        return this.width;
    }
    public set Width(value: number){
        this.width = value;
    }
    public get Height(): number{
        return this.height;
    }
    public set Height(value: number){
        this.height = value;
    }
    public get Health(): number{
        return this.HP;
    }
    public set Health(value: number){
        this.HP = value;
    }

    constructor(x:number, y:number, HP:number, color:string, g:Game) {
        this._div = document.createElement("bomb");
        this.game = g;
        this.score = this.game.display;
        document.body.appendChild(this._div);
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
        if(this.score.Clicks > 0){
            this.HP -= 1;
            this.score.updateScore(0,-1,0);
            if(this.HP == 1){
                this._div.style.backgroundColor = "green";
            }
            else if(this.HP == 2){
                this._div.style.backgroundColor = "red";
            }
            if(this.HP == 0 && this.score.Lives > 0 && this.score.Score < 40) {
                this.score.updateScore(0,1,1);
                if(this.score.Score == 5){
                    this.score.updateScore(-2,7,0);
                }
                else if(this.score.Score == 10){
                    this.score.updateScore(-2,6,0);
                }
                else if(this.score.Score == 20){
                    this.score.updateScore(-6,6,0);
                }
            }
            if(!this.numbers){
                this.numbers = new Numbers(this,this.game,String(this.HP));
            }
            else{
                this.numbers.updateNumbers(this.HP);
            }
        }
        else{

        }
    }
}
//bigBomb class moved here due to errors with compiler
class bigBomb extends Bomb{
    constructor(x:number,y:number, g:Game){
        super(x,y,3, "purple", g);
            if(!this.numbers){
            this.numbers = new Numbers(this,this.game,"?");
        }
    }
}