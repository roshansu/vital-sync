import { getUserData, clearUserData } from "../lib/setLocalData";
import { useState } from "react";
import { userLogout } from "../api/api";

const UserProfile = () => {
  const user = getUserData()
  if (!localStorage.getItem("userData")) {
    window.location.href = "/home";
  }
  const handleLogout = async ()=>{
    if(window.confirm("are sure logout")){
      const data = await userLogout('user/logout')
      if(data.success)
      clearUserData()

      alert(data.message)
    }
    return
  }
  console.log(user)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center">

        {/* Avatar */}
        <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
          {user?.firstName?.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.firstName}
        </h2>
        <p className="text-gray-500 mb-6">
          {user?.email}
        </p>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;