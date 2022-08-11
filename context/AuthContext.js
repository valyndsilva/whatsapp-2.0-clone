import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useContext, useState, createContext } from "react";
import Loading from "../components/Loading";
import { auth, db } from "../firebaseConfig";
import Login from "../pages/login";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("No User Logged In!");
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      console.log("User Logged In!", user, token);
      const userData = {
        displayName: user.displayName,
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      };
      await setDoc(doc(db, "users", user.uid), userData);
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading type="bubbles" color="rgb(0,150,136)" />;
  }
  if (!currentUser) {
    return <Login />;
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};
