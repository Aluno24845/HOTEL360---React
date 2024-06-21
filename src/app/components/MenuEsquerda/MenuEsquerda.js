import { NavLink } from "react-router-dom";

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

/* const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  } */

export default function MenuEsquerda() {
  return (
    <ul>
      <li>
        <NavLink to="/dashboard">
          <HiOutlineHome />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/bookings">
          <HiOutlineCalendarDays />
          <span>Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/cabins">
          <HiOutlineHomeModern />
          <span>Cabins</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/users">
          <HiOutlineUsers />
          <span>Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings">
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </NavLink>
      </li>
    </ul>
  );
}
