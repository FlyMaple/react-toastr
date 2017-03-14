import { createStore, combineReducers } from 'redux'
import reducers from '../reducers'

import { toastrReducers } from '../components/Toastr'

export default createStore(
    combineReducers({
        reducers,
        toastrReducers
    })
)