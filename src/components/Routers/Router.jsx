import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import WebView from '../Webview/Webview'
import AeroRouter from './AeroRouter'
import { toggleWebview } from '../../actions/tabs.actions'

export default function Router ({ tabId, isActive, tab }) {
  const [url, setUrl] = useState('home')
  const [type, setType] = useState('webview')

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(tab);
  }, [tab])

  // Activate or Desactivate webview
  useEffect(() => {
    if (type !== 'webview' && tab.isWebview) {
      dispatch(toggleWebview(tabId, false))
    } else if (type === 'webview' && !tab.isWebview) {
      dispatch(toggleWebview(tabId, true))
    }

    if (tab.url.startsWith('aero://')) {
      console.log(tab.url)
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
