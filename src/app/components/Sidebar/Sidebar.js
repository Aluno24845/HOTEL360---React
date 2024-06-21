import Logo from "../Logo/Logo";
import MenuEsquerda from "../MenuEsquerda/MenuEsquerda";

export default function Sidebar() {
  return (
    <aside className=" p-10 bg-blue-365 text-white ">
      <Logo />
      <MenuEsquerda />
    </aside>
  );
}
