import axios from "axios";
import getToken from "~/utilities/GetToken"
export const isGrapql = true;
const baseDomain = `${process.env.baseURL}/api/admin/`;
/*const baseDomain = 'http://45.76.97.89:1337';*/
const authorization_prefix = "Bearer ";
export const customHeaders = {
  Accept: "application/json",
  'Authorization': `Bearer ${getToken()}`
  /* Authorization: authorization_prefix + token || undefined*/
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
  baseUrl,
  headers: customHeaders,
});

export async function fetchData(query) {
  const response = await axios({
    method: "POST",
    url: `${baseDomain}/graphql`,
    headers: customHeaders,
    data: {
      query: query,
    },
  });

  return response;
}

const Local = axios.create({
  baseUrl,
});

const RequestInterceptor = (config) => {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("access_token");
  return config;
};
Local.interceptors.request.use(RequestInterceptor);

export { Local };
export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
