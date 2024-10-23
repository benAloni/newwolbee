import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { authenticate, logout } from "../redux";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        dispatch(
          authenticate({
            uid: user.uid,
            fullName: token.claims.fullName,
            email: token.claims.email,
            role: token.claims.role,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return {
    user,
  };
};

export default useAuth;
