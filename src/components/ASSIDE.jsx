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
    var name=contact[0]['name']
    contact=contact[0]['contact']
    console.log();
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
        <div className="aside-header  sticky top-0 right-0 left-0 z-40 text-gray-400">
          <div className="flex items-center px-4 py-3">
            <div className="flex  justify-between  w-full items-center">
            <div className="flex items-center space-x-4">
              <img
                className="w-11 h-11 rounded-full"
                src="/img/user.png"
                alt=""
              />
              <span className="">{Person.name ? Person.name :Person.contact }</span>
            </div>
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>

            </div>
          
          
          </div>
          {/* <div className="search-bar px-4 py-2 w-full">
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
          </div> */}
          <div className=" space-y-4 my-2">
          {data !== null && Object.keys(data).length > 0 ? (
            data.map(res=>{
             return <div className="cursor-pointer" onClick={() => props.handleOnClick(res._id)}  key={res._id}>

               <ChatUsers  _id={res._id} name={res.name} contact={res.contact}  />
             </div>
            })
          ) : null}
          
          
          </div>
        </div>
       
      </aside>
    </>
  );
}

export default ASSIDE;
