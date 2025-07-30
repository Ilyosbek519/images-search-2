import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../app/features/userSlice";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (name, email, password) => {
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res.user) {
        throw new Error("Ro‘yxatdan o‘tishda muammo yuz berdi");
      }

      await updateProfile(res.user, {
        displayName: name,
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      });

      // User object to save
      const userData = {
        name: res.user.displayName,
        email: res.user.email,
        id: res.user.uid,
        photoURL: res.user.photoURL,
      };

      // Save to Redux and localStorage
      dispatch(loginAction(userData));
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success(`Xush kelibsiz, ${res.user.displayName}`);
      navigate("/");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { signup, isPending };
};
