function memoryLoad(){
    canvasShelfLoad()
    canvasRamLoad()
}

function memoryAnimate(){ 
    window.requestAnimationFrame(blockAnimate)
    memoryLoad()
}

function canvasShelfLoad(){
    cShelf.save()
    memoryBackground.draw()
    memoryBlockshelf.draw()
    cShelf.restore()
}

function canvasRamLoad(){
    cRam.save()
    ramBackground.draw()
    //ram.draw()
    cRam.restore()
}

var canvasRam
var cRam
var canvasShelf
var cShelf

var ramBackground
var memoryBackground
var ram
var memoryBlockshelf

function startSimulation(shelf, instructions, cacheSize){

    console.log(shelf)
    console.log(instructions)
    // canvas setup
    canvasShelf = document.querySelector('#blockShelf')
    cShelf = canvasShelf.getContext('2d')
    canvasRam = document.querySelector('#ram')
    cRam = canvasRam.getContext('2d')
    canvasShelf.width = window.innerWidth
    canvasShelf.height = window.innerHeight-460
    canvasRam.width = cacheSize*55+5
    canvasRam.height = 400
    ramBackground = new MemoryBackground({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1})
    memoryBackground = new RamBackground({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight}, {x: 1, y: 1})
  
    for(let i = 0; i < shelf.shelf.length; i++){
        shelf.shelf[i].position.y -= 480
        shelf.shelf[i].gate.position.y -= 480
        for(let j = 0; j < shelf.shelf[i].count; j++){
            shelf.shelf[i].blocks[j].position.y -= 480
        }
    }

    memoryBlockshelf = new MemoryBlockshelf({x: 0, y: 0, a: 0}, {x: window.innerWidth, y: window.innerHeight-460}, shelf)
    memoryAnimate()
}