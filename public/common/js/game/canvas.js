// Helper Functions

//------------------------------------------------------------------------------------------------
//                                           Canvas Main
//------------------------------------------------------------------------------------------------

function isBlockInCanvas(block, position, size){
    if(block.hitbox.right + block.velocity.x <= position.x + size.x && 
        block.hitbox.left + block.velocity.x >= position.x &&
        block.hitbox.down + block.velocity.y <= position.y + size.y &&
        block.hitbox.up + block.velocity.y >= position.y){
                    return true
    }
    return false
}

function blockOutofBounds(i){
    if(block[i].hitbox.left + block[i].velocity.x < blockroom.position.x){
        block[i].velocity.x = 10
        block[i].position.x = i
    }

    if(block[i].hitbox.right + block[i].velocity.x > blockroom.position.x + blockroom.size.x){
        block[i].velocity.x = -10
        block[i].position.x = blockroom.position.x + blockroom.size.x - block[i].size.x
    }
}

function blockPush(i){
    if(buttons.middle){
        if(block[i].hitbox.left < mouse.x && block[i].hitbox.left + block[i].size.x/2 > mouse.x){
            if(block[i].hitbox.up < mouse.y && block[i].hitbox.down > mouse.y){
                block[i].velocity.x = 8
            }
        }
        if(block[i].hitbox.right - block[i].size.x/2 < mouse.x && block[i].hitbox.right > mouse.x){
            if(block[i].hitbox.up < mouse.y && block[i].hitbox.down > mouse.y){
                block[i].velocity.x = -8
            }
        }
    }
}

function blockDrag(i){
    if(control.drag.isDragging){ 
        if(block[i].isDrag && i === control.drag.block){
            block[i].position.x = mouse.x - block[i].size.x/2
            block[i].position.y = mouse.y - block[i].size.y/2
        }
    }

    if(block[i].isHover){
        if(buttons.left){
            if(!control.drag.isDragging){
                control.drag.block = i
                block[control.drag.block].isDrag = true
            }
            control.drag.isDragging = true
        }  
    }
}

function blockCollision(i){

    var isHorizontal = false

    var collision = detectCollision(i)

    if(collision.isCollide){
        
        switch(collision.point){
            case 'a':
                {
                    block[i].velocity.x = -8
                    isHorizontal = true
                }
            break;
            case 'd':
                {
                    block[i].velocity.x = 8
                    isHorizontal = true
                }
            break;
            case 'w': case 's':
                {
                    block[i].velocity.x = 0
                }
            break;
        }
    }

    // stack block
    var below = detectBelow(i)
    
    if(below.isBelow && !isHorizontal){
        block[i].stack.isStack = true
        block[i].stack.y = block[below.block].stack.y + 1
    }
    else{
        block[i].stack.isStack = false
        block[i].stack.y = 0
    }
    
}

function blockControl(){
    
    for(let i = 0; i < blockCount; i++){
        // prevent block from moving out of bound
        blockOutofBounds(i)

        // push block
        blockPush(i)

        // drag block
        blockDrag(i)

        //collision and stack
        blockCollision(i)
    }
}

function memoryBlockSelected(i, j){
    if(blockshelf.shelves.shelf[i].blocks[j].isHover && buttons.left && !control.selected.mouseCode && !control.drag.isDragging){
        if(!control.selected.isSelected){
            control.selected.id = blockshelf.shelves.shelf[i].blocks[j].id
            control.selected.isSelected = true
            blockshelf.shelves.shelf[i].blocks[j].isSelected = true
        }
        else{
            if(blockshelf.shelves.shelf[i].blocks[j].isSelected){
                control.selected.id = -1
                control.selected.isSelected = false
                blockshelf.shelves.shelf[i].blocks[j].isSelected = false
            }
            else{
                var index = blockshelf.getIndexFromId(control.selected.id)
                blockshelf.shelves.shelf[index.shelfNum].blocks[index.blockNum].isSelected = false
                control.selected.id = blockshelf.shelves.shelf[i].blocks[j].id
                blockshelf.shelves.shelf[i].blocks[j].isSelected = true
            }
        }
        control.selected.mouseCode = true
    }
}

function memoryBlockSwap(i, j){
    if(!control.selected.keyCode && !blockshelf.isMove){
        if(key.w){
            if(blockshelf.isExistingDirection('w', j, i)){
                control.selected.keyCode = true
                blockshelf.isMove = true
                control.selected.direction = 'w'
            }
        }
        else if(key.a){
            if(blockshelf.isExistingDirection('a', j, i)){
                control.selected.keyCode = true
                blockshelf.isMove = true
                control.selected.direction = 'a'
            }
        }
        else if(key.s){
            if(blockshelf.isExistingDirection('s', j, i)){
                control.selected.keyCode = true
                blockshelf.isMove = true
                control.selected.direction = 's'
            }
        }
        else if(key.d){
            if(blockshelf.isExistingDirection('d', j, i)){
                control.selected.keyCode = true
                blockshelf.isMove = true
                control.selected.direction = 'd'
            }
        }
    }

    if(blockshelf.isMove){
        blockshelf.move(i, j, control.selected.direction)
    }

    switch(control.selected.direction){
        case 'w':{
            if(blockshelf.shelves.shelf[i].blocks[j].isInDest(blockshelf.destPos.block1) &&
                blockshelf.shelves.shelf[i-1].blocks[j].isInDest(blockshelf.destPos.block2)){
                blockshelf.shelves.shelf[i].blocks[j].isMove = false
                blockshelf.shelves.shelf[i-1].blocks[j].isMove = false
                blockshelf.isMove = false
                blockshelf.swap(i, j, i-1, j)
                control.selected.direction = 'x'
            }
        }break;
        case 's':{
            if(blockshelf.shelves.shelf[i].blocks[j].isInDest(blockshelf.destPos.block1) &&
                blockshelf.shelves.shelf[i+1].blocks[j].isInDest(blockshelf.destPos.block2)){
                blockshelf.shelves.shelf[i].blocks[j].isMove = false
                blockshelf.shelves.shelf[i+1].blocks[j].isMove = false
                blockshelf.isMove = false
                blockshelf.swap(i, j, i+1, j)
                control.selected.direction = 'x'
            }
        }break;
        case 'a':{
            if(blockshelf.shelves.shelf[i].blocks[j].isInDest(blockshelf.destPos.block1) &&
                blockshelf.shelves.shelf[i].blocks[j-1].isInDest(blockshelf.destPos.block2)){
                blockshelf.shelves.shelf[i].blocks[j].isMove = false
                blockshelf.shelves.shelf[i].blocks[j-1].isMove = false
                blockshelf.isMove = false
                blockshelf.swap(i, j, i, j-1)
                control.selected.direction = 'x'
            }
        }break;
        case 'd':{
            if(blockshelf.shelves.shelf[i].blocks[j].isInDest(blockshelf.destPos.block1) &&
                blockshelf.shelves.shelf[i].blocks[j+1].isInDest(blockshelf.destPos.block2)){
                blockshelf.shelves.shelf[i].blocks[j].isMove = false
                blockshelf.shelves.shelf[i].blocks[j+1].isMove = false
                blockshelf.isMove = false
                blockshelf.swap(i, j, i, j+1)
                control.selected.direction = 'x'
            }
        }break;
    }
}

function memoryBlockControl(){
    for(let i = 0; i < blockshelf.shelves.shelf.length; i++){
        for(let j = 0; j < blockshelf.shelves.shelf[i].count; j++){
            memoryBlockSelected(i,j)
            if(blockshelf.shelves.shelf[i].blocks[j].isSelected){
                memoryBlockSwap(i,j)
            }
        }
    }
}

function canvasLoad(){
    c.save()
    background.draw()
    blockroom.draw()
    c.restore()
    blockshelf.draw()
}

function blockLoad(){
    canvasLoad()
    for(let i = 0; i < blockCount; i++){
        if(i < blockCount){
            block[i].draw()
            block[i].move()
        }
    }
    //
    blockControl()
    
    if(control.drag.block !== -1){
        if(!buttons.left){
            block[control.drag.block].isDrag = false
            if(block[control.drag.block].inShelf){
                var num = block[control.drag.block].num
                block.splice(control.drag.block, 1)
                blockCount--
                
                if(blockshelf.count < blockshelf.maxCount){
                    var insertStatus = blockshelf.insert(num)
                    blockshelf.count++
                    blockshelf.shelves.count++
                }
                else{
                    $('#modal').css("display", "flex")
                    $('#modal-header-text').html("Shelf Error")
                    $('#modal-body-text-1').html("Shelf is full")
                    $('#modal-body-text-2').html("Can no longer insert to shelf")
                    $('#modal-footer-text').html("Shelf Error")
                }
            }
            control.drag.isDragging = false
            control.drag.block = -1
        }
        //insert block to shelf
    }

    if(blockshelf.shelves.count>0){
        memoryBlockControl()
    }
}

function blockAnimate(){
    
    window.requestAnimationFrame(blockAnimate)
    blockLoad()

}

//------------------------------------------------------------------------------------------------
//                                           Canvas Main
//------------------------------------------------------------------------------------------------

var canvas
var c
var block = []
var background
var blockroom
var blockshelf

const buttons = {
    right : false,
    middle : false,
    left : false
}

const key = {
    w : false,
    a : false,
    s : false,
    d : false
}

const mouse = {
    x: 0,
    y: 0,
    a: 0
}

const control = {
    drag : {
        isDragging : false,
        block : -1
    },
    selected : {
        isSelected : false,
        block : -1,
        direction : 'x',
        mouseCode : false,
        keyCode : false
    }
}

const cacheLimit = Math.floor((window.innerWidth - 200) / 55)

var blockCount = 0
var idCount = 0

$(document).ready(function(){

    // canvas setup
    canvas = document.querySelector('canvas')
    c = canvas.getContext('2d')
    background = new Background({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1})
    blockroom = new Blockroom({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: 400})    
    blockshelf = new Blockshelf({x: 0, y: 480, a: 0}, {x: window.innerWidth, y: window.innerHeight-480})

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    canvasLoad()
    blockAnimate()
    
    // mouse control

    $(document).on('mousedown', function(event){
        switch(event.which){
            case 1: buttons.left = true; break;
            case 2: buttons.middle = true; break;
            case 3: buttons.right = true; break;
        }
    });

    $(document).on('mouseup', function(event){
        switch(event.which){
            case 1: buttons.left = false; control.selected.mouseCode = false; break;
            case 2: buttons.middle = false; break;
            case 3: buttons.right = false; break;
        }
    });

    $(document).on('keydown', function(event){
        switch(event.which){
            case 87: key.w = true; break;
            case 65: key.a = true; break;
            case 83: key.s = true; break;
            case 68: key.d = true; break;
        }
    });

    $(document).on('keyup', function(event){
        switch(event.which){
            case 87: key.w = false; control.selected.keyCode = false; break;
            case 65: key.a = false; control.selected.keyCode = false; break;
            case 83: key.s = false; control.selected.keyCode = false; break;
            case 68: key.d = false; control.selected.keyCode = false; break;
        }
    });

    // mouse move
    $(document).on('mousemove', function(event){
        mouse.x = event.clientX
        mouse.y = event.clientY
    });

});