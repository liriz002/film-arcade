import { combineReducers } from 'redux';
import * as Actions from '../actions/actions';

const initialGlobalProps = {
    counter: 0,
    showGenresModal: false,
    showMovieModal: false,
    currentMovieIndex: 0
};

const globalProps = ( state = initialGlobalProps, action: any ) => {
    switch ( action.type ) {
        case Actions.UPDATE_SHOW_GENRES_MODAL:
            return { ...state, showGenresModal: action.show };
        case Actions.UPDATE_CURRENT_MOVIE_INDEX:
            return { ...state, currentMovieIndex: action.movieIndex };
        case Actions.UPDATE_SHOW_MOVIE_MODAL:
            return { ...state, showMovieModal: action.show };
        default:
            return state;
    }
};

const initialMovieData = {
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
        case Actions.UPDATE_FILTER_STRING:
            return { ...state, filterString: action.filterString };
        case Actions.UPDATE_SHOULD_APPLY_FILTER:
            return { ...state, shouldApplyFilter: action.shouldApplyFilter };
        default:
            return state;
    }
};

const initialVotingData = {
    votingMovies: [],
    winningMovieIndex: 0, // index of the movie that's winning so far
    latestMovieShownIndex: 1, // index of latest movie shown; starts at 1 because you will have at least 2 movies
};

const voting = ( state = initialVotingData, action: any ) => {
    switch ( action.type ) {
        case Actions.UPDATE_VOTING_MOVIES:
            return { ...state, votingMovies: action.movies };
        default:
            return state;
    }
};

const allReducers = combineReducers({
    globalProps,
    movieData,
    voting
});

export default allReducers;