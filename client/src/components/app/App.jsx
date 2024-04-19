import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../../shared/privateRoutes/PrivateRoutes";
import LoginPage from "../../pages/loginPage/LoginPage";
import SignupPage from "../../pages/signupPage/SignupPage";
import CatalogPage from "../../pages/catalogPage/CatalogPage";
import Header from "../header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
        <Header />
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route exact path="/" element={<CatalogPage />} />
            {/* </Route> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
