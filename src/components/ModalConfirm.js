import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete } = props;

  const confirmDelete = () => {};
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
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-confirm">
            Are you sure to delete this user? <br /> Email:{" "}
            {dataUserDelete.email || "No email selected"}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
// trong function components khong cần sử dụng this.function()
