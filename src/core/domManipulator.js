import Settings from "./settings.js";

export default class DomManipulator {
    static updatePoints () {
        const el = document.getElementById('points')

        el.innerText = Settings.points
    }

    static hideOverlay () {
        document.getElementById('overlay').style.zIndex = '-1';
    }

    static showOverlay () {
        document.getElementById('overlay').style.zIndex = '1';
    }
}
