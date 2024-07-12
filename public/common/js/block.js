class Block{
    constructor(position, size, gravity, num){
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
            y: 0
        }

        this.gravity = gravity

        this.num = num

        this.inShelf = false

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
        
        c.drawImage(this.image, this.position.x, this.position.y)
        this.updateHitbox()
        c.fillStyle = "rgba(0,255,0,0.2)"
        c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
        c.fillStyle = "rgba(0,0,0,1)"
        c.font = "20px Arial"
        c.fillText(this.num, this.position.x + 8, this.position.y + 32)
    }

    move(){

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if(!this.inShelf){
            //gravity
            if(this.hitbox.down + this.velocity.y >= blockroom.position.y + blockroom.size.y){
                this.velocity.y = 0
            }
            else{
                if(this.velocity.y < 10){
                    this.velocity.y += this.gravity.y
                }
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
}