import CanvasObject from "../core/canvasObject.js";

export default class Spawner extends CanvasObject {
    constructor (canvas) {
        super(canvas)

        this.exists = false
    }

    spawn (object) {
        this.draw(object)
    }

    destroy () {
        this.exists = false
    }

    setCoordinates () {}

    before () {}
    after () {}
}
