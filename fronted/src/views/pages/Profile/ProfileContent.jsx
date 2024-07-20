import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { TiPin } from "react-icons/ti";
import { useParams } from "react-router-dom";

export const ProjectDetails = () => {
  const { employeeId } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [importanceLevels, setImportanceLevels] = useState({
    management: 'High',
    turnover: 'Medium',
    workLifeBalance: 'Low',
    managerialAttention: 'High',
    professionalism: 'Low'
  });
  useEffect(() => {
    const employeesArrJson = localStorage.getItem('employeesArr');
    const currentManagerEmployeesArr = JSON.parse(employeesArrJson);
    const employee = currentManagerEmployeesArr.find(emp => emp.id === (employeeId));
    setSelectedEmployee(employee);
  }, [employeeId]);

  if (!selectedEmployee) {
    return <div>No employees have been added yet...</div>;
  }

  const circleContainerStyle = {
    width: '120px', // הגדלת הגודל
    height: '120px', // הגדלת הגודל
    margin: '15px', // התאמת המרווח
    position: 'relative',
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    overflow: 'hidden',
  };
  
  const circleTextStyle = {
    fontSize: '14px', // הגדלת גודל הפונט
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  };
  
  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '25px', // התאמת המרווח
  };
  
  // const getColor = (value) => {
  //   if (value > 75) return '#f44336';
  //   if (value > 50) return '#8bc34a';
  //   if (value > 25) return '#9c27b0';
  //   return '#03a9f4';
  // };

  const experienceData = [
    {
      id: 1,
      name: "Compensation",
      time: "21/08/2023",
    },
    {
      id: 2,
      name: "Development plan",
      time: "10/01/2024",
    },
    {
      id: 3,
      name: "Personal interview",
      time: "17/04/2024",
    },
  ];

  const titleStyle = {
    textAlign: 'center',
    marginTop: '0',
  };

  const paragraphStyle = {
    position: 'relative',
    paddingLeft: '35px',
    marginBottom: '10px',
    fontSize: '16px',
  };

  const iconStyle = {
    position: 'absolute',
    left: '25px',
    // top: '10px',
    // transform: 'translateY(-50%)',
    color: '#FF902F',
  };

  const pinIconSize = 24;

  const getColor = (importance) => {
    switch (importance) {
      case 'High':
        return '#FF0000';
      case 'Medium':
        return '#FFA500';
      case 'Low':
        return '#008000';
      default:
        return '#000000';
    }
  };

  const containerStyle = {
    display: 'flex',
    gap: '15px'
  };

  const boxStyle = {
    backgroundColor: '#DCDCDC' ,
    width: '380px',
    height: '400px',
    padding: '20px',
    marginBottom: '20px',
    border: 'solid black 0.3px',
    borderRadius:'10px'
  };

  const getValue = (importance) => {
  switch (importance) {
    case 'High':
      return 100; // מלא
    case 'Medium':
      return 50; // חצי מלא
    case 'Low':
      return 25; // רבע מלא
    default:
      return 0; // ריק
  }
};


  return (
    <div className="tab-content">
      <div className="pro-overview tab-pane fade show active" id="emp_assets">
        <div style={containerStyle}>
          <div style={boxStyle}>
            <h3 style={titleStyle}>Wolbee’s Top insights</h3>
        <hr />
           <div style={{marginLeft: '15px'}}>
           {selectedEmployee.TopInsights.map((insight, index) => {
                  let parsedInsight;
                  try {
                    parsedInsight = JSON.parse(insight);
                  } catch (error) {
                    console.error("Failed to parse TopInsights JSON:", error);
                    parsedInsight = {}; // או כל ברירת מחדל
                  }
                  return Object.values(parsedInsight).map((info, i) => (
                    <div key={`${index}-${i}`}>
                     <br />
                     <TiPin style={iconStyle} size={pinIconSize}></TiPin> {info}</div>
                  ));
                })}
           </div>
           
          </div>
          <div style={boxStyle}>
            <h3 style={titleStyle}>Latest insights</h3>
<hr />
            <div style={{marginLeft: '15px'}}>
           {selectedEmployee.LatestInfo.map((insight, index) => {
                  let parsedInsigh;
                  try {
                    parsedInsigh = JSON.parse(insight);
                  } catch (error) {
                    console.error("Failed to parse TopInsights JSON:", error);
                    parsedInsigh = {}; // או כל ברירת מחדל
                  }
                  return Object.values(parsedInsigh).map((info, i) => (
                    <div key={`${index}-${i}`}>
                     <br />
                     <TiPin style={{ position: 'absolute', left: '415px' ,color: '#FF902F'}} size={pinIconSize}></TiPin> {info}</div>
                  ));
                })}
           </div>

            <div style={{marginLeft: '15px'}}>
        
           </div>
          </div>

          <div className="col-md-6 d-flex" style={{ width: '450px' }}>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 style={{ fontWeight: 'bold', fontSize: '24px' }}>Latest Activity</h3>
          <hr />
          <div className="experience-box">
            <div style={{ marginLeft: '15px' }}>
              {selectedEmployee.LastestActivity.map((insight, index) => {
                let parsedInsight;
                try {
                  parsedInsight = JSON.parse(insight);
                } catch (error) {
                  console.error("Failed to parse TopInsights JSON:", error);
                  parsedInsight = {}; // או כל ברירת מחדל
                }
                const entries = Object.entries(parsedInsight);
                return entries.map(([key, value], i) => (
                  <div key={`${index}-${i}`} style={{ marginBottom: (i % 2 === 1) ? '20px' : '0', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000' }}></div>
                      {i % 2 === 0 && i < entries.length - 1 && (
                        <div style={{ width: '2px', height: '20px', backgroundColor: '#000' }}></div>
                      )}
                    </div>
                    <div>
                      {i % 2 === 0 ? (
                        <div style={{ fontWeight: 'bold' }}>{value}</div>
                      ) : (
                        <div>{value}</div>
                      )}
                    </div>
                  </div>
                ));
              })}
            </div>
          </div>
        </div>
      </div>
    </div>






        </div>
        <div style={wrapperStyle}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={circleTextStyle}>Management</h4>
              <div style={circleContainerStyle}>
                <CircularProgressbar
                  value={getValue(importanceLevels.management)}
                  text={`${importanceLevels.management}`}
                  styles={buildStyles({
                    textSize: '20px',
                    textColor: getColor(importanceLevels.management),
                    pathColor: getColor(importanceLevels.management),
                    trailColor: '#d6d6d6',
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={circleTextStyle}>Turnover</h4>
              <div style={circleContainerStyle}>
                <CircularProgressbar
                  value={getValue(importanceLevels.turnover)}
                  text={`${importanceLevels.turnover}`}
                  styles={buildStyles({
                    textSize: '20px',
                    textColor: getColor(importanceLevels.turnover),
                    pathColor: getColor(importanceLevels.turnover),
                    trailColor: '#d6d6d6',
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={circleTextStyle}>Work-Life</h4>
              <div style={circleContainerStyle}>
                <CircularProgressbar
                  value={getValue(importanceLevels.workLifeBalance)}
                  text={`${importanceLevels.workLifeBalance}`}
                  styles={buildStyles({
                    textSize: '20px',
                    textColor: getColor(importanceLevels.workLifeBalance),
                    pathColor: getColor(importanceLevels.workLifeBalance),
                    trailColor: '#d6d6d6',
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={circleTextStyle}>Managerial</h4>
              <div style={circleContainerStyle}>
                <CircularProgressbar
                  value={getValue(importanceLevels.managerialAttention)}
                  text={`${importanceLevels.managerialAttention}`}
                  styles={buildStyles({
                    textSize: '20px',
                    textColor: getColor(importanceLevels.managerialAttention),
                    pathColor: getColor(importanceLevels.managerialAttention),
                    trailColor: '#d6d6d6',
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={circleTextStyle}>Professional</h4>
              <div style={circleContainerStyle}>
                <CircularProgressbar
                  value={getValue(importanceLevels.professionalism)}
                  text={`${importanceLevels.professionalism}`}
                  styles={buildStyles({
                    textSize: '20px',
                    textColor: getColor(importanceLevels.professionalism),
                    pathColor: getColor(importanceLevels.professionalism),
                    trailColor: '#d6d6d6',
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export const ListItem = ({ title, text }) => (
  <li>
    <div className="title">{title}</div>
    <div className="text">{text}</div>
  </li>
);

export default ProjectDetails;
