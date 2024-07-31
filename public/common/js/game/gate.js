class Gate{
    constructor(position, size){
        this.position = position
        this.size = size
        this.velocity = {x:0,y:0}
        this.gravity = {x:0,y:0}
        this.isMove = false
    }

    draw(){
        c.fillStyle = "#087830";
        c.scale(1, 1)
        c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
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
                    this.isMove = false
                }
            }break;
            case 's':{
                this.position.y += this.velocity.y
                this.velocity.y += this.gravity.y
                if(this.position.y > destPos.y){
                    this.position.y = destPos.y
                    this.velocity.y = 0
                    this.gravity.y = 0
                    this.isMove = false
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
}