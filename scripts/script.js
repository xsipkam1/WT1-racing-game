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
    timeLeftElement.textContent = `TIME: ${time.toFixed(1)} sec`
    carsLeftElement.textContent = `CARS LEFT: ${dodgedCars}/${carsData.length}`
}

function win() {
    gameEnded()
    showDialog("winDialog")
}

function lose() {
    gameEnded()
    showDialog("loseDialog")
}

function gameEnded() {
    clearInterval(countdownInterval)
    clearInterval(countdownInterval2)
    animationRunning = false
    stopPlayingSound(audio1, audio1Played);
    stopPlayingSound(audio2, audio2Played);
    stopPlayingSound(audio3, audio3Played);
    audio.pause();
    audio.currentTime = 0;


}

function deleteCars() {
    cars.forEach((car)=>car.removeCar())
    const gameWindow = document.getElementById('gameWindow');
    const carElements = gameWindow.querySelectorAll('.car');
    carElements.forEach(carElement => {
        carElement.remove();
    });
}

function changeCarsVelocity(velocity) {
    cars.forEach((car) => {
        car.velocity = velocity
    });
}

function clearPreviousGame() {
    deleteCars()
    cars = []
    carsData = []
    dodgedCars = 0
    player.restartPosition()
    animationRunning = true
}

function showTutorial(){
    hideElement("menu")
    showElement("tutorial")
}
const menuSong = document.getElementById('menuSong');
startPlayingSound(menuSong)

function startPlayingSound(audio) {
    let volumee = 0.0;

    const fadeInInterval = setInterval(() => {
        if (volumee <= 0.99) {
            volumee += 0.01;
            audio.volume = volumee;
            console.log(audio.volume)
        } 
            else {
            audio.play()
            clearInterval(fadeInInterval);
        }
    }, 5);
}

const gameSong = document.getElementById('gameSong');

function showMenu() {
    hideElement("tutorial")
    hideElement("gameWindow")
    hideDialog("loseDialog")
    hideDialog("winDialog")
    showElement("menuBackground")
    showElement("menu")
    menuSong.play()
    stopPlayingSound(gameSong)

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
let countdownInterval2

function startCountdown(time) {
    countdownInterval = setInterval(() => {
        console.log(`Current time on countdown: ${time} seconds`)
        updateStats(time)
        if (dodgedCars === carsData.length) {
            win()
        }
        console.log(cars)
        console.log(carsData)
        if (time === 0) {
            console.log('Countdown reached 0 seconds. Time\'s up!')
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
                console.log(`Alert: Time matches car.spawn value for ${car.img}`);
                cars.push(new Car(car.img, car.track, player.velocity));
            }
        });

        console.log(speed);
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


const audio = document.getElementById('audioBasic');

function startGame() {
    clearPreviousGame()
    loadLevelData()
    startCountdownSpawning()
    hideElement("menu")
    hideElement("menuBackground")
    showElement("gameWindow")
    audio.play()
    startPlayingSound(gameSong)
    stopPlayingSound(menuSong)
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

const audio1 = document.getElementById('audioAccelerate');
const audio2 = document.getElementById('audioDecelerate');
const audio3 = document.getElementById('audioBreaking');

const audio1Played = { value: false };
const audio2Played = { value: false };
const audio3Played = { value: false };

function playAudioOnce(audio, audioPlayed) {
    if (!audioPlayed.value) {
        audio.play();
        audioPlayed.value = true;
        console.log(audioPlayed.value);
        console.log(audio3Played);
    }
}

function stopPlayingSound(audio) {
    let volume = 1.0;

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

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyUp);

function handleKeyPress(event) {
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
        audio2Played.value = false
        stopPlayingSound(audio2, audio2Played);
        currentRoadSpeed = HIGHEST_SPEED
        player.velocity = FAST_VELOCITY
        changeCarsVelocity(FAST_VELOCITY)
        if (animationRunning) playAudioOnce(audio1, audio1Played)
    } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
        stopPlayingSound(audio2, audio2Played); audio2Played.value = false
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
            if (event.code === 'KeyS' || event.code === 'ArrowDown') stopPlayingSound(audio3, audio3Played); audio3Played.value = false
        }
    }
}