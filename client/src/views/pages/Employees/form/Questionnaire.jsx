import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./Questionnaire.css";



const questions = [
  "Full Name:",
  "Employee ID:",
  "Date of Birth (DD/MM/YYYY):",
  "Address:",
  "Marital Status:",
  "Number of Children:",
  "Employee of Manager ID:",
  "Role/Position:",
  "Team/Department:",
  "Start Date at the Company (DD/MM/YYYY):",
  "Work Anniversary Date (DD/MM/YYYY):",
  "Favorite Singers or Music Artists:",
  "Favorite Food & Drinks:",
  "Favorite Restaurants:",
  "Hobbies & Interests:",
  "Latest Activities (List recent activities and their dates):",
  "Top Insights About the Employee:",
  "Interesting Facts About the Employee:",
  "Closest Personal Event (e.g., birthday, wedding, etc.):",
  "Preferred Way to Celebrate This Event:",
  "Preferred Type of Gift (if applicable):",
  "Planned Vacation Start Date (DD/MM/YYYY):",
  "Planned Vacation End Date (DD/MM/YYYY):",
  "Destination(s):",
  "Purpose of the Trip:",
  "Travel Companions (if applicable):",
  "What Kind of Support Do You Expect From Your Manager?",
  "How Do You Prefer to Receive Recognition for Your Work?",
  "How Do You Prefer to Unwind During Work?",
  "What Motivates You the Most at Work?",
  "Any Special Requests or Preferences?",
  "Is There Anything Else You Would Like to Share?"
];


const Questionnaire = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("Employee Responses:", answers);
    alert("Thank you for your feedback!");
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="page1" >
      <div className="page">
        <h1 className="title">Employee Questionnaire</h1>
        <div className="content">
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <p className="question-text">{question}</p>
              {index < 3 ? (
                <input
                  type="text"
                  value={answers[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="input-field"
                  placeholder="Your answer..."
                />
              ) : (
                <textarea
                  value={answers[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="textarea-field"
                  placeholder="Your answer..."
                  rows={3}
                />
              )}
            </div>
          ))}
          <div className="submit-container">
            <button className="submit-button" onClick={handleSubmit}>
              Submit Answers
            </button>
          </div>
        </div>
      </div>
      
      {/* Sign Out Button */}
      <button className="signout-button" onClick={handleSignOut}>
        <FiLogOut className="signout-icon" />
        Sign Out
      </button>

     
    </div>
  );
};

export default Questionnaire;
