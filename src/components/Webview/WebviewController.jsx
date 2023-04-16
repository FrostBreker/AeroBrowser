import React, { Component } from 'react'

export default class WebviewController extends Component {
    render() {
        return (
            <div className="webviewController">
                <div className="forwardBackward">
                    <button className="backArrow">
                        <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <polyline fill="none" id="Left" points="15.5 5 8.5 12 15.5 19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        </svg>
                    </button>
                    <button className="forwardArrow">
                        <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <polyline fill="none" id="Right" points="8.5 5 15.5 12 8.5 19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}
