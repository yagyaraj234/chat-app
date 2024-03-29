import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import UserList from "../components/UserList";
import { useDispatch } from "react-redux";
import { setMessages } from "../store/userSlice/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { nanoid } from "nanoid";
import SetFriend from "../components/SetFriend";
import ScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = process.env.REACT_APP_URL;

const Chat = ({ user }) => {
  const username = useSelector((user) => user.user.username);
  const msg = useSelector((user) => user.user.messages);
  

  const friend = useSelector((user) => user.user.selectedUser);
  const [currentSocket, setCurrentSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(msg || []);

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(ENDPOINT, { transports: ["websocket"] });
    setCurrentSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentSocket) {
      const handleChat = (payload) => {
        if (
          payload.username &&
          (payload.username.toLowerCase() === username.toLowerCase() ||
            payload.username.toLowerCase() === friend.toLowerCase())
        ) {
          toast.success(
            payload.username.toLowerCase() === username.toLowerCase()
              ? "Message sent"
              : `Message received by ${payload.username}`
          );

          const updatedMessages = [...chat, { ...payload }]; // Assuming msg is the initial state of messages

          dispatch(setMessages((chat) => [...chat, {...payload}]));
          setChat((chat) => [...chat, { ...payload }]);
        }
      };

      currentSocket.on("chat", handleChat);

      return () => {
        currentSocket.off("chat", handleChat);
      };
    }
  }, [currentSocket, username, friend, dispatch]);

  //  *****************************************
  // Handle sent message
  // *****************************************
  const sendChat = (e) => {
    e.preventDefault();
    if (currentSocket) {
      const id = nanoid(10);
      currentSocket.emit("chat", { message, username, id, liked: false });
      setMessage("");
    }
  };

  //  *****************************************
  // Handle Like button on both side Start
  //  *****************************************
  useEffect(() => {
    if (currentSocket) {
      const handleEventsHandle = (update) => {
        dispatch(setMessages(update.updatedChat));
        setChat(update.updatedChat);
      };

      currentSocket.on("eventsHandle", handleEventsHandle);

      return () => {
        currentSocket.off("eventsHandle", handleEventsHandle);
      };
    }
  }, [currentSocket]);

  const updateData = (updatedChat) => {
    if (currentSocket) {
      currentSocket.emit("eventsHandle", {
        updatedChat,
      });
    }
  };

  const handleDoubleClick = (id) => {
    const updatedChat = chat.map((payload) => {
      if (payload?.id === id) {
        return {
          ...payload,
          liked: !payload?.liked,
        };
      }

      return payload;
    });
    console.log(updatedChat);
    updateData(updatedChat);
    setChat(updatedChat);
    dispatch(setMessages(updatedChat));
  };

  //  *****************************************
  // Handle Like button on both side End
  // *****************************************

  //  *****************************************
  // Delete functionality start
  //  *****************************************
  const handleDelete = (id) => {
    const updatedChat = chat.filter((payload) => payload.id !== id);
    setChat(updatedChat);
    dispatch(setMessages(updatedChat));
  };
  //  *****************************************
  // Delete functionality start End
  //  *****************************************

  return (
    <div>
      {friend ? (
        <div className="flex md:px-10">
          <UserList friend={friend} />
          <div className="flex flex-col gap-2 min-h-[85vh] max-h-[85vh] justify-end w-full p-2 md:border-r-2 border-gray-800  ">
            <ScrollToBottom className="text-white flex flex-col gap-5 light-scrollbar  overflow-y-scroll">
              {chat?.map((payload, index) => (
                <div
                  key={index}
                  className={`font-semibold hover:cursorpointer items-center my-4 ${
                    payload.username !== username ? "text-left" : "text-right"
                  }`}
                  style={{
                    display: "flex",
                    justifyContent:
                      payload.username !== username ? "flex-start" : "flex-end",
                  }}
                >
                  {payload.username === username && (
                    <span
                      onClick={() => handleDelete(payload.id)}
                      className="text-xl text-gray-800 cursor-pointer mx-2"
                      title="delete"
                    >
                      <ion-icon name="trash"></ion-icon>
                    </span>
                  )}
                  <div
                    onDoubleClick={() => handleDoubleClick(payload.id)}
                    className={`p-2 px-4 rounded-lg min-w-[25vw] md:min-w-[15vw] flex ${
                      payload.username !== username
                        ? "bg-green-500 rounded-tr-2xl"
                        : "bg-blue-500 rounded-tl-2xl "
                    }`}
                    style={{
                      display: "inline-block",
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    <div
                      className={`flex gap-1 items-center justify-between px-2`}
                    >
                      <p>{payload.message}</p>
                      {payload.username === username && (
                        <>
                          {payload.liked && (
                            <span className="text-red-600 cursor-pointer ">
                              <ion-icon name="heart"></ion-icon>
                            </span>
                          )}
                        </>
                      )}
                      {payload.username !== username && (
                        <>
                          {payload.liked && (
                            <span
                              className=" cursor-pointer mx-2 text-red-500"
                              title="delete"
                            >
                              <ion-icon name="heart"></ion-icon>
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {payload.username !== username && (
                    <span
                      onClick={() => handleDelete(payload.id)}
                      className="text-xl cursor-pointer mx-2 text-gray-800"
                      title="delete"
                    >
                      <ion-icon name="trash"></ion-icon>
                    </span>
                  )}
                </div>
              ))}
            </ScrollToBottom>

            <form onSubmit={sendChat} className="flex gap-2">
              <input
                autoFocus
                required
                type="text"
                name="chat"
                placeholder={`Send message to ${friend}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="outline-none p-2 rounded-xl bg-gray-800 text-white text-lg font-medium w-full"
              />
              <button
                type="submit"
                className="outline-none p-2 rounded-xl bg-gray-800 text-white text-lg font-medium"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <SetFriend />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Chat;
