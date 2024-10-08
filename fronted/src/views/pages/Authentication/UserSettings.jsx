import React, { useEffect, useState } from "react";
import { app, auth, googleAuthProvider } from '../../../firebase/firebaseConfig'; // לא מייבא את storage כאן
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"; // ייבוא של פונקציות חדשות
import { CiCirclePlus } from 'react-icons/ci'; // או הספרייה שממנה הרכיב מגיע
import { CiTrash } from 'react-icons/ci';


import Sidebar from "../../layout/Sidebar";
import Header from "../../layout/Header";

import { animated, useSpring } from '@react-spring/web';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import BoxSelector from "./Barsettings";
import manager from "../../../imgs/managerProfilePic.jpg";
const UserSettings = () => {
  const [updateProfilePic, setUpdateProfilePic] = useState(""); 
  const [removePicPopup, setRemovePicPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("Notifications");
  const [selectedTime, setSelectedTime] = useState(null);
  const [frequency, setFrequency] = useState("Daily");
  const [notificationRepeat, setNotificationRepeat] = useState("3 Times");
  const [profilePicURL, setProfilePicURL] = useState("");
  const [progress, setProgress] = useState(0);
  const [profileName, setProfileName] = useState('');

  const storage = getStorage(app); // קבלת מופע של storage

  const [slideProps, api] = useSpring(() => ({
    transform: "translateX(0%)",

  }));
  // const slideProps = useSpring({
  //   opacity: activeTab === 'Notifications' ? 1 : 0,
  //   transform: activeTab === 'Notifications' ? 'translateX(0%)' : 'translateX(-100%)',
  //   config: { duration: 300 }
  // });
  useEffect(() => {
    const user = auth.currentUser; // קבלת המשתמש המחובר
    if (user) {
      const name = user.displayName || "Admin"; // במידה ואין שם, ייכתב Admin
      setProfileName(name);
    }
  }, []);


  useEffect(() => {
    const fetchProfilePic = async () => {
      const user = auth.currentUser;
      if (user) {
        const storageRef = ref(storage, `profilePictures/${user.uid}/profilePic`);
        try {
          const url = await getDownloadURL(storageRef);
          setProfilePicURL(url);
        } catch (error) {
          console.error('Error fetching profile pic:', error);
        }
      }
    };
    
    fetchProfilePic();
  }, [storage]);

  const triggerFileInput = () => {
    document.getElementById("profile-pic").click();
  };

  const handleUpdateProfile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    const storageRef = ref(storage, `profilePictures/${user.uid}/profilePic`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          setProfilePicURL(url);
          localStorage.setItem("profilePic", url);
        });
      }
    );
  };


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    api.start({ transform: "translateX(-100%)" });
    setTimeout(() => {
      api.set({ transform: "translateX(100%)" });
      api.start({ transform: "translateX(0%)" });
    }, 100);
  };
  const handleRemoveProfile = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const user = auth.currentUser;
    if (!user) return;

    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}/profilePic`);
      await deleteObject(storageRef);
      setProfilePicURL('');
      localStorage.removeItem("profilePic");
    } catch (error) {
      console.error('Error removing profile pic:', error);
    }

    setRemovePicPopup(false);
  };

  return (
    <div className="container" style={{marginLeft:'220px'}}>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Your Header and Sidebar components */}
        </div>
      </div>
      
      <div className="settings-page-container">
        <div className="user-profile-container">
          <div className="profile-pic-wrapper">
            <input
              type="file"
              accept="image/*"
              id="profile-pic"
              className="profile-pic-container"
              name="profile_pic"
              onChange={handleUpdateProfile}
            />
            <label
              htmlFor="profile-pic"
              className="profile-pic-label"
              style={{
                backgroundImage: `url(${profilePicURL || 'defaultImageUrl'})`,
                width: '120px',
                height: '120px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="icon plus" onClick={triggerFileInput}>
              <CiCirclePlus size={24} />
            </div>
            <div className="icon trash" onClick={() => setRemovePicPopup(true)}>
              <CiTrash size={24} />
            </div>
          </div>
          <div>
            <h2> {profileName ? `${profileName}` : "Admin"}</h2>
            <p>Product Development Manager</p>
          </div>
        </div>

        {removePicPopup && (
          <div className="popup">
            <p>Remove Profile Picture?</p>
            <button onClick={handleRemoveProfile}>Yes</button>
            <button onClick={() => setRemovePicPopup(false)}>Cancel</button>
          </div>
        )}

        <div className="settings-container"  style={{
    scrollbarColor: 'black',
    maxHeight: '400px', // גובה מקסימלי לדיב
    overflowY: 'auto', // פס גלילה אנכי כאשר התוכן חורג
    overflowX: 'hidden' // מסתיר פס גלילה אופקי
  }} >
          <h1>Settings</h1>
          <div className="tabs-container">
            <div
              className={`tab ${activeTab === "Notifications" ? "active" : ""}`}
              onClick={() => handleTabClick("Notifications")}
            >
              Notifications
            </div>
            <div
              className={`tab ${activeTab === "Language" ? "active" : ""}`}
              onClick={() => handleTabClick("Language")}
            >
              Language
            </div>
            <div
              className={`tab ${activeTab === "App Preferences" ? "active" : ""}`}
              onClick={() => handleTabClick("App Preferences")}
            >
              App Preferences
            </div>
          </div>

          <animated.div style={slideProps}>
            {activeTab === "Notifications" && (
              <div className="notifications-selection">
                <div className="toggle-container">
                  <span>Email Notifications</span>
                  <input type="checkbox" id="toggle1" className="toggle" />
                  <label htmlFor="toggle1" className="toggle-label"></label>
                </div>
                <div className="toggle-container">
                  <span>Desktop Notifications</span>
                  <input type="checkbox" id="toggle2" className="toggle" />
                  <label htmlFor="toggle2"></label>
                </div>
                <div className="toggle-container">
                  <span>Phone Notifications</span>
                  <input type="checkbox" id="toggle3" className="toggle" />
                  <label htmlFor="toggle3"></label>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <span>Notification Frequency</span>
                  <Select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120, ml: 2 }}
                  >
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </Select>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Select Time"
                      defaultValue={dayjs("2024-04-17T15:30")}
                      renderInput={(params) => (
                        <TextField {...params} sx={{ minWidth: 120 }} />
                      )}
                      value={selectedTime}
                      onChange={(newValue) => setSelectedTime(newValue)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>Notification Repeats</span>
                  <Select
                    value={notificationRepeat}
                    onChange={(e) => setNotificationRepeat(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="2 Times">2 Times</MenuItem>
                    <MenuItem value="3 Times">3 Times</MenuItem>
                    <MenuItem value="4 Times">4 Times</MenuItem>
                  </Select>
                </div>

                <h3>Notifications Selection</h3>
                <br />
                <BoxSelector />
                <div className="notification-settings">
                  <div className="checkbox-group">
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="checkbox" />
                      <span style={{ marginLeft: '8px' }}>Every Employee</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="checkbox" />
                      <span style={{ marginLeft: '8px' }}>Only Managers</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="checkbox" />
                      <span style={{ marginLeft: '8px' }}>No Managerial Attention</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="checkbox" />
                      <span style={{ marginLeft: '8px' }}>Only Milestone</span>
                    </label>
                  </div>
                  <button>OK</button>
                </div>
              </div>
            )}
            {activeTab === "Language" && <div>Language Settings</div>}
            {activeTab === "App Preferences" && <div>App Preferences Settings</div>}
          </animated.div>
        </div>
        <Sidebar></Sidebar>
        <Header></Header>
      </div>

      {/* Styles */}
      <style>
        {`
            .settings-page-container {
            display: flex;
            justify-content:center;
            margin:10rem;
            gap: 50px;
          }

         .user-profile-container{
            border: solid rgb(71, 89, 114) 2px;
            padding:25px;
            border-radius: 25px;
            height: 30rem;
            display: flex;
            flex-direction: column;
            align-items: center;  
            text-align: center;          
         }
             .profile-pic-wrapper {
            position: relative;
            display: inline-block;
            width: 120px;
            height: 120px;
            margin-bottom: 10px;
          }

          .profile-pic-container {
            width: 100%;
            height: 100%;
            background-color: #ccc;
            border-radius: 50%;
            cursor: pointer;
            background-size: cover;
            position: relative;
            border: solid rgb(71, 89, 114) 2px;
            display: none; /* Hide the actual file input */
          }

          .profile-pic-label {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: block;
          }

          .icon {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            padding: 2px;
            cursor: pointer;
          }

          .icon.plus {
            top: 5px;
            right: 5px;
          }

          .icon.trash {
            bottom: 5px;
          }
          .tabs-container {
            display: flex;
            margin-bottom: 16px;
          }

          .tab {
            padding: 8px 16px;
            cursor: pointer;
          }

          .tab.active {
            font-weight: bold;
            border-bottom: 3px solid #2196F3;
            color: #2196F3;
            position: relative;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
          }

          .settings-container {
            border: solid rgb(71, 89, 114) 2px;
            padding: 20px;
            border-radius: 25px;
            height: 30rem;
            width: 38rem;
          }
            .settings-container h1 {
            font-size: 26px;
            margin-bottom: 8px;
          }
          .toggle-container {
            display: flex;
            margin-bottom: 35px; 
          }

          .toggle-container span {
            flex: 1; 
          }

          .toggle-container input {
            display: none;
          }

          .toggle-container label {
            display: inline-block;
            width: 40px;
            height: 20px;
            background-color: #ccc;
            border-radius: 10px;
            position: relative;
            cursor: pointer;
          }

          .toggle-container label::before {
            content: "";
            position: absolute;
            top: 2px;
            left: 2px;
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 50%;
            transition: transform 0.3s;
          }

          .toggle-container input:checked + label {
            background-color: #2196F3;
          }

          .toggle-container input:checked + label::before {
            transform: translateX(20px);
          }
            .popup {
            position: fixed;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 350px;
            padding: 40px;
            border-radius: 10px;
            background-color: #2196F3;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            text-align: center;
          }
          .popup button {
            margin: 5px;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
          }       
             .popup p { 
            color:black;
            font-size:18px;
          }
            .notifications-settings{
             display: "flex",
              flexWrap: "wrap",
              height: "350px",
              overflow: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }
              .notification-icons {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
              }

              .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                border: 1px solid #ccc;
                border-radius: 50%;
              }

              .notification-settings {
                margin-top: 20px;
              }

              .checkbox-group {
                display: flex;
                flex-direction: column;
                gap: 10px;
              }

              button {
               margin: 5px;
            padding: 10px 40px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            background-color: #2196F3;
              }
`}
      
      
      </style>
    </div>
  );
};
export default UserSettings