import React from "react";

export default function ChatUsers({_id,name,contact}) {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 h-full w-full py-2 px-2">
        <div className="flex space-x-2 items-center">
          <img
            className="w-11 h-11 rounded-full"
            src="img/user.png"
            alt=""
          />
          {/* <h1>khadiijo daahir</h1> */}
          {name ? <h1>{name}</h1> : <h1>{contact}</h1>}
        </div>

        {/* <span className="">15:00</span> */}
      </div>
    </>
  );
}
