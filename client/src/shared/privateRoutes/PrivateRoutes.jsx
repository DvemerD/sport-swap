import { Outlet, Navigate } from "react-router-dom";
// import Header from '../../components/header/Header';
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  let token = useSelector((state) => state.auth.token);

  return token ? (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
