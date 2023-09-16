import React, { useState } from "react";
import * as messageApi from "../store/API/messagesapi";
const initailVlues= {
  text_message:"",from_person:0, to_person:0
}

// function generateUniqueKey() {
//   return `div-${Math.floor(Math.random() * 1000000)}`;
// }

const chatSide = ({ message, _id ,setMessages}) => {
  
  const [textMessage, setTextMessage] = useState(initailVlues);
  const [sendMsg] = messageApi.useSendMsgMutation();
  const [createMsg] = messageApi.useCreateMsgMutation();

  const handleChange = (e) => {
    const from_person = JSON.parse(sessionStorage.getItem("user"));
    setTextMessage({
      ...textMessage,
      [e.target.name]: e.target.value,
      from_person: from_person[0]["_id"],
      to_person: _id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(textMessage);

    sendMsg(textMessage)
      .then((done) => {
        var from_person = sessionStorage.getItem("user");
        from_person = JSON.parse(from_person);
        const data = { from_person: from_person[0]["_id"], to_person: _id };
        // console.log(data);
        setTextMessage(initailVlues)
        createMsg(data)
          .then((done) => {
            setMessages(done.data);
           
          })
          .catch(function (error) {
            console.log("error");
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  };


  
    //   const formatTime = (createdAt) => {
    //   const date = new Date(createdAt);
    //   const minutes = date.getMinutes();
    //   const seconds = date.getSeconds();
    //   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    // };

    const formatTime = (createdAt) => {
      const date = new Date(createdAt);
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - date.getTime();
      const minutesAgo = Math.floor(timeDifference / (1000 * 60));
      const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const weeksAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
      const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    
      if (monthsAgo > 0) {
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
      } else if (weeksAgo > 0) {
        return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
      } else if (daysAgo > 0) {
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
      } else if (hoursAgo > 0) {
        return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
      } else {
        return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
      }
    };



  return (
    <>
      <main
        id="messageBody"
        className="w-full bg-whatsapp relative overflow-y-auto "
      >
        <div className="absolute bg-whatsapp w-[100%] mx-auto h-full ">
          <div className=" bg-whatsapp w-full h-full overflow-y-auto"  key={1}>
            {message.length > 0
              ? message.map((res, i) => {
                  const senderId = res.sender[0]._id;
                  var from_person = sessionStorage.getItem("user");
                  from_person = JSON.parse(from_person);
                  from_person = from_person[0]["_id"];
                  const receiverId = res.reciver[0]._id;
                  const formattedTime = formatTime(res.createdAt);

                  if (senderId === from_person && receiverId === _id) {
                    return (
                      <>
                        <div className="mt-2" key={res._id}>
                          <div className="flex justify-end px-6">
                            <div className="single-message rounded-sm text-gray-200  user py-2 px-2">
                              <div className="flex flex-col">
                                <div className="text-sm font-extralight flex justify-between">
                                  <span>

                                  {res.sender[0].name ? (
                                    res.sender[0].name
                                  ) : (
                                    <h1>{res.sender[0].contact}</h1>
                                  )}
                                  </span>
                                  
                                  <span className="mx-2">{formattedTime}</span>

                                </div>
                                <span className="text-sm">
                                  {res.text_message}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                  if (senderId === _id && receiverId === from_person) {
                    return (
                      <>
                        <div className="flex justify-start px-6"  key={res._id}>
                          <div className="single-message rounded-bl-lg text-gray-200 rounded-br-lg my-1  py-2 px-2">
                            <div className="flex flex-col ">
                            <div className="text-sm font-extralight flex justify-between">
                                {res.sender[0].name ? (
                                  res.sender[0].name
                                ) : (
                                  <h1>{res.sender[0].contact}</h1>
                                )}
                                  <span className="mx-2">{formattedTime}</span>
                              </div>
                              <span className="text-sm">
                                {res.text_message}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <h1>hellow null</h1>
                      </>
                    ); // Handle the case where the conversation participants don't match
                  }
                })
              : null}
          </div>
          {_id.length > 0 && (
            <div className="flex-grow">
              <div className="px-1 py-2 w-full">
                <form method="Post" onSubmit={handleSubmit}>
                  <div className="relative text-gray-600 focus-within:text-gray-200">
                    <div className="flex items-center ">
                      <input
                        type="text"
                        name="text_message"
                        onChange={handleChange}
                        value={textMessage.text_message}
                        className="ms-2 message-input w-full py-3 text-sm text-white bg-gray-700 rounded-full pl-5 focus:outline-none focus:bg-white focus:text-gray-900"
                        placeholder="Type a message"
                        autoComplete="off"
                      />
                      <button type="submit" className="px-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlnssvgjs="http://svgjs.com/svgjs"
                          width="24"
                          height="24"
                          x="0"
                          y="0"
                          viewBox="0 0 404.644 404.644"
                          xmlSpace="preserve"
                          className=""
                        >
                          <g>
                            <path
                              fill="#096ad9"
                              d="M5.535 386.177c-3.325 15.279 8.406 21.747 19.291 16.867l367.885-188.638h.037c4.388-2.475 6.936-6.935 6.936-12.08 0-5.148-2.548-9.611-6.936-12.085h-.037L24.826 1.6C13.941-3.281 2.21 3.189 5.535 18.469c.225 1.035 21.974 97.914 33.799 150.603l192.042 33.253-192.042 33.249C27.509 288.26 5.759 385.141 5.535 386.177z"
                              data-original="#096ad9"
                              className="cursor-pointer"
                            ></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default chatSide;
