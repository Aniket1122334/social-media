import { RiMenuLine } from "react-icons/ri";

const MobileNavbar = ({ onMenuClick }) => {
  return (
    <div className="lg:hidden h-16 px-4 flex items-center justify-between bg-[#0f0f0f] border-b border-zinc-800">
      <button onClick={onMenuClick}>
        <RiMenuLine size={30} className="text-white" />
      </button>

      <h1 className="text-xl font-bold text-white">InstaHype</h1>

      <div />
    </div>
  );
};

export default MobileNavbar;
