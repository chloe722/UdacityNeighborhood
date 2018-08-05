import * as React from "react";
import { Component } from 'react';
import './App.css';
import * as logo from './logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AppMenu from './menu/AppMenu';

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

                <AppMenu />

                <div className="App-body">
                    <div className="App-header">
                        <a className="App-menu-btn" onClick={this.toggleMenu}>
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
