let playingOnMobile = window.matchMedia('(max-width: 540px)').matches

class Car {
    constructor(img, track) {
        this.car = document.createElement("img")
        this.car.src = img
        this.car.alt = "car"
        this.car.className = "car"
        document.getElementById("gameWindow").appendChild(this.car)
        this.track=track
        this.positionX = this.getRandomXPoisition(this.track)
        this.car.style.setProperty("--x", this.positionX)
        this.positionY = parseFloat(getComputedStyle(this.car).getPropertyValue("--y"))
        this.velocity = INITIAL_VELOCITY;
        this.updatePosition();

        window.addEventListener('resize', () => this.handleWindowSizeChange())
    }

    handleWindowSizeChange() {
        playingOnMobile = window.matchMedia('(max-width: 540px)').matches
        this.positionX = this.getRandomXPoisition(this.track)
        this.car.style.setProperty("--x", this.positionX)
    }

    getRandomXPoisition(track) {
        let xPositions
        if(!playingOnMobile) {
            xPositions = [21, 33, 45, 57, 68, 80]  
        } else {
            xPositions = [9, 25, 42, 59, 75, 92]  
        }
        return xPositions[track-1]
    }

    removeCar() {
        this.car.parentNode.removeChild(this.car)
        cars.splice(0, 1)
    }

    getBoundingBox() {
        const rect = this.car.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom
        };
    }

    update() {
        this.positionY+=INITIAL_VELOCITY
        if(this.positionY > 120) {
            this.removeCar()
            dodgedCars++
        }
        this.updatePosition()
    }

    updatePosition() {
        this.car.style.setProperty("--y", this.positionY);
    }
}
