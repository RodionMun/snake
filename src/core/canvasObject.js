import Settings from "./settings.js";
import EventBus from './bus.js'

export default class CanvasObject {
    constructor (canvas) {
        this.canvas = canvas
        this.eventBus = EventBus
    }

    draw (object) {
        this.canvas.context.fillStyle = object.color
        this.canvas.context.fillRect(object.x, object.y, Settings.width, Settings.height)

        this.canvas.fieldSet(object)
    }
}
