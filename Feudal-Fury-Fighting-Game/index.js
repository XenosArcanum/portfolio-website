const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 568;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.75;

const background = new Sprite ({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './Imgs/background.png',
    scale: 1,
    framesMax: 1,
    
});

const shop = new Sprite ({
    position: {
        x: 625,
        y: 171
    },
    imageSrc: './Imgs/shop.png',
    scale: 2.5,
    framesMax: 6,
    framesElapsed: 1,
});


const player = new Fighter ({
    position: {
        x: 80,
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './Imgs/samuraiMack/Idle.png',
    framesMax: 8,
    framesHold: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 137
    },
    sprites: {
        idle: {
            imageSrc: './Imgs/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './Imgs/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './Imgs/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './Imgs/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './Imgs/samuraiMack/Attack1.png',
            framesMax: 6,
            framesHold: 2
        },

        takeHit: {
            imageSrc: './Imgs/samuraiMack/Take Hit.png',
            framesMax: 4
        },
        death: {
            imageSrc: './Imgs/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 70,
            y: 0
        },
        width: 180  ,
        height: 120
    },
    

});


const enemy = new Fighter ({
    position: {
        x: (canvas.width - 130 ),
        y: 0
    }, 
    velocity: {
        x: 0,
        y: 10
    },
    color: 'blue',
    imageSrc: './Imgs/kenji/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 230,
        y: 152
    },
    sprites: {
        idle: {
            imageSrc: './Imgs/kenji/Idle.png',
            framesMax: 4,
            framesHold: 10
        },
        run: {
            imageSrc: './Imgs/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './Imgs/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './Imgs/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './Imgs/kenji/Attack1.png',
            framesMax: 4,
            framesHold: 4
        },    
        takeHit: {
            imageSrc: './Imgs/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './Imgs/kenji/Death.png',
            framesMax: 7,
        }
    },
    attackBox: {
        offset: {
            x: -180,
            y: 0
        },
        width: 180,
        height: 120
    },
    
});

const keys = {
//player keys
    a: {
        pressed: false
    },
    d: {
        pressed: false
 },
    w: {
        pressed: false
    },

//enemy keys
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


let lastKey = ''



function animate() {
    window.requestAnimationFrame(animate);

    background.update();
    shop.update();

    c.fillStyle = 'rgba(100, 100, 100, .15)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

//player movement
    
    player.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');

    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    }

//jumping
    if (player.velocity.y < 0){
        player.switchSprite('jump');
    } else if (player.velocity.y > 0 ){
        player.switchSprite('fall')
    }

//enemy movement
    enemy.velocity.x = 0;

    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');

    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    }

//enemy jumping
    if (enemy.velocity.y < 0){
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0 ){
        enemy.switchSprite('fall')
    }

//detect for collision & enemy gets hit
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) 
        && player.isAttacking 
        && player.framesCurrent === 4
    ) {
        enemy.takeHit()
        player.isAttacking = false;
        document.querySelector('#enemy-health').style.width = enemy.health + '%';
    }

//if player misses
    if (player.isAttacking && player.framesCurrent === 4){
        player.isAttacking = false;
    }

//if player gets hit
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) 
        && enemy.isAttacking 
        && enemy.framesCurrent === 2
    ) {
        player.takeHit();
        enemy.isAttacking = false;
        document.querySelector('#player-health').style.width = player.health + '%';
    }

//if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2){
        enemy.isAttacking = false;
    }

//ending game based on health
    if(enemy.health <= 0 || player.health <= 0 ){
        determineWinner({player, enemy, timerId})
    }  

};




decreaseTimer()

animate();


window.addEventListener('keydown', (event) => {
//player keys 
    if (!player.dead) {
        switch (event.key){
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;

            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;

            case 'w':
                player.velocity.y = -15;
                break;

            case ' ':
                player.attack();
                break;
        }
    }

//enemy keys
    if (!enemy.dead){
        switch (event.key){
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';       
                break;
            case 'ArrowUp':
                enemy.velocity.y = -15;
                break;

            case "Backspace":
                    enemy.attack();
                    break;
        }
    }
})

window.addEventListener('keyup', (event) => {
//player keys
    switch (event.key){
        case 'a':
            keys.a.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;

        case 'w':
            keys.w.pressed = false;
            break;

    }

//enemy keys
    switch (event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
})