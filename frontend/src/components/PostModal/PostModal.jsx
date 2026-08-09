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

  // =====================================================
  // Add Comment
  // =====================================================

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

      dispatch(fetchComments(post._id));

      commentRef.current.value = "";
    } else {
      toast.error(result.payload || "Failed to add comment");
    }
  };

  // =====================================================
  // Enter to Comment
  // =====================================================

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePost();
    }
  };

  // =====================================================
  // Delete Comment
  // =====================================================

  const handleDeleteComment = async (commentId) => {
    const result = await dispatch(removeComment(commentId));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(
        deleteCommentCount({
          postId: post._id,
          commentId,
        }),
      );

      dispatch(fetchComments(post._id));

      toast.success("Comment deleted successfully!");
    } else {
      toast.error(result.payload || "Failed to delete comment");
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-99999

        bg-black/80
        backdrop-blur-sm

        flex
        items-center
        justify-center

        p-0
        sm:p-4
        md:p-6
      "
    >
      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        className="
          relative

          w-full
          h-full

          sm:w-[95vw]
          sm:h-[90vh]

          md:w-[90vw]
          `md:max-w-300

          lg:w-[85vw]
          lg:max-w-325

          bg-black

          rounded-none
          sm:rounded-2xl

          overflow-hidden

          flex

          flex-col
          md:flex-row

          shadow-2xl

          border
          border-zinc-800
        "
      >
        {/* =================================================
            CLOSE BUTTON - MOBILE
        ================================================= */}

        <button
          onClick={onClose}
          className="
            absolute
            top-3
            right-3

            z-50

            w-10
            h-10

            rounded-full

            bg-black/70

            flex
            items-center
            justify-center

            text-white

            hover:bg-black

            transition

            md:hidden
          "
        >
          <IoClose size={28} />
        </button>

        {/* =================================================
            LEFT - MEDIA
        ================================================= */}

        <div
          className="
            relative

            w-full
            md:flex-1

            h-[45vh]
            sm:h-[50vh]
            md:h-full

            bg-black

            flex
            items-center
            justify-center

            overflow-hidden
          "
        >
          {/* ================= REEL ================= */}

          {post.postType === "reel" ? (
            <video
              src={post.media}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="
                w-full
                h-full

                object-contain

                bg-black
              "
            />
          ) : (
            /* ================= POST IMAGE ================= */

            <img
              src={post.media}
              alt={post.caption || "Post"}
              className="
                w-full
                h-full

                object-contain

                bg-black
              "
            />
          )}
        </div>

        {/* =================================================
            RIGHT - POST DETAILS
        ================================================= */}

        <div
          className="
            w-full
            md:w-95
            lg:w-105

            h-[55vh]
            sm:h-[40vh]
            md:h-full

            bg-[#111]

            flex
            flex-col

            min-w-0
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              border-b
              border-zinc-800

              p-3
              sm:p-4

              flex
              justify-between
              items-center

              shrink-0
            "
          >
            <div className="flex gap-3 items-center min-w-0">
              <img
                src={
                  user?.profilePicture ||
                  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                }
                alt=""
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11

                  rounded-full

                  object-cover

                  shrink-0
                "
              />

              <div className="min-w-0">
                <h3 className="text-white font-semibold truncate">
                  {user?.username}
                </h3>

                <p className="text-xs text-gray-400 truncate">
                  {user?.fullname}
                </p>
              </div>
            </div>

            {/* Desktop Close */}

            <IoClose
              onClick={onClose}
              className="
                hidden
                md:block

                text-white
                text-3xl

                cursor-pointer

                hover:text-gray-400

                transition
              "
            />
          </div>

          {/* =================================================
              CAPTION
          ================================================= */}

          <div
            className="
              px-4
              py-3

              border-b
              border-zinc-800

              shrink-0
            "
          >
            <p className="text-white text-sm wrap-break-word">
              <span className="font-semibold mr-2">{user?.username}</span>

              {post.caption}
            </p>
          </div>

          {/* =================================================
              COMMENTS
          ================================================= */}

          <div
            className="
              flex-1

              overflow-y-auto

              p-4

              space-y-5

              min-h-0
            "
          >
            {comments.length === 0 ? (
              <div
                className="
                  flex
                  justify-center
                  items-center

                  h-full

                  text-gray-400

                  text-sm
                "
              >
                No comments yet.
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  {/* Comment User Image */}

                  <img
                    src={
                      comment.user?.profilePicture ||
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                    }
                    alt=""
                    className="
                      w-8
                      h-8
                      sm:w-9
                      sm:h-9

                      rounded-full

                      object-cover

                      shrink-0
                    "
                  />

                  {/* Comment */}

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm wrap-break-word">
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

                  {/* Delete */}

                  {String(user?._id || user?.id) ===
                    String(comment.user?._id) && (
                    <MdDeleteOutline
                      onClick={() => handleDeleteComment(comment._id)}
                      className="
                        text-gray-400
                        text-xl

                        mt-1

                        cursor-pointer

                        hover:text-red-500

                        transition

                        shrink-0
                      "
                    />
                  )}
                </div>
              ))
            )}
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              border-t
              border-zinc-800

              shrink-0
            "
          >
            <div
              className="
                flex
                justify-between

                p-3
                sm:p-4
              "
            >
              <div className="flex gap-5 text-2xl">
                <FaHeart
                  className="
                    text-red-500
                    cursor-pointer
                  "
                />

                <FiSend
                  className="
                    text-white
                    cursor-pointer
                  "
                />
              </div>

              <BsBookmark
                className="
                  text-white
                  text-2xl

                  cursor-pointer
                "
              />
            </div>

            {/* Likes */}

            <div className="px-4 text-white font-semibold text-sm">
              {post.likes?.length || 0} likes
            </div>

            {/* Date */}

            <div
              className="
                px-4
                pb-3

                text-xs
                text-gray-400
              "
            >
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* =================================================
              COMMENT INPUT
          ================================================= */}

          <div
            className="
              border-t
              border-zinc-800

              flex
              items-center

              p-3
              sm:p-4

              gap-3

              shrink-0
            "
          >
            <input
              ref={commentRef}
              onKeyDown={handleEnter}
              placeholder="Add a comment..."
              className="
                flex-1

                min-w-0

                bg-transparent

                outline-none

                text-white

                text-sm

                placeholder:text-zinc-500
              "
            />

            <button
              onClick={handlePost}
              className="
                text-blue-500

                font-semibold

                hover:text-blue-400

                transition

                text-sm

                shrink-0
              "
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
