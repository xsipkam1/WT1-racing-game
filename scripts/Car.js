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
    }

    getRandomXPoisition(track) {
        //const roadBounds = road.getBoundingBox()

        //tieto cisla reprezentuju pruhy 1 az 6
        const numbers = [21, 33, 45, 57, 68, 80];                           //TODO - dynamicky ziskat tieto cisla na zaklade rozlisenia obrazku cesty
                                                                            //aby to fungovalo na vsetkych zariadeniach
        return numbers[track-1];
    }

    remove() {
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
            this.remove()
            dodgedCars++
        }
        this.updatePosition()
    }

    updatePosition() {
        this.car.style.setProperty("--y", this.positionY);
    }
}


