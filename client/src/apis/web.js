import axios from "axios";
// import config from "../../";
// const { PORT } = config;
export default axios.create({
  baseURL: "/outpass",
});
