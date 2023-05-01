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
        this.handleOpenWebsite = this.props.handleOpenWebsite.bind(this);
        this.handleOpenNewTabFromBookmark = this.props.handleOpenNewTabFromBookmark.bind(this);
    }

    componentDidMount() {
        const openWebsiteInNewTab = (e) => {
            if (e.button === 1) {
                e.preventDefault();
                this.handleOpenNewTabFromBookmark(this.state.url)
            }
        }
        this.buttonRef.current.addEventListener("mousedown", openWebsiteInNewTab);
    }

    componentWillUnmount() {
        this.buttonRef.current.removeEventListener('click', (e) => { })
    }

    handleOpen = (e) => {
        e.preventDefault();
        this.handleOpenWebsite(this.state.url)
    };

    render() {

        return (
            <button className="bookmark" onClick={this.handleOpen} ref={this.buttonRef}>
                <img src={this.state.favicon} alt="bookmark-favicon" />
            </button>
        )
    }
}