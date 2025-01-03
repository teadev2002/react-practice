import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { putUpdateUser } from "../services/UserService.js";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const hanldeEditUser = async () => {
    let res = await putUpdateUser(name, job);
    console.log(res);
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => hanldeEditUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
// trong function components khong cần sử dụng this.function()
