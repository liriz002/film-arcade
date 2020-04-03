import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';

const initialGlobalProps = {
    counter: 0,
    showGenresModal: false
};

const globalProps = ( state = initialGlobalProps, action: any ) => {
    switch ( action.type ) {
        case Actions.UPDATE_SHOW_GENRES_MODAL:
            return { ...state, showGenresModal: action.show };
        default:
            return state;
    }
};

const initialMovieData = {
    currentMovieIndex: 0, 
    movies: [],
    atTheaterMovies: [],
    leftTheaterMovies: [],
    filterString: "",
    shouldApplyFilter: false
};

const movieData = ( state = initialMovieData, action: any ) => {
    switch( action.type ) {
        case Actions.UPDATE_MOVIES:
            return { ...state, movies: action.movies, atTheaterMovies: action.atTheaterMovies, leftTheaterMovies: action.leftTheaterMovies };
        case Actions.INCREMENT_CURRENT_MOVIE_INDEX:
            return { ...state, currentMovieIndex: state.currentMovieIndex + 1 };
        case Actions.UPDATE_FILTER_STRING:
            return { ...state, filterString: action.filterString };
        case Actions.UPDATE_SHOULD_APPLY_FILTER:
            return { ...state, shouldApplyFilter: action.shouldApplyFilter };
        default:
            return state;
    }
};

const allReducers = combineReducers({
    globalProps,
    movieData
});

export default allReducers;