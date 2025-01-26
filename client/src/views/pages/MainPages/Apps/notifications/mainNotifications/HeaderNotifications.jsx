import React from 'react';
import '../css/HeaderNotifications.css';

export default function HeaderNotifications({ setViewOption }) {
  return (
    <div className="header-notifications">
      <div className="view-options">
        
        <ul>
          <li
            onClick={() => setViewOption("All")}
            onMouseEnter={(e) => (e.target.classList.add("hover"))}
            onMouseLeave={(e) => (e.target.classList.remove("hover"))}
          >
            All
          </li>
          <li
            onClick={() => setViewOption("New")}
            onMouseEnter={(e) => (e.target.classList.add("hover"))}
            onMouseLeave={(e) => (e.target.classList.remove("hover"))}
          >
            New
          </li>
          <li
            onClick={() => setViewOption("Archive")}
            onMouseEnter={(e) => (e.target.classList.add("hover"))}
            onMouseLeave={(e) => (e.target.classList.remove("hover"))}
          >
            Archive
          </li>
        </ul>
      </div>
    </div>
  );
}
