import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/actions';
import * as Constants from './utils/constants';

import Genre from './components/Genre/Genre';
import GenresModal from './components/UI/Modals/GenresModal';
import Button from './components/UI/Button/Button';
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
      <div className="App">
        <h1>The Film Arcade</h1>
        <div>

          <GenresModal isOpen={ this.props.showGenresModal } />

          <p>{ this.props.counter }</p>
          <Button classes="Button1" title="Filter Genres">Saga Test</Button>
        </div>
      </div>
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
