import React, { Component, createRef } from 'react'

export default class BookmarkItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.book.name,
            favicon: this.props.book.favicon,
            folder: this.props.book.folder,
            url: this.props.book.url,
        }
        this.buttonRef = createRef();
    }

    componentDidMount() {
        const openWebsiteInNewTab = (e) => {
            if (e.button === 1) {
                e.preventDefault();
                window.open(this.state.url, '_blank');
            }
        }
        this.buttonRef.current.addEventListener("mousedown", openWebsiteInNewTab);
    }

    componentWillUnmount() {
        this.buttonRef.current.removeEventListener('click', (e) => { })
    }

    handleOpenWebsite = (e) => {
        e.preventDefault();
        window.open(this.state.url, '_parent');
    };

    render() {

        return (
            <button className="bookmark" onClick={this.handleOpenWebsite} ref={this.buttonRef}>
                <img src={this.state.favicon} alt="bookmark-favicon" />
            </button>
        )
    }
}