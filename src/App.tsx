import * as React from "react";
import { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AppMenu from './menu/AppMenu';
import GoogleMap from './map/GoogleMap';

interface State {
    menuOpened: boolean,
    places: google.maps.places.PlaceResult[],
    center: google.maps.LatLng,
    selectedPlace?: google.maps.places.PlaceResult
}

class App extends Component<{}, State> {
    state: State = window['AppState'] || {
        menuOpened: false,
        places: [],
        center: new google.maps.LatLng(-33.8665433, 151.1956316) // pyrmont
    }
    service: google.maps.places.PlacesService

    toggleMenu = () => this.setState(state => ({
        menuOpened: !state.menuOpened
    }))

    componentDidMount() {
        this.fetchItems()
    }

    fetchItems() {
        var request = {
            location: this.state.center,
            radius: 500,
            type: 'restaurant'
        };

        this.service.nearbySearch(request, (places, status) => {
            this.setState({ places })
        });
    }

    selectPlace = (place: google.maps.places.PlaceResult) => {
        this.setState({
            selectedPlace: place
        })
    }

    render() {
        const { menuOpened } = this.state

        // allow to preserve state after hot reload
        window['AppState'] = this.state

        return (
            <div className={"App" + (menuOpened ? ' menuOpened' : '')}>

                <AppMenu places={this.state.places} />

                <div className="App-body">
                    <div className="App-header">
                        <a className="App-menu-btn" onClick={this.toggleMenu}>
                            <FontAwesomeIcon icon={faBars} />
                        </a>
                    </div>

                    <GoogleMap
                        places={this.state.places}
                        center={this.state.center}
                        serviceRef={service => this.service = service}
                        selectPlace={this.selectPlace}
                        selectedPlace={this.state.selectedPlace}
                    />
                </div>
            </div>
        );
    }
}

export default App;
