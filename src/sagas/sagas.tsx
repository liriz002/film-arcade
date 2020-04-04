import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../store/actions/actions';

// const delay = ( ms: number ) => new Promise( res => setTimeout( res, ms ) );

export function *fetchMovies() {
    let moviesJSON = yield fetch('https://us-central1-squadflick.cloudfunctions.net/getTheaterAtHomeMovies')
                    .then( dataWrappedByPromise => dataWrappedByPromise.json() )
                    .then( json => json );


    moviesJSON.forEach(( movie: any, index: number ) => {
        movie.id = index;
    });

    // We deep-copy the movies JSON to separate movies into their respective categories
    let allMovies = JSON.parse( JSON.stringify( moviesJSON ) );
    let atTheater = allMovies.splice( 0, 10 );
    let leftTheater = allMovies.splice( 0 );

    yield put({ type: actions.UPDATE_MOVIES, movies: moviesJSON, atTheaterMovies: atTheater, leftTheaterMovies: leftTheater });
    yield put({ type: actions.UPDATE_VOTING_MOVIES, movies: moviesJSON }); // TODO: this will change from here to select not all movies but appropriate movies for voting (e.g. if there's a filter)
}

export default function *rootSaga() {
    yield all([
        //helloSaga(),
        //watchIncrementAsync(),
        fetchMovies()
    ]);
}

