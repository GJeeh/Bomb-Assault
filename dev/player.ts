/// <reference path="score.ts" />

class Player{
    private div: HTMLElement;
    private x:number;
    private y:number;
    public get Xval():number{
        return this.x;
    }
    public set Xval(value:number){
        this.x = value;
    }
    public get Yval():number{
        return this.y;
    }
    public set Yval(value:number){
        this.y = value;
    }

    constructor(x:number, y:number){
        this.div = <HTMLElement>document.getElementsByTagName("player")[0];
        document.body.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";

    }
}