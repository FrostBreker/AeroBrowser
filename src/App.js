import React, { useState, useEffect } from 'react';
import TabManager from './components/Tab/TabManager';
import LoadingPage from './components/Utils/LoadingPage';
import theme from "./assets/themes/dark-theme.json"
import { isEmpty, loadTheme } from './components/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addTab } from './actions/tabs.actions';
import { getBookmarks } from './actions/bookmark.actions';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const tabs = useSelector(state => state.tabsReducer);
  const bookmarks = useSelector(state => state.bookmarksReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    loadTheme(theme)

    window.bookmarks.onGetBookmarks((_event, value) => {
      dispatch(getBookmarks(value));
    });

    // window.extensions.installExtension("gighmmpiobklfepjocnamgkkbiglidom");

    if (!isLoaded) {
      if (!isEmpty(tabs)) {
        setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
      } else {
        if (isEmpty(tabs)) {
          dispatch(addTab("https://www.google.fr/", true, true));
        }
      }
    }

    return () => {
      window.revokedBookmarks.onGetBookmarks();
    }
  }, [isLoaded, tabs, dispatch, bookmarks]);

  return (
    <>
      {
        isLoaded ? (
          <TabManager />
        ) : (
          <LoadingPage />
        )
      }
    </>
  );
}

export default App;
