import EmployeeModel from "../models/EmployeesModel.js";

export const getEmployees = async (req, res) => {
  let employees;
  const { user } = req;
  try {
    employees = await EmployeeModel.find({ uid: user.uid });
  } catch (error) {
    console.error("Error finding employees:", error);
    res.status(500).send("Internal Server Error");
  }
  res.status(200).json(employees);
};

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
        runValidators: true,
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

export const addEmployee = async (req, res) => {
  const { employeeData } = req.body;
  const { user } = req;

  try {
    const employeeAlreadyExists = await EmployeeModel.findOne({
      employeeId: employeeData.employeeId,
    });
    if (employeeAlreadyExists) {
      return res.status(422).json({
        message: "Employee already exists.",
      });
    }
    const newEmployee = new EmployeeModel({
      ...employeeData,
      favoriteFoods: [employeeData.food1, employeeData.food2],
      favoriteRestaurants: [employeeData.restaurant1, employeeData.restaurant2],
      hobbies: [employeeData.hobby1, employeeData.hobby2, employeeData.hobby3],
      uid: user.uid,
    });
    await newEmployee.save();
    return res.status(200).json(newEmployee);
  } catch (error) {
    console.error("Error adding Employee:", error);
    return res.status(500).json({
      message: "An error occurred while adding an Employee.",
      error: error.message,
    });
  }
};

