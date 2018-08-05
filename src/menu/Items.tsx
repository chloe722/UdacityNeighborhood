import * as React from "react";
import { Component } from "react";
import './Items.css';

class Items extends Component {

    render() {

        return (
            <ul className="App-menu-items-container">
                <li className="App-menu-items">
                    <a href="#">one</a>
                </li>
            </ul>
        )
    }
}

export default Items;