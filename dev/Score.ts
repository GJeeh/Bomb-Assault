class Score{
    public score:number;
    public lives:number;
    public clicks:number;
    private scorediv:Element;
    private livesdiv:Element;
    private clicksdiv:Element;
    private noticediv:HTMLElement;
    private replaydiv:HTMLElement;
    private mainPlayer:HTMLElement;
    private ended:boolean = false;

    private game:Game;

    constructor(){
        this.clicksdiv = document.getElementsByTagName("clicks")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.livesdiv = document.getElementsByTagName("lives")[0];
        this.noticediv = document.createElement("notice");
        this.replaydiv = document.createElement("notice");
        this.mainPlayer = <HTMLElement>document.getElementsByTagName("player")[0];
        this.clicks = 3;
        this.lives = 5;
        this.score = 0;
        this.replaydiv.addEventListener("click", (e:MouseEvent) => this.onClick(e));
        this.replaydiv.style.marginTop = "200px";
        this.replaydiv.style.width = "300px";
                    console.log(this.mainPlayer);

    }
    private onClick(e:MouseEvent):void{
        window.location.reload();   
    }
    public updateScore(lv:number,cl:number,sc:number){
        this.lives -= lv;
        this.clicks += cl;
        this.score += sc;
        this.display();
        this.checkGameStatus();
    }
    private display(){
        this.scorediv.innerHTML = "Score: " + this.score + "/40";
        this.livesdiv.innerHTML = "Lives: " + this.lives;
        this.clicksdiv.innerHTML = "Clicks left: " + this.clicks;
    }
    private checkGameStatus(){
        if(this.ended == false){
            if(this.score >= 40){
                document.body.appendChild(this.noticediv);
                document.body.appendChild(this.replaydiv);
                this.noticediv.style.width = "300px";
                this.noticediv.innerHTML = "You Win!";
                this.replaydiv.innerHTML = "Restart"
                this.ended = true;
                this.Endscreen();
            }
            else if(this.lives <= 0){
                document.body.appendChild(this.replaydiv);
                document.body.appendChild(this.noticediv);
                this.noticediv.style.width = "400px"; 
                this.noticediv.innerHTML = "GAME OVER"
                this.replaydiv.innerHTML = "Restart"
                this.mainPlayer.style.backgroundImage = "url(../images/dead.png)";
                this.ended = true;
                this.Endscreen();
            }
        }
    }
    private Endscreen(){
        TweenLite.set(this.noticediv, {x:0, y:-230});
        TweenLite.to(this.noticediv, 5, {y:10, ease:Elastic.easeOut});
        TweenLite.set(this.replaydiv, {x:0, y:-230});
        TweenLite.to(this.replaydiv, 5, {y:20, ease:Elastic.easeOut});
    }
}