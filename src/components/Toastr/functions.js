import EventEmitter from 'eventemitter3';
const emitter = new EventEmitter();

export const funcs = {}

const func_names = ['success', 'info', 'warn', 'error', 'light']

func_names.forEach(func => {
    funcs[func] = (...args) => {
        if (args.length === 0) {
            emitter.emit('add/toastr', [func, 'Default Title', 'Default Message'])
        } else if (args.length === 1) {
            if (typeof args[0] === 'string') {
                emitter.emit('add/toastr', [func, '', args[0]])
            }
        } else if (args.length === 2 && typeof args[1] === 'object') {
            emitter.emit('add/toastr', [func, '', args[0], args[1]])
        } else {
            emitter.emit('add/toastr', [func, ...args])
        }
    }
})

export const EE = emitter