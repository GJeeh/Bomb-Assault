class StandardBomb extends Bomb{
    constructor(x:number, y:number, g:Game){
        super(x,y,2, "", g);
          if(!this.numbers){
            this.numbers = new Numbers(this,this.game,String(this.Health));
        }
    }
      
}
