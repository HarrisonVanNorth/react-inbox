import React, { Component } from 'react';

import { Collapse } from 'reactstrap';

class Message extends Component {
  
  state = {
    collapse: false
  }
  
  
  _toggleStar = () => {  this.props._starOneMessage(this.props.message.id)}
  _toggleSelected = () => { this.props._selectOneMessage(this.props.message.id)}
  
  _toggleBody = () => { 
    this.setState({ collapse: !this.state.collapse});
    this.props._readOneMessage(this.props.message.id)
  }
  
  
  
  render(){
    const {message} = this.props  
    let Labels = message.labels.map(label => <span key={message.id} className='label label-warning'>{label}</span>)
    return (
      <>
        <div className={`row message ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={`${message.selected ? 'checked': ''}`} onClick={this._toggleSelected}/>
              </div>
              <div className="col-xs-2">
                <i className={`star fa ${message.starred ? 'fa-star' : 'fa-star-o'}`} onClick={this._toggleStar}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11" onClick={this._toggleBody}>
            {Labels}
            <a href="#">
              {message.subject}
            </a>
          </div>
          </div>
          <Collapse isOpen={this.state.collapse}>
            <div className="row message-body">
              <div className="col-xs-11 col-xs-offset-1">
                {message.body}
              </div>
            </div> 
          </Collapse>
      </>
    )
  }  
}
export default Message