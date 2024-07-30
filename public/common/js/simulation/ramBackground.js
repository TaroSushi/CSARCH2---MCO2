class RamBackground{
    constructor(position, size, scale){
        this.position = position
        this.size = size
        this.scale = scale
    }
    
    draw(){
        cRam.fillStyle = "white";
        cRam.scale(1, 1)
        cRam.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}