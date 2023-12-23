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
    showDialog("winDialog")
    winSound.play()
    gameEnded()
}

function lose() {
    showDialog("loseDialog")
    gameEnded()
}

function gameEnded() {
    sensor.stop()
    clearInterval(countdownInterval)
    clearInterval(countdownInterval2)
    animationRunning = false
    audio1Played.value = false
    audio2Played.value = false
    audio3Played.value = false
    stopPlayingSound(gameSong)
    stopPlayingSound(audio1);
    stopPlayingSound(audio2);
    stopPlayingSound(audio3);
    audio.pause();
    audio.currentTime = 0;
}

function changeCarsVelocity(velocity) {
    cars.forEach((car) => {
        car.velocity = velocity
    });
}

function deleteCars() {
    cars.forEach((car)=>car.removeCar())
    const gameWindow = document.getElementById('gameWindow');
    const carElements = gameWindow.querySelectorAll('.car');
    carElements.forEach(carElement => {
        carElement.remove();
    });
}

function clearPreviousGame() {
    deleteCars()
    cars=[]
    carsData = []
    dodgedCars = 0
    player.restartPosition()
    animationRunning = true
}

function showTutorial(){
    document.getElementById("menuBackground").classList.add("darkened")
    hideElement("menu")
    showElement("tutorial")
}

function showMenu() {
    document.getElementById("menuBackground").classList.remove("darkened")
    menuTheme.volume=volumeControl.value
    menuTheme.play()
    stopPlayingSound(gameSong)
    hideElement("settings")
    hideElement("tutorial")
    hideElement("gameWindow")
    hideDialog("loseDialog")
    hideDialog("winDialog")
    showElement("menuBackground")
    showElement("menu")
}

function showSettings() {
    document.getElementById("menuBackground").classList.add("darkened")
    hideElement("menu")
    showElement("settings")
}

function updateCars() {
    cars.forEach((car) => {
        car.update()
        if (player.collision(car.getBoundingBox())) {
            crashSound.play()
            //console.log("KOLIZIA S AUTOM NA TRATI CISLO ", car.track)
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
let countdownInterval2

function startCountdown(time) {
    countdownInterval = setInterval(() => {
        //console.log(`Current time on countdown: ${time} seconds`)
        updateStats(time)
        if (dodgedCars === carsData.length) {
            win()
        }
        if (time === 0) {
            //console.log('Countdown reached 0 seconds. Time\'s up!')
            lose()
        }
        time--
    }, 1000);
}

function startCountdownSpawning() {
    let time = 0;
    let speed = 1000;
    function spawnCars() {
        carsData.forEach((car) => {
            if (time === car.spawn) {
                //console.log(`Alert: Time matches car.spawn value for ${car.img}`);
                cars.push(new Car(car.img, car.track, player.velocity));
            }
        });
        clearInterval(countdownInterval2);
        speed = 1000;
        if (player.velocity === SLOW_VELOCITY) {
            speed = 3500;
        } else if (player.velocity === FAST_VELOCITY) {
            speed = 500;
        }
        countdownInterval2 = setInterval(spawnCars, speed);
        time++;
    }
    setTimeout(() => {
        spawnCars();
    }, speed);
}

function startGame() {
    stopPlayingSound(menuTheme)
    clearPreviousGame()
    loadLevelData()
    startCountdownSpawning()
    hideElement("menu")
    hideElement("menuBackground")
    showElement("gameWindow")
    audio.play()
    startPlayingSound(gameSong)
    sensor.start()
    window.requestAnimationFrame(update)
}

let lastUpdateTimestamp  = window.performance.now()
function update() {
    const currentTimestamp = window.performance.now()
    const elapsedSinceLastUpdate = currentTimestamp - lastUpdateTimestamp 
    if (elapsedSinceLastUpdate >= (16.6)) {
        lastUpdateTimestamp  = currentTimestamp - (elapsedSinceLastUpdate % (16.6))
        road.update(road2.y);
        road2.update(road.y);
        player.update();
        updateCars();
    }
    if (animationRunning) {
        window.requestAnimationFrame(update)
    }
}

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyUp);

function handleKeyPress(event) {
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        audio2Played.value = false
        stopPlayingSound(audio2);
        currentRoadSpeed = HIGHEST_SPEED
        player.velocity = FAST_VELOCITY
        changeCarsVelocity(FAST_VELOCITY)
        if (animationRunning) playAudioOnce(audio1, audio1Played)
    } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        stopPlayingSound(audio2); audio2Played.value = false
        currentRoadSpeed = LOWEST_SPEED
        player.velocity = SLOW_VELOCITY
        changeCarsVelocity(SLOW_VELOCITY)
        if (animationRunning) playAudioOnce(audio3, audio3Played);
    }
}

function handleKeyUp(event) {
    if (event.code === 'KeyW' || event.code === 'ArrowUp' || event.code === 'KeyS' || event.code === 'ArrowDown') {
        currentRoadSpeed = INITIAL_SPEED
        player.velocity = INITIAL_VELOCITY
        changeCarsVelocity(INITIAL_VELOCITY)
        if (animationRunning) {
            if (event.code === 'KeyW' || event.code === 'ArrowUp') {
                playAudioOnce(audio2, audio2Played)
                audio1Played.value = false
                stopPlayingSound(audio1, audio1Played);
            }
            if (event.code === 'KeyS' || event.code === 'ArrowDown') stopPlayingSound(audio3); audio3Played.value = false
        }
    } 
}

const audio = document.getElementById('audioBasic')
const audio1 = document.getElementById('audioAccelerate')
const audio2 = document.getElementById('audioDecelerate')
const audio3 = document.getElementById('audioBreaking')
const audio1Played = { value: false }
const audio2Played = { value: false }
const audio3Played = { value: false }
const hoverSound = document.getElementById('hoverSound')
const clickSound = document.getElementById('clickSound')
const menuTheme = document.getElementById('menuTheme')
const gameSong = document.getElementById('gameSong')
const soundButtons = document.querySelectorAll('.button')
const volumeControl = document.getElementById('musicRange')
const winSound = document.getElementById('audioWin')
const crashSound = document.getElementById('audioCrash')

function stopPlayingSound(audio) {
    let volume = volumeControl.value;
    const fadeOutInterval = setInterval(() => {
        if (volume > 0.01) {
            volume -= 0.01;
            audio.volume = volume;
        } else {
            audio.pause();
            audio.currentTime = 0;
            clearInterval(fadeOutInterval);
            audio.volume = 1.0;
        }
    }, 4);
}

function startPlayingSound(audio) {
    let volumee = 0.0;

    const fadeInInterval = setInterval(() => {
        if (volumee <= volumeControl.value) {
            volumee += 0.01;
            audio.volume = volumee;
        } 
            else {
            audio.play()
            clearInterval(fadeInInterval);
        }
    }, 5);
}

function playAudioOnce(audio, audioPlayed) {
    if (!audioPlayed.value) {
        audio.play();
        audioPlayed.value = true;
    }
}

volumeControl.addEventListener('input', function() {
    menuTheme.volume = this.value;
});

menuTheme.volume=volumeControl.value
document.addEventListener('DOMContentLoaded', function () {
    menuTheme.play()
    soundButtons.forEach(function (button) {
        button.addEventListener('mouseenter', function () {
            hoverSound.play()
        });

        button.addEventListener('click', function () {
            clickSound.play()
        });
    });
});


navigator.serviceWorker.register("./serviceWorker.js")
.then((reg) => {
    console.log("service worker registered", reg)
})
.catch((err) => {
    console.log("error when registering service worker", err)
})


