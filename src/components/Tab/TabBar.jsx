import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { tabClick } from '../../actions/tabs.actions';
import { removeTab } from '../../actions/tabs.actions';
import { CloseIcon } from '../UI/Icons';

export default function TabBar() {
    const tabs = useSelector(state => state.tabsReducer);
    const dispatch = useDispatch();

    const handleTabClick = (tabId) => {
        dispatch(tabClick(tabId));
    }

    const handleDeleteTab = (tabId) => {
        dispatch(removeTab(tabId))
    }

    return (
        <div className="tab-bar">
            {
                tabs.map(tab => (
                    <div className={`tab ${tab.isActive ? "" : "inactive"}`} onClick={() => handleTabClick(tab.id)} key={tab.id}>
                        <img src={tab.favicon} alt='favicon' />
                        <p>{tab.title}</p>
                        <button className="close" onClick={(e) => { e.stopPropagation(); handleDeleteTab(tab.id) }}>
                            <CloseIcon />
                        </button>
                    </div>
                ))
            }
        </div>
    )
}
