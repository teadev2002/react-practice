import axios from "axios";
import { use, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService"; // đóng ngoac do export dưới dạng obj
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { toast } from "react-toastify";
import ModalEditUser from "./ModalEditUser";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); // paging: ban đầu ko có dữ liệu thì là 0
  const [totalPages, setTotalPages] = useState(0); // tổng số trang
  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data && res.data.data) {
      setListUsers(res.data.data);
      setTotalUsers(res.data.total); // set tổng số user
      setTotalPages(res.data.total_pages); // set tổng số trang
    }
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };
  useEffect(() => {
    // call api
    // dry
    getUsers();
  }, []);

  useEffect(() => {}, [listUsers]);

  const handleClose = () => {
    setShowModalAddNew(false);
    setIsShowModalEditUser(false);
  };
  // hàm xử lí mỗi lần click chuyển trang sẽ gọi api lấy đúng số lượng user trong trang
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const hanldeDetailUser = (event) => {
    toast.info("Detail toast");
  };

  const hanldeDeleteUser = (event) => {
    toast.warn("Delete user");
  };

  const hanldeEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEditUser(true);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5> List User</h5>
        <button
          className="btn btn-outline-dark"
          onClick={() => setShowModalAddNew(true)}
        >
          Add New
        </button>
      </div>

      <Table striped bordered hover>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td> {item.id}</td>
                  <td>
                    <img
                      style={{ borderRadius: 100, width: 40 }}
                      src={item.avatar}
                    />
                  </td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={(event) => hanldeDetailUser(event)}
                    >
                      👁️
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={(item) => hanldeDeleteUser(item)}
                    >
                      🗑️
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => hanldeEditUser(item)}
                    >
                      🛠️
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
      />
    </>
  );
};

export default TableUsers;
