import * as Types from './types'

const initState = {
    toastrs: []
}

const guid = () => {
  const r = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return r() + r() + r() + '-' + r() + '_' + r() + '-' + r() + '_' + r() + r() + r();
}

export default (state = initState, action) => {
    switch (action.type) {
        case Types.ADD_TOASTR:
            const { type, title, message, options, newestOnTop } = action.payload

            const toastr = {
                id: guid(),
                type,
                title,
                message,
                options
            }

            if (newestOnTop) {
                return {
                    ...state,
                    toastrs: [
                        toastr,
                        ...state.toastrs
                    ]
                }
            } else {
                return {
                    ...state,
                    toastrs: [
                        ...state.toastrs,
                        toastr
                    ]
                }
            }
        case Types.REMOVE_TOASTR:
            return {
                ...state,
                toastrs: state.toastrs.filter(toastr => toastr.id !== action.payload.id)
            }
        default:
            return state
    }
}