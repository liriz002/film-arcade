export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const UPDATE_SHOW_GENRES_MODAL = 'UPDATE_SHOW_GENRES_MODAL';

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