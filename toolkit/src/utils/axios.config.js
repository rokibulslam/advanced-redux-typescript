import axios from "axios";

let URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
    case "DEVELOPMENT":
        URL = "http://localhost:5000/";
        break
    case "PRODUCTION":
        URL = "productionserver.com";
        break
    default:
             URL="http://localhost:5000/"
}
const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

export default instance