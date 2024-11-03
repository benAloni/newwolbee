import React,{useState} from 'react'


export default function HeaderNotifications({setViewOption}) {

      
  return (
    <div>        <div
    className="viewOptions"
    style={{
      display: "flex",
      justifyContent: "right",
      position: "relative",
      right: "260px",
      top: "5px",
    }}
  >
    <ul
      style={{
        listStyleType: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        gap: "30px",
        fontSize: "18px",
      }}
    >
      <li
        style={{ cursor: "pointer", transition: "background-color 0.3s" }}
        onClick={() => setViewOption("All")}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7b500")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "initial")}
      >
        All
      </li>
      <li
        style={{ cursor: "pointer", transition: "background-color 0.3s" }}
        onClick={() => setViewOption("New")}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7b500")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "initial")}
      >
        New
      </li>
      <li
        style={{ cursor: "pointer", transition: "background-color 0.3s" }}
        onClick={() => setViewOption("Archive")}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7b500")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "initial")}
      >
        Archive
      </li>
    </ul>
  </div></div>
  )
}
