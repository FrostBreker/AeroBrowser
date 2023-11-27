import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from './Router'
import BookmarkMenu from '../Bookmark/BookmarkMenu'
import { addTab } from '../../actions/tabs.actions'
import ModalIndex from '../Modals/ModalsIndex'

export default function RouterManager({ showBookmarksMenu }) {
  const tabs = useSelector(state => state.tabsReducer)
  const dispatch = useDispatch()
  // eslint-disable-next-line
  const [activeTabGetter, setActiveTab] = useState(null)

  const [showModals, setShowModals] = useState(false)
  const [modalConfig, setModalConfig] = useState({})

  useEffect(() => {
    const activeTab = tabs.find(tab => tab.isActive)
    if (activeTab.webview !== null) {
      setActiveTab(activeTab)
    }
  }, [tabs])

  useEffect(() => {
    const tabAPI = window.tab
    if (tabAPI !== undefined) {
      tabAPI.onOpenUrlInNewTab((_event, value) => {
        dispatch(addTab(value.url ? value.url : undefined, value.active, true))
      })
    }

    return () => {
      const revokeTabAPI = window.revokedTab
      if (revokeTabAPI !== undefined) {
        revokeTabAPI.onOpenUrlInNewTab()
      }
    }
  }, [dispatch])

  const handleOpenWebsite = (url) => {
    const activeTab = tabs.find(tab => tab.isActive)
    if (activeTab.webview !== null) {
      activeTab.webview.loadURL(url)
    }
  }

  const handleOpenNewTabFromBookmark = (url) => {
    dispatch(addTab(url, false, true))
  }

  const handleShowModals = (conf) => {
    setShowModals(!showModals)
    if (conf === undefined) return
    setModalConfig({
      type: conf.type,
      data: conf.data
    })
  }

  return (
    <div className='router-manager'>
      <BookmarkMenu showBookmarksMenu={showBookmarksMenu} handleOpenWebsite={handleOpenWebsite} handleOpenNewTabFromBookmark={handleOpenNewTabFromBookmark} handleShowModals={handleShowModals} />
      <ModalIndex showModals={showModals} handleShowModals={handleShowModals} type={modalConfig.type} data={modalConfig.data} />
      {
        tabs.map(tab => (
          <Router tabId={tab.id} isActive={tab.isActive} key={tab.id} tab={tab} />
        ))
      }
    </div>
  )
}
