module.exports.myProfileDTO = (details) => {
  if (!details) return null;

  return {
    id: details._id,
    fullname: details.fullname,
    username: details.username,
    email: details.email,
    profilePicture: details.profilePicture,
    bio: details.bio,
    followers: details.followers,
    following: details.following,
    posts: details.posts,
    authProvider: details.authProvider,
    googleId: details.googleId,
    isVerified: details.isVerified,
  };
};

module.exports.searchUserDTO = (details) => {
  if (!details) return null;

  return {
    id: details._id,
    fullname: details.fullname,
    profilePicture: details.profilePicture,
  };
};
