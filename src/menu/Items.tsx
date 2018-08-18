import * as React from "react";
import { Component } from "react";
import './Items.css';
import { IPlace } from "../App";

interface Props {
    places: IPlace[]
    selectPlace(place: IPlace): void
    selectedPlace?: IPlace
    inactive?: boolean
}

class Items extends Component<Props> {
    itemClassName(place: IPlace) {
        let { selectedPlace } = this.props
        if (selectedPlace && selectedPlace.place_id === place.place_id)
            return 'App-menu-items selected'
        else
            return 'App-menu-items'
    }

    render() {
        let { places, selectPlace, inactive } = this.props
        return (
            <ul className="App-menu-items-container" aria-label="List of searched results" role="listitem">
                {places.map(place =>
                    <li key={place.place_id}
                        className={this.itemClassName(place)}>
                        <a href="#" aria-label={place.name} role="option"
                            tabIndex={inactive ? -1 : 0}
                            onFocus={() => selectPlace(place)}
                            onClick={() => selectPlace(place)}>
                            {place.name}
                        </a>
                    </li>
                )}
            </ul>
        )
    }
}

export default Items;