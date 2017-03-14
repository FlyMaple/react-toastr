import * as Types from './types'

export const addToastr = (toastr) => {
    return {
        type: Types.ADD_TOASTR,
        payload: toastr
    }
}

export const removeToastr = (toastr) => {
    return {
        type: Types.REMOVE_TOASTR,
        payload: toastr
    }
}