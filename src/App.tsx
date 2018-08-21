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
    places: IPlace[],
    center: google.maps.LatLng,
    selectedPlace?: IPlace
    searchQuery?: string
    service?: google.maps.places.PlacesService
    map?: google.maps.Map
}

export interface IPlace {
    name: string
    place_id: string
    location: string
    lat: number
    lng: number
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
        // service.nearbySearch(request, (places, status) => {
        //     this.setState({ places })
        // });
    }

    selectPlace = (place: IPlace) => {
        this.setState({
            selectedPlace: place
        })
    }

    search = text => {
        this.setState({ searchQuery: text })
        let { map, service } = this.state;
        const CLIENT_SECRET = 'OT4FFXIAHA4PBBPYXLJC4O1WXT0AMPLZSW1OK504Y5PIDCMT'
        const CLIENT_ID = 'IVKRS4LGN3R5W3UURTT2NKCPW2YLPFP3GINGGZREBFMGRFEG'
        fetch(`https://api.foursquare.com/v2/venues/explore`
            + `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            + `&v=20180323&limit=20&ll=-33.8665433,151.1956316&query=${text}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log('response data', data)
                var places: IPlace[] = []

                for (let group of data.response.groups) {
                    for (let item of group.items) {
                        try {
                            let address = item.venue.location.formattedAddress;
                            places.push({
                                place_id: item.venue.id,
                                name: item.venue.name,
                                location: address.join(" "),
                                lat: item.venue.location.lat,
                                lng: item.venue.location.lng
                            })

                        } catch (e) {
                            console.error(e)
                        }
                    }
                }

                this.setState({ places })
            })
            .catch(function () {
                // Code for handling errors
            });
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
                    inactive={!menuOpened}
                />

                <div className="App-body">
                    <div className="App-header">
                        <a className="App-menu-btn" aria-label="Menu button" role="button" tabIndex={0} onClick={this.toggleMenu}>
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
