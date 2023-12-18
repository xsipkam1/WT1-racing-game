class Car {
    constructor() {
        this.car = document.getElementById('car')
        this.positionX = this.getRandomXPoisition()
        this.car.style.setProperty("--x", this.positionX)
        this.positionY = parseFloat(getComputedStyle(this.car).getPropertyValue("--y"))
        this.velocity = INITIAL_VELOCITY;
        this.updatePosition();
    }

    getRandomXPoisition() {
        //const roadBounds = road.getBoundingBox()

        //tieto cisla reprezentuju pruhy 1 az 6
        const numbers = [21, 33, 45, 57, 68, 80];                           //TODO - dynamicky ziskat tieto cisla na zaklade rozlisenia obrazku cesty
                                                                            //aby to fungovalo na vsetkych zariadeniach
        const randomIndex = Math.floor(Math.random() * numbers.length);
        return numbers[randomIndex];
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
        this.updatePosition()
    }

    updatePosition() {
        this.car.style.setProperty("--y", this.positionY);
    }
}


