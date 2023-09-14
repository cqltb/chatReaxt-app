import React,{useState,useEffect} from "react";
import ChatSide from "./chatSide";
import ASSIDE from "./ASSIDE";
import * as messageApi from '../store/API/messagesapi';

export default function Home() {
  const [message,setMessages] = useState([])
  const [recId,setRecId] = useState([])
  const [createMsg ] = messageApi.useCreateMsgMutation(); 
 

  const [clickedId, setClickedId] = useState(null);

  // const handleOnClick = (_id) => {
  //   setClickedId(_id);
  // };
  // useEffect(() => {
  //   if (clickedId !== null) {
  //     var from_person = sessionStorage.getItem("user");
  //     from_person = JSON.parse(from_person);
  //     const data = { from_person: from_person[0]['_id'], to_person: clickedId };

  //     createMsg(data)
  //       .then((done) => {
  // console.log(message);

  //         setMessages(done.data);
  //       })
  //       .catch(function (error) {
  //         console.log("error");
  //         console.log(error);
  //       });
  //   }
  // }, [clickedId, createMsg]);


  const handleOnClick =(_id)=>{ 
    var from_person=sessionStorage.getItem("user");
    from_person=JSON.parse(from_person);
    const data={from_person:from_person[0]['_id'],to_person:_id}
    // console.log(data);
    createMsg(data).then((done) => {
      
      setMessages(done.data);
      setRecId(_id);
      
    }).catch(function (error) {
      console.log("error");
      console.log(error);
    });;
    
    
    
  }
  const Logout =()=>{
    sessionStorage.removeItem("user")
    window.location.reload()

   }

  


  return (
    <>
      <div>
        <div className=" text-gray-300 bg-red-800 px-4 py-3 border-b border-gray-700">
          <div className="flex items-center relative">
            <div className="w-1/6">
              {/* <img
                className="w-11 h-11 rounded-full"
                id="personHeadshot"
                src=""
                alt=""
              />*/}
            </div> 
            <div className="w-5/6">
              <div className="text-xl text-white" id="personName">
                  TABARAK CHAT APP
              </div>
              <div className="text-sm truncate" id="messagePreview"></div>
            </div>
            <button onClick={Logout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="w-full h-screen flex space-x-0 border-t-8 green-border bg-black">
      
      <ASSIDE  handleOnClick={handleOnClick}  />
      
      {/* {message.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <ChatSide message={message} _id={recId} />
        )} */}
        <ChatSide message={message} _id={recId} setMessages={setMessages}  />
   
       {/* <ChatSide message={message} /> */}
     
     
       
      </div>
    </>
  );
}
