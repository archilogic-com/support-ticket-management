import { combineReducers } from 'redux'
import moment from 'moment'

import {
 SET_SPACES
} from './actions'

export interface SpacesState {
    spaces: any[]
    selectedSpace?: any

}

const initialState: SpacesState = {
    spaces: [],
    selectedSpace: null,
}

const spaces = (state = initialState, action: { type: string, spaces: any[], space: any }) => {
    switch (action.type) {
        case SET_SPACES:
            return {
                ...state,
                spaces: action.spaces,
            }

        default:
            return state
    }
}


export const setSpaces = (spaces: any[]) => {
    return { type: SET_SPACES, spaces }
}



export default spaces