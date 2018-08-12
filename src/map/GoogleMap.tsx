import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import PlaceMarker from './PlaceMarker';

export interface MapReadyOpts {
    map: google.maps.Map
    service: google.maps.places.PlacesService
}

interface Props {
    places: google.maps.places.PlaceResult[]
    selectedPlace?: google.maps.places.PlaceResult
    center: google.maps.LatLng
    onReady(opts: MapReadyOpts)
    selectPlace(place: google.maps.places.PlaceResult): void
}

class GoogleMap extends Component<Props> {
    mapContainer: HTMLDivElement
    map: google.maps.Map
    service: google.maps.places.PlacesService

    componentDidMount() {
        this.map = new google.maps.Map(this.mapContainer, {
            center: this.props.center,
            zoom: 15,
            gestureHandling: 'cooperative'
        });
        this.service = new google.maps.places.PlacesService(this.map);
        this.props.onReady({ map: this.map, service: this.service })
        this.forceUpdate()
    }

    render() {
        let { selectedPlace, places, selectPlace } = this.props
        if (this.map && selectedPlace) {
            this.map.panTo(selectedPlace.geometry.location)
        }
        return <>
            <div className="App-map" id="map" aria-label="location" role="application"
                ref={e => this.mapContainer = e}></div>
            {this.map && places.map(place =>
                <PlaceMarker
                    key={place.place_id}
                    map={this.map}
                    place={place}
                    onClick={selectPlace}
                    service={this.service}
                    selected={selectedPlace && place.place_id === selectedPlace.place_id}
                />
            )}
        </>;
    }
}

export default GoogleMap;