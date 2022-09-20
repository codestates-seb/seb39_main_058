import { MY_LOCATION } from './action/index';
import { curLocationState } from './curLocationState';

const locationReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case MY_LOCATION:
            return {
                ...state(pos => pos.coords),
                latitude: state.payload.lat,
                longitude: state.payload.lon
            }
    }    
};

export default locationReducer;