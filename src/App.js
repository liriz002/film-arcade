import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';

import Movie from './components/Movie/Movie';
import GenresModal from './components/UI/Modals/GenresModal';
import Button from './components/UI/Button/Button';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'; 

import './App.css';

class App extends Component {

  incrementAsync = () => {
    this.props.incrementAsync();
  };

  // Updates the state to show the genres modal
  showGenresModal = () => {
    this.props.onUpdateShowGenresModal( true );
  };

  render() {
    return (

      <Router>
      <div className="App">
        <div>
          <Switch>
            <Route path="/movie">
                <Movie />
            </Route>
            <Route path="/">
              <h1>The Film Arcade</h1>
              <GenresModal isOpen={ this.props.showGenresModal } />
              <p>{ this.props.counter }</p>
              <Button clicked={ this.showGenresModal } classes="Button1" title="Filter Genres">Saga Test</Button>
            </Route>
          </Switch>
        </div>
      </div>

      </Router>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    counter: state.globalProps.counter,
    showGenresModal: state.globalProps.showGenresModal
  }  
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    incrementAsync: () => dispatch( actions.incrementAsync() ),
    onUpdateShowGenresModal: ( show ) => dispatch( actions.updateShowGenresModal( show ) )
  }
};


export default connect( mapStateToProps, mapDispatchToProps )( App );
