import React from 'react'
import { Modal } from 'antd';
import email from "../../../../../../../imgs/email.png";
import { differenceInDays } from 'date-fns'; // Import date-fns for easier date calculations


export default function ShowHolidaysNotifications({ modalOpen, modalContent, closeModal }) {

  const ulStyle = {
    margin: 0,
    padding: 0,
    textAlign: "center", // Center align the text
    listStyleType: "none", // Remove bullet points
  };

  const listItemStyle = {
    listStyleType: "none",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "50%",
  };

  
  const h3Style = {
    fontSize: "18px",
    margin: "10px 0",
  };

  const projectDetailsTextStyle = {
    padding: "10px",
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

  const calculateTimeUntilEvent = (eventDate) => {
    const currentDate = new Date();
    const daysDifference = differenceInDays(new Date(eventDate), currentDate);
if (daysDifference <= 1) {
  return 'tomorrow';
} else if (daysDifference <= 7) {
      return 'a week away! ';
    }else if (daysDifference <= 14) {
      return 'a two weeks away! ';
    } else if (daysDifference <= 30) {
      return 'a month away! ';
    } else {
      return `${daysDifference} days away! `;
    }
  };

  return (

    <Modal
    visible={modalOpen}
    onCancel={closeModal}
    footer={null}
  > 
        {modalContent ? (
        <>
           <ul style={ulStyle}>
            <li style={listItemStyle}>
              <h2 style={{ width: "100%" }}>We are celebrating!</h2>
              <br />
              <div>
              <h5>
          The annual {modalContent.fullName} celebration is just {calculateTimeUntilEvent(modalContent.date)}<br />
          keep in mind that some of our employees have special food
preferences. <br /> This is a wonderful opportunity to show your appreciation
by making sure they have their favorite foods available.          
</h5>
        </div>
              <br />
              <h5>You have:</h5>
              <div>
            <h4>employees with gluten allergy 2</h4>
            <h4>employees are vegetarian 8</h4>
            <h4>employees are vegan 4</h4>
          </div>
              <br />
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                href={`mailto:organizingteam@example.com?subject=Fourth%20of%20July%20Celebration&body=${encodeURIComponent(
                  `I hope this email finds you well. As we prepare for the upcoming Fourth of July celebration, I would like to ensure that we accommodate the special dietary needs of several of my team members. Here are the specific requirements:\n\n` +
                    `1. Gluten and Egg Allergy: One team member is allergic to both gluten and eggs.\n` +
                    `2. Vegetarian: Two team members are vegetarians.\n` +
                    `3. Vegan: One team member follows a vegan diet.\n\n` +
                    `I would appreciate it if the catering team could make the necessary arrangements to provide suitable meal options for these individuals. Ensuring everyone has appropriate food options will help make the event enjoyable for all attendees.\n\n` +
                    `If the catering team needs any additional information regarding specific dietary restrictions or preferences, please feel free to reach out to me. I am happy to provide any details to ensure the accommodations are accurate and satisfactory.\n\n` +
                    `Thank you in advance for your attention to this matter. Please let me know if you need any further details or assistance.\n\n` +
                    `Best regards,`
                )}`}
              >
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
                      Click here to email the organizing team.
                    </h3>
                  </div>
                </div>
              </a>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                href={`mailto:organizingteam@example.com?subject=Fourth%20of%20July%20Celebration&body=${encodeURIComponent(
                  `I hope this email finds you well. As we prepare for the upcoming Fourth of July celebration, I would like to ensure that we accommodate the special dietary needs of several of my team members. Here are the specific requirements:\n\n` +
                    `1. Gluten and Egg Allergy: One team member is allergic to both gluten and eggs.\n` +
                    `2. Vegetarian: Two team members are vegetarians.\n` +
                    `3. Vegan: One team member follows a vegan diet.\n\n` +
                    `I would appreciate it if the catering team could make the necessary arrangements to provide suitable meal options for these individuals. Ensuring everyone has appropriate food options will help make the event enjoyable for all attendees.\n\n` +
                    `If the catering team needs any additional information regarding specific dietary restrictions or preferences, please feel free to reach out to me. I am happy to provide any details to ensure the accommodations are accurate and satisfactory.\n\n` +
                    `Thank you in advance for your attention to this matter. Please let me know if you need any further details or assistance.\n\n` +
                    `Best regards,`
                )}`}
              >
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
                    Click here to email all employees.
                    </h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
                  </>

      ) : (
        <p>Loading...</p>
      )}
              </Modal>
  )
}
