import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    map: google.maps.Map
    marker: google.maps.Marker
    place: google.maps.places.PlaceResult
    service: google.maps.places.PlacesService
}

interface State {
    details?: google.maps.places.PlaceResult
}

class InfoWindow extends React.PureComponent<Props, State> {
    container = document.createElement('div')
    infoWindow = new google.maps.InfoWindow({ content: this.container })
    state: State = {}

    componentDidMount() {
        this.infoWindow.open(this.props.map, this.props.marker)
        this.props.service.getDetails(
            { placeId: this.props.place.place_id },
            details => {
                this.setState({ details })
            }
        )
    }

    componentWillUnmount() {
        this.infoWindow.close()
    }

    render() {
        let { place } = this.props
        let { details } = this.state
        return ReactDOM.createPortal(
            <>
                <strong>{place.name}</strong>
                {details ?
                    <>
                        <p>{details.international_phone_number}</p>
                        <p dangerouslySetInnerHTML={{ __html: details.adr_address }}></p>
                    </>
                    : null}
            </>,
            this.container
        )
    }
}

export default InfoWindow;