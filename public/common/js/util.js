let returnProperCollisionIndex = (x,n) => (x >= n) + x

function detectCollision(index, block, blocklist, block_size){
    for (let i = 0; i < block_size; i++){
        //Distance between block centers
        var distCentX = block.center.x - blocklist[i].center.x
        var distCentY = block.center.y - blocklist[i].center.y
        //Minimum distance to separate along X and Y
        var minXDist = (block.hitbox.left/2) + (blocklist[i].hitbox.left/2)
        var minYDist = (block.hitbox.up/2) + (blocklist[i].hitbox.up/2)
        //Get depth of collision
        var depthX = distCentX > 0 ? minXDist - distCentX : -minXDist - distCentX
        var depthY = distCentY > 0 ? minYDist - distCentY : -minYDist - distCentY
        
        if(depthX != 0 && depthY != 0 ){
            if (Math.abs(depthX) < Math.abs(depthY)) {
                if (depthX>0)
                    return {index : index, block: returnProperCollisionIndex(i, index), point: "a", isCollide : true}
                else
                    return {index : index, block: returnProperCollisionIndex(i, index), point: "d", isCollide : true}
            }
            else{
                if(depthY>0)
                    return {index : index, block: returnProperCollisionIndex(i, index), point: "w", isCollide : true}
                else
                    return {index : index, block: returnProperCollisionIndex(i, index), point: "s", isCollide : true}
            }
        }
    }
    return {isCollide : false}
}