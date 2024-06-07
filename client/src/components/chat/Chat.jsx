import { useEffect, useRef, useState } from "react";
import { Modal, Input, Button, List, Typography } from "antd";
import { useGetChatMutation } from "../../redux/api/userApi";
import { useGetUserQuery } from "../../redux/api/userApi";
import ErrorList from "antd/es/form/ErrorList";

const { TextArea } = Input;
const { Text } = Typography;

const ChatModal = ({
  openChat,
  setOpenChat,
  seller,
  product,
  client = false,
  uniqueID = "",
}) => {
  const [getChat, { isLoading, isError, error }] = useGetChatMutation();
  const { data: user = {} } = useGetUserQuery();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [uniqueId, setUniqueId] = useState(uniqueID);
  const ws = useRef(null);

  useEffect(() => {
    const chatObj = { seller, client: client || user.id, product };

    getChat(chatObj)
      .then((res) => {
        if (!res.data.unique_id) {
          throw new Error(res.status);
        } else {
          initWebSocket(res.data.unique_id);
          setUniqueId(res.data.unique_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const initWebSocket = (uniqueId) => {
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/${uniqueId}/`);

    ws.current.onopen = (data) => {
      console.log("WebSocket Client Connected");
    };

    ws.current.onmessage = (data) => {
      const dataParsed = JSON.parse(data.data);
      if (dataParsed.message_history) {
        const newArr = dataParsed.message_history.map((item) => ({
          text: item.message,
          user: item.user,
        }));
        setMessages(newArr);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: dataParsed.message, user: dataParsed.user },
        ]);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      ws.current.send(
        JSON.stringify({
          message: inputValue,
          room: uniqueId,
          user: user.id,
        })
      );
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
            <List.Item
              style={{
                background: item.user === user.id ? "rgba(0, 0, 0, .05)" : null,
                display: "flex",
                justifyContent: item.user === user.id ? "flex-end" : null,
              }}
            >
              <Text>
                {item.user} - {item.text}
              </Text>
            </List.Item>
          )}
          style={{
            marginBottom: "10px",
            overflowY: "scroll",
            maxHeight: "350px",
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
