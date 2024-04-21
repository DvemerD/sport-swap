import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo.png";

import "./header.scss";

const items = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const Header = () => {
  return (
    <div className="header">
      <Layout.Header className="header__wrapper">
        <Link to="/">
          <div className="header__logo">
            <img src={logoIcon} alt="icon" />
          </div>
        </Link>
        <Menu
          className="header__menu"
          mode="horizontal"
          theme="dark"
          // items={items}
        >
          <Menu.Item key="1">
            <Link to="/signup">Sign up</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/login">Log in</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    </div>
  );
};

export default Header;
