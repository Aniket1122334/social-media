import api from "../api/axios";

export const followUser = async (userId) => {
  const response = await api.post(`/follow/user/${userId}`);

  return response.data;
};

export const unfollowUser = async (userId) => {
  const response = await api.delete(`/follow/user/${userId}`);

  return response.data;
};
