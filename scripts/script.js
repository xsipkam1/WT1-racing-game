function hideElement(id){
    let element = document.getElementById(id)
    element.style.display = "none"
}

function showElement(id) {
    let element = document.getElementById(id)
    element.style.display = "block"
}   

function update() {
    if(player.isMovingLeft) {
        player.moveLeft()
        console.log(player.isOnRoad(road.getBoundingBox()))
    }
    if(player.isMovingRight) { 
        player.moveRight() 
        console.log(player.isOnRoad(road.getBoundingBox()))
    }
    window.requestAnimationFrame(update)

}

function startGame() {
    hideElement("menu")
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


