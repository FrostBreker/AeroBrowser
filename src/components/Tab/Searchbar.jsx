import React, { Component } from 'react'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'https://www.google.com/search?q=',
            isFocusing: false
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ value: e.target.value })
        // this.props.onSubmit(this.state.value)
    }

    parseURL(url) {
        const urlObj = new URL(url);
        return {
            protocol: urlObj.protocol,
            domain: urlObj.hostname,
            path: urlObj.pathname,
            raw: url
        };
    }

    handleFocus = (e) => {
        this.setState({ isFocusing: true })
        e.target.select()
    }

    handleBlur = (e) => {
        this.setState({ isFocusing: false })
    }

    render() {
        return (
            <div className='searchBar'>
                <input type='text' value={this.state.isFocusing ? this.state.value : this.parseURL(this.state.value).domain} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
            </div>
        )
    }
}
