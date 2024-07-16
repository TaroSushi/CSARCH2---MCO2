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
        var direction
        if(angle > 45 && angle < 135)
            direction = "w"
        else if (angle>=45 && angle <= 45)
            direction = "a"
        else if (angle > -135 && angle < -45)
            direction = "s"
        else if (angle >= 135 && angle <= -135)
            direction = "d"

        return {index : index, block: returnProperCollisionIndex(i, index), point: direction, isCollide : true, angle: angle}             
    }
    return {isCollide : false}
}