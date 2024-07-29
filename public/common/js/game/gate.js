class Gate{
    constructor(position, size){
        this.position = position
        this.size = size
    }

    draw(){
        if(!this.image){
            c.fillStyle = "#087830";
            c.scale(1, 1)
            c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        }else{
            
        }
    }
}