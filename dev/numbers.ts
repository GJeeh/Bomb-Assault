class Numbers{
    private HP:string;
    private div:Element;
    private g:Game;
    public get thisDiv(): Element {
		return this.div;
	}
	public set thisDiv(value: Element) {
		this.div = value;
	}
    constructor(bomb:Bomb, game:Game, HP:string){
        this.HP = HP;
        this.div = document.createElement("numbers");
        bomb.DIV.appendChild(this.div);
        this.g = game;
        this.div.innerHTML = this.HP + "";
    }
    public updateNumbers(HP:number){
        this.div.innerHTML = HP + "";
    }
}