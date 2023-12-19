function hideElement(id){
    let element = document.getElementById(id)
    element.style.display = "none"
}

function showElement(id) {
    let element = document.getElementById(id)
    element.style.display = "block"
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

 
let cars = []   
let carsData = []    
let dodgedCars = 0
function startCountdown(time) {
    const timeLeftElement = document.getElementById('timeLeft')
    const carsLeftElement = document.getElementById('carsLeft')
    const countdownInterval = setInterval(() => {
        console.log(`Current time on countdown: ${time} seconds`)
        timeLeftElement.textContent = `TIME: ${time} sec`
        carsLeftElement.textContent = `CARS LEFT: ${dodgedCars}/${carsData.length}`

        carsData.forEach((car) => {
        if (time === car.spawn) {
            console.log(`Alert: Time matches car.spawn value for ${car.img}`)
            cars.push(new Car(car.img, car.track))
            console.log(cars)
        }
        });

        if (time === 0) {
            clearInterval(countdownInterval)
            console.log('Countdown reached 0 seconds. Time\'s up!')
        }

        time--
    }, 1000);
}
                                      
function startGame() {

    getJson().then((levelData) => {
        
        const cars = levelData[0].cars
        for (const carKey in cars) {
            const carInfo = cars[carKey]
            carsData.push(carInfo)
        }
        startCountdown(levelData[0].time)

    })
    .catch((error) => {
        console.error('Error fetching or processing level data:', error)
    });

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

    cars.forEach((car) => {
        car.update()
        if (player.collision(car.getBoundingBox())) {
            console.log("KOLIZIA S AUTOM NA TRATI CISLO ", car.track)
        }
    });
    
    window.requestAnimationFrame(update)
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