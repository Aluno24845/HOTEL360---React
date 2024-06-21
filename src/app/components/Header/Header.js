// import HeaderMenu from "./HeaderMenu";
// import UserAvatar from "../features/authentication/UserAvatar";
import { HiUserCircle } from "react-icons/hi2";

function Header() {
  return (
    <header className="col-span-2 p-4 align-middle bg-blue-365 text-white flex flex-row-reverse h-16 ">
      <HiUserCircle />
      {/* <HeaderMenu /> */}
    </header>
  );
}

export default Header;
