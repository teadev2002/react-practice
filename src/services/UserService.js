import axios from "./my-axios";
// truyền vào danh sách người dùng đang ở trang bao nhiêu
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`); // this is promise
};

// export dưới dạng obj thì export bao nhiêu biến cũng được
export { fetchAllUser };
