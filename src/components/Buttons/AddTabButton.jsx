import React from 'react'
import { useDispatch } from 'react-redux'
import { addTab } from '../../actions/tabs.actions'
import { AddTabIcon } from '../UI/Icons'

export default function AddTabButton () {
  const dispatch = useDispatch()

  const handleAddTab = (e) => {
    e.preventDefault()
    dispatch(addTab('https://www.google.fr/', true, true))
  }
  return (
    <button className='addTabButton' onClick={handleAddTab}>
      <AddTabIcon />
    </button>
  )
}
