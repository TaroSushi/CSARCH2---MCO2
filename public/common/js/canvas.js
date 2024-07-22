// Helper Functions


function isBlockInCanvas(block, position, size){
    if(block.hitbox.right + block.velocity.x <= position.x + size.x){
        if(block.hitbox.left + block.velocity.x >= position.x){
            if(block.hitbox.down + block.velocity.y <= position.y + size.y){
                if(block.hitbox.up + block.velocity.y >= position.y){
                    return true
                }
            }
        }
    }
    return false
}

//-------------------

function canvasLoad(){
    c.save()
    background.draw()
    c.restore()
}

function blockControl(){
    
    for(let i = 0; i < blockCount; i++){
            // prevent block from moving out of bound
        if(block[i].hitbox.left + block[i].velocity.x < blockroom.position.x){
            block[i].velocity.x = 10
            block[i].position.x = i
        }

        if(block[i].hitbox.right + block[i].velocity.x > blockroom.position.x + blockroom.size.x){
            block[i].velocity.x = -10
            block[i].position.x = blockroom.position.x + blockroom.size.x - block[i].size.x
        }

        // push block
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

        // drag block
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
                    block[i].isDrag = true
                }
                control.drag.isDragging = true
            }  
        }

        if(!buttons.left){
            block[i].isDrag = false
            control.drag.isDragging = false
        }

        
        if(blockCount >= 2){

            var block_list = []
            for(let j = 0; j < blockCount; j++){
                if(i != j){
                    block_list.push(block[j])
                }
            }
            
            if(block[i].isMove.x){
                
                var collision = detectCollision(i, block[i], block_list, blockCount-1)

                if(collision.isCollide){
                    
                    switch(collision.point){
                        case 'a':
                            {
                                block[i].velocity.x = -8
                            }
                        break;
                        case 'd':
                            {
                                block[i].velocity.x = 8
                            }
                        break;
                        case 'w': case 's':
                            {
                                if(!block[i].isStack){
                                    block[i].velocity.x = 0
                                }
                            }
                        break;
                    }
                }
            }

            if(block[i].isMove.y){
                // stack block
                console.log(block[i])
                console.log(block_list)
                below = detectBelow(i, block[i], block_list, blockCount-1)
                console.log(below)
                // if block is below
                if(below.isBelow){
                    block[below.block].stack.isStack = true
                    block[i].stack.isStack = true
                    block[i].stack.y = block[below.block].stack.y + 1
                    block[i].stack.below = below.block
                }
            }

            vertical = detectCountVertical(block[i], block_list, blockCount-1)
            //detect if should fall down due to gravity and loss of platform block
            if(block[i].stack.isStack){
                if(vertical === 0){
                    block[i].stack.isStack = false
                    block[i].stack.y = 0
                    block[i].stack.below = -1
                }
                else{
                    // detect actual y level position then make sure to make it fall down when block.stack.below is gone
                    // block.stack.below change to array since possible of 2 blocks below it
                    if(block[i].stack.y > vertical){
                        below = detectBelow(i, block[i], block_list, blockCount-1)
                        if(below.isBelow){
                            block[below.block].stack.isStack = true
                            block[i].stack.isStack = true
                            block[i].stack.y = block[below.block].stack.y + 1
                            block[i].stack.below = below.block
                        }
                        else{
                            //let the bottom block go down first
                            block[i].stack.y = 0
                            block[i].stack.below = -1
                        }
                    }
                }
            }
        }
    }
}


function blockLoad(){
    canvasLoad()
    for(let i = 0; i < blockCount; i++){
        block[blockCount-i-1].draw()
        block[blockCount-i-1].move()
    }
    blockControl()  
}

function blockAnimate(){
    
    window.requestAnimationFrame(blockAnimate)
    blockLoad()

}

const d = new Date();

var canvas
var c
var block = []
var background
var blockroom

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
    }
}

var blockCount = 0

$(document).ready(function(){

    // canvas setup
    canvas = document.querySelector('canvas')
    c = canvas.getContext('2d')
    background = new Background({x: 0, y: 0, a: 0}, {x: (window.innerWidth/3000), y: (window.innerWidth/2500)}, '/files/background.png')
    blockroom = new Blockroom({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: 400})    

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - 6

    canvasLoad()
    blockAnimate()
    
    // mouse click
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