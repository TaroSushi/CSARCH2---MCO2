class Blockshelf{
    constructor(position, size, gateImg, conveyerImg, shelfImg){
        this.position = position
        this.size = size
        this.shelfCount = Math.floor(size.y/60)
        this.shelfLimit = Math.floor((size.x-10)/50)
        this.shelves = {
            shelf : [],
            count : 0,
        }

        for(let i = 0; i < this.shelfCount; i++){
            this.shelves.shelf.push(
                {
                    position: 
                    {
                        x : this.position.x,
                        y : this.position.y + i * 60
                    },
                    blocks : [],
                    count : 0,
                    maxCount : this.shelfLimit,
                    gate : new Gate
                    (
                        {
                            x : this.position.x,
                            y : this.position.y + i * 60
                        },
                        {
                            x : 10,
                            y : 60
                        }
                    )
                }
            )
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
            this.shelves.shelf[i].gate.draw()
            for(let j = 0; j < this.shelves.shelf[i].count; j++){
                this.shelves.shelf[i].blocks[j].draw()
            }
        } 
        c.fillStyle = "#087830";
        c.scale(1, 1)
        c.fillRect(this.position.x, this.position.y+this.shelves.shelf.length*60, this.size.x, 60);
    }

    insert(num){
        var isFree = false
        for(let i = 0; i < this.shelves.shelf.length; i++){
            if(this.shelves.shelf[i].maxCount > this.shelves.shelf[i].count){
                this.shelves.shelf[i].blocks.push(new memoryBlock(
                    this.shelves.count, 
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

    getEstCell(x, y){
        x_pos = Math.round((x.toFixed(2)-10)/50)
        y_pos = Math.round((y.toFixed(2)-485)/50)
        return {x_pos: x_pos, y_pos: y_pos}
    }
    
    shelfStatus(){
        let wholeShelf = 0
        let eachShelf = [0,0,0,0,0]
        for(let i = 0; i < this.shelves.shelf.length; i++){
            for(let j = 0; j < this.shelves.shelf[i].count; j++){
                eachShelf[i]++
                wholeShelf++
            }
        }
        return {wholeShelf: wholeShelf, eachSelf: eachShelf}
    }

    getIndexFromId(inp){
        for(let i = 0; i < this.shelves.shelf.length; i++){
            for(let j = 0; j < this.shelves.shelf[i].count; j++){
                if(inp === this.shelves.shelf[i].blocks[j].id){
                    return {shelfNum: i, blockNum: j}
                }
            }
        }
    }

    isExistingDirection(direction, x, y){
        switch(direction){
            case 'w':{
                if(y > 0){
                    return true
                }
            }break;

            case 's':{
                if(y < this.shelfCount-1){
                    if(x < this.shelves.shelf[y+1].count){
                        return true
                    }
                }
            }break;

            case 'a':{
                if(x > 0){
                    return true
                }
            }break;

            case 'd':{
                if(x < this.shelfLimit-1 && (x+1) < this.shelves.shelf[y].count){
                    return true
                }
            }break;

        }
        return false
    }
}