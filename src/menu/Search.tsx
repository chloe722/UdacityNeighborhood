import * as React from "react";
import { Component, KeyboardEventHandler } from "react";
import './Search.css';

interface Props {
    search(text: string): void
}

class Search extends Component<Props> {
    input: HTMLInputElement | null = null

    submit = () => {
        this.props.search(this.input!.value.trim())
    }

    keydown = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) {
            this.submit()
        }
    }

    render() {
        return (
            <div className="App-search-container">
                <input
                    ref={e => this.input = e}
                    className="App-search-input"
                    type="text"
                    maxLength={30}
                    onKeyDown={this.keydown}
                    aria-label="Enter search text"
                    role="text"
                />
                <button
                    onClick={this.submit}
                    className="App-search-btn"
                    aria-label="Search button"
                    role="button">Search</button>
            </div>
        )
    }

}

export default Search;