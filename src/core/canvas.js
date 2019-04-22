import StateMachine from './stateMachine.js'

export default class Canvas {
    constructor (id) {
        this.canvasId = id

        this.el = document.getElementById(this.canvasId)

        this.generateField()
    }

    generateField () {
        this.field = Array(this.el.width + 1).fill(Array(this.el.height + 1))
    }

    isEmpty (x, y) {
        return typeof this.field[x][y] === 'undefined'
    }

    fieldSet (object) {
        this.field[object.x][object.y] = object
    }

    init () {
        if (this.el.getContext) {
            this.context = this.el.getContext('2d')

            this.stateMachine = new StateMachine(this)

            this.stateMachine.next()
        } else {
            const errorMessage = 'You need a browser that supports canvas technology in order to play the game.'

            throw new Error(errorMessage)
        }
    }

    clear () {
        this.generateField()
        this.context.clearRect(0,0,this.el.width,this.el.height)
    }
}
