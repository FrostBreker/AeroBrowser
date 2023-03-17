import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTab, addTab } from './actions/tabs.actions';
import TabManager from './components/Tab/TabManager';

const { ipcRenderer } = window.require('electron');

function App() {
  const html = document.querySelector('html');
  html.dataset.theme = `theme-dark`;
  const tabs = useSelector(state => state.tabsReducer)
  const webviews = useSelector(state => state.webviewReducer)
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (tabs.length !== 0 && webviews.length !== 0) {
      const currentTab = tabs.find(tab => tab.isActive)
      const currentWebview = webviews.find(webview => webview.tabId === currentTab.id)
      if (currentWebview) {
        const view = currentWebview.webView.current;

        ipcRenderer.on("reload-tab", () => {
          view.reload();
        });

        ipcRenderer.on("back-in-tab", () => {
          view.goBack();
        });

        ipcRenderer.on("previous-in-tab", () => {
          view.goForward();
        });

        ipcRenderer.on("search-in-tab", () => {
          view.openFindWindow();
        });

        ipcRenderer.on("open-devtools", () => {
          view.openDevTools();
        });

        ipcRenderer.on("close-tab", () => {
          dispatch(removeTab(currentTab.id))
        });

        ipcRenderer.on('open-url-in-new-tab', (event, dt) => {
          dispatch(addTab(dt.url, dt.active))
        });

      }
    }

    return () => {
      ipcRenderer.removeAllListeners('reload-tab');
      ipcRenderer.removeAllListeners('back-in-tab');
      ipcRenderer.removeAllListeners('previous-in-tab');
      ipcRenderer.removeAllListeners('search-in-tab');
      ipcRenderer.removeAllListeners('open-devtools');
      ipcRenderer.removeAllListeners('close-tab');
      ipcRenderer.removeAllListeners('open-url-in-new-tab');
    }
  }, [tabs, webviews, dispatch])


  return (
    <TabManager />
  );
}

export default App;
