import { IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  createComment,
  fetchComments,
  removeComment,
} from "../../redux/slices/commentSlice";
import { toast } from "react-toastify";
import {
  addCommentCount,
  deleteCommentCount,
} from "../../redux/slices/postSlice";

const PostModal = ({ post, onClose, user }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments.comments);
  const commentRef = useRef();

  const handlePost = async () => {
    const text = commentRef.current.value.trim();

    if (!text) return;

    const result = await dispatch(
      createComment({
        postId: post._id,
        text,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Comment added successfully!");

      dispatch(addCommentCount(result.payload));

      // Latest comments reload
      dispatch(fetchComments(post._id));

      commentRef.current.value = "";
    } else {
      toast.error(result.payload || "Failed to add comment");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePost();
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await dispatch(removeComment(commentId));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(deleteCommentCount({ postId: post._id, commentId }));

      dispatch(fetchComments(post._id));

      toast.success("Comment deleted successfully!");
    } else {
      toast.error(result.payload || "Failed to delete comment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-5">
      <div className="bg-black rounded-xl overflow-hidden w-full max-w-7xl h-[90vh] flex">
        {/* Left */}
        <div className="flex-1 bg-black flex justify-center items-center">
          {post.postType === "reel" ? (
            <video
              src={post.media}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={post.media}
              alt={post.caption}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Right */}
        <div className="w-105 bg-[#111] flex flex-col">
          {/* Header */}
          <div className="border-b border-zinc-800 p-4 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src={
                  user?.profilePicture ||
                  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                }
                alt=""
                className="w-11 h-11 rounded-full object-cover"
              />

              <div>
                <h3 className="text-white font-semibold">{user?.username}</h3>

                <p className="text-xs text-gray-400">{user?.fullname}</p>
              </div>
            </div>

            <IoClose
              onClick={onClose}
              className="text-white text-3xl cursor-pointer"
            />
          </div>

          {/* Caption */}
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-white text-sm">
              <span className="font-semibold mr-2">{user?.username}</span>

              {post.caption}
            </p>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {comments.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-400">
                No comments yet.
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <img
                    src={
                      comment.user?.profilePicture ||
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                    }
                    className="w-9 h-9 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-semibold mr-2">
                        {comment.user?.username}
                      </span>

                      {comment.text}
                    </p>

                    <div className="flex gap-5 mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>

                      <button className="text-xs text-gray-500 hover:text-white">
                        Reply
                      </button>
                    </div>
                  </div>

                  {String(user?._id || user?.id) ===
                    String(comment.user?._id) && (
                    <MdDeleteOutline
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-gray-400 text-xl mt-1 cursor-pointer hover:text-red-500 transition"
                    />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="border-t border-zinc-800">
            <div className="flex justify-between p-4">
              <div className="flex gap-5 text-2xl">
                <FaHeart className="text-red-500 cursor-pointer" />
                <FiSend className="text-white cursor-pointer" />
              </div>

              <BsBookmark className="text-white text-2xl cursor-pointer" />
            </div>

            <div className="px-4 text-white font-semibold">
              {post.likes.length} likes
            </div>

            <div className="px-4 pb-3 text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Comment Input */}
          <div className="border-t border-zinc-800 flex items-center p-4 gap-3">
            <input
              ref={commentRef}
              onKeyDown={handleEnter}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent outline-none text-white"
            />

            <button
              onClick={handlePost}
              className="text-blue-500 font-semibold hover:text-blue-400"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
