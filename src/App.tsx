import * as React from "react";
import { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AppMenu from './menu/AppMenu';
import GoogleMap, { MapReadyOpts } from './map/GoogleMap';
import Place from './place/Place';
import { setServers } from 'dns';

interface State {
    menuOpened: boolean,
    places: google.maps.places.PlaceResult[],
    center: google.maps.LatLng,
    selectedPlace?: google.maps.places.PlaceResult
    searchQuery?: string
    service?: google.maps.places.PlacesService
    map?: google.maps.Map
}

class App extends Component<{}, State> {
    state: State = window['AppState'] || {
        menuOpened: false,
        places: [],
        center: new google.maps.LatLng(-33.8665433, 151.1956316) // pyrmont
    }

    toggleMenu = () => this.setState(state => ({
        menuOpened: !state.menuOpened
    }))

    fetchItems(service: google.maps.places.PlacesService) {
        var request = {
            location: this.state.center,
            radius: 500,
            type: 'restaurant'
        };
        service.nearbySearch(request, (places, status) => {
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
        let { map, service } = this.state;
        this.state.service.textSearch({
            bounds: map.getBounds(),
            query: text
        }, places => {
            this.setState({
                places
            })
        })
    }

    componentDidUpdate() {
        // allow to preserve state after hot reload
        window['AppState'] = this.state
    }

    mapReady = ({ map, service }: MapReadyOpts) => {
        this.setState({ map, service })
        this.fetchItems(service)
    }

    render() {
        const { menuOpened, map, service } = this.state

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
                        onReady={this.mapReady}
                        selectPlace={this.selectPlace}
                        selectedPlace={this.state.selectedPlace}
                    />

                    {service && this.state.selectedPlace
                        ? <Place place={this.state.selectedPlace} service={service} />
                        : null}

                    <div className="map-overlay"></div>
                </div>
            </div>
        );
    }
}

export default App;
