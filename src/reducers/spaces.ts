import {
    SELECT_SAPCE, SET_SPACES
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
        case SELECT_SAPCE:
            return {
                ...state,
                selectedSpace: action.space,
            }

        default:
            return state
    }
}


export const setSpaces = (spaces: any[]) => {
    return { type: SET_SPACES, spaces }
}


export const selectSpace = (space: any) => {
    return { type: SELECT_SAPCE, space }
}

export default spaces