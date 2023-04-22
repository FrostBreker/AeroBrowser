import React, { useState, useEffect } from 'react';
import TabManager from './components/Tab/TabManager';
import LoadingPage from './components/Utils/LoadingPage';
import defaultTheme from "./assets/themes/default.json"
import { isEmpty, loadTheme } from './components/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addTab } from './actions/tabs.actions';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const tabs = useSelector(state => state.tabsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const d = defaultTheme.default;
    loadTheme(d)
    if (!isLoaded) {
      if (!isEmpty(tabs)) {
        setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
      } else {
        dispatch(addTab("https://www.google.fr/", true, true));
      }
    }
  }, [isLoaded, tabs, dispatch])



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
