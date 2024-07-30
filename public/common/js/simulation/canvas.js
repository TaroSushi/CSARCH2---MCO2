function blockAnimate(){
    
    window.requestAnimationFrame(blockAnimate)
    blockLoad()

}

function canvasShelfLoad(){
    cShelf.save()
    background.draw()
    blockshelf.draw()
    cShelf.restore()
}

function canvasRamLoad(){
    cRam.save()
    background.draw()
    ram.draw()
    cRam.restore()
}

var canvasRam
var cRam
var canvasShelf
var cShelf

var background
var ram
var blockshelf

function startSimulation(blockshelf){

    // canvas setup
    canvasShelf = document.querySelector('#blockShelf')
    cShelf = canvasShelf.getContext('2d')
    canvasRam = document.querySelector('#ram')
    cRam = canvasRam.getContext('2d')
    canvasShelf.width = window.innerWidth
    canvasShelf.height = window.innerHeight-480
    background = new Background({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1})
  
    blockshelf = new Blockshelf({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight-480})
    canvasLoad()
    memoryAnimate()
}