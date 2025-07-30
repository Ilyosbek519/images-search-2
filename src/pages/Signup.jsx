import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSignup } from "../hooks/useSignup.js";
import { useSelector } from "react-redux";

export default function SignupPage() {
  const { isPending, signup } = useSignup();

  const currentUser = useSelector((state) => state.user.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name) newErrors.name = "Ism kiritilishi shart";
    if (!form.email) newErrors.email = "Email kiritilishi shart";
    if (!form.password) newErrors.password = "Parol kiritilishi shart";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Parolni tasdiqlang";
    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Parollar mos emas";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      signup(form.name, form.email, form.password);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left image */}
      <div className="hidden md:block relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 z-0" />
        <img
          src="/images/An evening in paris.jpg"
          alt="Signup background"
          className="h-screen w-full object-cover z-10 relative"
        />
      </div>

      {/* Signup form */}
      <div className="relative flex items-center justify-center bg-white md:bg-transparent">
        <img
          src="/images/d2ea344c0e18f386f4b9d51787dc688b.jpg"
          alt="Mobile Background"
          className="absolute top-0 left-0 w-full h-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-black/50 md:hidden" />

        <div className="relative z-10 bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md mx-4 border border-white/40">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Sign Up
          </h2>

          {currentUser && (
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded mb-4 text-center">
              Siz allaqachon ro'yxatdan o'tgansiz.{" "}
              <a href="/profile" className="underline">
                Profilga o'tish
              </a>{" "}
              yoki{" "}
              <a href="/login" className="underline">
                Login sahifasiga qaytish
              </a>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ismingiz"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Parol"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Parolni qayta kiriting"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              {isPending ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Allaqachon hisobingiz bormi?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
