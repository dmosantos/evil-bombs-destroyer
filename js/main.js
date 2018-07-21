function reset() {
    stop();
    start();
}

function pause() {
    running = !running;
}

function stop() {
    frame = 0;
    running = false;
    dtStart = null;
    points = 0;
    $canvas = document.getElementById("canvas");
    $points = document.getElementById("points");
    $player = null;
    $playerLife = null;
    elements = [];
    clientX = 0;
    clientY = 0;
    nivel = 1;
    bonus = {
        ready: false,
        newTimer: 0,
        last: new Date(),
        tribullet: {
            active: false,
            duration: 10000,
            timeout: null,
            $: document.getElementById('bonus-tribullet')
        },
        multiplebullet: {
            active: false,
            duration: 10000,
            timeout: null,
            $: document.getElementById('bonus-multiplebullet')
        },
        speedbullet: {
            active: false,
            duration: 10000,
            timeout: null,
            $: document.getElementById('bonus-speedbullet')
        },
        life: {
            active: false,
            duration: 100,
            timeout: null
        }
    }

    var $remover = document.querySelectorAll('.remover');;
    $remover.forEach(function($elem) {
        $elem.remove();
    });
}

function start() {
    if(dtStart)
        stop();

    running = true;
    dtStart = new Date();
    dtLastEnemy = new Date();
    newEnemyTimer = 1000;
    
    $player = new Player();
    $playerLife = new PlayerLife;
}

reset();

function loop() {
    if(running) {
        frame++;

        if((new Date()) - dtLastEnemy > newEnemyTimer)  {
            switch(random(1, nivel)) {
                case 1:
                    new EnemyBomb(1);
                    break;
                case 2:
                    new EnemyBomb(2);
                    break;
                case 3:
                    new EnemyBomb(3);
                    break;
                case 4:
                    new EnemyBomb(4);
                    break;
            }
            dtLastEnemy = new Date();
            newEnemyTimer = random(nivel < 4 ? 1000 : 300, 4000 - (nivel * 1000));
        }

        if((new Date()) - bonus.last > bonus.newTimer)  {
            bonus.ready = true;
            bonus.last = new Date();
            bonus.newTimer = random(nivel < 4 ? 7000 : 9000, 12000);
        }

        for(var i = 0; i < elements.length; i++) {
            if(elements[i])
                elements[i].baseUpdate();
            if(elements[i])
                elements[i].baseRender();
        }
        
        $points.innerHTML = points;

        bonus.tribullet.$.style.display = bonus.tribullet.active ? 'block' : 'none';
        bonus.multiplebullet.$.style.display = bonus.multiplebullet.active ? 'block' : 'none';
        bonus.speedbullet.$.style.display = bonus.speedbullet.active ? 'block' : 'none';

        elements = elements.filter(function(item, index){
            return !item.dead;
        });
    
        if((new Date()) - dtStart > 30000 && nivel == 1)
            nivel = 2;
        else if((new Date()) - dtStart > 60000 && nivel == 2)
            nivel = 3;
        else if((new Date()) - dtStart > 120000 && nivel == 3)
            nivel = 4;
        
        //nivel = 4;
    }
    requestAnimFrame(loop);
}
loop();

function gameOver() {
    alert('FIM DO JOGO!\n\nSua pontuação: ' + points);
    stop();
    start();
}