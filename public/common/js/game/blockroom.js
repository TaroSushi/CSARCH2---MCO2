class Blockroom{
    constructor(position, size){
        this.position = position
        this.size = size
    }
    
    draw(){
        c.fillStyle = "#087830";
        c.scale(1, 1)
        c.fillRect(this.position.x, this.size.y+50, this.size.x, 30);
    }
}