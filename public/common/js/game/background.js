class Background{
    constructor(position, size, scale){
        this.position = position
        this.size = size
        this.scale = scale
    }
    
    draw(){
        c.fillStyle = "white";
        c.scale(1, 1)
        c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}