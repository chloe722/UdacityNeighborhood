import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from 'react';
import Search from './Search';
import Items from './Items';
import './AppMenu.css';

interface Props {
    places: google.maps.places.PlaceResult[]
}

const URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyA58k3L4icQwP4dF6Od5MrOgk1fXthmbpY"

class AppMenu extends Component<Props> {
    render() {
        return (
            <div className="App-menu">
                <div className="App-scrollable-content">
                    <h1>Neighborhood</h1>
                    <Search />
                    <Items places={this.props.places} />
                </div>
            </div>
        )
    }
}

export default AppMenu;











