import React, { useEffect, useState } from 'react'
import { RefreshIcon, AlertIcon, LockIcon, SearchIcon } from '../UI/Icons'
import { useDispatch } from 'react-redux'
import { toggleWebview, updateURL } from '../../actions/tabs.actions'
export default function Searchbar ({ tab }) {
  const [value, setValue] = useState('')
  const [tabType, setTabType] = useState('webview')
  const [isFocusing, setIsFocusing] = useState(false)

  const dispatch = useDispatch()

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleFocus = e => {
    e.preventDefault()
    setIsFocusing(true)
    e.target.select()
  }

  const handleBlur = () => {
    setIsFocusing(false)
  }

  const handleRefresh = () => {
    if (tabType === 'aero') return
    tab.webview.reload()
  }

  const parseURL = (url) => {
    if (/^[^/]+\.[^/]+$/.test(url)) {
      url = 'https://' + url
    }

    // If the input looks like a valid URL, navigate to that URL.
    if (/^(ftp|http|https|file|aero):\/\/[^ "]+$/.test(url)) {
      const type = url.split(':')[0]
      setTabType(type)
      return {
        url,
        type
      }
    } else {
      // Otherwise, perform a search with the default search engine.
      const searchQuery = encodeURIComponent(url)
      const searchUrl = `https://www.google.com/search?q=${searchQuery}`
      setTabType('webview')
      return {
        url: searchUrl,
        type: 'webview'
      }
    };
  }

  const handleSubmit = e => {
    e.preventDefault()
    const parsedUrl = parseURL(value)
    if (e.keyCode === 13) {
      if (parsedUrl.type === 'aero') {
        dispatch(toggleWebview(tab.id, false))
        dispatch(updateURL(tab.id, parsedUrl.url))
        setValue(parsedUrl.url)
      } else {
        dispatch(toggleWebview(tab.id, true))
        dispatch(updateURL(tab.id, parsedUrl.url))
        setValue(parsedUrl.url)
        if (tab !== null) {
          if (tab.webview !== null) {
            tab.webview.loadURL(parsedUrl.url)
          };
        };
      };
    };
  }

  const GetIconToDisplay = () => {
    if (value === undefined || value === null || value === '') {
      return <AlertIcon />
    } else if (isFocusing) {
      return <SearchIcon />
    } else if (value.startsWith('https://')) {
      return <LockIcon />
    } else if (value.startsWith('file://')) {
      return <p>File</p>
    } else if (value.startsWith('aero://')) {
      return <p>Aero</p>
    } else {
      return <AlertIcon />
    };
  }

  useEffect(() => {
    const handleGoToURL = (url) => {
      const parsedUrl = parseURL(url)
      if (parsedUrl.type === 'aero') {
        dispatch(toggleWebview(tab.id, false))
        dispatch(updateURL(tab.id, parsedUrl.url))
        setValue(parsedUrl.url)
      } else {
        dispatch(toggleWebview(tab.id, true))
        dispatch(updateURL(tab.id, parsedUrl.url))
        setValue(parsedUrl.url)
        if (tab !== null) {
          if (tab.webview !== null) {
            tab.webview.loadURL(parsedUrl.url)
          };
        };
      };
    }

    if (tab !== null) {
      if (tab.webview !== null) {
        const w = tab.webview
        setValue(tab.url === '' ? w.getURL() : tab.url)
        w.addEventListener('did-navigate-in-page', (e) => {
          setValue(e.url)
        })

        w.addEventListener('did-navigate', (e) => {
          setValue(e.url)
        })

        window.tab.onLoadURL((_event, value) => {
          handleGoToURL(value)
        })
      }
    }
    return () => {
      window.revokedTab.onLoadURL()
    }
  }, [tab, dispatch])

  const displayValue = isFocusing ? value : value.replace(/(^\w+:|^)\/\//, '').split('?')[0]

  return (
    <div className='search-bar'>
      {/* Have to open a modal that display information about the security of the website */}
      <button className='sslProtocol'>
        <GetIconToDisplay />
      </button>
      <input
        type='text'
        className='search-input'
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleSubmit}
      />
      <button className='refreshButton' onClick={handleRefresh}>
        <RefreshIcon />
      </button>
    </div>
  )
}
