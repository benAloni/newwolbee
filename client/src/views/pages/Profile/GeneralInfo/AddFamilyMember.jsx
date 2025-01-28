import React, { useState } from "react";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../../../../firebase/firebaseConfig"; 

export default function AddFamilyMember({ selectedEmployee }) {
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [dob, setDob] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const relationshipOptions = [
    { value: "son", label: "Son/Daughter" },
    { value: "brother", label: "Brother/Sister" },
    { value: "father", label: "Father/Mother" },
    { value: "uncle", label: "Uncle/Aunt" },
    { value: "grandfather", label: "Grandfather/Grandmother" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedRelationship(selectedOption);
  };

  const handleDateChange = (event) => {
    setDob(event.target.value);
  };

  const handleGenderChange = (selectedOption) => {
    setSelectedGender(selectedOption);
  };

  const addMember = useMutation({
    mutationFn: async (familyMemberData) => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/addFamilyMember`, 
        familyMemberData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('Vacation updated successfully');
    },
    onError: (error) => {
      console.error('Error updating vacation:', error);
    },
  });

  const addFamily = async () => {
    try {
      const familyMemberData = {
        id: selectedEmployee._id,
        name,
        relationship: selectedRelationship?.value,
        gender: selectedGender?.value,
        dateOfBirth: dob,
        phone,
      };  
      console.log(familyMemberData);
      
      await addMember.mutateAsync(familyMemberData);
  
    } catch (error) {
      console.error("Error updating vacation:", error);
    }
  };
  

  return (
    <div id="family_info_modal" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Family Information</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
              <div className="form-scroll">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Family Member</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Name <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Relationship <span className="text-danger">*</span>
                          </label>
                          <Select
                            options={relationshipOptions}
                            value={selectedRelationship}
                            onChange={handleChange}
                            placeholder="Select a relationship"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="col-form-label">
                            Gender <span className="text-danger">*</span>
                          </label>
                          <Select
                            options={genderOptions}
                            value={selectedGender}
                            onChange={handleGenderChange}
                            placeholder="Select Gender"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Date of birth <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="date"
                            required
                            value={dob}
                            onChange={handleDateChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-block mb-3">
                          <label className="col-form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="submit-section">
                <button className="btn btn-primary submit-btn" onClick={addFamily}>
                  Submit
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
