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

        this.velocity = {
            x: 0, 
            y: 0,
            a: 0
        }

        this.previous = {
            position : {
                x: 0, 
                y: 0,
                a: 0
            }
        }

        this.gravity = gravity

        this.num = num

        this.inShelf = false

        this.isHover = false
        this.isDrag = false

        this.mouseDisplacement = {
            left : 0,
            right : 0,
            up: 0,
            down: 0
        }
    }
    
    updateHitbox(){
        this.hitbox.up = this.position.y,
        this.hitbox.down = this.position.y + this.size.y,
        this.hitbox.left = this.position.x,
        this.hitbox.right = this.position.x + this.size.x

        if(!mouse.left){
            this.mouseDisplacement.left = mouse.x - this.position.x
            this.mouseDisplacement.right = this.position.x + this.size.x - mouse.x
            this.mouseDisplacement.up = mouse.y - this.position.y
            this.mouseDisplacement.dowm = this.position.y + this.size.y - mouse.y
        }
    }

    draw(){
        this.mouseInHitbox()
        
        c.drawImage(this.image, this.position.x, this.position.y)
        this.updateHitbox()
        c.fillStyle = "rgba(0,0,0,1)"
        c.font = "20px Arial"
        c.fillText(('000' + this.num).substr(-3), this.position.x + 8, this.position.y + 32)
    }

    move(){

        this.previous.position = this.position

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if(!this.inShelf){
            //gravity
            if(this.hitbox.down + this.velocity.y > blockroom.position.y + blockroom.size.y){
                this.velocity.y = 0
                this.position.y = blockroom.position.y + blockroom.size.y
            }
            else{
                if(this.velocity.y < 10){
                    this.velocity.y += this.gravity.y
                }
            }

            if(this.hitbox.down >= blockroom.position.y + blockroom.size.y){
                this.position.y = blockroom.position.y + blockroom.size.y
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

        this.updatePixelMap()
    }

    updatePixelMap(){
        //update's the pixelmap by it's movement, 1 if it's there, 0 if it's not
        //blockroom.pixelMap
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