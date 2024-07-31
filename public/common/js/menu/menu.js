$(document).ready(function(){
    $('#game_button').click(function(){
        $.post('/start-game',
            {
            },
            function(data, status){
                if(status === 'success')
                {
                    window.location.replace("game")
                }//if
        });//get
    });//btn
    $('#calculator_button').click(function(){
        $.post('/start-calculator',
            {
            },
            function(data, status){
                if(status === 'success')
                {
                    window.location.replace("calculator")
                }//if
        });//get
    });//btn
})


document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.falling-blocks');

    function createBlock() {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = Math.random() * 100 + 'vw';
        block.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random duration between 3s and 5s
        container.appendChild(block);

        // Generate a random digit (1 or 2 digits)
        const digit = Math.floor(Math.random() * 90 + 10); // Range from 10 to 99
        block.textContent = digit;
        container.appendChild(block);

        block.addEventListener('animationend', () => {
            block.remove();
        });
    }

    setInterval(createBlock, 300); // Create a block every 300ms
});