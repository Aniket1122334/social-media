import api from "../api/axios";

export const allPosts = async () => {
  const response = await api.get("/post/all-posts");
  // console.log(response.data.posts);
  return response.data.posts;
};

export const createPost = async (postData) => {
  const response = await api.post("/post/create-post", postData);
  console.log(response.data);
  return response.data;
};

export const toggleLike = async (postId) => {
  const response = await api.patch(`/post/${postId}/like`);

  return response.data;
};
