var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bomb = (function () {
    function Bomb(x, y, HP, color, g) {
        var _this = this;
        this._div = document.createElement("bomb");
        this.game = g;
        document.body.appendChild(this._div);
        this.score = new Score();
        this.speed = 0.002;
        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;
        this.ySpeed = (innerHeight / 2 - this.y);
        this.xSpeed = (innerWidth / 2 - this.x);
        this.rotation = 0;
        this.HP = HP;
        this._div.addEventListener("click", function (e) { return _this.onClick(e); });
        this._div.style.backgroundColor = color;
    }
    Object.defineProperty(Bomb.prototype, "display", {
        get: function () {
            return this.score;
        },
        set: function (value) {
            this.score = value;
        },
        enumerable: true,
        configurable: true
    });
    Bomb.prototype.addNumbers = function () {
        if (!this.numbers) {
            this.numbers = new Numbers(this, this.game, this.HP);
        }
    };
    Bomb.prototype.removeMe = function () {
        this._div.remove();
    };
    Bomb.prototype.move = function () {
        this.x += this.speed * this.xSpeed;
        this.y += this.speed * this.ySpeed;
        this.rotation += 1;
        if (this.rotation >= 360) {
            this.rotation -= 360;
        }
        this._div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this._div.style.transform += "rotate(" + this.rotation + "deg)";
    };
    Bomb.prototype.onClick = function (e) {
        if (this.game.display.clicks > 0) {
            this.HP -= 1;
            this.game.display.updateScore(0, -1, 0);
            if (this.HP == 1) {
                this._div.style.backgroundColor = "green";
            }
            else if (this.HP == 2) {
                this._div.style.backgroundColor = "red";
            }
            if (this.HP == 0 && this.game.display.lives > 0 && this.game.display.score < 40) {
                this.game.display.updateScore(0, 1, 1);
                if (this.game.display.score == 5) {
                    this.game.display.updateScore(-2, 7, 0);
                }
                else if (this.game.display.score == 10) {
                    this.game.display.updateScore(-2, 6, 0);
                }
                else if (this.game.display.score == 20) {
                    this.game.display.updateScore(-6, 6, 0);
                }
            }
            if (!this.numbers) {
                this.numbers = new Numbers(this, this.game, this.HP);
            }
            else {
                this.numbers.updateNumbers(this.HP);
            }
        }
        else {
        }
    };
    return Bomb;
}());
var BigBomb = (function (_super) {
    __extends(BigBomb, _super);
    function BigBomb(x, y, g) {
        return _super.call(this, x, y, 3, "purple", g) || this;
    }
    return BigBomb;
}(Bomb));
var StandardBomb = (function (_super) {
    __extends(StandardBomb, _super);
    function StandardBomb(x, y, g) {
        var _this = _super.call(this, x, y, 2, "", g) || this;
        _super.prototype.addNumbers.call(_this);
        return _this;
    }
    return StandardBomb;
}(Bomb));
var SmallBomb = (function (_super) {
    __extends(SmallBomb, _super);
    function SmallBomb(x, y, g) {
        return _super.call(this, x, y, 1, "purple", g) || this;
    }
    return SmallBomb;
}(Bomb));
var Collisions = (function () {
    function Collisions() {
    }
    Collisions.prototype.collision = function (c1, c2) {
        return !(c2.x > c1.x + c2.width / 2 || c2.x + c2.width < c1.x - c2.width / 2 || c2.y > c1.y + c2.height / 2 || c2.y + c2.height < c1.y - c2.height / 2);
    };
    return Collisions;
}());
var Player = (function () {
    function Player(x, y) {
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
    }
    return Player;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.startUI = document.getElementsByTagName("notice")[0];
        this.collisions = new Collisions();
        this.score = new Score();
        this.player = new Player((innerWidth / 2), (innerHeight / 2));
        this.bombs = new Array();
        if (this.startUI.innerHTML = "Play") {
            this.startUI.addEventListener("click", function (e) { return _this.onClick(e); });
        }
    }
    Object.defineProperty(Game.prototype, "display", {
        get: function () {
            return this.score;
        },
        set: function (value) {
            this.score = value;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.onClick = function (e) {
        var _this = this;
        this.startUI.remove();
        requestAnimationFrame(function () { return _this.gameloop(); });
        setTimeout(function () { return _this.bombGeneration(); }, 1000);
    };
    Game.prototype.gameloop = function () {
        var _this = this;
        this.destroy();
        for (var _i = 0, _a = this.bombs; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t !== undefined) {
                t.move();
            }
        }
        requestAnimationFrame(function () { return _this.gameloop(); });
    };
    Game.prototype.bombGeneration = function () {
        var _this = this;
        if (this.score.lives > 0 && this.score.score < 40) {
            this.rand = Math.random();
            this.rand2 = Math.random();
            if (this.rand2 < 0.33) {
                if (this.rand < 0.25) {
                    this.bombs.push(new StandardBomb(0, Math.random() * innerHeight, this));
                }
                else if (this.rand < 0.5 && this.rand >= 0.25) {
                    this.bombs.push(new StandardBomb(Math.random() * innerWidth, 0, this));
                }
                else if (this.rand < 0.75 && this.rand >= 0.5) {
                    this.bombs.push(new StandardBomb(innerWidth, Math.random() * innerHeight, this));
                }
                else {
                    this.bombs.push(new StandardBomb(Math.random() * innerWidth, innerHeight, this));
                }
            }
            else if (this.rand2 > 0.33 && this.rand2 < 0.67) {
                if (this.rand < 0.25) {
                    this.bombs.push(new BigBomb(0, Math.random() * innerHeight, this));
                }
                else if (this.rand < 0.5 && this.rand >= 0.25) {
                    this.bombs.push(new BigBomb(Math.random() * innerWidth, 0, this));
                }
                else if (this.rand < 0.75 && this.rand >= 0.5) {
                    this.bombs.push(new BigBomb(innerWidth, Math.random() * innerHeight, this));
                }
                else {
                    this.bombs.push(new BigBomb(Math.random() * innerWidth, innerHeight, this));
                }
            }
            else {
                if (this.rand < 0.25) {
                    this.bombs.push(new SmallBomb(0, Math.random() * innerHeight, this));
                }
                else if (this.rand < 0.5 && this.rand >= 0.25) {
                    this.bombs.push(new SmallBomb(Math.random() * innerWidth, 0, this));
                }
                else if (this.rand < 0.75 && this.rand >= 0.5) {
                    this.bombs.push(new SmallBomb(innerWidth, Math.random() * innerHeight, this));
                }
                else {
                    this.bombs.push(new SmallBomb(Math.random() * innerWidth, innerHeight, this));
                }
            }
            setTimeout(function () { return _this.bombGeneration(); }, 2500);
        }
    };
    Game.prototype.destroy = function () {
        var biemsound = document.getElementById("biem");
        var defuse = document.getElementById("defuse");
        for (var i = 0; i < this.bombs.length; i++) {
            if (this.bombs[i] !== undefined) {
                if (this.collisions.collision(this.player, this.bombs[i]) || this.bombs[i].HP == 0) {
                    if (this.bombs[i].HP !== 0 && this.score.score < 40 && this.score.lives > 0) {
                        this.score.updateScore(1, 1, 0);
                        biemsound.pause();
                        biemsound.currentTime = 0.7;
                        biemsound.play();
                    }
                    else {
                        defuse.pause();
                        defuse.currentTime = 0.7;
                        defuse.play();
                    }
                    this.bombs[i].removeMe();
                    this.bombs[i] = undefined;
                }
            }
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Numbers = (function () {
    function Numbers(bomb, game, HP) {
        this.HP = HP;
        this.div = document.createElement("numbers");
        bomb._div.appendChild(this.div);
        this.g = game;
        this.div.innerHTML = this.HP + "";
    }
    Numbers.prototype.updateNumbers = function (HP) {
        this.div.innerHTML = HP + "";
    };
    return Numbers;
}());
var Score = (function () {
    function Score() {
        var _this = this;
        this.clicksdiv = document.getElementsByTagName("clicks")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.livesdiv = document.getElementsByTagName("lives")[0];
        this.noticediv = document.createElement("notice");
        this.replaydiv = document.createElement("notice");
        this.clicks = 3;
        this.lives = 5;
        this.score = 0;
        this.replaydiv.addEventListener("click", function (e) { return _this.onClick(e); });
        this.replaydiv.style.marginTop = "200px";
        this.replaydiv.style.width = "200px";
    }
    Score.prototype.onClick = function (e) {
        window.location.reload();
    };
    Score.prototype.updateScore = function (lv, cl, sc) {
        this.lives -= lv;
        this.clicks += cl;
        this.score += sc;
        this.display();
        this.checkGameStatus();
    };
    Score.prototype.display = function () {
        this.scorediv.innerHTML = "Score: " + this.score + "/40";
        this.livesdiv.innerHTML = "Lives: " + this.lives;
        this.clicksdiv.innerHTML = "Clicks left: " + this.clicks;
    };
    Score.prototype.checkGameStatus = function () {
        if (this.score >= 40) {
            document.body.appendChild(this.noticediv);
            document.body.appendChild(this.replaydiv);
            this.noticediv.style.width = "300px";
            this.noticediv.innerHTML = "You Win!";
            this.replaydiv.innerHTML = "Restart";
            this.Endscreen();
        }
        else if (this.lives <= 0) {
            document.body.appendChild(this.replaydiv);
            document.body.appendChild(this.noticediv);
            this.noticediv.style.width = "400px";
            this.noticediv.innerHTML = "GAME OVER";
            this.replaydiv.innerHTML = "Restart";
            this.Endscreen();
        }
    };
    Score.prototype.Endscreen = function () {
        TweenLite.set(this.noticediv, { x: 0, y: -230 });
        TweenLite.to(this.noticediv, 5, { y: 10, ease: Elastic.easeOut });
        TweenLite.set(this.replaydiv, { x: 0, y: -230 });
        TweenLite.to(this.replaydiv, 5, { y: 20, ease: Elastic.easeOut });
    };
    return Score;
}());
//# sourceMappingURL=main.js.map