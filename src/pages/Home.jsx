import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser as setUserAction } from "../store/userSlice/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const userLoggedIn = useSelector((user) => user.user.status);
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserSet = (e) => {
    // Renamed setUser to handleUserSet
    e.preventDefault();
    dispatch(setUserAction(username)); // Dispatching setUserAction with userData
    navigate("/chat");
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-blue-500 font-extrabold">Free</span>{" "}
          Chat Application
        </h1>
        <p className="text-lg mb-8 font-semibold">Try our Chat Application.</p>

        {userLoggedIn ? (
          <Link
            to="/chat"
            className="p-2 px-6  bg-red-600 rounded-lg cursor-pointer "
          >
            Go to Chat Page
          </Link>
        ) : (
          <div className=" justify-center">
            <form
              onSubmit={handleUserSet}
              className="flex  bg-gray-800 rounded-xl border-gray-900 border-3"
            >
              <input
                autoFocus
                required
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className=" md:w-10/12 w-full  rounded-xl outline-none bg-gray-800  p-2 text-white"
                placeholder="Enter Your name to get Started..."
              />
              <button
                type="submit"
                className="md:p-2 px-2 md:w-3/12 w-5/12 bg-red-600 rounded-r-xl -mr-2  cursor-pointer"
              >
                Get Started
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
