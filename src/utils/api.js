import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";
const options = {
  method: "GET",
};

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });

export const fetchAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
