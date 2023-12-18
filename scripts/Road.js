class Road {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext('2d')
        this.image = new Image()
        this.image.src = "sources/graphics/road1.png"

        this.image.onload = () => {
            this.canvas.width = this.image.width
            this.canvas.height = this.image.height
        };
    }

    drawRoad(y) {
        this.ctx.drawImage(this.image, 0, y)
    }

    getBoundingBox() {
        const rect = this.canvas.getBoundingClientRect()
        return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom
        };
    }
}

const road = new Road()
const road2 = new Road()