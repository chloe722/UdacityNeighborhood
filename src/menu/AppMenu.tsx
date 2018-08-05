import * as React from "react";
import { Component } from 'react';
import Search from './Search';
import Items from './Items';




class AppMenu extends Component {
    render() {
        return (
            <div className="App-menu">
                <div className="App-scrollable-content">
                    <h1>Neighborhood</h1>
                    <Search />
                    <Items />
                </div>
            </div>
        )
    }
}

export default AppMenu;











