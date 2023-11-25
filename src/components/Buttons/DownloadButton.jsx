import React from 'react'
import { DownloadIcon } from '../UI/Icons'
import { useDispatch } from 'react-redux'
import { addTab } from '../../actions/tabs.actions'

export default function DownloadButton() {
  const dispatch = useDispatch()
  return (
    <button
      className='downloadButton' onClick={(e) => {
        e.preventDefault()
        dispatch(addTab("aero://downloads", true, false))
      }}
    >
      <DownloadIcon />
    </button>
  )
}
