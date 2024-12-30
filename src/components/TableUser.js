import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService"; // đóng ngoac do export dưới dạng obj
import ReactPaginate from "react-paginate";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0); // paging: ban đầu ko có dữ liệu thì là 0
  const [totalPages, setTotalPages] = useState(0); // tổng số trang
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data && res.data.data) {
      setListUsers(res.data.data);
      setTotalUsers(res.data.total); // set tổng số user
      setTotalPages(res.data.total_pages); // set tổng số trang
    }
  };

  useEffect(() => {
    // call api
    // dry
    getUsers();
  }, []);

  useEffect(() => {}, [listUsers]);

  // hàm xử lí mỗi lần click chuyển trang sẽ gọi api lấy đúng số lượng user trong trang
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
    </>
  );
};

export default TableUsers;
