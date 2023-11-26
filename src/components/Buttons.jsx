import React from "react";

const Buttons = ({ liked }) => {
  return (
    <>
     

      {liked ? (
        <span
          className="text-red-500 text-xl mx-2 cursor-pointer"
          title="dislike"
        >
          <ion-icon name="heart-dislike"></ion-icon>
        </span>
      ) : (
        <span className="text-red-500 text-xl mx-2 cursor-pointer" title="like">
          <ion-icon name="heart"></ion-icon>
        </span>
      )}
    </>
  );
};

export default Buttons;
