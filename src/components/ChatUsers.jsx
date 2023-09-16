import React from 'react';

function getInitials(value) {
  if (!value) return '';
  const nameArray = value.split(' ');
  const initials = nameArray.map((part) => part.charAt(0));
  return initials.join('');
}

function ChatUsers({ _id, name, contact }) {
  const initials = getInitials(name || contact);

  return (
    <>
      <div className="flex justify-between items-center bg-gray-800 h-full w-full py-2 px-2">
        <div className="flex space-x-2 items-center">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center bg-blue-400"
            // style={{ backgroundColor: '#f0f0f0' }}
          >
            {initials && <span className="text-xl font-bold text-white">{initials}</span>}
          </div>
          {name ? <h1>{name}</h1> : <h1>{contact}</h1>}
        </div>
      </div>
    </>
  );
}

export default ChatUsers;


// export default function ChatUsers({_id,name,contact}) {
//   return (
//     <>
//       <div className="flex justify-between items-center bg-gray-800 h-full w-full py-2 px-2">
//         <div className="flex space-x-2 items-center">
//           <img
//             className="w-11 h-11 rounded-full"
//             src="img/user.png"
//             alt=""
//           />
//           {/* <h1>khadiijo daahir</h1> */}
//           {name ? <h1>{name}</h1> : <h1>{contact}</h1>}
//         </div>


//         {/* <span className="text-red-600">2</span> */}
//       </div>
//     </>
//   );
// }
