import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import SearchBox from "../../../components/SearchBox";
import DepartmentModal from "../../../components/modelpopup/DepartmentModal";
import { base_url } from "../../../base_urls";
import gift from '../../../imgs/gift.png'
import notforget from '../../../imgs/notforget.png'
import team from '../../../imgs/team.png'
import off from '../../../imgs/off.png'
import shef from '../../../imgs/shef.png'
import allow from '../../../imgs/allow.png'
import mail from '../../../imgs/mail.png'
import smallgift from '../../../imgs/smallgift.png'
import thankyou from '../../../imgs/thankyou.png'
import remind from '../../../imgs/remind.png'


const projectCardStyle = {
  width: '300px',
  boxSizing: 'border-box',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  padding: '20px',
  background: '#fff',
  margin: '10px', // Small margin between cards
};

const imageContainerStyle = {
  width: '100px',
  height: '100px',
  margin: '0 auto 10px',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #ddd',
};

const imgStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '50%',
};

const projectDetailsTextStyle = {
  padding: '10px',
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
};

const h3Style = {
  fontSize: '18px',
  margin: '10px 0',
};

const pStyle = {
  fontSize: '14px',
  color: '#555',
  margin: '5px 0',
};




const Department = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOption = (option) => {
    if (option === "in3Days" || option === "in1Week") {
      // טיפול באופציות הראשונות כאן (לדוגמה: שליחת בקשה לשרת לדחיית הפרויקט)
    } else if (option === "schedule" || "schedule1" ) {
      setShowDatePicker(true);
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          {/* <Breadcrumbs
            maintitle="Department"
            title="Dashboard"
            subtitle="Department"
            modal="#add_department"
            name="Add Department"
          /> */}

          <div>
            <h1>Nicole Miller birthday</h1>
            <br />
            <h4>On Sunday, May 17, 2023, Nicole will celebrate her 27th birthday. With 5 years of
dedicated service to the company, she's achieved remarkable milestones.</h4>
<br />
<h3>Nicole's birthday is a perfect chance to express our appreciation for her invaluable
contributions to the company. A thoughtful word, a small gift, or a simple gesture
will do the trick</h3>
          </div>
          <br />
          <br />
          <br />
          {/* /Page Header */}
          <div className="row" style={rowStyle}>
            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to="/projects">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={gift} alt="Project One" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>Personalized gift</h1>
                  <h4 style={pStyle}>Take the extra mile and
give a personalized gift
to make Nicole feel
special</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>

            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to="https://wolt.com/he/discovery/restaurants">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={smallgift} alt="Project Two" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>A small gesture</h1>
                  <h4 style={pStyle}>Leave a small gift on
Nicole’s desk to show
her that you care</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>

            <div
  className="project-card"
  style={projectCardStyle}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
>
  <a href="mailto:your.email@example.com?subject=Thank%20you%20message&body=Dear%20Nicole,%0A%0AGive%20Nicole%20a%20Grant%20or%20a%20Bonus%20to%20Show%20her%20that%20she%20is%20Valued">
    <div className="image-container" style={imageContainerStyle}>
      <img src={thankyou} alt="Project Three" style={imgStyle} />
    </div>
    <div className="project-details" style={projectDetailsTextStyle}>
      <h1 style={h3Style}>Let’s say thank you</h1>
      <h4 style={pStyle}>Give Nicole a Grant or a Bonus to Show her that she is Valued</h4>
    </div>
  </a>
  <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
</div>

            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to="https://api.whatsapp.com/send?phone=972525242172&text=היי+מה+שלומך+עבדת+מצוין+השבוע+מבחינתי+את\ה+יכול+לצאת+מוקדם+יותר+הביתה+">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={allow} alt="Project Four" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>Fixable working
hours</h1>
                  <h4 style={pStyle}>Offer Nicole the chance
to start late or finish her
workday early on her
birthday</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>

            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to="mailto:your.email@example.com?subject=המון%20מזל%20טוב&body=Dear%20Nicole%2C%0A%0Aהמון%20מזל%20טוב">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={mail} alt="Project Five" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>Personalized birthday

card:</h1>
                  <h4 style={pStyle}>Send Nicole a birthday
card or email with a
personal touch</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>

            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
             <Link to="/events" state={{ eventName: "Nicole have birthday" }}>
                <div className="image-container" style={imageContainerStyle}>
                  <img src={notforget} alt="Project Six" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>Do not forget</h1>
                  <h4 style={pStyle}>Add a reminder to your
Calendar and make sure
you don’t miss it</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>

            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to="/project/7">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={team} alt="Project Seven" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>Team gathering</h1>
                  <h4 style={pStyle}>Organize a meeting
where everyone could
gather to extend their
birthday wishes</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>

            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to="https://wa.me/545287587?text=המון+מזל+טוב+ליום+הולדת+אתה+יכול+להישאר+בבית+היום+לחגוג+את+היום+הולדת+שלך+בכיף+">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={off} alt="Project Eight" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>Take a day off</h1>
                  <h4 style={pStyle}>Give Nicole the
opportunity to celebrate
her birthday at home.</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>

            <div
              className="project-card"
              style={projectCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to="https://www.xtra.co.il/category/attractions">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={shef} alt="Project Nine" style={imgStyle} />
                </div>
                <div className="project-details" style={projectDetailsTextStyle}>
                  <h1 style={h3Style}>Let’s make it special</h1>
                  <h4 style={pStyle}>Bring in a massage
therapist, a chef or
Personal Trainer and
make it a special day for

Nicole</h4>
                </div>
              </Link>
              <div className="dropdown profile-action" style={{border: 'none'}}>
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{border: 'none', backgroundColor: 'transparent'}}
                >
                  <img
                    src={remind}
                    alt="תמונה"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%', // עיגול כדי ליצור תמונה עגולה
                    }}
                  />
                </button>
                
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in3Days")}
                  >
                    Postpone for 3 days
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleOption("in1Week")}
                  >
Postpone for a week
                  </button>
                  <button
                    className="dropdown-item"
                    // onClick={() => handleOption("schedule1")}
                  >
Set a time 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
