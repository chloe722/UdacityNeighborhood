import * as React from 'react';
import * as ReactDOM from 'react-dom';
import InfoWindow from './InfoWindow';

interface Props {
    map: google.maps.Map
    place: google.maps.places.PlaceResult
    selected: boolean
    onClick(place: google.maps.places.PlaceResult): void
    service: google.maps.places.PlacesService
}

export default class PlaceMarker extends React.PureComponent<Props> {
    marker = new google.maps.Marker()
    infoWindow?: google.maps.InfoWindow

    componentDidMount() {
        let { map, place, selected } = this.props
        this.marker.setMap(map)
        this.marker.setPosition(place.geometry.location)
        this.marker.addListener('click', () => this.props.onClick(place))
    }

    componentWillUnmount() {
        this.marker.setMap(null)
    }

    getInfoWindow(): google.maps.InfoWindow {
        if (!this.infoWindow) {
            this.infoWindow = new google.maps.InfoWindow({
                content: document.createElement('div')
            })
        }
        return this.infoWindow!
    }

    render() {
        let { map, place, selected, service } = this.props
        if (selected) {
            return <InfoWindow
                service={service}
                place={place}
                map={map}
                marker={this.marker} />
        } else {
            return null
        }
    }
}