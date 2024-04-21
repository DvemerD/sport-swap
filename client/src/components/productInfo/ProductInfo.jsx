import { useState } from "react";
import { Button, Carousel, DatePicker, Drawer, Image, Form } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import bikeImg from "../../assets/bike.png";
import bike2Img from "../../assets/bike-2.jpg";

import "./productInfo.scss";

const ProductInfo = ({ data, open, setOpen }) => {
  const [dates, setDates] = useState([]);
  const [price, setPrice] = useState(35);
  const [days, setDays] = useState(0);

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
  };

  return (
    <>
      <Drawer
        className="drawer"
        title="Drawer with extra actions"
        placement="right"
        width={620}
        onClose={onClose}
        open={open}
      >
        <Carousel
          className="drawer__carousel"
          dots
          arrows
          {...settings}
        >
          <div className="drawer__carousel__item">
            <Image src={bikeImg}/>
          </div>
          <div className="drawer__carousel__item">
            <Image src={bike2Img}/>
          </div>
        </Carousel>
        <Form
          className="drawer__space"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item label="Pricing:">
            <p>Daily pricing: $35.00/day</p>
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
            <h3 className="drawer__subtitle">Pickup and Return Location:</h3>
            <p>Kharkiv, Ukraine</p>
          </Form.Item>
          <Form.Item>
            <h3 className="drawer__subtitle drawer__subtitle_bold">
              Price Details:
            </h3>
            <p className="drawer__result">
              <span>$35.00 x {days} days</span>{" "}
              <span>${(price * days).toFixed(2)}</span>
            </p>
          </Form.Item>
          <Form.Item>
            <Button className="drawer__button" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ProductInfo;
