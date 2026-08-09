import ChatList from "../../components/Messages/ChatList";
import ChatWindow from "../../components/Messages/ChatWindow";
import { useSelector } from "react-redux";

const Messages = () => {
  const usersSelector = useSelector(
    (state) => state.users.currentUser?.following,
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* =====================================================
          MESSAGES MAIN CONTAINER
      ====================================================== */}

      <main
        className="
          ml-20
          h-dvh
           lg:w-[calc(80vw-5rem)]
          w-[calc(100vw-5rem)]

          overflow-x-auto
          overflow-y-hidden

          p-0
        "
      >
        <div
          className="
            mx-auto
            h-full

            /* Mobile / Tablet:
               Keep enough width so ChatList + ChatWindow
               don't get squeezed.
            */
            min-w-212.5
            w-full

            flex
            overflow-hidden

            rounded-none
            border-0

            sm:rounded-xl
            sm:border
            sm:border-zinc-800
            sm:shadow-2xl

            bg-[#0f0f0f]
          "
        >
          {/* =================================================
              CHAT LIST
          ================================================= */}

          <div
            className="
              w-70
              sm:w-75
              md:w-[320px]
              lg:w-85
              xl:w-90

              shrink-0
              h-full

              border-r
              border-zinc-800

              bg-[#0f0f0f]

              overflow-hidden

              transition-all
              duration-300
            "
          >
            <ChatList followingUsers={usersSelector} />
          </div>

          {/* =================================================
              CHAT WINDOW
          ================================================= */}

          <div
            className="
              flex-1
              min-w-142.5

              h-full

              bg-black

              overflow-hidden
              relative
            "
          >
            <ChatWindow />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
