import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { isPending, login } = useLogin();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!email) validationErrors.email = "Email kiritilishi shart";
    if (!password) validationErrors.password = "Parol kiritilishi shart";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      await login(email, password);
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/");
      
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 z-0" />
        <img
          src="/images/An evening in paris.jpg"
          alt="Login background"
          className="h-screen w-full object-cover z-10 relative"
        />
      </div>

      <div className="relative flex items-center justify-center bg-white md:bg-transparent">
        <img
          src="/public/images/db4c93888414133416efdf0e9bc7edc2.jpg"
          alt="Mobile Background"
          className="absolute top-0 left-0 w-full h-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-black/50 md:hidden" />

        <div className="relative z-10 bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md mx-4 border border-white/40">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

          {user && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
              Siz tizimga kirgansiz.{" "}
              <a href="/profile" className="underline">Profilga o'tish</a> yoki{" "}
              <a href="/signup" className="underline">Yangi akkaunt yaratish</a>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full ${
                isPending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-3 rounded-lg transition duration-300`}
            >
              {isPending ? "Yuklanmoqda..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Hali akkauntingiz yo‘qmi?{" "}
            <a href="/signup" className="text-blue-600 hover:underline font-medium">
              Ro‘yxatdan o‘tish
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
