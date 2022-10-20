import React from 'react'

const TableHeader = (props) => {
  return (
    <div className="tableHeader">
    <button
      className="btn btn_export"
      onClick={props.clickExport}
    >
    {props.exportIcon}
      Export
    </button>
    <div className="searchAndAdd">
      <input
        type="text"
        placeholder="Search Users"
        className="input searchInput"
        value={props.searchValue}
        onChange={props.searchInput}
      />
      <button
        className="btn btn_add"
        onClick={props.btnAddTop}
      >
        Add User
      </button>
    </div>
  </div>
  )
}

export default TableHeader
