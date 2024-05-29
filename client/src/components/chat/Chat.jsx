import { useState } from "react";
import { Modal, Input, Button, List, Typography, Badge } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const ChatModal = ({ openChat, setOpenChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { text: inputValue, time: new Date().toLocaleTimeString() },
      ]);
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
