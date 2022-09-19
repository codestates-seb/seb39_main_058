import { MY_LOCATION } from './action/index';
import { curLocationState } from './curLocationState';

const locationReducer = (state = curLocationState, action) => {
    
    switch(action.type) {
        case MY_LOCATION:
            return {
                ...state,
                lat: state.payload.lat,
                lon: state.payload.lon
            }
    }    
};

export default locationReducer;