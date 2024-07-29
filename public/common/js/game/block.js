class Block{
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

        this.center = {
            x: (this.hitbox.left + this.hitbox.right)/2,
            y: (this.hitbox.up + this.hitbox.down)/2
        }

        this.velocity = {
            x: 0, 
            y: 0,
            a: 0
        }

        this.gravity = gravity

        this.num = num

        this.inShelf = false

        this.isHover = false
        this.isDrag = false
        this.isMove = {x: false, y: false}
        this.isVertical = false

        this.stack= {
            y : 0,
            isStack : false
        }
    }
    
    updateHitbox(){
        this.hitbox.up = this.position.y,
        this.hitbox.down = this.position.y + this.size.y,
        this.hitbox.left = this.position.x,
        this.hitbox.right = this.position.x + this.size.x
        this.center.x = (this.hitbox.left + this.hitbox.right)/2,
        this.center.y = (this.hitbox.up + this.hitbox.down)/2

        if(this.hitbox.up >= blockshelf.position.y){
            this.inShelf = true
        }
        else{
            this.inShelf = false
        }
    }

    draw(){
        this.mouseInHitbox()
        
        c.drawImage(this.image, this.position.x, this.position.y)
        this.updateHitbox()
        c.fillStyle = "#087830"
        c.font = "20px Arial"
        c.fillText(('000' + this.num).substr(-3), this.position.x + 8, this.position.y + 32)
    }

    move(){

        if(this.isDrag){
            this.isMove.x = true
            this.isMove.y = true
        }
        else{
            if(this.velocity.x !== 0){
                this.isMove.x = true
            }
            else{
                this.isMove.x = false
            }
            if(this.velocity.y !== 0){
                this.isMove.y = true
            }
            else{
                this.isMove.y = false
            }
        }

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if(!this.isDrag){
            //gravity
            if(this.hitbox.down + this.velocity.y > blockroom.position.y + blockroom.size.y - (this.stack.y) * this.size.y){
                this.velocity.y = 0
                this.position.y = blockroom.position.y + blockroom.size.y - (this.stack.y) * this.size.y
            }
            else{
                if(this.velocity.y < 10){
                    this.velocity.y += this.gravity.y
                }
            }
            

            if(this.hitbox.right + this.velocity.x >= blockroom.position.x + blockroom.size.x){
                this.velocity.x = 0
            }
            if(this.hitbox.left + this.velocity.x <= blockroom.position.x){
                this.velocity.x = 0
            }

            if(this.velocity.x > 0){
                this.velocity.x -= this.gravity.x
                if(this.velocity.x < 0.5){
                    this.velocity.x = 0
                }
            }
            if(this.velocity.x < 0){
                this.velocity.x += this.gravity.x
                if(this.velocity.x > -0.5){
                    this.velocity.x = 0
                }
            }
        }

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