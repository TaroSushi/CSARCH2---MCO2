$(document).ready(function(){
    $('#add_block_button').click(function(){
        $.post('/add_block',
            {
                number: $('#add_block_input').val()
            },
            function(data, status){
                if(status === 'success')
                {
                    $('#add_block_input').val('')
                    initialBlockCode(data)
                }//if
        });//get
    });//btn

    $('#simulate_button').click(function(){
        $.post('/start_simulation',
            {
                size: $('#cache_size_input').val(),
                numArr: blockshelf.getNumArray()
            },
            function(data, status){
                if(status === 'success')
                {
                    console.log(directMapping(data.numArr, data.size))
                }//if
        });//get
    });//btn

})