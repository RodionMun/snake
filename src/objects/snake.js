import MovingSpawner from "../spawn/movingSpawner.js";
import Settings from "../core/settings.js";

export default class Snake extends MovingSpawner {
    constructor (canvas) {
        super(canvas, true)

        this.color = '#F57C00'

        this.partsLength = Settings.initialSnakeParts
    }

    spawn () {
        if (!this.exists) {
            this.setCoordinates()

            for (let i = 1; i <= this.partsLength; i++) {
                const part = { x: this.x, y: this.y * i, color: this.color }

                this.parts.push(part)

                if (i === Settings.initialSnakeParts) {
                    this.lastPart = part
                }
            }

            this.exists = true
        }

        super.spawn()
    }

    feed () {
        if (this.lastPart.x === this.target.x && this.lastPart.y === this.target.y) {
            this.target.destroy()
            this.partsLength++

            Settings.points += 1

            Settings.speedUp()
        }
    }

    selfCollision() {
        super.selfCollision();

        this.destroy()

        this.eventBus.publish('change-state', { name: 'over' })
    }

    beforeShift () {
        this.feed()

        super.beforeShift()
    }

    target (target) {
        this.target = target
    }
}
