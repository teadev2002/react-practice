import axios from "./my-axios";
// truyền vào danh sách người dùng đang ở trang bao nhiêu
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`); // this is promise
};

const postCreateUser = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};

const putUpdateUser = (name, job) => {
  return axios.put(`/api/users`, { name, job });
};

// export dưới dạng obj thì export bao nhiêu biến cũng được
export { fetchAllUser, postCreateUser, putUpdateUser };
