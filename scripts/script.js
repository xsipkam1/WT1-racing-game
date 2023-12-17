function hideElement(id){
    let element = document.getElementById(id)
    element.style.display = "none"
}

function showElement(id) {
    let element = document.getElementById(id)
    element.style.display = "block"
}   

function startGame() {
    hideElement("menu")
    hideElement("menuBackground")
    showElement("gameWindow")
    window.requestAnimationFrame(update)
}

function showTutorial(){
    hideElement("menu")
    showElement("tutorial")
}

function showMenu() {
    hideElement("tutorial")
    showElement("menu")
}

let roadY=0
let roadY2=1666
let speed = 5

document.addEventListener("keydown", function(event) {
    console.log(event.code)
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        speed = 10;
    } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        speed = 3;
    }
});

document.addEventListener("keyup", function(event) {
        speed = 5;
});

function update() {

    road.clearRoad()

    if(roadY > road.canvas.height) roadY=-road.canvas.height-speed+roadY2+20
    else roadY+=speed
    if(roadY2 > road2.canvas.height) roadY2=-road2.canvas.height-speed+roadY+20
    else roadY2+=speed
    
    road.drawRoad(roadY)
    road2.drawRoad(roadY2)
    
    if(player.isMovingLeft) {
        player.moveLeft()
    }
    if(player.isMovingRight) {
        player.moveRight()
    }
    window.requestAnimationFrame(update)
}
