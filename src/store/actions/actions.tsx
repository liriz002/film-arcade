export const UPDATE_SHOW_GENRES_MODAL = 'UPDATE_SHOW_GENRES_MODAL';
export const UPDATE_MOVIES = 'UPDATE_MOVIES';
export const INCREMENT_CURRENT_MOVIE_INDEX = 'INCREMENT_CURRENT_MOVIE_INDEX';
export const UPDATE_FILTER_STRING = 'UPDATE_FILTER_STRING';
export const UPDATE_SHOULD_APPLY_FILTER = 'UPDATE_SHOULD_APPLY_FILTER';

export function updateShowGenresModal( show: boolean ) {
    return {
        type: UPDATE_SHOW_GENRES_MODAL,
        show: show
    };
};

export function updateMovies( movies: any, atTheaterMovies: any, leftTheaterMovies: any ) {
    return {
        type: UPDATE_MOVIES,
        movies: movies,
        atTheaterMovies: atTheaterMovies,
        leftTheaterMovies: leftTheaterMovies
    }
};

export function incrementCurrentMovieIndex() {
    return {
        type: INCREMENT_CURRENT_MOVIE_INDEX
    };
};

export function updateFilterString( filterString: string ) {
    return {
        type: UPDATE_FILTER_STRING,
        filterString: filterString
    };
}

export function updateShouldApplyFilter( shouldApplyFilter: boolean ) {
    return {
        type: UPDATE_SHOULD_APPLY_FILTER,
        shouldApplyFilter: shouldApplyFilter
    }
}