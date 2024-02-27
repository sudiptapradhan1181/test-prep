class EventEmitterPoly {
    eventMap = {} // Event -> Set

    subscribe (event, fn) {
        if(!this.eventMap.hasOwnProperty(event))
            this.eventMap[event] = new Set()

        this.eventMap[event].add(fn)

        return {
            unsubscribe: () => {
                this.eventMap[event].delete(fn)
            }
        }
    }

    emit(event, ...args) {
        const res = []
        if(!!this.eventMap[event]){
            this.eventMap[event].forEach((fn) => {
                res.push(fn(...args))
            })
        }
        
        return res
    }
}

function logger() {
    console.log('On click triggered')
}

const emitter = new EventEmitterPoly()

const sub = emitter.subscribe("onClick", logger)

emitter.emit('onClick')

sub.unsubscribe()

emitter.emit('onClick')

