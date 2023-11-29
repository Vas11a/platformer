

let xCoor = 0;
let lCoor = 320;

const field = [
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', 'b', 'b', 'b', 'b', 'b', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 's', '', '', '', '', '', ''],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']
]

let gravity = true;
let alreadyCalled = false

const render = () => {
    
    
    const container = document.querySelector('.container');
    
    field.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            if (col === 'b') {
                pixel.style.backgroundImage = "url('./imgs/block.jpg')";
            }
            if (col === 's') {
                pixel.style.backgroundImage = "url('./imgs/stairs.png')";
            }
            pixel.style.top = `${rowIndex * 20}px`;
            pixel.style.left = `${colIndex * 20}px`;
    
            container.appendChild(pixel);
        });
    });
    container.innerHTML += `<div style="top: ${xCoor}px; left: ${lCoor}px" class="player"></div>`
}

const movePlayer = (direction) => {
    const step = 10;
    if (direction === 'left') {
        if (lCoor > 0) {
            gravity = true
            fallDown()
            alreadyCalled = true
            lCoor -= step;        
        }
        document.querySelector('.player').style.left = `${lCoor}px`;
    } else if (direction === 'right') {
        if(lCoor < 480) {
            gravity = true
            fallDown()
            alreadyCalled = true
            lCoor += step;
        }
        document.querySelector('.player').style.left = `${lCoor}px`;
    } else if (direction === 'top') {
        alreadyCalled = false
        steirs()
    }
}

const steirs = () => {
    document.querySelector('.player').style.backgroundImage = "url('./imgs/player.png')";
    if (lCoor % 20 === 0 && (field[Math.floor(xCoor / 20)][lCoor / 20] === 's' || field[Math.round(xCoor / 20)][lCoor / 20] === 's')) {
        gravity = false
        xCoor -= 10  
        document.querySelector('.player').style.top = `${xCoor}px`;  
    }
}

const fallDown = () => {
    if (gravity === false || alreadyCalled === true) return
    let myInter = setInterval(() => {
        if (gravity === false) {
            clearInterval(myInter)
        }
        xCoor += 10
        if (field[Math.round(xCoor / 20)][Math.floor(lCoor / 20)] === 'b' || field[Math.round(xCoor / 20)][Math.round(lCoor / 20)] === 'b') {
            document.querySelector('.player').style.backgroundImage = "url('./imgs/player.png')";
            xCoor -= 10
            console.log()
            document.querySelector('.player').style.top = `${xCoor}px`;
            return
        }
        document.querySelector('.player').style.top = `${xCoor}px`;
        document.querySelector('.player').style.backgroundImage = "url('./imgs/playerfly.png')";
    }, 100)
}

fallDown()

document.addEventListener('keydown', (event) => {
    if (event.key === 'a' || event.key === 'A') {
        movePlayer('left');
    } else if (event.key === 'd' || event.key === 'D') {
        movePlayer('right');
    } else if (event.key === 'w' || event.key === 'W') {
        movePlayer('top')
    } 
});



render()


