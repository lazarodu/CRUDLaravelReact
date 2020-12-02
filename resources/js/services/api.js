import axios from "axios";
const host = process.env.MIX_APP_URL;

const api = axios.create({
  baseURL: `${host}/api/`
});

export default api;
