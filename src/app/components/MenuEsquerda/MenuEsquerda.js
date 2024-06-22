import { NavLink } from "react-router-dom";
import { ContextoApp } from '../../../App.js'

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useContext } from "react";

export default function MenuEsquerda() {
  const { context } = useContext(ContextoApp)

  return (
    <ul>
      <li >
        <NavLink to="/quartos" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '40px' }}>
          <HiOutlineCalendarDays />
          <span style={{ paddingLeft: 10 }}>Quartos</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/reservas" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '40px' }}>
          <HiOutlineHomeModern />
          <span style={{ paddingLeft: 10 }}>Reservas</span>
        </NavLink>
      </li>
      {context.admin &&
        <li>
          <NavLink to="/utilizadores" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '40px' }}>
            <HiOutlineUsers />
            <span style={{ paddingLeft: 10 }}>Utilizadores</span>
          </NavLink>
        </li>
      }
    </ul>
  );
}
