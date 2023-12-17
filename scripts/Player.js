class Player {
    constructor() {
        this.car = document.getElementById('player');
        this.positionX = parseFloat(getComputedStyle(this.car).getPropertyValue("--x"))
        this.velocity = 0.3;
        this.isMovingLeft = false
        this.isMovingRight = false

        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.updatePosition(this.positionX);
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

    isOnRoad(roadBounds, direction) {
        const playerCarBounds = player.getBoundingBox()

        if (direction == "left") return playerCarBounds.left >= roadBounds.left+5;
        if (direction == "right") return playerCarBounds.right <= roadBounds.right-5;
    }

    collision(car) {    //vrati true ak sa player dotkol auta "car" ( priklad volania funkcie: collision(car.getBoundingBox()) - class Car este neexistuje ale)
        const playerCarBounds = player.getBoundingBox()
        return (
            playerCarBounds.left < car.right &&
            playerCarBounds.right > car.left &&
            playerCarBounds.top < car.bottom &&
            playerCarBounds.bottom > car.top
        );
    }

    handleKeyPress(event) {
        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
            this.isMovingLeft = true
        } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            this.isMovingRight = true
        }
    }

    handleKeyUp(event) {
        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
            this.isMovingLeft = false
        } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            this.isMovingRight = false
        }
    }

    moveLeft() {
        var tempPositionX = this.positionX - this.velocity;
        if (this.isOnRoad(road.getBoundingBox(), "left")) {
            this.updatePosition(tempPositionX);
        }
    }

    moveRight() {
        var tempPositionX = this.positionX + this.velocity;
        if (this.isOnRoad(road.getBoundingBox(), "right")) {
            this.updatePosition(tempPositionX);
        }
    }

    updatePosition(x) {
        this.car.style.setProperty("--x", x);
        this.positionX = x;
    }
}

const player = new Player();
