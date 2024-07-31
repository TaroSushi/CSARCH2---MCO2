$(document).ready(function(){
    $('#bits_word').on('input', function(){
        if($('#bits_word').val() <= 0){
            $('#bits_word').val('')
            window.alert("Bits per word has to be greater than 0")
        }
    });

    $('#words_block').on('input', function(){
        if($('#words_block').val() <= 0){
            $('#words_block').val('')
            window.alert("Words per block has to be greater than 0")
        }
    });

    $('#cache_size').on('input', function(){
        if($('#cache_size').val() <= 0){
            $('#cache_size').val('')
            window.alert("Cache size has to be greater than 0")
        }
    });

    $('#memory_size').on('input', function(){
        if($('#memory_size').val() <= 0){
            $('#memory_size').val('')   
            window.alert("Memory size has to be greater than 0")
        }
    });

    $('#input_start').click(function(){
        if(
            $('#bits_word').val() != '' &&
            $('#words_block').val() != '' &&
            $('#cache_size').val() != '' &&
            $('#memory_size').val() != ''
        ){
            $.post('/input-start',
                {
                    bits_word : $('#bits_word').val(),
                    words_block : $('#words_block').val(),
                    cache_size : $('#cache_size').val(),
                    memory_size : $('#memory_size').val(),
                    read_type : $('#read_type').val(),
                },
                function(data, status){
                    if(status === 'success')
                    {
                        window.location.replace("input-calculator")
                    }//if
            });//get
        }
        else{
            window.alert("Invalid Input")
        }
    });//btn
})