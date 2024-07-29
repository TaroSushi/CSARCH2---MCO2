let returnProperCollisionIndex = (x,n) => (x >= n) + x

function detectCollision(index){
    for (let i = 0; i < blockCount; i++){
        if(i !== index){
            //Get Euclidean distance, 0-45 = d 45-135 = w, 135 - 225 a, 225 - 315 = s
            var distanceX = block[i].center.x - block[index].center.x
            var distanceY = block[i].center.y - block[index].center.y
            var angle = (Math.atan2(distanceY, distanceX)) * (180/Math.PI)
            
            
            if(block[index].hitbox.left < block[i].hitbox.right &&
                block[index].hitbox.right > block[i].hitbox.left &&
                block[index].hitbox.up < block[i].hitbox.down &&
                block[index].hitbox.down  > block[i].hitbox.up
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

                return {index : index, block: i, point: direction, isCollide : true, angle: angle} 
            }
        }
                    
    }
    return {isCollide : false}
}

function detectCountVertical(index){
    var count = 0
    for (let i = 0; i < blockCount; i++){
        
        if(i !== index){
            if((block[index].hitbox.left < block[i].hitbox.right &&
                block[index].hitbox.right > block[i].hitbox.left) ||
                (block[index].hitbox.left === block[i].hitbox.left && block[index].hitbox.right === block[i].hitbox.right)
            )
            {
                count++

            }
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

function detectBelow(index){
    var count = 0
    var belowList = []
    for (let i = 0; i < blockCount; i++){
        if (i !== index){
            if((((block[index].hitbox.left < block[i].hitbox.right &&
                block[index].hitbox.right > block[i].hitbox.left) || 
                (block[index].hitbox.left === block[i].hitbox.left && block[index].hitbox.right === block[i].hitbox.right)) &&
                block[index].hitbox.down <= block[i].hitbox.up )
                
            )
            {
                belowList.push(i)
                count++
            }    
        }
        
    }
    if(count === 1){
        return {index : index, block: belowList[0], isBelow: true} 
    }
    else if(count >= 2){
        //get highest block from belowlist
        //highest is the index of the highest block
        var highest = block[belowList[0]].hitbox.up
        var highestInd = belowList[0]
        for(let j = 1; j < count; j++){
            if (block[belowList[j]].hitbox.up < highest){
                highest = block[belowList[j]].hitbox.up
                highestInd = belowList[j]
            }
        }
        return {index : index, block: highestInd, isBelow: true} 
    }
    return {isBelow : false}
}

function initialBlockCode(data){
    block.push(new Block(blockCount, {x: window.innerWidth/4, y: 0, a: 0}, {x: 50, y: 50}, {x: 0.3, y: 0.2}, parseInt(data.number)))
    
    blockCount++


}