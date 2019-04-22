import Spawner from "./spawner.js";
import Helpers from '../core/helpers.js'
import Settings from "../core/settings.js";

export default class MovingSpawner extends Spawner {
    constructor (canvas, canManipulate = false) {
        super(canvas)

        this.parts = []
        this.partsLength = 0

        if (canManipulate) {
            this.registerMovementHooks()
        }
    }

    spawn () {
        this.parts.forEach(part => super.spawn(part))

        this.before()

        this.move(this.x, this.y)

        this.after()
    }

    setCoordinates() {
        this.x = Settings.initialX
        this.y = Settings.initialY
    }

    handleYTransition () {
        if (this.lastPart.y > this.canvas.el.height || this.lastPart.y < 0) {
            this.selfCollision()
        }
    }

    handleXTransition () {
        if (this.lastPart.x > this.canvas.el.width || this.lastPart.x < 0) {
            this.selfCollision()
        }
    }

    handleTransitions () {
        this.handleYTransition()
        this.handleXTransition()
    }

    // simple hooks, just overwrite them
    before () {}

    selfCollision () {}

    beforeShift () {
        this.handleTransitions()
    }

    after () {}

    move (x = 0, y = 0) {
        const part = { x: null, y: null, color: this.color }

        part.x = x === 0 ? this.lastPart.x : this.lastPart.x + x
        part.y = y === 0 ? this.lastPart.y : this.lastPart.y + y

        // object can not just reverse
        if (part.x === this.parts[this.parts.length-2].x && part.y === this.parts[this.parts.length-2].y) {
            return
        }

        const collision = this.parts.some(existed => (existed.x === part.x && existed.y === part.y))

        if (collision) {
            this.selfCollision()
        }

        this.parts.push(part)

        this.lastPart = part

        this.beforeShift()

        if (this.parts.length > this.partsLength) {
            this.parts.shift()
        }

        this.x = x
        this.y = y

        return part
    }

    moveToBottom () {
        this.move(0, 10)
    }

    moveToTop () {
        this.move(0, -10)
    }

    moveToLeft () {
        this.move(-10, 0)
    }

    moveToRight () {
        this.move(10, 0)
    }

    registerMovementHooks () {
        const handler = () => {
            if (event.code === 'ArrowUp') {
                this.moveToTop()
            }

            if (event.code === 'ArrowDown') {
                this.moveToBottom()
            }

            if (event.code === 'ArrowLeft') {
                this.moveToLeft()
            }

            if (event.code === 'ArrowRight') {
                this.moveToRight()
            }
        }

        document.onkeyup = Helpers.debounce(handler, 180, true)
    }
}
