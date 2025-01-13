import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker"; // ייבוא החבילה של DatePicker
import Modal from "react-modal";
import { TiPin } from "react-icons/ti";
import { Link } from "react-router-dom";

//imgs
import voucher from "../../../../../imgs/voucher.png";
import dinner from "../../../../../imgs/dinner.png";
import virtual from "../../../../../imgs/virtual.png";
import making from "../../../../../imgs/makingpizza.png";   
import clothes from "../../../../../imgs/clothes.png";
import community from "../../../../../imgs/community.png";
import email from "../../../../../imgs/email.png";
import place from "../../../../../imgs/place.png";
import vs from "../../../../../imgs/vs.png";
import pizza from "../../../../../imgs/pizza.png";
import remind from "../../../../../imgs/remind.png";
import recognition from "../../../../../imgs/Recognition.png";
import trivia from "../../../../../imgs/trivia.png";
import shere from "../../../../../imgs/shere.png";




export default function DemoPizzaEvent() {
    const location = useLocation();

    //useState
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const openModal = (e) => {
        if (!e || !e.target.closest(".dropdown")) {
          setModalIsOpen(true);
        }
      }
      ;
      const closeModal = () => {
        setModalIsOpen(false);
      };

      const handleOption = (option) => {
        if (option === "in3Days" || option === "in1Week") {
          // טיפול באופציות הראשונות כאן (לדוגמה: שליחת בקשה לשרת לדחיית הפרויקט)
        } else if (option === "schedule" || "schedule1") {
          setShowDatePicker(true);
        }
      };

      const handleDatePickerClick = (e) => {
        e.stopPropagation(); // Stop the click event from propagating
      };


      useEffect(() => {
        if (location.state?.fromContact) {
          setModalIsOpen(true);
        }
      }, [location]);
//css
const pinIconSize = 20;

const projectCardStyle = {
    width: "300px",
    height: "300px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#fff",
    margin: "10px", // Small margin between cards
  };

  const imageContainerStyle = {
    width: "100px",
    height: "100px",
    margin: "0 auto 10px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #ddd",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "50%",
  };

  const projectDetailsTextStyle = {
    padding: "10px",
  };

  const h3Style = {
    fontSize: "18px",
    margin: "10px 0",
  };

  const pStyle = {
    fontSize: "14px",
    color: "#555",
    margin: "5px 0",
  };

  const datePickerContainerStyle = {
    position: "absolute",
    top: "100px",
    left: "100px",
    width: "30%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  };

  const rowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
  };

  const ulStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const liStyle = {
    display: "flex",
    alignItems: "flex-start",
    textAlign: "left",
    marginBottom: "10px",
  };

  const smallprojectCardStyle = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#fff",
    margin: "10px",
  };
  return (
    <div>
          {/* _________________יום הפיצה הבין לאומי כללי __________________ */}

          <div
              className="project-card"
              style={{ ...projectCardStyle, position: "relative" }} // Ensure relative positioning
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={openModal}
            >
              {/* Small Banner */}
              <div
                style={{
                  position: "absolute",
                  top: "-0.5rem", // Position above the card
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "red",
                  color: "white",
                  textAlign: "center",
                  padding: "0.2rem 0.5rem",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  zIndex: 1,
                  fontSize: "0.8rem", // Smaller font size
                  whiteSpace: "nowrap", // Prevent text wrapping
                  marginTop: "5px",
                }}
              >
                Demo Test
              </div>

              <div className="image-container" style={imageContainerStyle}>
                <img src={pizza} alt="Project One" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h1 style={h3Style}>International Pizza Day</h1>
                <h4 style={pStyle}>10.6.2024</h4>
              </div>
              <div
                className="dropdown profile-action"
                style={{ border: "none" }}
              >
                <button
                  className="action-icon dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <img
                    src={remind}
                    alt="Reminder"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%", // Circular image
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
                    onClick={() => handleOption("schedule")}
                  >
                    Set a time
                  </button>
                </div>
              </div>
              {showDatePicker && (
                <div
                  style={datePickerContainerStyle}
                  onClick={handleDatePickerClick}
                >
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inline
                    calendarClassName="custom-calendar"
                  />
                  <button onClick={() => setShowDatePicker(false)}>
                    Close
                  </button>
                </div>
              )}
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Pizza Day Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  top: "50%",
                  left: "60%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  padding: "20px",
                  borderRadius: "8px",
                  maxWidth: "1000px",
                  width: "100%",
                  height: "500px",
                },
              }}
            >

              <br />
              <div style={rowStyle}>
                <h2>International Pizza Day</h2>
                <p>
                  International Pizza day is coming next month and it is a
                  perfect opportunity to give your team a slice of appreciation
                </p>
                <br />
                <h4>Useful information</h4>
                <ul style={ulStyle}>
                  <li style={liStyle}>
                    <TiPin size={pinIconSize} /> Celebrated on February 9th
                  </li>
                  <li style={liStyle}>
                    <TiPin size={pinIconSize} /> The largest pizza ever measured
                    was over 122 feet
                  </li>
                  <li style={liStyle}>
                    <TiPin size={pinIconSize} /> Americans consume a staggering
                    350 slices of pizza per second
                  </li>
                  <li style={liStyle}>
                    <TiPin size={pinIconSize} /> The classic Pizza Margherita is
                    said to have been created in 1889 by Neapolitan pizzaiolo
                    Raffaele Esposito. It was named after Queen&nbsp;Margherita
                    of Italy.
                  </li>
                  <li style={liStyle}>
                    <TiPin size={pinIconSize} /> The most expensive pizza was
                    sold for €8,300 (approximately $12,000USD) in 2012.
                  </li>
                  <li style={liStyle}>
                    <TiPin size={pinIconSize} /> Authentic Neapolitan pizza, as
                    defined by the VPN (Associazione Verace Pizza Napoletana)
                    must meet certain criteria including
                  </li>
                </ul>
                {/* ____1_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={voucher} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Buy a pizza voucher for each team member
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ____2_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={dinner} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Organize a pizza lunch or dinner for your team
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ____3_____ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={virtual} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Organize a Virtual Pizza Making Class
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______4_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={making} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Organize a a Pizza Making Class on site
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______5_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img
                        src={recognition}
                        alt="Project Seven"
                        style={imgStyle}
                      />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Recognition and Appreciation of individuals in your team
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______6_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={clothes} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>Pizza-themed gifts or swag items</h3>
                    </div>
                  </Link>
                </div>

                {/* ______7_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img
                        src={community}
                        alt="Project Seven"
                        style={imgStyle}
                      />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        send pizza for charity or community organization
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______8_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={trivia} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Arrange a Pizza Trivia Quiz with pizza related rewords
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______9_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={email} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Send informative email to the team
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______10_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={shere} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Recipe Exchange: ask team members to share pizza recipes
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______11_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={place} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Ask team members to recommend best places to eat pizza
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* ______12_______ */}
                <div
                  className="project-card"
                  style={smallprojectCardStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Link to="#">
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={vs} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Pizza Making Contest: Organize a competition between
                        team members
                      </h3>
                    </div>
                  </Link>
                </div>
              </div>
              {/* ||||||||||||||||||||||||||||||||||||||||||||||||||||||| */}
              <button
                onClick={closeModal}
                style={{
                  width: "150px",
                  height: "40px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#FEB723",

                  fontSize: "15px",
                  transition:
                    "color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                  fontSize: "15px",
                }}
              >
                Close
              </button>
            </Modal>
    </div>
  )
}
