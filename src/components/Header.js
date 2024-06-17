import { useEffect, useState } from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    navigate(`/${e.key}`);
    setCurrent(e.key);
  };

  useEffect(() => {
    setCurrent(location.pathname.replace("/", ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      label: "적립내역",
      key: "point",
    },
    {
      label: "정산내역",
      key: "withdraw",
    },
    {
      label: "대상매장",
      key: "store",
    },
    {
      label: "MY",
      key: "mypage",
    },
  ];

  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 0,
    lineHeight: "64px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemColor: "#ff4a52",
            itemHoverColor: "#1677ff",
          },
        },
      }}
    >
      <Header style={headerStyle}>
        <img
          src="./ktc_logtype_logo.png"
          alt="logo"
          style={{ width: 32, height: 32, marginLeft: 20 }}
        />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ width: "100%" }}
        />
      </Header>
    </ConfigProvider>
  );
};

export default Header;
