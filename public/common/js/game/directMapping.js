function directMapping(number, cacheSize){
    let cacheArr = new Array(cacheSize)
    let result = [];
    var block
    var isHit
    var isReplace
    var numReplaced = -1
    
    for (let i=0; i<number.length;i++){
        block = number[i]%cacheSize
        if(cacheArr[block]==number[i]){
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
        cacheArr[block] = number[i]
        result.push({number: number[i], block: block, isHit: isHit, isReplace: isReplace, numReplaced: numReplaced})
    }
    return result
}