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
                            $('#modal-body-text-1').html("Too many blocks")
                            $('#modal-body-text-2').html("You can only have up to 10 blocks")
                            $('#modal-footer-text').html("Limit Error")
                        }
                    }//if
                    else{
                        $('#add_block_input').val('')
                        $('#modal').css("display", "flex")
                        $('#modal-header-text').html("Input Error")
                        $('#modal-body-text-1').html("Invalid Input")
                        $('#modal-body-text-2').html("You can only input numbers from 0-999")
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
                                $('#modal-body-text-1').html("Too many blocks")
                                $('#modal-body-text-2').html("You can only have up to 10 blocks")
                                $('#modal-footer-text').html("Limit Error")
                            }
                        }
                        else{
                            $('#add_block_input').val('')
                            $('#modal').css("display", "flex")
                            $('#modal-header-text').html("Input Error")
                            $('#modal-body-text-1').html("Invalid Input")
                            $('#modal-body-text-2').html("You can only input numbers from 0-999")
                            $('#modal-footer-text').html("Input Error")
                        }
                    }//if
            });//post
        }//if
    });//onpress

    function handleSimulationButtonClick(simulationType) {
        const cacheAccessTime = $('#cat_input').val();
        const memoryAccessTime = $('#mat_input').val();
        const wordsPerBlock = $('#wpb_input').val();
        const cacheSize = $('#cache_size_input').val(); // Get cache size input
        const readType = $('#load_option').val(); 

        if (blockshelf.count > 0 && cacheAccessTime != '' && memoryAccessTime != '' && wordsPerBlock != '' && cacheSize != '') {
            $.post('/start_simulation', {
            }, function(data, status) {
                if (status === 'success') {
                    // Move the header up
                    $('.header').addClass('move-up');
                    // fade away current page|
                    $('#input-page').css('display', 'none')
                    $('#simulation-page').css('display', 'flex')
                    switch(simulationType){
                        case "block": startSimulation(blockshelf.shelves, directMapping(blockshelf.getNumArray(), cacheSize, 1), cacheSize, cacheAccessTime, memoryAccessTime, wordsPerBlock, readType); break;
                        case "word": startSimulation(blockshelf.shelves, directMapping(blockshelf.getNumArray(), cacheSize, wordsPerBlock), cacheSize, cacheAccessTime, memoryAccessTime, wordsPerBlock, readType); break;
                    }
                    
                    // fade in new page
                }
            });
        } else {
            $('#modal').css("display", "flex");
            $('#modal-header-text').html("Input Error");
            $('#modal-body-text-1').html("Missing Input")
            $('#modal-body-text-2').html("All fields are required.");
            $('#modal-footer-text').html("Input Error");
        }
    }

    $('#block_simulate_button').click(function() {
        handleSimulationButtonClick('block');
    });

    $('#word_simulate_button').click(function() {
        handleSimulationButtonClick('word');
    });

    $('#cache_size_input').on('input', function(){
        if ($('#cache_size_input').val() <= 0) {
            $('#cache_size_input').val('')
            $('#modal').css("display", "flex")
            $('#modal-header-text').html("Input Error")
            $('#modal-body-text-1').html("Invalid Input")
            $('#modal-body-text-2').html("Cache size cannot be negative")
            $('#modal-footer-text').html("Input Error")
        } else if ($('#cache_size_input').val() >= cacheLimit-1) {
            $('#cache_size_input').val('')
            $('#modal').css("display", "flex")
            $('#modal-header-text').html("Input Error")
            $('#modal-body-text-1').html("Invalid Input")
            $('#modal-body-text-2').html(`Cache size must be less than ${cacheLimit-1}`)
            $('#modal-footer-text').html("Input Error")
        }
    });//on input
    
    $('#wpb_input').on('input', function(){
        if ($('#wpb_input').val() <= 0) {
            $('#wpb_input').val('')
            $('#modal').css("display", "flex")
            $('#modal-header-text').html("Input Error")
            $('#modal-body-text-1').html("Invalid Input")
            $('#modal-body-text-2').html("Words per block must be greater than 0")
            $('#modal-footer-text').html("Input Error")
        }
    });//on input

    $('#cat_input').on('input', function(){
        if ($('#cat_input').val() <= 0) {
            $('#cat_input').val('')
            $('#modal').css("display", "flex")
            $('#modal-header-text').html("Input Error")
            $('#modal-body-text-1').html("Invalid Input")
            $('#modal-body-text-2').html("Cache access time must be greater than 0")
            $('#modal-footer-text').html("Input Error")
        }
    });//on input

    $('#mat_input').on('input', function(){
        if ($('#mat_input').val() <= 0) {
            $('#mat_input').val('')
            $('#modal').css("display", "flex")
            $('#modal-header-text').html("Input Error")
            $('#modal-body-text-1').html("Invalid Input")
            $('#modal-body-text-2').html("Memory access time must be greater than 0")
            $('#modal-footer-text').html("Input Error")
        }
    });//on input

    $('#add_block_input').on('input', function(){
        if ($('#add_block_input').val() < 0 || $('#add_block_input').val()>999) {
            $('#add_block_input').val('')
            $('#modal').css("display", "flex")
            $('#modal-header-text').html("Input Error")
            $('#modal-body-text-1').html("Invalid Input")
            $('#modal-body-text-2').html("Number input must be between 0-999 only")
            $('#modal-footer-text').html("Input Error")
        }
    });//on input

})//document ready
