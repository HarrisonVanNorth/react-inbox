import React from 'react';

const Toolbar = ({appState, _toggleComposeForm, _markAsSelected, _markAsRead, _markAsUnread, _applyLabel, _removeLabel, _trashMessage}) => {


  let TotalUnread = appState.messages.map(message => !message.read ? 1 : 0 ).reduce(((acc, cv) => acc + cv),0)
  let disableOne;

  if(appState.allSelect === 0){
    disableOne = 'disabled'
  }

  return (
    <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{TotalUnread}</span>
      unread messages
    </p>

    <a className="btn btn-danger" onClick={_toggleComposeForm}>
      <i className="fa fa-plus"></i>
    </a>

    <button className="btn btn-default" onClick={_markAsSelected}>
      < i className = {`fa ${appState.allSelect === 0 ? 'fa-square-o' : appState.allSelect === 1 ? 'fa-minus-square-o' : 'fa-square'}`}></i>
    </button>

    <button className="btn btn-default" onClick={_markAsRead} disabled={disableOne}>
      Mark As Read
    </button>

    <button className="btn btn-default" onClick={_markAsUnread} disabled={disableOne}>
      Mark As Unread
    </button>

    <select className="form-control label-select" onChange={_applyLabel} disabled={disableOne}>
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select" onChange={_removeLabel} disabled={disableOne}>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default" onClick={_trashMessage} disabled={disableOne}>
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>
  )
}

export default Toolbar