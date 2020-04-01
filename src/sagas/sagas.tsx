import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../store/actions/actions';
// import * as moviesJSON from '../movies.json';

const delay = ( ms: number ) => new Promise( res => setTimeout( res, ms ) );

export function *helloSaga() {
    console.log('Hello Sagas!');
}

export function *incrementAsync() {
    yield delay( 1000 );
    yield put({ type: actions.INCREMENT_ASYNC })
}

export function *watchIncrementAsync() {
    yield takeEvery( 'INCREMENT_ASYNC', incrementAsync );
}

export function *fetchMovies() {
    const moviesJSON = yield fetch('https://us-central1-squadflick.cloudfunctions.net/getTheaterAtHomeMovies')
                    .then( dataWrappedByPromise => dataWrappedByPromise.json() )
                    .then( json => json );

    yield put({ type: actions.UPDATE_MOVIES, movies: moviesJSON });
    console.log('loaded movies');
}

export default function *rootSaga() {
    yield all([
        //helloSaga(),
        //watchIncrementAsync(),
        fetchMovies()
    ]);
}

