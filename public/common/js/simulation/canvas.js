function blockAnimate(){
    
    window.requestAnimationFrame(blockAnimate)
    blockLoad()

}

function canvasLoad(){
    c.save()
    background.draw()
    blockroom.draw()
    c.restore()
    blockshelf.draw()
}

var canvasRam
var cRam
var canvasShelf
var cShelf
var background
var blockroom
var blockshelf

$(document).ready(function(){

    var message 
    console.log(message)

    // canvas setup
    canvasShelf = document.querySelector('#blockShelf')
    cShelf = canvasShelf.getContext('2d')
    canvasShelf.width = window.innerWidth
    canvasShelf.height = window.innerHeight
    background = new Background({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1})
  
    blockshelf = new Blockshelf({x: 0, y: 480, a: 0}, {x: window.innerWidth, y: window.innerHeight-480})
    canvasLoad()
    memoryAnimate()

});