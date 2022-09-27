import axios from "axios"
import getToken from "~/utilities/GetToken"
// const baseDomain = "http://localhost:4000/api/"; // API for products
const baseDomain = process.env.baseURL // API for products
export const basePostUrl = "https://beta.apinouthemes.com" // API for post
export const baseStoreURL = "https://beta.apinouthemes.com" // API for vendor(store)


export const customHeaders = {
  Accept: "application/json",
  'Authorization': `Bearer ${getToken()}`

}

export const customHeaders2 = {
  Accept: "application/json",

}

export const baseUrl = `${baseDomain}`

export default axios.create({
  baseUrl,
  headers: customHeaders,
})

const Local = axios.create({
  baseUrl,
})

const RequestInterceptor = (config) => {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("access_token");
  return config;
};
Local.interceptors.request.use(RequestInterceptor);

export { Local }

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&")
}
