import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from '../store/actions/actions';

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

export function *fetchSomething() {
    yield delay( 5000 );
    const json = yield fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then( response => response.json());
    
    yield put({ type: actions.INCREMENT_ASYNC });
    console.log( json );
}

export default function *rootSaga() {
    yield all([
        //helloSaga(),
        //watchIncrementAsync(),
        fetchSomething()
    ]);
}

