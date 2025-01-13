import React from "react";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../services";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const DeleteEmployeeModal = ({ employee }) => {
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      const response = await deleteEmployee(employee?._id);
      if (response.status === 200) {
        Swal.fire(
          "Success!",
          `${employee?.fullName} has been deleted successfully from the employees list`,
          "success"
        );
        queryClient.invalidateQueries("employees");
        
        //**find a way to close the bootstrap modal after succession 
      }
      if (response.status === 404) {
        Swal.fire("Error!", `Failed to delete ${employee?.fullName} from the employees list`, "error");
      }
    } catch (error) {
      console.log("There was en error deleting the employee:", error);
    }
  };
  return (
    <>
      {/* Delete Performance Indicator Modal */}
      <div className="modal custom-modal fade" id="delete" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>מחק עובד</h3>
                <p>{`Are you sure you want to delete ${employee?.fullName} from the employees list?`}</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <Link
                      className="btn btn-primary continue-btn"
                      onClick={handleDelete}
                    >
                      Delete
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete Performance Indicator Modal */}
    </>
  );
};

export default DeleteEmployeeModal;
