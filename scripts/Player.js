class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.positionX = 50;
        this.velocity = 3;
        this.minPositionX = 5;
        this.maxPositionX = 95;

        document.addEventListener('keydown', this.handleKeyPress.bind(this));

        this.updatePosition();
    }

    handleKeyPress(event) {
        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
            this.moveLeft();
        } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            this.moveRight();
        }
    }

    moveLeft() {
        this.positionX = Math.max(this.minPositionX, this.positionX - this.velocity);
        this.updatePosition();
    }

    moveRight() {
        this.positionX = Math.min(this.maxPositionX, this.positionX + this.velocity);
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.positionX}%`;
    }
}

const player = new Player();
