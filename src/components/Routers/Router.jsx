import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import WebView from '../Webview/Webview'
import AeroRouter from './AeroRouter'
import { toggleWebview } from '../../actions/tabs.actions'

export default function Router({ tabId, isActive, tab }) {
  const [url, setUrl] = useState('')
  const [type, setType] = useState('')

  const dispatch = useDispatch()

  const parseURL = (url) => {
    if (/^[^/]+\.[^/]+$/.test(url)) {
      url = 'https://' + url
    }
    console.log(url);

    // If the input looks like a valid URL, navigate to that URL.
    if (/^(ftp|http|https|file|aero):\/\/[^ "]+$/.test(url)) {
      const type = url.split(':')[0]
      setType(type)
      return {
        tabURl: url,
        tabType: type
      }
    } else {
      // Otherwise, perform a search with the default search engine.
      const searchQuery = encodeURIComponent(url)
      const searchUrl = `https://www.google.com/search?q=${searchQuery}`
      setType('webview')
      return {
        tabURl: searchUrl,
        tabType: 'webview'
      }
    };
  }

  useEffect(() => {
    // console.log(tab);
  }, [tab])

  // Activate or Desactivate webview
  useEffect(() => {
    const { tabType, tabURl } = parseURL(tab.url)
    if (tabType !== 'webview' && tab.isWebview) {
      dispatch(toggleWebview(tabId, false))
    } else if (tabType === 'webview' && !tab.isWebview) {
      dispatch(toggleWebview(tabId, true))
    }

    if (tab.url.startsWith('aero://')) {
      console.log(tabURl)
      setUrl(tab.url)
      setType('aero')
    } else {
      setUrl(tab.url)
      setType('webview')
    }

  }, [type, dispatch, tabId, tab.isWebview, tab.url])

  return (
    <div className='router' style={{ display: isActive ? 'block' : 'none' }}>
      <div style={{ display: type === 'webview' ? 'block' : 'none' }}>
        <WebView tabId={tabId} defaultURL={tab.defaultUrl} />
      </div>
      <div style={{ display: type === 'aero' ? 'block' : 'none' }}>
        <AeroRouter url={url} />
      </div>
    </div>
  )
}
