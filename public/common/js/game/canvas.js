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
    if(blockCount > 1){

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

function canvasLoad(){
    c.save()
    background.draw()
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
    if(control.drag.block !== -1){
        if(!buttons.left){
            block[control.drag.block].isDrag = false
            if(block[control.drag.block].inShelf){
                var num = block[control.drag.block].num
                block.splice(control.drag.block)
                blockCount--
                var insertStatus = blockshelf.insert(num)
            }
            control.drag.isDragging = false
            control.drag.block = -1
        }
        //insert block to shelf
    }
    blockControl()  
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
        block : -1
    }
}

const cacheLimit = (window.innerWidth - 200) / 55

var blockCount = 0

$(document).ready(function(){

    // canvas setup
    canvas = document.querySelector('canvas')
    c = canvas.getContext('2d')
    background = new Background({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1}, '/files/background.png')
    blockroom = new Blockroom({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: 400})    
    blockshelf = new Blockshelf({x: 0, y: 480, a: 0}, {x: window.innerWidth, y: window.innerHeight-480}, '', '', '')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 6

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
            case 1: buttons.left = false; break;
            case 2: buttons.middle = false; break;
            case 3: buttons.right = false; break;
        }
    });

    // mouse move
    $(document).on('mousemove', function(event){
        mouse.x = event.clientX
        mouse.y = event.clientY
    });

});