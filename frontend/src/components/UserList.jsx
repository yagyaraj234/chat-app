import React from "react";



const UserList = ({friend}) => {
  return (
    <div className="min-w-[30vw] max-w-[30vw] text-white border-x-2 border-gray-800 px-4 hidden md:flex overflow-hidden max-h-[85vh] min-h-[85vh]  ">
      <div className=" flex flex-col  w-full overflow-y-auto light-scrollbar">
          <div
            className="flex items-center gap-5 border-b py-4 border-gray-700 bg-gray-800 rounded-md px-2 my-2 "
          >
            <p className="h-10 w-10 rounded-full bg-gray-950 border border-gray-700"></p>
            <p className="text-lg font-medium">{friend}</p>
          </div>
      </div>
    </div>
  );
};

export default UserList;
