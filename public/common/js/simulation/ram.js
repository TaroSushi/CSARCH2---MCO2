class Ram{
    constructor(position, size, count){
        this.position = position
        this.size = size
        this.count = count
        this.slot = []

        for(let i = 0; i < count; i++){
            this.slot.push(new Slot({x: this.position.x + i*55, y: this.position.y}, {x: 55, y: this.size.y}, i))
        }
    }

    isInDest(){
        for(let i = 0; i < this.count; i++){
            if(!this.slot[i].isInDest()){
                return false
            }
        }
        return true
    }

    draw(){
        cRam.fillStyle = "#087830";
        cRam.scale(1, 1)
        cRam.fillRect(this.position.x, this.position.y, this.size.x, 5);
        for(let i = 0; i < this.slot.length; i++){
            this.slot[i].draw()
        }
        cRam.fillStyle = "#087830";
        cRam.scale(1, 1)
        cRam.fillRect(this.position.x, this.position.y + this.size.y - 5, this.size.x, 5);

        cRam.fillStyle = "#087830";
        cRam.scale(1, 1)
        cRam.fillRect(this.position.x + this.size.x - 5, this.position.y, 5, this.size.y);
    }
}
