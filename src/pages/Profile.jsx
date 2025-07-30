import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Foydalanuvchi topilmadi</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <img
          src={user.photoURL || "/images/default-avatar.png"}
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-500"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {user.displayName || "Ism mavjud emas"}
        </h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
