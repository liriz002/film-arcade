import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import Movie from './components/Movie/Movie';
import Winner from './components/Movie/Winner/Winner';
import PostersContainer from './components/Movie/PostersContainer/PostersContainer';
import GenresModal from './components/UI/Modals/GenresModal';
import NavigationBar from './components/UI/NavigationBar/NavigationBar';
import FullModal from './components/UI/Modals/FullModal';
import SuddenDeathModal from './components/UI/Modals/SuddenDeathModal';
import StreamingInfo from './components/UI/Modals/StreamingInfo';
import Voting from './containers/Voting/Voting';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'; 

import './App.css';

const App = ( props ) => {
  // Methods
  useEffect(() => {
    // We apply filters if needed
    if ( props.shouldApplyFilter ) {
      let genreFilter = props.filterString;
      let allMovies = JSON.parse( JSON.stringify( props.movies ) );
      let allAtTheaterMovies = allMovies.splice( 0, 10 );
      let allLeftTheaterMovies = allMovies.splice( 0 );

      // If the filter string is empty, we show all genres to the user
      if( props.filterString == "" ) {
        props.onUpdateMovies( props.movies, allAtTheaterMovies, allLeftTheaterMovies );
      } else {
          // Else, we have a filter to apply, so we apply the genre(s) filter to both lists
          // We apply the genre filter to both lists
          let atTheater = allAtTheaterMovies.filter( ( movie ) => genreFilter.includes( movie.genre1Name ) ||
          genreFilter.includes( movie.genre2Name ) ||
          genreFilter.includes( movie.genre3Name ) ||
          genreFilter.includes( movie.genre4Name ) );

    let leftTheater = allLeftTheaterMovies.filter( ( movie ) => genreFilter.includes( movie.genre1Name ) ||
          genreFilter.includes( movie.genre2Name ) ||
          genreFilter.includes( movie.genre3Name ) ||
          genreFilter.includes( movie.genre4Name ) );

          // Then, we update these lists
          props.onUpdateMovies( props.movies, atTheater, leftTheater );
      }
                                                  
      // In any case, we set shouldApplyFilter to false
      props.onUpdateShouldApplyFilter( false );
    }
  });


  let redirectToSuddenDeath;
  if ( props.inSuddenDeath ) {
      redirectToSuddenDeath = <Redirect to="/sudden-death" />
  }

  return (

    <Router>
    <div className="App">
        { redirectToSuddenDeath }
        <Switch>
          <Route path="/movie">
          </Route>
          <Route path="/sudden-death">
            <Voting />
          </Route>
          <Route path="/winner">
            <Winner />
            <StreamingInfo isOpen={ props.showStreamingInfoModal } redirect={ true } />
          </Route>
          <Route path="/winner" component={ Winner } />
          <Route path="/">
          <NavigationBar isOpen={ !props.showMovieModal } />
            <div id="Home">
            <PostersContainer title="At-Theater" movies={ props.atTheaterMovies } />
            <PostersContainer title="Just Left Theaters" movies={ props.leftTheaterMovies } />
            <GenresModal isOpen={ props.showGenresModal } />
            <SuddenDeathModal isOpen={ props.showSuddenDeathModal } />
            <FullModal isOpen={ props.showMovieModal } />
            <StreamingInfo isOpen={ props.showStreamingInfoModal } redirect={ false } />
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
    showMovieModal: state.globalProps.showMovieModal,
    showSuddenDeathModal: state.globalProps.showSuddenDeathModal,
    showStreamingInfoModal: state.globalProps.showStreamingInfoModal,
    movies: state.movieData.movies,
    atTheaterMovies: state.movieData.atTheaterMovies,
    leftTheaterMovies: state.movieData.leftTheaterMovies,
    shouldApplyFilter: state.movieData.shouldApplyFilter,
    filterString: state.movieData.filterString,
    inSuddenDeath: state.globalProps.inSuddenDeath
  };  
}

function mapDispatchToProps( dispatch ) {
  return {
    onUpdateShowGenresModal: ( show ) => dispatch( actions.updateShowGenresModal( show ) ),
    onUpdateShowSuddenDeathModal: ( show ) => dispatch( actions.updateShowSuddenDeathModal( show ) ),
    onUpdateMovies: ( movies, atTheaterMovies, leftTheaterMovies ) => dispatch( actions.updateMovies( movies, atTheaterMovies, leftTheaterMovies ) ),
    onUpdateShouldApplyFilter: ( shouldApplyFilter ) => dispatch( actions.updateShouldApplyFilter( shouldApplyFilter ) )
  };
}


export default connect( mapStateToProps, mapDispatchToProps )( App );


//             <FullModal />