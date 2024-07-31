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
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.falling-blocks');
    const names = ["Aldwin Renzel Dimaculangan", "Enzo Arkin Panugayan", "Alyssa Jane Santos", "Sean Andrei Olores"];

    function createBlock() {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = Math.random() * 100 + 'vw';
        block.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random duration between 3s and 5s
        container.appendChild(block);

        // Generate a random digit (1 or 2 digits)
        const digit = Math.floor(Math.random() * 90 + 10); // Range from 10 to 99
        block.textContent = digit;

        block.addEventListener('animationend', () => {
            block.remove();
        });
    }

    function createName() {
        const name = document.createElement('div');
        name.classList.add('falling-name');
        name.style.left = Math.random() * 100 + 'vw';
        name.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random duration between 3s and 5s
        name.textContent = names[Math.floor(Math.random() * names.length)];
        container.appendChild(name);

        name.addEventListener('animationend', () => {
            name.remove();
        });
    }

    setInterval(createBlock, 300); // Create a block every 300ms
    setInterval(createName, 20000); // Create a name every 500ms
});