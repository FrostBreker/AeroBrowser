import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarks } from './actions/bookmarks.actions';
import { removeTab, addTab } from './actions/tabs.actions';
import { getUser } from './actions/user.actions';
import TabManager from './components/Tab/TabManager';
import { isEmpty } from './components/utils';

function App() {
  const html = document.querySelector('html');
  html.dataset.theme = `theme-dark`;
  const tabs = useSelector(state => state.tabsReducer)
  const webviews = useSelector(state => state.webviewReducer)
  const userData = useSelector(state => state.userReducer)
  const bookmarks = useSelector(state => state.bookmarksReducer)
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [bookmarksIsLoaded, setBookmarksIsLoaded] = useState(false);
  const [tabsIsLoaded, setTabsIsLoaded] = useState(false);

  //UseEffect to handle the ipcRenderer events from webview and tab process
  useEffect(() => {
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
          console.log(currentTab.id);
          dispatch(removeTab(currentTab.id))
        });

        api.onOpenUrlInNewTab((_event, value) => {
          dispatch(addTab(value.url ? value.url : undefined, value.active))
        });

        api.onOpenURLInRenderer((_event, value) => {
          view.loadURL(value);
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
      revokeApi.onOpenURLInRenderer();
    }
  }, [tabs, webviews, dispatch, userData])

  //UseEffect to handle the ipcRenderer events from user settings and bookmarks process
  useEffect(() => {
    const api = window.api;
    const bookmarksApi = window.bookmarks;
    const revokeApi = window.revokeApi;
    const revokeBookmarks = window.revokedBookmarks;

    if (isEmpty(userData)) {
      api.onGetUserPreferences((_event, value) => {
        dispatch(getUser(value));
        setIsLoaded(true);
      });
    }

    bookmarksApi.onGetBookmarks((_event, value) => {
      dispatch(getBookmarks(value));
      setBookmarksIsLoaded(true);
    });

    api.onGetTabs((_event, value) => {
      setTabsIsLoaded(true);
      value.forEach(tab => {
        dispatch(addTab(tab.url, false))
      })
    });

    return () => {
      revokeApi.onGetUserPreferences();
      revokeBookmarks.onGetBookmarks();
      revokeApi.onGetTabs();
    }
  }, [dispatch, userData, bookmarks])

  return (
    <>
      {
        isLoaded && bookmarksIsLoaded && tabsIsLoaded ? (
          <TabManager />
        ) : (
          <div className="loading">
            <h1>Loading</h1>
            {/* {
              isLoaded ? (<p>userData: ✅</p>) : (<p>userData: ⛔</p>)
            }

            {
              bookmarksIsLoaded ? (<p>bookmarks: ✅</p>) : (<p>bookmarks: ⛔</p>)
            } */}

          </div>
        )
      }
    </>
  );
}

export default App;
