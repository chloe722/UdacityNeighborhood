import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from 'react';
import Search from './Search';
import Items from './Items';
import './AppMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faClosedCaptioning, faEraser } from '@fortawesome/free-solid-svg-icons';

interface Props {
    places: google.maps.places.PlaceResult[]
    selectPlace(place: google.maps.places.PlaceResult)
    selectedPlace?: google.maps.places.PlaceResult
    search(text: string): void
    toggleMenu(): void
}

const URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyA58k3L4icQwP4dF6Od5MrOgk1fXthmbpY"

class AppMenu extends Component<Props> {
    render() {
        return (
            <div className="App-menu">
                <div className="App-scrollable-content">
                    <h1>Neighborhood
                         <a className="App-menu-close-btn" onClick={this.props.toggleMenu}>
                            <FontAwesomeIcon icon={faWindowClose} className="App-menu-close-icn" />
                        </a>
                    </h1>

                    <Search search={this.props.search} />

                    <Items
                        places={this.props.places}
                        selectPlace={this.props.selectPlace}
                        selectedPlace={this.props.selectedPlace}
                    />
                </div>
            </div>
        )
    }
}

export default AppMenu;











