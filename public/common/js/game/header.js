$(document).ready(function(){
    $('#add_block_button').click(function(){
        $.post('/add_block',
            {
                number: $('#add_block_input').val()
            },
            function(data, status){
                if(status === 'success')
                {
                    if(data.number >= 0 && data.number <= 999 && data.number != null){
                        if(blockCount < 10){
                            $('#add_block_input').val('')
                            initialBlockCode(data)
                        }//if
                        else{
                            $('#add_block_input').val('')
                            $('#modal').css("display", "flex")
                            $('#modal-header-text').html("Limit Error")
                            $('#modal-body-text-1').html("Too much blocks")
                            $('#modal-body-text-2').html("You can only have up to 10 blocks")
                            $('#modal-footer-text').html("Limit Error")
                        }
                    }//if
                    else{
                        $('#add_block_input').val('')
                        $('#modal').css("display", "flex")
                        $('#modal-header-text').html("Input Error")
                        $('#modal-body-text-1').html("Wrong Input")
                        $('#modal-body-text-2').html("You can only Input from 0-999")
                        $('#modal-footer-text').html("Input Error")
                    }
                }//if
        });//post
    });//btn

    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            $.post('/add_block',
                {
                    number: $('#add_block_input').val()
                },
                function(data, status){
                    if(status === 'success')
                    {
                        if(data.number >= 0 && data.number <= 999 && data.number != null){
                            if(blockCount < 10){
                                $('#add_block_input').val('')
                                initialBlockCode(data)
                            }
                            else{
                                $('#add_block_input').val('')
                                $('#modal').css("display", "flex")
                                $('#modal-header-text').html("Limit Error")
                                $('#modal-body-text-1').html("Too much blocks")
                                $('#modal-body-text-2').html("You can only have up to 10 blocks")
                                $('#modal-footer-text').html("Limit Error")
                            }
                        }
                        else{
                            $('#add_block_input').val('')
                            $('#modal').css("display", "flex")
                            $('#modal-header-text').html("Input Error")
                            $('#modal-body-text-1').html("Wrong Input")
                            $('#modal-body-text-2').html("You can only Input from 0-999")
                            $('#modal-footer-text').html("Input Error")
                        }
                    }//if
            });//post
        }//if
    });//onpress

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
        if ( $('#cache_size_input').val() < cacheLimit && $('#cache_size_input').val() >= 0){
            window.alert('Invalid input');
        }//if
    });//txt
})//document ready