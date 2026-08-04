import api from "../api/axios";

export const getMessages = async (receiverId) => {
  const response = await api.get(`/message/${receiverId}`);
  return response.data;
};

export const sendMessage = async (receiverId, data) => {
  const response = await api.post(`/message/send/${receiverId}`, data);

  return response.data.data;
};
