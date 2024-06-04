import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../../redux/slices/authSlice";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import logoIcon from "../../assets/logo.png";

import "./header.scss";

const Header = () => {
  const hideHeader = useSelector((state) => state.header.hideHeader);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeSession());
  };

  return (
    <div className="header">
      {!hideHeader && (
        <Layout.Header className="header__wrapper">
          <NavLink to="/">
            <div className="header__logo">
              <img src={logoIcon} alt="icon" />
            </div>
          </NavLink>
          <Menu className="header__menu" mode="horizontal" theme="dark">
            <Menu.Item key="112">
              <NavLink
                to="/"
                // className={({ isActive, isPending }) =>
                //   isPending ? "" : isActive ? "active" : ""
                // }
              >
                Catalog
              </NavLink>
            </Menu.Item>
            {!token && (
              <>
                <Menu.Item key="2">
                  <NavLink to="/login">Log in</NavLink>
                </Menu.Item>
                <Menu.Item key="134">
                  <NavLink to="/signup">Sign up</NavLink>
                </Menu.Item>
              </>
            )}
            {token && (
              <>
                <Menu.Item key="123">Create announcement</Menu.Item>
                <Menu.Item key="3" onClick={logout}>
                  Log out
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/profile">
                   Profile
                  </NavLink>
                </Menu.Item>
              </>
            )}
          </Menu>
        </Layout.Header>
      )}
    </div>
  );
};

export default Header;
