import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';

const initialGlobalProps = {
    counter: 0,
    showGenresModal: false
};

const globalProps = ( state = initialGlobalProps, action: any ) => {
    switch ( action.type ) {
        case Actions.INCREMENT_ASYNC:
            return { ...state, counter: state.counter + 1 };
        case Actions.UPDATE_SHOW_GENRES_MODAL:
            return { ...state, showGenresModal: action.show };
        default:
            return state;
    }
};

const initialMovieData = {
    currentMovieIndex: 0, 
    movies: []
};

const movieData = ( state = initialMovieData, action: any ) => {
    switch( action.type ) {
        case Actions.UPDATE_MOVIES:
            return { ...state, movies: action.movies };
        case Actions.INCREMENT_CURRENT_MOVIE_INDEX:
            console.log('incrementing...');
            return { ...state, currentMovieIndex: state.currentMovieIndex + 1 };
        default:
            return state;
    }
};

const allReducers = combineReducers({
    globalProps,
    movieData
});

export default allReducers;