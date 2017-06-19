/// <reference path="score.ts" />

class Player{
    private div: HTMLElement;
    public x:number;
    public y:number;

    constructor(x:number, y:number){
        this.div = <HTMLElement>document.getElementsByTagName("player")[0];
        document.body.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";

    }
}