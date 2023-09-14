import { configureStore } from "@reduxjs/toolkit";
import { _messageAPI } from "./API/messagesapi";
// import {  empApi, _employeeDropDownApi, _driversDropDownApi  } from "./api/employeesApi";


export const store = configureStore({
    reducer: {
      [_messageAPI.reducerPath]: _messageAPI.reducer,
     
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(
          {
            serializableCheck:false
          }
      ).concat(
        [
          _messageAPI.middleware, 
         

        ]),
  });