class MemoryBlockshelf{
    constructor(position, size, shelf){
        this.position = position
        this.size = size
        this.shelfCount = Math.floor(size.y/60)
        this.shelfLimit = Math.floor((size.x-10)/50)
        this.count = 0
        this.maxCount = this.shelfCount * this.shelfLimit
        this.shelves = shelf
        this.destPosShelf = []
        this.destPos = {x : 0 , y : 0}
        this.isMove = false

        for(let i = 0; i < this.shelfLimit; i++){
            this.destPosShelf.push({x : 0 , y : 0})
        }
        this.isMove = false
    }
    
    draw(){ 
        c.fillStyle = "#087830";
        c.scale(1, 1)
        c.fillRect(0, 0, window.innerWidth, 30);
        for(let i = 0; i < this.shelves.shelf.length; i++){
            c.fillStyle = "#087830";
            c.scale(1, 1)
            c.fillRect(this.shelves.shelf[i].position.x, this.shelves.shelf[i].position.y+55, this.size.x, 5);
            this.shelves.shelf[i].gate.draw()
            for(let j = 0; j < this.shelves.shelf[i].count; j++){
                this.shelves.shelf[i].blocks[j].draw()
            }
        } 
        c.fillStyle = "#087830";
        c.scale(1, 1)
        c.fillRect(this.position.x, this.position.y+30+this.shelves.shelf.length*60, this.size.x, 60);
    }

    removeOne(i){
        console.log(this.isMove)
        if(!this.shelves.shelf[i].blocks[0].isMove && !this.isMove){
            console.log("yes")
            this.shelves.shelf[i].blocks[0].isMove = true
            this.shelves.shelf[i].blocks[0].velocity.x = -2
            this.shelves.shelf[i].blocks[0].gravity.x = 0.002
            this.destPosShelf[0].x = this.shelves.shelf[i].blocks[0].position.x - 70
            this.destPosShelf[0].y = this.shelves.shelf[i].blocks[0].position.y 
        }
        this.shelves.shelf[i].blocks[0].move(
            this.destPosShelf[0],
            'a'
        )
        if(this.shelves.shelf[i].blocks[0].isInDest(this.destPosShelf[0])){
            this.shelves.shelf[i].blocks[0].isMove = false
        }
        for(let j = 1; j < this.shelves.shelf[i].count; j++){
            if(!this.shelves.shelf[i].blocks[j].isMove && !this.isMove){
                this.shelves.shelf[i].blocks[j].isMove = true
                this.shelves.shelf[i].blocks[j].velocity.x = -2
                this.shelves.shelf[i].blocks[j].gravity.x = 0.002
                this.destPosShelf[j].x = this.shelves.shelf[i].blocks[j].position.x - 50
                this.destPosShelf[j].y = this.shelves.shelf[i].blocks[j].position.y 
            }
            this.shelves.shelf[i].blocks[j].move(
                this.destPosShelf[j],
                'a'
            )
            if(this.shelves.shelf[i].blocks[j].isInDest(this.destPosShelf[j])){
                this.shelves.shelf[i].blocks[j].isMove = false
            }
        }
        if(!this.isMove){
            this.isMove = true
        }
    }

    isInDest(i){
        for(let j = 0; j < this.shelves.shelf[i].count; j++){
            if(!this.shelves.shelf[i].blocks[j].isInDest(this.destPosShelf[j])){
                return false
            }
        }
        return true
    }

    openGate(i){
        if(!this.shelves.shelf[i].gate.isMove){
            this.shelves.shelf[i].gate.isMove = true
            this.shelves.shelf[i].gate.velocity.y = -1
            this.shelves.shelf[i].gate.gravity.y = 0.001
            this.destPos.x = this.shelves.shelf[i].gate.position.x
            this.destPos.y = this.shelves.shelf[i].gate.position.y - 50
        }
        this.shelves.shelf[i].gate.move(
            this.destPos,
            'w'
        )
        if(this.shelves.shelf[i].gate.isInDest(this.destPos)){
            this.shelves.shelf[i].gate.isMove = false
        }
    }

    closeGate(i){
        if(!this.shelves.shelf[i].gate.isMove){
            this.shelves.shelf[i].gate.isMove = true
            this.shelves.shelf[i].gate.velocity.y = 1
            this.shelves.shelf[i].gate.gravity.y = -0.001
            this.destPos.x = this.shelves.shelf[i].gate.position.x
            this.destPos.y = this.shelves.shelf[i].gate.position.y + 50
        }
        this.shelves.shelf[i].gate.move(
            this.destPos,
            's'
        )
        if(this.shelves.shelf[i].gate.isInDest(this.destPos)){
            this.shelves.shelf[i].gate.isMove = false
        }
    }
}