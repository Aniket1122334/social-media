import { IoClose } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  createComment,
  fetchComments,
  removeComment,
} from "../../redux/slices/commentSlice";
import {
  addCommentCount,
  deleteCommentCount,
} from "../../redux/slices/postSlice";

const Comments = ({ postId, setSelectedPostId }) => {
  const dispatch = useDispatch();

  const comment = useRef();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const commentSelector = useSelector((state) => state?.comments?.comments);
  const userSelector = useSelector((state) => state.auth.user);
  console.log(userSelector);

  const handleComment = async () => {
    const text = comment.current.value.trim();

    if (!text) return;

    const result = await dispatch(createComment({ postId, text }));

    if (result.payload.success) {
      toast.success("Comment added successfully!");
      dispatch(addCommentCount(result.payload));
      comment.current.value = "";
      setSelectedPostId(null);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (comment.current.value.trim()) {
        handleComment();
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await dispatch(removeComment(commentId));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(deleteCommentCount({ postId, commentId }));
      toast.success("Comment deleted successfully!");
    } else {
      toast.error(result.payload || "Failed to delete comment");
    }
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50 p-3">
      <div className="bg-[#111] w-full max-w-md h-[85vh] rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}

        <div className="top-0 bg-[#111] border-b border-zinc-800 h-14 flex items-center justify-center relative">
          <h2 className="text-white font-semibold text-lg">Comments</h2>

          <IoClose
            onClick={() => setSelectedPostId(null)}
            className="absolute right-4 text-white text-2xl cursor-pointer"
          />
        </div>

        {/* Comment List */}

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {commentSelector && commentSelector.length > 0 ? (
            commentSelector.map((comment) => (
              <div
                key={comment._id}
                className="flex justify-between gap-3 mb-6 group"
              >
                <div className="flex gap-3 flex-1">
                  <img
                    src={
                      comment?.user?.profilePicture ||
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                    }
                    alt={comment.user?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-white text-sm leading-6 wrap-break-word">
                      <span className="font-semibold mr-2">
                        {comment.user?.username}
                      </span>

                      {comment.text}
                    </p>

                    <div className="flex gap-4 mt-1 text-xs text-gray-500">
                      <span>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>

                      <button className="hover:text-white">Reply</button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {String(userSelector?.id) === String(comment.user?._id) && (
                    <MdDeleteOutline
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-gray-400 text-xl mt-2 cursor-pointer hover:text-red-500 transition"
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-white text-xl font-semibold">
                  No comments yet
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                  Be the first one to comment.
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}

        <div className="border-t border-zinc-800 p-3 flex items-center gap-3">
          <img
            src={
              userSelector?.profilePicture ||
              "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
            }
            className="w-9 h-9 rounded-full"
          />

          <input
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-white outline-none"
            ref={comment}
            onKeyDown={handleEnter}
          />

          <button
            onClick={handleComment}
            className="px-4 py-2 text-blue-500 font-semibold hover:text-blue-400 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
