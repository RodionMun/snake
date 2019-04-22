import DomManipulator from "./domManipulator.js";

let points = 0

let initialUpdateRate = 250

let updateRate = initialUpdateRate

export default class Settings {
    static get initialX () {
        return 0
    }

    static get initialY () {
        return 10
    }

    static get height () {
        return 10
    }

    static get width () {
        return 10
    }

    static get updateRateStep () {
        return 10
    }

    static get updateRate () {
        return updateRate
    }

    static set updateRate (value) {
        updateRate = value
    }

    static speedUp () {
        if (Settings.updateRate - Settings.updateRateStep >= 0) {
            Settings.updateRate -= Settings.updateRateStep
        }
    }

    static resetSpeed () {
        Settings.updateRate = initialUpdateRate
    }

    static get initialSnakeParts () {
        return 3
    }

    static get points () {
        return points
    }

    static set points (value) {
        points = value

        DomManipulator.updatePoints()
    }
}
