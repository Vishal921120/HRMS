import axios from "axios";

const BASE_URL = "https://empployeemanagementapi.azurewebsites.net/"

export const fetchCandidate = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}api/Candidate/GetAll`
      );

      console.log(response);

      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteCandidate = async(id) => {
    const response = await axios.delete(`${BASE_URL}delete/${id}`);
    console.log(response);
};

export const userLogin = async(data) => {
    const response = await axios.post(
        `${BASE_URL}api/Authenticate/login`,
        data
      );
    return response;
}