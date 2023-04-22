import React from 'react'
import { useSelector } from 'react-redux';
import Tab from './Tab';

export default function TabBars() {
    const tabs = useSelector(state => state.tabsReducer);


    return (
        <div className="tab-bar">
            {
                tabs.map(tab => (
                    <Tab tab={tab} key={tab.id} />
                ))
            }
        </div>
    )
}
