import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './Place.css';
import { IPlace } from '../App';

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

    fetchDetails() {
        if (this.fetchedPlaceId == this.props.place.place_id) {
            return
        }
        this.fetchedPlaceId = this.props.place.place_id
        this.setState({
            details: undefined
        })
        const CLIENT_SECRET = 'IRTKUMGEH3HPSOUCB5FL0UWIF3WRPMTQ1NAEZ15TCXGVPVST'
        const CLIENT_ID = '4MVAJJV5DIYKI4CSSIGWIHSV5D4INVN4AQIZOA0W1TDBFFLD'
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
        return <div className="place">
            <div className="place-content">
                <h1>{place.name}</h1>
                {/* {details ? */}
                <>
                    {/* <p>
                            <a href={"call://" + details.international_phone_number}
                                role="link"
                                aria-label="phone number"
                            >{details.international_phone_number}</a>
                        </p> */}

                    {/* <p>
                            <a href={"call://" + 1234567890}
                                role="link"
                                aria-label="phone number"
                            >{}</a>
                        </p> */}

                    {/* <p dangerouslySetInnerHTML={{ __html: details.adr_address }} aria-label="address"></p> */}
                    <p aria-label="address">{place.location}</p>

                </>
                {/* // : null} */}
            </div>
        </div>
    }
}

export default Place;