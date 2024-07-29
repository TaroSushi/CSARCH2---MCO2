class Blockshelf{
    constructor(position, size, gateImg, conveyerImg, shelfImg){
        this.position = position
        this.size = size
        this.shelfCount = Math.floor(size.y/60)
        this.shelfLimit = Math.floor((size.x-10)/50)
        this.shelves = {
            shelf : []
        }

        for(let i = 0; i < this.shelfCount; i++){
            this.shelves.shelf.push({
                position: {
                    x : this.position.x,
                    y : this.position.y + i * 60
                },
                blocks : [],
                count : 0,
                maxCount : this.shelfLimit
            })
        }

        this.gate = gateImg
        this.conveyer = conveyerImg
        this.shelf = shelfImg
    }
    
    draw(){ 
        for(let i = 0; i < this.shelves.shelf.length; i++){
            if(!this.image){
                c.fillStyle = "#087830";
                c.scale(1, 1)
                c.fillRect(this.shelves.shelf[i].position.x, this.shelves.shelf[i].position.y+55, this.size.x, 5);
            }else{

            }
            for(let j = 0; j < this.shelves.shelf[i].count; j++){
                this.shelves.shelf[i].blocks[j].draw()
            }
        } 

    }

    insert(num){
        var isFree = false
        for(let i = 0; i < this.shelves.shelf.length; i++){
            if(this.shelves.shelf[i].maxCount > this.shelves.shelf[i].count){
                this.shelves.shelf[i].blocks.push(new memoryBlock(
                    this.shelves.shelf[i].count, 
                    {x : 10 + 50 * this.shelves.shelf[i].count, y : this.position.y + i * 60 + 5},
                    {x: 50, y: 50},
                    {x: 0.3, y: 0.2},
                    num
                ))
                this.shelves.shelf[i].count++
                isFree = true
                break;
            }
        }
        console.log(this.shelves.shelf[0].blocks[0])
        return isFree
    }

    getNumArray(){
        var numArr = []
        for(let i = 0; i < this.shelves.shelf.length; i++){
            for(let j = 0; j < this.shelves.shelf[i].count; j++){
                numArr.push(this.shelves.shelf[i].blocks[j].num)
            }
        } 
        return numArr
    }
}