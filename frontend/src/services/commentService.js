import api from "../api/axios";

export const addComment = async (postId, text) => {
  const response = await api.post(`/comments/${postId}`, {
    text,
  });

  return response.data;
};
export const getComments = async (postId) => {
  const response = await api.get(`/comments/${postId}`);

  return response.data;
};

export const updateComments = async (commentId, text) => {
  const response = await api.put(`/comments/${commentId}`, text);

  return response;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/comments/${commentId}`);

  return response.data;
};
