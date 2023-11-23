import React from 'react'
import { DownloadIcon } from '../UI/Icons'

export default function DownloadButton() {
    return (
        <button className='downloadButton' onClick={(e) => {
            e.preventDefault();
            window.tab.loadURL("aero://downloads");
        }}>
            <DownloadIcon />
        </button>
    )
}
