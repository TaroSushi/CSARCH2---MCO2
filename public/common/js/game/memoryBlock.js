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

        this.isMove = false
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

    move(destPos, direction){
        switch(direction){
            case 'w':{
                this.position.y += this.velocity.y
                this.velocity.y += this.gravity.y
                if(this.position.y < destPos.y){
                    this.position.y = destPos.y
                    this.velocity.y = 0
                    this.gravity.y = 0
                }
            }break;
            case 's':{
                this.position.y += this.velocity.y
                this.velocity.y += this.gravity.y
                if(this.position.y > destPos.y){
                    this.position.y = destPos.y
                    this.velocity.y = 0
                    this.gravity.y = 0
                }
            }break;
            case 'a':{
                this.position.x += this.velocity.x
                this.velocity.x += this.gravity.x
                if(this.position.x < destPos.x){
                    this.position.x = destPos.x
                    this.velocity.x = 0
                    this.gravity.x = 0
                }
            }break;
            case 'd':{
                this.position.x += this.velocity.x
                this.velocity.x += this.gravity.x
                if(this.position.x > destPos.x){
                    this.position.x = destPos.x
                    this.velocity.x = 0
                    this.gravity.x = 0
                }
            }break;
        }
        
    }

    isInDest(destPos){
        if(this.position.x === destPos.x && this.position.y === destPos.y){
            return true
        }
        return false
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