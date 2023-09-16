import React , {useState} from "react";
import {NavLink} from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [fomData,setFomData] =useState("")
    const navigate = useNavigate();

    const handleChange =(e)=>{
        setFomData({...fomData,[e.target.name]:e.target.value})
        console.log(fomData);
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post('http://localhost:7000/contact/post', fomData)
          .then(function (response) {
            if (response.status==200) {
                navigate("/login");
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


  return (
    <>
      <div className="font-sans antialiased bg-grey-lightest">
        <div className="w-full bg-green fixed shadow z-1">
          <div className="container mx-auto">
            <div className="w-full flex justify-between items-center py-4 px-8">
              <div className="text-center text-white font-bold">
              Tb-chat-app
              </div>

              <div className="items-center hidden sm:flex">
                <a
                  href="#"
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                >
                  Link 1
                </a>
                <a
                  href="#"
                  className="text-white hover:text-green-lightest no-underline mx-2 px-2 py-2"
                >
                  Link 2
                </a>
                <a
                  href="#"
                  className="bg-green-dark hover:bg-green-darker rounded-full text-white no-underline mx-2 px-4 py-2"
                >
                  Link 3
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-grey-lightest pt-[4rem]" >
          <div className="container mx-auto py-8">
            <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
              <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                Tabarak chat App
              </div>
              <form method="POST" onSubmit={(e)=>handleSubmit(e)} className="py-4 px-8">
                <div className="flex mb-4">
                  <div className="w-full">
                    <label
                      className="block text-grey-darker text-sm font-bold mb-2"
                      htmlFor="fullname"
                    >
                      full name
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                 
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="text"
                  >
                   contact
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    name="contact"
                    type="contact"
                    onChange={handleChange}
                    placeholder="Your contact here"
                  />
                </div>
               
                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    type="submit"
                  >
                   create account
                  </button>
                </div>
              </form>
            </div>
            <p className="text-center my-4">
              <NavLink
                to="/login"
                className="text-grey-dark text-sm no-underline hover:text-grey-darker"
              >
                I already have an account
              </NavLink>
            </p>
          </div>
        </div>

        <footer className="w-full bg-grey-lighter py-8">
          <div className="container mx-auto text-center px-8">
            <p className="text-grey-dark mb-2 text-sm">
              This is a product of{" "}
              <span className="font-bold">Tb-chat-app</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;
