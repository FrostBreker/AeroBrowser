import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../utils'
import DownloadItem from './DownloadItem'
import { getDownloads } from '../../actions/downloads.actions'

export default function DownloadPage() {
  const [loadDownload, setLoadDownload] = useState(true)
  const [count, setCount] = useState(5)
  const downloads = useSelector(state => state.downloadsReducer)
  const dispatch = useDispatch()
  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
      setLoadDownload(true)
    }
  }

  useEffect(() => {
    if (loadDownload) {
      dispatch(getDownloads(count))
      setLoadDownload(false)
      setCount(count + 5)
    }
  }, [loadDownload, dispatch, count])

  return (
    <div className='download-page'>
      {
        !isEmpty(downloads) ? downloads.sort((a, b) => b.startTime - a.startTime).map((item) => <DownloadItem key={item.id} item={item} />) : <p className='no-download'>No download</p>
      }
      <button className='load-more' onClick={loadMore}>Load More</button>
    </div>
  )
}
