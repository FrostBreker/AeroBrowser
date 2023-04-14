import React, { useState, useEffect } from 'react';
import WebView from './components/Webview/Webview';
import TabManager from './components/Tab/TabManager';
import LoadingPage from './components/Utils/LoadingPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      // const html = document.querySelector('html');
      // html.dataset.theme = `theme`;
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }
  }, [isLoaded])



  return (
    <>
      {
        isLoaded ? (
          <TabManager>
            <WebView />
          </TabManager >
        ) : (
          <LoadingPage />
        )
      }
    </>
  );
}

export default App;
