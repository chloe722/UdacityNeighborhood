import * as React from 'react';

interface Props {
    place: google.maps.places.PlaceResult
}

class InfoWindow extends React.PureComponent<Props> {
    render() {
        let { place } = this.props
        return <>
            <strong>{place.name}</strong>
            <p>{place.international_phone_number}</p>
            <p dangerouslySetInnerHTML={{ __html: place.adr_address }}></p>
        </>
    }
}

export default InfoWindow;