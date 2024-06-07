import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Modal } from "antd";
import {
  useCreateOrderMutation,
  useGetUserQuery,
} from "../../redux/api/userApi";

const ModalPayPal = ({
  isModalOpen,
  setIsModalOpen,
  price,
  dates,
  productId,
}) => {
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const { data: user = {} } = useGetUserQuery();
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Pay with PayPal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PayPalScriptProvider
          options={{
            "client-id": process.env.VITE_CLIENT_ID,
          }}
        >
          <PayPalButtons
            disabled={!price}
            style={{ height: 32 }}
            createOrder={(dataP, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: price,
                    },
                  },
                ],
              });
            }}
            onApprove={(dataP, actions) => {
              return actions.order.capture().then((details) => {
                createOrder({
                  unique_id: details.id,
                  user: user.id,
                  product: productId,
                  start_date: dates[0].$d,
                  end_date: dates[1].$d,
                  pay: true,
                }).then((res) => {
                  setIsModalOpen(false);
                });
              });
            }}
          />
        </PayPalScriptProvider>
      </Modal>
    </>
  );
};

export default ModalPayPal;
