import axios from "axios";
import { use, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService"; // đóng ngoac do export dưới dạng obj
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { toast } from "react-toastify";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import "./TableUser.scss";
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {
  let [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); // paging: ban đầu ko có dữ liệu thì là 0
  const [totalPages, setTotalPages] = useState(0); // tổng số trang
  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortFeild] = useState("id");
  const [keyword, setKeyword] = useState("");

  const [dataExport, setDataExport] = useState([]);
  // CSV EXPORT
  const getUsersExport = (event, done) => {
    let result = []; // tạo dữ liệu ban đẩu là rỗng
    if (listUsers && listUsers.length > 0) {
      // xét điều kiện
      result.push(["Id", "Email", "First Name", "Last Name"]); // push cái thead cho table
      listUsers.map((item, index) => {
        // map dữ liệu theo cái thead bên trên
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr); // push arr vào result
      });

      setDataExport(result); // gọi setState thêm result vào để có data trong dataExport
      done(); // cuối cùng là gọi tới hàm done để báo kết thúc
    }
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    console.log("run search term: ", term);
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      console.log(cloneListUsers);
      setListUsers(cloneListUsers);
    } else {
      getUsers(1); // page 1
    }
  }, 500);

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortFeild(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
    console.log("sort", cloneListUsers);
  };

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
    setIsShowModalDelete(false);
  };
  // hàm xử lí mỗi lần click chuyển trang sẽ gọi api lấy đúng số lượng user trong trang
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const hanldeDetailUser = (event) => {
    toast.info("Detail toast");
  };

  const hanldeDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };
  // chỉ để tạo cảm giác xóa api, chứ bước này khi dùng api thật thì ko cần
  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  const hanldeEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEditUser(true);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Row 1 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>
            <span>
              <i className="fas fa-globe-europe"></i> List User
            </span>
          </h5>
          <button
            className="btn btn-outline-dark"
            onClick={() => setShowModalAddNew(true)}
          >
            <i className="fa fa-plus" style={{ fontSize: 20 }}></i> Add New
          </button>
        </div>

        {/* Row 2 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "5px", // Khoảng cách giữa các nút
          }}
        >
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Email"
              onChange={(event) => handleSearch(event)}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Chứa các nút thẳng hàng */}
            <label htmlFor="import" className="btn btn-outline-primary">
              <i className="fa-solid fa-file-import"></i> Import
            </label>
            <input id="import" type="file" hidden />
            <CSVLink
              filename={"users.csv"}
              className="btn btn-outline-success"
              data={dataExport}
              asyncOnClick={true} // chờ onclick xử lí xong
              onClick={getUsersExport} // run function bên trong
            >
              <i className="fa-solid fa-download"></i> Export
            </CSVLink>
          </div>
        </div>
      </div>

      <Table striped bordered hover>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>

                <span>
                  <i
                    onClick={() => handleSort("desc", "id")}
                    className="fa-solid fa-circle-down"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "id")}
                    className="fa-solid fa-circle-up"
                  ></i>
                </span>
              </div>
            </th>
            <th>Avatar</th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    onClick={() => handleSort("desc", "first_name")}
                    className="fa-solid fa-circle-down"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "first_name")}
                    className="fa-solid fa-circle-up"
                  ></i>
                </span>
              </div>
            </th>
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
                      onClick={() => hanldeDeleteUser(item)}
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

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;
