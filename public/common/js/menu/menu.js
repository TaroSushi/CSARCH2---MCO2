$(document).ready(function(){
    $('#start_button').click(function(){
        $.post('/start',
            {
            },
            function(data, status){
                if(status === 'success')
                {
                    window.location.replace("game")
                }//if
        });//get
    });//btn
})