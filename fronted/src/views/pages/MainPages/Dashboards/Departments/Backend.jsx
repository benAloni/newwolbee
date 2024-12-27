import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
} from "recharts";
import lisa from "../../../../../imgs/avatar_1.JPG";
import tom from "../../../../../imgs/avatar_2.JPG";
import david from "../../../../../imgs/avatar_3.JPG";
import nicole from "../../../../../imgs/avatar_4.JPG";
import brad from "../../../../../imgs/avatar_5.JPG";
import john from "../../../../../imgs/avatar_6.JPG";
import mark from "../../../../../imgs/avatar_7.JPG";
import josh from "../../../../../imgs/avatar_8.JPG";
import justin from "../../../../../imgs/avatar_9.JPG";
import selena from "../../../../../imgs/avatar_10.JPG";
import emma from "../../../../../imgs/avatar_11.JPG";
import sofia from "../../../../../imgs/avatar_12.JPG";
import ProgressBar from "../AdminDashboard/ProgressBar";
import  LisaWeb  from "../AdminDashboard/Lisa";
export default function HrStatistics() {
  const [values, setValues] = useState([]);
  const [user, setUser] = useState("");
  const [modalOpenLisa, setModalOpenLisa] = useState(false);
  const [modalContentLisa, setModalContentLisa] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/getTeams`);
        setValues(response.data);
      } catch (error) {
        console.error("Error fetching team :", error);
      }
    };
    fetchTeams();

    const role = localStorage.getItem("userRole");
    setUser(role);
  }, []);
  const openModalLisa = (notification) => {
    setModalContentLisa(notification);
    setModalOpenLisa(true);
  };

  const closeModalLisa = () => {
    setModalOpenLisa(false);
  };
  
  const linechartdata = [
    { y: "Jan", lisa: 4, tom: 10, david: 20, nicole: 15 },
    { y: "Feb", lisa: 5, tom: 7, david: 24, nicole: 13 },
    { y: "March", lisa: 5, tom: 8, david: 22, nicole: 16 },
    { y: "April", lisa: 6, tom: 8, david: 21, nicole: 14 },
    { y: "May", lisa: 5, tom: 10, david: 20, nicole: 16 },
    { y: "June", lisa: 6, tom: 12, david: 21, nicole: 18 },
    { y: "July", lisa: 7, tom: 15, david: 26, nicole: 19 },
  ];



  const PieChartWithPercentage = ({ percentage }) => {
    const data = [
      { name: "Completed", value: percentage },
      { name: "Remaining", value: 100 - percentage },
    ];
    const COLORS = ["#ecb132", "#e4c247"];


    
    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="34px"
            fontWeight="bold"
          >
            {`${percentage}%`}
          </text>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const TurnoverLineChart = ({ data }) => {
    return (
      <div>
        <h5 className="card-title text-warning text-center">Turnover Rate</h5>
        <ResponsiveContainer width="100%" height={470}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="month" />
            <YAxis /> */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="turnoverRate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const data = [
    { month: "January", turnoverRate: 5 },
    { month: "February", turnoverRate: 8 },
    { month: "March", turnoverRate: 12 },
    { month: "April", turnoverRate: 7 },
    { month: "May", turnoverRate: 10 },
    { month: "June", turnoverRate: 15 },
    { month: "July", turnoverRate: 18 },
    { month: "August", turnoverRate: 20 },
    { month: "September", turnoverRate: 25 },
    { month: "October", turnoverRate: 22 },
    { month: "November", turnoverRate: 19 },
    { month: "December", turnoverRate: 24 },
  ];

  const ColumnChart = () => {
    const data = [
      { quarter: "Q1", activity: 120 },
      { quarter: "Q2", activity: 98 },
      { quarter: "Q3", activity: 150 },
      { quarter: "Q4", activity: 130 },
      { quarter: "Q5", activity: 170 },
    ];

    return (
      <div
        style={{
          backgroundColor: "#1cd5ccec",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h5 className="card-title text-light text-center">
          Yearly Team Building Activities
        </h5>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderColor: "#333",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#333" }} />
            <Bar
              dataKey="activity"
              fill="#f0f0f0"
              label={{ position: "top", fill: "#333" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  const EmployeeSatisfactionChart = () => {
    const data = [
      { month: "January", satisfaction: 70 },
      { month: "February", satisfaction: 75 },
      { month: "March", satisfaction: 80 },
      { month: "April", satisfaction: 85 },
      { month: "May", satisfaction: 82 },
      { month: "June", satisfaction: 88 },
      { month: "July", satisfaction: 85 },
      { month: "August", satisfaction: 90 },
      { month: "September", satisfaction: 92 },
      { month: "October", satisfaction: 87 },
      { month: "November", satisfaction: 84 },
      { month: "December", satisfaction: 88 },
    ];

    const averageSatisfaction =
      data.reduce((sum, { satisfaction }) => sum + satisfaction, 0) /
      data.length;

    return (
      <div
        style={{
          background: "linear-gradient(to right, #ee9ca7, #dbb6bb)",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="satisfaction"
              stroke="#1C82AD"
              activeDot={{ r: 8 }}
              dot={{ stroke: "#1C82AD", strokeWidth: 2 }}
              label={(props) => (
                <text
                  x={props.x}
                  y={props.y - 10}
                  textAnchor="middle"
                  fill="#21a5dd"
                >
                  {props.value}
                </text>
              )}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        <h2 className="card-title text-light" style={{ marginBottom: "20px" }}>
          Average Employee Satisfaction: {averageSatisfaction.toFixed(2)}
        </h2>
      </div>
    );
  };

  const EmployeeList = () => {
    const employees = [
      { id: 1, name: "Lisa", hours: 40, image: lisa },
      {
        id: 2,
        name: "Tom",
        hours: 138,
        image: tom,
      },
      {
        id: 3,
        name: "David",
        hours: 142,
        image: david,
      },
      {
        id: 4,
        name: "Nicole",
        hours: 42,
        image: nicole,
      },
      {
        id: 5,
        name: "Brad",
        hours: 101,
        image: brad,
      },
      {
        id: 6,
        name: "John",
        hours: 101,
        image: john,
      },
    ];

    return (
      <div className="mt-4">
        <h5 className="card-title text-center text-light">
          Employees Over 100% Hours
        </h5>
        <div className="row">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="d-flex flex-row mb-3 justify-content-center"
            >
              <div className="card-body d-flex align-items-center w-100">
                <img
                  className="card-img-left"
                  src={employee.image}
                  alt={employee.name}
                  style={{ height: "50px", width: "50px", marginRight: "15px" }}
                />
                <div>
                  <h3 style={{ margin: 0 }}>{employee.name}</h3>
                  {employee.hours > 100 && (
                    <span className="badge badge-danger">Over 100% Hours</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TeamSatisfaction = () => {
    return (
      <div className="team-satisfaction" style={{height:'150px'}}>
        <h5 className="card-title text-light text-center">Team Satisfaction</h5>
        <div className="progress-bar">
          <span className=""></span>
          <h5 className="card-title text-light text-center percentage">77%</h5>

          <span className="progress" style={{ width: "85%" }}></span>
        </div>
      </div>
    );
  };

  const line = {
    container: {
      position: "relative",
      width: "100vw",
      height: "100% ",
    },
    line: {
      position: "absolute",
      left: "0",
      right: "0",
      top: "20px",
      margin: "0px 5px",
      height: "2px",
      backgroundColor: "red",
      transform: "translateY(-50%)",
    },
  };

  const styles = {
    images: {
      monthly: {
        src: "https://img.icons8.com/?size=100&id=T9DcCf4lJ6ip&format=png&color=000000",
      },
      personal: {
        src: "https://cdn1.iconfinder.com/data/icons/artist-design-2/123/Idea_Brain_business_creative_new_business_start_up-1024.png",
      },
      birthday: {
        src: "https://cdn0.iconfinder.com/data/icons/3d-hands-gestures/256/Point_left.png",
      },
      sick: {
        src: "https://img.icons8.com/?size=100&id=rvpJEBQUZDHK&format=png&color=000000",
      },
      vacation: {
        src: "https://img.icons8.com/?size=100&id=f2Yti8MWlBDa&format=png&color=000000",
      },
      growth: {
        src: "https://img.icons8.com/?size=100&id=IhMqtsZbnS3O&format=png&color=000000",
      },
      converction: {
        src: "https://cdn0.iconfinder.com/data/icons/job-seeker/256/conversation_job_seeker_employee_unemployee_work-64.png",
      },
    },
    cardImage: {
      display: "flex",
      justifyContent: "center",
    },
    imageLine: {
      background: "red",
      borderRadius: "5px ",
      width: "100px",
      height: "100px",
    },
    imageHolder: {
      padding: "8px",
      height: "70px",
      width: "460px",
      borderRadius: "50%",
      border: "1px solid white",
    },

    bgOverHours: {
      background: "linear-gradient(to top, #fdc830, #f37335)",
    },
    bgPercent: {
      background:
        "linear-gradient(90deg, hsla(44, 84%, 48%, 1) 0%, hsla(42, 92%, 65%, 1) 54%)",
    },
    bgMonthly: {
      background:
        "linear-gradient(90deg, hsla(3, 90%, 69%, 1) 1%, hsla(27, 90%, 69%, 1) 100%)",
    },
    bgPersonal: {
      background: " hsla(191, 66%, 59%, 1)",
    },
    bgBirthdays: {
      background: "hsla(88, 42%, 54%, 1)",
    },
    bgSick: {
      background:
        "linear-gradient(90deg, hsla(180, 54%, 44%, 1) 17%, hsla(319, 48%, 82%, 1) 92%)",
    },
    bgVacation: {
      height:'150px',
      background:
        "linear-gradient(90deg, hsla(251, 54%, 44%, 1) 26%, hsla(264, 44%, 46%, 1) 46%, hsla(282, 35%, 49%, 1) 63%, hsla(319, 44%, 60%, 1) 92%)",
    },
    bgSatisfaction: {
      background:
        "linear-gradient(180deg, hsla(222, 75%, 65%, 1) 59%, hsla(274, 100%, 78%, 1) 100%)",
    },
    bgTeamSatisfaction: {
      height:'150px',
      background: "linear-gradient(to left, #a8c0ff, #3f2b96)",
    },

    bgGrowth: {
      background: "hsla(0, 0%, 76%, 1)",
    },
    colors: {
      whitesmoke: { color: "whitesmoke" },
    },
  };
  const customHeight = (height) => ({
    height: `${height}px`,
  });

  return (
    <>
  <div style={{marginTop:'10px'}}>
      <div className="row">
        <div className="col-sm-12  col-md-6 col-lg-3  ">
          <div
            className="card justify-content-center  mb-3"
            style={{ ...styles.bgMonthly }}
            ma
          >
           <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body ">
                  <h5 className="card-title" style={{ color: 'black', textAlign: 'center' }}>
  <span style={{ whiteSpace: 'nowrap' }}>Monthly Team-Building</span>
  <br />
  <div style={{marginLeft: '40px'}}>
  Activities
  </div>
</h5>                    
                    <h1 style={{ color: 'black', textAlign: 'center' ,marginLeft: '50px'}}>0</h1>
                  </div>
                </div>
                <div className="col-md-4" style={{marginTop:'50px'}}>
                  <img
                    src={styles.images.monthly.src}
                    className="img-fluid rounded-start"
                    alt="..."
                    style={{height:'80px'}}
                  />
                </div>
              </div>
          </div>
          <div
            className="card justify-content-center  mb-3"
            style={{ ...styles.bgPersonal }}
          >
        <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body " style={{ ...customHeight(260) }}>
                    <h5 className="card-title" style={{ color: 'black', textAlign: 'center' }}> Personal Development plan</h5>
                    <h1 style={{ color: 'black', textAlign: 'center' }}>2/8</h1>
                  </div>
                </div>
                <div className="col-md-4" style={{marginTop:'50px'}}>
                  <img
                    src={styles.images.personal.src}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
              </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div
              className="card  mb-3"
              style={{ ...styles.bgBirthdays, ...customHeight(265) }}
            >
                  <div className="row g-0" >
                  <div className="col-md-8"  >
                    <div className="card-body" style={{width:'290px'}}>
                      <h5 className="card-title" style={{ color: 'black', textAlign: 'center' }} >Upcoming Birthdays</h5>
                      <div className="d-flex" >
  <div style={{ marginRight: '40px' }}>
    <div className="col-4">
      <img
        src={brad}
        width={50}
        alt=""
        style={{ borderRadius: '10px' }}
      />
    </div>
    
    <div>
      <h3 style={{marginLeft:'5px'}}>2/9</h3>
    </div>
    <div>
      <h2>(31)</h2>
    </div>
  </div>
  <div style={{ marginRight: '40px' }}>
    <div className="col-4">
      <img
        src={tom}
        width={50}
        alt=""
        style={{ borderRadius: '10px' }}
      />
    </div>
    <div>
      <h3 style={{marginLeft:'5px'}}>2/18</h3>
    </div>
    <div>
      <h2>(26)</h2>
    </div>
  </div>
  <div>
    <div className="col-4">
      <img
        src={lisa}
        width={50}
        alt=""
        style={{ borderRadius: '10px' }}
      />
    </div>
    <div>
      <h3 style={{marginLeft:'5px'}}>2/27</h3>
    </div>
    <div>
      <h2>(43)</h2>
    </div>
  </div>
</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-6 ">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title text-center">
                    Managerial Effectiveness
                  </h3>

                  <div className="d-flex mb-3 justify-content-center">
                    <div className="row">
                      <div className="card-body align-items-center w-100">
                        {/* lisa modal */}
                        <img
                          className="card-img-left row"
                          src={lisa}
                          onClick={openModalLisa}
                          style={{
                            height: "30px",
                            width: "30px",
                            marginTop: "40px",
                          }}
                        />
                        <div>
                          {modalOpenLisa && modalContentLisa && (
                            <Modal
                              onCancel={closeModalLisa}
                              visible={modalOpenLisa}
                              footer={null}
                              closeIcon={<span style={{ color: 'rgba(0, 0, 0, 0.85)', lineHeight: '16px', textAlign: 'center' }}>X</span>}
                            >
                              <LisaWeb lisa={lisa} />
                              
                            </Modal>
                          )}
                        </div>
                        {/* tom modal */}
                        <img
                          className="card-img-left row"
                          src={tom}
                          style={{
                            height: "30px",
                            width: "30px",
                            marginTop: "17px",
                          }}
                        />

                        {/* david modal */}
                        <img
                          className="card-img-left row"
                          src={david}
                          style={{
                            height: "30px",
                            width: "30px",
                            marginTop: "20px",
                          }}
                        />

                        {/* nicole modal */}
                        <img
                          className="card-img-left row"
                          src={nicole}
                          style={{
                            height: "30px",
                            width: "30px",
                            marginTop: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={linechartdata}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid />
                        <XAxis dataKey="y" />
                        <Line
                          type="monotone"
                          dataKey="lisa"
                          stroke="#0253cc"
                          fill="#0253cc"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                          activeDot={{ r: 7 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="tom"
                          stroke="#ff9b44"
                          fill="#0253cc"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                          activeDot={{ r: 7 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="david"
                          stroke="#DC00FF"
                          fill="#0253cc"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                          activeDot={{ r: 7 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="nicole"
                          stroke="#fc6075"
                          fill="#0253cc"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="card mb-3" style={styles.bgSick}>
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Frequent Sick Leave</h5>
                      <h5 className="card-title">2/8</h5>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={styles.images.sick.src}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-sm-12 col-md-12 col-lg-12"
              style={{ height: "100px" }}
            >
              <div className="card mb-3 " style={styles.bgVacation}>
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body d-flex">
                      <h5 className="card-title">Low Vacation Leave</h5>
                      <div>
                        <h1 className="card-title">1/8</h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={styles.images.vacation.src}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className="col-sm-12 col-md-6 col-lg-3 ">
            <div class="card " style={{ ...styles.bgSatisfaction }}>
              <div class="card-body m-2">
              <h5 className="card-title" style={{ color: 'black', textAlign: 'center' }}>Low Employees Satisfaction</h5>
                <div className="row">
                  <div className="col-4">
                    <img
                      src={lisa}
                      width={50}
                      alt=""
                      style={{borderRadius:'10px'}}
                    />
                  </div>
                  <div className="col"  >
                    <div>
                     {<ProgressBar></ProgressBar>}
                    </div>
                  </div>
                  <div className="col">
                    <h4 style={{marginLeft: "35px"}}>59</h4>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <img
                      src={tom}
                      width={50}
                      alt=""
                      style={{borderRadius:'10px'}}
                    />
                  </div>
                  <div className="col"  >
                    <div>
                     {<ProgressBar></ProgressBar>}
                    </div>
                  </div>
                  <div className="col">
                    <h4 style={{marginLeft: "35px"}}>43</h4>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <img
                      src={brad}
                      width={50}
                      alt=""
                      style={{borderRadius:'10px'}}
                    />
                  </div>
                  <div className="col"  >
                    <div>
                     {<ProgressBar></ProgressBar>}
                    </div>
                  </div>
                  <div className="col">
                    <h4 style={{marginLeft: "35px"}}>75</h4>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <img
                      src={david}
                      width={50}
                      alt=""
                      style={{borderRadius:'10px'}}
                    />
                  </div>
                  <div className="col"  >
                    <div>
                     {<ProgressBar></ProgressBar>}
                    </div>
                  </div>
                  <div className="col">
                    <h4 style={{marginLeft: "35px"}}>95</h4>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4">
                    <img
                      src={nicole}
                      width={50}
                      alt=""
                      style={{borderRadius:'10px'}}
                    />
                  </div>
                  <div className="col"  >
                    <div>
                     {<ProgressBar></ProgressBar>}
                    </div>
                  </div>
                  <div className="col">
                    <h4 style={{marginLeft: "35px"}}>45</h4>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card justify-content-center  mb-3 "
              style={{ ...styles.bgGrowth, ...customHeight(220) }}
            >
              <div className="row g-0">
                <div className="col-md-8" >
                  <div className="card-body" style={{width:'220px'}}>
                    <h5 className="card-title" style={{ color: 'black', textAlign: 'center', marginBottom:'20px'}}>Personal Growth Programs</h5>
                 
                    <h1   style={{ color: 'black', textAlign: 'center', fontSize:'40px' }}>5/8</h1>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src={styles.images.growth.src}
                    className="img-fluid rounded-start"
                    alt="..."
                    style={{marginTop:'50px'}}
                  />
                </div>
              </div>
            </div>

            {/*  */}
          </div>
      </div>

      <div className="row" style={{marginTop:'40px'}}  >
        <div className="col-4  ">
          {/* Turnover Rate */}
          <div
            className="card  justify-content-center  mb-3"
            // style={{ ...styles.bgMonthly }}
          >
            <div className="row g-0">
              <div className="col-md-12">
                <div className="card-body ">
                  <TurnoverLineChart data={data} />
                </div>
              </div>
            </div>
          </div>

          <div
            className="card justify-content-center   mb-3"
            // style={{ ...styles.bgPersonal }}
          >
            <div className="row g-0">
              <div className="col-md-12 ">
                <div className="card-body ">
                  <ColumnChart />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-8" >
          <div className="col">
            <div
              class="card"
              style={{ ...styles.bgTeamSatisfaction,  ...customHeight(200) }}
            >
              <div class="card-body text-center">
                <TeamSatisfaction />
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col">
                <div
                  className="card justify-content-center  mb-3"
                  // style={{ ...styles.bgPersonal }}
                >
                  <div className="row g-0">
                    <div className="col-md-12">
                      <div className="card-body ">
                        <EmployeeSatisfactionChart />
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div
                    className="card justify-content-center text-center  mb-3"
                    style={{ ...styles.bgPersonal }}
                  >
                    <div className="row g-0">
                      <div className="col-md-8">
                        <div
                          className="card-body "
                          style={{ ...customHeight(250) }}
                        >
                          <h1>4/8</h1>
                          <h5 className="card-title"> Conversations 1:1</h5>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img
                          src={styles.images.converction.src}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div
                  className="card justify-content-center  mb-3"
                  style={{ ...styles.bgOverHours }}
                >
                  <div className="row g-0">
                    <div className="col-md-12">
                      <div className="card-body ">
                        <EmployeeList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      </div>
        <div>
      
        </div>

      </>
    );
  }
