

function canvasLoad(){
    c.save()
    c.scale(background.scale.x,background.scale.y)
    background.draw()
    c.restore()
}

function blockControl(){
    if(buttons.middle){
        if(block.hitbox.left < mouse.x && block.hitbox.left + block.size.x/2 > mouse.x){
            if(block.hitbox.up < mouse.y && block.hitbox.down > mouse.y){
                block.velocity.x = 8
            }
        }
        if(block.hitbox.right - block.size.x/2 < mouse.x && block.hitbox.right > mouse.x){
            if(block.hitbox.up < mouse.y && block.hitbox.down > mouse.y){
                block.velocity.x = -8
            }
        }
    }

    if(buttons.left){
        if(block.hitbox.left < mouse.x && block.hitbox.right > mouse.x && block.hitbox.up < mouse.y && block.hitbox.down > mouse.y){
            block.position.x = mouse.x - block.size.x/2
            block.position.y = mouse.y - block.size.y/2
        }
    }
}

function blockLoad(){
    canvasLoad()
    block.draw()
    block.move()
    blockControl()  
}

function blockAnimate(){
    
    window.requestAnimationFrame(blockAnimate)
    blockLoad()

}

var canvas
var c
var block
var background
var blockroom

const buttons = {
    right : false,
    middle : false,
    left : false
}

const mouse = {
    x: 0,
    y: 0
}


$(document).ready(function(){

    // canvas setup
    canvas = document.querySelector('canvas')
    c = canvas.getContext('2d')
    block = new Block({x: 0, y: 0}, {x: 50, y: 50}, {x: 0.3, y: 0.2}, 500)
    background = new Background({x: 0, y: 0}, {x: 0.5122, y: 0.5}, '/files/background.png')
    blockroom = new Blockroom({x: 0, y: 0}, {x: 1533, y: 400})    

    canvas.width = 1536
    canvas.height = 600

    canvasLoad()
    blockAnimate()
    
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

    $(document).on('mousemove', function(event){
        mouse.x = event.clientX
        mouse.y = event.clientY
    });

});