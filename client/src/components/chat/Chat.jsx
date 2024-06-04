import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, List, Typography } from "antd";
import { useGetChatMutation } from "../../redux/api/userApi";
import { useGetUserQuery } from "../../redux/api/userApi";

const { TextArea } = Input;
const { Text } = Typography;

const ChatModal = ({ openChat, setOpenChat, seller, product }) => {
  const [getChat, { isLoading, isError, error }] = useGetChatMutation();
  const { data: user = {} } = useGetUserQuery();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    const chatObj = { seller, client: 3, product };

    getChat(chatObj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // ws.current = new WebSocket("ws://localhost:8000/ws/chat/823942/");

    // ws.current.onopen = () => {
    //   console.log("WebSocket Client Connected");
    // };

    // ws.current.onmessage = (data) => {
    //   const dataParsed = JSON.parse(data.data);
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { text: dataParsed.message, time: new Date().toLocaleTimeString() },
    //   ]);
    // };

    // ws.current.onclose = () => {
    //   console.log("WebSocket Client Disconnected");
    // };

    // return () => {
    //   ws.current.close();
    // };
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      ws.current.send(
        JSON.stringify({ message: inputValue, room: 823942, user: 2 })
      );
      // setMessages([
      //   ...messages,
      //   { text: inputValue, time: new Date().toLocaleTimeString() },
      // ]);
      setInputValue("");
    }
  };

  return (
    <div>
      <Modal
        title="Chat"
        open={openChat}
        onCancel={() => setOpenChat(false)}
        footer={null}
      >
        <List
          bordered
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <Text>
                {item.time} - {item.text}
              </Text>
            </List.Item>
          )}
          style={{
            marginBottom: "10px",
            overflowY: "auto",
            maxHeight: "calc(100% - 100px)",
          }}
        />
        <div style={{ display: "flex" }}>
          <TextArea
            rows={2}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type your message..."
            style={{ marginRight: "10px" }}
          />
          <Button type="primary" onClick={handleSend}>
            Send
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ChatModal;
