function hideElement(id){
    let element = document.getElementById(id)
    element.style.display = "none"
}

function showElement(id) {
    let element = document.getElementById(id)
    element.style.display = "block"
}

function hideDialog(id) {
    let element = document.getElementById(id)
    element.style.zIndex = '-1'
    element.close()
}

function showDialog(id) {
    let element = document.getElementById(id)
    element.style.zIndex = '1'
    element.showModal()
}

function updateStats(time) {
    timeLeftElement.textContent = `TIME: ${time} sec`
    carsLeftElement.textContent = `CARS LEFT: ${dodgedCars}/${carsData.length}`
}

function win() {
    clearInterval(countdownInterval)
    animationRunning = false
    showDialog("winDialog")
}

function lose() {
    clearInterval(countdownInterval)
    animationRunning = false
    showDialog("loseDialog")
}

function deleteCars() {
    cars.forEach((car)=>car.removeCar())
    const gameWindow = document.getElementById('gameWindow');
    const carElements = gameWindow.querySelectorAll('.car');
    carElements.forEach(carElement => {
        carElement.remove();
    });
    cars=[]
}

function clearPreviousGame() {
    deleteCars()
    carsData = []
    dodgedCars = 0
    player.restartPosition()
    animationRunning = true
}

function showTutorial(){
    hideElement("menu")
    showElement("tutorial")
}

function showMenu() {
    hideElement("tutorial")
    hideElement("gameWindow")
    hideDialog("loseDialog")
    hideDialog("winDialog")
    showElement("menuBackground")
    showElement("menu")
}

function updateCars() {
    cars.forEach((car) => {
        car.update()
        if (player.collision(car.getBoundingBox())) {
            console.log("KOLIZIA S AUTOM NA TRATI CISLO ", car.track)
            lose()
        }
    });
}

async function getJson() {
    const response = await fetch("./data/levels.json")
    if(response.ok) {
        const levels = await response.json()
        if (levels) {
            const levelKeys = Object.keys(levels)
            const randomLevelKey = levelKeys[Math.floor(Math.random() * levelKeys.length)]
            const randomLevelData = levels[randomLevelKey]
            return randomLevelData
        }
    }
}

function loadLevelData() {
    getJson().then((levelData) => {
        const cars = levelData[0].cars
        for (const carKey in cars) {
            const carInfo = cars[carKey]
            carsData.push(carInfo)
        }
        updateStats(levelData[0].time)
        startCountdown(levelData[0].time-1)
    })
    .catch((error) => {
        console.error('Error fetching or processing level data:', error)
    });
}

let cars = []
let carsData = []
let dodgedCars = 0
let animationRunning = false
const loseDialog = document.getElementById('loseDialog')
const winDialog = document.getElementById('winDialog')
const timeLeftElement = document.getElementById('timeLeft')
const carsLeftElement = document.getElementById('carsLeft')
let countdownInterval

function startCountdown(time) {
    countdownInterval = setInterval(() => {
        console.log(`Current time on countdown: ${time} seconds`)
        updateStats(time)
        if (dodgedCars === carsData.length) {
            win()
        }
        carsData.forEach((car) => {
            if (time === car.spawn) {
                console.log(`Alert: Time matches car.spawn value for ${car.img}`)
                cars.push(new Car(car.img, car.track))
                console.log(cars)
            }
        });
        if (time === 0) {
            console.log('Countdown reached 0 seconds. Time\'s up!')
            lose()
        }
        time--
    }, 1000);
}

function startGame() {
    clearPreviousGame()
    loadLevelData()
    hideElement("menu")
    hideElement("menuBackground")
    showElement("gameWindow")
    window.requestAnimationFrame(update)
}

function update() {
    road.update(road2.y)
    road2.update(road.y)
    player.update()
    updateCars()
    if (animationRunning) {
        window.requestAnimationFrame(update)
    }
}



document.addEventListener('keydown', this.handleKeyPress.bind(this))
document.addEventListener('keyup', this.handleKeyUp.bind(this))

function handleKeyPress(event) {
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        currentRoadSpeed = HIGHEST_SPEED
        player.velocity = FAST_VELOCITY
    } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        currentRoadSpeed = LOWEST_SPEED
        player.velocity = SLOW_VELOCITY
    }
}

function handleKeyUp(event) {
    if (event.code === 'KeyW' || event.code === 'ArrowUp' || event.code === 'KeyS' || event.code === 'ArrowDown') {
        currentRoadSpeed = INITIAL_SPEED
        player.velocity = INITIAL_VELOCITY
    } 
}