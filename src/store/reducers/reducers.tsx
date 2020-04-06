import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';

const initialGlobalProps = {
    counter: 0,
    showGenresModal: false,
    showMovieModal: false,
    showSuddenDeathModal: false,
    showStreamingInfoModal: true,
    currentMovieIndex: 0,
    winningMovieIndex: -1,
    inSuddenDeath: false
};

const globalProps = ( state = initialGlobalProps, action: any ) => {
    switch ( action.type ) {
        case Actions.UPDATE_SHOW_GENRES_MODAL:
            return { ...state, showGenresModal: action.show };
        case Actions.UPDATE_CURRENT_MOVIE_INDEX:
            return { ...state, currentMovieIndex: action.movieIndex };
        case Actions.UPDATE_SHOW_MOVIE_MODAL:
            return { ...state, showMovieModal: action.show };
        case Actions.UPDATE_WINNING_MOVIE:
            return { ...state, winningMovieIndex: action.winningMovieIndex };
        case Actions.UPDATE_SHOW_SUDDEN_DEATH_MODAL:
            return { ...state, showSuddenDeathModal: action.show };
        case Actions.START_SUDDEN_DEATH:
            return { ...state, showSuddenDeathModal: false, inSuddenDeath: true };
        case Actions.UPDATE_SHOW_STREAMING_INFO_MODAL:
            return { ...state, showStreamingInfoModal: action.show };
        default:
            return state;
    }
};

const initialMovieData = {
    movies: [],
    atTheaterMovies: [],
    leftTheaterMovies: [],
    votingMovies: [],
    filterString: "",
    shouldApplyFilter: false
};

const movieData = ( state = initialMovieData, action: any ) => {
    switch( action.type ) {
        case Actions.UPDATE_MOVIES:
            return { ...state, movies: action.movies, atTheaterMovies: action.atTheaterMovies, leftTheaterMovies: action.leftTheaterMovies };
        case Actions.UPDATE_FILTER_STRING:
            return { ...state, filterString: action.filterString };
        case Actions.UPDATE_SHOULD_APPLY_FILTER:
            return { ...state, shouldApplyFilter: action.shouldApplyFilter };
        case Actions.UPDATE_VOTING_MOVIES:
            return { ...state, votingMovies: action.movies };
        default:
            return state;
    }
};

const allReducers = combineReducers({
    globalProps,
    movieData
});

export default allReducers;