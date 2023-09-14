import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import Urls from "../../components/urls/url_endpoint";
import  EndPiont  from "../api_endpoints";

// const getAuthData = JSON.parse(localStorage.getItem('auth'))



export const _messageAPI = createApi({
  reducerPath: "messageAPI",
  baseQuery: fetchBaseQuery({ baseUrl:EndPiont.msg.post}),
  tagTypes: ["messageAPI"],
  endpoints: (builder) => ({
    GetUsers: builder.query({
      query: () => `/get`,
      providesTags: ["messageAPI"],
    }),
    CreateMsg: builder.mutation({
      query: (data) => ({
        url: EndPiont.msg.post,
        method: "POST",
        body: data,
      }),transformResponse: (response, meta, arg) => {
        
       return response
     },
      invalidatesTags: ["messageAPI"],

    }),
    SendMsg: builder.mutation({
      query: (data) => ({
        url: EndPiont.msg.sendpost,
        method: "POST",
        body: data,
      }),transformResponse: (response, meta, arg) => {
        
       return response
     },
      invalidatesTags: ["messageAPI"],

    }),
    updateUser: builder.mutation({
      query: (editUsers) => ({
        url: Urls.user.update + editUsers.id,
        method: "PUT",
        body: editUsers,
      }),transformResponse: (response, meta, arg) => {
        console.log("Updated");
        return response
      },
      invalidatesTags: ["messageAPI"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: Urls.user.remove + id,
        method: "DELETE",
      }),transformResponse: (response, meta, arg) => {
       return response
     },
      invalidatesTags: ["messageAPI"],
    }),
  }),
});







export const {
//   useGetUsersQuery,
  useCreateMsgMutation,
  useSendMsgMutation,
//   useUpdateUserMutation,
//   useDeleteUserMutation

} = _messageAPI;