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

function update() {
    road.update(road2.y)
    road2.update(road.y)
    player.update()
    window.requestAnimationFrame(update)
}


document.addEventListener('keydown', this.handleKeyPress.bind(this));
document.addEventListener('keyup', this.handleKeyUp.bind(this));

function handleKeyPress(event) {
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        currentRoadSpeed = HIGHEST_SPEED;
        player.velocity = FAST_VELOCITY
    } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        currentRoadSpeed = LOWEST_SPEED;
        player.velocity = SLOW_VELOCITY
    }
}

function handleKeyUp(event) {
    if (event.code === 'KeyW' || event.code === 'ArrowUp' || event.code === 'KeyS' || event.code === 'ArrowDown') {
        currentRoadSpeed = INITIAL_SPEED;
        player.velocity = INITIAL_VELOCITY
    } 
}