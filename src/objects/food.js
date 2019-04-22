import RandomSpawner from "../spawn/randomSpawner.js";

export default class Food extends RandomSpawner {
    constructor (canvas) {
        super(canvas)

        this.color = '#388E3C'
    }
}
