export const CurrentPageReducer = (state, action) => {
    
    const newState = {...state}

    if(state === undefined){
        return {
            page : 1
        }
    }

    if(action.type === "CHANGE"){
        newState.page = action.payload
    }

    return newState
}