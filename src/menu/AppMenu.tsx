import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from 'react';
import Search from './Search';
import Items from './Items';
import './AppMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faClosedCaptioning, faEraser } from '@fortawesome/free-solid-svg-icons';
import { IPlace } from '../App';

interface Props {
    places: IPlace[]
    selectPlace(place: IPlace): void
    selectedPlace?: IPlace
    search(text: string): void
    toggleMenu(): void
    inactive?: boolean
}

const URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyA58k3L4icQwP4dF6Od5MrOgk1fXthmbpY"

class AppMenu extends Component<Props> {
    render() {
        return (
            <div className="App-menu">
                <div className="App-scrollable-content">
                    <h1>Neighborhood
                         <a className="App-menu-close-btn" aria-label="Close button" role="button" tabIndex={0} onClick={this.props.toggleMenu}>
                            <FontAwesomeIcon icon={faWindowClose} className="App-menu-close-icn" />
                        </a>
                    </h1>

                    <Search search={this.props.search} />

                    <Items
                        inactive={this.props.inactive}
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











