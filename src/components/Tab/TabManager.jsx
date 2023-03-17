import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, removeTab, setupTabs, tabClick } from '../../actions/tabs.actions';
import WebView from '../Webview/Webview';
import TabBar from './TabBar';
import TabSystem from './TabSystem';
import { isEmpty } from "../utils";

const { ipcRenderer } = window.require('electron');

const TabManager = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const tabs = useSelector((state) => state.tabsReducer);

    useEffect(() => {

        if (!isEmpty(tabs)) {
            // ipcRenderer.send('get-tabs');
            // ipcRenderer.on('get-tabs-reply', (event, tabs) => {
            //     tabs.forEach((tab) => {
            //         dispatch(setupTabs(tab));
            //         setNextTabId(nextTabId + 1);
            //     });
            //     setIsLoaded(true);
            // });
            setIsLoaded(true);
        } else {
            dispatch(setupTabs("https://www.google.com/"))
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
                                <button className="minimizeBTN" onClick={() => ipcRenderer.send('minimizeApp')}>
                                    <img src='./img/icons/utils/windowsMinimize.svg' alt='minizebutton' />
                                </button>
                                <button className="maximizeBTN" onClick={() => ipcRenderer.send('maximizeApp')}>
                                    <img src='./img/icons/utils/windowsMaximize.svg' alt='minizebutton' />
                                </button>
                                <button className="closeBTN" onClick={() => ipcRenderer.send('closeApp')}>
                                    <img src='./img/icons/utils/windowsClose.svg' alt='minizebutton' />
                                </button>
                            </div>
                        </div>
                        <div>
                            <TabSystem tabId={tabs.find((tab) => tab.isActive).id} key={tabs.find((tab) => tab.isActive).id} />
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