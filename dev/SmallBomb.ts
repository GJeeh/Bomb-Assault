class SmallBomb extends Bomb{
    constructor(x:number, y:number, g:Game){
        super(x, y, 1, "purple", g);
        if(!this.numbers){
            this.numbers = new Numbers(this,this.game,"?");
        }
    }
}
