import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

const getUserResumes = (userEmail) =>
  axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

const getUserResumeData = (documentId) =>
  axiosClient.get(`/user-resumes?filters[documentId][$eq]=${documentId}`);

const UpdateResumeDetails = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);

export default {
  CreateNewResume,
  getUserResumes,
  UpdateResumeDetails,
  getUserResumeData,
};
