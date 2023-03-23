import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, removeTab, setupTabs, tabClick } from '../../actions/tabs.actions';
import WebView from '../Webview/Webview';
import TabBar from './TabBar';
import TabSystem from './TabSystem';
import { isEmpty } from "../utils";
import BookmarkManager from '../Bookmark/BookmarkManager';


const TabManager = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const tabs = useSelector((state) => state.tabsReducer);

    useEffect(() => {
        if (!isEmpty(tabs)) {
            setIsLoaded(true);
        } else {
            dispatch(setupTabs())
        }
    }, [tabs, dispatch]);


    const handleTabClick = (tabId) => {
        dispatch(tabClick(tabId));
    };

    const handleCloseTab = (tabId) => {
        dispatch(removeTab(tabId));
    };

    return (
        <>
            {
                isLoaded ? (
                    <div className='tabManager' id='manager'>
                        <div className='tabs-bar'>
                            <div className='tabs-drag'>
                                {tabs.map((tab) => (
                                    <>
                                        <TabBar
                                            key={tab.id}
                                            id={tab.id}
                                            handleTabClick={handleTabClick}
                                            handleCloseTab={handleCloseTab}
                                        />
                                    </>
                                ))}
                            </div>
                            <button onClick={() => dispatch(addTab(undefined, true))} className='addTab'>
                                +
                            </button>
                            <div className='drag'></div>
                            <div className="utilsButtons">
                                <button className="minimizeBTN" onClick={window.api.minimizeApp}>
                                    <img src='./img/icons/utils/windowsMinimize.svg' alt='minizebutton' />
                                </button>
                                <button className="maximizeBTN" onClick={window.api.maximizeApp}>
                                    <img src='./img/icons/utils/windowsMaximize.svg' alt='minizebutton' />
                                </button>
                                <button className="closeBTN" onClick={() => window.api.closeApp(tabs)}>
                                    <img src='./img/icons/utils/windowsClose.svg' alt='minizebutton' />
                                </button>
                            </div>
                        </div>
                        <div>
                            {
                                tabs.map((tab) => (
                                    <div
                                        key={tab.id}
                                        style={{
                                            display: tab.isActive ? 'block' : 'none'
                                        }}
                                    >
                                        <TabSystem tabId={tab.id} key={`${tab.id}-tabSystem`} />
                                    </div>
                                ))

                            }
                            <BookmarkManager />
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    style={{
                                        display: tab.isActive ? 'block' : 'none',
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        bottom: '0',
                                        right: '0',
                                    }}
                                >
                                    <WebView tabId={tab.id} key={tab.id} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : <div>Loading</div>
            }
        </>
    );
};

export default TabManager;