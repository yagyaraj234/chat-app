import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Chat, Home, Signup, Login } from "./pages/index";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const user = useSelector((user) => user.user.status);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/chat" element={<Chat user={user} />} /> */}

        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
