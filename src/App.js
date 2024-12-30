import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUser";
import Container from "react-bootstrap/Container";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";
function App() {
  const [isShowModalAddNew, setShowModalAddNew] = useState(false);

  const handleClose = () => {
    setShowModalAddNew(false);
  };
  return (
    <div className="app-container">
      <Header /> <br />
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5> List User</h5>
          <button
            className="btn btn-outline-dark"
            onClick={() => setShowModalAddNew(true)}
          >
            Add New
          </button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
    </div>
  );
}

export default App;
