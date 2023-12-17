class Player {
    constructor() {
        this.car = document.getElementById('player');
        this.positionX = parseFloat(getComputedStyle(this.car).getPropertyValue("--x"))
        this.velocity = 0.25;
        this.minPositionX = 5;
        this.maxPositionX = 95;
        this.isMovingLeft = false
        this.isMovingRight = false

        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        this.updatePosition(this.positionX);
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
        this.positionX = Math.max(this.minPositionX, this.positionX - this.velocity);
        this.updatePosition(this.positionX);
    }

    moveRight() {
        this.positionX = Math.min(this.maxPositionX, this.positionX + this.velocity);
        this.updatePosition(this.positionX);
    }

    updatePosition(x) {
        this.car.style.setProperty("--x", x);
    }
}

const player = new Player();
