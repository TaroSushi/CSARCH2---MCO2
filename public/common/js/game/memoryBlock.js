class memoryBlock{
    constructor(id, position, size, gravity, num){
        this.id = id
        this.image = new Image()
        this.image.src = './files/block.png'
        
        this.position = position
        this.size = size   

        this.hitbox = 
        {
            up: this.position.y ,
            down: this.position.y + this.size.y,
            left: this.position.x,
            right: this.position.x + this.size.x
        }

        this.velocity = {
            x: 0, 
            y: 0,
            a: 0
        }
        this.gravity = gravity
        
        this.num = num
        this.isHover = false
        this.isSelected = false
    }
    
    updateHitbox(){
        this.hitbox.up = this.position.y,
        this.hitbox.down = this.position.y + this.size.y,
        this.hitbox.left = this.position.x,
        this.hitbox.right = this.position.x + this.size.x
    }

    draw(){
        this.mouseInHitbox()
        
        c.drawImage(this.image, this.position.x, this.position.y)
        this.updateHitbox()

        c.fillStyle = "#087830"
        c.font = "20px Arial"
        c.fillText(('000' + this.num).substr(-3), this.position.x + 8, this.position.y + 32)

        if(this.isSelected){
            c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
            c.fillStyle = "white"
            c.font = "20px Arial"
            c.fillText(('000' + this.num).substr(-3), this.position.x + 8, this.position.y + 32)
        }
    }

    move(){
        
    }

    mouseInHitbox(){
        if(this.hitbox.left < mouse.x && this.hitbox.right > mouse.x && this.hitbox.up < mouse.y && this.hitbox.down > mouse.y){
            this.isHover = true
        }
        else{
            this.isHover = false
        }
    }
}