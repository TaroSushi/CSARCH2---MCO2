class Background{
    constructor(position, scale, imageSrc){
        this.position = position
        this.scale = scale
        this.image = new Image()
        this.image.src = imageSrc
    }
    
    draw(){
        if(!this.image){
            return
        }else{
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }
}