import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Chat, Home } from "./pages/index";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const user = useSelector((user) => user.user.status);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* PROTECTED ROUTE FOR NOT LOGGED IN USER */}
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
