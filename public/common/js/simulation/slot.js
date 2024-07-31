class Slot{
    constructor(position, size, id){
        this.id = id
        this.position = position
        this.size = size

        this.fallingBlock = []
        this.block = []

        this.isMove = false

        this.destPos = {
            x : 0,
            y : 0
        }
    }

    insertFallingBlock(num){
        if(this.fallingBlock.length == 0){
            this.fallingBlock.push(new ramBlock({x: this.position.x + 5, y: this.position.y - 50}, {x: 50, y: 50}, num))
        }
    }

    insertBlock(num){
        if(this.block.length == 0){
            this.block.push(new ramBlock({x: this.position.x + 5, y: this.position.y + this.size.y - 55}, {x: 50, y: 50}, num))
        }
    }

    deleteFallingBlock(){
        if(this.fallingBlock.length > 0){
            this.fallingBlock.splice(0,1)
        }
    }

    deleteBlock(){
        if(this.block.length > 0){
            this.block.splice(0,1)
        }
    }

    move(){
        if(!this.fallingBlock[0].isMove && !this.isMove){
            this.fallingBlock[0].isMove = true
            this.fallingBlock[0].velocity.y = 4
            this.fallingBlock[0].gravity.y = -0.005
            this.destPos.x = this.fallingBlock[0].position.x
            this.destPos.y = this.position.y + this.size.y - 55
        }
        this.fallingBlock[0].move(
            this.destPos,
            's'
        )
        if(this.fallingBlock[0].isInDest(this.destPos)){
            this.fallingBlock[0].isMove = false
        }
    }

    isInDest(){
        if(this.fallingBlock[0].isInDest(this.destPos)){
            return true
        }
        return false
    }

    draw(){
        cRam.fillStyle = "#087830";
        cRam.scale(1, 1)
        cRam.fillRect(this.position.x, this.position.y, 5, this.size.y);
        if(this.block.length > 0){
            this.block[0].draw()
        }
        if(this.fallingBlock.length > 0){
            this.fallingBlock[0].draw()
        }
    }
}