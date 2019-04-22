import Settings from "../core/settings.js";
import Spawner from "./spawner.js";

export default class RandomSpawner extends Spawner {
    constructor (canvas) {
        super(canvas)
    }

    get randomCoordinate () {
        const coordinate = Math.floor(Math.random() * (this.canvas.el.height - Settings.height))
        return Math.round(coordinate / 10) * 10
    }

    setCoordinates () {
        this.x = this.randomCoordinate
        this.y = this.randomCoordinate
    }

    before () {}
    after () {}

    spawn () {
        if (!this.exists) {
            this.setCoordinates()

            if (!this.canvas.isEmpty(this.x, this.y)) {
                this.spawn()
            }

            this.exists = true
        }

        this.before()

        super.spawn(this)

        this.after()
    }
}
