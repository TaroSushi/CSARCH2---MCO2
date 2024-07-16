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
            block.hitbox.down > blocklist[i].hitbox.up
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

function detectVertical(block, blocklist, block_size){
    var count = 0
    for (let i = 0; i < block_size; i++){
        
        if(block.hitbox.left < blocklist[i].hitbox.right &&
            block.hitbox.right > blocklist[i].hitbox.left
        )
        {
            count++
        }
                    
    }
    return count
}

function detectBelow(index, block, blocklist, block_size){
    var count = 0
    var belowList = []
    for (let i = 0; i < block_size; i++){
        
        if(block.hitbox.left < blocklist[i].hitbox.right &&
            block.hitbox.right > blocklist[i].hitbox.left
        )
        {
            belowList.push(i)
        }    
    }
    if(count === 1){
        return {index : index, block: returnProperCollisionIndex(belowList[0], index), isBelow: true} 
    }
    else{
        //get highest block from belowlist
        //highest is the index of the highest block
        var highest
        return {index : index, block: returnProperCollisionIndex(highest, index), isBelow: true} 
    }
    return {isBelow : false}
}