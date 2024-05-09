import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../../redux/slices/authSlice";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
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
          <Link to="/">
            <div className="header__logo">
              <img src={logoIcon} alt="icon" />
            </div>
          </Link>
          <Menu className="header__menu" mode="horizontal" theme="dark">
            <Menu.Item key="112">
              <Link to="/">Catalog</Link>
            </Menu.Item>
            {!token && (
              <>
                <Menu.Item key="2">
                  <Link to="/login">Log in</Link>
                </Menu.Item>
                <Menu.Item key="134">
                  <Link to="/signup">Sign up</Link>
                </Menu.Item>
              </>
            )}
            {token && (
              <>
                <Menu.Item key="3" onClick={logout}>
                  Log out
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/profile">
                    <Avatar size={44} icon={<UserOutlined />} />
                  </Link>
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
