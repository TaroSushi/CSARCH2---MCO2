class MemoryBackground{
    constructor(position, size, scale){
        this.position = position
        this.size = size
        this.scale = scale
    }
    
    draw(){
        cShelf.fillStyle = "white";
        cShelf.scale(1, 1)
        cShelf.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}