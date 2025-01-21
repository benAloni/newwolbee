import React, { useEffect, useState } from "react";
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
import Select from "react-select";
import ProgressBar from "../Admin/ProgressBar";
import { AlignCenter } from "react-feather";
import { auth } from "../../../../../firebase/firebaseConfig";
import sick from "../../../../../imgs/sick.png"
import vacation from "../../../../../imgs/vacation.png"
import personal from "../../../../../imgs/personal.png"
import converction from "../../../../../imgs/contact.png"
import CreateEmployeeEvent from "../../../Employees/PersonalEvents/CreateEmployeeEvent";
// import Satisfaction from "../../../../../imgs/Satisfaction.png"
// import satisfaction1 from "../../../../../imgs/growth4.png"
// import growth from "../../../../../imgs/growth5.png"

export default function HrStatistics() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [values, setValues] = useState([]);

  const [modalOpenLisa, setModalOpenLisa] = useState(false);
  const [modalContentLisa, setModalContentLisa] = useState(null);

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


  useEffect(() => {  
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/getTeams`,{
          headers: {
            Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
          },
        });
        setValues(response.data);
      } catch (error) {
        console.error("Error fetching team :", error);
      }
    };
    fetchTeams();

  }, []);

  const handleSelect = (option) => {
    setSelectedTeam(option.value);
  };
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

  
const TeamSatisfaction = () => {
  return (
    <div >
<div
 
  style={{
    ...styles.bgPercent,
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '690px',
    height: '250px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft:'455px'
  }}
>
  <h2 style={{textAlign:'center',marginTop:'40px'}}className="card-title text-white">Team Satisfaction</h2>
  <h3
    className="text-light percentage"
    style={{ fontSize: '2.5rem', margin: '0', lineHeight: '1.2',textAlign:'center' }}
  >
    65%
  </h3>
  <span
    className="progress"
    style={{
      display: 'block',
      height: '8px',
      backgroundColor: '#ddd',
      borderRadius: '5px',
      overflow: 'hidden',
      marginTop: 'auto', 
    }}
  >
    <span
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: '#4caf50',
      }}
    ></span>
  </span>
</div>
</div>

  );
};


  const TurnoverLineChart = ({ data }) => {
    return (
      <div   style={{
       
        padding: "5px",
        borderRadius: "20px",
        width:"400px",
        height:"150px",
        marginTop:'173px'
        
       

        
      }}>
       <div style={{ backgroundColor: '#FFEB3B', padding: '10px',borderRadius:'15px',height:'350px',width:'440px',marginLeft:'-35px',marginBottom:'50px' }}>
  <h2 
    className="card-title text-warning text-center" 
    style={{
      borderBottom: '2px solid #FFFFFF', 
      paddingBottom: '10px', 
      marginBottom: '20px'
    }}
  >
    Turnover Rate
  </h2>
  
  <ResponsiveContainer width={400} height={300} >
    <LineChart
      data={data}
      margin={{ top: 10, right: 60, left: 0, bottom: 0 }}
    >
      <CartesianGrid stroke="none" />
      <XAxis dataKey="month" tick={{ fill:'#FFFFFF' }} />
      <YAxis tick={{ fill: '#FFFFFF' }} />
      <Tooltip />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="turnoverRate" 
        stroke="#FFFFFF"
        strokeWidth={5}  
      />
    </LineChart>
  </ResponsiveContainer>
</div>
</div>
    );
}






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
          backgroundColor: "#1cd5ccec", // רקע טורקיז
          padding: "20px",
          borderRadius: "10px",
          width: "440px",
          height: "550px",
          marginTop:'230px',
          marginLeft:'-30px'
        }}
      >
        <h5 className="card-title text-light text-center">
          Yearly Team Building Activities
        </h5>
        <ResponsiveContainer width="100%" height={450}>
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
              fill="#ffffff" // עמודות לבנות
              label={{ fill: "#333" }}
              barSize={30} // רוחב העמודות
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
            marginTop:'270px',
            marginRight:'0px',
            marginLeft:'40px'
          }}
        >
          <ResponsiveContainer width="100%" height={230}>
         
        <LineChart data={data}>
          <XAxis dataKey="name" /> {/* תציין את שם הנתון לציר ה-X */}
          <YAxis /> {/* ציר ה-Y */}
          <Line
            type="linear" // ניתן לשנות ל-"linear" אם תרצה גרף קווי ישר
            dataKey="satisfaction"
            stroke="#1C82AD"
            strokeWidth={9} // קו עבה יותר
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
    }
    

  const EmployeeList = () => {
    const employees = [
      { id: 1, name: "Lisa", hours: 140, image: lisa },
      { id: 2, name: "Tom", hours: 138, image: tom },
      { id: 3, name: "David", hours: 142, image: david },
      { id: 4, name: "Nicole", hours: 242, image: nicole },
      { id: 5, name: "Brad", hours: 197, image: brad },
      { id: 6, name: "John", hours: 101, image: john },
    ];
  
    // סינון רק את העובדים שעברו 100% שעות
    const employeesOver100 = employees.filter(employee => employee.hours > 100);
  
    return (
      <div style={{ marginLeft: '850px', marginTop: '100px', backgroundColor: 'peachpuff',width:'300px',height:'650px' }} className="mt-4 p-3 rounded">
        <h2 style={{ color: 'black',textAlign:'center', marginBottom:'50px' }} className="card-title text-center">
          Employees Over 100% Hours
        </h2>
        <div className="row">
          {employeesOver100.map((employee) => (
            <div
              key={employee.id}
              className="d-flex flex-row mb-3 justify-content-center"
         
            >
              <div  className="card-body d-flex align-items-center w-100">
                <img
                  className="card-img-left"
                  src={employee.image}
                  alt={employee.name}
                  style={{ height: "50px", width: "50px", marginRight: "15px" , marginBottom:'20px' , borderRadius:'100%'}}
                />
                <div>
                  <h3 style={{ margin: 0  ,textAlign:'center'}}>{employee.name}   {employee.hours}%</h3>
                  <span className="badge badge-danger">Over 100% Hours</span>
                </div>
              </div>
            </div>
          ))}
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
        src: "https://cdn0.iconfinder.com/data/icons/3d-hands-gestures/256/Point_left.png",
      },
      personal: {
        src: personal,
      },
      birthday: {
        src: "https://cdn0.iconfinder.com/data/icons/3d-hands-gestures/256/Point_left.png",
      },
      sick: {
        src: sick,
      },
      vacation: {
        src: vacation,
      },
      growth: {
        src: "",
      },
      converction: {

        src: converction ,
      },
      Satisfaction:{
        src:""
      },
      satisfaction1:{
        src:""
      }

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
      height: "150px",
      background:
        "linear-gradient(90deg, hsla(251, 54%, 44%, 1) 26%, hsla(264, 44%, 46%, 1) 46%, hsla(282, 35%, 49%, 1) 63%, hsla(319, 44%, 60%, 1) 92%)",
    },
   bgSatisfaction: {
  background:
    "linear-gradient(180deg, hsla(240, 100%, 50%, 1) 59%, hsla(270, 100%, 60%, 1) 100%)",
},

    bgTeamSatisfaction: {
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

      {/* <div  style={{
      padding: "0px",
      position: "relative",
      top: "10px",
      borderRadius: "10px",
      width: "1200px",
      height: "150px",
      textAlign: "center",
      margin: "0 auto",
      left: '220px', 
      bottom: '0px'
      }}>
        <Select
          options={values.map((team) => ({
            value: team,
            label: team.name,
          }))}
          onChange={handleSelect}
          placeholder="Select a team"
          className="w-50 m-3"
         
        />
      </div> */}
      <div  styles={{backgroundColor:"gray", color:'white', bottom:'5px',  marginTop: '0',
            marginBottom: '0'}} className="row">
        <div style={{  marginTop: '0',
            marginBottom: '0',}}className="col-sm-12  col-md-6 col-lg-3  ">
          <div
            className="card justify-content-center  mb-3"
            style={{ ...styles.bgMonthly, bottom:'5px',paddingTop:'0px' , marginTop: '0',
              marginBottom: '0', height:'150px', textAlign:'center',width:'450px'}}
            
          >
        
        <div style={{
        padding: "0px",
        
        top: "10px",
        borderRadius: "10px",
        width: "450px",
        height: "156px",
       marginTop: '0',
            marginBottom: '0',
            textAlign:'center'
       
       
      }}className="row g-0">
                <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body " style={{ ...customHeight(150), width:'450px'}}>
                  <h5 className="card-title">Monthly Team-Building Activities: </h5>
                
                 <h3>
                    {selectedTeam
                      ? selectedTeam["Monthly Team Building Activities"]
                      : "0"}
                  </h3>
                </div>
              </div>
              <div className="col-md-4">
              
              </div>
            </div>
          </div>
          </div>
          <div
           className="card justify-content-center  mb-3"
            style={{ ...styles.bgPersonal , height:'150px', textAlign:'center',width:'450px'}}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body " style={{ ...customHeight(150) }}>
                  <h5 className="card-title"> </h5>
                  <h2>
                    {selectedTeam
                      ? selectedTeam["Personal Development Plan"]
                      : "0"}
                  </h2>
                </div>
              </div>
              <div className="col-md-4">
                <img
                style={{width:'170px',height:"120px"}}
                  src={styles.images.personal.src}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
            </div>
          </div>
          
          <div style={{ width: '450px' }} className="col-sm-12 col-md-12 col-lg-12">
  <div
    className="card mb-3"
    style={{ ...styles.bgBirthdays, ...customHeight(375) }}
  >
    <div className="row g-0">
      <div className="col-md-8">
        <div className="card-body" style={{ width: '290px', height: '170px' }}>
          <h2 className="card-title" style={{ color: 'black', textAlign: 'center' }}>
            Upcoming Birthdays
          </h2>
          <div className="d-flex">
            <div style={{ marginRight: '60px' }}>
              <div className="col-4">
                <img
                  src={brad}
                  width={90}
                  alt=""
                  style={{borderRadius:'100%' }}
                />
              </div>
              <div>
                <h3 style={{ marginLeft: '20px' }}>2/9</h3>
              </div>
              <div>
                <h2 style={{ marginLeft: '20px' }}>(31)</h2>
              </div>
            </div>
            <div style={{ marginRight: '60px' }}>
              <div className="col-4">
                <img
                  src={tom}
                  width={90}
                  alt=""
                  style={{ borderRadius:'100%' }}
                />
              </div>
              <div>
                <h3 style={{ marginLeft: '20px' }}>2/18</h3>
              </div>
              <div>
                <h2 style={{ marginLeft: '20px' }}>(26)</h2>
              </div>
            </div>
            <div>
              <div className="col-4">
                <img
                  src={lisa}
                  width={90}
                  alt=""
                  style={{ borderRadius:'100%' }}
                />
              </div>
              <div>
                <h3 style={{ marginLeft: '20px' }}>2/27</h3>
              </div>
              <div>
                <h2 style={{ marginLeft: '20px' }}>(43)</h2>
              </div>
            </div>
          </div>
          <div  className="row">
        <div   className="col-4  ">
          {/* Turnover Rate */}
          <div
          
            // style={{ ...styles.bgMonthly }}
          >
            <div   className="row g-0">
              <div   className="col-md-12">
                <div >
                  <TurnoverLineChart data={data}   />
                </div>
              </div>
            </div>
            <ColumnChart /> 
          </div>
</div>
</div>
</div>
        </div>
      </div>
     

    </div>
    
  </div>
  
</div>

   
         
      
<div style={{flexDirection:'column',marginLeft:'150px', width: '370px' }} className="col-sm-12 col-md-6 col-lg-6">
  <div className="col">
    <div style={{alignItems:'center', backgroundColor: 'orange' }} className="card">
      <div className="card-body">
        <h1  style={{alignItems:"center",fontSize:'50px'}}className="card-title text-center">76%</h1>
        <br/><br/><br/><br/>
        <h3 style={{alignItems:'center' , marginLeft:'10px'}}>Spent Budget </h3>
        {/* <br/><br/><br/><br/><br/><br/> */}
        <h2 style={{alignItems:'center', marginLeft:'40px'}}>800$</h2>
      </div>
    </div>
    
  <div style={{ width: '350px' ,marginRight:'100px',padding:'2px' }} className="col-sm-12 col-md-12 col-lg-12">
    <div className="card mb-3" style={styles.bgSick}>
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Frequent Sick Leave</h5>
            <h1 style ={{fontSize:'30px'}}className="card-title">
              <br/>
              {selectedTeam ? selectedTeam["Frequent Sick Leave"] : "0"}
            </h1>
          </div>
        </div>
        <div className="col-md-4">
          <img
            src={styles.images.sick.src}
            className="img-fluid rounded-start"
            alt="Sick"
          />
        </div>
      </div>
      <br/>
    </div>
  </div>

  <div className="col-sm-12 col-md-12 col-lg-12" style={{ width: '350px',padding:'2px',}}>
    <div className="card mb-3" style={styles.bgVacation}>
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body d-flex">
            <h5 className="card-title">Low Vacation Leave</h5>
            <h1 style ={{fontSize:'30px'}} className="card-title">
                  {selectedTeam ? selectedTeam["Low Vacation Leave"] : "0"}
                </h1>
            
            <div style={{alignItems:'center'}}>
        
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <img
            src={styles.images.vacation.src}
            className="img-fluid rounded-start"
            alt="Vacation"
          />
        </div>
       </div>
            </div>
            </div>
      
</div>
</div>

<div className="col-sm-12 col-md-6 col-lg-3 ">
            <div className="card " style={{ ...styles.bgSatisfaction ,marginLeft:'10px',padding:'2px',width:'300px'}}>
              <div className="card-body m-2">
              <h5 className="card-title" style={{ color: 'white', textAlign: 'center' }}>Low Employees Satisfaction</h5>
                <div className="row">
                  <div className="col-4">
                    <img
                      src={lisa}
                      width={50}
                      alt=""
                      style={{borderRadius:'100%'}}
                    />
                  </div>
                  <div style={{width:'60px'}} className="col"  >
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
                      style={{borderRadius:'100%'}}
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
                      style={{borderRadius:'100%'}}
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
                      style={{borderRadius:'100%'}}
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
                      style={{borderRadius:'100%'}}
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
              style={{ ...styles.bgGrowth, ...customHeight(220),marginLeft:'10px',width:'300px',}}
            >
              
                
      
       
            <div
              className="card justify-content-center  mb-3 "
              style={{ ...styles.bgGrowth, ...customHeight(220), }}
            >
              <div className="row g-0">
                <div className="col-md-8" >
                  <div className="card-body" style={{width:'220px'}}>
                    <h5 className="card-title" style={{ color: 'black', textAlign: 'center', marginBottom:'20px',marginLeft:'50px'}}>Personal Growth Programs</h5>
                 
                    <h1   style={{ color: 'black', textAlign: 'center', fontSize:'40px',marginLeft:'50px' }}>4/8</h1>
                  </div>
                </div>
                <div className="col-md-4">
                  
                </div>
              </div>
            </div>

            {/*  */}
          </div>
      </div>
      
 


    <div className="col-sm-12 col-md-4 col-lg-4">
      <div >
        <div >
      
          <TeamSatisfaction />
          <EmployeeList />
        </div>
      </div>
    </div>

    <div className="col-sm-12 col-md-4 col-lg-4">
      <div >
        <div >
          <EmployeeSatisfactionChart />
          <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="col-sm-12 col-md-4 col-lg-4">
    <div  style={{ ...styles.bgPercent, width:'360px', height:'280px', marginTop:'20px',marginLeft:'35px',borderRadius:'10px' }}>
      <div >
        <h1 style={{textAlign:'center', fontSize:'80px'}}>4/8</h1>
        <h2  style={{textAlign:'center'}} className="card-title">Conversations 1:1</h2>
         <img src={styles.images.converction.src}style={{width:'100px', height:'100px', marginLeft:'130px',marginTop:'30px'}} className="img-fluid rounded-start" alt="..." /> 
      </div>
    </div>
  </div>
  </div> 
        </div>
      </div>
      {/* <CreateEmployeeEvent></CreateEmployeeEvent> */}
 </div>
 </div>
 </>
  );
}
  