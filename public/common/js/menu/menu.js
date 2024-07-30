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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.falling-blocks');

    function createBlock() {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = Math.random() * 100 + 'vw';
        block.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random duration between 3s and 5s
        container.appendChild(block);

        block.addEventListener('animationend', () => {
            block.remove();
        });
    }

    setInterval(createBlock, 300); // Create a block every 300ms
});