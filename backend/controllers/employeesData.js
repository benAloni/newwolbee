import EmployeeModel from "../models/EmployeesModel.js";


export const getEmployees =  async (req, res) => {
    let employees;
    const {uid} = req
    try {
      employees = await EmployeeModel.find({ uid })       
    } catch (error) {
      console.error("Error finding employees:", error);
      res.status(500).send("Internal Server Error");
    }
    res.status(200).json(employees);
  }


  export const updateEmployeeVacation = async (req, res) => {
    console.log("Received request to update vacation:", req.body);

    const { Id, name, startDate, endDate } = req.body;

    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            Id, 
            { 
                Vacation: {
                    name,
                    startDate,
                    endDate,
                },
            },
            { 
                new: true,       
                runValidators: true 
            }
        );

        if (!updatedEmployee) {
            console.log("Employee not found");
            return res.status(404).send("Employee not found");
        }

        console.log("Employee updated successfully:", updatedEmployee);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error("Error updating employee vacation:", error);
        res.status(500).send("Internal Server Error");
    }
};




  



  export const addEmployees = async (req, res) => {
    const employeeData = req.body;
    const { uid } = req; // Assuming uid is being passed in the request

    try {
        // Check if an employee with the same EmployeeID already exists
        const existingEmployee = await EmployeeModel.findOne({
            EmployeeID: employeeData.EmployeeID,
        });

        if (existingEmployee) {
            return res.status(400).json({
                message: "Employee with this ID already exists.",
            });
        }

        // Create a new employee record
        const newEmployee = new EmployeeModel({
            ...employeeData,
            uid,
        });

        // Save the new employee record to the database
        await newEmployee.save();

        // Respond with the created employee data
        return res.status(200).json(newEmployee);
    } catch (error) {
        console.error("Error adding Employee:", error);

        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).json({
                message: "Duplicate key error.",
                error: error.message,
            });
        }

        return res.status(500).json({
            message: "An error occurred while adding an Employee.",
            error: error.message,
        });
    }
};
