const INITIAL_SPEED = 14
const LOWEST_SPEED = 8
const HIGHEST_SPEED = 20

class Road {
    constructor(y) {
        this.y=y
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext('2d')
        this.image = new Image()
        this.image.src = "sources/graphics/road2.png"

        this.image.onload = () => {
            this.canvas.width = this.image.width
            this.canvas.height = this.image.height
        };

    }

    update(y2) {
        if(this.y > this.canvas.height){
            this.y = -this.canvas.height - currentRoadSpeed + y2
        } else {
            this.y += currentRoadSpeed
        }
        this.drawRoad()
    }

    drawRoad() {
        this.ctx.drawImage(this.image, 0, this.y)
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

const road = new Road(0)
const road2 = new Road(road.image.height)
let currentRoadSpeed = INITIAL_SPEED