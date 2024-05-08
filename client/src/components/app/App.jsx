import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import PrivateRoutes from "../../shared/privateRoutes/PrivateRoutes";
import LoginPage from "../../pages/loginPage/LoginPage";
import SignupPage from "../../pages/signupPage/SignupPage";
import CatalogPage from "../../pages/catalogPage/CatalogPage";
import Header from "../header/Header";
import ProfilePage from "../../pages/profilePage/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          {/* <Route element={<PrivateRoutes />}> */}
          <Route exact path="/" element={<CatalogPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          {/* </Route> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
