import { useState } from "react";
import { Avatar, List } from "antd";
import { useGetUserChatQuery, useGetUserQuery } from "../../redux/api/userApi";
import Chat from "../chat/Chat";

const ChatList = () => {
  const { data: chats = [], error, isLoading } = useGetUserChatQuery();
  const { data: userData, isFetching } = useGetUserQuery();
  const [openChat, setOpenChat] = useState(false);
  console.log(chats);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={chats}
        renderItem={(item) => (
          <List.Item
            style={{ cursor: "pointer" }}
            onClick={() => setOpenChat(true)}
          >
            <List.Item.Meta
              avatar={<Avatar src="#" />}
              title={item.unique_id}
              description={`Chat with user ID ${
                userData.id === item.client ? item.seller : item.client
              }`}
              style={{ display: "flex", alignItems: "center" }}
            />
            {openChat && (
              <Chat
                openChat={openChat}
                setOpenChat={setOpenChat}
                seller={item.seller}
                product={item.product}
              />
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default ChatList;
