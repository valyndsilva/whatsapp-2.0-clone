import { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  useEffect,
  useContext,
  useState,
  createContext,
  ReactNode,
} from "react";
import Loading from "../components/Loading";
import { auth, db } from "../firebaseConfig";
import Login from "../pages/login";
interface AuthProviderProps {
  children: ReactNode;
}

interface Auth {
  currentUser: any;
}

const AuthContext = createContext<Auth>({} as Auth);
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onIdTokenChanged(async (user: User) => {
      if (!user) {
        console.log("No User Logged In!");
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      // const token = await user.getIdToken();
      // console.log(user);
      // console.log("User Logged In!", user, token);
      console.log("User Logged In!");
      const userData = {
        displayName: user.displayName,
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      };
      await setDoc(doc(db, "users", user.uid), userData);
      // await setDoc(doc(db, "users", user.email), userData);
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
