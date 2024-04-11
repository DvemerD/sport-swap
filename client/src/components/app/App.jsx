import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../../shared/privateRoutes/PrivateRoutes";
import AuthPage from "../../pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Routes>
            <Route element={<PrivateRoutes />}>
              {/* <Route exact path="/" element={<OrdersPage />} /> */}
            </Route>
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
