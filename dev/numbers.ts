class Numbers{
    private HP:number;
    private div:Element;
    private g:Game;
    constructor(bomb:Bomb, game:Game, HP:number){
        this.HP = HP;
        this.div = document.createElement("numbers");
        bomb._div.appendChild(this.div);
        this.g = game;
        this.div.innerHTML = this.HP + "";
    }
    public updateNumbers(HP:number){
        this.div.innerHTML = HP + "";
    }
}