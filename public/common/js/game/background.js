class Background{
    constructor(position, size, scale, imageSrc){
        this.position = position
        this.size = size
        this.scale = scale
        this.image = new Image()
        this.image.src = imageSrc
    }
    
    draw(){
        if(!this.image){
            return
        }else{
            c.fillStyle = "white";
            c.scale(1, 1)
            c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
            /*
            c.scale(this.scale.x, this.scale.y)
            c.drawImage(this.image, this.position.x, this.position.y)
            c.scale(1 ,1)
            */
        }
    }
}