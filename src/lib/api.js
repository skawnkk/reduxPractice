import axios from "axios";

const basicURL = `https://jsonplaceholder.typicode.com`;
export const getPostById = (id) => {
  console.log("get", id);
  axios.get(basicURL + `/posts/${id}`);
};
export const getUsers = () => {
  console.log("user");
  axios.get(basicURL + `/users`);
};
