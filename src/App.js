import React, { Component } from 'react';
import {Collapse} from 'reactstrap'
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'
class App extends Component {
  state = {
    messages: [],
    modal: false
  }

  async componentDidMount() {
    const res = await fetch('http://localhost:8082/api/messages')
    const json = await res.json()
    this.setState({messages: json})
  }

  createMessage = async (input) => {
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const message = await response.json()
    this.setState({messages: [...this.state.messages, message], modal: false})
  }

  async patchMessage(input) {
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const message = await response.json()
    this.setState({messages: message})
  }

  _starOneMessage = (id) => {
    this.patchMessage({messageIds: [id], command: 'star'})
  }

  _selectOneMessage = (id) => {
    this.setState(({messages}) => {
      let newState = messages.map((message) => message.id === id ? {...message, selected: !message.selected } : message)
      return {messages: newState}  
    })
  }

  //ToolBarFunctions
  _markAsSelected = () => {
    this.setState(({messages}) => {
      let selectedStatus = messages.filter((message) => message.selected).length
      let selectAll = messages.map((message) => message.selected ? message : {...message, selected: true} )
      let UnselectAll = messages.map((message) => !message.selected ? message : {...message, selected: false} )
      let newState = selectedStatus === messages.length ? UnselectAll : selectAll
      return {messages: newState}  
    })
  } 

  _markAsRead = () => {
    let Ids = this.state.messages.filter((message) => message.selected).map((message) => message.id )    
    this.patchMessage({messageIds: Ids, command: 'read', read : true })
  }

  _markAsUnread = () => {
    let Ids = this.state.messages.filter((message) => message.selected).map((message) => message.id )
    this.patchMessage({messageIds: Ids, command: 'read', read : false })
  }
  
  _applyLabel = (e) => {
    let newLabel = e.target.value
    let Ids = this.state.messages.filter((message) => message.selected).map((message) => message.id)
    console.log(Ids)
    this.patchMessage({messageIds: Ids, command: 'addLabel', label: newLabel})
  }

  _removeLabel = (e) => {
    let newLabel = e.target.value
    let Ids = this.state.messages.filter((message) => message.selected).map((message) => message.id)
    console.log(Ids)
    this.patchMessage({messageIds: Ids, command: 'removeLabel', label: newLabel
    })
  }

  _trashMessage = () => {
        let Ids = this.state.messages.filter((message) => message.selected).map((message) => message.id)
        this.patchMessage({messageIds: Ids, command: 'delete'})
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
        messages={this.state.messages}
      />
        <Collapse isOpen={this.state.modal}>
          <ComposeForm createMessage={this.createMessage}/>
        </Collapse>

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
