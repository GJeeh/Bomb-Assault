class Collisions{
    public collision(c1:Player, c2:Bomb):boolean{
        return !(c2.x - c2.width > c1.x + c2.width/2 || c2.x + c2.width < c1.x - c2.width/2|| c2.y - c2.height > c1.y + c2.height/2 || c2.y + c2.height < c1.y - c2.height/2);
    }
}
//bomb.x > player.x + player.width || bomb.x + bomb.width < player.x || bomb.y > player.y + player.height || bomb.y + bomb.width < player.y
//bom voorbij X || bom voor x || bom onder y || bom boven y