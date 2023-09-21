import React, { Component } from 'react';
//import logo from './logo.svg';
//import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Index from './Components/index.js';
//injectTapEventPlugin();

//import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        return (

            // <div className="App">

            // <p>This is Muturi</p>
            // </div>
            <Index/>
        );
    }
}
const style = {
    margin: 15,
};
export default App;
