import axios from "axios";

const fetchAllUser = () => {
  return axios.get(`https://reqres.in/api/users?page=1`); // this is promise
};

// export dưới dạng obj thì export bao nhiêu biến cũng được
export { fetchAllUser };
