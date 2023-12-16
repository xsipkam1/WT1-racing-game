class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.positionX = 50; 
        this.velocity = 3;

        document.addEventListener('keydown', this.handleKeyPress.bind(this));

        this.updatePosition();
    }

    handleKeyPress(event) {
        switch (event.code) {
            case 'KeyA':
                this.moveLeft();
                break;
            case 'KeyD':
                this.moveRight();
                break;
        }
    }

    moveLeft() {
        this.positionX -= this.velocity;
        this.updatePosition();
    }

    moveRight() {
        this.positionX += this.velocity;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.positionX}%`;
    }
}

const player = new Player();
