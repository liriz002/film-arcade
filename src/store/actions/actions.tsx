export const UPDATE_SHOW_GENRES_MODAL = 'UPDATE_SHOW_GENRES_MODAL';
export const UPDATE_SHOW_MOVIE_MODAL = 'UPDATE_SHOW_MOVIE_MODAL';
export const UPDATE_MOVIES = 'UPDATE_MOVIES';
export const UPDATE_CURRENT_MOVIE_INDEX = 'UPDATE_CURRENT_MOVIE_INDEX';
export const UPDATE_FILTER_STRING = 'UPDATE_FILTER_STRING';
export const UPDATE_SHOULD_APPLY_FILTER = 'UPDATE_SHOULD_APPLY_FILTER';
export const UPDATE_VOTING_MOVIES = 'UPDATE_VOTING_MOVIES';
export const UPDATE_WINNING_MOVIE = 'UPDATE_WINNING_MOVIE';
export const UPDATE_SHOW_SUDDEN_DEATH_MODAL = 'UPDATE_SHOW_SUDDEN_DEATH_MODAL';
export const START_SUDDEN_DEATH = 'START_SUDDEN_DEATH';
export const UPDATE_SHOW_STREAMING_INFO_MODAL = 'UPDATE_SHOW_STREAMING_INFO_MODAL';
export const EXIT_SUDDEN_DEATH = 'EXIT_SUDDEN_DEATH';

export function updateShowGenresModal( show: boolean ) {
    return {
        type: UPDATE_SHOW_GENRES_MODAL,
        show: show
    };
};

export function updateShowMovieModal( show: boolean ) {
    return {
        type: UPDATE_SHOW_MOVIE_MODAL,
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

export function updateCurrentMovieIndex( movieIndex: number ) {
    return {
        type: UPDATE_CURRENT_MOVIE_INDEX,
        movieIndex: movieIndex
    };
};

export function updateFilterString( filterString: string ) {
    return {
        type: UPDATE_FILTER_STRING,
        filterString: filterString
    };
};

export function updateShouldApplyFilter( shouldApplyFilter: boolean ) {
    return {
        type: UPDATE_SHOULD_APPLY_FILTER,
        shouldApplyFilter: shouldApplyFilter
    };
};

export function updateVotingMovies( movies: any ) {
    return {
        type: UPDATE_VOTING_MOVIES,
        movies: movies
    };
};

export function updateWinningMovie( winningMovieIndex: number ) {
    return {
        type: UPDATE_WINNING_MOVIE,
        winningMovieIndex: winningMovieIndex
    };
}

export function updateShowSuddenDeathModal( show: boolean ) {
    return {
        type: UPDATE_SHOW_SUDDEN_DEATH_MODAL,
        show: show
    };
}

export function startSuddenDeath() {
    return {
        type: START_SUDDEN_DEATH
    };
}

export function updateShowStreamingInfoModal( show: boolean ) {
    return {
        type: UPDATE_SHOW_STREAMING_INFO_MODAL,
        show: show
    };
};

export function exitSuddenDeath() {
    return {
        type: EXIT_SUDDEN_DEATH
    };
}