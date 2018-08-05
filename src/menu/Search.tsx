import * as React from "react";
import { Component } from "react";
import './Search.css';


class Search extends Component {


    render() {

        return (
            <div className="App-search-container">
                <input className="App-search-input" type="text" maxLength={30} />
                <button className="App-search-btn"> Search </button>
            </div>
        )
    }

}

export default Search;