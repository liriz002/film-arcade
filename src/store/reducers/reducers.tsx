import { combineReducers } from 'redux';
import * as Action from '../actions/actions';

const initialState = {
    counter: 0,
    showGenresModal: false
};

const globalProps = ( state = initialState, action: any ) => {
    switch ( action.type ) {
        case Action.INCREMENT_ASYNC:
            console.log( 'incrementing...' );
            return { ...state, counter: state.counter + 1 };
        case Action.UPDATE_SHOW_GENRES_MODAL:
            return { ...state, showGenresModal: action.show };
        default:
            return state;
    }
};

const initialData = { 

};

const reducer2 = ( state = initialData, action: any ) => {
    return state;
};

const allReducers = combineReducers({
    globalProps,
    reducer2
});

export default allReducers;