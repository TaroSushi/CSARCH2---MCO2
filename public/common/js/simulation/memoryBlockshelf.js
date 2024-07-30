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

        for(let i = 0; i < this.shelfLimit; i++){
            this.destPosShelf.push({x : 0 , y : 0})
        }
        this.isMove = false
    }
    
    draw(){ 
        for(let i = 0; i < this.shelves.shelf.length; i++){
            if(!this.image){
                cShelf.fillStyle = "#087830";
                cShelf.scale(1, 1)
                cShelf.fillRect(this.shelves.shelf[i].position.x, this.shelves.shelf[i].position.y+55, this.size.x, 5);
            }else{

            }
            this.shelves.shelf[i].gate.draw()
            for(let j = 0; j < this.shelves.shelf[i].count; j++){
                this.shelves.shelf[i].blocks[j].draw()
            }
        } 
        cShelf.fillStyle = "#087830";
        cShelf.scale(1, 1)
        cShelf.fillRect(this.position.x, this.position.y+this.shelves.shelf.length*60, this.size.x, 60);
    }
}