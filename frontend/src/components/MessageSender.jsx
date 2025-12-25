import React from 'react'

const MessageSender = ({message}) => {
  return (
    <div className='self-end bg-gray-100 shadow-xl p-3 rounded-b-lg rounded-tl-lg'>
      <p>{message}</p>
    </div>
  )
}

export default MessageSender