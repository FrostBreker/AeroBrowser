import React, { useState, useEffect } from 'react'
import { LeftTriangleCarretIcon, RightTriangleCarretIcon } from '../UI/Icons'

export default function WebviewController ({ tab }) {
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  useEffect(() => {
    if (tab !== null) {
      if (tab.webview !== null) {
        setCanGoBack(tab.webview.canGoBack())
        setCanGoForward(tab.webview.canGoForward())
        tab.webview.addEventListener('did-navigate', () => {
          setCanGoBack(tab.webview.canGoBack())
          setCanGoForward(tab.webview.canGoForward())
        })
      }
    }

    return () => {
      if (tab !== null) {
        if (tab.webview !== null) {
          tab.webview.removeEventListener('did-navigate', () => { })
        }
      }
    }
  }, [tab])

  return (
    <div className='webviewController'>
      <div className='forwardBackward'>
        <button className='backArrow' disabled={!canGoBack} onClick={() => tab.webview.goBack()}>
          <LeftTriangleCarretIcon />
        </button>
        <button className='forwardArrow' disabled={!canGoForward} onClick={() => tab.webview.goForward()}>
          <RightTriangleCarretIcon />
        </button>
      </div>
    </div>
  )
}
