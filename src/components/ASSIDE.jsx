import React, {useEffect,useState} from "react";
import ChatUsers from "./ChatUsers";
import axios from "axios";

function ASSIDE(props) {
  const [data,setData] = useState(null)
  const [Person,setPerson] = useState({
    name:"",contact:""
  })
 



  useEffect(()=>{
    getUsers()
  },[])

 
  const getUsers =()=>{
  
    const users =sessionStorage.getItem("user")
    var contact=JSON.parse(users)
    contact=contact[0]['contact']
    var name=contact[0]['name']
    setPerson({contact:contact,name:name})
    axios.post('http://localhost:7000/contact/users', {contact:contact})
      .then(function (response) {
        if (response.status==200) {
          setData(response.data)
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
}
  return (
    <>
      <aside className="bg-gray-700 overflow-y-auto border-r border-gray-800 relative block">
        <div className="aside-header sticky top-0 right-0 left-0 z-40 text-gray-400">
          <div className="flex items-center px-4 py-3">
            <div className="flex items-center space-x-4">
              <img
                className="w-11 h-11 rounded-full"
                src="/img/user.png"
                alt=""
              />
              {/* <span>{Person.name}</span> */}
              <span>{Person.name ? Person.name :Person.contact }</span>
            </div>
            <div className="flex-1 text-right">
              <svg
                className="inline w-6 h-6 mr-4 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                className="inline w-6 h-6 mr-3 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="inline w-6 h-6 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
          </div>
          <div className="search-bar px-4 py-2 w-full">
            <form method="GET">
              <div className="relative text-gray-600 focus-within:text-gray-200">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-gray-300"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="q"
                  className="w-full py-2 text-sm text-white bg-gray-600 rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Search or start new chat"
                  autoComplete="off"
                />
              </div>
            </form>
          </div>
          <div className=" space-y-4 my-2">
          {data !== null && Object.keys(data).length > 0 ? (
            data.map(res=>{
             return <div className="cursor-pointer" onClick={() => props.handleOnClick(res._id)}  key={res._id}>

               <ChatUsers  _id={res._id} name={res.name} contact={res.contact} />
             </div>
            })
          ) : null}
          
          
          </div>
        </div>
        <div id="mainMessages" className="aside-messages"></div>
      </aside>
    </>
  );
}

export default ASSIDE;
