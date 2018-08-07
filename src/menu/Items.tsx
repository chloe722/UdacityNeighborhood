import * as React from "react";
import { Component } from "react";
import './Items.css';

interface Props {
    places: google.maps.places.PlaceResult[]
}

class Items extends Component<Props> {

    render() {
        return (
            <ul className="App-menu-items-container">
                {this.props.places.map(item =>
                    <li key={item.id} className="App-menu-items">
                        <a href="#">{item.name}</a>
                    </li>
                )}
            </ul>
        )
    }
}

export default Items;