import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import Movie from './components/Movie/Movie';
import Winner from './components/Movie/Winner/Winner';
import PostersContainer from './components/Movie/PostersContainer/PostersContainer';
import GenresModal from './components/UI/Modals/GenresModal';
import NavigationBar from './components/UI/NavigationBar/NavigationBar';
import FullModal from './components/UI/Modals/FullModal';
import Voting from './containers/Voting/Voting';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; 

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

  return (

    <Router>
    <div className="App">
      <div className="">
        <Switch>
          <Route path="/movie">
          </Route>
          <Route path="/movies-voting">
            <Voting />
          </Route>
          <Route path="/winner">
            <Winner />
          </Route>
          <Route path="/winner" component={ Winner } />
          <Route path="/">
          <NavigationBar isOpen={ !props.showMovieModal } />
            <div id="Home">
            <PostersContainer title="At-Theater" movies={ props.atTheaterMovies } />
            <PostersContainer title="Recently Left Theaters" movies={ props.leftTheaterMovies } />
            <GenresModal isOpen={ props.showGenresModal } />
            <FullModal isOpen={ props.showMovieModal } />
            </div>
          </Route>
        </Switch>
      </div>
    </div>

    </Router>
  );
}

function mapStateToProps( state ) {
  return {
    counter: state.globalProps.counter,
    showGenresModal: state.globalProps.showGenresModal,
    showMovieModal: state.globalProps.showMovieModal,
    movies: state.movieData.movies,
    atTheaterMovies: state.movieData.atTheaterMovies,
    leftTheaterMovies: state.movieData.leftTheaterMovies,
    shouldApplyFilter: state.movieData.shouldApplyFilter,
    filterString: state.movieData.filterString
  };  
}

function mapDispatchToProps( dispatch ) {
  return {
    onUpdateShowGenresModal: ( show ) => dispatch( actions.updateShowGenresModal( show ) ),
    onUpdateMovies: ( movies, atTheaterMovies, leftTheaterMovies ) => dispatch( actions.updateMovies( movies, atTheaterMovies, leftTheaterMovies ) ),
    onUpdateShouldApplyFilter: ( shouldApplyFilter ) => dispatch( actions.updateShouldApplyFilter( shouldApplyFilter ) )
  };
}


export default connect( mapStateToProps, mapDispatchToProps )( App );


//             <FullModal />