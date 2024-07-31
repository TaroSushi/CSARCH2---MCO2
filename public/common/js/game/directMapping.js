function directMapping(number, cacheSize, word_block){
    let cacheArr = new Array(cacheSize)
    let result = [];
    var block
    var isHit
    var isReplace
    var numReplaced = -1
    
    for (let i=0; i<number.length;i++){
        block = Math.floor((number[i]/word_block))%cacheSize
        if(cacheArr[block]==Math.floor((number[i]/word_block))){
            isHit = true
            isReplace = false
            numReplaced = -1
        }
        else{
            isHit = false
            isReplace = false
            if(cacheArr[block] != null){
                isReplace = true
                numReplaced = cacheArr[block]
            }
            else
                numReplaced = -1
        }
        cacheArr[block] = Math.floor((number[i]/word_block))
        result.push({number: number[i], block: block, isHit: isHit, isReplace: isReplace, numReplaced: numReplaced})
    }
    return result
}

function getTotalAccessTime(type, blockSize, cat, mat, hit, miss){
    //type==1: non load through, type==2: load through
    if(type == 1){
        
        return ((hit) * (blockSize * cat)) + ((miss) * (cat + (blockSize * (mat + cat))))
    }
        
    else{
        missPenalty = cat + (blockSize * mat)
        return ((hit) * (blockSize * cat)) + ((miss) * (cat + (blockSize * mat)))
    }
}

function getAverageAccessTime(type, blockSize, cat, mat, hit, miss){
    let missPenalty = cat + (blockSize * mat) + cat

    console.log(missPenalty)
    let total = hit+miss
    return (((hit/total)*cat) + ((miss/total) * missPenalty))
}