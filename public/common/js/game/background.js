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
            c.scale(this.scale.x, this.scale.y)
            c.drawImage(this.image, this.position.x, this.position.y)
            c.scale(1 ,1)
        }
    }
}