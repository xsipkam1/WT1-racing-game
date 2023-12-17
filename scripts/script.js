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
let roadY2=road2.canvas.height
const speed = 5
function update() {

    road.clearRoad()

    if(roadY > road.canvas.height) roadY=-road.canvas.height-speed+roadY2+10
    else roadY+=speed
    if(roadY2 > road2.canvas.height) roadY2=-road2.canvas.height-speed+roadY+10
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
