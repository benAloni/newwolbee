import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { fetchEmployees, fetchEmployeesProfilePics } from '../../../../../services';

const EmployeesWorkingHours = () => {
  const [animated, setAnimated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const user = useSelector((state) => state.auth?.user?.uid);
  const queryClient = useQueryClient();

  const getEmployees = async () => {
    try {
      const employees = await fetchEmployees();
      const employeesWithProfilePics = await Promise.all(
        employees.map(async (employee) => {
          const profilePicUrl = await fetchEmployeesProfilePics(user, employee.employeeId);
          return {
            ...employee,
            id: employee._id,
            fullName: employee.fullName,
            performance: Math.floor(Math.random() * 150),
            avatar: profilePicUrl || '',
          };
        })
      );
      queryClient.setQueryData(['employees'], employeesWithProfilePics);
      return employeesWithProfilePics;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  };

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  useEffect(() => {
    setAnimated(true);
  }, []);

  useEffect(() => {    
    if (employees?.length > 0) {      
      const filtered = employees.filter((employee) =>
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const maxPerformance = Math.max(...filteredEmployees.map((e) => e.performance || 0), 0);

  // Calculate percentages and filter only employees who exceeded 100%
  const percentageData = filteredEmployees
    .map((employee) => ({
      ...employee,
      percentage: maxPerformance ? Math.round(((employee.performance || 0) / maxPerformance) * 110) : 0,
    }))
    .filter((employee) => employee.percentage > 100); // Displays only employees who exceeded 100%

  // Component styling
  const sectionStyle = {
    width: '100%',
    height: '100%',
    padding: "10px",
    maxWidth: '30rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    color: '#101820',
    backgroundColor: '#f8f8f8',
  };

  const searchStyle = {
    padding: '0.5rem',
    marginBottom: "10px",
    borderRadius: '0.3rem',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '0.9rem',
    height: "25px",
  };

  const chartStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.5rem',
    alignItems: 'center',
    maxHeight: '180px',
    overflowY: 'auto', 
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.3rem 0',
    justifyContent: 'space-between', 
  };

  const labelContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  };

  const avatarStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #ddd',
  };

  const labelStyle = {
    fontWeight: 'bold',
  };

  const barContainerStyle = {
    flex: 1,
    height: '1rem',
    borderRadius: '0.3rem',
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  };

  const barStyle = (percentage) => ({
    width: animated ? `${percentage}%` : '0%',
    backgroundColor: percentage > 100 ? '#F40009' : 'green',
    height: '100%',
    transition: 'width 1s ease-in-out',
  });

  const percentageStyle = {
    marginLeft: '0.5rem',
    fontWeight: 'bold',
  };

  return (
    <section style={sectionStyle}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
       
          {percentageData.length > 0 ? (
            <ul style={chartStyle}>
              {percentageData.map((employee) => (
                <li key={employee.id} style={listItemStyle}>
                  <div style={labelContainerStyle}>
                    <img src={employee.imageUrl} alt={employee.fullName} style={avatarStyle} />
                    <span style={labelStyle}>{employee.fullName}</span>
                  </div>
                  <div style={barContainerStyle}>
                    <div style={barStyle(employee.percentage)}></div>
                  </div>
                  <span style={percentageStyle}>{employee.percentage}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees exceeded 100% hours</p>
          )}
        </>
      )}
    </section>
  );
};

export default EmployeesWorkingHours;
