import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import JohnStatistics from "../../../views/pages/MainPages/Apps/contacts/JohnStatistics";
import publicR from "../../../imgs/publicR.png"
import family from "../../../imgs/family.png"
import showAppreciation from "../../../imgs/showAppreciation.png"
import additionalTime from "../../../imgs/additionalTime.png"
import personalTime from "../../../imgs/personalTime.png"
import thankyou from "../../../imgs/thankyou.png"
// import offgift from "../../../imgs/offgift.png" //add off gift in 705
import on from "../../../imgs/on.png"
import rescheduling from "../../../imgs/rescheduling.png"

const NotificationsModals = ({
  employeeWorkRoutineModal,
  closeEmployeeWorkRoutineModal,
  homeMeetingModal,
  openModalYes,
  openModalNo,
  modalOpenYes,
  modalOpenNo,
  closeModalYes,
  closeModalNo,
  closeModal,
  modalContentYes,
  modalContentNo,
  modalContent
}) => {
    const ulStyle = {
        margin: 0,
        padding: 0,
        textAlign: "center", // Center align the text
        listStyleType: "none", // Remove bullet points
      };
      const listItemStyle = {
        listStyleType: "none",
      };
  const smallprojectCardStyle1 = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "25px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#D7DBDD",
    margin: "10px",
  };
  const projectDetailsTextStyle = {
    padding: "10px",
  };
  const johnImgStyle = {
    width: "80px",
    height: "80px",
  };
  const johnAnswer = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "40px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "18px",
    background: "#fff",
    margin: "10px",
    height: "280px",
    backgroundColor: "#F0F0F0",
  };
  const h3Style = {
    fontSize: "18px",
    margin: "10px 0",
  };
  const smallProjectCardStyle = {
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
    height: "300px",
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

  return (
    <>
       {/* employee work routine modal*/}
      {employeeWorkRoutineModal && (
        <Modal
          onCancel={closeEmployeeWorkRoutineModal}
          open={employeeWorkRoutineModal}
          footer={null}
        >
          <ul style={ulStyle}>
            <li style={listItemStyle}>
              <h2 style={{ width: "100%" }}>
                John's work routine has significantly changed!
              </h2>
              <br />
              <h5>
                {" "}
                This month, john worked 140% of his regular hours, arriving at
                the office at his usual <br />
                time but departing much later than usual please review john's
                work statistics below.{" "}
              </h5>
              <br />

              <div>
                <JohnStatistics />
              </div>

              <br />
              <br />
              <br />

              <h5>Do you know the reason for this change ?</h5>

              <br />
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div
                onClick={openModalYes}
                className="project-card"
                style={smallprojectCardStyle1}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h1>YES</h1>
                  <h4>
                    This is due to <br /> work <br /> assignments
                  </h4>
                </div>
              </div>
              <div
                onClick={openModalNo}
                className="project-card"
                style={smallprojectCardStyle1}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h1>NO</h1>
                  <h4>
                    This is new to <br /> me
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
         {/* ------- John answer Yes---------- */}
        {modalOpenYes && modalContentYes && (
          <Modal onCancel={closeModalYes} open={modalOpenYes} footer={null}>
            <ul style={ulStyle}>
              <li style={listItemStyle}>
                <h4
                  style={{
                    margin: "0",
                    padding: "0",
                    lineHeight: "1.6" /* Adjust line height for spacing */,
                    marginBottom: "1rem" /* Add space below the heading */,
                  }}
                >
                  John is currently working on a big project, and it’s crucial
                  to show our appreciation for the extra time he's putting in.
                  Talk to John to acknowledge his efforts and let him know that
                  you are aware of the change. Additionally, you can consider
                  the following actions:
                </h4>
                <br />
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3 style={{ fontSize: "22px", margin: "10px 0" }}>Show Appreciation</h3>
                    <h5>
                      talk to John and make sure he understands that you see his
                      work and that to appreciate it.
                    </h5>
                    <img
                      src={showAppreciation}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>Additional time:</h3>
                    <h4 style={h3Style}>
                      Offer John vacation leave or compensatory time off for the
                      extra time he has worked.
                    </h4>
                    <img
                      src={additionalTime}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>famliy :</h3>
                    <h4 style={h3Style}>
                      Send a small gesture to John's family to show
                      appreciation.
                    </h4>
                    <img
                      src={family}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>personal time planning:</h3>
                    <h4 style={h3Style}>
                      talk to John and make sure he has enough personal personal
                      time during to project.
                    </h4>
                    <img
                      src={personalTime}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>public recognition:</h3>
                    <h4 style={h3Style}>
                      acknowledge John's hard work in a team meeting or through
                      a wide email.
                    </h4>
                    <img
                      src={publicR}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h2>bonus or gift:</h2>
                    <h3 style={h3Style}>
                      provide a financial bonus or a thoughtful gift card as a
                      sign of appreciation.
                    </h3>
                    <img
                      src={thankyou}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {/* --------John answer no ---------- */}
        {modalOpenNo && modalContentNo && (
          <Modal onCancel={closeModalNo} open={modalOpenNo} footer={null}>
            <ul style={ulStyle}>
              <li style={listItemStyle}>
                <h4
                  style={{
                    margin: "0",
                    padding: "0",
                    lineHeight: "1.6" /* Adjust line height for spacing */,
                    marginBottom: "1rem" /* Add space below the heading */,
                  }}
                >
                  {" "}
                  First, it's important to understand why John is working so
                  many hours and whether it's due to his regular assignments, a
                  new temporary project or other personal issue. and it's
                  crucial to show our appreciation for the extra time he's
                  putting in. Talk to John to acknowledge his efforts and let
                  him know that you are aware of the change. Additionally, you
                  can consider the following actions
                </h4>
                <br />
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3 style={{ fontSize: "22px", margin: "10px 0" }}>Show Appreciation</h3>
                    <h5>
                      talk to John and make sure he understands that you see his
                      work and that to appreciate it.
                    </h5>
                    <img
                      src={showAppreciation}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>Additional time:</h3>
                    <h4 style={h3Style}>
                      Offer John vacation leave or compensatory time off for the
                      extra time he has worked.
                    </h4>
                    <img
                      src={additionalTime}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>famliy :</h3>
                    <h4 style={h3Style}>
                      Send a small gesture to John's family to show
                      appreciation.
                    </h4>
                    <img
                      src={family}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>personal time planning:</h3>
                    <h4 style={h3Style}>
                      talk to John and make sure he has enough personal personal
                      time during to project.
                    </h4>
                    <img
                      src={personalTime}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>public recognition:</h3>
                    <h4 style={h3Style}>
                      acknowledge John's hard work in a team meeting or through
                      a wide email.
                    </h4>
                    <img
                      src={publicR}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h2>bonus or gift:</h2>
                    <h3 style={h3Style}>
                      provide a financial bonus or a thoughtful gift card as a
                      sign of appreciation.
                    </h3>
                    <img
                      src={thankyou}
                      alt="Project Seven"
                      style={johnImgStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
          {/*home meeting modal */}
         {homeMeetingModal && modalContent && (
        <Modal onCancel={closeModal} open={homeMeetingModal} footer={null}>
          <ul style={ulStyle}>
            <li style={listItemStyle}>
              <h2 style={{ width: "100%" }}>
                Nicole is home and she has an appointment with you
              </h2>
              <br />
              <h5>
                {" "}
                On Thursday, June 20, 2024, at 16:00, Nicole scheduled a meeting
                with Emma Carter regarding "Upgrading Security Systems." This
                time overlaps with Emma’s pre designated important personal
                time.{" "}
              </h5>
              <br />
              <Link to="#">
                <button onLoad={""}>see the meeting</button>
              </Link>
              <br />
              <br />
              <h6>
                Balancing work and personal life is vital for employee
                well-being and commitment. This situation is an opportunity to
                show Emma that you respect her personal time. Just by discussing
                this with her, you are already making a difference
              </h6>
              <br />

              <h4>Here are some things you can do to fix it</h4>
            </li>
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div
              className="project-card"
              style={smallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Link to="/project/7">
                <div className="image-container" style={imageContainerStyle}>
                  <img
                    src={rescheduling}
                    alt="Project Seven"
                    style={imgStyle}
                  />
                </div>
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h3 style={h3Style}>
                    Reschedule: Ask the organizer to change the meeting time and
                    inform Emma
                  </h3>
                </div>
              </Link>
            </div>

            <div
              className="project-card"
              style={smallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Link to="/project/7">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={on} alt="Project Seven" style={imgStyle} />
                </div>
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h3 style={h3Style}>
                    Consult Emma: Check if Emma can attend despite the conflict
                  </h3>
                </div>
              </Link>
            </div>

            <div
              className="project-card"
              style={smallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Link to="/project/7">
                <div className="image-container" style={imageContainerStyle}>
                  <img  alt="Project Seven" style={imgStyle} />
                </div>
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h3 style={h3Style}>
                    Explain Necessity: Inform Emma that the meeting is critical
                    and offer an alternative early leave if needed
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotificationsModals;
