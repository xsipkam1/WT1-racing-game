class Road {
    constructor() {
        this.road = document.getElementById('road');
    }

    getBoundingBox() {
        const rect = this.road.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom
        };
    }

}

const road = new Road();
