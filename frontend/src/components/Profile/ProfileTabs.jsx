import { BsGrid3X3, BsBookmark, BsPersonSquare } from "react-icons/bs";

const tabs = [
  {
    id: "posts",
    label: "Posts",
    icon: <BsGrid3X3 />,
  },
  {
    id: "reels",
    label: "Reels",
    icon: <BsBookmark />,
  },
  {
    id: "tagged",
    label: "Tagged",
    icon: <BsPersonSquare />,
  },
];

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-10 border-t border-zinc-800">
      <div className="flex justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center justify-center gap-2
              flex-1 sm:flex-none
              px-4 sm:px-8
              py-4
              text-sm sm:text-base
              font-medium
              transition-all
              duration-300
              border-t-2
              ${
                activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-gray-500 hover:text-white"
              }
            `}
          >
            <span className="text-lg">{tab.icon}</span>

            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
