import api from "../api/axios";

export const myProfile = async () => {
  const response = await api.get("/profile/me");
  // console.log(response.data);
  return response.data;
};

export const userSearch = async (query) => {
  const response = await api.get(`/profile/search-users?q=${query}`);
  // console.log(response.data.users);
  return response.data.users;
};

export const allUsers = async () => {
  const response = await api.get(`/profile/all-users`);
  // console.log(response.data.users);
  return response.data;
};
