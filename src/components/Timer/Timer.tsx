import React, { Component } from 'react';
import * as Constants from '../../utils/constants';

type Props = { onTick: Function }
type State = { secondsLeft: number }

class Timer extends Component<Props, State> {
    timerID: any;

    constructor( props: any ) {
        super( props );
        this.state = { secondsLeft: Constants.Global.VOTING_COUNTDOWN_SECONDS };
    }

    restartTimer = () => {
        this.timerID = setInterval(
            () => this.tick(),
            Constants.Global.VOTING_COUNTDOWN_TICK_MILLISECONDS
        )
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            Constants.Global.VOTING_COUNTDOWN_TICK_MILLISECONDS
        )
    }

    componentWillUnmount() {
        clearInterval( this.timerID );
    }

    // Reduces a second from the timer countdown. If it reaches 0, we stop the timer
    tick = () => {
        if ( this.state.secondsLeft === 1 ) {
            this.props.onTick()
            clearInterval( this.timerID );
        } else {
            this.setState({ secondsLeft: this.state.secondsLeft - 1 });
        }
    }

    render() {

        /*
        if ( this.props.reset ) {
            // If we should reset the timer, we send the count back to 10 and call setInterval
            // this.setState({ secondsLeft: Constants.Global.VOTING_COUNTDOWN_SECONDS, reset: false })
            // this.restartTimer();
        }
        */

        return (
        <div className="Timer">{ this.state.secondsLeft }</div>
        )
    }
};

export default Timer;
