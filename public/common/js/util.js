let returnProperCollisionIndex = (x,n) => (x >= n) + x

function detectCollision(index, block, blocklist, block_size){
    for (let i = 0; i < block_size; i++){
        //Get Euclidean distance, 0-45 = d 45-135 = w, 135 - 225 a, 225 - 315 = s
        var distanceX = blocklist[i].center.x - block.center.x
        var distanceY = blocklist[i].center.y - block.center.y
        var angle = (Math.atan2(distanceY, distanceX)) * (180/Math.PI)
        
        
        if(block.hitbox.left < blocklist[i].hitbox.right &&
            block.hitbox.right > blocklist[i].hitbox.left &&
            block.hitbox.up < blocklist[i].hitbox.down &&
            block.hitbox.down + block.velocity.y > blocklist[i].hitbox.up
        )
        {
            var direction
            if(angle > 45 && angle < 135)
                direction = "w"
            else if (angle >= -45 && angle <= 45)
                direction = "a"
            else if (angle > -135 && angle < -45)
                direction = "s"
            else
                direction = "d"

            return {index : index, block: returnProperCollisionIndex(i, index), point: direction, isCollide : true, angle: angle} 
        }
                    
    }
    return {isCollide : false}
}

function detectCountVertical(block, blocklist, block_size){
    var count = 0
    for (let i = 0; i < block_size; i++){
        
        if((block.hitbox.left < blocklist[i].hitbox.right &&
            block.hitbox.right > blocklist[i].hitbox.left) ||
            (block.hitbox.left === blocklist[i].hitbox.left && block.hitbox.right === blocklist[i].hitbox.right)
        )
        {
            count++
        }
                    
    }
    return count
}

function detectIsVertical(block1, block2){

    if((block1.hitbox.left < block2.hitbox.right &&
        block1.hitbox.right > block2.hitbox.left) ||
        (block1.hitbox.left === block2.hitbox.left && block1.hitbox.right === block2.hitbox.right)
    )
    {
        return true
    }

    return false
}

function detectBelow(index, block, blocklist, block_size){
    var count = 0
    var belowList = []
    for (let i = 0; i < block_size; i++){
        
        if((((block.hitbox.left < blocklist[i].hitbox.right &&
            block.hitbox.right > blocklist[i].hitbox.left) || 
            (block.hitbox.left === blocklist[i].hitbox.left && block.hitbox.right === blocklist[i].hitbox.right)) &&
            block.hitbox.down <= blocklist[i].hitbox.up )
            
        )
        {
            belowList.push(i)
            count++
        }    
    }
    if(count === 1){
        return {index : index, block: returnProperCollisionIndex(belowList[0], index), isBelow: true} 
    }
    else if(count >= 2){
        //get highest block from belowlist
        //highest is the index of the highest block
        var highest=blocklist[0].hitbox.up
        var highestInd=0
        for(let j=1; j< block_size; j++){
            if (highest < blocklist[j].hitbox.up)
                highest = blocklist[j].hitbox.up
                highestInd = j
        }
        return {index : index, block: returnProperCollisionIndex(highestInd, index), isBelow: true} 
    }
    return {isBelow : false}
}

function initialBlockCode(data){
    block.push(new Block(blockCount, {x: window.innerWidth/3.2, y: 0, a: 0}, {x: 50, y: 50}, {x: 0.3, y: 0.2}, parseInt(data.number)))

    if(blockCount>0){
        var block_list = []
        for(let j = 0; j < blockCount; j++){
            block_list.push(block[j])
        }
        // stack block
        below = detectBelow(blockCount, block[blockCount], block_list, blockCount)
        // if block is below
        if(below.isBelow){
            block[below.block].stack.isStack = true
            block[blockCount].stack.isStack = true
            block[blockCount].stack.y = block[below.block].stack.y + 1
            block[blockCount].stack.below = below.block
        }
    }

    blockCount++


}