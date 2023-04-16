import React from 'react'

export default function AeroRouter({ url }) {
    switch (url) {
        case "home":
            return (
                <div className="home">
                    <h1>Home</h1>
                </div>
            )
        case "settings":
            return (
                <div className="settings">
                    <h1>Settings</h1>
                </div>
            )
        case "about":
            return (
                <div className="about">
                    <h1>About</h1>
                </div>
            )
        default:
            return (
                <div className="home">
                    <h1>Home</h1>
                </div>
            )
    }
}
