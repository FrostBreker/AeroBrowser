import React from 'react';
import WebView from './components/Webview/Webview';
import TabManager from './components/Tab/TabManager';

function App() {
  const html = document.querySelector('html');
  html.dataset.theme = `theme-dark`;

  return (
    <TabManager>
      <WebView />
    </TabManager>
  );
}

export default App;
