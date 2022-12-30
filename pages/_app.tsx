import "../styles/globals.css";
import { Layout } from "../components";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";
import Login from "./login";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
