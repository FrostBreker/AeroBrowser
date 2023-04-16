import React, { useEffect } from 'react'
import WebView from '../Webview/Webview'
import AeroRouter from './AeroRouter'
import { useState } from 'react'

export default function Router({ tabId, isActive }) {
    const [url, setUrl] = useState("home")
    const [type, setType] = useState("webview")

    useEffect(() => {

    }, [])

    return (
        <div className='router' style={{ display: isActive ? "block" : "none" }}>
            <div style={{ display: type === "webview" ? "block" : "none" }}>
                <WebView tabId={tabId} />
            </div>
            <div style={{ display: type === "aero" ? "block" : "none" }}>
                <AeroRouter url={url} />
            </div>
        </div>
    )
}
