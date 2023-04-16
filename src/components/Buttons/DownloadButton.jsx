import React from 'react'

export default function DownloadButton() {
    return (
        <button className='downloadButton'>
            <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                <polyline data-name="Right" fill="none" id="Right-2" points="7.9 12.3 12 16.3 16.1 12.3" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" x1="12" x2="12" y1="2.7" y2="14.2" />
            </svg>
        </button>
    )
}
