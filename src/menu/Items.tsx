import * as React from "react";
import { Component } from "react";
import './Items.css';

interface Item {
    name: string
}

interface Props {
    items: any[]
}

class Items extends Component<Props> {

    render() {
        return (
            <ul className="App-menu-items-container">
                {this.props.items.map(item =>
                    <li className="App-menu-items">
                        <a href="#">{item.name}</a>
                    </li>
                )}
            </ul>
        )
    }
}

export default Items;