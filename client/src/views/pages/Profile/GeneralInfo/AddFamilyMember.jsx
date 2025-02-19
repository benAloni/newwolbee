import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../../../../firebase/firebaseConfig";
import { Modal as BootstrapModal } from "bootstrap";

export default function AddFamilyMember({ selectedEmployee, sons = [], onAddFamilyMember,setFromEvent,fromEvent }) {
  const [selectedRelationship, setSelectedRelationship] = useState(null);
  const [dob, setDob] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);
  const queryClient = useQueryClient(); 



  useEffect(() => {
    if (modalRef.current) {
      modalInstanceRef.current = new BootstrapModal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });
    }
    return () => {
      if (modalInstanceRef.current) {
        modalInstanceRef.current.dispose();
      }
    };
  }, []);

  const showModal = () => {
    if (modalInstanceRef.current) {
      modalInstanceRef.current.show();
    }
  };

  const hideModal = () => {
    if (modalInstanceRef.current) {
      modalInstanceRef.current.hide();
    }
  };

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


const addMember = useMutation({
  mutationFn: async (familyMemberData) => {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/addFamilyMember`,
      familyMemberData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
  onSuccess: (data) => {
    if (data && Array.isArray(data.familyMembers) && data.familyMembers.length > 0) {
      const latestMember = data.familyMembers[data.familyMembers.length - 1];
      if (latestMember && fromEvent == true) {
        onAddFamilyMember(latestMember); 
        setFromEvent(false)
      }
    }

    setSuccessMessage("✅ Family member added successfully!");

    queryClient.invalidateQueries(["employees"]); 

    setTimeout(() => {
      setSuccessMessage("");
      hideModal(); 
    }, 500); 

    setSelectedRelationship(null);
    setDob("");
    setSelectedGender(null);
    setName("");
    setPhone("");
  },
  onError: (error) => {
    setSuccessMessage("❌ Error adding family member!");
    console.error("Error adding family member:", error);
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
      await addMember.mutateAsync(familyMemberData);
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  return (
    <div>
      <div>
        {Array.isArray(sons) && sons.length >= 0 ? (
          <button className="btn btn bg-primary" onClick={showModal}>
            Add Family Member
          </button>
        ) : (
          <button className="edit-icon" onClick={showModal}>
            <i className="fa fa-user-plus" />
          </button>
        )}
      </div>

      {/* Bootstrap Modal */}
      <div ref={modalRef} className="modal fade" id="family_info_modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Family Member</h5>
              <button type="button" className="btn-close" onClick={hideModal}></button>
            </div>
            <div className="modal-body p-4">
              {successMessage && (
                <div className={`alert ${successMessage.includes("✅") ? "alert-success" : "alert-danger"} text-center`}>
                  {successMessage}
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">Full Name:</label>
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
                    <label className="col-form-label">Relationship:</label>
                    <Select
                      options={relationshipOptions}
                      value={selectedRelationship}
                      onChange={setSelectedRelationship}
                      placeholder="Select Relationship"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">Gender:</label>
                    <Select
                      options={genderOptions}
                      value={selectedGender}
                      onChange={setSelectedGender}
                      placeholder="Select Gender"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="col-form-label">Date of Birth:</label>
                    <input
                      className="form-control"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="col-form-label">Phone Number:</label>
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
            <div className="modal-footer d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={hideModal}>
                <i className="fa fa-times"></i> Close
              </button>
              <button className="btn btn-primary" onClick={addFamily}>
                <i className="fa fa-check"></i> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}