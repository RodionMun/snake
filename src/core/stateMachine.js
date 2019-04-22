import GameLoop from './gameLoop.js'
import EventBus from './bus.js'
import DomManipulator from "./domManipulator.js";

export default class StateMachine {
    static get STATES() {
        return new Map(
            [
                ['initial', {}],
                ['over', {}]
            ]
        )
    }

    constructor (canvas) {
        this.canvas = canvas

        this.subscribe()
    }

    subscribe () {
        this.eventBus = EventBus

        this.eventBus.subscribe('change-state', (data) => {
            if (data.hasOwnProperty('name')) {
                this.change(data.name)
            } else {
                throw new Error('"change-state" event data should provide a "name" attribute')
            }
        })
    }

    next () {
        this.change(StateMachine.STATES.keys().next().value)
    }

    change (state) {
        this.state = state

        const method = this[this.state]

        if (typeof method === 'function') {
            this[this.state]()
        }
        else {
            throw new Error(`Unable to find a method for state: ${this.state}`)
        }
    }

    initial () {
        DomManipulator.hideOverlay()

        this.gameLoop = new GameLoop(this.canvas)

        this.gameLoop.start()
    }

    over () {
        DomManipulator.showOverlay()

        this.gameLoop.stop()
    }
}
