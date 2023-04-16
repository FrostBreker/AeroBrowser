import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { tabClick } from '../../actions/tabs.actions';
import { removeTab } from '../../actions/tabs.actions';

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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                            </svg>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}
