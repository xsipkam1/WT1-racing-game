const INITIAL_VELOCITY = 0.5
const SLOW_VELOCITY = 0.2
const FAST_VELOCITY = 0.75

class Player {
    constructor() {
        this.car = document.getElementById('player');
        this.positionX = parseFloat(getComputedStyle(this.car).getPropertyValue("--x"))
        this.velocity = INITIAL_VELOCITY;
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

    update() {
        if(this.isMovingLeft) {
            this.moveLeft()
        }
        if(this.isMovingRight) { 
            this.moveRight() 
        }
    }

    isOnRoad(roadBounds, direction) {
        const playerCarBounds = this.getBoundingBox()

        if (direction == "left") return playerCarBounds.left >= roadBounds.left+5;
        if (direction == "right") return playerCarBounds.right <= roadBounds.right-5;
    }

    collision(car) {
        const playerCarBounds = this.getBoundingBox()
        return (
            playerCarBounds.left < car.right - 7 &&
            playerCarBounds.right > car.left + 7 &&
            playerCarBounds.top < car.bottom - 10 &&
            playerCarBounds.bottom > car.top + 5
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

    restartPosition() {
        this.car.style.setProperty("--x", 57);
        this.positionX = 57;
    }

    updatePosition(x) {
        this.car.style.setProperty("--x", x);
        this.positionX = x;
    }
}

const player = new Player();

let sensor = new Gyroscope({ frequency: 50 });

sensor.onreading = () => {
    const roadBounds = road.getBoundingBox();
    const playerBounds = player.getBoundingBox();
    if (playerBounds.left < roadBounds.left) {
        player.car.style.setProperty("--x", roadBounds.left+5);
    } else if (playerBounds.right > roadBounds.right-5) {
        player.car.style.setProperty("--x", roadBounds.left+90);
    } else {
        player.car.style.setProperty("--x", (player.car.offsetLeft+(sensor.y * 50)) / window.screen.width*100);
    }
};
