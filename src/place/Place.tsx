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
        const CLIENT_SECRET = 'AR1RVMLAUJNLUGHIGMHRDIXJ4KSEZBAX4PNMZDKGPWDXZKW0'
        const CLIENT_ID = '40KZXTTYFHSCO45ARCXD2TG2FXCPLIB2QFAB4GSKQVIMWXSY'

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
            return <div className="place">
                <div className="place-content">
                    Loading...
                </div>
            </div>
        }
        if (details.meta.code >= 400) {
            return <div className="place">
                <div className="place-content">
                    FourSquare API error:
                    <p>{details.meta.errorDetail}</p>
                </div>
            </div>
        }

        const { venue } = details.response
        const { bestPhoto } = venue

        const imgUrl = bestPhoto
            ? `${bestPhoto.prefix}300x200${bestPhoto.suffix}`
            : undefined

        return <div className="place">


            <img className="place-image" src={imgUrl} alt={place.name} />


            <div className="place-content">
                <h1 className="place-heading place-info">{place.name}</h1>
                <p className="place-info">
                    <FontAwesomeIcon className="fa-phone" icon={faPhone} />
                    <a href={"call://" + details.response.venue.contact.phone}
                        role="link"
                        aria-label="phone number"
                    >{details.response.venue.contact.phone}</a>
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