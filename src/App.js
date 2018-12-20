import React, { Component } from 'react';
import {Modal, ModalBody} from 'reactstrap'
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'
class App extends Component {
  state = {
    messages: [],
    allSelect: 1,
    modal: false
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:8082/api/messages')
    const json = await res.json()
    this.setState({messages: json})
  }

  _starOneMessage = (id) => {
    this.setState(({messages}) => {
      let newState = messages.map((message) => message.id === id ? {...message, starred: !message.starred } : message)
      return {messages: newState}  
    })
  }

  _selectOneMessage = (id) => {
    this.setState(({messages, allSelect}) => {
      allSelect = 1
      let newState = messages.map((message) => message.id === id ? {...message, selected: !message.selected } : message)
      return {messages: newState , allSelect}  
    })
  }

  _readOneMessage = (id) => {
    this.setState(({messages}) => {
      let newState = messages.map((message) => message.id === id ? {...message, read: true } : message)
      return {messages: newState}  
    })
  }

  _markAsSelected = () => {
    this.setState(({messages, allSelect}) => {
      let newState;
      if(allSelect === 1 || allSelect === 2){
        allSelect = 0
        newState = messages.map((message) => message.selected ? {...message, selected: false} : message)
      } else if(allSelect === 0){
        allSelect = 2
        newState = messages.map((message) => !message.selected ? { ...message, selected: true} : message)
      }      
      return {messages: newState , allSelect}  
    })
  } 

  _markAsRead = () => {
    this.setState(({messages}) => {
      let newState = messages.map((message) => message.selected ? {...message, read: true} : message)
      return {messages: newState}  
    })
  }

  _markAsUnread = () => {
    this.setState(({messages}) => {
      let newState = messages.map((message) => message.selected ? {...message, read: false } : message)
      return {messages: newState}  
    })
  }
  
  _applyLabel = (e) => {
    console.log(e.target.value)
    let newLabel = e.target.value
    this.setState(({messages}) => {
      let newState = messages.map((message) => message.selected && !message.labels.includes(newLabel) ? {...message, labels: [...message.labels, newLabel]} : message)
      return {messages: newState}  
    })
  }

  _removeLabel = (e) => {
    console.log(e.target.value)
    let newLabel = e.target.value
    this.setState(({messages}) => {
      let newState = messages.map((message) => 
      message.selected && message.labels.includes(newLabel) ? {...message, labels: message.labels.filter(label => label !== newLabel)} : message)
      return {messages: newState}  
    })
  }

  _trashMessage = () => {
    this.setState(({messages}) => {
      let newState = messages.filter(message => !message.selected)
      return {messages: newState}  
    })
  }

  _toggleComposeForm = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <>
      <Toolbar 
        _markAsRead={this._markAsRead} 
        _markAsUnread={this._markAsUnread}
        _markAsSelected={this._markAsSelected} 
        _applyLabel={this._applyLabel} 
        _removeLabel={this._removeLabel}
        _trashMessage={this._trashMessage}
        _toggleComposeForm={this._toggleComposeForm}
        appState={this.state}
      />
        <Modal isOpen={this.state.modal} toggle={this._toggleComposeForm} centered={true} backdrop={true} size={'lg'}>
          Hello
          <ComposeForm/>
        </Modal>

      <MessageList 
        messages={this.state.messages} 
        _readOneMessage={this._readOneMessage} 
        _selectOneMessage={this._selectOneMessage}
        _starOneMessage={this._starOneMessage}
      />
      </>
    );
  }
}

export default App;
