import React, { Component } from 'react';

class ComposeForm extends Component {
  state = {
    body: '',
    subject: ''
  }

  _handleChange = (e) => {
    const {target} = e
        this.setState(() => {
      return {[target.name]: target.value}
    })
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    this.props.createMessage(this.state)
  }

  render() {
  return (
    <form className="form-horizontal well" onSubmit={this._handleSubmit}>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={this._handleChange}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control" onChange={this._handleChange}></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary"/>
        </div>
      </div>
    </form>
  )
  }
}

export default ComposeForm