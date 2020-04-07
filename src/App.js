import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import Winner from './components/Movie/Winner/Winner';
import PostersContainer from './components/Movie/PostersContainer/PostersContainer';
import GenresModal from './components/UI/Modals/GenresModal';
import NavigationBar from './components/UI/NavigationBar/NavigationBar';
import FullModal from './components/UI/Modals/FullModal';
import MobileModal from './components/UI/Modals/MobileModal';
import SuddenDeathModal from './components/UI/Modals/SuddenDeathModal';
import StreamingInfo from './components/UI/Modals/StreamingInfo';
import Voting from './containers/Voting/Voting';
import Spinner from './components/UI/Spinner/Spinner';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'; 
import { Motion, spring } from 'react-motion';

import * as Constants from './utils/constants';

import './App.css';

const App = ( props ) => {
  const [ windowWidth, setWindowWidth ] = useState( window.innerWidth );

  // Methods
  useEffect(() => {
    // We apply filters if needed
    if ( props.shouldApplyFilter ) {
      let genreFilter = props.filterString;
      let allMovies = JSON.parse( JSON.stringify( props.movies ) );
      let allAtTheaterMovies = allMovies.splice( 0, 10 );
      let allLeftTheaterMovies = allMovies.splice( 0 );

      // If the filter string is empty, we show all genres to the user
      if( props.filterString === "" ) {
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

  useEffect(() => {
    function setWidth() {
      setWindowWidth( window.innerWidth );
    };

    // Add and remove an event listener for resizing
    window.addEventListener('resize', setWidth);

    return () => {
      window.removeEventListener('resize', setWidth( window.innerWidth ));
    }
  }, []);


  let redirectToSuddenDeath;
  if ( props.inSuddenDeath ) {
      redirectToSuddenDeath = <Redirect to="/sudden-death" />
  }

  let mainApp;
  // If the width is too small, we just show the modal
  if ( windowWidth < Constants.Global.MIN_WINDOW_WIDTH ) {
    mainApp = 
      <div className="App">
        <MobileModal isOpen={ windowWidth < Constants.Global.MIN_WINDOW_WIDTH } />
      </div>
  } else {
    // Otherwise, we show regular content

    // If we have no movies yet, we show a spinning icon
    let movies;
    if ( props.movies.length === 0 ) {
      movies = <Spinner />
    } else {
      // Otherwise, we animate the poster containers
      movies =
      <Motion key={ props.shouldApplyFilter } defaultStyle={{ x: -400, opacity: 0 }  } style={ { x: spring(0, Constants.Animations.STIFFNESS_DAMPING ), opacity: spring(1) } }>
      { style => (
        <div style={{
          transform: `translateX(${style.x}px)`,
          opacity: style.opacity
        }}>
          <PostersContainer title="Theater-At-Home Releases" movies={ props.atTheaterMovies } />
          <PostersContainer title="Won't-Break-Your-Bank Releases" movies={ props.leftTheaterMovies } />
        </div>
      )}
      </Motion>
    }
    
    // Finally, we build the main HTML
    mainApp = 
    <Router>
      <MobileModal isOpen={ windowWidth < Constants.Global.MIN_WINDOW_WIDTH } />
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
              { movies }
              <GenresModal isOpen={ props.showGenresModal } />
              <SuddenDeathModal isOpen={ props.showSuddenDeathModal } />
              <FullModal isOpen={ props.showMovieModal } />
              <StreamingInfo isOpen={ props.showStreamingInfoModal } redirect={ false } />
              </div>
            </Route>
          </Switch>
      </div>
    </Router>
  }

  return (
    <div>
      { mainApp }
    </div>
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