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
        this.dead = false;
        this._div = document.createElement("bomb");
        this.game = g;
        this.score = this.game.display;
        document.body.appendChild(this._div);
        this.speed = 0.002;
        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;
        this.ySpeed = (innerHeight / 2 - this.y);
        this.xSpeed = (innerWidth / 2 - this.x);
        this.rotation = 0;
        this.HP = HP;
        this.mouseE = function (e) { return _this.onClick(e); };
        this._div.addEventListener("click", this.mouseE);
        this._div.style.backgroundColor = color;
    }
    Object.defineProperty(Bomb.prototype, "Dead", {
        get: function () {
            return this.dead;
        },
        set: function (value) {
            this.dead = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bomb.prototype, "DIV", {
        get: function () {
            return this._div;
        },
        set: function (value) {
            this._div = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bomb.prototype, "X", {
        get: function () {
            return this.x;
        },
        set: function (value) {
            this.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bomb.prototype, "Y", {
        get: function () {
            return this.y;
        },
        set: function (value) {
            this.y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bomb.prototype, "Width", {
        get: function () {
            return this.width;
        },
        set: function (value) {
            this.width = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bomb.prototype, "Height", {
        get: function () {
            return this.height;
        },
        set: function (value) {
            this.height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bomb.prototype, "Health", {
        get: function () {
            return this.HP;
        },
        set: function (value) {
            this.HP = value;
        },
        enumerable: true,
        configurable: true
    });
    Bomb.prototype.removeMe = function () {
        var _this = this;
        this._div.removeEventListener("click", this.mouseE);
        this._div.style.backgroundColor = "";
        if (this.numbers) {
            this.numbers.thisDiv.remove();
        }
        setTimeout(function () { return _this.removal(); }, 500);
    };
    Bomb.prototype.removal = function () {
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
        if (this.score.Clicks > 0) {
            this.HP -= 1;
            this.score.updateScore(0, -1, 0);
            if (this.HP == 1) {
                this._div.style.backgroundColor = "green";
            }
            else if (this.HP == 2) {
                this._div.style.backgroundColor = "red";
            }
            if (this.HP == 0 && this.score.Lives > 0 && this.score.Score < 40) {
                this.score.updateScore(0, 1, 1);
                if (this.score.Score == 5) {
                    this.score.updateScore(-2, 7, 0);
                }
                else if (this.score.Score == 10) {
                    this.score.updateScore(-2, 6, 0);
                }
                else if (this.score.Score == 20) {
                    this.score.updateScore(-6, 6, 0);
                }
            }
            if (!this.numbers) {
                this.numbers = new Numbers(this, this.game, String(this.HP));
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
var bigBomb = (function (_super) {
    __extends(bigBomb, _super);
    function bigBomb(x, y, g) {
        var _this = _super.call(this, x, y, 3, "purple", g) || this;
        if (!_this.numbers) {
            _this.numbers = new Numbers(_this, _this.game, "?");
        }
        return _this;
    }
    return bigBomb;
}(Bomb));
var Collisions = (function () {
    function Collisions() {
    }
    Collisions.prototype.collision = function (c1, c2) {
        return !(c2.X - c2.Width > c1.Xval + c2.Width / 2 || c2.X + c2.Width < c1.Xval - c2.Width / 2 || c2.Y - c2.Height > c1.Yval + c2.Height / 2 || c2.Y + c2.Height < c1.Yval - c2.Height / 2);
    };
    return Collisions;
}());
var Score = (function () {
    function Score() {
        var _this = this;
        this.ended = false;
        this.clicksdiv = document.getElementsByTagName("clicks")[0];
        this.scorediv = document.getElementsByTagName("score")[0];
        this.livesdiv = document.getElementsByTagName("lives")[0];
        this.noticediv = document.createElement("notice");
        this.replaydiv = document.createElement("notice");
        this.mainPlayer = document.getElementsByTagName("player")[0];
        this.clicks = 3;
        this.lives = 5;
        this.score = 0;
        this.replaydiv.addEventListener("click", function (e) { return _this.onClick(e); });
        this.replaydiv.style.marginTop = "200px";
        this.replaydiv.style.width = "300px";
        console.log(this.mainPlayer);
    }
    Object.defineProperty(Score.prototype, "Score", {
        get: function () {
            return this.score;
        },
        set: function (value) {
            this.score = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "Clicks", {
        get: function () {
            return this.clicks;
        },
        set: function (value) {
            this.clicks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Score.prototype, "Lives", {
        get: function () {
            return this.lives;
        },
        set: function (value) {
            this.clicks = value;
        },
        enumerable: true,
        configurable: true
    });
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
        if (this.ended == false) {
            if (this.score >= 40) {
                document.body.appendChild(this.noticediv);
                document.body.appendChild(this.replaydiv);
                this.noticediv.style.width = "300px";
                this.noticediv.innerHTML = "You Win!";
                this.replaydiv.innerHTML = "Restart";
                this.ended = true;
                this.Endscreen();
            }
            else if (this.lives <= 0) {
                document.body.appendChild(this.replaydiv);
                document.body.appendChild(this.noticediv);
                this.noticediv.style.width = "400px";
                this.noticediv.innerHTML = "GAME OVER";
                this.replaydiv.innerHTML = "Restart";
                this.mainPlayer.style.backgroundImage = "url(images/dead.png)";
                this.ended = true;
                this.Endscreen();
            }
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
var Player = (function () {
    function Player(x, y) {
        this.div = document.getElementsByTagName("player")[0];
        document.body.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
    }
    Object.defineProperty(Player.prototype, "Xval", {
        get: function () {
            return this.x;
        },
        set: function (value) {
            this.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "Yval", {
        get: function () {
            return this.y;
        },
        set: function (value) {
            this.y = value;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.soundtrack = document.getElementById("soundtrack");
        this.soundtrack.play();
        this.soundtrack.volume = 0.5;
        this.startUI = document.getElementsByTagName("notice")[0];
        this.collisions = new Collisions();
        this.score = new Score();
        this.player = new Player((innerWidth / 2), (innerHeight / 2));
        this.bombs = new Array();
        if (this.startUI.innerHTML = "Play") {
            this.startUI.addEventListener("click", function (e) { return _this.onClick(e); });
        }
        requestAnimationFrame(function () { return _this.SoundtrackLoop(); });
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
    Game.prototype.SoundtrackLoop = function () {
        var _this = this;
        if (this.soundtrack.currentTime >= 27) {
            this.soundtrack.currentTime = 0;
        }
        requestAnimationFrame(function () { return _this.SoundtrackLoop(); });
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
        if (this.score.Lives > 0 && this.score.Score < 40) {
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
                    this.bombs.push(new bigBomb(0, Math.random() * innerHeight, this));
                }
                else if (this.rand < 0.5 && this.rand >= 0.25) {
                    this.bombs.push(new bigBomb(Math.random() * innerWidth, 0, this));
                }
                else if (this.rand < 0.75 && this.rand >= 0.5) {
                    this.bombs.push(new bigBomb(innerWidth, Math.random() * innerHeight, this));
                }
                else {
                    this.bombs.push(new bigBomb(Math.random() * innerWidth, innerHeight, this));
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
        var _this = this;
        var biemsound = document.getElementById("biem");
        var defuse = document.getElementById("defuse");
        for (var i = 0; i < this.bombs.length; i++) {
            if (this.bombs[i] !== undefined && this.bombs[i].Dead == false) {
                if (this.collisions.collision(this.player, this.bombs[i]) || this.bombs[i].Health == 0) {
                    if (this.bombs[i].Health !== 0 && this.score.Score < 40 && this.score.Lives > 0) {
                        this.score.updateScore(1, 1, 0);
                        biemsound.pause();
                        biemsound.currentTime = 0.7;
                        biemsound.play();
                        this.bombs[i].DIV.style.backgroundImage = "url(images/explode2.gif)";
                        this.bombs[i].removeMe();
                    }
                    else {
                        defuse.pause();
                        defuse.currentTime = 0.7;
                        defuse.play();
                        this.bombs[i].removal();
                    }
                    this.bombs[i].Dead = true;
                    setTimeout(function () { return _this.undefine(_this.bombs[i]); }, 500);
                }
            }
        }
    };
    Game.prototype.undefine = function (bomb) {
        bomb = undefined;
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
        bomb.DIV.appendChild(this.div);
        this.g = game;
        this.div.innerHTML = this.HP + "";
    }
    Object.defineProperty(Numbers.prototype, "thisDiv", {
        get: function () {
            return this.div;
        },
        set: function (value) {
            this.div = value;
        },
        enumerable: true,
        configurable: true
    });
    Numbers.prototype.updateNumbers = function (HP) {
        this.div.innerHTML = HP + "";
    };
    return Numbers;
}());
var SmallBomb = (function (_super) {
    __extends(SmallBomb, _super);
    function SmallBomb(x, y, g) {
        var _this = _super.call(this, x, y, 1, "purple", g) || this;
        if (!_this.numbers) {
            _this.numbers = new Numbers(_this, _this.game, "?");
        }
        return _this;
    }
    return SmallBomb;
}(Bomb));
var StandardBomb = (function (_super) {
    __extends(StandardBomb, _super);
    function StandardBomb(x, y, g) {
        var _this = _super.call(this, x, y, 2, "", g) || this;
        if (!_this.numbers) {
            _this.numbers = new Numbers(_this, _this.game, String(_this.Health));
        }
        return _this;
    }
    return StandardBomb;
}(Bomb));
//# sourceMappingURL=main.js.map