import React, { Component } from 'react'

export default class BookmarkFolder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.b.name
        }
    }

    render() {
        return (
            <button className="bookmarkFolder">
                <img src="./img/icons/folder.svg" alt="bookmark-favicon" />
                <p>{this.state.name}</p>
            </button>
        )
    }
}
