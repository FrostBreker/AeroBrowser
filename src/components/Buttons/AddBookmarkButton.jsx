import React from 'react';
import { useDispatch } from 'react-redux';
import { AddTabIcon } from '../UI/Icons';

export default function AddBookmarkButton() {
    const dispatch = useDispatch();


    return (
        <button className='addBookmarkButton'>
            <AddTabIcon />
        </button>
    )
}
