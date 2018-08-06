import * as React from "react";
import { Component } from 'react';
import Search from './Search';
import Items from './Items';
import './AppMenu.css';


const URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key=AIzaSyA58k3L4icQwP4dF6Od5MrOgk1fXthmbpY"

class AppMenu extends Component {

    state = {
        items: [

        ]
    }

    componentDidMount() {
        this.fetchItems()
    }

    fetchItems() {
        var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

        var map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });

        var request = {
            location: pyrmont,
            radius: 500,
            type: 'restaurant'
        };

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, (results, status) => {
            this.setState({ items: results })

            results.map(result => {
                var marker = new google.maps.Marker({
                    position: result.geometry.location,
                    map: map,
                    title: result.name
                });

                marker.setMap(map);

                marker.addListener('click', function () {
                    service.getDetails({
                        placeId: result.place_id,

                    }, (result, status) => {

                        var locationInfo = `
                            <strong>${result.name}</strong>
                            <p>${result.international_phone_number}</p>
                            <p>${result.adr_address}</p>
                            `
                        var infowindow = new google.maps.InfoWindow({
                            content: locationInfo
                        });

                        infowindow.open(map, marker);

                    })

                });
            })



            // if (status == google.maps.places.PlacesServiceStatus.OK) {
            //     for (var i = 0; i < results.length; i++) {
            //         var place = results[i];
            //     }
            // }
        });

    }

    render() {
        return (
            <div className="App-menu">
                <div className="App-scrollable-content">
                    <h1>Neighborhood</h1>
                    <Search />
                    <Items items={this.state.items} />
                </div>
            </div>
        )
    }
}

export default AppMenu;











