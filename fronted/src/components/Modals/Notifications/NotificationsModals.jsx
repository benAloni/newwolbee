import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import JohnStatistics from "../../../views/pages/MainPages/Apps/contacts/JohnStatistics";
import publicR from "../../../imgs/publicR.png";
import family from "../../../imgs/family.png";
import showAppreciation from "../../../imgs/showAppreciation.png";
import additionalTime from "../../../imgs/additionalTime.png";
import personalTime from "../../../imgs/personalTime.png";
import thankyou from "../../../imgs/thankyou.png";
import arrows from "../../../imgs/arrows.png";
import on from "../../../imgs/on.png";
import rescheduling from "../../../imgs/rescheduling.png";
import employee2 from "../../../imgs/avatar_5.JPG";
import employee3 from "../../../imgs/avatar_6.JPG";
import tom from "../../../imgs/avatar_2.JPG";
import album from "../../../imgs/album.png";
import sweet from "../../../imgs/sweet.png";
import travelPillow from "../../../imgs/travelPillow.png";
import rating from "../../../imgs/rating.png";
import coffeeCup from "../../../imgs/coffeeCup.png";
import invitationCard from "../../../imgs/invitationcard.png";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployee } from "../../../services";

const NotificationsModals = ({
  employeeWorkRoutineModal,
  closeEmployeeWorkRoutineModal,
  homeMeetingModal,
  soccerGameModal,
  vacationModal,
  employeeId,
  openModalYes,
  openModalNo,
  modalOpenYes,
  modalOpenNo,
  closeModalYes,
  closeModalNo,
  closeModal,
  closeVacationModal,
  modalContentYes,
  modalContentNo,
  modalContent,
  closeSoccerGameModal,
}) => {
  const { data: employee } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => fetchEmployee(employeeId),
    // enabled:  (employeeId >= 22 && employeeId <= 88)  ||  employeeId === null,
  });

  const ulStyle = {
    margin: 0,
    padding: 0,
    textAlign: "center",
    listStyleType: "none",
  };
  const listItemStyle = {
    listStyleType: "none",
  };
  const smallProjectCardStyle1 = {
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
  const h5Style = {
    fontSize: "14px",
    margin: "4px 0",
  };
  const verySmallProjectCardStyle = {
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
    height: "180px",
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
                style={smallProjectCardStyle1}
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
                style={smallProjectCardStyle1}
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
                John is currently working on a big project, and it’s crucial to
                show our appreciation for the extra time he's putting in. Talk
                to John to acknowledge his efforts and let him know that you are
                aware of the change. Additionally, you can consider the
                following actions:
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
                  <h3 style={{ fontSize: "22px", margin: "10px 0" }}>
                    Show Appreciation
                  </h3>
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
                    Send a small gesture to John's family to show appreciation.
                  </h4>
                  <img src={family} alt="Project Seven" style={johnImgStyle} />
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
                    acknowledge John's hard work in a team meeting or through a
                    wide email.
                  </h4>
                  <img src={publicR} alt="Project Seven" style={johnImgStyle} />
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
                First, it's important to understand why John is working so many
                hours and whether it's due to his regular assignments, a new
                temporary project or other personal issue. and it's crucial to
                show our appreciation for the extra time he's putting in. Talk
                to John to acknowledge his efforts and let him know that you are
                aware of the change. Additionally, you can consider the
                following actions
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
                  <h3 style={{ fontSize: "22px", margin: "10px 0" }}>
                    Show Appreciation
                  </h3>
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
                    Send a small gesture to John's family to show appreciation.
                  </h4>
                  <img src={family} alt="Project Seven" style={johnImgStyle} />
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
                    acknowledge John's hard work in a team meeting or through a
                    wide email.
                  </h4>
                  <img src={publicR} alt="Project Seven" style={johnImgStyle} />
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
                  <img src={arrows} alt="Project Seven" style={imgStyle} />
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
      {/* Soccer game modal}  */}
      {soccerGameModal && (
        <Modal
          onCancel={closeSoccerGameModal}
          open={soccerGameModal}
          footer={null}
        >
          <ul style={ulStyle}>
            <li style={listItemStyle}>
              <h2 style={{ width: "100%" }}>Maccabi Tel-Aviv soccer game </h2>
              <br />
              <h5>
                {" "}
                On Sunday, July 07, 2024, at 20:00, There's a Maccabi Tel-Aviv
                soccer game. Maybe we can arrange a meeting for all the team
                fans to watch the game together?
              </h5>
              <br />
              <br />
              <br />

              <h4>Here are the Maccabi Tel-Aviv fans</h4>
              <br></br>
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              height: "350px",
              overflow: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "20px",
                margin: "20px 0",
              }}
            >
              <div className="image-container" style={imageContainerStyle}>
                <img src={tom} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Tom</h3>
              </div>

              <div className="image-container" style={imageContainerStyle}>
                <img src={employee2} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Brad</h3>
              </div>

              <div className="image-container" style={imageContainerStyle}>
                <img src={employee3} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>John</h3>
              </div>
            </div>

            <div
              className="project-card"
              style={verySmallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4>Flexible Hours:</h4>
              {/* <div className="image-container" style={imageContainerStyle}>
                <img src={employee4} alt="Project Seven" style={imgStyle} />
              </div> */}
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>
                  Consider allowing them to leave a bit early on game day
                </h3>
              </div>
            </div>

            <div
              className="project-card"
              style={verySmallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4>Team Viewing:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>
                  Organize a small viewing event at the office
                </h3>
              </div>
            </div>

            <div
              className="project-card"
              style={verySmallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4>Good Luck Note:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>
                  Leave a note wishing them and their team good luck
                </h3>
              </div>
            </div>
            <div
              className="project-card"
              style={verySmallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4>Snacks and a drink:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>Build together with John a</h3>
              </div>
            </div>
            <div
              className="project-card"
              style={verySmallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4>Office Decorations: </h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>
                  Decorate the office with their team's colors or flags to
                  create a festive atmosphere. But, make sure there are no fans
                  of the opposite team
                </h3>
              </div>
            </div>
            <div
              className="project-card"
              style={verySmallProjectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4>Social Media Spotlight:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>
                  Feature their enthusiasm on the company's social media
                  channels with a spotlight post or story
                </h3>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {/* {vacation modal}  */}
      {vacationModal && (
        <Modal onCancel={closeVacationModal} open={vacationModal} footer={null}>
          <ul style={ulStyle}>
            <li style={listItemStyle}>
              <h4
                style={{
                  margin: "0",
                  padding: "0",
                  lineHeight: "1.6",
                  marginBottom: "1rem",
                }}
              >
                <h3>{employee?.fullName}'s Trip: Recharge and Refresh!</h3>
                John will be heading to Rome for an 8-day vacation in two days.
                Let's ensure he relaxes and enjoys his time off by reassuring
                him that everything at work is in good hands. Here are some ways
                to help him feel confident leaving work behind <br />
                <br />
                vacations are vital for employeesNotifications, offering a break
                to recharge and prevent burnout. They boost morale, increase
                productivity, and bring a fresh perspective. Encouraging time
                off supports work-life balance and leads to a more engaged and
                motivated team
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
                  <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>
                    Have a Great vacation:
                  </h4>
                  <h5>
                    Send John a quick message wishing him a fantastic vacation
                  </h5>
                  <br />
                  <img
                    src={invitationCard}
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
                  <h3
                    style={{
                      fontSize: "25px",
                      marginBottom: "28px",
                      marginTop: "10px",
                    }}
                  >
                    Airport Treats:
                  </h3>
                  <h5 style={{ marginBottom: "18px" }}>
                    Send John a voucher to use while he's waiting for his flight
                  </h5>
                  <img
                    src={coffeeCup}
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
                  <h3
                    style={{
                      fontSize: "25px",
                      marginBottom: "26px",
                      marginTop: "10px",
                    }}
                  >
                    Top Trip Tips:
                  </h3>
                  <h5 style={{ marginBottom: "21px" }}>
                    Give John some fantastic recommendations for his trip
                  </h5>
                  <img src={rating} alt="Project Seven" style={johnImgStyle} />
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
                  <h3
                    style={{
                      fontSize: "25px",
                      marginBottom: "26px",
                      marginTop: "10px",
                    }}
                  >
                    Travel Kit:
                  </h3>
                  <h5 style={{ marginBottom: "38px" }}>
                    Prepare a travel kit for John to use on his trip
                  </h5>
                  <img
                    src={travelPillow}
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
                  <h3
                    style={{
                      fontSize: "25px",
                      marginBottom: "26px",
                      marginTop: "10px",
                    }}
                  >
                    Warm Welcome:
                  </h3>
                  <h5 style={{ marginBottom: "21px" }}>
                    Plan a warm welcome for John when he arrives to his
                    destination
                  </h5>
                  <img src={sweet} alt="Project Seven" style={johnImgStyle} />
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
                  <h2
                    style={{
                      fontSize: "25px",
                      marginBottom: "26px",
                      marginTop: "10px",
                    }}
                  >
                    vacation Album:
                  </h2>
                  <h5 style={{ marginBottom: "21px" }}>
                    Help John putting together his vacation album when he
                    returns
                  </h5>
                  <img src={album} alt="Project Seven" style={johnImgStyle} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotificationsModals;
