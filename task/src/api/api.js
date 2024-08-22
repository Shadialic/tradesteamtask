import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000"
});
export async function cheking() {
  try {
    const response = await userApi.get("/checking");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function checkout(data) {
  try {
    const response = await userApi.post("/checkout", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function SuccessRequest(data) {
  try {
    const response = await userApi.post("/request", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}