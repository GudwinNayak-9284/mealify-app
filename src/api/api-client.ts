import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://themealdb.com/api/json/v1/1",
});

export default apiClient;
