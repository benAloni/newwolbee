/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
// import { withRouter } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import { managerSideBarData } from "./HrSideBarData";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import { logout } from "../redux";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import logo from "./logo.png"

const Sidebar = () => {

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 
  const pathname = location.pathname;
  const [sidebarData, setSidebarData] = useState([]);

  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);
  const [submenuDrop, setSubmenudrop] = useState(false);



  const handleLogout = () => {
    dispatch(logout());
    signOut(auth);
    queryClient.clear();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };


  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user && user.role) {
      if (user.role === "manager") {
        setSidebarData(managerSideBarData);
      } else {
        setSidebarData(SidebarData);
      }
    }

  }, [user]);

  useEffect(() => {
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  const handleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const handleMouseLeave = () => {
    setMouseOverSidebar(false);
  };
  const { t } = useTranslation();

  const expandSubMenus = (menu) => {
    sessionStorage.setItem("menuValue", menu.menuValue);
    const updatedAdminSidebar = sidebarData.map((section) => {
      const updatedSection = { ...section };
      updatedSection.menu = section.menu.map((menuItem) =>
        menu.menuValue != menuItem.menuValue
          ? {
            ...menuItem,
            showSubRoute: false,
          }
          : {
            ...menuItem,
            showSubRoute: !menu.showSubRoute,
          }
      );
      return updatedSection;
    });
    setSidebarData(updatedAdminSidebar);
  };

  const activeRouterPath = (routesArray) => {
    return (routesArray = Location.pathname);
  };

  const activeRouterMenu = (menu) => {
    return Location.pathname.includes(menu.toLowerCase());
  };

  const arrowDrop = () => {
    setSubmenudrop(!submenuDrop);
  };

  
  return (
    <div
      className={`sidebar ${isSidebarExpanded ? "" : "hidden"}`}
      id="sidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-inner slimscroll" style={{ overflow: false }}>
        <div id="sidebar-menu" className="sidebar-menu">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
  <img 
    src={logo} 
    alt="logo" 
    style={{
      width: '70px', /* גודל התמונה */
      height: '70px', /* גובה התמונה */
      borderRadius: '50%', /* עיגול לתמונה */
      objectFit: 'cover', /* שומר על פרופורציות התמונה */
      // border: '2px solid #000', /* קו מסביב לתמונה */
      display: 'block',
    }} 
  />
</div>
        
            
          
          <Scrollbars
            autoHide={false}
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax="100vh"
            thumbMinSize={30}
            universal={false}
            hideTracksWhenNotNeeded={true}
          >
            <ul
      className="sidebar-vertical"
      id="veritical-sidebar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '10px',
        margin: 0,
        listStyleType: 'none',
        height: '100%',
        width: '100%',
      }}
    >
              {/* {userRole !== "manager"} */}
              {sidebarData.map((mainTittle, index) => {
                return (
                  <>
                    <li
                      className="menu-title"
                      key={index + 1}
                      style={{ color: "black" }}
                    >
                      <span>{t(mainTittle.tittle)}</span>
                      {mainTittle?.tittle === "CRM" ? (
                        <small class="newly-added-features">New</small>
                      ) : (
                        ""
                      )}
                    </li>
                    {mainTittle.menu.map((menu, menuIndex) => {
                      return (
                        <>
                          {menu.hasSubRoute === false ? (
                            <li
                              key={menuIndex + 1}
                              className={pathname == menu.route ? "active" : ""}
                              style={{ color: "black" }}
                            >
                              <Link to={menu.route}>
                                {/* {menu.icon} */}
                                <i className={menu?.icon} />
                                <span>{t(menu.menuValue)}</span>
                              </Link>
                            </li>
                          ) : (
                            <li className="submenu">
                              <Link
                                to="#"
                                onClick={() => expandSubMenus(menu)}
                                className={menu.showSubRoute ? "subdrop" : ""}
                              >
                                <i className={menu?.icon} />
                                <span
                                  className={
                                    menu?.menuValue == "Employees"
                                      ? "noti-dot"
                                      : ""
                                  }
                                >
                                  {t(menu.menuValue)}
                                </span>
                                <span className="menu-arrow"></span>
                              </Link>
                              <ul
                                style={{
                                  display: menu.showSubRoute ? "block" : "none",
                                }}
                              >
                                {menu.subMenus.map((subMenus, subMenu) => {
                                  return (
                                    <>
                                      {/* {console.log(subMenus?.showMenuRoute)} */}
                                      {subMenus?.showMenuRoute === true ? (
                                        <li key={subMenu + 1}>
                                          <Link
                                            to={subMenus.route}
                                            className={
                                              submenuDrop ? "subdrop" : ""
                                            }
                                            onClick={arrowDrop}
                                          >
                                            {t(subMenus.menuValue)}
                                            <span className="menu-arrow"></span>
                                          </Link>

                                          <ul
                                            style={{
                                              display: submenuDrop
                                                ? "block"
                                                : "none",
                                            }}
                                          >
                                            {subMenus?.subMenusValues?.map(
                                              (value, index) => {
                                                return (
                                                  <li key={index}>
                                                    <span>
                                                      <Link to={value.route}>
                                                        <span>
                                                          {t(value.menuValue)}{" "}
                                                        </span>
                                                      </Link>
                                                    </span>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </li>
                                      ) : (
                                        <li key={subMenu + 1}>
                                          <Link
                                            to={subMenus.route}
                                            className={
                                              pathname == subMenus?.route
                                                ? "active"
                                                : ""
                                            }
                                          >
                                            {t(subMenus.menuValue)}
                                          </Link>

                                          <ul>
                                            {subMenus?.subMenusValues?.map(
                                              (value, index) => {
                                                return (
                                                  <li key={index}>
                                                    <Link
                                                      to={value.route}
                                                      className={
                                                        pathname == value?.route
                                                          ? "active"
                                                          : ""
                                                      }
                                                    >
                                                      {t(value.menuValue)}
                                                    </Link>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </li>
                                      )}
                                    </>
                                  );
                                })}
                              </ul>
                            </li>
                          )}
                        </>
                      );
                    })}


                  </>
                );
              })}
            </ul>
          </Scrollbars>
        </div>

        <div style={{ marginBottom: "20px" }}>
  <div style={{ marginTop: "140px", marginLeft: "20px" }}> 
    <div className="new">
      <Link style={{ color: "black" }} to="/settings">Setting</Link>
    </div>
    <div className="new">
      <a style={{ color: "black" }} onClick={handleLogout}>Sign Out</a>
    </div>
  </div>
</div>

</div>

  
          </div>
      
  
  );
};

export default Sidebar;
