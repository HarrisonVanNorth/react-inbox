import React from 'react';
import Message from './Message'

const MessageList = ({messages, _readOneMessage, _selectOneMessage, _starOneMessage}) => {
  let MessageList =  messages.map(messageitem => 
    <Message 
    key={messages.id} 
    message={messageitem} 
    _readOneMessage={_readOneMessage} 
    _selectOneMessage={_selectOneMessage}
    _starOneMessage={_starOneMessage}
    
    />
  )
  return (
    <>
    {MessageList}
    </>
  )
}

export default MessageList