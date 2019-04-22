import Settings from './settings.js';
import Food from "../objects/food.js";
import Snake from "../objects/snake.js";

export default class GameLoop {
    constructor (canvas) {
        this.canvas = canvas

        this.snake = new Snake(canvas)

        this.food = new Food(canvas)

        this.snake.target(this.food)

        this.loop = null

        this.looped = false
    }

    start () {
        this.looped = true

        Settings.resetSpeed()

        Settings.points = 0

        this.gameLoop()
    }

    stop () {
        if (this.loop !== null) {
            clearTimeout(this.loop)
        }

        this.looped = false

        this.canvas.clear()
    }

    gameLoop () {
        this.canvas.clear()

        this.snake.spawn()

        this.food.spawn()

        if (this.loop !== null) {
            clearTimeout(this.loop)
        }

        if (this.looped) {
            this.loop = setTimeout(this.gameLoop.bind(this), Settings.updateRate)
        }
    }
}
