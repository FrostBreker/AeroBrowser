import React, { Component } from 'react'
import { LeftTriangleCarretIcon, RightTriangleCarretIcon } from '../UI/Icons'

export default class WebviewController extends Component {
    render() {
        return (
            <div className="webviewController">
                <div className="forwardBackward">
                    <button className="backArrow">
                        <LeftTriangleCarretIcon />
                    </button>
                    <button className="forwardArrow">
                        <RightTriangleCarretIcon />
                    </button>
                </div>
            </div>
        )
    }
}
