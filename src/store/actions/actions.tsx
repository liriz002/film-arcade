export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const UPDATE_SHOW_GENRES_MODAL = 'UPDATE_SHOW_GENRES_MODAL';
export const UPDATE_MOVIES = 'UPDATE_MOVIES';
export const INCREMENT_CURRENT_MOVIE_INDEX = 'INCREMENT_CURRENT_MOVIE_INDEX';

export function incrementAsync() {
    return {
        type: INCREMENT_ASYNC
    };
};

export function updateShowGenresModal( show: boolean ) {
    return {
        type: UPDATE_SHOW_GENRES_MODAL,
        show: show
    };
};

export function updateMovies( movies: any ) {
    return {
        type: UPDATE_MOVIES,
        movies: movies
    }
};

export function incrementCurrentMovieIndex() {
    return {
        type: INCREMENT_CURRENT_MOVIE_INDEX
    };
};