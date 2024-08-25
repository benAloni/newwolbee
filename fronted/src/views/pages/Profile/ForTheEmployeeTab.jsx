import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function ForTheEmployeeTab() {
  return (
    <div className="tab-content">

<div style={{height:'400px' , width:'150px',backgroundColor:'black'}}> 
  <h1></h1>
</div>














<div className="fade" id="emp_assets" style={{position:"top"}} >
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ width: 100 }}>
          <CircularProgressbar
            value={70}
            text={`${70}%`}
            styles={buildStyles({ textColor: 'black', pathColor: '#3fc1c9', trailColor: '#d6d6d6' })}
          />
        </div>
        <div style={{ width: 100 }}>
          <CircularProgressbar
            value={50}
            text={`${50}%`}
            styles={buildStyles({ textColor: 'black', pathColor: '#f39c12', trailColor: '#d6d6d6' })}
          />
        </div>
        <div style={{ width: 100 }}>
          <CircularProgressbar
            value={30}
            text={`${30}%`}
            styles={buildStyles({ textColor: 'black', pathColor: '#3498db', trailColor: '#d6d6d6' })}
          />
        </div>
        <div style={{ width: 100 }}>
          <CircularProgressbar
            value={90}
            text={`${90}%`}
            styles={buildStyles({ textColor: 'black', pathColor: '#e74c3c', trailColor: '#d6d6d6' })}
          />
        </div>
      </div>




    </div>
    </div>
  )
}
