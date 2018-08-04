import * as React from "react";
import { Component } from 'react';
import './App.css';
import * as logo from './logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface State {
    menuOpened: boolean
}

class App extends Component<{}, State> {
    state = {
        menuOpened : false
    }

    toggleMenu = () => this.setState(state => ({
        menuOpened: !state.menuOpened
    }))


    render() {
        const {menuOpened}= this.state
        return (
            <div className={"App" + (menuOpened ? ' menuOpened' : '')}>
                <div className="App-menu">
                    <ul>
                        <li>one</li>
                        <li>two</li>
                        <li>three</li>
                        <li>one</li>
                        <li>two</li>
                        <li>three</li>
                    </ul>
                </div>
                <div className="App-body">
                    <div className="App-header">
                       <a onClick={this.toggleMenu}>
                            <FontAwesomeIcon icon={faBars}/>
                        </a>
                    </div>

                    <div className="App-map">
                        map here
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
