import EmployeeModel from "../models/EmployeesModel.js";
import mongoose from "mongoose";


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

export const getEmployee = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const employee = await EmployeeModel.findOne({ _id: new mongoose.Types.ObjectId(employeeId) });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error finding employee:", error.message); 
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
      childrenInfo: employeeData.children,
      favoriteFoods: [employeeData.food1, employeeData.food2],
      favoriteRestaurants: [employeeData.restaurant1, employeeData.restaurant2],
      hobbies: [employeeData.hobby1, employeeData.hobby2, employeeData.hobby3],
      familyMembers: [],
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

export const deleteEmployee = async (req, res) => {
  const { user } = req;
  const { id } = req.body;
  try {
    const employees = await EmployeeModel.find({ uid: user.uid });

    const employeeToDelete = employees.find(
      (employee) => employee._id.toString() === id
    );
    if (!employeeToDelete) {
      return res.status(404).json({
        message:
          "Employee not found or user not authorized to delete this user.",
      });
    }
    await EmployeeModel.findByIdAndDelete(employeeToDelete._id);
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Internal Server Error");
  }
  res.status(200).json({
    message: "Employee deleted successfully.",
  });
};

export const addFamilyMember = async (req, res) => {
  const { id, name, relationship, gender, dateOfBirth, phone } = req.body;

  try {
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          familyMembers: {
            name,
            relationship,
            gender,
            dateOfBirth,
            phone,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const updateEmployeeInsights = async (req, res) => {

  const { id, topInsights, latestInsights, latestActivity } = req.body;
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        topInsights,
        latestInsights,
        latestActivity,
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
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee's insights:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateEmployeeVacation = async (req, res) => {
  const { id, purposeOfTrip, destination, startDate, endDate } = req.body;

  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        $push: {
          vacation: {
            purposeOfTrip,
            destination,
            startDate,
            endDate,
          },
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
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee vacation:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const updateEmployeeSickLeave = async (req, res) => {
  const { id, startDate, endDate } = req.body;
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        $push: {
          sickLeave: {
            startDate,
            endDate,
          },
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
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee vacation:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const addSonEvent = async (req, res) => {
  const { id, childName, eventType, startDate, endDate } = req.body;

  try {
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { _id: id, "familyMembers.name": childName }, 
      {
        $push: {
          "familyMembers.$.childrenEvents": { 
            typeOfEvent: eventType,
            startDate,
            endDate,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send("Employee or child not found");
    }

    res.status(200).json(updatedEmployee); 
  } catch (error) {
    console.error("Error in addSonEvent:", error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};

export const updateEmployeeEvent = async (req, res) => {
  const { id, eventType, startDate, endDate, show } = req.body;

  try {
    if (!id || !eventType || !startDate || !endDate || typeof show === "undefined") {
      return res.status(400).send("Missing required fields");
    }

    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    if (isNaN(formattedStartDate) || isNaN(formattedEndDate)) {
      return res.status(400).send("Invalid dates provided");
    }

    const eventData = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      show, 
    };

    const updateData = {
      [`${eventType}`]: eventData,
    };

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      {
        $push: {
          [`${eventType}`]: eventData, 
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee event:", error);
    res.status(500).send("Internal Server Error");
  }
};

