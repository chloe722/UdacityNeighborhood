import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Place.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IPlace } from '../App';
import { faPhone, faAddressBook, faLocationArrow, faMarker, faMapMarked, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
    // place: google.maps.places.PlaceResult
    service: google.maps.places.PlacesService
    place: IPlace
}

interface State {
    // details?: google.maps.places.PlaceResult
    details?: any
}

class Place extends React.PureComponent<Props, State> {
    state: State = {}
    fetchedPlaceId?: string

    componentDidMount() {
        this.fetchDetails()
    }

    componentDidUpdate() {
        this.fetchDetails()
    }

    async fetchDetails() {
        if (this.fetchedPlaceId == this.props.place.place_id) {
            return
        }
        this.fetchedPlaceId = this.props.place.place_id
        this.setState({
            details: undefined
        })
        const CLIENT_SECRET = '4ZVIPJ4UNXVSQFSVLH1TY2FG1CXCTZFDKBTY2F02VAVUVBG2'
        const CLIENT_ID = 'P2TM54TS1Q1QRNMRM4A5JAYRP12JFSXR4AVC5VTNM2RMPACO'

        fetch(`https://api.foursquare.com/v2/venues/${this.props.place.place_id}`
            + `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180818`)
            .then(response => {
                return response.json();
            })
            .then(details => {
                console.log("detail", details)
                this.setState({
                    details
                })
            })

        // this.props.service.getDetails(
        //     { placeId: this.props.place.place_id },
        //     details => {
        //         this.setState({ details })
        //     }
        // )
    }

    render() {
        let { place } = this.props
        let { details } = this.state
        if (!details) {
            return <div className="place place-loading-container">
                <div className="place-loading-content place-loading">
                    Loading...
                </div>
            </div>
        }
        if (details.meta.code >= 400) {
            return <div className="place place-error-container">
                <div className="place-error-content place-error">
                    FourSquare API error:
                    <p>{details.meta.errorDetail} :(</p>
                </div>
            </div>
        }

        const { venue } = details.response
        const { bestPhoto } = venue

        const imgUrl = bestPhoto
            ? `${bestPhoto.prefix}300x200${bestPhoto.suffix}`
            : undefined
        const phone = venue.contact ? venue.contact.phone : "Not provided";

        return <div className="place">

            <img className="place-image" src={imgUrl} alt={place.name} />

            <div className="place-content">
                <h1 className="place-info place-heading">{place.name}</h1>
                <p className="place-info">
                    <FontAwesomeIcon className="fa-phone" icon={faPhone} />
                    <a href={"call://" + details.response.venue.contact.phone}
                        role="link"
                        aria-label="phone number"
                    >{phone}</a>
                </p>
                <p aria-label="address" className="place-info place-address">
                    <FontAwesomeIcon className="fa-address" icon={faMapMarkedAlt} />
                    {place.location}
                </p>

            </div>

        </div>
    }
}

export default Place;