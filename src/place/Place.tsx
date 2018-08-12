import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Place.css';

interface Props {
    place: google.maps.places.PlaceResult
    service: google.maps.places.PlacesService
}

interface State {
    details?: google.maps.places.PlaceResult
}

class Place extends React.PureComponent<Props, State> {
    state: State = {}

    componentDidMount() {
        this.fetchDetails()
    }

    componentDidUpdate() {
        if (this.state.details && this.state.details.place_id !== this.props.place.place_id) {
            this.setState({
                details: undefined
            })
            this.fetchDetails()
        }
    }

    fetchDetails() {
        this.props.service.getDetails(
            { placeId: this.props.place.place_id },
            details => {
                this.setState({ details })
            }
        )
    }

    render() {
        let { place } = this.props
        let { details } = this.state
        return <div className="place">
            <div className="place-content">
                <h1>{place.name}</h1>
                {details ?
                    <>
                        <p>
                            <a href={"call://" + details.international_phone_number}
                                role="link"
                                aria-label="phone number"
                            >{details.international_phone_number}</a>
                        </p>

                        <p dangerouslySetInnerHTML={{ __html: details.adr_address }} aria-label="address"></p>
                    </>
                    : null}
            </div>
        </div>
    }
}

export default Place;