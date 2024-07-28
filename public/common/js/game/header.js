$(document).ready(function(){
    $('#add_block_button').click(function(){
        $.post('/add_block',
            {
                number: $('#add_block_input').val()
            },
            function(data, status){
                if(status === 'success')
                {
                    if(data.number >= 0 && data.number <= 999 && data.number.isInteger()){
                        $('#add_block_input').val('')
                        initialBlockCode(data)
                    }
                    else{
                        $('#add_block_input').val('')
                    }
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

    $('#cache_size_input').on('input', function(){
        if ( $('#cache_size_input').val() > cacheLimit || $('#cache_size_input').val() <= 0){
            window.alert('Invalid input');
        }//if
    });//txt
})