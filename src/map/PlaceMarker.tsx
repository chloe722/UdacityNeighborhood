import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPlace } from '../App';

interface Props {
    map: google.maps.Map
    // place: google.maps.places.PlaceResult
    place: IPlace
    selected: boolean
    // onClick(place: google.maps.places.PlaceResult): void
    onClick(place: IPlace): void

    service: google.maps.places.PlacesService
}

export default class PlaceMarker extends React.PureComponent<Props> {
    marker = new google.maps.Marker()
    infoWindow?: google.maps.InfoWindow

    componentDidMount() {
        let { map, place, selected } = this.props
        var latlng = new google.maps.LatLng(place.lat, place.lng);
        this.marker.setMap(map)
        this.marker.setPosition(latlng)
        this.marker.addListener('click', () => this.props.onClick(place))
    }

    componentWillUnmount() {
        this.marker.setMap(null)
    }

    render() {
        let { map, place, selected, service } = this.props
        if (selected) {
            this.marker.setIcon(
                'http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        } else {
            this.marker.setIcon(
                'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            )
        }
        return null;
    }
}