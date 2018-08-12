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
    searchQuery?: string
}

class App extends Component<{}, State> {
    state: State = window['AppState'] || {
        menuOpened: false,
        places: [],
        center: new google.maps.LatLng(-33.8665433, 151.1956316) // pyrmont
    }
    service: google.maps.places.PlacesService
    map: google.maps.Map

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

    search = text => {
        this.setState({ searchQuery: text })
        this.service.textSearch({
            bounds: this.map.getBounds(),
            query: text
        }, places => {
            this.setState({
                places
            })
        })
    }

    render() {
        const { menuOpened } = this.state

        // allow to preserve state after hot reload
        window['AppState'] = this.state

        return (
            <div className={"App" + (menuOpened ? ' menuOpened' : '')}>

                <AppMenu
                    places={this.state.places}
                    selectPlace={this.selectPlace}
                    selectedPlace={this.state.selectedPlace}
                    search={this.search}
                    toggleMenu={this.toggleMenu}
                />

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
                        mapRef={map => this.map = map}
                        selectPlace={this.selectPlace}
                        selectedPlace={this.state.selectedPlace}
                    />
                    <div className="map-overlay"></div>
                </div>
            </div>
        );
    }
}

export default App;
