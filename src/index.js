import Canvas from './core/canvas.js'
import EventBus from './core/bus.js'

const canvas = new Canvas('app')

canvas.init()

document.getElementById('restartButton').addEventListener('click', () => {
    EventBus.publish('change-state', { name: 'initial' })
})
