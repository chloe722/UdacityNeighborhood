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
    state = window['AppState'] || {
        menuOpened: false
    }

    toggleMenu = () => this.setState(state => ({
        menuOpened: !state.menuOpened
    }))

    render() {
        const { menuOpened } = this.state


        // allow to preserve state after hot reload
        window['AppState'] = this.state

        return (
            <div className={"App" + (menuOpened ? ' menuOpened' : '')}>
                <div className="App-menu">
                    <h1>Neighborhood</h1>
                    <div className="App-search-container">
                        <input type="text" />
                        <button className="App-title-search"> Search </button></div>
                    <ul>
                        <li className="App-menu-items">one</li>
                        <li className="App-menu-items">two</li>
                        <li className="App-menu-items">three</li>
                        <li className="App-menu-items">one</li>
                        <li className="App-menu-items">two</li>
                        <li className="App-menu-items">three</li>
                    </ul>
                </div>
                <div className="App-body">
                    <div className="App-header">
                        <a onClick={this.toggleMenu}>
                            <FontAwesomeIcon icon={faBars} />
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
