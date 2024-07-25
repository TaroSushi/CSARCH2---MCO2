class Blockroom{
    constructor(position, size){
        this.position = position
        this.size = size
    }
    
    draw(){
        if(!this.image){
            return
        }else{
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }
}