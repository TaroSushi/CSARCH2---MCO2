

function canvasShelfLoad(){
    c.save()
    memoryBackground.draw()
    c.fillStyle = "#087830";
    c.scale(1, 1)
    c.fillRect(0, 0, window.innerWidth, 30);
    //memoryBlockshelf.draw()
    c.restore()
}

function canvasRamLoad(){
    cRam.save()
    ramBackground.draw()
    //ram.draw()
    cRam.restore()
}


function memoryLoad(){
    canvasShelfLoad()
    canvasRamLoad()
}

function memoryAnimate(){ 
    window.requestAnimationFrame(blockAnimate)
    memoryLoad()
}

var canvasRam
var cRam
var canvas
var c

var ramBackground
var memoryBackground
var ram
var memoryBlockshelf

function startSimulation(shelf, instructions, cacheSize){

    // canvas setup
    canvas = document.querySelector('#blockShelf')
    c = canvas.getContext('2d')
    canvasRam = document.querySelector('#ram')
    cRam = canvasRam.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight-460
    canvasRam.width = cacheSize*55+5
    canvasRam.height = 400
    ramBackground = new RamBackground({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1})
    memoryBackground = new MemoryBackground({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1})
  
    for(let i = 0; i < shelf.shelf.length; i++){
        shelf.shelf[i].position.y -= 450
        shelf.shelf[i].gate.position.y -= 450
        for(let j = 0; j < shelf.shelf[i].count; j++){
            shelf.shelf[i].blocks[j].position.y -= 450
        }
    }

    memoryBlockshelf = new MemoryBlockshelf({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight-460}, shelf)
    memoryAnimate()
}