import axios from "./my-axios";

const fetchAllUser = () => {
  return axios.get(`/api/users?page=1`); // this is promise
};

// export dưới dạng obj thì export bao nhiêu biến cũng được
export { fetchAllUser };
