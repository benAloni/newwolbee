import React from 'react'

export default function PlanEvent({createEvent}) {


  return (
    <div>
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {createEvent.map((event, index) => (
        <div 
          key={index} 
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            width: '250px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <h2>Event {index + 1}</h2>
          <p><strong>Budget:</strong> {event.budget} ₪</p>
          <p><strong>Employees:</strong> {event.employees}</p>
          <p><strong>Theme:</strong> {event.theme}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <h3>Completed Tasks: No Completed</h3>
          <ul>
            {event.tasks.map((task, taskIndex) => (
              <li key={taskIndex}>{task.text}</li>
            ))}
          </ul>
        </div>
      ))}
 <div 
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            width: '250px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <h2>Event 136</h2>
          <p><strong>Budget:</strong> 10000 ₪</p>
          <p><strong>Employees:</strong> 12</p>
          <p><strong>Theme:</strong> Choose for me</p>
          <p><strong>Location:</strong> On site</p>
          <p><strong>Time:</strong> This month</p>
          <h3>Completed Tasks: No Completed</h3>
          <ul>
          </ul>
        </div>
        <div 
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            width: '250px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <h2>Event 245</h2>
          <p><strong>Budget:</strong> 12300 ₪</p>
          <p><strong>Employees:</strong> 14</p>
          <p><strong>Theme:</strong> Seasonal</p>
          <p><strong>Location:</strong> Outside</p>
          <p><strong>Time:</strong> Choose a range</p>
          <h3>Completed Tasks: No Completed</h3>
          <ul>
          </ul>
        </div>
    </div>
    </div>
  )
}
