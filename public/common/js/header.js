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

})