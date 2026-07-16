import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const ReelActions = () => {
  return (
    <div className="flex flex-col gap-6  text-white">
      <Heart size={30} />

      <MessageCircle size={30} />

      <Send size={30} />

      <Bookmark size={30} />
    </div>
  );
};

export default ReelActions;
