import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import Movie from './components/Movie/Movie';
import PostersContainer from './components/Movie/PostersContainer/PostersContainer';
import GenresModal from './components/UI/Modals/GenresModal';
import Button from './components/UI/Button/Button';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; 

import './App.css';

const App = ( props ) => {

  const incrementAsync = () => {
    props.incrementAsync();
  }

  // Updates the state to show the genres modal
  const showGenresModal = () => {
    props.onUpdateShowGenresModal( true );
  }

  /*
  let posters;

  if ( this.props.movies.length > 0 ) {
    posters = <div>{ this.props.movies.map(() => {
      return (
        <MoviePoster />
      )
    }) } </div>
  }
  */
  

  return (

    <Router>
    <div className="App">
      <Switch>
        <Route path="/movie">
            <Movie />
        </Route>
        <Route path="/">
          <div id="Home">
            <h1 style={{ marginTop: '0px' }}>The Film Arcade</h1>
            <PostersContainer title="At-Theater" movies={ props.movies.splice(0, 10) } />
            <PostersContainer title="Recently Left Theaters" movies={ props.movies.splice(0) } />
            <GenresModal isOpen={ props.showGenresModal } />
            <p>{ props.counter }</p>
            <Button clicked={ showGenresModal } classes="Button1" title="Filter Genres">Saga Test</Button>
          </div>
        </Route>
      </Switch>
    </div>

    </Router>
  );
}

function mapStateToProps( state ) {
  return {
    counter: state.globalProps.counter,
    showGenresModal: state.globalProps.showGenresModal,
    movies: state.movieData.movies
  };  
}

function mapDispatchToProps( dispatch ) {
  return {
    incrementAsync: () => dispatch( actions.incrementAsync() ),
    onUpdateShowGenresModal: ( show ) => dispatch( actions.updateShowGenresModal( show ) )
  };
}


export default connect( mapStateToProps, mapDispatchToProps )( App );
