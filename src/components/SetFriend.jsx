import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setFriend } from "../store/userSlice/userSlice";
const SetFriend = () => {
  const friend = useSelector((user) => user.user.selectedUser);
  console.log(friend);
  const [selectedUser, setSelectedUser] = React.useState(friend || "");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFriend(selectedUser));
  };
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] w-full">
      <p className="mb-10  text-2xl md:text-5xl font-bold text-white text-center ">
        <span className="text-blue-600">"</span>Enter the{" "}
        <span className="text-yellow-600 font-extrabold">username</span> of{" "}
        <br /> a friend you're eager to <br />{" "}
        <span className="text-blue-600">connect</span> and chat with
        <span className="text-yellow-600">!</span>
        <span className="text-blue-600">"</span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          required
          autoFocus
          className="outline-none text-white w-[80vw] md:w-[40vw] font-medium p-2 rounded-lg bg-gray-800 w"
          type="text"
          placeholder="Enter friend username"
          onChange={(e) => setSelectedUser(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 p-2 rounded-lg my-5 md:w-[40vw] text-white font-semibold"
        >
          {" "}
          Start Chat
        </button>
      </form>
    </div>
  );
};

export default SetFriend;
