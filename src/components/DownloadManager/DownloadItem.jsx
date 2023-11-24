import React from 'react'
import { convertBytesToHumanReadable } from '../utils'
import { AlertIcon } from '../UI/Icons'

export default function DownloadItem ({ item: { dlData: { downloadedBytes, totalBytes, speed, isPaused, isDone, isInterrupted }, startTime, id, state, data: { filename, url, savePath } } }) {
  const downloadedBytesInfo = convertBytesToHumanReadable(downloadedBytes)
  const totalBytesInfo = convertBytesToHumanReadable(totalBytes)
  const speedInfo = convertBytesToHumanReadable(speed)
  if (isDone) {
    return (
      <div key={id} className='download-item'>
        <div className='leftPart'>
          <AlertIcon />
        </div>
        <div className='rightPart'>
          <p className='filename'>{filename}</p>
          <a className='url' target='_blank' rel='noreferrer' href={url} download>{url}</a>
          <p>{new Date(parseInt(startTime * 1000)).toLocaleDateString('fr-fr', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
        </div>
      </div>
    )
  } else {
    return (
      <div key={id} className='download-item'>
        <div className='leftPart'>
          <AlertIcon />
        </div>
        <div className='rightPart'>
          <p className='filename'>{filename}</p>
          <a className='url' target='_blank' rel='noreferrer' href={url} download>{url}</a>
          <p className='downloadInfos'>{speedInfo.size}{speedInfo.unit}/s - {downloadedBytesInfo.size} {downloadedBytesInfo.unit} of {totalBytesInfo.size} {totalBytesInfo.unit}, </p>
          <progress className='progressBar' value={downloadedBytes} max={totalBytes} />
          <p>{new Date(parseInt(startTime * 1000)).toLocaleDateString('fr-fr', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
        </div>
      </div>
    )
  }
}
