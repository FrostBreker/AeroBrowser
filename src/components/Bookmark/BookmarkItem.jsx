import React, { Component, createRef } from 'react'

export default class BookmarkItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.b.name,
            favicon: this.props.b.favicon,
            folder: this.props.b.folder,
            url: this.props.b.url,
        }
        this.buttonRef = createRef();
    }

    componentDidMount() {
        const openWebsiteInNewTab = (e) => {
            if (e.button === 1) {
                e.preventDefault();
                window.api.openUrlInNewTab({
                    url: this.state.url,
                    active: true
                })
            }
        }
        this.buttonRef.current.addEventListener("mousedown", openWebsiteInNewTab);
    }

    componentWillUnmount() {
        this.buttonRef.current.removeEventListener('click', (e) => { })
    }

    render() {

        const handleOpenWebsite = () => {
            window.api.openURL(this.state.url)
        };

        return (
            <button className="bookmarkItem" onClick={handleOpenWebsite} ref={this.buttonRef}>
                <img src={this.state.favicon} alt="bookmark-favicon" />
                <p>{this.state.name}</p>
            </button>
        )
    }
}
