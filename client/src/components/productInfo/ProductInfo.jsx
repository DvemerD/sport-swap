import { useState } from "react";
import {
  Button,
  Carousel,
  DatePicker,
  Drawer,
  Image,
  Form,
  Result,
} from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import "./productInfo.scss";
import Chat from "../chat/Chat";

const ProductInfo = ({ data, open, setOpen }) => {
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onDateChange = (dates) => {
    setDates(dates);
    const diffInDays = dates[1].diff(dates[0], "days");
    setDays(diffInDays);
  };

  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <RightOutlined />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <LeftOutlined />
    </div>
  );

  const settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setShowResult(true);
  };

  return (
    <>
      {openChat && <Chat openChat={openChat} setOpenChat={setOpenChat}/>}
      <Drawer
        className="drawer"
        title={data.title}
        placement="right"
        width={620}
        onClose={onClose}
        open={open}
      >
        {showResult ? (
          <>
            <Result
              status="success"
              title="Your application has been successfully processed!"
              subTitle="The advertiser must contact you. Please wait."
              extra={[
                <Button
                  type="primary"
                  key="ok"
                  onClick={() => {
                    setOpen(false);
                    setShowResult(false);
                  }}
                >
                  Ok
                </Button>,
              ]}
            />
          </>
        ) : (
          <div>
            <Carousel className="drawer__carousel" dots arrows {...settings}>
              {data.image.map((img, i) => (
                <div className="drawer__carousel__item" key={i}>
                  <Image src={img.url} />
                </div>
              ))}
            </Carousel>
            <p style={{ padding: "10px 0 " }}>Description:</p>
            <p style={{ paddingBottom: "15px" }}>{data.description}</p>
            <Form
              className="drawer__space"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item label="Pricing:">
                <p>Pricing: ${data.price}/day</p>
              </Form.Item>
              <Form.Item
                label="Pickup Date & Return Date:"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Select date!",
                  },
                ]}
              >
                <DatePicker.RangePicker onChange={onDateChange} />
              </Form.Item>
              <Form.Item>
                <h3 className="drawer__subtitle">
                  Pickup and Return Location:
                </h3>
                <p>Location: {data.location_product.location}</p>
              </Form.Item>
              <Form.Item>
                <h3 className="drawer__subtitle drawer__subtitle_bold">
                  Price Details:
                </h3>
                <p className="drawer__result">
                  <span>
                    ${data.price} x {days} days
                  </span>{" "}
                  <span>${(data.price * days).toFixed(2)}</span>
                </p>
              </Form.Item>
              <Form.Item>
                <Button
                  className="drawer__button"
                  type="primary"
                  htmlType="button"
                  onClick={() => setOpenChat(true)}
                >
                  Chat
                </Button>
                <Button
                  className="drawer__button"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default ProductInfo;
