function detectCollision(block, blocklist, block_size){
    for (let i=0; i < block_size; i++){
        if(
            block.hitbox.left < blocklist[i].hitbox.right &&
            block.hitbox.right > blocklist[i].hitbox.left &&
            block.hitbox.up < blocklist[i].hitbox.down &&
            block.hitbox.down < blocklist[i].hitbox.up
        ){
            return true;
        }
    }
    return false;
}