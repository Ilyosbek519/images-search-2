import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/userSlice"; // ❗️ logout ni to‘g‘ri import qiling

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout()); // ❗️ logout chaqirilmoqda
  };

  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center">
      <div className="text-lg font-semibold">Image Service</div>
      {user && (
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-bold">{user.displayName}</p>
            <p className="text-sm">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
