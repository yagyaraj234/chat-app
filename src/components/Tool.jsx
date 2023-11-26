import React from "react";

const Tool = () => {
  return (
    <div className="absolute  text-white  ">
      <div className="flex flex-col -gap-2 rounded-xl bg-gray-950">
        <button className="p-2 font-medium my-1 px-5 hover:bg-red-600 bg-red-500">
          Like
        </button>
        <button className="p-2 hover:bg-gray-900 bg-gray-950 font-medium my-1 px-5">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default Tool;
