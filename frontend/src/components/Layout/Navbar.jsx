import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice/userSlice";
const Navbar = () => {
  const userLoggedIn = useSelector((user) => user.user.status);
  const username = useSelector((user) => user.user.username);
  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-800 text-white p-3 md:px-20 ">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-blue-400 ">
          FreeChat
        </Link>
        {username && <p className="font-medium text-lg">Hello, {username}</p>}

        <ul className="flex justify-end gap-2 md:gap-5  ">
          <li>
            <NavLink
              className="uppercase text-sm tracking-wide	font-medium"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`uppercase text-sm tracking-wide	font-medium ${
                !userLoggedIn && "cursor-not-allowed"
              }`}
              to="/chat"
            >
              Chat
            </NavLink>
          </li>
          <li>
            {userLoggedIn && (
              <div
                onClick={() => dispatch(logout())}
                className={`cursor-pointer  tracking-wide	font-medium md:text-xl ml-10 `}
              >
                logout
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
