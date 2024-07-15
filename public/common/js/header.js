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
                    block.push(new Block(blockCount, {x: window.innerWidth/3.2, y: 0, a: 0}, {x: 50, y: 50}, {x: 0.3, y: 0.2}, parseInt(data.number)))
                    blockCount++
                    window.alert(blockCount)
                }//if
        });//get
    });//btn

})