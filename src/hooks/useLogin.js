import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../app/features/userSlice";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginAction(userCredential.user));
      toast.success(`Xush kelibsiz, ${userCredential.user.email}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { login, isPending };
};
