import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUser";
import Container from "react-bootstrap/Container";
function App() {
  return (
    <div className="app-container">
      <Header /> <br />
      <TableUsers />
    </div>
  );
}

export default App;
