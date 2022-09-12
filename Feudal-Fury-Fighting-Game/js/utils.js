function rectangularCollision({rectangle1, rectangle2}) {
    return(
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x 
        && player.attackBox.position.x <= enemy.position.x + enemy.width 
        && player.attackBox.position.y + player.attackBox.height >= enemy.position.y
        && player.attackBox.position.y <= enemy.position.y + enemy.height
    )
}


function determineWinner ({player, enemy}){
    clearTimeout(timerId)

    document.querySelector('#result').style.display = 'flex';

    if (player.health === enemy.health) {
        document.querySelector('#result').innerHTML = 'Tie';
    } else if (player.health > enemy.health){
        document.querySelector('#result').innerHTML = 'Yojimbo Wins!';
    } else if (player.health < enemy.health){
        document.querySelector('#result').innerHTML = 'Oni Tengu Wins!';
    } 
}


let timer = 90;
let timerId;
function  decreaseTimer () {
    timerId = setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    if (timer === 0){
        determineWinner({player, enemy, timerId})
    }
};
