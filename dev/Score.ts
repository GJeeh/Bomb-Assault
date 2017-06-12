class Score{
    public score:number;
    public lives:number;
    public clicks:number;
    private scorediv:Element;
    private livesdiv:Element;
    private clicksdiv:Element;
    private noticediv:Element;

    constructor(){
        this.clicksdiv = document.getElementsByTagName("clicks")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.livesdiv = document.getElementsByTagName("lives")[0];
        this.noticediv = document.getElementsByTagName("notice")[0];
        this.clicks = 3;
        this.lives = 5;
        this.score = 0;
    }
    public updateScore(lv:number,cl:number,sc:number){
        this.lives -= lv;
        this.clicks += cl;
        this.score += sc;
        this.display();
        this.checkGameStatus();
    }
    private display(){
        this.scorediv.innerHTML = "Score: " + this.score;
        this.livesdiv.innerHTML = "Lives: " + this.lives;
        this.clicksdiv.innerHTML = "Clicks left: " + this.clicks;
    }
    private checkGameStatus(){
        if(this.score >= 40){
            this.noticediv.innerHTML = "You Win!";
        }
        else if(this.lives <= 0){
            this.noticediv.innerHTML = "GAME OVER"
        }
    }
}