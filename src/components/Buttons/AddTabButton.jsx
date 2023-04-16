import React from 'react';
import { useDispatch } from 'react-redux';
import { addTab } from '../../actions/tabs.actions';

export default function AddTabButton() {
    const dispatch = useDispatch();

    const handleAddTab = (e) => {
        e.preventDefault();
        dispatch(addTab("https://www.google.fr/", true));
    }
    return (
        <button className='addTabButton' onClick={handleAddTab}>
            <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="12" x2="12" y1="19" y2="5" />
                <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="5" x2="19" y1="12" y2="12" />
            </svg>
        </button>
    )
}
