import React from 'react';
import SearchBar from './Searchbar';

export default function TabManager({ children }) {
    return (
        <div>
            <div className='top-bar'>
                <div className="top-bar-left">
                    {/* Add modal to select tab and displa the tab with the favicon*/}
                </div>
                <div className='top-bar-center'>
                    <SearchBar />
                </div>
                <div className='top-bar-right'>
                    {/* Button that diisplay every information and settings */}
                    <button className='showInfoBTN'>
                        <img src='./img/icons/chevron.svg' alt='chevron' />
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}
