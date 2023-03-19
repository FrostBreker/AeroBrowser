import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTab, addTab } from './actions/tabs.actions';
import TabManager from './components/Tab/TabManager';

function App() {
  const html = document.querySelector('html');
  html.dataset.theme = `theme-dark`;
  const tabs = useSelector(state => state.tabsReducer)
  const webviews = useSelector(state => state.webviewReducer)
  const dispatch = useDispatch();

  React.useEffect(() => {
    const api = window.api;
    const revokeApi = window.revokeApi;
    if (tabs.length !== 0 && webviews.length !== 0) {
      const currentTab = tabs.find(tab => tab.isActive)
      const currentWebview = webviews.find(webview => webview.tabId === currentTab.id)
      if (currentWebview) {
        const view = currentWebview.webView.current;
        api.onReloadTab(() => {
          view.reload();
        });

        api.onBackInTab(() => {
          view.goBack();
        });

        api.onPreviousInTab(() => {
          view.goForward();
        });

        api.onSearchInTab(() => {
          view.openFindWindow();
        });

        api.onOpenDevtools(() => {
          view.openDevTools();
        });

        api.onCloseTab(() => {
          dispatch(removeTab(currentTab.id))
        });

        api.onOpenUrlInNewTab((_event, value) => {
          dispatch(addTab(value.url ? value.url : undefined, value.active))
        });
      }
    }

    return () => {
      revokeApi.onReloadTab();
      revokeApi.onBackInTab();
      revokeApi.onPreviousInTab();
      revokeApi.onSearchInTab();
      revokeApi.onOpenDevtools();
      revokeApi.onCloseTab();
      revokeApi.onOpenUrlInNewTab();
    }
  }, [tabs, webviews, dispatch])


  return (
    <TabManager />
  );
}

export default App;
