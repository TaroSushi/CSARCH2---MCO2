
function doInstruction(n){
    
    if(!instructionSet.isOpenGateDone){
        memoryBlockshelf.openGate(gate)
        if(memoryBlockshelf.shelves.shelf[gate].gate.isInDest(memoryBlockshelf.destPos)){
            instructionSet.isOpenGateDone = true
            console.log("Done opening gate")
            memoryBlockshelf.isMove = false
        }
    }
    else{
        if(!instructionSet.isMoveShelfDone){
            console.log(memoryBlockshelf.isMove)
            memoryBlockshelf.removeOne(gate)
            if(memoryBlockshelf.isInDest(gate)){
                memoryBlockshelf.shelves.shelf[gate].count--
                instructionSet.isMoveShelfDone = true
                memoryBlockshelf.shelves.shelf[gate].blocks.splice(0,1)
                console.log("Done moving shelf")
                console.log(memoryBlockshelf.shelves.shelf[gate].count)
            }
        }
        else{
            if(!instructionSet.isCloseGateDone){
                memoryBlockshelf.closeGate(gate)
                if(memoryBlockshelf.shelves.shelf[gate].gate.isInDest(memoryBlockshelf.destPos)){
                    instructionSet.isCloseGateDone = true
                    console.log("Done closing gate")
                }
            }
            else{
                instructionSet.isInstructionDone = true
            }
        }
    }

}

function canvasShelfLoad(){
    c.save()
    memoryBackground.draw()
    memoryBlockshelf.draw()
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
    if(current < instructions.length){
        doInstruction(current)
        if(instructionSet.isInstructionDone){
            current++
            instructionSet.isOpenGateDone = false
            instructionSet.isMoveShelfDone = false
            instructionSet.isCloseGateDone = false
            instructionSet.isDropBlockDone = false
            instructionSet.isInstructionDone = false
            for(let i = 0; i < memoryBlockshelf.shelfCount; i++){
                if(memoryBlockshelf.shelves.shelf[i].count > 0){
                    gate = i
                    break;
                }
            }
        }
    }
}

function memoryAnimate(){ 
    window.requestAnimationFrame(memoryAnimate)
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
var instructions
var current
var gate

var instructionSet = {
    isOpenGateDone : false,
    isMoveShelfDone : false,
    isCloseGateDone : false,
    isDropBlockDone : false,
    isInstructionDone : false,
}

function startSimulation(shelf, instructions_, cacheSize){

    instructions = instructions_
    console.log(instructions_)
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

    current = 0
    gate = 0
  
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