class Blockroom{
    constructor(position, size){
        this.position = position
        this.size = size
        this.pixelMap = new Array(size.y).fill(0).map(() => new Array(size.x).fill(0))
    }
    
    draw(){
        if(!this.image){
            return
        }else{
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }
}