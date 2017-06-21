class Collisions{
    public collision(c1:Player, c2:Bomb):boolean{
        return !(c2.X - c2.Width > c1.Xval + c2.Width/2 || c2.X + c2.Width < c1.Xval - c2.Width/2|| c2.Y - c2.Height > c1.Yval + c2.Height/2 || c2.Y + c2.Height < c1.Yval - c2.Height/2);
    }
}
//bomb.x > player.x + player.width || bomb.x + bomb.width < player.x || bomb.y > player.y + player.height || bomb.y + bomb.width < player.y
//bom voorbij X || bom voor x || bom onder y || bom boven y