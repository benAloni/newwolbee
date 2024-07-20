import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AllEmployeeAddPopup from "../../../components/modelpopup/AllEmployeeAddPopup";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import EmployeeListFilter from "../../../components/EmployeeListFilter";
import lisa from '../../../imgs/avatar_1.JPG';
import tom from '../../../imgs/avatar_2.JPG';
import david from '../../../imgs/avatar_3.JPG';
import nicole from '../../../imgs/avatar_4.JPG';
import brad from '../../../imgs/avatar_5.JPG';
import john from '../../../imgs/avatar_6.JPG';
import mark from '../../../imgs/avatar_7.JPG';
import josh from '../../../imgs/avatar_8.JPG';
import justin from '../../../imgs/avatar_9.JPG';
import selena from '../../../imgs/avatar_10.JPG';
import emma from '../../../imgs/avatar_11.JPG';
import sofia from '../../../imgs/avatar_12.JPG';
import PopUp from "./PopUp";

const AllEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);

  const avatars = [lisa, tom, david, nicole, john, emma, brad, josh, justin, selena, mark, sofia];

  const toggleFavorite = (event, employeeId) => {
    event.stopPropagation();
    const updatedFavoriteEmployees = [...favoriteEmployees];

    if (updatedFavoriteEmployees.includes(employeeId)) {
      updatedFavoriteEmployees.splice(updatedFavoriteEmployees.indexOf(employeeId), 1);
    } else {
      updatedFavoriteEmployees.push(employeeId);
    }

    setFavoriteEmployees(updatedFavoriteEmployees);
  };

  useEffect(() => {
    const manager = localStorage.getItem('credencial');
    const currentLoggedInManager = JSON.parse(manager);

    fetch('http://localhost:5000/findemployees', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(currentLoggedInManager)
    })
      .then(res => res.json())
      .then(data => {
        const employeesWithAvatars = data.map((employee, index) => ({
          ...employee,
          avatar: avatars[index % avatars.length]
        }));
        localStorage.setItem('employeesArr', JSON.stringify(employeesWithAvatars));
        setEmployees(employeesWithAvatars);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <style>
        {`
          .favorite-star {
            position: absolute;
            top: -20px;
            left: -70px;
            font-size: 24px;
            color: grey;
            cursor: pointer;
            transition: color 0.3s ease;
          }

          .favorite-star.active {
            color: yellow;
          }

          .profile-widget {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .profile-widget:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .profile-img {
            position: relative;
          }

          .avatar img {
            border-radius: 50%;
            transition: transform 0.3s ease;
          }

          .profile-img:hover .avatar img {
            transform: scale(1.1);
          }

          .dropdown-menu {
            transition: opacity 0.3s ease;
            opacity: 0;
            visibility: hidden;
          }

          .profile-action:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
          }
        `}
      </style>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle='Employees Page'
            modal="#add_employee"
            name="Add Employee"
          />
          <EmployeeListFilter />

          <div className="row">
            {employees.map((employee, index) => (
              <div
                className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                key={employee.id}
                style={{ position: 'relative' }}
                onClick={() => {/* Navigate to profile on clicking the div */}}
              >
                <div className="profile-widget">
                  <div className="profile-img">
                    <span 
                      className={`favorite-star ${favoriteEmployees.includes(employee.id) ? 'active' : ''}`}
                      onClick={(event) => toggleFavorite(event, employee.id)}
                    >
                      &#9734;
                    </span>
                    <Link 
                      to={`/profile/${employee.id}`}
                      className="avatar"
                    >
                      <img src={avatars[index % avatars.length]} alt={`${employee.fullName} Avatar`} />
                    </Link>
                  </div>
                  <div className="dropdown profile-action">
                    <Link
                      to="#"
                      className="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="material-icons">more_vert</i>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_employee"
                      >
                        <i className="fa fa-pencil m-r-5" /> Edit
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete"
                      >
                        <i className="fa-regular fa-trash-can m-r-5" /> Delete
                      </Link>
                    </div>
                  </div>
                  <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                    <Link to={`/profile/${employee.id}`}>{employee.fullName}</Link>
                  </h4>
                  <div className="small text-muted">{employee.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AllEmployeeAddPopup />
      <DeleteModal Name="מחק עובד" />
    </div>
  );
};

export default AllEmployee;
